# AIPA Curriculum: Accreditation Readiness Evaluation

This document evaluates whether the AIPA Master of Science curriculum is **accreditable**—i.e., whether it provides the academic and structural elements that accreditation bodies typically require. It does **not** certify accreditation; accreditation is granted to **institutions** (or specific programs) by recognized bodies (regional, national, or programmatic such as ABET). AIPA is a **curriculum package** that an institution would adopt; the evaluation assesses how well that package aligns with common accreditation expectations.

---

## 1. Typical Accreditation Requirements (Summary)

Graduate program accreditation (e.g., WSCUC, ABET CAC for computing, regional accreditors) generally expects:

| Requirement | Description |
|-------------|-------------|
| **Program Educational Objectives (PEOs)** | Broad statements of what graduates are expected to attain *within a few years* of graduation; informed by employers, alumni, and constituents. |
| **Student / Program Learning Outcomes (PLOs)** | Measurable outcomes at *graduation*: what students know and can do; often with Bloom-style verbs (analyze, design, evaluate). |
| **Course Learning Outcomes (CLOs)** | Per-course outcomes that map to program outcomes. |
| **Curriculum map** | Explicit mapping: which courses/activities address which PLOs (and optionally PEOs). |
| **Assessment** | Direct and indirect measures of outcome attainment; rubrics; grading criteria; documented use of results. |
| **Continuous improvement** | A cycle: collect assessment data → evaluate → act (revise curriculum, pedagogy, support) → document. |
| **Credit, contact hours, entry, duration** | Clear program structure and admission standards. |
| **Faculty, facilities, support** | Institutional resources (outside the scope of a curriculum package). |

---

## 2. What AIPA Provides (Strengths)

### 2.1 Program Learning Outcomes (PLOs)

- **Present:** [MSc_PROGRAM_SPEC.md](MSc_PROGRAM_SPEC.md) defines **5 PLOs** with measurable, graduate-level verbs (Analyze, Design, Implement, Evaluate, Communicate, Situate, Synthesize).
- **Quality:** Outcomes are operationally stated, aggregate (program-level), and advanced (appropriate for one year beyond baccalaureate).
- **Verdict:** **Meets** typical expectations for student/program learning outcomes at graduation.

### 2.2 Course Learning Outcomes (CLOs) and Mapping to PLOs

- **Present:** Every chapter has a formal **CLO** block in `index.adoc`; each CLO is tagged with the PLO(s) it supports (e.g., "PLO 1", "PLO 2").
- **Syllabi:** All 12 course syllabi in [syllabi/](syllabi/) list CLOs with PLO tags.
- **Verdict:** **Meets** expectations for course-level outcomes and explicit linkage to program outcomes.

### 2.3 Assessment

- **Present:**  
  - Default **assessment strategy** (labs 40%, exams 30%, participation/readings 30%; capstone 100% rubric).  
  - **Lab rubrics** with acceptance criteria for all 36 labs ([LAB_RUBRICS.md](../instructor/LAB_RUBRICS.md)).  
  - **Capstone rubric** with five dimensions and grade mapping ([CAPSTONE_RUBRIC.md](../instructor/CAPSTONE_RUBRIC.md)).  
  - Exercise solutions for grading support ([EXERCISE_SOLUTIONS.md](../instructor/EXERCISE_SOLUTIONS.md)).
- **Verdict:** **Meets** expectations for defined assessment methods and criteria; direct measures (labs, capstone) are clear and usable.

### 2.4 Credit, Contact Hours, Entry, Duration

- **Present:** Program spec states 12 courses × 3 credits = 36 credits; 8 × 90 min lectures per course plus labs; entry (BSc or equivalent + topic prerequisites); two-semester (or four-quarter) duration.
- **Verdict:** **Meets** expectations for program structure and admission standards at the curriculum level.

### 2.5 Syllabi and Documentation

- **Present:** Syllabus template and 12 filled syllabi (course code, title, credits, CLOs, schedule, assessment, policies).
- **Verdict:** **Meets** expectations for course-level documentation that accreditors often review.

---

## 3. Gaps and Recommendations

