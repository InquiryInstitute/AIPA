# AIPA: Plan to Reach MS AI Level

*Artificial Intelligence: A Postmodern Approach* — whole-book review and upgrade plan for graduate (MS) readiness.

---

## Current State Summary

| Area | Status | Gaps |
|------|--------|------|
| **Chapters** | Ch2, 3, 4, 5, 8, 11 have substantial content | Ch1, 6, 7, 9, 10, 12 are placeholders |
| **Appendices** | A–E complete (search, inference, gradient, neural, evaluation stats) | Optional: more worked examples |
| **Evaluation framework** | Ch2 + Appendix E + reproducibility.adoc | Not yet wired into every chapter |
| **Evaluation-First design** | Documented (EVALUATION_FIRST_ARCHITECTURE, GENERALIZATION_ADDENDUM) | Chapters lack Prompt Targets / Intervention / Criteria / Iteration blocks |
| **Exercises** | None | No end-of-chapter or end-of-part exercises |
| **Glossary / Index** | None | No glossary; index may be PDF-only |
| **Labs** | Experimental lab templates (5 READMEs) | No scaffolded code; no build labs for 12 tools |
| **Prompt sets** | Prompt variants manual (Ch2, Ch7 only) | No full prompt families per chapter; no semester prompt set |
| **Instructor** | AIMA mapping, lab rubrics, evaluation addenda | No per-chapter instructor notes; no assessment rubric (50/25/15/10) implementation |
| **Infrastructure** | Reproducibility standards documented | No evaluation harness, logging, or dashboards in repo |
| **Design** | Theme, sample page, assets | Apply consistently; add chapter diagrams |

---

## 1. Chapter Content (Priority: High)

**Goal:** Every chapter is a full MS-level chapter, not a stub.

### 1.1 Expand placeholder chapters (Ch1, 6, 7, 9, 10, 12)

For each placeholder chapter, add:

- **Narrative** — 3–5 sections with conceptual depth, tied to the course/tool (see MSAI Proposal Appendix B).
- **Design role** — How this chapter fits “AI as epistemic infrastructure” and the evaluation-first spine.
- **Cross-references** — To appendices (formal math), AIMA, and other chapters.
- **One diagram** — Institutional schematic style (per diagram-style-guide).

| Chapter | Tool / focus | Minimum sections to add |
|---------|--------------|-------------------------|
| Ch1 | knowledge_graph; intelligence as process; metabolism | History/structure, knowledge as flow, tool spec, repo init |
| Ch6 | llm; prompt architecture; embeddings | Models, prompts, caching, tool spec |
| Ch7 | memory; RAG; vector stores | Retrieval, RAG design, tool spec |
| Ch9 | Tool-calling agent; ReAct | Tool schemas, execution loop, failure modes |
| Ch10 | Orchestrator; APIs | Discovery, routing, security, scaling |
| Ch12 | Capstone | Milestones, deliverables, rubric, defense |

### 1.2 Add Evaluation-First structure to every chapter

Each chapter (including already-strong ones) should include:

1. **Prompt Targets** — What the agent should improve at after this chapter (from prompt families).
2. **Architectural Intervention** — What component students add or change (the tool).
3. **Evaluation Criteria** — How performance is measured (functional, reasoning, robustness, institutional).
4. **Iteration Loop** — Run eval → record → identify failures → modify → re-run.

Add these as consistent subsections or sidebars so the book functions as a design manual.

---

## 2. Exercises and Assessment (Priority: High)

**Goal:** Students practice and are assessed at MS level.

### 2.1 End-of-chapter exercises

- Add an `exercises.adoc` (or section) per chapter.
- Mix: conceptual (short answer), design (sketch architecture), analytical (derive or compare), implementation (pseudocode or small program).
- Point to AIMA exercises where appropriate (see aipa-aima-mapping).

### 2.2 Capstone rubric and milestones

- Expand Ch12 with explicit milestones (e.g., tool integration, evaluation report, threat model, defense).
- Publish the 50/25/15/10 assessment breakdown (agent performance, improvement, documentation, failure analysis) as an instructor-facing rubric and, in summary form, in the book.

### 2.3 Generalization rubric

- Add a single “Evaluation rubric” section (or appendix) that defines the five dimensions: Conceptual accuracy, Reasoning transfer, Tool selection, Error awareness, Explanation clarity.
- Reference it from Ch2 and from the instructor assessment model.

---

## 3. Prompt Families and Evaluation Infrastructure (Priority: High)

**Goal:** Curriculum is prompt-driven and generalization-tested.

### 3.1 Prompt variants manual

- For **every** chapter, add at least one prompt family: canonical prompts (shown to students) and 2–4 hidden variants (for evaluation).
- Use dimensions from GENERALIZATION_EVALUATION_ADDENDUM: phrasing, structure, domain, context, tool shifts.

### 3.2 First-semester prompt set

- Define a single “Semester 1 benchmark” prompt set (e.g., 30–50 prompts across Ch1–4 families) so courses 1–4 have a concrete evaluation target.
- Document in instructor materials; optionally include a subset in the book as “Example prompt targets.”

### 3.3 Evaluation harness (infrastructure)

- Provide or specify: runnable evaluation harness (e.g., script or CI that runs prompt set, records responses, scores against rubric/LLM judge).
- Reproducible runs: config, seeds, versioned prompt bank.
- This may live in a separate repo (e.g., MSAI curriculum) but should be documented in AIPA instructor materials.

---

## 4. Labs (Priority: Medium–High)

**Goal:** Build labs (tools) + experimental labs (hypothesis-driven) both at MS level.

