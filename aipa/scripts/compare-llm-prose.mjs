#!/usr/bin/env node
/**
 * Compare lecture prose: run faculty-author revision with default model vs Llama 3.1 405B
 * and write both outputs so you can diff and judge quality.
 *
 * Prerequisites:
 *   - llm-reviews/*.md (from review-lectures-with-llm.mjs)
 *   - SUPABASE_URL and SUPABASE_ANON_KEY
 *   - llm-gateway must accept optional "model" in request body (e.g. OpenRouter model ID)
 *
 * Usage:
 *   cd aipa && node scripts/compare-llm-prose.mjs [--limit N] [--reviews-dir DIR] [--model405b ID]
 *   cd aipa && node scripts/compare-llm-prose.mjs --grades-file ../AIPA_LECTURE_GRADES.md --reviews-dir llm-reviews-round3 [--limit 10]
 *
 *   --grades-file PATH  Use only lectures listed in this grades file that are C or D (poorly graded).
 *   --poor-only         With --grades-file, restrict to C and D only (default: true when --grades-file is set).
 *   --min-grade GRADE   With --grades-file, include this grade and below (e.g. B = B,C,D). Overrides --poor-only.
 *   --alt-model ID      Second model (default: meta-llama/llama-3.1-405b-instruct). e.g. anthropic/claude-sonnet-4.6
 *   --alt-dir NAME      Output folder for second model (default: llama405b or claude-sonnet-4.6)
 *   --bedrock           Use AWS Bedrock for the alternate model (--alt-model = Bedrock model ID, e.g. anthropic.claude-sonnet-4-6-v1:0).
 *   --bedrock-region R  AWS region for Bedrock (default: us-east-1). Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (or use default creds).
 *   --debug             Log raw response length and (Bedrock) stopReason/usage to stderr to diagnose fragment output.
 *   --code-fence       Wrap the original lecture in \`\`\`asciidoc (default: no fence; plain text yields full lectures).
 *
 * Output:
 *   llm-compare/default/<slug>.adoc   — revision using gateway default model
 *   llm-compare/<alt-dir>/<slug>.adoc — revision using --alt-model (default: llama405b or claude-sonnet-4.6)
 *
 * Then: diff llm-compare/default/ch06-lecture-07.adoc llm-compare/claude-sonnet-4.6/ch06-lecture-07.adoc
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const REPO_ROOT = path.resolve(AIPA_ROOT, '..')
const REVIEWS_DIR_DEFAULT = path.join(AIPA_ROOT, 'llm-reviews')
const COMPARE_DIR = path.join(AIPA_ROOT, 'llm-compare')
const GRADES_FILE_DEFAULT = path.join(REPO_ROOT, 'AIPA_LECTURE_GRADES.md')

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
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 && args[limitIdx + 1] ? parseInt(args[limitIdx + 1], 10) : null
const reviewsDirIdx = args.indexOf('--reviews-dir')
const REVIEWS_DIR = reviewsDirIdx >= 0 && args[reviewsDirIdx + 1]
  ? path.resolve(AIPA_ROOT, args[reviewsDirIdx + 1])
  : REVIEWS_DIR_DEFAULT
const gradesFileIdx = args.indexOf('--grades-file')
const GRADES_FILE = gradesFileIdx >= 0 && args[gradesFileIdx + 1]
  ? path.resolve(process.cwd(), args[gradesFileIdx + 1])
  : (fs.existsSync(GRADES_FILE_DEFAULT) ? GRADES_FILE_DEFAULT : null)
const poorOnly = args.includes('--poor-only') || (GRADES_FILE != null && !args.includes('--min-grade'))
const minGradeIdx = args.indexOf('--min-grade')
const MIN_GRADE = minGradeIdx >= 0 && args[minGradeIdx + 1] ? args[minGradeIdx + 1].toUpperCase() : null
const model405bIdx = args.indexOf('--model405b')
const altModelIdx = args.indexOf('--alt-model')
const ALT_MODEL = altModelIdx >= 0 && args[altModelIdx + 1]
  ? args[altModelIdx + 1]
  : (model405bIdx >= 0 && args[model405bIdx + 1] ? args[model405bIdx + 1] : 'meta-llama/llama-3.1-405b-instruct')
const altDirIdx = args.indexOf('--alt-dir')
const ALT_DIR = altDirIdx >= 0 && args[altDirIdx + 1]
  ? args[altDirIdx + 1]
  : (ALT_MODEL.includes('claude-sonnet') ? 'claude-sonnet-4.6' : 'llama405b')
const USE_BEDROCK = args.includes('--bedrock')
const bedrockRegionIdx = args.indexOf('--bedrock-region')
const BEDROCK_REGION = bedrockRegionIdx >= 0 && args[bedrockRegionIdx + 1]
  ? args[bedrockRegionIdx + 1]
  : (process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1')
const dryRun = args.includes('--dry-run')
const DEBUG = args.includes('--debug')
const NO_CODE_FENCE = !args.includes('--code-fence')  // default: true (plain-text lecture avoids code-completion fragment)

const GRADE_ORDER = { A: 4, B: 3, C: 2, D: 1 }
function gradeAtOrBelow(grade, threshold) {
  return (GRADE_ORDER[grade] || 0) <= (GRADE_ORDER[threshold] || 0)
}

if (!dryRun && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY (e.g. from ../Inquiry.Institute/.env.local)')
  process.exit(1)
}
if (!dryRun && USE_BEDROCK) {
  // Bedrock uses default credential chain (env, profile, instance metadata). SDK will throw if missing.
  if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY && !process.env.AWS_PROFILE) {
    console.warn('Bedrock: no AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or AWS_PROFILE set; using default credential chain.')
  }
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

/** Parse grades file: return array of { num, title, grade, reason } from table rows */
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
    if (num && /^[\d.]+[a-z]?$/i.test(num) && grade) {
      rows.push({ num, title, grade, reason })
    }
  }
  return rows
}

