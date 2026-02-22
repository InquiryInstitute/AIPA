# AIPA Master of Science Program Specification

**Artificial Intelligence: A Postmodern Approach — MSc-Level Curriculum**

This document defines the program-level structure for institutions adopting AIPA as a Master of Science (MSc) in Artificial Intelligence. Each of the 12 book chapters is one **course** (class) with 8 × 90-minute lectures and integrated labs. Do not distribute to students; use for curriculum committees, accreditation, and program approval.

---

## 1. Degree Title

**Master of Science in Artificial Intelligence — Process and Application** (or equivalent per institution: e.g. M.S. in AI, MSc in Intelligent Systems).

---

## 2. Program Learning Outcomes (PLOs)

By the end of the program, graduates will be able to:

| PLO | Outcome |
|-----|---------|
| **PLO 1** | **Analyze** and compare definitions of intelligence (stored vs. flowing, symbolic vs. connectionist) and explain their implications for system design. |
| **PLO 2** | **Design** and **implement** tool-based AI systems (search, learning, memory, reasoning, action) and integrate them via a standard tool protocol (e.g. MCP). |
| **PLO 3** | **Evaluate** AI systems using experimental design, metrics, baselines, and ablation; **communicate** results in writing and presentation. |
| **PLO 4** | **Situate** AI systems in epistemic and institutional context (governance, infrastructure, accountability). |
| **PLO 5** | **Synthesize** a complete agent from 12+ tools; define a capstone problem, validate with stakeholders, and deploy a working system. |

---

## 3. Credit and Contact Hours

| Item | Value |
|------|--------|
| **Courses** | 12 (one per chapter) |
| **Credits per course** | 3 (adjust to institutional norms; e.g. 2–4) |
| **Total program credit** | 36 (12 × 3) |
| **Contact per course** | 8 × 90 min lectures = 12 lecture hours; plus lab sessions (define per institution, e.g. 12–24 lab hours per course) |
| **Duration** | Two semesters (Ch1–6, Ch7–12) or four quarters; see [INSTRUCTOR_MANUAL.md](../instructor/INSTRUCTOR_MANUAL.md) for suggested pacing. |

---

## 4. Entry Requirement

- **Recommended:** Bachelor’s degree or equivalent. Computer science or technical background is not required. The curriculum is suitable for non-CS and non-technical students (e.g. humanities, social sciences, policy); an **AI Tutor** teaches prerequisite topics on demand so these learners can fill gaps as they progress.
- **Topic-level prerequisites:** Programming (Python), basic linear algebra, introductory probability, calculus (derivatives, chain rule), discrete math. No prior AI or ML required. See [PREREQUISITES_AND_DEPENDENCIES.md](../PREREQUISITES_AND_DEPENDENCIES.md) for full list and where each topic is used. Students without these at entry rely on the AI Tutor (and optional institutional bridge courses) to acquire them.
- **Placement:** Institutions may offer a bridge module or prerequisite courses for students lacking the above.

---

## 5. Assessment Strategy

### 5.1 Per-course weights (default)

Instructors may adjust; a typical mix:

| Component | Weight | Notes |
|-----------|--------|--------|
| **Labs** | 40% | Tool servers; acceptance criteria in [LAB_RUBRICS.md](../instructor/LAB_RUBRICS.md). |
| **Exams** | 30% | Midterm and/or final (optional; some courses may use participation + exercises only). |
| **Participation / readings** | 30% | Discussion, exercises, optional paper critiques. |

**Chapter 12 (Capstone):** Use the [Capstone Rubric](../instructor/CAPSTONE_RUBRIC.md) only (problem definition, implementation, evaluation, thesis, presentation). No separate exam; thesis and presentation replace the exam component.

### 5.2 Grade alignment

- **Pass/merit/distinction** (or A/B/C): Map numeric scores to institutional scale. Example: A 90–100, B 80–89, C 70–79; or Pass ≥ 70%, Merit ≥ 80%, Distinction ≥ 90%.
- **Program requirement:** Capstone (Ch12) typically must be at least B (or equivalent) to satisfy degree requirements.

### 5.3 References

- Lab acceptance criteria: [instructor/LAB_RUBRICS.md](../instructor/LAB_RUBRICS.md) (same as §4 in Instructor Manual).
- Capstone grading: [instructor/CAPSTONE_RUBRIC.md](../instructor/CAPSTONE_RUBRIC.md).
- Exercise solutions (grading support): [instructor/EXERCISE_SOLUTIONS.md](../instructor/EXERCISE_SOLUTIONS.md).

---

## 6. Curriculum Documents

| Document | Purpose |
|----------|---------|
| **MSc_PROGRAM_SPEC.md** (this file) | Program outcomes, credit, entry, assessment |
| **SYLLABUS_TEMPLATE.md** | Template for one course (chapter) |
| **syllabi/ch01-*.md … ch12-*.md** | Filled syllabi per course; code, schedule, CLOs |

Each chapter’s `index.adoc` in the book includes **Course Learning Outcomes (CLOs)** that map to the PLOs above.
