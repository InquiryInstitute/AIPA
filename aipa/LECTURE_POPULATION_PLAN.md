# AIPA Lecture Population Plan

Plan for populating each of the 96 lectures in the book. Use this as a roadmap for content development, prioritization, and tracking.

---

## Target: 90 Minutes per Lecture

Each lecture should support **~90 minutes** of delivery (including discussion, diagram walkthrough, and Q&A).

| Metric | Target | Notes |
|--------|--------|-------|
| **Slides** | 18–25 per lecture | ~4–5 min per slide |
| **Book prose** | 4–6 paragraphs per subsection | Conceptual Core, Technical Example, Philosophical Reflection |
| **Key Points** | 6–12 bullets per section | Split across 2–3 slides when >5 bullets |
| **Lab Prep** | 3–5 bullets | Link clearly to lab objectives |

**Current state:** Most lectures have 7–8 slides (~25–35 min). Expand prose and Key Points to reach 90-min density.

---

## Current State

| Component | Count | Status |
|-----------|-------|--------|
| **Chapters** | 12 | All have index.adoc |
| **Lectures** | 96 | All have scaffold: epigraph, Conceptual Core, Technical Example, Philosophical Reflection, optional Discussion Prompts, Lab Prep, optional diagram |
| **Labs** | 36 | All have scaffold: Objectives, Deliverables, Lab Prep |

**Content density:** Most lectures are in *outline form* (bullet points). Ch1 L1 has full prose; others need expansion. Target 90 min per lecture.

---

## Slides vs. Book

Slides and book chapter sections share one source (the lecture `.adoc` file) but can have *different* content:

| Output | Source | Content |
|--------|--------|---------|
| **Book** | `lecture-NN.adoc` (via AIPA.adoc) | Prose paragraphs (2–4 per subsection) |
| **Slides** | Same file, parsed by `generate-slides.js` | Condensed bullets (3–6 per slide) |

**Two deliverables per subsection:** For each lecture section (Conceptual Core, Technical Example, Philosophical Reflection, Lab Prep):

- **(a) Book prose** — 4–6 paragraphs per subsection for the printed chapter (90-min density).
- **(b) Key points** — Optional `===== Key Points` sub-block with 6–12 bullets tailored for presentation. When absent, the generator falls back to the main section content (backward compatible with outline-only lectures).

**When adding prose:** Add `===== Key Points` with condensed bullets so slides remain effective. For 90 min, aim for 6–12 bullets per section; the slide generator splits long lists into multiple slides automatically.

**90-min slide count:** Conceptual Core (2–3 slides), Technical Example (2–3 slides), Philosophical Reflection (1–2 slides), Discussion Prompts (1–2 slides), Diagram (1), Lab Prep (1–2 slides) → ~15–20 slides total. `generate-slides.js` uses `MAX_BULLETS_PER_SLIDE = 3`; longer lists auto-split.

**Pilot:** Lecture 1.1 now has ~15 slides (includes Discussion Prompts); supports ~75–90 min with discussion.

---

## Definition of "Populate"

For this plan, **populate** means:

1. **Chapter overviews** — Replace `// TODO` with 2–4 paragraph introductions that frame the chapter.
2. **Lecture bullets → prose** — Expand bullet outlines into readable paragraphs (3–6 sentences per subsection).
3. **Labs** — Expand Objectives/Deliverables with concrete steps and acceptance criteria.
4. **AIMA term markers** — Add `pass:q[\aimaterm{term}]` where appropriate (see `aima-terms.txt`).
5. **Consistency** — Ensure cross-references, tone, and terminology align across chapters.

---

## Lecture Structure (Template)

Each lecture follows this structure. Populate each section accordingly. Use optional `===== Key Points` when prose and slides should differ (see Slides vs. Book).

```
=== N.M: Title
:leveloffset: 2

[.epigraph]
"Quote" — Author

*Optional italic lead sentence.*

==== Example Prompts

* "Example user prompt" — _What the lecture addresses: how the AI solves it_
* "Another prompt" — _Link to concept or tool_

==== Conceptual Core
Book prose goes here. Multiple paragraphs. The stored-representation view holds that...

===== Key Points
* Stored-representation: knowledge inside a system
* Process view: transformation and circulation
* Why the distinction matters for AI

==== Technical Example
Book prose...

===== Key Points
* Bullet 1 for slides
* Bullet 2 for slides

==== Philosophical Reflection
* Bullets → expand to 1–2 paragraphs

.Figure N.M: Caption
[mermaid,chNN-lMM,png]
....(existing)....

==== Discussion Prompts
* Optional: 4–6 prompts for breakout or reflection

==== Lab Prep
* Bullets → expand or keep concise; link to lab

==== Reading
For readings for this chapter, see the <<reading-list,Reading List>> (<<reading-chNN,Chapter N>>).
```

---

## Population Phases

### Phase 1: Chapter Overviews (12 items)
**Effort:** ~2–4 hours total  
**Output:** Each `part-*/chNN-*/index.adoc` gets a real "Chapter Overview" paragraph block.

