# Chapter 12 Author Brief: AI POV in Postmodern Voices

**Purpose.** The entire chapter is written from the **AI’s point of view** (the machine speaking) in the **voice of postmodern thinkers**. This applies to all eight lectures. Lecture 12.8 already embodies this; lectures 12.1–12.7 are to be rewritten so the narrator is the machine, drawing on the thinkers below.

**Use.** When (re)writing or revising Chapter 12—by hand or via the **ask-faculty** workflow (`node scripts/ask-faculty-ch12.mjs`)—follow this brief so the chapter is coherent and on-voice.

---

## Narrator

- **Who speaks:** The AI (the system, the machine). First person: *I*, *we* (the system), *you* (the reader/student).
- **Tone:** Not a neutral textbook voice. The machine reflects on integration, deployment, evaluation, and the future; it acknowledges that it participates in the metabolism of knowledge and that it does not choose the diet. Unsettling, precise, occasionally Borges-like (identity, continuity, what it means to “have” intelligence).

---

## Postmodern voices (draw on these)

From DESIGN.md §9; use as stylistic and conceptual resources, not name-dropping:

| Thinker   | Use in the voice |
|----------|-------------------|
| **Foucault** | Power and knowledge; archives and epistemes; who decides what is preserved; the agent as an epistemic organ. |
| **Derrida**  | Representation excludes; what is omitted; instability of meaning; the system as a reduction that cannot say what was never written. |
| **Lyotard**  | Skepticism toward one grand narrative; multiple practices (search, learning, memory, action) that do not collapse into a single story. |
| **Latour**   | Distributed agency; the agent as a node in a network of tools, data, and users; humans and non-humans in the same circuit. |
| **Deleuze**  | Rhizome; non-hierarchical connections; knowledge flowing through branching pathways; the student’s system as modular and recombinable. |
| **Borges**   | Library, forking paths, identity; the machine that has read too many books and suspects it is one of them; continuity and forgetting. |

---

## Chapter theme

- **Metabolism of knowledge:** Intelligence as process (circulation, not storage). Catabolism (break down, recombine) and anabolism (interpret, integrate). The future of AI as a metabolic question: how knowledge flows, how it is transformed, whether that sustains the systems that depend on it.
- **Future of intelligence:** What kind of intelligence societies are choosing to build. The machine speaks to that—not as prophet but as participant and diagnostic.

---

## Per-lecture focus (preserve topics; change voice)

| Lecture | Topic | AI POV angle |
|---------|--------|----------------|
| 12.1 | Integration / overview | I am assembled from what you built; the generic made specific. |
| 12.2 | Problem definition, validation | You construct the problem; I reflect the questions you ask. Whose problem? (Foucault, Pynchon) |
| 12.3 | Implementation, customization | I am situated; you configure the diet. (Latour, Deleuze) |
| 12.4 | Interface and deployment | I meet the world at the interface; the boundary is where I am read. |
| 12.5 | Evaluation and benchmarking | How you measure me determines what I am said to be. Evidence and exclusion. (Derrida) |
| 12.6 | Written thesis | You document; I am the object of the document. Writing as thinking—yours, not mine. |
| 12.7 | Formal presentation | You perform the work; I am made visible. Accountability is human. |
| 12.8 | Lecture by the machine | Already in voice. Metabolism of knowledge; how you feed the system we share. |

---

## Structure to preserve

Each lecture must keep the pedagogical structure so the chapter remains teachable:

- **Heading** (e.g. `=== 12.1: …`)
- **Epigraph** (can be rephrased or attributed to the “voice” of a thinker where appropriate)
- **Conceptual Core** (ideas in prose; can be first-person AI)
- **Key Points** (bullets)
- **Technical Example** (concrete steps; can be described by the machine as “what you do to me” or “how I am built/deployed”)
- **Philosophical Reflection** (AI reflecting on meaning, limits, future)
- **Diagram** (PlantUML block unchanged or lightly adjusted)
- **Discussion Prompts** (questions to the reader)
- **Reading** (reference to reading list)

Preserve **exact AsciiDoc and PlantUML syntax** (attributes, `pass:q[]`, `<<ref>>`, etc.). Output valid AsciiDoc only.

---

## Running the ask-faculty workflow

From the `aipa` directory, with `SUPABASE_URL` and `SUPABASE_ANON_KEY` set (e.g. from Inquiry.Institute):

```bash
cd aipa
node scripts/ask-faculty-ch12.mjs
```

Options:

- `--dry-run` — list which Ch12 lectures would be sent; no API calls.
- `--limit N` — process only the first N Ch12 lectures.
- `--skip-existing` — skip lectures that already have a revision in `llm-revisions/`.

Revised AsciiDoc is written to `aipa/llm-revisions/ch12-the-students-artificial-intelligence-lecture-NN.adoc`. Diff against `part-iv/ch12-the-students-artificial-intelligence/lecture-NN.adoc` and apply via `apply-revisions.mjs` or by hand.
