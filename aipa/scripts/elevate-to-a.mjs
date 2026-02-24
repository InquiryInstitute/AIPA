#!/usr/bin/env node
/**
 * Elevate sub-A lectures to A: for each lecture graded B/C/D in a grades file,
 * call the LLM with current lecture + critic review + A checklist; write revised
 * AsciiDoc to aipa/llm-elevated/<slug>.adoc.
 *
 * Prerequisites:
 *   - Grades file (e.g. AIPA_LECTURE_GRADES_ROUND2.md from grade-lectures-with-llm.mjs --reviews-dir llm-reviews-round2)
 *   - Review dir (e.g. llm-reviews-round2) with one .md per lecture
 *   - SUPABASE_URL and SUPABASE_ANON_KEY
 *
 * Usage:
 *   cd aipa && node scripts/elevate-to-a.mjs [--dry-run] [--limit N] [--skip-existing] [--grades-file path] [--reviews-dir dir] [--model ID]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const REPO_ROOT = path.resolve(AIPA_ROOT, '..')
const ELEVATED_DIR = path.join(AIPA_ROOT, 'llm-elevated')

function loadEnvFromInquiryInstitute() {
  const envPath = path.join(REPO_ROOT, '..', 'Inquiry.Institute', '.env.local')
  if (!fs.existsSync(envPath)) return
  const text = fs.readFileSync(envPath, 'utf8')
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY|SUPABASE_URL|SUPABASE_ANON_KEY)\s*=\s*(.+)\s*$/)
    if (!m) continue
    const key = m[1].startsWith('NEXT_PUBLIC_') ? m[1].replace('NEXT_PUBLIC_', '') : m[1]
    const val = (m[2] || '').replace(/^["']|["']$/g, '').trim()
    if (val && !process.env[key]) process.env[key] = val
  }
}
loadEnvFromInquiryInstitute()

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '')
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const skipExisting = args.includes('--skip-existing')
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 && args[limitIdx + 1] ? parseInt(args[limitIdx + 1], 10) : null
const gradesFileIdx = args.indexOf('--grades-file')
const gradesFilePath = gradesFileIdx >= 0 && args[gradesFileIdx + 1]
  ? path.resolve(process.cwd(), args[gradesFileIdx + 1])
  : path.join(REPO_ROOT, 'AIPA_LECTURE_GRADES_ROUND2.md')
const reviewsDirIdx = args.indexOf('--reviews-dir')
const REVIEWS_DIR = reviewsDirIdx >= 0 && args[reviewsDirIdx + 1]
  ? path.resolve(AIPA_ROOT, args[reviewsDirIdx + 1])
  : path.join(AIPA_ROOT, 'llm-reviews-round2')
const modelIdx = args.indexOf('--model')
const MODEL = modelIdx >= 0 && args[modelIdx + 1] ? args[modelIdx + 1] : null

if (!dryRun && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY')
  process.exit(1)
}

const GATEWAY_URL = `${SUPABASE_URL}/functions/v1/llm-gateway`

function findLectures() {
  const lectures = []
  for (const part of ['part-i', 'part-ii', 'part-iii', 'part-iv']) {
    const partPath = path.join(AIPA_ROOT, part)
    if (!fs.existsSync(partPath)) continue
    const chapters = fs.readdirSync(partPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && d.name.startsWith('ch'))
    for (const ch of chapters) {
      const chPath = path.join(partPath, ch.name)
      const files = fs.readdirSync(chPath)
      const adoc = files.filter(f => f.endsWith('.adoc') && (f.startsWith('lecture-') || f === 'lecture-use-cases.adoc'))
      for (const f of adoc) {
        lectures.push(path.join(chPath, f))
      }
    }
  }
  return lectures.sort()
}

function slugFromPath(lecturePath) {
  const rel = path.relative(AIPA_ROOT, lecturePath)
  const dir = path.dirname(rel)
  const base = path.basename(lecturePath, '.adoc')
  const ch = dir.match(/ch\d+[^-]*/)?.[0] || dir
  return `${ch}-${base}`
}

/** Parse grades file: return array of { num, title, grade, reason } from table rows (cols: Lecture | Title | Grade | Notes) */
function parseGradesFile(content) {
  const rows = []
  const lines = content.split('\n')
  for (const line of lines) {
    if (!line.startsWith('|') || line.startsWith('| Lecture') || line.startsWith('|---')) continue
    const parts = line.split('|').map(s => s.trim())
    if (parts.length < 5) continue
    const num = parts[1]
    const gradeCell = parts[3]
    const gradeMatch = gradeCell && gradeCell.match(/\*\*([ABCD])\*\*/)
    const grade = gradeMatch ? gradeMatch[1] : ''
    const reason = parts[4] || ''
    const title = parts[2] || ''
    if (num && /^[\d.]+[a-z]?$/.test(num) && grade) {
      rows.push({ num, title, grade, reason })
    }
  }
  return rows
}

