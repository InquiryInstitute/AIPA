#!/usr/bin/env node
/**
 * Apply faculty-author revisions to the source lectures in part-i through part-iv.
 * By default reads from llm-revisions/; use --from-dir llm-elevated for elevate-to-a output.
 *
 * Usage:
 *   cd aipa && node scripts/apply-revisions.mjs [--dry-run] [--backup] [--from-dir DIR] [--backup-dir DIR]
 *   --dry-run     List what would be applied, do not write
 *   --backup      Copy each source file to backup dir before overwriting
 *   --from-dir    Read .adoc from DIR (default: llm-revisions); use llm-elevated for elevate pass
 *   --backup-dir  Backup destination (default: backup-lectures); e.g. backup-lectures-pre-elevate
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const AIPA_ROOT = path.resolve(__dirname, '..')
const args = process.argv.slice(2)
const fromDirIdx = args.indexOf('--from-dir')
const REVISIONS_DIR = fromDirIdx >= 0 && args[fromDirIdx + 1]
  ? path.resolve(AIPA_ROOT, args[fromDirIdx + 1])
  : path.join(AIPA_ROOT, 'llm-revisions')
const backupDirIdx = args.indexOf('--backup-dir')
const BACKUP_DIR = backupDirIdx >= 0 && args[backupDirIdx + 1]
  ? path.resolve(AIPA_ROOT, args[backupDirIdx + 1])
  : path.join(AIPA_ROOT, 'backup-lectures')

const dryRun = args.includes('--dry-run')
const backup = args.includes('--backup')

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

function main() {
  const lectures = findLectures()
  const slugToPath = Object.fromEntries(lectures.map(p => [slugFromPath(p), p]))
  const revisionFiles = fs.readdirSync(REVISIONS_DIR)
    .filter(f => f.endsWith('.adoc'))
    .map(f => path.join(REVISIONS_DIR, f))

  let applied = 0
  let skipped = 0
  for (const revPath of revisionFiles) {
    const slug = path.basename(revPath, '.adoc')
    const targetPath = slugToPath[slug]
    if (!targetPath) {
      console.warn(`No source for ${slug}`)
      skipped++
      continue
    }
    const relPath = path.relative(AIPA_ROOT, targetPath)
    if (dryRun) {
      console.log(`Would apply: ${slug} -> ${relPath}`)
      applied++
      continue
    }
    const content = fs.readFileSync(revPath, 'utf8')
    if (backup) {
      const backupPath = path.join(BACKUP_DIR, relPath)
      fs.mkdirSync(path.dirname(backupPath), { recursive: true })
      fs.copyFileSync(targetPath, backupPath)
      console.log(`Backup: ${relPath} -> ${path.relative(AIPA_ROOT, backupPath)}`)
    }
    fs.writeFileSync(targetPath, content, 'utf8')
    console.log(`Applied: ${slug} -> ${relPath}`)
    applied++
  }
  if (dryRun) {
    console.log(`\nWould apply ${applied} revisions (${revisionFiles.length - applied - skipped} missing source). Run without --dry-run to apply.`)
  } else {
    console.log(`\nApplied ${applied} revisions.`)
  }
}

main()
