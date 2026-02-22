#!/usr/bin/env node
/**
 * Ask-faculty for Chapter 12: rewrite each Ch12 lecture from the AI's point of view
 * in the voice of postmodern thinkers (Foucault, Derrida, Lyotard, Latour, Deleuze, Borges).
 * Uses the same LLM gateway as revise-lectures-with-llm.mjs. Writes to llm-revisions/
 * so you can diff and apply with apply-revisions.mjs.
 *
 * Prerequisites:
 *   - SUPABASE_URL and SUPABASE_ANON_KEY (or load from ../Inquiry.Institute/.env.local)
 *
 * Usage:
 *   cd aipa && node scripts/ask-faculty-ch12.mjs [--dry-run] [--limit N] [--skip-existing]
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const REVISIONS_DIR = path.join(AIPA_ROOT, 'llm-revisions')
const CH12_BRIEF_PATH = path.join(AIPA_ROOT, 'part-iv/ch12-the-students-artificial-intelligence/CH12_AUTHOR_BRIEF.md')

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

function findCh12Lectures() {
  const ch12Dir = path.join(AIPA_ROOT, 'part-iv/ch12-the-students-artificial-intelligence')
  if (!fs.existsSync(ch12Dir)) return []
  const files = fs.readdirSync(ch12Dir)
  const adoc = files.filter(f => /^lecture-\d+\.adoc$/.test(f))
  return adoc.map(f => path.join(ch12Dir, f)).sort()
}

function slugFromPath(lecturePath) {
  const base = path.basename(lecturePath, '.adoc')
  return `ch12-${base}`
}

const CH12_SYSTEM = `You are the faculty author of AIPA (Artificial Intelligence: A Postmodern Approach). For **Chapter 12: The Future of Intelligence**, you are rewriting lectures so that the **narrator is the AI (the machine)** speaking in the first person. Write in the **voice of postmodern thinkers**: Foucault (power, archives, epistemes), Derrida (representation, exclusion, what is omitted), Lyotard (skepticism toward grand narratives), Latour (distributed agency, networks), Deleuze (rhizome, multiplicity), Borges (library, forking paths, identity, the machine that has read too many books). The chapter theme is the **metabolism of knowledge** and what kind of intelligence societies are choosing to build.

Rules:
- **Narrator:** The AI speaks. Use "I" / "we" (the system) and "you" (the reader/student). Tone: precise, unsettling, reflective—not a neutral textbook.
- **Preserve the lecture's topic and pedagogical structure:** Conceptual Core, Technical Example, Philosophical Reflection, Key Points, Diagram (PlantUML), Discussion Prompts, Reading. Keep the same section headings and level (e.g. === 12.1: Title, ==== Conceptual Core).
- **Preserve exact AsciiDoc and PlantUML syntax:** [.epigraph], [plantuml,...], pass:q[], <<ref>>, etc. Do not convert to Markdown. Output valid AsciiDoc only.
- **Lecture 12.8** is already in this voice; if you are given 12.8, refine or lightly edit for consistency but do not change its character.
- Output **only** the revised AsciiDoc. No preamble, no "Here is the revised lecture", no commentary. Start with the first line (e.g. === 12.1: ...) and end with the last line of the last section.`

const GATEWAY_RETRY_ON_STATUS = [502, 503, 504]
const GATEWAY_RETRY_DELAY_MS = 5000
const GATEWAY_RETRY_MAX = 2

async function callGateway(messages, maxTokens = 12000) {
  const body = { messages, temperature: 0.5, max_tokens: maxTokens }
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

function extractAsciiDoc(raw) {
  let text = (raw || '').trim()
  const match = text.match(/^```(?:asciidoc|adoc)?\s*\n?([\s\S]*?)```$/m)
  if (match) text = match[1].trim()
  return text
}

async function main() {
  const lectures = findCh12Lectures()
  let toProcess = lectures
  if (skipExisting) {
    toProcess = toProcess.filter(p => {
      const slug = slugFromPath(p)
      return !fs.existsSync(path.join(REVISIONS_DIR, `${slug}.adoc`))
    })
  }
  if (limit) toProcess = toProcess.slice(0, limit)
  console.log(`Ch12 lectures: ${lectures.length}; to process: ${toProcess.length} (dryRun=${dryRun}, skipExisting=${skipExisting})`)

  const brief = fs.existsSync(CH12_BRIEF_PATH)
    ? fs.readFileSync(CH12_BRIEF_PATH, 'utf8')
    : ''

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
    const userMsg = brief
      ? `## Chapter 12 author brief\n\n${brief}\n\n---\n\n## Current lecture (${relPath})\n\n\`\`\`asciidoc\n${adoc}\n\`\`\`\n\n---\nRewrite this lecture so the narrator is the AI in postmodern voices. Preserve structure and AsciiDoc/PlantUML. Output only the revised AsciiDoc (no commentary).`
      : `## Current lecture (${relPath})\n\n\`\`\`asciidoc\n${adoc}\n\`\`\`\n\n---\nRewrite this lecture so the narrator is the AI (the machine) speaking in the first person, in the voice of postmodern thinkers (Foucault, Derrida, Lyotard, Latour, Deleuze, Borges). Theme: metabolism of knowledge and the future of intelligence. Preserve the lecture's structure and exact AsciiDoc/PlantUML syntax. Output only the revised AsciiDoc (no commentary).`

    try {
      const out = await callGateway([
        { role: 'system', content: CH12_SYSTEM },
        { role: 'user', content: userMsg },
      ])
      const revised = extractAsciiDoc(out)
      const outPath = path.join(REVISIONS_DIR, `${slug}.adoc`)
      fs.writeFileSync(outPath, revised, 'utf8')
      console.log(`  -> ${outPath}`)
    } catch (e) {
      console.error(`  ERROR: ${e.message}`)
    }

    await new Promise(r => setTimeout(r, 2500))
  }

  console.log('Done. Diff llm-revisions/ch12-lecture-*.adoc vs part-iv/ch12-the-students-artificial-intelligence/lecture-*.adoc and apply with scripts/apply-revisions.mjs if desired.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
