# Artificial Intelligence: A Postmodern Approach

**Design Document** — aligned to the MSAI curriculum and the "student builds an AI agent" philosophy.

This document is suitable for:
- curriculum committees
- editors
- publishers
- investors
- instructional designers
- or your own future self

---

## 1. Purpose of the Book

*Artificial Intelligence: A Postmodern Approach* is not only a textbook.
It is a guided construction manual for intelligence.

The book:
- mirrors the pedagogical structure of Russell & Norvig
- aligns directly to a 12-course MSAI curriculum
- treats intelligence as system + metabolism + infrastructure
- culminates in the student building their own working AI agent

It is:
- theory
- engineering guide
- philosophical critique
- systems architecture handbook
- curriculum spine

**Audience.** The book is suitable for **non-CS and non-technical students** as well as technical ones. An **AI Tutor** is part of the curriculum design: it teaches prerequisite topics (programming, math, tooling) on demand so that learners without a CS background can succeed. The same 12-chapter arc and agent-building path apply; the Tutor provides the on-ramp for those who need it.

---

## 2. Core Thesis

Traditional AI textbooks assume:

> **Intelligence is a set of representations stored in a system.**

This book instead argues:

> **Intelligence is the metabolism of knowledge across systems.**

Intelligence emerges from:
- transformation
- circulation
- representation
- integration
- action

AI systems are therefore:
- epistemic machines
- infrastructural actors
- institutional participants

The student's AI is not a toy model — it is a participant in knowledge flow.

---

## 3. Pedagogical Goals

By the end of the book + curriculum, the student will have built:

**A personal AI agent that can**
- reason over data
- retrieve and synthesize knowledge
- use tools
- perform tasks
- integrate with workflows
- operate locally or in cloud
- evolve over time

The curriculum trains students to:
- think like system architects
- treat AI as infrastructure
- understand epistemology + engineering together
- design knowledge flows, not just models

---

## 4. Structural Design

The book mirrors the system being built.

| Book Section | System Component |
|--------------|------------------|
| Foundations | Intelligence as process |
| Learning | Representation + adaptation |
| Reasoning | Memory + inference |
| Action | Agency + integration |
| Future | The student's AI and the last lecture |

The structure is deliberately recursive:

> The student reads about intelligence *while simultaneously building it.*

---

## 5. Book Structure

### Front Matter
- Cover (full bleed)
- Title page
- Copyright page
- Dedication (optional)
- Preface
- Prologue — Metabolism of Knowledge

---

### Part I — Foundations of Intelligence as System

**Chapter 1 — Intelligence as Process**  
What intelligence is, historically and structurally.

**Chapter 2 — AI in Practice**  
How intelligent systems actually operate in the world. Seeds the capstone vision early.

**Chapter 3 — Search and Planning**  
Classical AI foundations (ties to your dissertation work).

---

### Part II — Learning Systems

**Chapter 4 — Learning from Data**  
Statistical learning and modern ML.

**Chapter 5 — Neural Systems and Representation**  
Deep learning and emergent structure.

**Chapter 6 — Language and Models**  
LLMs, embeddings, and generative systems.

---

### Part III — Memory, Reasoning, and Action

**Chapter 7 — Memory Systems**  
RAG, vector stores, symbolic memory.

**Chapter 8 — Reasoning and Inference**  
Logic, probabilistic reasoning, structured thought.

**Chapter 9 — Acting in the World**  
Agents, tool use, execution.

---

### Part IV — System Integration

**Chapter 10 — Architectures of Intelligence**  
Agent stacks, pipelines, orchestration.

**Chapter 11 — AI in Institutions**  
Governance, epistemology, infrastructure.

