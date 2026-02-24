#!/usr/bin/env node
/**
 * Review each AIPA lecture (and its diagrams) using the Supabase llm-gateway
 * from ../Inquiry.Institute. Writes review + revision suggestions to
 * aipa/llm-reviews/<chapter>-<lecture>.md
 *
 * Prerequisites:
 *   - SUPABASE_URL and SUPABASE_ANON_KEY (from Inquiry.Institute .env or Supabase dashboard)
 *   - llm-gateway Edge Function deployed (see ../Inquiry.Institute/scripts/deploy-llm-gateway.sh)
 *
 * Usage:
 *   cd aipa && node scripts/review-lectures-with-llm.mjs [--dry-run] [--limit N] [--revise] [--model ID]
 *   --dry-run   Only list lectures, do not call LLM
 *   --limit N   Process at most N lectures (default: all)
 *   --output-dir DIR  Write reviews to DIR (default: llm-reviews); use llm-reviews-round2 for second pass
 *   --revise    Ask for revised AsciiDoc and write .revised.adoc (experimental)
 *   --model ID  Optional; gateway uses this model if it accepts a "model" body field (e.g. meta-llama/llama-3.1-405b-instruct)
 *   --bedrock   Use AWS Bedrock instead of the Supabase gateway. --model = Bedrock model ID (default: openai.gpt-oss-120b-1:0).
 *   --bedrock-region R  AWS region for Bedrock (default: us-east-1). Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY or AWS_PROFILE.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const outDirIdx = process.argv.indexOf('--output-dir')
const REVIEWS_DIR = outDirIdx >= 0 && process.argv[outDirIdx + 1]
  ? path.resolve(AIPA_ROOT, process.argv[outDirIdx + 1])
  : path.join(AIPA_ROOT, 'llm-reviews')

const ENV_KEYS = /^\s*(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY|SUPABASE_URL|SUPABASE_ANON_KEY|AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY|AWS_REGION|AWS_DEFAULT_REGION)\s*=\s*(.+)\s*$/
function loadEnvFromFile(envPath) {
  if (!fs.existsSync(envPath)) return
  const text = fs.readFileSync(envPath, 'utf8')
  for (const line of text.split('\n')) {
    const m = line.match(ENV_KEYS)
    if (!m) continue
    const key = m[1].startsWith('NEXT_PUBLIC_') ? m[1].replace('NEXT_PUBLIC_', '') : m[1]
    const val = (m[2] || '').replace(/^["']|["']$/g, '').trim()
    if (val && !process.env[key]) process.env[key] = val
  }
}
function loadEnvFromInquiryInstitute() {
  const repoRoot = path.resolve(AIPA_ROOT, '..', '..')
  const dirs = [
    path.join(repoRoot, 'Inquiry.Institute'),
    path.join(process.env.HOME || process.env.USERPROFILE || '', 'GitHub', 'Inquiry.Institute'),
  ]
  for (const dir of dirs) {
    if (!dir) continue
    loadEnvFromFile(path.join(dir, '.env.local'))
    loadEnvFromFile(path.join(dir, '.env'))
  }
}
loadEnvFromInquiryInstitute()

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '')
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const revise = args.includes('--revise')
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 && args[limitIdx + 1] ? parseInt(args[limitIdx + 1], 10) : null
const modelIdx = args.indexOf('--model')
const MODEL = modelIdx >= 0 && args[modelIdx + 1] ? args[modelIdx + 1] : 'openai/gpt-oss-120b'
const USE_BEDROCK = args.includes('--bedrock')
const bedrockRegionIdx = args.indexOf('--bedrock-region')
const BEDROCK_REGION = bedrockRegionIdx >= 0 && args[bedrockRegionIdx + 1]
  ? args[bedrockRegionIdx + 1]
  : (process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1')
const BEDROCK_MODEL = USE_BEDROCK ? (modelIdx >= 0 && args[modelIdx + 1] ? args[modelIdx + 1] : 'openai.gpt-oss-120b-1:0') : null

if (!dryRun && !USE_BEDROCK && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY (e.g. from ../Inquiry.Institute/.env.local), or use --bedrock')
  process.exit(1)
}
if (!dryRun && USE_BEDROCK && (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_SECRET_ACCESS_KEY && !process.env.AWS_PROFILE)) {
  console.warn('Bedrock: no AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or AWS_PROFILE set; using default credential chain.')
}

const GATEWAY_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/llm-gateway` : null

/** Collect all lecture .adoc paths under aipa/part-* */
function findLectures() {
  const lectures = []
  const partsDir = path.join(AIPA_ROOT, 'part-i')
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

/** Extract num (N.N), title, and PlantUML blocks from lecture. Ensures review first line can be "# Review: N.N: Title". */
function extractSections(content) {
  const headerMatch = content.match(/^===?\s+([\d.]+[a-z]?):\s*(.+)$/m)
  const num = headerMatch ? headerMatch[1] : ''
  const titleFromHeader = headerMatch ? headerMatch[2].trim() : ''
  const titleMatch = content.match(/^=== (.+)$/m)
  const titleFull = titleMatch ? titleMatch[1] : path.basename(content, '.adoc')
  const title = titleFromHeader || titleFull
  const reviewFirstLine = num ? `# Review: ${num}: ${title}` : `# Review: ${titleFull}`
  const plantumlBlocks = content.match(/\[plantuml[^\]]*\][\s\S]*?\.\.\./g) || []
  return { num, title, reviewFirstLine, plantumlBlocks, content }
}

