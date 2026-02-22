# AIPA Lecture Slides

Slidev presentations for all 96 AIPA lectures. Generated from AsciiDoc sources and Mermaid diagrams in the Kroki catalog.

Slides and the book share one source per lecture, but **can have different content**. When a lecture subsection uses full prose for the book, add an optional `===== Key Points` sub-block with condensed bullets tailored for presentation. The generator prefers Key Points when present; otherwise it uses the main section content (backward compatible with outline-only lectures).

## Quick Start

```bash
npm install
npm run generate   # Generate .md from lecture .adoc
npm run build      # Build all 96 decks to dist/
npm run dev        # Dev server for one deck (ch01/lecture-01)
```

## Output

- **Decks:** `dist/chNN-lecture-MM/index.html`
- **PDF export:** `npm run export-pdf` → `dist/pdf/chNN-lecture-MM.pdf` (one slide per page)
- **6-up handouts:** `npm run build-6up` (after export-pdf) → `dist/6up/chNN.pdf` (6 slides per page, 2×3). For instructor manual embedding use `npm run build:instructor` (build + export-pdf + build-6up).

## Structure

- `slides/` — Generated Slidev Markdown (ch01 … ch12, 8 lectures each)
- `scripts/generate-slides.js` — Parses adoc, pulls Mermaid from KROKI_DIAGRAM_CATALOG
- `scripts/build-all.js` — Builds each deck with Slidev

## AIMA terms

When lecture AsciiDoc uses `pass:q[\aimaterm{term}]`, the slide generator converts it to **term** <span class="aima-tag">AIMA</span>, matching the book’s convention. The `.aima-tag` style is injected into each deck’s frontmatter.