### 4.1 Build labs for the 12 tools

- One lab (or lab sequence) per tool: knowledge_graph, audit, search, ml_trainer, neural_classifier, llm, memory, reasoning, tool-calling agent, orchestrator, governance, then capstone integration.
- Each: objective, prerequisites, steps, acceptance criteria, link to chapter and evaluation criteria.
- Scaffolded code (templates/starter repos) or clear “implement in your ai-chat-{user} repo” instructions.

### 4.2 Experimental labs — scaffolded code

- For each of the 5 experimental labs (search-comparison, model-comparison, rag-ablations, failure-analysis, latency-accuracy), add:
  - Starter code or notebook (e.g., `run_experiment.py`, `config.yaml` template).
  - `reproduce.sh` or equivalent so TAs/instructors can verify reproducibility.

### 4.3 Lab–chapter alignment

- In each chapter, add a “Lab” subsection or callout that points to the corresponding build lab and, where relevant, experimental lab (e.g., Ch2 → model-comparison, Ch7 → rag-ablations).

---

## 5. Instructor Materials (Priority: Medium)

**Goal:** Instructors can deliver the course from AIPA + MSAI without reverse-engineering.

### 5.1 Per-chapter instructor notes

- One page (or section) per chapter: learning goals, common pitfalls, suggested timing, which prompts to reveal, how to grade agent performance for this chapter’s targets.

### 5.2 Syllabus and assessment template

- Syllabus template that embeds evaluation-first and generalization (prompt set, 50/25/15/10, iteration loop).
- Rubric templates for: agent performance on prompt set, improvement over time, architecture documentation, failure analysis reflection.

### 5.3 AIMA + AIPA week-by-week (optional)

- Optional mapping: “Week 1–2: AIPA Ch1 + AIMA Ch1–2” so instructors can assign readings and exercises in sync.

---

## 6. Book Mechanics (Priority: Medium)

**Goal:** Professional, navigable textbook.

### 6.1 Glossary

- Add a glossary (e.g., `glossary.adoc`) with key terms: agent, RAG, evaluation harness, prompt family, epistemic infrastructure, metabolism, tool protocol, etc.
- Include in AIPA.adoc.

### 6.2 Index

- Ensure PDF (and HTML if possible) has an index; Asciidoctor can generate from sect anchors. Add index entries for key concepts if needed.

### 6.3 Chapter openers and diagrams

- Every chapter has a short thesis and, where useful, one institutional-style diagram (per diagram-style-guide).
- Reuse evaluation-system diagram pattern for other flows (e.g., retrieval loop, agent loop).

---

## 7. Infrastructure and Repositories (Priority: Medium)

**Goal:** Evaluation and labs are runnable and reproducible.

### 7.1 Evaluation harness

- Implement or adopt a harness that: loads prompt set, calls student agent (or mock), records responses, runs scoring (e.g., LLM judge or rubric), outputs metrics.
- Document in instructor materials; link from reproducibility.adoc.

### 7.2 Lab environment

- Devcontainer or environment (e.g., Codespaces) that includes: Python, asciidoctor, pandoc, and any lab-specific deps (e.g., PyTorch for neural lab).
- Document in aipa or in MSAI course repo.

### 7.3 Versioned prompt bank

- Store canonical + variant prompts in versioned form (e.g., YAML/JSON per family) so evaluation runs are reproducible and prompt sets can evolve.

---

## 8. Priorities and Phasing

| Phase | Focus | Deliverables |
|-------|--------|--------------|
| **1** | Chapter structure + evaluation-first | Prompt Targets / Intervention / Criteria / Iteration in all 12 chapters; expand Ch1, 6, 7, 9, 10, 12 to full narrative |
| **2** | Exercises + assessment | Exercises per chapter; capstone rubric; 50/25/15/10 + generalization rubric doc |
| **3** | Prompts + harness | Prompt families for all chapters; Semester 1 prompt set; evaluation harness spec or implementation |
| **4** | Labs | Build lab specs (or scaffolds) for 12 tools; experimental lab scaffolds; lab–chapter links |
| **5** | Instructor + polish | Per-chapter instructor notes; syllabus/rubric templates; glossary; index; diagrams |

---

## 9. Success Criteria (MS AI Level)

- **Content:** All 12 chapters are full chapters with narrative, evaluation structure, and at least one exercise set.
- **Evaluation:** Every chapter has prompt targets and evaluation criteria; students are assessed on agent performance and generalization, not only on homework/code.
- **Rigor:** Appendices and reproducibility remain; exercises include analytical and design tasks; labs include hypothesis-driven experiments.
- **Usability:** Instructors have syllabus, rubrics, prompt variants, and instructor notes; students have build and experimental lab instructions and, where provided, scaffolds.
- **Alignment:** AIPA and MSAI Proposal (Appendix B/C) are aligned: same 12 courses, same tools, same evaluation-first and generalization principles.

---

## 10. References

- [EVALUATION_FIRST_ARCHITECTURE.md](EVALUATION_FIRST_ARCHITECTURE.md)
- [GENERALIZATION_EVALUATION_ADDENDUM.md](GENERALIZATION_EVALUATION_ADDENDUM.md)
- [prompt-variants-manual.md](prompt-variants-manual.md)
- [lab-rubrics.md](lab-rubrics.md)
- [aipa-aima-mapping.md](aipa-aima-mapping.md)
- MSAI-Proposal.md Appendix B (Course Descriptions), Appendix C (Deliverables)
- AIPA design: VISUAL_DESIGN_LANGUAGE.md, diagram-style-guide.md