/** Map lecture num (e.g. 1.1, 3.2a) to slug (e.g. ch01-lecture-01, ch03-lecture-02a) */
function numToSlug(num) {
  const m = num.match(/^(\d+)\.(\d+)([a-z])?$/i)
  if (!m) return null
  const [, c, l, a] = m
  const lec = a ? l.padStart(2, '0') + a.toLowerCase() : l.padStart(2, '0')
  return `ch${c.padStart(2, '0')}-lecture-${lec}`
}

/** Resolve lecture-use-cases: grades file lists 2.2 as "Capstone Use Cases" -> ch02-lecture-use-cases, not lecture-02 */
function slugFromGradeRow(row, allSlugs) {
  if (row.num === '2.2' && allSlugs.has('ch02-lecture-use-cases')) return 'ch02-lecture-use-cases'
  const slug = numToSlug(row.num)
  if (slug && allSlugs.has(slug)) return slug
  return slug
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
- Output **only** the revised AsciiDoc. No preamble, no "Here is the revised lecture", no commentary. Start with the first line of the lecture (e.g. === 1.1: Title) and end with the last line of the last section.
- **Critical:** You must output the **entire** lecture (title, hook, conceptual core, technical example, reflection, diagrams, discussion prompts, lab prep, reading). Do not output only a single section or code block—the response must be the full document, typically 2,500–4,000+ words meeting the density and depth targets above.`

const GATEWAY_RETRY_ON_STATUS = [502, 503, 504]
const GATEWAY_RETRY_DELAY_MS = 5000
const GATEWAY_RETRY_MAX = 2

async function callGateway(messages, modelOverride, maxTokens = 16000) {
  const body = { messages, temperature: 0.4, max_tokens: maxTokens }
  if (modelOverride) body.model = modelOverride
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
      const content = data.choices?.[0]?.message?.content ?? ''
      if (DEBUG) {
        const choice = data.choices?.[0]
        console.error(`  [gateway] raw length=${content.length} finish_reason=${choice?.finish_reason ?? '?'} usage=${JSON.stringify(data.usage ?? {})}`)
      }
      return content
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

/** Call AWS Bedrock Converse API. messages = [{ role, content }]. Uses --alt-model as modelId. */
async function callBedrock(messages, modelId, maxTokens = 16000) {
  let BedrockRuntimeClient, ConverseCommand
  try {
    const sdk = await import('@aws-sdk/client-bedrock-runtime')
    BedrockRuntimeClient = sdk.BedrockRuntimeClient
    ConverseCommand = sdk.ConverseCommand
  } catch (e) {
    throw new Error('Bedrock requires @aws-sdk/client-bedrock-runtime. Run: npm install @aws-sdk/client-bedrock-runtime')
  }
  const systemBlocks = []
  const converseMessages = []
  for (const msg of messages) {
    const text = typeof msg.content === 'string' ? msg.content : (msg.content?.text ?? '')
    if (msg.role === 'system') {
      systemBlocks.push({ text })
    } else {
      converseMessages.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: [{ text }],
      })
    }
  }
  const client = new BedrockRuntimeClient({ region: BEDROCK_REGION })
  const command = new ConverseCommand({
    modelId,
    ...(systemBlocks.length ? { system: systemBlocks } : {}),
    messages: converseMessages,
    inferenceConfig: {
      maxTokens,
      temperature: 0.4,
      topP: 1,
    },
  })
  const response = await client.send(command)
  const output = response.output
  const text = output?.message?.content?.length
    ? output.message.content.map(block => block.text ?? '').join('')
    : ''
  if (DEBUG) {
    console.error(`  [bedrock] raw length=${text.length} stopReason=${output?.stopReason ?? '?'} usage=${JSON.stringify(response.usage ?? {})}`)
  }
  return text
}

/** Extract AsciiDoc from response: if wrapped in ```asciidoc...```, take content to the *last* ``` (model often closes fence after first code block). */
function extractAsciiDoc(raw) {
  let text = (raw || '').trim()
  if (!text.startsWith('```')) return text
  const openMatch = text.match(/^```(?:asciidoc|adoc)?\s*\n?/i)
  if (!openMatch) return text
  const afterOpen = text.slice(openMatch[0].length)
  const lastClose = afterOpen.lastIndexOf('```')
  if (lastClose === -1) return text
  text = afterOpen.slice(0, lastClose).trim()
  return text
}

async function main() {
  const lectures = findLectures()
  const slugToPath = Object.fromEntries(lectures.map(p => [slugFromPath(p), p]))
  const allSlugs = new Set(Object.keys(slugToPath))

  let toProcess
  if (GRADES_FILE && fs.existsSync(GRADES_FILE)) {
    const content = fs.readFileSync(GRADES_FILE, 'utf8')
    const rows = parseGradesFile(content)
    const threshold = MIN_GRADE || (poorOnly ? 'C' : null)
    const filtered = threshold
      ? rows.filter(r => gradeAtOrBelow(r.grade, threshold))
      : rows
    const slugs = new Set()
    for (const row of filtered) {
      const slug = slugFromGradeRow(row, allSlugs)
      if (slug && fs.existsSync(path.join(REVIEWS_DIR, `${slug}.md`))) slugs.add(slug)
    }
    toProcess = Array.from(slugs).sort().map(slug => slugToPath[slug]).filter(Boolean)
    if (limit != null) toProcess = toProcess.slice(0, limit)
    console.log(`Grades file: ${GRADES_FILE} (${threshold ? `grade ${threshold} and below` : 'all grades'})`)
    console.log(`Poorly graded lectures with reviews: ${toProcess.length}`)
  } else {
    const withReviews = lectures.filter(p => {
      const slug = slugFromPath(p)
      return fs.existsSync(path.join(REVIEWS_DIR, `${slug}.md`))
    })
    toProcess = withReviews.slice(0, limit ?? 3)
  }

  console.log(`Comparing prose: default model vs ${ALT_MODEL} (output: llm-compare/${ALT_DIR}/)${USE_BEDROCK ? ' [Bedrock]' : ''}`)
  console.log(`Reviews dir: ${REVIEWS_DIR}; lectures to compare: ${toProcess.length}`)
  if (dryRun) {
    console.log('--dry-run: would compare the following lectures (no API calls):')
    toProcess.forEach((p, i) => console.log(`  ${i + 1}. ${slugFromPath(p)}`))
    console.log('Done (dry run).')
    return
  }

  const defaultDir = path.join(COMPARE_DIR, 'default')
  const altDir = path.join(COMPARE_DIR, ALT_DIR)
  fs.mkdirSync(defaultDir, { recursive: true })
  fs.mkdirSync(altDir, { recursive: true })

  for (let i = 0; i < toProcess.length; i++) {
    const lecturePath = toProcess[i]
    const slug = slugFromPath(lecturePath)
    const relPath = path.relative(AIPA_ROOT, lecturePath)
    console.log(`[${i + 1}/${toProcess.length}] ${slug}`)

    const adoc = fs.readFileSync(lecturePath, 'utf8')
    const reviewPath = path.join(REVIEWS_DIR, `${slug}.md`)
    const review = fs.readFileSync(reviewPath, 'utf8')
    const userMsg = NO_CODE_FENCE
      ? `You must output the **complete** revised lecture (full document from first line to last). Do not output only one section or a code fragment.

## Original lecture (${relPath})

${adoc}

## Critic's review

${review}

---
Output **only** the full revised AsciiDoc document—from the first heading (e.g. === 1.2: Title) through the last section. No preamble or commentary.`
      : `You must output the **complete** revised lecture (full document from first line to last). Do not output only one section or a code fragment.

## Original lecture (${relPath})

\`\`\`asciidoc
${adoc}
\`\`\`

## Critic's review

${review}

---
Output **only** the full revised AsciiDoc document—from the first heading (e.g. === 1.2: Title) through the last section. No preamble or commentary.`

    const messages = [
      { role: 'system', content: FACULTY_SYSTEM },
      { role: 'user', content: userMsg },
    ]

    try {
      const outDefault = await callGateway(messages, null)
      const revisedDefault = extractAsciiDoc(outDefault)
      fs.writeFileSync(path.join(defaultDir, `${slug}.adoc`), revisedDefault, 'utf8')
      console.log(`  -> default: ${slug}.adoc`)
    } catch (e) {
      console.error(`  default ERROR: ${e.message}`)
    }

    await new Promise(r => setTimeout(r, 1500))

    try {
      const outAlt = USE_BEDROCK
        ? await callBedrock(messages, ALT_MODEL)
        : await callGateway(messages, ALT_MODEL)
      const revisedAlt = extractAsciiDoc(outAlt)
      fs.writeFileSync(path.join(altDir, `${slug}.adoc`), revisedAlt, 'utf8')
      console.log(`  -> ${ALT_DIR}: ${slug}.adoc`)
    } catch (e) {
      console.error(`  ${ALT_DIR} ERROR: ${e.message}`)
    }

    await new Promise(r => setTimeout(r, 2000))
  }

  console.log('')
  console.log('Done. To compare prose, run for each lecture:')
  for (const p of toProcess) {
    const slug = slugFromPath(p)
    console.log(`  diff llm-compare/default/${slug}.adoc llm-compare/${ALT_DIR}/${slug}.adoc`)
  }
  console.log('')
  console.log('Use --alt-model <id> for a different model (e.g. anthropic/claude-sonnet-4.6).')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
