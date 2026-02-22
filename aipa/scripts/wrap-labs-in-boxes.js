#!/usr/bin/env node
/**
 * Post-process AIPA.tex: lab boxes, frontmatter, Part title pages, R&N-style concept margins.
 * Adds \usepackage{framed}, geometry (larger left margin), marginnote, tgadventor, \concept macro.
 * To add more concept margin labels: add tex.replace for \item Term: -> \item \concept{term}: (first occurrence).
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEX_PATH = path.resolve(__dirname, '../AIPA.tex');
// cover.png in project root (parent of aipa/)
const COVER_PATH = path.resolve(__dirname, '../../cover.png');

/** Read PNG width/height from file header (IHDR chunk). Returns {width, height} or null. */
function readPngDimensions(filePath) {
  try {
    const buf = fs.readFileSync(filePath, { start: 0, end: 24 });
    if (buf.length < 24 || buf.toString('ascii', 1, 4) !== 'PNG') return null;
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  } catch {
    return null;
  }
}

/** Convert pixels to LaTeX points at 300 DPI (pt = px * 72/300). */
function pxToPt(px, dpi = 300) {
  return Math.round((px * 72) / dpi);
}

/** Find matching closing brace for opening brace at start. Returns end index (exclusive). */
function findMatchingBrace(str, start) {
  let depth = 0;
  for (let i = start; i < str.length; i++) {
    const c = str[i];
    if (c === '\\') { i++; continue; } // skip escaped char
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

/** Replace figure floats with center+captionof (fixes "Not in outer par mode" in paragraph context). */
function replaceFiguresWithCenter(tex) {
  const FIGURE_START = '\\begin{figure}';
  const FIGURE_END = '\\end{figure}';
  let result = '';
  let i = 0;
  while (i < tex.length) {
    const start = tex.indexOf(FIGURE_START, i);
    if (start === -1) {
      result += tex.slice(i);
      break;
    }
    result += tex.slice(i, start);
    const afterStart = start + FIGURE_START.length;
    // Skip whitespace and optional \centering
    let j = afterStart;
    const cm = tex.slice(j).match(/^\s*\\centering\s*/);
    if (cm) j += cm[0].length;
    // Find \pandocbounded{
    const pbMatch = tex.slice(j).match(/^\\pandocbounded\{/);
    if (!pbMatch) {
      result += tex.slice(start, tex.indexOf(FIGURE_END, start) + FIGURE_END.length);
      i = tex.indexOf(FIGURE_END, start) + FIGURE_END.length;
      continue;
    }
    const pbOpen = j + pbMatch[0].indexOf('{');
    const pbClose = findMatchingBrace(tex, pbOpen);
    if (pbClose === -1) {
      result += tex.slice(start, tex.indexOf(FIGURE_END, start) + FIGURE_END.length);
      i = tex.indexOf(FIGURE_END, start) + FIGURE_END.length;
      continue;
    }
    const pandocBlock = tex.slice(j, pbClose);
    let k = pbClose;
    while (/[\s\n]/.test(tex[k])) k++;
    // Find \caption{
    const capMatch = tex.slice(k).match(/^\\caption\{/);
    if (!capMatch) {
      result += tex.slice(start, tex.indexOf(FIGURE_END, start) + FIGURE_END.length);
      i = tex.indexOf(FIGURE_END, start) + FIGURE_END.length;
      continue;
    }
    const capOpen = k + capMatch[0].indexOf('{');
    const capClose = findMatchingBrace(tex, capOpen);
    if (capClose === -1) {
      result += tex.slice(start, tex.indexOf(FIGURE_END, start) + FIGURE_END.length);
      i = tex.indexOf(FIGURE_END, start) + FIGURE_END.length;
      continue;
    }
    const captionText = tex.slice(capOpen + 1, capClose - 1);
    const figEnd = tex.indexOf(FIGURE_END, capClose);
    result += `\\begin{center}\n${pandocBlock}\n\\end{center}\n\\captionof{figure}{${captionText}}\n\n`;
    i = figEnd + FIGURE_END.length;
  }
  return result;
}

function main() {
  let tex = fs.readFileSync(TEX_PATH, 'utf-8');

  // Cover page: build standalone cover.pdf (full-bleed), then include via pdfpages
  const COVER_TEX = path.resolve(__dirname, '../cover.tex');
  const COVER_PDF = path.resolve(__dirname, '../cover.pdf');
  if (fs.existsSync(COVER_PATH)) {
    const dims = readPngDimensions(COVER_PATH);
    if (dims) {
      // Cover: A4 full-bleed (image scaled to fill page)
      const coverTexContent = [
        '% Auto-generated: A4 full-bleed cover',
        '\\documentclass{article}',
        '\\usepackage[a4paper,margin=0pt]{geometry}',
        '\\usepackage{graphicx}',
        '\\pagestyle{empty}',
        '\\setlength{\\parindent}{0pt}',
        '\\begin{document}',
        '\\noindent\\includegraphics[width=\\paperwidth,height=\\paperheight,keepaspectratio=false]{../cover.png}',
        '\\end{document}'
      ].join('\n');
      fs.writeFileSync(COVER_TEX, coverTexContent, 'utf-8');
      // Build cover.pdf
      const aipaDir = path.dirname(COVER_TEX);
      spawnSync('pdflatex', ['-interaction=nonstopmode', '-output-directory', aipaDir, 'cover.tex'], {
        cwd: aipaDir,
        stdio: 'inherit'
      });
      if (!fs.existsSync(COVER_PDF)) {
        console.warn('cover.pdf build failed; skipping cover page.');
      } else {
        tex = tex.replace(
          /(\\documentclass\[\s*\]\{article\})/,
          '$1\n\\usepackage[a4paper,left=1.75in,right=1in,top=1in,bottom=1in]{geometry}\n\\usepackage{pdfpages}'
        );
        const coverBlock = [
          '',
          '% Cover page: A4 full-bleed',
          '\\includepdf{cover.pdf}',
          ''
        ].join('\n');
        tex = tex.replace(/\\begin\{document\}/, '\\begin{document}' + coverBlock);
        console.log('Added cover.pdf as first page (A4 full-bleed).');
      }
    } else {
      console.warn('cover.png exists but could not read dimensions; skipping cover page.');
    }
  } else {
    // No cover: add geometry with larger left margin for concept margin notes
    tex = tex.replace(
      /(\\documentclass\[\s*\]\{article\})/,
      '$1\n\\usepackage[a4paper,left=1.75in,right=1in,top=1in,bottom=1in]{geometry}'
    );
  }

  // Russell & Norvig style: larger left margin, marginal concept labels (Economica-like font)
  // Uses TeX Gyre Adventor (qag) as geometric sans; with XeLaTeX, switch to Economica via fontspec
  if (!tex.includes('\\usepackage{marginnote}')) {
    tex = tex.replace(
      /(\\usepackage\{graphicx\})/,
      '$1\n\\usepackage{tikz}\n\\usepackage{marginnote}\n\\usepackage{tgadventor}\n\\reversemarginpar\n\\setlength{\\marginparwidth}{1.2in}\n\\newcommand{\\concept}[1]{\\textbf{#1}\\marginnote{\\fontfamily{qag}\\selectfont\\small #1}}\n\\newcommand{\\aimaterm}[1]{\\textit{#1}\\marginnote{\\fontfamily{qag}\\selectfont\\scriptsize AIMA}}'
    );
  }

  // Use EB Garamond for text
  tex = tex.replace(/\\usepackage\{lmodern\}/, '\\usepackage{ebgaramond}');

  // Promote Part II, III, IV to \section (they incorrectly come through as \subsubsection)
  tex = tex.replace(/\\subsubsection\{Part (II|III|IV):/g, '\\section{Part $1:');

  // Start each Part on right (recto) page, with Part title page (Part N + description at bottom)
  const partDescriptions = {
    I: 'This part establishes what intelligence is---historically, structurally, and practically. It introduces the classical foundations of AI while seeding the capstone vision: the student\'s own AI agent.',
    II: 'This part covers representation and adaptation---how systems learn from data, how neural architectures encode structure, and how language models reframe the metabolism of knowledge.',
    III: 'This part addresses memory, inference, and agency---the components that turn representation into action. RAG, vector stores, logical and probabilistic reasoning, and tool-calling agents.',
    IV: 'This part integrates the student\'s AI---architectures, institutional context, and the capstone deployment. The book\'s structure closes the loop: the reader has built an agent.'
  };
  const partTitles = {
    I: 'Foundations of Intelligence as System',
    II: 'Learning Systems',
    III: 'Memory, Reasoning, and Action',
    IV: 'System Integration'
  };
  // Add cleardoublepage before each Part first
  tex = tex.replace(/(\n)(\\section\{Part (?:I|II|III|IV):)/g, '$1\\cleardoublepage\n$2');
  // Insert Part title page (Part N + description) before each Part section
  for (const num of ['I', 'II', 'III', 'IV']) {
    const desc = partDescriptions[num];
    const title = partTitles[num];
    const match = new RegExp(
      `(\\\\cleardoublepage)\\s*\\n(\\\\section\\{Part ${num}:[\\s\\S]*?\\}(?:\\\\label\\{[^}]+\\})?)\\s*\\n\\n`,
      'g'
    );
    tex = tex.replace(match,
      `$1\n\n\\thispagestyle{empty}\n\\null\\vfill\n\\begin{center}\n{\\Huge Part ${num}}\\\\[1.5em]\n{\\LARGE ${title}}\n\\vspace*{\\stretch{2}}\n\\begin{minipage}{0.75\\textwidth}\n\\centering\\small\n${desc}\n\\end{minipage}\n\\vfill\n\\end{center}\n\\clearpage\n\\pagestyle{plain}\n\n$2\n\n`
    );
  }

  // Promote Chapters 2,3,5,6,8,9,11,12 to \subsection (so all chapters 1-12 are same level)
  tex = tex.replace(/\\subsubsection\{Chapter (\d+):/g, '\\subsection{Chapter $1:');

  // Include lectures (paragraph level) in TOC
  tex = tex.replace(
    /(\\setcounter\{secnumdepth\}\{-\\maxdimen\})/,
    '\\setcounter{tocdepth}{4}\n$1'
  );


  // Fix inline chapter titles: "= Chapter N: Title" (first ch of each Part) → proper subsection
  tex = tex.replace(/(\.) = Chapter 1:\nIntelligence as Process\n\nWhat intelligence is,/g,
    '$1\n\n\\subsection{Chapter 1: Intelligence as Process}\n\nWhat intelligence is,');
  tex = tex.replace(/(\.) = Chapter 4: Learning from Data\n\nStatistical/g,
    '$1\n\n\\subsection{Chapter 4: Learning from Data}\n\nStatistical');
  tex = tex.replace(/(\.) = Chapter 7: Memory\nSystems\n\nRAG,/g,
    '$1\n\n\\subsection{Chapter 7: Memory Systems}\n\nRAG,');
  tex = tex.replace(/(\.) = Chapter 10: Architectures of\nIntelligence\n\nAgent/g,
    '$1\n\n\\subsection{Chapter 10: Architectures of Intelligence}\n\nAgent');

  // Add framed, xcolor, caption (for \captionof if needed)
  if (!tex.includes('\\usepackage{framed}')) {
    tex = tex.replace(
      /(\\usepackage\{graphicx\})/,
      '$1\n\\usepackage{xcolor}\n\\usepackage{framed}\n\\usepackage{caption}\n\\usepackage{newunicodechar}\n\\definecolor{shadecolor}{gray}{0.95}'
    );
  }

  // Map Unicode math symbols for pdflatex (from diagrams/alt text)
  // ᵢ (U+1D62) from ch05 lecture-01: "wᵢxᵢ" (perceptron formula)
  const unicodeMath = `\\newunicodechar{ᵢ}{\\ensuremath{_i}}
\\newunicodechar{≠}{\\ensuremath{\\neq}}
\\newunicodechar{↔}{\\ensuremath{\\leftrightarrow}}
\\newunicodechar{⇐}{\\ensuremath{\\Leftarrow}}
\\newunicodechar{∝}{\\ensuremath{\\propto}}
\\newunicodechar{Σ}{\\ensuremath{\\Sigma}}
\\newunicodechar{θ}{\\ensuremath{\\theta}}
\\newunicodechar{η}{\\ensuremath{\\eta}}
\\newunicodechar{∂}{\\ensuremath{\\partial}}
\\newunicodechar{√}{\\ensuremath{\\sqrt}}
\\newunicodechar{≈}{\\ensuremath{\\approx}}
\\newunicodechar{∧}{\\ensuremath{\\wedge}}
\\newunicodechar{∨}{\\ensuremath{\\vee}}
\\newunicodechar{α}{\\ensuremath{\\alpha}}
\\newunicodechar{β}{\\ensuremath{\\beta}}
\\newunicodechar{⊨}{\\ensuremath{\\models}}
\\newunicodechar{∀}{\\ensuremath{\\forall}}
\\newunicodechar{∃}{\\ensuremath{\\exists}}`;
  tex = tex.replace(/\\begin\{document\}/, unicodeMath + '\n\n\\begin{document}');

  // Fix figures: convert figure floats to center+captionof (avoids "Not in outer par mode").
  // \centering inside figure can fail in paragraph context; \begin{center} + \captionof is safer.
  tex = replaceFiguresWithCenter(tex);

  // Fix frontmatter: remove labels, fix layout, add page breaks
  tex = tex.replace(/\\maketitle\n\n/, '');
  tex = tex.replace(/\\subsection\{Half-Title\}\\label\{[^}]+\}\n\n/, '');
  tex = tex.replace(/\\subsection\{Title Page\}\\label\{[^}]+\}\n\n/, '');

  // Half-title: centered title only
  tex = tex.replace(
    /\\section\{Artificial Intelligence: A Postmodern\s+Approach\}\\label\{_artificial_intelligence_a_postmodern_approach\}\n\n/,
    '\\begin{center}\n\\vspace*{\\fill}\n{\\LARGE\\textbf{Artificial Intelligence: A Postmodern Approach}}\n\\vspace*{\\fill}\n\\end{center}\n\\clearpage\n\n'
  );

  // Title page: full layout
  tex = tex.replace(
    /\\section\{Artificial Intelligence: A Postmodern\s+Approach\}\\label\{_artificial_intelligence_a_postmodern_approach_2\}\n\n\\textbf\{A Guided Construction Manual for Intelligence\}\n\n/,
    '\\begin{center}\n\\vspace*{\\stretch{1}}\n{\\LARGE\\textbf{Artificial Intelligence: A Postmodern Approach}}\\\\[1em]\n\\textbf{A Guided Construction Manual for Intelligence}\n\\vspace*{\\stretch{1}}\n\\end{center}\n\\clearpage\n\n'
  );

  // Copyright: add clearpage before (pattern may vary with copyright content)
  tex = tex.replace(
    /(\n)(\\textbf\{Artificial Intelligence: A Postmodern Approach\} A Guided\s+Construction Manual for Intelligence\n\nCopyright)/,
    '$1\\clearpage\n$2'
  );

  // Preface: start on new page
  tex = tex.replace(
    /(\n)(\\subsection\{Preface\}\\label\{_preface\})/,
    '$1\\clearpage\n$2'
  );

  // Summary of Contents: start on new page
  tex = tex.replace(
    /(\n)(\\subsubsection\{Summary of Contents\}\\label\{_summary_of_contents\})/,
    '$1\\clearpage\n$2'
  );

  // Start each lecture on a fresh page (lecture = paragraph/subparagraph with N.M:)
  tex = tex.replace(/\n(\\(?:paragraph|subparagraph)\{\d+\.\d+)/g, '\n\\clearpage\n$1');

  // Center quips (epigraphs) as blockquotes: "quote" --- Author
  tex = tex.replace(
    /\n\n"([^"]+)" ---\s*\n\s*([^\n]+)\n\n/g,
    '\n\n\\begin{center}\n\\begin{quote}\n"$1" --- $2\n\\end{quote}\n\\end{center}\n\n'
  );
  tex = tex.replace(
    /\n\n"([^"]+)" --- ([^\n]+)\n\n/g,
    (m, q, a) => m.includes('\\begin{quote}') ? m : `\n\n\\begin{center}\n\\begin{quote}\n"${q}" --- ${a}\n\\end{quote}\n\\end{center}\n\n`
  );

  // Insert Table of Contents on its own page before Prologue, with PDF bookmark
  // Explicit \section*{Contents} ensures heading appears; tocdepth=2 keeps TOC compact (Parts + Chapters)
  if (!tex.includes('\\tableofcontents')) {
    tex = tex.replace(
      /(\n\\subsection\{Prologue)/,
      '\n\\clearpage\n\\phantomsection\n\\pdfbookmark[0]{Contents}{contents}\n\\pdfbookmark[1]{Table of Contents}{toc}\n\\section*{Contents}\n\\setcounter{tocdepth}{2}\n\\tableofcontents\n\\setcounter{tocdepth}{4}\n\\clearpage$1'
    );
  }

  // Promote Prologue and Epilogue to \section (align with Part level)
  tex = tex.replace(/\\subsection\{Prologue/g, '\\section{Prologue');
  tex = tex.replace(/\\subsection\{Epilogue/g, '\\section{Epilogue');

  // R&N-style: convert key phrases to \textbf in lists (avoid \concept here—marginnote overlaps in itemize)
  tex = tex.replace(
    /\\item\s+Stored-representation view:/,
    '\\item \\textbf{stored-representation view}:'
  );
  tex = tex.replace(
    /\\item\s+Process view:/,
    '\\item \\textbf{process view}:'
  );

  // Wrap each lab block. Lab starts with "=== Lab N:", ends before next lab or next chapter.
  let inLab = false;
  let result = '';
  const lines = tex.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isLabStart = /^=== Lab \d+:/.test(line);
    const isNextChapter = /\\subsubsection\{Chapter\s+\d+/.test(line) || /\\subsection\{Chapter\s+\d+/.test(line) || /\\subsubsection\{Part\s+/.test(line) || /\\section\{Part\s+/.test(line);
    const isEndDoc = /\\end\{document\}/.test(line);

    if (isLabStart) {
      if (inLab) result += '\\end{shaded}\n\n';
      result += '\\begin{shaded}\n';
      inLab = true;
    } else if (inLab && (isNextChapter || isEndDoc)) {
      result += '\\end{shaded}\n\n';
      inLab = false;
    }

    result += line + '\n';
  }

  if (inLab) result += '\\end{shaded}\n';

  fs.writeFileSync(TEX_PATH, result);
  console.log('Wrapped lab blocks in shaded boxes; TOC inserted.');
}

main();
