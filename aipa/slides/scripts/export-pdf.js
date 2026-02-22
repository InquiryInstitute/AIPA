#!/usr/bin/env node
/**
 * Export each Slidev deck to PDF (one slide per page).
 * Run after generate; output: dist/pdf/chNN-lecture-MM.pdf
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, '..');
const distDir = path.join(__dirname, '../dist');
const pdfDir = path.join(distDir, 'pdf');

fs.mkdirSync(pdfDir, { recursive: true });

for (let ch = 1; ch <= 12; ch++) {
  const chSlug = String(ch).padStart(2, '0');
  for (let lec = 1; lec <= 8; lec++) {
    const lecSlug = String(lec).padStart(2, '0');
    const mdPath = path.join(slidesDir, `ch${chSlug}`, `lecture-${lecSlug}.md`);
    if (!fs.existsSync(mdPath)) continue;
    const outPath = path.join(pdfDir, `ch${chSlug}-lecture-${lecSlug}.pdf`);
    const relativeMd = `ch${chSlug}/lecture-${lecSlug}.md`;
    try {
      execSync(
        `npx slidev export "${relativeMd}" --format pdf --output "${outPath}"`,
        { stdio: 'inherit', cwd: slidesDir }
      );
    } catch (e) {
      console.error(`Failed: ${relativeMd}`);
    }
  }
}
console.log('PDF export complete.');