/** Lecture num (e.g. 1.1, 3.2a) -> slug (e.g. ch01-lecture-01, ch03-lecture-02a). 2.2 -> ch02-lecture-use-cases. */
function numToSlugDerive(num, allSlugs) {
  if (num === '2.2' && allSlugs.has('ch02-lecture-use-cases')) return 'ch02-lecture-use-cases'
  const m = num.match(/^(\d+)\.(\d+)([a-z])?$/i)
  if (!m) return null
  const [, c, l, a] = m
  const lec = a ? l.padStart(2, '0') + a.toLowerCase() : l.padStart(2, '0')
  const slug = `ch${c.padStart(2, '0')}-lecture-${lec}`
  return allSlugs.has(slug) ? slug : null
}

/** Build num -> slug from source lecture headers only (canonical). Review headers are often wrong (e.g. 1.1 in ch07-lecture-05). */
function buildNumToSlug(slugToPath) {
  const numToSlug = {}
  for (const [slug, lecturePath] of Object.entries(slugToPath)) {
    try {
      const first = fs.readFileSync(lecturePath, 'utf8').split('\n').find(l => l.match(/^===?\s+[\d.]+[a-z]?:/))
      const m = first && first.match(/^===?\s+([\d.]+[a-z]?):/)
      if (m) numToSlug[m[1]] = slug
    } catch (_) {}
  }
  if (numToSlug['2.2'] === undefined && Object.keys(slugToPath).some(s => s.includes('use-cases'))) {
    const useCaseSlug = Object.keys(slugToPath).find(s => s.includes('use-cases'))
    if (useCaseSlug) numToSlug['2.2'] = useCaseSlug
  }
  return numToSlug
}

const ELEVATE_SYSTEM = `You are the faculty author of AIPA (Artificial Intelligence: A Postmodern Approach). Your task is to revise a lecture so it reaches **A** (exemplary, 90-minute ready).

**Target density and depth (90-minute lecture):**
- **Word targets:** Total lecture ~2,500–3,500 words (main prose). Conceptual Core ~800–1,200 words; Technical Example ~400–600 words; Philosophical Reflection ~400–600 words.
- **Section structure:** Conceptual Core 4–6 paragraphs, 6–12 Key Points; Technical Example 2–3 paragraphs, 5–8 Key Points; Philosophical Reflection 2–3 paragraphs, 5–8 Key Points; Discussion Prompts 5–6; Lab Prep 1–2 paragraphs, 4–6 Key Points.
- **Depth:** Each section must be substantive—concrete examples, clear development, no thin or definition-only dumps. Reflection should extend the story (stakes, limits, design choices). Include a forward bridge to lab or next lecture where appropriate.

A lecture is **A** when it has:
- **Hook:** Conceptual Core opens with a scenario, question, or tension—not a bare definition. Example: opening with "Intelligence is the ability to..." is weak; instead open with "A system that passes benchmarks but cannot explain its decisions forces us to ask: what kind of intelligence is that?"
- **Development:** Ideas build stepwise; definitions framed as answers to a question already raised.
- **Closing:** Conceptual Core or Philosophical Reflection ends with implication, forward look, or bridge to lab/next.
- **Conceptual Core:** 4–6 paragraphs, 6–12 Key Points (~800–1,200 words).
- **Technical Example:** 2–3 paragraphs, 5–8 Key Points (~400–600 words).
- **Philosophical Reflection:** 2–3 paragraphs, 5–8 Key Points (~400–600 words).
- **Discussion Prompts:** 5–6 open-ended; **Lab Prep:** 1–2 paragraphs, 4–6 Key Points.

Rules: Preserve exact AsciiDoc and PlantUML syntax ([.epigraph], [plantuml,...], pass:q[...], <<ref>>). Apply the critic's recommendations. Expand any section that is below the word or paragraph targets. Output **only** the revised AsciiDoc—no preamble or commentary. Start with the first line (e.g. === 1.1: Title) and end with the last line of the last section.`

const GATEWAY_RETRY_ON_STATUS = [502, 503, 504]
const GATEWAY_RETRY_DELAY_MS = 5000
const GATEWAY_RETRY_MAX = 2

