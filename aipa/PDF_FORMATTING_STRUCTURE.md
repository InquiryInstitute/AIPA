# AIPA PDF: Formatting and Structure Overview

## Build Pipeline

```
AIPA.adoc  →  AsciiDoctor (DocBook5)  →  AIPA.xml  →  Pandoc (LaTeX)  →  AIPA.tex
                                                                              ↓
                                                                    wrap-labs-in-boxes.js
                                                                              ↓
                                                                    pdflatex × 2  →  AIPA.pdf
```

- **AsciiDoctor:** Converts AsciiDoc to DocBook5; uses Kroki for Mermaid diagrams
- **Pandoc:** DocBook → LaTeX (standalone)
- **Post-process script:** Font, section promotion, frontmatter layout, TOC, lab boxes, quips
- **pdflatex:** Two passes for cross-references and TOC

---

## Document Structure

### Frontmatter

| Element | Content | Layout |
|---------|---------|--------|
| **Cover** | `cover.png` in project root (optional) | Full-bleed first page; PDF page size = image dimensions @ 300 DPI |
| Half-title | Title only, centered | `\begin{center}\vspace*{\fill}...\end{center}\clearpage` |
| Title page | Title, subtitle | Centered, vertical stretch |
| Copyright | © 2026 Inquiry Institute | Left-aligned |
| Dedication | (empty/TODO) | — |
| **Preface** | Distinguishing features, Overview, Using this Book, Acknowledgements | `\subsection` + `\subsubsection` sections |
| **Summary of Contents** | Parts (I–IV) and Chapters (1–12) only; roman numerals for Parts | Inside Preface; `[upperroman]` ordered list |
| **Contents** | Full table of contents (lectures, labs) | Own page; `\tableofcontents` |
| **Prologue** | The Metabolism of Knowledge | `\section` (same level as Part) |

### Main Matter

| Level | LaTeX | Example |
|-------|-------|---------|
| **Part** | `\section` | Part I: Foundations of Intelligence as System |
| **Part title page** | (inserted before each Part) | Centered "Part I", part name, brief description at bottom |
| **Chapter** | `\subsection` | Chapter 1: Intelligence as Process |
| **Chapter Overview** | `\subsection` | (per-chapter intro) |
| **Lecture** | `\paragraph` / `\subparagraph` | 1.1: Definitions of Intelligence... |
| **Lecture subsections** | `\paragraph` / `\subparagraph` | Conceptual Core, Technical Example, Philosophical Reflection, Lab Prep |

### Back Matter

| Element | LaTeX | Content |
|---------|-------|---------|
| **Bibliography** | `\appendix` / `\section` | References from `references/references.bib` and `references/references.adoc` |
| **Epilogue** | `\section` | Epilogue — After the Reaction |

Bibliography and citations: Use `<<key>>` in AsciiDoc to cite entries; bibliography entries use `[[[key]]]` format in `references/references.adoc`. BibTeX in `references/references.bib` for external tools.

---

## Section Hierarchy (LaTeX)

```
\section{Part I/II/III/IV}           ← Top-level, starts on recto
  \subsection{Chapter N}
    \subsection{Chapter Overview}
    \subsubsection{1.1: ...}         ← First lecture of Ch 1
    \paragraph{1.2: ...}             ← Subsequent lectures (Ch 1)
    \subparagraph{2.1: ...}          ← Lectures in Ch 2+
    \paragraph{Conceptual Core}
    \subparagraph{Technical Example}
    ...
```

---

## Post-Processing (wrap-labs-in-boxes.js)

### Font & Packages
- EB Garamond (replaces lmodern)
- framed, xcolor, shadecolor for lab boxes

### Section Promotions
- Part II, III, IV: `\subsubsection` → `\section`
- Chapters 2,3,5,6,8,9,11,12: `\subsubsection` → `\subsection`
- Prologue, Epilogue: `\subsection` → `\section`

### Page Breaks
- Parts: `\cleardoublepage` before each Part (start on right/recto); Part title page (Part N + description) inserted before each Part section, then `\clearpage` before content
- Lectures: `\clearpage` before each `\paragraph{N.M:` or `\subparagraph{N.M:`
- TOC: `\clearpage` before; Contents on its own page
- Copyright: `\clearpage` before

### Frontmatter Layout
- Remove `\maketitle`, half-title/title-page subsection labels
- Half-title: centered, `\vspace*{\fill}`
- Title page: centered with vertical stretch
- Inline chapter titles (Ch 1, 4, 7, 10): replace with `\subsection{Chapter N: Title}`