### 3.1 Program Educational Objectives (PEOs)

- **Gap:** AIPA defines **PLOs** (at-graduation outcomes) but not **PEOs** (post-graduation objectives, e.g., 3–5 years out). Many accreditors (e.g., ABET) expect both: PEOs describe what graduates *achieve* in the profession; PLOs describe what they *can do* at graduation.
- **Recommendation:** Add a short **PEO** section to [MSc_PROGRAM_SPEC.md](MSc_PROGRAM_SPEC.md), with 3–5 broad statements (e.g., "Graduates will design and deploy AI systems in industry or research"; "Graduates will communicate technical and ethical tradeoffs to stakeholders"). Note that PEOs should be informed by constituents (employers, alumni); the spec can state that adopting institutions should validate/revise PEOs with local input.

### 3.2 Curriculum Map (Outcomes × Courses)

- **Gap:** CLOs tag PLOs in each syllabus and chapter, but there is no single **curriculum map** matrix (e.g., rows = PLOs, columns = courses, cells = I/P/D for Introduce/Practice/Demonstrate).
- **Recommendation:** Add a **curriculum map** (e.g., [CURRICULUM_MAP.md](CURRICULUM_MAP.md)) that shows which courses address which PLOs and at what level. This supports accreditation review and program coherence.

### 3.3 Continuous Improvement (Assessment Loop)

- **Gap:** There is no documented **assessment cycle**: no template for annual assessment reports, no process for reviewing outcome attainment data, and no explicit "action plan" or "use of results" for program improvement.
- **Recommendation:** Add an **Assessment and Continuous Improvement** section to the program spec (or a separate [ASSESSMENT_CYCLE.md](ASSESSMENT_CYCLE.md)) that describes: (1) how outcome attainment is measured (e.g., capstone rubric by PLO, lab pass rates, course grades); (2) who reviews data and how often; (3) how results feed into curriculum or policy changes. This can be a template that adopting institutions customize.

### 3.4 Institutional Elements (Out of Scope for AIPA)

- **Faculty:** Qualifications, sufficiency, and workload are institutional.
- **Facilities and resources:** Labs, computing, library, support services are institutional.
- **Governance:** Program approval, curriculum committee, and institutional policies are institutional.

AIPA does not (and need not) supply these. The adopting institution must demonstrate them to the accreditor.

---

## 4. Summary Verdict

| Criterion | Status | Notes |
|----------|--------|--------|
| Program learning outcomes (PLOs) | **Met** | 5 PLOs; measurable; graduate-level. |
| Course learning outcomes (CLOs) + PLO mapping | **Met** | CLOs in every chapter and syllabus; PLO tags. |
| Assessment (rubrics, weights, criteria) | **Met** | Lab rubrics, capstone rubric, default weights. |
| Credit, contact, entry, duration | **Met** | In program spec. |
| Syllabi | **Met** | Template + 12 filled syllabi. |
| Program Educational Objectives (PEOs) | **Gap** | Add 3–5 PEOs; constituent input noted for institutions. |
| Curriculum map (PLO × course) | **Gap** | Add one-page matrix. |
| Continuous improvement (assessment cycle) | **Gap** | Add template for assessment reports and use of results. |
| Faculty, facilities, support | **N/A** | Institutional responsibility. |

**Overall:** The AIPA curriculum is **substantially aligned** with common accreditation expectations for the **academic design** of a master's program (outcomes, assessment, structure, syllabi). With the addition of **PEOs**, a **curriculum map**, and an **assessment/continuous-improvement** template, the package would be **strongly accreditable** as curriculum content. Final accreditation depends on the **institution** that adopts AIPA (regional/programmatic approval, faculty, resources, and documented assessment cycle).

---

## 5. References

- WSCUC (WASC Senior College and University Commission): Guidelines for the Review of Graduate Programs; Graduate Program Review Guide.
- ABET: Criteria for Accrediting Computing Programs (CAC); Program Educational Objectives vs. Student Outcomes; Assessment Planning.
- General graduate assessment frameworks: operationally stated outcomes, aggregate/program-level focus, advanced nature of outcomes, systematic assessment with use of results.
