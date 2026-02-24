#!/usr/bin/env node
/**
 * Faculty-author revision: for each lecture with an LLM review, ask the gateway
 * to revise the lecture (A quality, 90 min, interesting) and write revised AsciiDoc
 * to aipa/llm-revisions/<slug>.adoc. Human can diff and apply.
 *
 * Prerequisites:
 *   - llm-reviews/*.md from review-lectures-with-llm.mjs
 *   - SUPABASE_URL and SUPABASE_ANON_KEY (or load from ../Inquiry.Institute/.env.local)
 *
 * Usage:
 *   cd aipa && node scripts/revise-lectures-with-llm.mjs [--dry-run] [--limit N] [--skip-existing] [--model ID]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const REVIEWS_DIR = path.join(AIPA_ROOT, 'llm-reviews')
const REVISIONS_DIR = path.join(AIPA_ROOT, 'llm-revisions')

function loadEnvFromInquiryInstitute() {
  const repoRoot = path.resolve(AIPA_ROOT, '..')
  const envPath = path.join(repoRoot, '..', 'Inquiry.Institute', '.env.local')
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
const modelIdx = args.indexOf('--model')
const MODEL = modelIdx >= 0 && args[modelIdx + 1] ? args[modelIdx + 1] : null

if (!dryRun && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY (e.g. from ../Inquiry.Institute/.env.local)')
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

const FACULTY_SYSTEM = `You are the faculty author of AIPA (Artificial Intelligence: A Postmodern Approach). A critic has reviewed one of your lectures. Your task is to **revise the lecture** so it reaches **A quality**: suitable for a **90-minute** session and **interesting** (strong hook, clear narrative arc, engagement).

**Target density and depth (90-minute lecture):**
- **Word targets:** Total lecture ~2,500–3,500 words (main prose). Conceptual Core ~800–1,200 words; Technical Example ~400–600 words; Philosophical Reflection ~400–600 words.
- **Section structure:** Conceptual Core 4–6 paragraphs, 6–12 Key Points; Technical Example 2–3 paragraphs, 5–8 Key Points; Philosophical Reflection 2–3 paragraphs, 5–8 Key Points; Discussion Prompts 5–6; Lab Prep 1–2 paragraphs, 4–6 Key Points.
- **Depth:** Each section must be substantive—concrete examples, clear development, no thin or definition-only dumps. Reflection should extend the story (stakes, limits, design choices). Include a forward bridge to lab or next lecture where appropriate.

Rules:
- Apply the critic's **Recommended revisions** and any high-value suggestions from the review. Preserve the lecture's thesis and technical accuracy.
- Preserve **exact AsciiDoc and PlantUML syntax**: attributes like [.epigraph], [plantuml,...], pass:q[...], <<ref>>, etc. Do not convert to Markdown or alter macro names.
- Strengthen the hook if the review says it's weak; expand or tighten sections to meet the density and word targets above (do not leave sections under target).
- Improve diagrams only as suggested (labels, arrows, feedback); keep PlantUML block structure.
- Output **only** the revised AsciiDoc. No preamble, no "Here is the revised lecture", no commentary. Start with the first line of the lecture (e.g. === 1.1: Title) and end with the last line of the last section.`

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
  const lectures = findLectures()
  const withReviews = lectures.filter(p => {
    const slug = slugFromPath(p)
    return fs.existsSync(path.join(REVIEWS_DIR, `${slug}.md`))
  })
  let toProcess = withReviews
  if (skipExisting) {
    toProcess = toProcess.filter(p => {
      const slug = slugFromPath(p)
      return !fs.existsSync(path.join(REVISIONS_DIR, `${slug}.adoc`))
    })
  }
  if (limit) toProcess = toProcess.slice(0, limit)
  console.log(`Lectures with reviews: ${withReviews.length}; to revise: ${toProcess.length} (dryRun=${dryRun}, skipExisting=${skipExisting})`)

  if (!dryRun && toProcess.length && !fs.existsSync(REVISIONS_DIR)) {
    fs.mkdirSync(REVISIONS_DIR, { recursive: true })
  }

  for (let i = 0; i < toProcess.length; i++) {
    const lecturePath = toProcess[i]
    const slug = slugFromPath(lecturePath)
    const relPath = path.relative(AIPA_ROOT, lecturePath)
    console.log(`[${i + 1}/${toProcess.length}] ${slug}`)

    if (dryRun) continue

    const adoc = fs.readFileSync(lecturePath, 'utf8')
    const reviewPath = path.join(REVIEWS_DIR, `${slug}.md`)
    const review = fs.readFileSync(reviewPath, 'utf8')

    const userMsg = `Output the **complete** revised lecture (full document from first line to last). Do not output only one section or a code fragment.

## Original lecture (${relPath})

${adoc}

## Critic's review

${review}

---
Output only the full revised AsciiDoc document—from the first heading through the last section. No preamble or commentary.`

    try {
      const out = await callGateway([
        { role: 'system', content: FACULTY_SYSTEM },
        { role: 'user', content: userMsg },
      ])
      const revised = extractAsciiDoc(out)
      const outPath = path.join(REVISIONS_DIR, `${slug}.adoc`)
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
