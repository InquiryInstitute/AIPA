#!/usr/bin/env node
/**
 * Pipeline: Critically review → Revise (faculty author) → Apply revisions → Review again (round 2).
 *
 * 1. Review: run review-lectures-with-llm.mjs → llm-reviews/
 * 2. Revise: run revise-lectures-with-llm.mjs → llm-revisions/
 * 3. Apply: run apply-revisions.mjs (with --backup) → source lectures updated
 * 4. Review again: run review-lectures-with-llm.mjs --output-dir llm-reviews-round2 → round-2 reviews
 *
 * Prerequisites: SUPABASE_URL, SUPABASE_ANON_KEY (or ../Inquiry.Institute/.env.local)
 *
 * Usage:
 *   cd aipa && node scripts/review-revise-review.mjs [--limit N] [--no-apply] [--no-round2]
 *   --limit N    Run each stage on first N lectures only (for testing)
 *   --no-apply   Skip applying revisions to source (keep revisions in llm-revisions/ only)
 *   --no-round2  Skip the second review pass (no llm-reviews-round2)
 */

import { spawnSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const SCRIPTS = path.join(AIPA_ROOT, 'scripts')

const args = process.argv.slice(2)
const limitIdx = args.indexOf('--limit')
const limit = limitIdx >= 0 && args[limitIdx + 1] ? args[limitIdx + 1] : null
const noApply = args.includes('--no-apply')
const noRound2 = args.includes('--no-round2')

function run(name, scriptArgs) {
  const cmd = ['node', path.join(SCRIPTS, scriptArgs[0]), ...scriptArgs.slice(1)]
  console.log('\n---', name, '---')
  console.log('$', cmd.join(' '))
  const r = spawnSync('node', [path.join(SCRIPTS, scriptArgs[0]), ...scriptArgs.slice(1)], {
    cwd: AIPA_ROOT,
    stdio: 'inherit',
    shell: false,
  })
  if (r.status !== 0) {
    console.error(`${name} exited with ${r.status}`)
    process.exit(r.status)
  }
}

const limitArg = limit ? ['--limit', limit] : []

run('1. Critical review (all lectures)', ['review-lectures-with-llm.mjs', ...limitArg])

run('2. Revise (faculty author)', ['revise-lectures-with-llm.mjs', '--skip-existing', ...limitArg])

if (!noApply) {
  run('3. Apply revisions to source', ['apply-revisions.mjs', '--backup'])
} else {
  console.log('\n--- 3. Apply (skipped, --no-apply) ---')
}

if (!noRound2) {
  run('4. Review again (round 2)', ['review-lectures-with-llm.mjs', '--output-dir', 'llm-reviews-round2', ...limitArg])
} else {
  console.log('\n--- 4. Round-2 review (skipped, --no-round2) ---')
}

console.log('\nDone. Round-1 reviews: llm-reviews/; revisions: llm-revisions/; backups: backup-lectures/; round-2 reviews: llm-reviews-round2/')
