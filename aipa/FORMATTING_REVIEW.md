# AIPA PDF Formatting Review

## Summary

Review of `AIPA.pdf` (166 pages) based on LaTeX source analysis.

---

## Issues Found

### 1. **Inline Chapter Titles (Bug)**

The first chapter of each Part (Ch 1, 4, 7, 10) has its title rendered as inline text instead of a proper heading:

- Part I: `...the student's own AI agent. = Chapter 1: Intelligence as Process`
- Part II: `...metabolism of knowledge. = Chapter 4: Learning from Data`
- Part III: `...tool-calling agents. = Chapter 7: Memory Systems`
- Part IV: `...built an agent. = Chapter 10: Architectures of Intelligence`

**Cause:** AsciiDoc part-intro flows directly into the chapter index; the chapter `= Title` is not promoted to a section in DocBook/Pandoc output.

**Fix:** Post-process to replace `= Chapter N: Title` with `\subsection{Chapter N: Title}`.

---

### 2. **No Running Headers/Footers**

The document uses the default `plain` pagestyle (article class):
- **Header:** empty
- **Footer:** page number only (centered)

**Recommendation:** Add `fancyhdr` with:
- Running header: current Part or Chapter name
- Footer: page number (e.g., centered or outer margin for verso/recto)
- Different style for frontmatter (empty or minimal)

---

### 3. **Section Hierarchy Inconsistency**

- **Part I, Ch 1:** Chapter title is inline; `\subsection{Chapter Overview}`; lectures as `\paragraph` (1.1, 1.2) or `\subparagraph`.
- **Ch 2, 3, 5, 6, 8, 9, 11, 12:** `\subsubsection{Chapter N: Title}`; `\paragraph{Chapter Overview}`; lectures as `\subparagraph`.
- **Ch 4, 7, 10 (first chapter of Part II–IV):** Same inline-title issue; `\paragraph{Chapter Overview}`.

Lectures (N.M:) appear as `\paragraph` or `\subparagraph` depending on chapter nesting.

---

### 4. **Section Numbering Disabled**

`\setcounter{secnumdepth}{-\maxdimen}` disables all automatic numbering. Headings like "1.1", "2.3" are baked into the title text, which is fine for this design.

---

### 5. **PDF Metadata**

- `pdftitle={Artificial Intelligence}` (could be full title)
- `hidelinks` — links are present but not visibly styled

---

## What’s Working Well

- **Font:** EB Garamond
- **Frontmatter:** Half-title, title page, copyright, TOC
- **Lab boxes:** Shaded framing
- **Quips:** Centered blockquotes
- **Lecture page breaks:** Each lecture starts on a new page
- **Part hierarchy:** Part I–IV correctly as `\section` in TOC

---

## Recommended Next Steps

1. Fix inline chapter titles (Part 1, Ch 1, 4, 7, 10).
2. Add `fancyhdr` (or similar) for running headers and consistent footers.
3. Optionally adjust chapter/subsection hierarchy in AsciiDoc for more uniform `\section` / `\subsection` usage.
