#!/usr/bin/env node
/**
 * Build 6-up PDF handouts (6 slides per page, 2×3 layout) per chapter.
 * Reads dist/pdf/chNN-lecture-MM.pdf; writes dist/6up/chNN.pdf.
 * Requires: npm run export-pdf (or build then export-pdf) to be run first.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const pdfDir = path.join(distDir, 'pdf');
const sixUpDir = path.join(distDir, '6up');

const COLS = 2;
const ROWS = 3;
const SLIDES_PER_PAGE = COLS * ROWS;

// A4 in points (72 pt = 1 inch)
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const CELL_WIDTH = PAGE_WIDTH / COLS;
const CELL_HEIGHT = PAGE_HEIGHT / ROWS;

fs.mkdirSync(sixUpDir, { recursive: true });

async function run() {
  for (let ch = 1; ch <= 12; ch++) {
    const chSlug = String(ch).padStart(2, '0');
    const allPages = [];

    for (let lec = 1; lec <= 8; lec++) {
      const lecSlug = String(lec).padStart(2, '0');
      const pdfPath = path.join(pdfDir, `ch${chSlug}-lecture-${lecSlug}.pdf`);
      if (!fs.existsSync(pdfPath)) continue;
      const bytes = fs.readFileSync(pdfPath);
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      for (let i = 0; i < pages.length; i++) allPages.push({ doc, page: pages[i] });
    }

    if (allPages.length === 0) {
      console.warn(`No PDFs found for chapter ${chSlug}; run export-pdf first.`);
      continue;
    }

    const outDoc = await PDFDocument.create();
    const sourceDocs = [...new Set(allPages.map((p) => p.doc))];

    for (let start = 0; start < allPages.length; start += SLIDES_PER_PAGE) {
      const chunk = allPages.slice(start, start + SLIDES_PER_PAGE);
      const outPage = outDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

      for (let i = 0; i < chunk.length; i++) {
        const { doc: srcDoc, page: srcPage } = chunk[i];
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = col * CELL_WIDTH;
        const y = (ROWS - 1 - row) * CELL_HEIGHT;

        const srcW = srcPage.getWidth();
        const srcH = srcPage.getHeight();
        const scale = Math.min(CELL_WIDTH / srcW, CELL_HEIGHT / srcH);

        const embedded = await outDoc.embedPage(srcPage);
        outPage.drawPage(embedded, {
          x,
          y,
          xScale: scale,
          yScale: scale,
        });
      }
    }

    const outBytes = await outDoc.save();
    const outPath = path.join(sixUpDir, `ch${chSlug}.pdf`);
    fs.writeFileSync(outPath, outBytes);
    console.log(`Wrote ${outPath} (${allPages.length} slides, 6-up).`);
  }
  console.log('6-up build complete.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
