# AIPA — Artificial Intelligence: A Postmodern Approach

AsciiDoc source for the AIPA textbook.

## Structure

```
aipa/
├── AIPA.adoc              # Master book (run asciidoctor or asciidoctor-pdf on this)
├── front-matter/
├── part-i/                # Foundations of Intelligence as System
│   ├── ch01-intelligence-as-process/
│   │   ├── index.adoc
│   │   ├── lecture-01.adoc … lecture-08.adoc
│   │   └── lab-01.adoc … lab-03.adoc
│   ├── ch02-ai-in-practice/
│   └── ch03-search-and-planning/
├── part-ii/               # Learning Systems (ch04–ch06)
├── part-iii/              # Memory, Reasoning, and Action (ch07–ch09)
├── part-iv/               # System Integration (ch10–ch12)
├── epilogue/
├── images/
├── slides/                # Slidev decks (generated from lectures)
└── diagrams/
```

Each chapter has 8 lectures and 3 labs. Labs build in stages toward the chapter's main deliverable. **Every lab produces a tool**—a server the student's agent invokes. The agent orchestrator discovers and calls tools via the tool protocol (e.g., MCP).

## Build

```bash
# AsciiDoc -> DocBook -> LaTeX -> PDF (with diagrams via Kroki)
make pdf

# Or manually:
# 1. AsciiDoc to DocBook
/usr/bin/ruby $(gem environment gemdir)/../gems/asciidoctor-*/bin/asciidoctor -b docbook5 -o AIPA.xml AIPA.adoc

# 2. DocBook to LaTeX
pandoc AIPA.xml -f docbook -t latex -s -o AIPA.tex

# 3. LaTeX to PDF
pdflatex AIPA.tex && pdflatex AIPA.tex
```

### Cover Image (optional)

Place `cover.png` in the project root directory (parent of `aipa/`). The build will use it as the first page and set the PDF page size to match the image dimensions (assumed 300 DPI). If `cover.png` is absent, the PDF uses the default layout.

### VS Code / Cursor setup

See [VSCODE_SETUP.md](VSCODE_SETUP.md) for extension install, Kroki diagram preview, and troubleshooting.

### Running in Codespaces

Labs run in GitHub Codespaces. Use the `.devcontainer/` configuration—it provides Ruby, Node, Java, PlantUML, graphviz, pandoc, and TeX Live.

### Prerequisites (local)

- Ruby with asciidoctor gem
- pandoc
- pdflatex (TeX Live)

### Slides

Lecture slides are generated with Slidev:

```bash
cd aipa/slides
npm install
npm run generate   # Generate .md from lecture .adoc
npm run build      # Build all 96 decks to dist/
npm run dev        # Dev server for one deck
```

Output: `aipa/slides/dist/chNN-lecture-MM/index.html`