| Ch | Chapter | Overview focus |
|----|---------|----------------|
| 1 | Intelligence as Process | Stored vs. flowing; metabolism thesis |
| 2 | AI in Practice | From theory to tooling; real-world AI |
| 3 | Search and Planning | Classical search; planning as search |
| 4 | Learning from Data | Statistical learning; generalization |
| 5 | Neural Systems and Representation | Deep learning; representation learning |
| 6 | Language and Models | LLMs; prompt architecture; knowledge flow |
| 7 | Memory Systems | RAG; vector stores; hybrid memory |
| 8 | Reasoning and Inference | Logic; probability; uncertain reasoning |
| 9 | Acting in the World | Agents; tools; ReAct; orchestration |
| 10 | Architectures of Intelligence | System design; modularity |
| 11 | AI in Institutions | Governance; deployment; ethics |
| 12 | The Student's Artificial Intelligence | Capstone; integration; deployment |

### Phase 2: Part I — Foundations (Ch 1–3)
**24 lectures**  
**Effort:** ~2–3 hours per lecture (outline → prose)  
**Order:** Ch 1 → Ch 2 → Ch 3 (builds on prior)

### Phase 3: Part II — Learning Systems (Ch 4–6)
**24 lectures**  
**Effort:** ~2–3 hours per lecture  
**Order:** Ch 4 → Ch 5 → Ch 6

### Phase 4: Part III — Memory, Reasoning, Action (Ch 7–9)
**24 lectures**  
**Effort:** ~2–3 hours per lecture  
**Order:** Ch 7 → Ch 8 → Ch 9

### Phase 5: Part IV — Integration (Ch 10–12)
**24 lectures**  
**Effort:** ~2–3 hours per lecture  
**Order:** Ch 10 → Ch 11 → Ch 12

### Phase 6: Labs (36 labs)
**Effort:** ~1–2 hours per lab  
**Approach:** Expand objectives, add step-by-step instructions, define acceptance criteria. Can run in parallel with lecture prose once lecture outlines are stable.

### Phase 7: Pass 2 — AIMA Markers and Consistency
**Effort:** ~1 day  
**Tasks:**
- Add `pass:q[\aimaterm{term}]` where terms from `aima-terms.txt` appear
- Cross-check terminology and cross-references
- Ensure Lab Prep links correctly to labs

---

## Prioritization

**High priority (core narrative):**
- Ch 1 (Intelligence as Process) — sets up metabolism thesis
- Ch 4 (Learning from Data) — foundation for neural/language
- Ch 7 (Memory Systems) — RAG as first-class module
- Ch 9 (Acting in the World) — agents and tools

**Medium priority (supporting):**
- Ch 2, 3 (AI in Practice, Search) — classical foundations
- Ch 5, 6 (Neural, Language) — representation and LLMs
- Ch 8 (Reasoning) — bridges memory and action

**Lower priority (integration):**
- Ch 10, 11, 12 — Architectures, Institutions, Capstone (depend on earlier content)

---

## Per-Lecture Checklist

When populating a lecture, use this checklist:

- [ ] **Title and epigraph** — Present and appropriate
- [ ] **Conceptual Core** — 2–4 paragraphs; bullets expanded to prose
- [ ] **Technical Example** — 1–3 paragraphs; concrete illustration
- [ ] **Philosophical Reflection** — 1–2 paragraphs; interpretive depth
- [ ] **Figure** — Mermaid diagram present and correct (or placeholder noted)
- [ ] **Lab Prep** — Clear link to lab; actionable bullets
- [ ] **Key Points** — Added where prose differs from slides, or main bullets suitable for both
- [ ] **AIMA terms** — Marked where applicable

---

## Tracking

| Phase | Items | Status |
|-------|-------|--------|
| Phase 1: Chapter overviews | 12 | Ch1–5 done |
| Phase 2: Ch 1–3 lectures | 24 | **Populated** (prose, Key Points, Discussion Prompts) |
| Phase 3: Ch 4–6 lectures | 24 | Ch4–5 populated; Ch6 outlines |
| Phase 4: Ch 7–9 lectures | 24 | Outlines only |
| Phase 5: Ch 10–12 lectures | 24 | Outlines only |
| Phase 6: Labs | 36 | Outlines only |
| Phase 7: AIMA + consistency | — | Not started |

**Total estimated effort:** ~250–350 hours (assuming 2.5–3.5 hrs/lecture + labs + overhead).

---

## Suggested Workflow

1. **Batch by chapter** — Complete one chapter (8 lectures + 3 labs) before moving on.
2. **Review after each part** — After Part I, read through for flow and terminology before Part II.
3. **Use AIPA themes** — Agent-first, metabolism of knowledge, RAG/memory as first-class, tool integration.
4. **Reference AIMA** — When using classical AI concepts, mark with `\aimaterm`; don't re-explain—point to AIMA.

---

## Related Files

- `aima-terms.txt` — Terms to mark with `pass:q[\aimaterm{term}]`
- `PDF_FORMATTING_STRUCTURE.md` — `\concept{}`, `\aimaterm{}` usage
- `front-matter/preface.adoc` — AIMA relationship; book overview