### Content Formatting
- **Quips:** `"quote" --- Author` → `\begin{center}\begin{quote}...\end{quote}\end{center}`
- **Labs:** Wrap `=== Lab N:` blocks in `\begin{shaded}...\end{shaded}` (gray 0.95)

### TOC
- Inserted before Prologue
- `tocdepth=4` (shows paragraph level: lectures, Conceptual Core, etc.)

---

## Lecture Structure (AsciiDoc)

Each lecture (e.g., `lecture-01.adoc`) contains:
- `=== N.M: Title` (e.g., 1.1: Definitions of Intelligence...)
- `[.epigraph]` + quip
- `==== Conceptual Core` + content (prose or bullets)
- `==== Technical Example` + content
- `==== Philosophical Reflection` + content
- `==== Lab Prep` + content
- Optional figure (Mermaid diagram)

### Key Points (optional)

An optional `===== Key Points` subsection can appear under any `====` section. When present, the slide generator uses these bullets for the presentation; otherwise it falls back to the main section content. Use this when the book has prose but slides need condensed bullets. In the book, "Key Points" renders as a level-5 heading.

```
==== Conceptual Core

Book prose goes here. Multiple paragraphs. The stored-representation view holds...

===== Key Points

* Stored-representation: knowledge inside a system
* Process view: transformation and circulation
* Why the distinction matters for AI
```

In **slides**, the Key Points block is used as the slide content source. See `LECTURE_POPULATION_PLAN.md` and `slides/README.md` for details.

---

## Lab Structure

Labs are AsciiDoc sidebar blocks (`****`) in each chapter index:
- Lab 1, 2, 3 per chapter (36 total)
- Wrapped in LaTeX `\begin{shaded}...\end{shaded}` for gray background

---

## Table of Contents Depth

- **tocdepth = 4** → section, subsection, subsubsection, paragraph
- Includes: Parts, Chapters, Chapter Overview, lectures (1.1, 1.2...), Conceptual Core, Technical Example, Philosophical Reflection, Lab Prep

---

## Russell & Norvig–Style Concept Margins

- **Left margin:** 1.75in (wider than right) for marginal concept labels
- **Margin notes:** `\reversemarginpar` places notes on the left
- **Concept font:** TeX Gyre Adventor (geometric sans; Economica-like). With XeLaTeX, switch to Economica via fontspec.
- **`\concept{term}`:** Bold term in text + same term in margin (Adventor font). Use for single/two-word new-concept highlights.
- **`\aimaterm{term}`:** Bold term in text + "AIMA" in margin. Use when the term is formally defined in _Artificial Intelligence: A Modern Approach_ (Russell & Norvig); signals "see AIMA for the standard treatment."

Example: `\concept{stored-representation view}` → bold in body + "stored-representation view" in left margin.
Example: `\aimaterm{agent}` → bold "agent" + "AIMA" in left margin.

**AIMA terms:** Use `pass:q[\aimaterm{term}]` in AsciiDoc. See `aima-terms.txt` for a curated list of AIMA-indexed terms. Slides: the same syntax is converted to **term** <span class="aima-tag">AIMA</span> by `generate-slides.js`.

## Page Style

- **Document class:** article (not book)
- **Pagestyle:** plain (default) — page number centered in footer, no header
- **Numbering:** All section numbering disabled (`secnumdepth=-\maxdimen`); numbers (1.1, 2.3) are in heading text

---

## Known Issues

1. **LaTeX "Not in outer par mode"** — Occurs at figure `\centering`; figures appear after `\paragraph`/`\subparagraph`, which creates a restricted par context. PDF still builds (220 pages). Fix would require Pandoc/template changes or converting figures to non-float `center`+`\captionof`.
2. **No running headers** — No chapter/part names in headers; could add `fancyhdr`.
3. **"Label(s) may have changed"** — Mitigated by running pdflatex three times in Makefile.

---

## File Map

| Path | Purpose |
|------|---------|
| `cover.png` (project root) | Optional front cover; PDF page size set to match image @ 300 DPI |
| `AIPA.adoc` | Master document, includes all parts |
| `front-matter/` | half-title, title-page, copyright, dedication, prologue |
| `part-{i,ii,iii,iv}/` | part-intro.adoc + chNN-*/index.adoc |
| `part-*/ch*/` | index.adoc (chapter), lecture-0N.adoc, lab-0N.adoc |
| `epilogue/epilogue.adoc` | Epilogue — After the Reaction |
| `scripts/wrap-labs-in-boxes.js` | LaTeX post-process |
| `images/` | Generated Mermaid/PNG figures |
