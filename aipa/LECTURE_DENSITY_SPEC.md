# AIPA Lecture Density Specification (90-Minute Target)

This document defines the target content density for each lecture to support a 90-minute session. Use Ch7 (Memory Systems) as the benchmark.

## Target Density (per lecture)

| Section | Paragraphs | Key Points | Notes |
|---------|------------|------------|-------|
| Conceptual Core | 4–6 | 6–12 | Main ideas; formal definitions at first use |
| Technical Example | 2–3 | 5–8 | Concrete illustration; lab connection |
| Philosophical Reflection | 2–3 | 5–8 | Interpretation; extended mind, epistemology |
| Discussion Prompts | 5–6 | — | Open-ended; instructor-guided |
| Lab Prep | 1–2 | 4–6 | Bridge to lab; deliverables |

## Word Targets

- **Per lecture**: ~2,500–3,500 words (excluding Key Points bullets, figure captions)
- **Conceptual Core**: ~800–1,200 words
- **Technical Example**: ~400–600 words
- **Philosophical Reflection**: ~400–600 words

## Benchmark: Chapter 7, Lecture 1 (Ch7 L01)

- Conceptual Core: 4 paragraphs, ~500 words, 8 Key Points
- Technical Example: 3 paragraphs, ~250 words, 7 Key Points
- Philosophical Reflection: 3 paragraphs, ~250 words, 6 Key Points
- Total: ~1,000+ words in main sections; full lecture ~3,000+ with examples, Lab Prep, Discussion

## Thin Lectures (below target)

The following were prioritized for expansion (hooks, development, reflection, Key Points). As of the latest pass they have been enhanced to align with the narrative-arc and density targets:

| Chapter | Lectures | Enhancement |
|---------|----------|-------------|
| Ch5 (Neural) | L2–L4 | Opening hooks (credit assignment, vanishing gradients, convolution prior); closing/forward bridge; extra Key Points |
| Ch11 (Institutions) | L1–L4 | Opening hooks (governance constitutive, cost/access, fairness contested, comparison vs. anecdotes); reflection paragraphs and chapter-arc closing; Key Points |
| Ch3 (Search) | L7, L8 | Hooks (time-bound search, search as tool); reflection + Lab 3 / API link; Key Points |
| Ch8 (Reasoning) | L4, L7 | Hooks (exact vs. tractable, reasoning as tool); reflection + reasoning tool / Lab 3; Key Points |

Ch5 L1 was already at target (narrative arc: promise → XOR → path forward). Re-audit any lecture if 90-minute sessions still feel thin.

## Optional: Suggested Pacing (90 min)

| Phase | Duration | Content |
|-------|----------|---------|
| Example Prompts + Intro | 5 min | Orient with prompts; epigraph |
| Conceptual Core | 25–30 min | Main ideas; definitions |
| Technical Example | 25–30 min | Worked example; lab preview |
| Philosophical Reflection | 15–20 min | Discussion; connections |
| Discussion Prompts | 10–15 min | Class discussion |
| Lab Prep | 5–10 min | Bridge to hands-on |

## Narrative arc (per lecture)

Each lecture should be *interesting* and have a clear **narrative arc**, not just a list of points.

- **Opening (hook):** Start with a concrete scenario, a provocative question, or a tension. Avoid beginning with a bare definition. Example: "A model that aces the training set but fails in production has learned the wrong thing—but how do we know in advance?"
- **Development (progression):** Build ideas so that one leads to the next—e.g. problem → first response → limit or refinement. Use "so we…", "that leads to…", "the catch is…" to create forward motion. Preserve formal definitions where needed, but frame them as answers to a question the lecture has already raised.
- **Closing (so what):** End the Conceptual Core or Philosophical Reflection with implication, forward look, or bridge to the lab/next lecture. Example: "The perceptron is the starting point; the path from here runs through layers, backprop, and the systems you will build in this chapter."

Regenerating narrative in a lecture means: (1) giving the Conceptual Core a clear beginning (hook), middle (development), and end (implication); (2) ensuring the Philosophical Reflection extends the story (e.g. stakes, limits, or design choices) rather than restating bullets; (3) keeping all technical content, Key Points, and diagrams intact.

## Audit Checklist (Phase 0)

- [x] references/references.bib exists; ~60–80 entries
- [x] references/references.adoc included in AIPA.adoc
- [x] Epigraphs: full attribution; (adapted) acceptable where paraphrased
- [x] PREREQUISITES_AND_DEPENDENCIES.md exists
- [x] preface.adoc: Prerequisites expanded with link to PREREQUISITES_AND_DEPENDENCIES
- [x] Chapter objectives: added to all 12 chapters
- [x] Chapter summaries: added to all 12 chapters
- [x] Glossary: glossary/glossary.adoc created and included
- [x] Problem sets: exercises.adoc per chapter; 3–5 exercises each
- [x] Further reading: added to all 12 chapters
- [x] Formal definitions: agent, RAG, state space
- [x] Algorithm boxes: Perceptron, RAG, ReAct
- [x] Instructor materials: INSTRUCTOR_NOTES, CAPSTONE_RUBRIC, LAB_RUBRICS
- [x] Notation appendix: front-matter/notation.adoc