const SYSTEM_PROMPT = `You are a critical reviewer for the AIPA textbook (Artificial Intelligence: A Postmodern Approach). Your job is to review each lecture for **A quality**: suitable for a **90-minute** session and **interesting** (engaging hook, clear narrative arc, no definition-first dumps).

**Target density and depth (90-minute lecture):**
- **Word targets:** Total lecture ~2,500–3,500 words (main prose, excluding Key Points bullets and captions). Conceptual Core ~800–1,200 words; Technical Example ~400–600 words; Philosophical Reflection ~400–600 words.
- **Section structure:** Conceptual Core 4–6 paragraphs, 6–12 Key Points; Technical Example 2–3 paragraphs, 5–8 Key Points; Philosophical Reflection 2–3 paragraphs, 5–8 Key Points; Discussion Prompts 5–6; Lab Prep 1–2 paragraphs, 4–6 Key Points.
- **Depth:** Each section must be substantive—concrete examples, clear stepwise development, no thin or definition-only dumps. Philosophical Reflection should extend the story (stakes, limits, design choices), not just restate bullets. A forward bridge (to lab or next lecture) should appear where appropriate.

Evaluate strictly:

1. **Narrative arc**: Strong hook (concrete scenario, provocative question, or tension—not a bare definition)? Development that builds stepwise (problem → response → limit)? Closing with implication or bridge to lab/next?
2. **Density and depth**: Against the targets above, report paragraph counts, Key Point counts, and approximate word counts per section. Flag any section that is under word target or thin (vague, definition-first, or lacking concrete examples).
3. **Interest**: Would this hold attention for 90 minutes? Any section thin, vague, or definition-first? Suggest concrete ways to add hooks, tension, or forward motion.
4. **Diagrams**: For each PlantUML block, does it match the narrative? Suggest concrete improvements (labels, arrows, feedback loops) so the figure reinforces the message.

**Checklist (tick mentally):** Hook present (not definition-first)? Conceptual Core 4–6 para, 6–12 Key Points? Technical 2–3 para, 5–8 Key Points? Reflection 2–3 para, 5–8 Key Points? 5–6 Discussion Prompts? Lab Prep 1–2 para, 4–6 Key Points? Forward bridge somewhere?

Output your review in Markdown with sections: Summary (one paragraph, grade A/B/C/D and why), Narrative arc (hook/development/closing with verdicts), Density (counts vs target and word targets), Interest (what to strengthen), Diagram review (per figure), and **Recommended revisions** (prioritized bullet list of specific edits the faculty author should apply). Be concise and actionable.`

