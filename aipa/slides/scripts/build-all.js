#!/usr/bin/env node
/**
 * Build all Slidev decks.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidesDir = path.join(__dirname, '../slides');
const distDir = path.join(__dirname, '../dist');

fs.mkdirSync(distDir, { recursive: true });

for (let ch = 1; ch <= 12; ch++) {
  const chSlug = String(ch).padStart(2, '0');
  for (let lec = 1; lec <= 8; lec++) {
    const lecSlug = String(lec).padStart(2, '0');
    const mdPath = path.join(slidesDir, `ch${chSlug}`, `lecture-${lecSlug}.md`);
    if (!fs.existsSync(mdPath)) continue;
    const outDir = path.join(distDir, `ch${chSlug}-lecture-${lecSlug}`);
    try {
      execSync(`npx slidev build "${mdPath}" --out "${outDir}"`, {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
      });
    } catch (e) {
      console.error(`Failed: ${mdPath}`);
    }
  }
}
console.log('Build complete.');
