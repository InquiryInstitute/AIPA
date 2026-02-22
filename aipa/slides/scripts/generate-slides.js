#!/usr/bin/env node
/**
 * Generate Slidev markdown decks from AIPA lecture AsciiDoc files.
 * Uses KROKI_DIAGRAM_CATALOG.md for Mermaid diagrams.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AIPA_ROOT = path.resolve(__dirname, '../..');
const KROKI_CATALOG = path.join(AIPA_ROOT, 'diagrams/KROKI_DIAGRAM_CATALOG.md');
const SLIDES_DIR = path.join(__dirname, '../slides');

/** Max bullets per slide; longer lists are split across multiple slides for ~90‑min lectures. */
const MAX_BULLETS_PER_SLIDE = 3;

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

function parseAdoc(content) {
  const sections = {};
  let title = '';
  let epigraph = '';
  let currentSection = null;
  let currentContent = [];
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('=== Lecture')) {
      title = line.replace(/^=== Lecture \d+: /, '').trim();
    } else if (line.match(/^===\s+\d+\.\d+:\s+.+/)) {
      title = line.replace(/^===\s+\d+\.\d+:\s+/, '').trim();
    } else if (line === '[.epigraph]') {
      const epigraphLines = [];
      i++;
      while (i < lines.length && lines[i] && !lines[i].startsWith('====')) {
        if (lines[i].startsWith('*') && lines[i].endsWith('*') && epigraphLines.length > 0) {
          epigraphLines.push(lines[i].slice(1, -1));
        } else if (!lines[i].startsWith('*')) {
          epigraphLines.push(lines[i]);
        }
        i++;
      }
      epigraph = epigraphLines.join('\n').trim();
      i--;
    } else if (line.match(/^=====\s+(?:Slide Points|Key Points)/i)) {
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
        currentSection = currentSection + '_slides';
        currentContent = [];
      }
    } else if (line.match(/^====\s+.+/)) {
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      currentSection = line.replace(/^====\s+/, '').trim().toLowerCase().replace(/\s+/g, '_');
      currentContent = [];
    } else if (currentSection && line && !line.startsWith('//')) {
      currentContent.push(line);
    }
  }
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return { title, epigraph, sections };
}

/** Convert pass:q[\aimaterm{term}] and \aimaterm{term} to *term* <span class="aima-tag">AIMA</span> for Slidev (italics). */
function expandAimaTerms(text) {
  if (!text) return '';
  return text
    .replace(/pass:q\[\\aimaterm\{([^}]+)\}\]/g, '*$1* <span class="aima-tag">AIMA</span>')
    .replace(/\\aimaterm\{([^}]+)\}/g, '*$1* <span class="aima-tag">AIMA</span>');
}

function adocBulletsToMarkdown(text) {
  if (!text) return '';
  return text
    .split('\n')
    .map((l) => {
      const m = l.match(/^\*\s+(.*)/);
      const bullet = m ? `- ${m[1]}` : (l.trim() ? l : '');
      return expandAimaTerms(bullet);
    })
    .filter(Boolean)
    .join('\n');
}

/** Split bullet markdown into chunks of at most maxPerSlide bullets; each chunk = one slide. */
function splitBulletsIntoSlides(markdown, maxPerSlide = MAX_BULLETS_PER_SLIDE) {
  if (!markdown) return [];
  const bullets = markdown.split(/\n(?=- )/).filter(Boolean);
  if (bullets.length === 0) return markdown.trim() ? [markdown] : [];
  const chunks = [];
  for (let i = 0; i < bullets.length; i += maxPerSlide) {
    chunks.push(bullets.slice(i, i + maxPerSlide).join('\n'));
  }
  return chunks;
}

function extractMermaidBlocks(catalogContent) {
  const blocks = {};
  const re = /### Ch(\d+) L(\d+):[^\n]*\n[\s\S]*?```mermaid\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(catalogContent)) !== null) {
    const ch = parseInt(m[1], 10);
    const lec = parseInt(m[2], 10);
    blocks[`${ch}-${lec}`] = m[3].trim();
  }
  return blocks;
}

function toSlidevMd(lecture, chapterNum, lectureNum, mermaid) {
  const { title, epigraph, sections } = lecture;
  const chSlug = String(chapterNum).padStart(2, '0');
  const slides = [];

  slides.push(`---
theme: default
title: ${title}
style: |
  .aima-tag { font-size: 0.65em; color: #888; vertical-align: super; margin-left: 0.15em; }
---

# ${expandAimaTerms(title)}

${epigraph ? `> ${expandAimaTerms(epigraph).split('\n').join('\n> ')}\n` : ''}`);

  function emitSectionSlides(title, rawContent) {
    const md = adocBulletsToMarkdown(rawContent);
    if (!md) return;
    const chunks = splitBulletsIntoSlides(md);
    chunks.forEach((chunk, idx) => {
      const heading = chunks.length > 1 && idx > 0 ? `${title} (continued)` : title;
      slides.push(`---
layout: default
---

# ${heading}

${chunk}`);
    });
  }

  emitSectionSlides('Conceptual Core', sections.conceptual_core_slides ?? sections.conceptual_core);
  emitSectionSlides('Technical Example', sections.technical_example_slides ?? sections.technical_example);
  emitSectionSlides('Philosophical Reflection', sections.philosophical_reflection_slides ?? sections.philosophical_reflection);
  emitSectionSlides('Discussion Prompts', sections.discussion_prompts_slides ?? sections.discussion_prompts);

  if (mermaid) {
    slides.push(`---
layout: default
---

# Diagram

\`\`\`mermaid
${mermaid}
\`\`\``);
  }

  emitSectionSlides('Lab Prep', sections.lab_prep_slides ?? sections.lab_prep);

  slides.push(`---
layout: center
---

# Questions?
`);
  return slides.join('\n\n');
}

function main() {
  const catalogContent = fs.readFileSync(KROKI_CATALOG, 'utf-8');
  const mermaidBlocks = extractMermaidBlocks(catalogContent);

  for (const ch of CHAPTERS) {
    const chDir = path.join(SLIDES_DIR, `ch${String(ch.num).padStart(2, '0')}`);
    fs.mkdirSync(chDir, { recursive: true });

    for (let lec = 1; lec <= 8; lec++) {
      const adocPath = path.join(
        AIPA_ROOT,
        ch.part,
        ch.slug,
        `lecture-${String(lec).padStart(2, '0')}.adoc`
      );
      if (!fs.existsSync(adocPath)) continue;

      const content = fs.readFileSync(adocPath, 'utf-8');
      const lecture = parseAdoc(content);
      const mermaid = mermaidBlocks[`${ch.num}-${lec}`] || null;
      const md = toSlidevMd(lecture, ch.num, lec, mermaid);

      const mdPath = path.join(chDir, `lecture-${String(lec).padStart(2, '0')}.md`);
      fs.writeFileSync(mdPath, md, 'utf-8');
      console.log(`Generated ${path.relative(AIPA_ROOT, mdPath)}`);
    }
  }
  console.log('Done.');
}

main();