function buildUserPrompt(relPath, title, content, plantumlBlocks) {
  let prompt = `# Lecture: ${title}\n**Path:** ${relPath}\n\n## Full AsciiDoc content\n\n${content}\n\n`
  if (plantumlBlocks.length) {
    prompt += `## PlantUML blocks (${plantumlBlocks.length}) for diagram review\n\n`
    plantumlBlocks.forEach((block, i) => {
      prompt += `### Diagram ${i + 1}\n\`\`\`\n${block}\n\`\`\`\n\n`
    })
  }
  prompt += '---\nProvide your review and recommended revisions (Markdown).'
  return prompt
}

const GATEWAY_RETRY_ON_STATUS = [502, 503, 504]
const GATEWAY_RETRY_DELAY_MS = 5000
const GATEWAY_RETRY_MAX = 2

/** Call AWS Bedrock Converse API. messages = [{ role, content }]. */
async function callBedrock(messages, modelId, maxTokens = 4000) {
  const sdk = await import('@aws-sdk/client-bedrock-runtime').catch(() => null)
  if (!sdk) throw new Error('Bedrock requires @aws-sdk/client-bedrock-runtime. Run: npm install @aws-sdk/client-bedrock-runtime')
  const { BedrockRuntimeClient, ConverseCommand } = sdk
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
  const response = await client.send(new ConverseCommand({
    modelId,
    ...(systemBlocks.length ? { system: systemBlocks } : {}),
    messages: converseMessages,
    inferenceConfig: { maxTokens, temperature: 0.3, topP: 1 },
  }))
  const output = response.output
  return output?.message?.content?.length
    ? output.message.content.map(block => block.text ?? '').join('')
    : ''
}

async function callGateway(messages) {
  const body = { messages, temperature: 0.3, max_tokens: 4000 }
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

function slugFromPath(lecturePath) {
  const rel = path.relative(AIPA_ROOT, lecturePath)
  const dir = path.dirname(rel)
  const base = path.basename(lecturePath, '.adoc')
  const ch = dir.match(/ch\d+[^-]*/)?.[0] || dir
  return `${ch}-${base}`
}

async function main() {
  const lectures = findLectures()
  const toProcess = limit ? lectures.slice(0, limit) : lectures
  console.log(`Found ${lectures.length} lectures; processing ${toProcess.length} (dryRun=${dryRun})${USE_BEDROCK ? ' [Bedrock: ' + BEDROCK_MODEL + ']' : ''}`)

  if (!dryRun && !fs.existsSync(REVIEWS_DIR)) {
    fs.mkdirSync(REVIEWS_DIR, { recursive: true })
  }

  for (let i = 0; i < toProcess.length; i++) {
    const lecturePath = toProcess[i]
    const relPath = path.relative(AIPA_ROOT, lecturePath)
    const slug = slugFromPath(lecturePath)
    console.log(`[${i + 1}/${toProcess.length}] ${slug}`)

    if (dryRun) continue

    const content = fs.readFileSync(lecturePath, 'utf8')
    const { title, reviewFirstLine, plantumlBlocks, content: fullContent } = extractSections(content)
    const userPrompt = buildUserPrompt(relPath, title, fullContent, plantumlBlocks)

    try {
      const review = USE_BEDROCK
        ? await callBedrock([{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: userPrompt }], BEDROCK_MODEL, 4000)
        : await callGateway([{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: userPrompt }])
      const outPath = path.join(REVIEWS_DIR, `${slug}.md`)
      fs.writeFileSync(outPath, `${reviewFirstLine}\n\n**Source:** ${relPath}\n\n---\n\n${review}`, 'utf8')
      console.log(`  -> ${outPath}`)
    } catch (e) {
      console.error(`  ERROR: ${e.message}`)
    }

    // Avoid rate limits
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
