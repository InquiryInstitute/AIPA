# AIPA Instructor Manual

**Artificial Intelligence: Process and Application**

This manual supports instructors teaching with the AIPA textbook. It consolidates pacing guidance, grading rubrics, exercise solutions, and practical tips. **Do not distribute to students.**

---

## Table of Contents

1. [Overview](#1-overview)
2. [Program and Course Learning Outcomes (PLOs and CLOs)](#2-program-and-course-learning-outcomes-plos-and-clos)
3. [Course Structure and Pacing](#3-course-structure-and-pacing)
4. [Lecture Guidance](#4-lecture-guidance) — includes [per-lecture notes](#41-per-lecture-notes) and [slides (6-up handouts)](#42-slides-6-up-handouts)
5. [Lab Rubrics](#5-lab-rubrics)
6. [Capstone Rubric](#6-capstone-rubric)
7. [Assessment Strategy](#7-assessment-strategy)
8. [Exercise Solutions](#8-exercise-solutions)
9. [Common Pitfalls and Discussion Tips](#9-common-pitfalls-and-discussion-tips)
10. [Sensitive Topics](#10-sensitive-topics)
11. [Terminology and Conventions](#11-terminology-and-conventions)
12. [Instructor Materials Reference](#12-instructor-materials-reference)

---

## 1. Overview

AIPA (Artificial Intelligence: Process and Application) is an agent-first AI curriculum. Every deliverable is a tool the agent invokes. The capstone integrates 12+ tools into a complete agent.

**Key design principles:**
- **Agent-first**: All labs produce tool servers; the orchestrator integrates them.
- **Metabolism metaphor**: Knowledge flows through the system—intake, transform, output, feedback.
- **Two-semester arc**: Part I–II (Ch1–6) = foundations and learning; Part III–IV (Ch7–12) = memory, reasoning, action, integration.

**Prerequisites:** Programming (Python), basic linear algebra, introductory probability, calculus (derivatives, chain rule), discrete math. No prior AI or ML required. For where each topic is used in the curriculum, see [PREREQUISITES_AND_DEPENDENCIES.md](../PREREQUISITES_AND_DEPENDENCIES.md). Optional readings per chapter: see the book's Reading List (appendix).

**Non-CS and non-technical students:** The curriculum is designed to be suitable for learners without a computer science or technical background (e.g. humanities, social sciences, policy). An **AI Tutor** is designated to teach prerequisite topics (programming, math, tooling) on demand—point students to it when they need to fill gaps. The same 12-chapter arc and labs apply; students who lack prerequisites at entry rely on the Tutor and optional institutional bridge courses. For a minimal path, you may emphasize conceptual outcomes and allow simplified or partner-supported lab work where your institution permits. For how the AI Tutor should support these students, see [AI_TUTOR_NON_CS_GUIDANCE.md](AI_TUTOR_NON_CS_GUIDANCE.md).

**High-friction chapters and minimal path:** Ch3 (Search and Planning), Ch4 (Learning from Data), and Ch8 (Reasoning and Inference) use the most formal notation and CS-heavy technical examples; non-CS students will benefit most from the AI Tutor and optional extra office hours or review sessions here.

*Minimal path options (where institution permits):*
- **Pair programming** — allow non-CS students to complete labs in pairs with a technical partner.
- **Simplified deliverables** — e.g. a subset of tools or a design doc plus one working component instead of full implementation.
- **Design-only alternative** — for selected labs, accept a short design document and critique (what the tool should do, how it fits the agent, tradeoffs) instead of code; optional and at instructor discretion.

Conceptual mastery (CLOs) can be assessed via exams, discussions, or design documents even when the lab deliverable is simplified. The AI Tutor is the first line for prerequisite and implementation help.

### Getting started (before you teach)

- **Lecture content:** Each lecture's prose and key points live in the book and in `aipa/part-X/chYY-*/lecture-NN.adoc` (e.g. `part-i/ch01-intelligence-as-process/lecture-01.adoc`). Teach from the book and/or from slides.
- **Slides:** Generated from the same AsciiDoc sources. See [aipa/slides/README.md](../slides/README.md): `npm run generate` (build .md from .adoc), `npm run dev` (preview one deck, e.g. ch01/lecture-01), `npm run build` (build all decks to `dist/chNN-lecture-MM/`).
- **Before the semester:** Obtain or build the book (PDF/html); produce a **student-facing syllabus** from [curriculum/SYLLABUS_TEMPLATE.md](../curriculum/SYLLABUS_TEMPLATE.md) or [curriculum/syllabi/](../curriculum/syllabi/) and add your institutional policies (late work, accommodations, AI use). If using GitHub Classroom, see [GITHUB_CODESPACES_LABS.md](GITHUB_CODESPACES_LABS.md).

---

## 2. Program and Course Learning Outcomes (PLOs and CLOs)

Graduates of the program should meet the program-level outcomes below by the end of the curriculum. Each course has course-level outcomes (CLOs) that map to these PLOs. Full program specification: [MSc_PROGRAM_SPEC.md](../curriculum/MSc_PROGRAM_SPEC.md).

### 2.1 Program Learning Outcomes (PLOs)

| PLO | Outcome |
|-----|---------|
| **PLO 1** | **Analyze** and compare definitions of intelligence (stored vs. flowing, symbolic vs. connectionist) and explain their implications for system design. |
| **PLO 2** | **Design** and **implement** tool-based AI systems (search, learning, memory, reasoning, action) and integrate them via a standard tool protocol (e.g. MCP). |
| **PLO 3** | **Evaluate** AI systems using experimental design, metrics, baselines, and ablation; **communicate** results in writing and presentation. |
| **PLO 4** | **Situate** AI systems in epistemic and institutional context (governance, infrastructure, accountability). |
| **PLO 5** | **Synthesize** a complete agent from 12+ tools; define a capstone problem, validate with stakeholders, and deploy a working system. |

### 2.2 Course Learning Outcomes (CLOs) by chapter

**Chapter 1: Intelligence as Process**

- Analyze the stored vs. flowing views of intelligence and explain their implications for system design (PLO 1).
- Trace the history of AI (symbolic, connectionist, hybrid) and the cognitive turn (PLO 1).
- Situate AI as epistemic machines, infrastructure, and institutional participants (PLO 4).
- Design and implement a knowledge graph (data model, ingestion, query, traversal, explorer interface) (PLO 2).

**Chapter 2: AI in Practice**

- Describe deployment, data pipelines, model lifecycle, and observability for AI systems (PLO 4).
- Identify failure modes, brittleness, and human-AI collaboration patterns (PLO 4).
- Build and integrate an audit tool (inventory, trace schema, pipeline) (PLO 2).

**Chapter 3: Search and Planning**

- Formulate problems as state spaces and apply uninformed and informed search (BFS, DFS, A*) (PLO 2).
- Use adversarial search (minimax, alpha-beta) and planning (STRIPS, PDDL) (PLO 2).
- Explain partial observability (belief states, POMDPs) and meta-reasoning (PLO 1).
- Build a search engine tool (indexing, retrieval, ranking) (PLO 2).

**Chapter 4: Learning from Data**

- Explain risk, generalization, bias-variance tradeoff, and overfitting (PLO 1).
- Implement linear models, gradient descent, regularization (L1/L2), and model selection (PLO 2).
- Use trees, ensembles (Random Forest, boosting), and evaluation metrics (PLO 3).
- Build the ml_trainer tool (load_data, train, evaluate, export_model) (PLO 2).

**Chapter 5: Neural Systems and Representation**

- Explain perceptrons, linear separability, and multilayer networks (PLO 1).
- Implement backpropagation and understand vanishing gradients, initialization, batch norm (PLO 2).
- Use CNNs, dropout, and data augmentation (PLO 2).
- Build the neural_classifier tool (create_architecture, train, predict, export) (PLO 2).

**Chapter 6: Language and Models**

- Explain word embeddings, attention, and the transformer architecture (PLO 1).
- Use prompting strategies (zero-shot, few-shot, chain-of-thought) (PLO 2).
- Apply LLM APIs for embedding, generation, and caching (PLO 2).
- Build the llm tool (embed, generate, prompt, cache) (PLO 2).

**Chapter 7: Memory Systems**

- Explain context limits, external memory, and working memory (PLO 1).
- Implement vector stores, similarity search, and RAG pipelines (PLO 2).
- Integrate episodic, semantic, and procedural memory (PLO 2).
- Build the memory tool (index, search, rag_retrieve, add, update) (PLO 2).

**Chapter 8: Reasoning and Inference**

- Apply propositional and first-order logic (syntax, semantics, resolution) (PLO 2).
- Use probabilistic reasoning (Bayesian networks, inference, sampling) (PLO 2).
- Combine LLM chain-of-thought with symbolic verification (PLO 2).
- Build the reasoning tool (assert, query, prove, infer_probability, chain_of_thought) (PLO 2).

**Chapter 9: Acting in the World**

- Describe the agent loop (perceive, reason, act) and tool use (PLO 2).
- Implement tool schemas, registration, and execution (PLO 2).
- Build the ReAct agent (think → act → observe) with control flow and guardrails (PLO 2).
- Integrate llm, memory, reasoning, and tools into the tool-calling agent (PLO 5).

**Chapter 10: Architectures of Intelligence**

- Compare pipelines vs. loops and design multi-agent systems (PLO 2).
- Implement orchestration (tool client) and API integration (PLO 2).
- Add monitoring, debugging, and scaling to the agent stack (PLO 4).
- Build the orchestrator integrating llm, memory, reasoning, search, audit, governance (PLO 5).

**Chapter 11: AI in Institutions**

- Define governance policies, constraints, and compliance checks (PLO 4).
- Implement cost control, rate limiting, and responsible AI practices (PLO 4).
- Conduct A/B testing and bias audit (PLO 3).
- Build the governance tool (define_policy, check_compliance, simulate, report) (PLO 4).

**Chapter 12: The Student's Artificial Intelligence (Capstone)**

- Define a capstone problem and validate with stakeholders (PLO 5).
- Customize the agent for the problem domain (PLO 5).
- Build an interface (CLI/API) and deploy the system (PLO 5).
- Evaluate and benchmark the agent; produce the written thesis and presentation (PLO 3, PLO 5).

Full syllabi (schedule, assessment): [curriculum/syllabi/](../curriculum/syllabi/).

---

## 3. Course Structure and Pacing

### Two-Semester Pacing

| Semester | Chapters | Deliverables by End |
|----------|----------|---------------------|
| **1** | Parts I & II (Ch1–6) | Knowledge graph, audit tool, search engine, ml_trainer, neural_classifier, llm tool |
| **2** | Parts III & IV (Ch7–12) | Memory, reasoning, tool-calling agent, orchestrator, governance, capstone |

### Weekly Structure (per chapter)

Most chapters have 8 lectures and 3 labs; **Ch1 has Lab 0 (documentation) plus Labs 1–3** (four lab assignments). Suggested pacing:
- **Weeks 1–2**: Ch1 (Intelligence as Process)
- **Weeks 3–4**: Ch2 (AI in Practice)
- **Weeks 5–7**: Ch3 (Search and Planning)
- **Weeks 8–10**: Ch4 (Learning from Data)
- **Weeks 11–12**: Ch5 (Neural Systems)
- **Weeks 13–14**: Ch6 (Language and Models)
- Continue through Ch12 for second semester.

### Lab delivery and timing

- Labs are typically **homework** with due dates aligned to pacing (e.g. Lab 0 due by end of Week 1, Lab 1 by end of Week 2 for Ch1). You can also allocate in-class time for lab work or demos.
- Set clear due dates (e.g. "Lab N due before Lecture M" or "labs due weekly") and state them on the student syllabus.

### Lab Integration

- Labs are interleaved with lectures; Lab Prep sections in each lecture bridge directly to the next lab.
- Each lab produces a tool server; students register tools and test with the orchestrator.
- By Ch9 L3, students should have a running agent; Ch10–11 add orchestration and governance.

---

## 4. Lecture Guidance

### 4.1 Per-lecture notes

Background and depth for every lecture are in **[LECTURE_NOTES.md](LECTURE_NOTES.md)**. Each note includes: **Background** (sources and why the topic is here), **Depth** (optional deeper point or reference), **Connections** (other chapters/labs), and **Tip** (practical teaching suggestion). Use these to prepare class, add context, and link lectures to the rest of the curriculum.

### 4.2 Slides (6-up handouts)

Lecture slides are available as **6-up PDF handouts** (6 slides per page, 2×3 layout) for each chapter. Build them from `aipa/slides`:

```bash
npm run build:instructor
```

This runs the full slide build, exports each deck to PDF, then produces one 6-up PDF per chapter in `aipa/slides/dist/6up/` (e.g. `ch01.pdf` … `ch12.pdf`). You can also run `npm run export-pdf` then `npm run build-6up` after a normal `npm run build`.

Each chapter’s 6-up handout is embedded below. If your viewer does not support embedded PDFs, use the links in the table.

| Chapter | 6-up PDF |
|---------|----------|
| Ch1 | [ch01.pdf](../slides/dist/6up/ch01.pdf) |
| Ch2 | [ch02.pdf](../slides/dist/6up/ch02.pdf) |
| Ch3 | [ch03.pdf](../slides/dist/6up/ch03.pdf) |
| Ch4 | [ch04.pdf](../slides/dist/6up/ch04.pdf) |
| Ch5 | [ch05.pdf](../slides/dist/6up/ch05.pdf) |
| Ch6 | [ch06.pdf](../slides/dist/6up/ch06.pdf) |
| Ch7 | [ch07.pdf](../slides/dist/6up/ch07.pdf) |
| Ch8 | [ch08.pdf](../slides/dist/6up/ch08.pdf) |
| Ch9 | [ch09.pdf](../slides/dist/6up/ch09.pdf) |
| Ch10 | [ch10.pdf](../slides/dist/6up/ch10.pdf) |
| Ch11 | [ch11.pdf](../slides/dist/6up/ch11.pdf) |
| Ch12 | [ch12.pdf](../slides/dist/6up/ch12.pdf) |

**Ch1 — Intelligence as Process (6-up)**

<embed src="../slides/dist/6up/ch01.pdf" type="application/pdf" width="100%" height="720" />

**Ch2 — AI in Practice (6-up)**

<embed src="../slides/dist/6up/ch02.pdf" type="application/pdf" width="100%" height="720" />

**Ch3 — Search and Planning (6-up)**

<embed src="../slides/dist/6up/ch03.pdf" type="application/pdf" width="100%" height="720" />

**Ch4 — Learning from Data (6-up)**

<embed src="../slides/dist/6up/ch04.pdf" type="application/pdf" width="100%" height="720" />

**Ch5 — Neural Systems and Representation (6-up)**

<embed src="../slides/dist/6up/ch05.pdf" type="application/pdf" width="100%" height="720" />

**Ch6 — Language and Models (6-up)**

<embed src="../slides/dist/6up/ch06.pdf" type="application/pdf" width="100%" height="720" />

**Ch7 — Memory Systems (6-up)**

<embed src="../slides/dist/6up/ch07.pdf" type="application/pdf" width="100%" height="720" />

**Ch8 — Reasoning and Inference (6-up)**

<embed src="../slides/dist/6up/ch08.pdf" type="application/pdf" width="100%" height="720" />

**Ch9 — Agents and Tools (6-up)**

<embed src="../slides/dist/6up/ch09.pdf" type="application/pdf" width="100%" height="720" />

**Ch10 — Agent Architectures (6-up)**

<embed src="../slides/dist/6up/ch10.pdf" type="application/pdf" width="100%" height="720" />

**Ch11 — Governance and Risk (6-up)**

<embed src="../slides/dist/6up/ch11.pdf" type="application/pdf" width="100%" height="720" />

**Ch12 — Capstone and Synthesis (6-up)**

<embed src="../slides/dist/6up/ch12.pdf" type="application/pdf" width="100%" height="720" />

### 90-Minute Target

Each lecture targets ~90 minutes. Suggested breakdown:

| Phase | Duration | Content |
|-------|----------|---------|
| Example Prompts + Epigraph | 5 min | Orient students; connect prompts to concepts |
| Conceptual Core | 25–30 min | Main ideas; formal definitions; key points |
| Technical Example | 25–30 min | Worked example; lab preview; hands-on demo |
| Philosophical Reflection | 15–20 min | Discussion; connections to broader themes |
| Discussion Prompts | 10–15 min | Class discussion; student questions |
| Lab Prep | 5–10 min | Bridge to hands-on; clarify deliverables |

### Discussion Tips

- **Example Prompts**: Start by asking "How would an AI agent solve these?" before revealing content.
- **Philosophical Reflection**: Use small-group discussion (2–3 min) before whole-class share.
- **Discussion Prompts**: Pick 2–3 per lecture; prioritize those that connect to labs or the capstone.
- **Metabolism metaphor**: Return to it: "Where does knowledge flow in this system? Where does it get stuck?"

---

## 5. Lab Rubrics

Acceptance criteria for each of the 36 labs. Use for grading or self-assessment.

### Part I: Foundations

| Chapter | Lab | Acceptance Criteria |
|---------|-----|---------------------|
| **Ch1** | 0 | Documentation setup: Markdown, PlantUML; repo structure |
| **Ch1** | 1 | Knowledge graph: data model, ingestion pipeline; schema documented |
| **Ch1** | 2 | Query and traversal; at least 2 query types implemented |
| **Ch1** | 3 | Explorer interface: visualization or API; can query and display graph |
| **Ch2** | 1 | Audit: inventory of target AI system; components, dependencies mapped |
| **Ch2** | 2 | Trace schema: request_id, component, input/output; logs generated |
| **Ch2** | 3 | Audit pipeline: inventory + trace; report generation |
| **Ch3** | 1 | State space: 2–3 domains formalized (S, s₀, G, A, succ) |
| **Ch3** | 2 | Search: BFS, DFS, A* implemented; A* with admissible heuristic |
| **Ch3** | 3 | Search engine: indexing, retrieval, ranking; tool server |

### Part II: Learning Systems

| Chapter | Lab | Acceptance Criteria |
|---------|-----|---------------------|
| **Ch4** | 1 | Data prep: load, preprocess, features, train/val/test split |
| **Ch4** | 2 | Training loop: baseline model; config for model type, hyperparameters |
| **Ch4** | 3 | ml_trainer: load_data, train, evaluate, export_model; tool server |
| **Ch5** | 1 | Architecture: forward pass; single and multilayer |
| **Ch5** | 2 | Training: init, regularization; training loop |
| **Ch5** | 3 | neural_classifier: create_architecture, train, predict, export; tool server |
| **Ch6** | 1 | Embeddings: embed, similarity; sentence or token level |
| **Ch6** | 2 | Prompting: zero-shot, few-shot; template support |
| **Ch6** | 3 | llm tool: embed, generate, prompt, cache; tool server |

### Part III: Memory, Reasoning, Action

| Chapter | Lab | Acceptance Criteria |
|---------|-----|---------------------|
| **Ch7** | 1 | Vector store: index, search (top-k); backend (Chroma, FAISS, etc.) |
| **Ch7** | 2 | RAG pipeline: query → retrieve → generate |
| **Ch7** | 3 | Memory tool: index, search, rag_retrieve, add, update; tool server |
| **Ch8** | 1 | Logic: propositional or FOL; assert, query, resolution |
| **Ch8** | 2 | Probability: Bayesian network; inference (exact or sampling) |
| **Ch8** | 3 | Reasoning tool: assert, query, prove, infer_probability, chain_of_thought |
| **Ch9** | 1 | Tool schemas: define, register; parse tool calls from LLM |
| **Ch9** | 2 | Execution layer: invoke tools; return results |
| **Ch9** | 3 | ReAct agent: think → act → observe; integrates llm, memory, tools |

### Part IV: System Integration

| Chapter | Lab | Acceptance Criteria |
|---------|-----|---------------------|
| **Ch10** | 1 | Pipeline design: components, data flow |
| **Ch10** | 2 | Tool client: discover tools, route requests |
| **Ch10** | 3 | Orchestrator: integrates all tools; end-to-end task completion |
| **Ch11** | 1 | Policies: schema (rule_id, condition, action); compliance check |
| **Ch11** | 2 | Cost tracking, bias audit, A/B test setup |
| **Ch11** | 3 | Governance tool: define_policy, check_compliance, simulate, report |
| **Ch12** | 1 | Problem definition; user validation; implementation plan |
| **Ch12** | 2 | Interface (CLI/API); deployment; documentation |
| **Ch12** | 3 | Thesis; presentation; demo |

---

## 6. Capstone Rubric

Use for the Ch12 capstone project. Each dimension scored 1–4; total max 20.

| Dimension | 4 | 3 | 2 | 1 |
|-----------|---|---|---|---|
| **Problem Definition** | Clear problem, validated; tractable scope; success criteria defined | Clear; some validation; mostly tractable | Vague or too broad; limited validation | Ill-defined; no validation |
| **Implementation** | 8+ tools; customized; runs reliably; well-documented | 6+ tools; customization; minor issues | 4+ tools; limited customization; significant issues | Incomplete; few tools; does not run |
| **Evaluation** | Rigorous: test set, metrics, baselines, ablation; documented | Present; metrics and baselines; some docs | Minimal; metrics unclear; no baselines | None or invalid |
| **Thesis** | Clear structure; evidence-based; well-written | Structure present; most sections complete | Incomplete; gaps in argumentation | Missing or incoherent |
| **Presentation** | Clear intro, problem, approach, demo, conclusion; defends design | Most elements; demo works; some Q&A | Incomplete; demo issues | Missing or fails to communicate |

**Grade mapping:** 18–20 A | 16–17 A- | 14–15 B+ | 12–13 B | 10–11 B- | 8–9 C | &lt;8 Incomplete

---

## 7. Assessment Strategy

AIPA is structured as an **MSc-level curriculum**: 12 courses (one per chapter), each with 8 × 90-minute lectures and labs. PLOs and CLOs are listed in §2 above. For credit, entry requirements, and default assessment weights, see **[aipa/curriculum/MSc_PROGRAM_SPEC.md](../curriculum/MSc_PROGRAM_SPEC.md)**. Per-course syllabi (code, schedule, CLOs) are in **[aipa/curriculum/syllabi/](../curriculum/syllabi/)**.

**Default per-course weights:** Labs 40%, Exams 30%, Participation/readings 30%. Adjust per institution. **Exam options:** (A) midterm + final, (B) final only, (C) no exams—increase weight on labs and participation/exercises accordingly. Chapter 12 (Capstone) uses the capstone rubric only (no separate exam). Capstone typically must be at least B for degree requirement.

**Student syllabus:** Produce a student-facing syllabus from [SYLLABUS_TEMPLATE.md](../curriculum/SYLLABUS_TEMPLATE.md) or the filled [syllabi](../curriculum/syllabi/); add your institutional policies (late work, accommodations, AI use).

---

## 8. Exercise Solutions

**Full exercise solutions are in [EXERCISE_SOLUTIONS.md](EXERCISE_SOLUTIONS.md).**

That document provides:
- Conceptual answers for all conceptual exercises
- Solution sketches for computational and design exercises
- Chapter-by-chapter coverage for all 12 chapters

Use for grading, office hours, and exam preparation. Do not distribute to students.

---

## 9. Common Pitfalls and Discussion Tips

### Part I (Ch1–3)

- **Ch1**: Students may conflate "stored" vs. "flowing" with "symbolic" vs. "connectionist." Emphasize: both views can apply to either paradigm.
- **Ch2**: Audit tool can feel abstract. Use a concrete deployed system (e.g., a public API) as the target for Lab 1.
- **Ch3**: State space formulation is often underspecified. Insist on explicit S, s₀, G, A, succ before coding.

### Part II (Ch4–6)

- **Ch4**: Bias-variance is counterintuitive. Use visualizations (train vs. val loss over epochs).
- **Ch5**: XOR is the canonical example. Don't skip the perceptron failure; it motivates multilayer nets.
- **Ch6**: Prompting is experiential. Allocate time for students to experiment with zero-shot, few-shot, CoT.

### Part III (Ch7–9)

- **Ch7**: RAG quality depends on chunking and retrieval. Bad chunks hurt more than no chunks. Demo both.
- **Ch8**: Probabilistic reasoning is dense. Consider splitting 8.3 (Bayesian networks) across two sessions.
- **Ch9**: ReAct loop is where the agent "comes alive." Let students run and trace a multi-step task.

### Part IV (Ch10–12)

- **Ch10**: Orchestrator integration is integration-heavy. Expect debugging; allocate buffer time.
- **Ch11**: Governance discussions can be sensitive. Use "Notes for Instructors" callouts in lectures.
- **Ch12**: Capstone scope creep is common. Enforce tight problem definition in L1–L2.

---

## 10. Sensitive Topics

- **Bias and fairness (Ch11)**: Frame as design choices with tradeoffs, not moral absolutes. Reference Buolamwini & Gebru, Mehrabi et al.
- **Accountability**: Who is responsible when the agent errs? Encourage nuanced discussion.
- **Surveillance and governance**: Acknowledge power and surveillance questions; don't dismiss.

---

## 11. Terminology and Conventions

- **Orchestrator**: The component (Ch10) that routes requests to tool servers and ties the agent stack together. Lives in `student-ai/orchestration/`.
- **Orchestration**: The activity of coordinating tools.
- **Tool client**: The orchestrator implements the tool-client pattern—it discovers and invokes tool servers.
- **Lab Prep**: Lectures reference "Lab 1," "Lab 2," "Lab 3"—these map to `lab-01.adoc`, `lab-02.adoc`, `lab-03.adoc` in each chapter directory. Ch1 also has Lab 0 (`lab-00.adoc`).

**TAs / team teaching:** TAs can grade labs using the acceptance criteria in §5; capstone (Ch12) is best graded by the instructor or a panel. For team teaching, assign chapters and hand off at clear boundaries (e.g. by part); keep a shared view of the orchestrator and tool stack so students get consistent guidance.

---

## 12. Instructor Materials Reference

| File | Purpose |
|------|---------|
| **INSTRUCTOR_MANUAL.md** (this file) | Consolidated instructor guide |
| **INSTRUCTOR_NOTES.md** | Pacing, pitfalls, discussion tips (detailed) |
| **LAB_RUBRICS.md** | Lab acceptance criteria (same as §5 above) |
| **CAPSTONE_RUBRIC.md** | Capstone grading rubric (same as §6 above) |
| **EXERCISE_SOLUTIONS.md** | Full solutions to chapter exercises |
| **LAB_EXECUTION_PLAN.md** | Plan for using Playwright trace (pw trace) to execute and verify labs |
| **GITHUB_CODESPACES_LABS.md** | Strategy for GitHub + Codespaces: devcontainer, Actions, Classroom |
| **USE_CASES_DESIGN.md** | Design for 8 capstone use cases in Ch2; real-world data/APIs; threading through chapters |
| **aipa/labs/** | Lab test suite: `npm test`, `npm run test:trace`; see labs/README.md |
| **aipa/curriculum/MSc_PROGRAM_SPEC.md** | MSc program spec: PLOs, credit, entry, assessment strategy |
| **aipa/curriculum/SYLLABUS_TEMPLATE.md** | Syllabus template for one course (chapter) |
| **aipa/curriculum/syllabi/** | Filled syllabi ch01–ch12 (code, schedule, CLOs) |
| **aipa/curriculum/CURRICULUM_CRITICAL_REVIEW.md** | Full curriculum critical review (vision, structure, teachability, risks) |
| **aipa/PREREQUISITES_AND_DEPENDENCIES.md** | Where each prerequisite topic is used; for review and prep |
| **INSTRUCTOR_MANUAL_REVIEW.md** | Critical review of this manual (teachability) |

All files are in `aipa/instructor/`, `aipa/curriculum/`, or `aipa/`. Keep instructor and curriculum materials out of student-facing builds.