async function callGateway(messages, maxTokens = 8000) {
  const body = { messages, temperature: 0.4, max_tokens: maxTokens }
  if (MODEL) body.model = MODEL
  let lastErr
  for (let attempt = 0; attempt <= GATEWAY_RETRY_MAX; attempt++) {
    const res = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      const data = await res.json()
      return data.choices?.[0]?.message?.content ?? ''
    }
    const t = await res.text()
    lastErr = new Error(`LLM Gateway ${res.status}: ${t}`)
    if (attempt < GATEWAY_RETRY_MAX && GATEWAY_RETRY_ON_STATUS.includes(res.status)) {
      console.error(`  (${res.status}, retrying in ${GATEWAY_RETRY_DELAY_MS / 1000}s...)`)
      await new Promise(r => setTimeout(r, GATEWAY_RETRY_DELAY_MS))
      continue
    }
    throw lastErr
  }
  throw lastErr
}

/** Extract AsciiDoc from response: if wrapped in ```asciidoc...```, take content to the *last* ``` (avoids losing content when model closes fence early). */
function extractAsciiDoc(raw) {
  let text = (raw || '').trim()
  if (!text.startsWith('```')) return text
  const openMatch = text.match(/^```(?:asciidoc|adoc)?\s*\n?/i)
  if (!openMatch) return text
  const afterOpen = text.slice(openMatch[0].length)
  const lastClose = afterOpen.lastIndexOf('```')
  if (lastClose === -1) return text
  return afterOpen.slice(0, lastClose).trim()
}

async function main() {
  if (!fs.existsSync(gradesFilePath)) {
    console.error(`Grades file not found: ${gradesFilePath}`)
    process.exit(1)
  }
  const gradesContent = fs.readFileSync(gradesFilePath, 'utf8')
  const gradeRows = parseGradesFile(gradesContent)
  const lectures = findLectures()
  const slugToPath = Object.fromEntries(lectures.map(p => [slugFromPath(p), p]))
  const numToSlug = buildNumToSlug(slugToPath)

  const subA = gradeRows.filter(r => r.grade !== 'A')
  const allSlugs = new Set(Object.keys(slugToPath))
  const seenSlug = new Set()
  let toProcess = []
  for (const r of subA) {
    const slug = numToSlug[r.num] || numToSlugDerive(r.num, allSlugs)
    if (!slug || seenSlug.has(slug)) continue
    seenSlug.add(slug)
    toProcess.push({ ...r, slug })
  }
  if (limit) toProcess = toProcess.slice(0, limit)
  console.log(`Sub-A lectures: ${subA.length}; unique to elevate: ${toProcess.length} (dryRun=${dryRun})`)

  if (!dryRun && toProcess.length && !fs.existsSync(ELEVATED_DIR)) {
    fs.mkdirSync(ELEVATED_DIR, { recursive: true })
  }

  for (let i = 0; i < toProcess.length; i++) {
    const row = toProcess[i]
    const { num, title, grade, slug } = row
    const lecturePath = slugToPath[slug]
    if (!lecturePath) {
      console.warn(`  Skip ${slug}: no source path`)
      continue
    }
    const relPath = path.relative(AIPA_ROOT, lecturePath)
    console.log(`[${i + 1}/${toProcess.length}] ${num} (${grade}) ${title.slice(0, 35)}...`)

    if (dryRun) continue
    if (skipExisting && fs.existsSync(path.join(ELEVATED_DIR, `${slug}.adoc`))) {
      console.log(`  skip (exists)`)
      continue
    }

    const adoc = fs.readFileSync(lecturePath, 'utf8')
    let reviewContent = ''
    const reviewPath = path.join(REVIEWS_DIR, `${slug}.md`)
    if (fs.existsSync(reviewPath)) {
      reviewContent = fs.readFileSync(reviewPath, 'utf8')
    }
    const userMsg = `Output the **complete** revised lecture (full document from first line to last). Do not output only one section or a code fragment.

## Current lecture (${relPath})

${adoc}

`
      + (reviewContent ? `## Critic's review (grade: ${grade})\n\n${reviewContent}\n\n---\n\n` : '')
      + 'Revise this lecture to meet A. Output only the full revised AsciiDoc document—from the first heading through the last section.'

    try {
      const out = await callGateway([
        { role: 'system', content: ELEVATE_SYSTEM },
        { role: 'user', content: userMsg },
      ])
      const revised = extractAsciiDoc(out)
      const outPath = path.join(ELEVATED_DIR, `${slug}.adoc`)
      fs.writeFileSync(outPath, revised, 'utf8')
      console.log(`  -> ${outPath}`)
    } catch (e) {
      console.error(`  ERROR: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 2000))
  }
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