**Chapter 12 — The Future of Intelligence**  
The chapter is about the future. Integration and deployment (bringing the student's system into the world) appear in the text as preparation for that future; the capstone as such is a course/syllabus element, not the textbook's focus. The book closes with a final lecture delivered by the machine—a Borges-voiced address on the metabolism of knowledge, what such systems would want you to learn about them, and what kind of intelligence societies are choosing to build.

---

### Epilogue — On Building Systems That Think

Closes the loop:

> The reader is no longer studying AI.  
> They have built one.

---

## 6. Lecture Structure

AIPA is a formal **Master of Science (MSc)–level curriculum**: 12 courses (one per chapter), each with 8 × 90-minute lectures and integrated labs. Program learning outcomes (PLOs), course learning outcomes (CLOs), syllabi, and assessment strategy are in `aipa/curriculum/` (see [MSc_PROGRAM_SPEC.md](aipa/curriculum/MSc_PROGRAM_SPEC.md) and [SYLLABUS_TEMPLATE.md](aipa/curriculum/SYLLABUS_TEMPLATE.md)). Institutions may adopt the full program or individual courses.

Each chapter = course module  
Each chapter contains:
- **8 lectures**
- each lecture ≈ 90 minutes
- each lecture includes:
  - conceptual core
  - technical example
  - philosophical reflection
  - diagram
  - lab prep

**Code in lectures.** Multi-line code (e.g. Lisp, Python) used in a lecture should live in a separate file under that chapter’s `code/` directory and be included as a figure. Example: `part-i/ch01-intelligence-as-process/code/diagnosis-rules.lisp` is included in lecture-02 via `include::code/diagnosis-rules.lisp[]` inside a `[source,lisp]` block with a figure caption. This keeps the lecture prose readable, allows reuse, and makes the listing a first-class artifact.

---

## 7. Labs & GitHub Classroom Integration

Each chapter includes tool-building assignments. **Every lab deliverable is a tool**—a server the student's agent invokes to extend its capabilities.

Students build tools:

| Chapter | Tool |
|---------|----------|
| Ch1 | Knowledge graph explorer |
| Ch2 | AI system audit tool |
| Ch3 | Search engine |
| Ch4 | ML model trainer |
| Ch5 | Neural classifier |
| Ch6 | Prompt/LLM pipeline |
| Ch7 | Vector memory system |
| Ch8 | Inference engine |
| Ch9 | Tool-calling agent |
| Ch10 | Agent orchestrator |
| Ch11 | AI governance simulator |
| Ch12 | Final AI agent repo |

Tools are built in GitHub Classroom repos, exposed as tool servers, and incorporated as submodules into the student's AI. The agent orchestrator discovers and calls these tools via the tool protocol (e.g., MCP).

---

## 8. Software Architecture Model

The student AI repository contains:

```
student-ai/
├── llm/
├── memory/
├── reasoning/
├── tools/                    # Tool servers
│   ├── search/               # Ch3 tool
│   ├── inference/            # Ch8 tool
│   ├── retriever/            # Ch7 tool
│   └── planner/
├── mcp/                      # Tool client + tool registry (MCP as reference impl)
├── interface/
├── orchestration/            # Invokes tools via tool protocol
└── deployment/
```

Each course contributes one tool. The orchestrator connects to tools via the tool protocol (e.g., MCP).

**The book literally mirrors the repo structure.**

---

## 9. Postmodern Framework

Postmodernism is not decorative — it is structural.

**What we mean by "postmodern" here.** We use the term to signal a set of commitments that shape how the book treats AI: (1) *Skepticism toward single grand narratives* — there is no one "true" definition of intelligence or knowledge; systems encode particular views that can be contested. (2) *Knowledge as produced, not merely discovered* — what counts as knowledge depends on institutions, practices, and infrastructure; AI systems participate in that production. (3) *Representation as constitutive and exclusive* — every representation includes some aspects of the world and excludes others; design choices are epistemic choices. These commitments inform the metabolism thesis (knowledge circulates and transforms), the emphasis on epistemic infrastructure (Ch11), and the recurring question "who governs what the system knows?"

**Thinkers and their role in the book.** The book draws on:
- **Foucault** — knowledge as institutional structure; epistemes (conditions that make certain knowledge possible); power exercised through norms and archives. AI systems are epistemic machines: they form, store, and circulate knowledge under conditions that are not neutral.
- **Derrida** — instability of representation; every representation excludes. State spaces, embeddings, and model outputs are reductions; what we omit shapes what we can find or say (see Ch3 Search, Ch6 embeddings).
- **Lyotard** — skepticism toward meta-narratives. We do not claim one unified theory of intelligence; we treat the field as multiple practices (search, learning, memory, reasoning, action) that cohere in the built system without collapsing into a single story.
- **Latour** — distributed agency; actors in networks. The agent is not a lone mind but a node in a network of tools, data, and users; agency is distributed across humans and non-humans (Ch9, Ch10).
- **Deleuze** — rhizomatic systems; non-hierarchical, multiply connected. The student's AI is modular and recombinable; knowledge flows through pathways that can branch and reconnect rather than follow a single tree.

**Pedagogical consequence.** In the lectures, these ideas appear in epigraphs, Philosophical Reflection sections, and discussion prompts—not as asides but as lenses through which technical choices are interpreted. When we ask "who governs epistemic circulation?" or "what does this representation exclude?" we are applying the framework. AI systems are treated as epistemic infrastructures, actors in networks, and producers of knowledge conditions. The book teaches both *how to build* and *how to see what is built* through that lens.

### 9.1 Postmodern fiction and film

The same commitments—skepticism toward meta-narratives, knowledge as produced, representation as constitutive—appear in postmodern fiction and film. They are optional but recommended for instructors and students who want to extend the lens beyond philosophy.

| Theme | Fiction | Film |
|-------|---------|------|
| Representation / branching / search | Borges, "The Garden of Forking Paths"; "The Library of Babel" | *Memento* (memory as reconstruction) |
| Reality as constructed / simulation | P.K. Dick, *Do Androids Dream…*; *Ubik* | *Blade Runner*; *The Matrix*; *Eternal Sunshine of the Spotless Mind* |
| Distributed agency / networks | Gibson, *Neuromancer* | *Her*; *Ex Machina* |
| Unreliable narrative / no single story | Pynchon, *Gravity's Rainbow*; Borges, "Tlön, Uqbar, Orbis Tertius" | *Adaptation.*; *Synecdoche, New York* |
| Memory and identity | Borges; Dick | *Eternal Sunshine*; *Memento*; *Blade Runner* |

Instructors may assign short stories or films as optional discussion prompts; the Reading List and selected lectures cite them where relevant.

---

## 10. Diagram Strategy

Each lecture includes one diagram.

Types include:
- system flow diagrams
- knowledge graphs
- agent pipelines
- architecture stacks
- epistemic maps

Tools recommended:
- Kroki (diagram-as-code)
- Mermaid
- PlantUML
- Graphviz

Diagrams double as repo documentation.

---

## 11. Tone & Style

The book mirrors AIMA structurally but differs philosophically.

It combines:
- rigorous technical exposition
- system diagrams
- philosophical commentary
- reflective passages
- historical framing

The tone: **precise, curious, occasionally unsettling**

It should feel like:
- a textbook
- a field guide
- a manifesto
- a construction manual

*simultaneously.*

---

## 12. Target Audience

**Primary:**
- graduate students in AI/ML
- technically curious professionals
- architects of AI systems

**Secondary:**
- educators designing AI programs
- institutions adopting AI workflows
- engineers transitioning to agent systems

---

## 13. Deliverables

The book produces:
- a functioning student AI
- a modular GitHub toolchain
- a knowledge infrastructure model
- a reusable curriculum spine

The book itself becomes:
- curriculum
- blueprint
- reference manual
- intellectual framework

---

## 14. Why This Book Matters

Most AI textbooks teach *models*.

This book teaches:
- systems
- epistemology
- integration
- agency
- architecture

It does not teach AI as a subject.

**It teaches AI as a practice.**

---

## 15. LLM-assisted lecture review

Lecture prose and PlantUML diagrams can be reviewed and revised with the **Supabase llm-gateway** from [Inquiry.Institute](https://github.com/.../Inquiry.Institute). From the `aipa` directory, set `SUPABASE_URL` and `SUPABASE_ANON_KEY` (same project as Inquiry.Institute), then run:

```bash
node scripts/review-lectures-with-llm.mjs
```

This calls the gateway for each lecture and writes Markdown reviews (narrative arc, density, diagram fit, suggested edits) under `aipa/llm-reviews/`. See `aipa/scripts/README_LLM_REVIEW.md` for prerequisites and options (`--dry-run`, `--limit N`).
