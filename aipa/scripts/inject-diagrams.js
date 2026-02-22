#!/usr/bin/env node
/**
 * Inject Mermaid diagrams from KROKI_DIAGRAM_CATALOG into lecture adoc files.
 * Replaces // TODO: Diagram sections with [mermaid] blocks for asciidoctor-kroki.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AIPA_ROOT = path.resolve(__dirname, '..');
const KROKI_CATALOG = path.join(AIPA_ROOT, 'diagrams/KROKI_DIAGRAM_CATALOG.md');

const CHAPTERS = [
  { slug: 'ch01-intelligence-as-process', num: 1, part: 'part-i' },
  { slug: 'ch02-ai-in-practice', num: 2, part: 'part-i' },
  { slug: 'ch03-search-and-planning', num: 3, part: 'part-i' },
  { slug: 'ch04-learning-from-data', num: 4, part: 'part-ii' },
  { slug: 'ch05-neural-systems-and-representation', num: 5, part: 'part-ii' },
  { slug: 'ch06-language-and-models', num: 6, part: 'part-ii' },
  { slug: 'ch07-memory-systems', num: 7, part: 'part-iii' },
  { slug: 'ch08-reasoning-and-inference', num: 8, part: 'part-iii' },
  { slug: 'ch09-acting-in-the-world', num: 9, part: 'part-iii' },
  { slug: 'ch10-architectures-of-intelligence', num: 10, part: 'part-iv' },
  { slug: 'ch11-ai-in-institutions', num: 11, part: 'part-iv' },
  { slug: 'ch12-the-students-artificial-intelligence', num: 12, part: 'part-iv' },
];

function extractMermaidBlocks(catalogContent) {
  const blocks = {};
  const re = /### Ch(\d+) L(\d+):[^\n]*\n[\s\S]*?\*\*Purpose:\*\* ([^\n]+)\n[\s\S]*?```mermaid\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(catalogContent)) !== null) {
    const ch = parseInt(m[1], 10);
    const lec = parseInt(m[2], 10);
    const purpose = m[3].trim();
    const mermaid = m[4].trim();
    blocks[`${ch}-${lec}`] = { purpose, mermaid };
  }
  return blocks;
}

function injectDiagram(content, { purpose, mermaid: mermaidCode }, chNum, lecNum) {
  const diagramId = `ch${String(chNum).padStart(2, '0')}-l${String(lecNum).padStart(2, '0')}`;
  const caption = `Figure ${chNum}.${lecNum}: ${purpose}`;
  const block = `.${caption}
[mermaid,${diagramId},png]
....
${mermaidCode}
....`;

  const diagramSectionRe = /((?:==== Diagram\s*\n|\.Figure)[\s\S]*?)(\n==== )/;
  return content.replace(diagramSectionRe, `${block}\n\n$2`);
}

function main() {
  const catalogContent = fs.readFileSync(KROKI_CATALOG, 'utf-8');
  const mermaidBlocks = extractMermaidBlocks(catalogContent);
  let count = 0;

  for (const ch of CHAPTERS) {
    for (let lec = 1; lec <= 8; lec++) {
      const adocPath = path.join(
        AIPA_ROOT,
        ch.part,
        ch.slug,
        `lecture-${String(lec).padStart(2, '0')}.adoc`
      );
      if (!fs.existsSync(adocPath)) continue;

      const diagram = mermaidBlocks[`${ch.num}-${lec}`];
      if (!diagram) {
        console.warn(`No diagram for Ch${ch.num} L${lec}, skipping`);
        continue;
      }

      let content = fs.readFileSync(adocPath, 'utf-8');
      if (!content.includes('==== Diagram')) continue;

      const newContent = injectDiagram(content, diagram, ch.num, lec);
      if (newContent !== content) {
        fs.writeFileSync(adocPath, newContent, 'utf-8');
        console.log(`Injected diagram: ${path.relative(AIPA_ROOT, adocPath)}`);
        count++;
      }
    }
  }
  console.log(`Injected ${count} diagrams.`);
}

main();
