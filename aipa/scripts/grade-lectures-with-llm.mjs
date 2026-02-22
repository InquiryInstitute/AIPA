#!/usr/bin/env node
/**
 * Grade all lectures from existing LLM reviews. Calls the gateway once per
 * review to assign A/B/C/D and a short reason, then writes
 * AIPA_LECTURE_GRADES.md (or --output path).
 *
 * Prerequisites: llm-reviews/*.md from review-lectures-with-llm.mjs
 *   SUPABASE_URL and SUPABASE_ANON_KEY (or ../Inquiry.Institute/.env.local)
 *
 * Usage:
 *   cd aipa && node scripts/grade-lectures-with-llm.mjs [--dry-run] [--limit N] [--output path] [--reviews-dir DIR]
 *   --reviews-dir DIR  Read review files from DIR (default: llm-reviews); use llm-reviews-round2 for post-revision baseline.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const REPO_ROOT = path.resolve(AIPA_ROOT, '..')
const reviewsDirIdx = process.argv.indexOf('--reviews-dir')
const REVIEWS_DIR = reviewsDirIdx >= 0 && process.argv[reviewsDirIdx + 1]
  ? path.resolve(AIPA_ROOT, process.argv[reviewsDirIdx + 1])
  : path.join(AIPA_ROOT, 'llm-reviews')

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
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 && args[limitIdx + 1] ? parseInt(args[limitIdx + 1], 10) : null
const modelIdx = args.indexOf('--model')
const MODEL = modelIdx >= 0 && args[modelIdx + 1] ? args[modelIdx + 1] : null
const outIdx = args.indexOf('--output')
const outputPath = outIdx >= 0 && args[outIdx + 1]
  ? path.resolve(process.cwd(), args[outIdx + 1])
  : path.join(REPO_ROOT, 'AIPA_LECTURE_GRADES.md')

if (!dryRun && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY')
  process.exit(1)
}

const GATEWAY_URL = `${SUPABASE_URL}/functions/v1/llm-gateway`

const CHAPTER_NAMES = {
  1: 'Intelligence as Process',
  2: 'AI in Practice',
  3: 'Search and Planning',
  4: 'Learning from Data',
  5: 'Neural Systems and Representation',
  6: 'Language and Models',
  7: 'Memory Systems',
  8: 'Reasoning and Inference',
  9: 'Acting in the World',
  10: 'Agent Architectures',
  11: 'AI in Institutions (Governance)',
  12: "The Student's Artificial Intelligence (Capstone)",
}

/** Parse first line of review: "# Review: 1.1: Title" or "# Review: 3.2a: Title" */
function parseReviewHeader(firstLine) {
  const m = firstLine.match(/^#\s*Review:\s*([\d.]+[a-z]?):\s*(.+)$/i)
  if (m) return { num: m[1], title: m[2].trim() }
  return { num: '', title: '' }
}

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

/** Get num and title from source lecture first === or == line */
function parseSourceHeader(lecturePath) {
  try {
    const first = fs.readFileSync(lecturePath, 'utf8').split('\n').find(l => l.match(/^===?\s+[\d.]+[a-z]?:/))
    const m = first && first.match(/^===?\s+([\d.]+[a-z]?):\s*(.+)$/)
    if (m) return { num: m[1], title: m[2].trim() }
  } catch (_) {}
  return { num: '', title: '' }
}

/** Get list of review files in lecture order (ch01-lecture-01, ch01-lecture-02, ...) */
function listReviewFiles() {
  const files = fs.readdirSync(REVIEWS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(REVIEWS_DIR, f))
  return files.sort((a, b) => {
    const slugA = path.basename(a, '.md')
    const slugB = path.basename(b, '.md')
    const chA = parseInt(slugA.replace(/^ch(\d+).*/, '$1'), 10)
    const chB = parseInt(slugB.replace(/^ch(\d+).*/, '$1'), 10)
    if (chA !== chB) return chA - chB
    return slugA.localeCompare(slugB)
  })
}

const GRADE_PROMPT = `You are grading a single lecture from the AIPA textbook. Use this scale only:
- A = Exemplary: 90-min ready, clear hook → development → closing, meets density (Conceptual 4-6 para, Technical 2-3, Reflection 2-3; Key Points 6-12/5-8). Minimal ad-lib needed.
- B = Solid: Good structure and density; all sections present; may have one lighter section or slightly definition-first opening. Teachable.
- C = Adequate: Complete but lighter; needs instructor expansion or discussion for 90 min. Some lectures are C by design (e.g. tool/Lab Integration).
- D = Thin or weak: Below target density and/or missing narrative arc or key section. Needs expansion.

Reply with exactly two lines:
GRADE: [A or B or C or D]
REASON: [one short phrase, no newline]`

const GATEWAY_RETRY_ON_STATUS = [502, 503, 504]
const GATEWAY_RETRY_DELAY_MS = 5000
const GATEWAY_RETRY_MAX = 2

async function callGateway(messages, maxTokens = 200) {
  const body = { messages, temperature: 0.2, max_tokens: maxTokens }
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

function parseGradeResponse(text) {
  const gradeMatch = text.match(/GRADE:\s*([ABCD])/i)
  const reasonMatch = text.match(/REASON:\s*(.+?)(?:\n|$)/s)
  return {
    grade: gradeMatch ? gradeMatch[1].toUpperCase() : 'C',
    reason: reasonMatch ? reasonMatch[1].trim().replace(/\n.*/s, '').slice(0, 120) : '',
  }
}

function buildReport(rows) {
  const byChapter = {}
  for (const r of rows) {
    const ch = parseInt(r.num, 10) || parseInt(r.num.replace(/[^0-9]/g, ''), 10)
    if (!byChapter[ch]) byChapter[ch] = []
    byChapter[ch].push(r)
  }
  const sortKey = (n) => {
    const m = n.match(/^(\d+)\.(\d+)([a-z]?)$/i)
    if (!m) return n
    const [, c, s, a] = m
    return `${c.padStart(2, '0')}.${s.padStart(2, '0')}${(a || 'z').toLowerCase()}`
  }
  for (const ch of Object.keys(byChapter)) {
    byChapter[ch].sort((a, b) => sortKey(a.num).localeCompare(sortKey(b.num)))
  }
  const counts = { A: 0, B: 0, C: 0, D: 0 }
  rows.forEach(r => { counts[r.grade] = (counts[r.grade] || 0) + 1 })
  const total = rows.length
  let out = `# AIPA: Critical Review by Chapter and Lecture

**Purpose:** Grade each chapter and every lecture for density, narrative arc, and teachability (90-minute target). Complements [AIPA_CRITICAL_REVIEW.md](AIPA_CRITICAL_REVIEW.md) and [LECTURE_DENSITY_SPEC.md](aipa/LECTURE_DENSITY_SPEC.md).

**Grading scale (lectures):**
- **A** — Exemplary: Meets or exceeds density benchmark (Ch7 L1), clear hook → development → closing, full Conceptual Core / Technical / Reflection / Discussion / Lab Prep. Ready for 90 min with minimal ad-lib.
- **B** — Solid: Good density and structure; all sections present; may have one lighter section or slightly definition-first opening. Teachable.
- **C** — Adequate: Complete but lighter; usable for 90 min with instructor expansion or paired discussion. Some tool/Lab Integration lectures are C by design (shorter).
- **D** — Thin or weak: Below target density and/or missing narrative arc or key section. Needs expansion before relying on for a full session.

**Chapter grade:** Brief overall (coherence, balance, CLO coverage); not a strict average of lecture grades.

---

`
  for (let ch = 1; ch <= 12; ch++) {
    const lectures = byChapter[ch] || []
    const name = CHAPTER_NAMES[ch] || `Chapter ${ch}`
    const chGrades = lectures.map(l => l.grade)
    const avg = chGrades.length ? (chGrades.filter(g => g === 'A').length / chGrades.length) : 0
    const chGrade = avg >= 0.7 ? 'A' : avg >= 0.4 ? 'B' : avg >= 0.2 ? 'C' : 'D'
    out += `## Chapter ${ch}: ${name}\n\n`
    out += `**Chapter grade: ${chGrade}.** (From lecture grades: ${chGrades.join(', ')})\n\n`
    out += `| Lecture | Title | Grade | Notes |\n|---------|--------|-------|------|\n`
    for (const l of lectures) {
      const titleEsc = l.title.replace(/\|/g, '\\|')
      out += `| ${l.num} | ${titleEsc} | **${l.grade}** | ${l.reason} |\n`
    }
    out += '\n---\n\n'
  }
  out += `## Summary Statistics\n\n| Grade | Count | %  |\n|-------|-------|-----|\n`
  for (const g of ['A', 'B', 'C', 'D']) {
    const n = counts[g] || 0
    const pct = total ? Math.round((n / total) * 100) : 0
    out += `| ${g} | ${n} | ${pct} |\n`
  }
  out += `\n*Total ${total} lectures. Generated from llm-reviews by grade-lectures-with-llm.mjs.*\n`
  return out
}

async function main() {
  const files = listReviewFiles()
  let toProcess = files
  if (limit) toProcess = toProcess.slice(0, limit)
  const lectures = findLectures()
  const slugToPath = Object.fromEntries(lectures.map(p => [slugFromPath(p), p]))
  console.log(`Review files: ${files.length}; grading: ${toProcess.length} (dryRun=${dryRun})`)

  const rows = []
  for (let i = 0; i < toProcess.length; i++) {
    const reviewPath = toProcess[i]
    const slug = path.basename(reviewPath, '.md')
    const content = fs.readFileSync(reviewPath, 'utf8')
    const firstLine = content.split('\n')[0]
    let { num, title } = parseReviewHeader(firstLine)
    if (!num && slugToPath[slug]) {
      const fromSource = parseSourceHeader(slugToPath[slug])
      if (fromSource.num) ({ num, title } = fromSource)
    }
    if (!num) {
      console.warn(`  Skip ${slug}: could not parse header`)
      continue
    }
    console.log(`[${i + 1}/${toProcess.length}] ${num} ${title.slice(0, 40)}...`)

    if (dryRun) {
      rows.push({ num, title, grade: '?', reason: '(dry run)' })
      continue
    }

    try {
      const reply = await callGateway([
        { role: 'system', content: GRADE_PROMPT },
        { role: 'user', content: `Review to grade:\n\n${content.slice(0, 6000)}` },
      ])
      const { grade, reason } = parseGradeResponse(reply)
      rows.push({ num, title, grade, reason })
    } catch (e) {
      console.error(`  ERROR: ${e.message}`)
      rows.push({ num, title, grade: '?', reason: e.message.slice(0, 80) })
    }
    await new Promise(r => setTimeout(r, 800))
  }

  if (rows.length && !dryRun) {
    const report = buildReport(rows)
    fs.writeFileSync(outputPath, report, 'utf8')
    console.log(`Wrote ${outputPath}`)
  }
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
