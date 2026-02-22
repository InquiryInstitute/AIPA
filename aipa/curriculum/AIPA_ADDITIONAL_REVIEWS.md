# AIPA Additional Reviews

This document records findings from the full set of additional reviews (labs, exercises and solutions, syllabi, cross-references and build, reading list, use-case threading, capstone, sensitive topics, terminology consistency). It complements [CURRICULUM_CRITICAL_REVIEW.md](CURRICULUM_CRITICAL_REVIEW.md), [INSTRUCTOR_MANUAL_REVIEW.md](../instructor/INSTRUCTOR_MANUAL_REVIEW.md), [NON_CS_CONTENT_REVIEW.md](NON_CS_CONTENT_REVIEW.md), and [ACCREDITATION_EVALUATION.md](ACCREDITATION_EVALUATION.md). Each section below summarizes scope, criteria, findings, and recommendations.

---

## 1. Labs

**Scope:** All 37 lab files under `aipa/part-*/*/lab-*.adoc` (Ch1: lab-00 plus lab-01–03; Ch2–Ch12: lab-01–03). Reference: [LAB_RUBRICS.md](../instructor/LAB_RUBRICS.md).

**Criteria:** Each lab has Prerequisites, Objectives, Steps, Deliverables, Acceptance criteria; wording aligns with LAB_RUBRICS; dependencies stated; sequence consistent with Instructor Manual and syllabi.

**Findings:**
- **Structure:** All sampled labs (Ch1 lab-00, lab-01; Ch4 lab-02; Ch12 lab-01, lab-02, lab-03) include Prerequisites, Objectives, Steps, Deliverables, and inline or referenced Acceptance criteria. LAB_RUBRICS covers all 36 labs (Ch1 Lab 0–3, Ch2–12 Lab 1–3) in a single table.
- **Alignment:** Ch1–Ch11 lab titles and deliverables align with LAB_RUBRICS. **Ch12 mismatch:** LAB_RUBRICS lists Ch12 Lab 1 as "Problem definition; user validation; implementation plan," but `lab-01.adoc` is "Repository Assembly" (submodules, tool client, verification). Lab 2 = Interface/deployment and Lab 3 = Integration/thesis/presentation align with rubric. So "problem definition" is not the focus of lab-01.adoc; it may be intended for lectures L1–L2 or pre-Ch12. Clarifying would avoid confusion.
- **Dependencies:** Labs state prerequisites (lecture refs, prior labs). API/env requirements (e.g. LLM, Codespaces) appear in Ch1 Lab 0 and are referenced in PREREQUISITES_AND_DEPENDENCIES. No explicit "non-CS minimal path" note in lab text; that is in Instructor Manual only.
- **Sequence:** Syllabi and manual pacing (e.g. Week 1 L1–L2 + Lab 0 for Ch1) match the order of labs in chapter indexes.

**Recommendations:**
1. Align Ch12 LAB_RUBRICS row 1 with actual lab-01 content (e.g. "Repository assembly; tool client; end-to-end verification") or add a note that problem definition is covered in L1–L2 and deliverables, not as a separate lab deliverable.
2. Optionally add one sentence in Lab 0 and in 1–2 high-friction labs (e.g. Ch4 Lab 1): "For minimal path options, see Instructor Manual §1."

---

## 2. Exercises and solutions

**Scope:** Chapter exercises in `aipa/part-*/*/exercises.adoc` (12 files). Solutions in [EXERCISE_SOLUTIONS.md](../instructor/EXERCISE_SOLUTIONS.md).

**Criteria:** Every chapter includes exercises from index; items map to CLOs/lectures; EXERCISE_SOLUTIONS has a section per chapter; numbering matches.

**Findings:**
- **Coverage:** All 12 chapter `index.adoc` files include `include::exercises.adoc[]`. EXERCISE_SOLUTIONS.md has sections for Chapters 1–12.
- **Alignment:** Ch1 exercises (conceptual stored/flowing, metabolism, knowledge graph schema, state representation, Ch1→Ch7 RAG) map to Ch1 CLOs and lectures. Solution sketches match exercise themes (conceptual answers, design sketches, computational sketches).
- **Numbering:** Exercise lists use numbered items (1., 2., …); solutions use "### 1. Conceptual: …" style. No broken cross-references; alignment is by theme and order.
- **Grading:** EXERCISE_SOLUTIONS states it is for grading and office hours; Instructor Manual §8 points to it.

**Recommendations:**
1. None required. Optionally add explicit exercise numbers in EXERCISE_SOLUTIONS section headers (e.g. "### 1. Conceptual: Stored vs. flowing (Exercise 1)") for faster lookup.

---

## 3. Syllabi

**Scope:** [syllabi/ch01-intelligence-as-process.md](syllabi/ch01-intelligence-as-process.md) through ch12 (12 files). Reference: [SYLLABUS_TEMPLATE.md](SYLLABUS_TEMPLATE.md), [MSc_PROGRAM_SPEC.md](MSc_PROGRAM_SPEC.md), [INSTRUCTOR_MANUAL.md](../instructor/INSTRUCTOR_MANUAL.md).

**Criteria:** Each syllabus has code/title, credits, contact, prerequisites, CLOs, schedule, assessment, link to LAB_RUBRICS (Ch12 to CAPSTONE_RUBRIC); CLOs and schedule align with manual; links valid; policy placeholder if needed.

**Findings:**
- **Structure:** All sampled syllabi (ch01, ch04, ch12) include Credits and contact, Prerequisites, Course learning outcomes (CLOs), Schedule (weeks → lectures/labs), Assessment, and Text/Further Reading. Ch12 syllabus correctly uses 100% capstone and links to CAPSTONE_RUBRIC.md.
- **CLOs:** Syllabi CLOs match Instructor Manual §2 CLOs (same wording and PLO tags). Ch4 syllabus lists 4 CLOs; manual lists same four.
- **Schedule:** Ch1: Week 1 L1–L2 + Lab 0; Week 2 L3–L4 + Lab 1; etc. Ch4: Week 1 L1–L2 + Lab 1; … Ch12: Week 1 L1–L2 + Lab 1; … Consistent with 8 lectures and 3 (or 4 for Ch1) labs.
- **Links:** From `curriculum/syllabi/`, links use `../MSc_PROGRAM_SPEC.md`, `../../instructor/LAB_RUBRICS.md`, `../../instructor/CAPSTONE_RUBRIC.md`. Paths are correct (syllabi → curriculum → aipa; instructor under aipa).
- **Policies:** No explicit "AI use policy" or "accommodations" placeholder in the sampled syllabi; the Instructor Manual says to add institutional policies when producing the student-facing syllabus. Template or one syllabus could add a "Policies (add per institution): …" line.

**Recommendations:**
1. Add one line to SYLLABUS_TEMPLATE or to each syllabus under Assessment/Text: "**Policies:** Add institutional policies (academic integrity, accommodations, AI use, late work) when distributing to students."
2. No link fixes required.

---

## 4. Cross-references and build

**Scope:** Internal links and `include::` across the book and curriculum. Key files: [AIPA.adoc](../AIPA.adoc), chapter index.adoc files, [PREREQUISITES_AND_DEPENDENCIES.md](../PREREQUISITES_AND_DEPENDENCIES.md), curriculum and instructor docs.

**Criteria:** include:: paths resolve; markdown links use correct relative paths; reading list anchors exist and are referenced; build (if run) reports no broken refs.

**Findings:**
- **Includes:** Chapter indexes use `include::lecture-NN.adoc[]`, `include::lab-NN.adoc[]`, `include::exercises.adoc[]`. Ch2 also includes `lecture-use-cases.adoc`. Paths are relative to the chapter directory; no leading path (e.g. `lecture-01.adoc`) so they resolve.
- **Reading list:** [reading-list.adoc](../reading-list.adoc) defines anchors `[[reading-list]]`, `[[reading-ch01]]` … `[[reading-ch12]]`. Lectures reference them as `<<reading-list,Reading List>> (<<reading-chNN,Chapter N>>)`. Format is consistent across sampled lectures.
- **Markdown links:** Instructor Manual links to `../curriculum/MSc_PROGRAM_SPEC.md`, `../curriculum/syllabi/`; from `aipa/instructor/` these resolve. Syllabi links (see §3) are correct.
- **Build:** No build was run; a future pass could run the AsciiDoc/slides build and fix any broken refs reported.

**Recommendations:**
1. Optionally run the book/slides build and fix any broken xrefs or includes reported.
2. No changes required for include paths or reading list anchors.

---

## 5. Reading list and Further Reading

**Scope:** [reading-list.adoc](../reading-list.adoc), and "Further Reading" / Reading block in each chapter (index and lecture "==== Reading").

**Criteria:** reading-list has Ch1–Ch12; consistent format and citation refs; each chapter references the list; no broken bibliography refs; reasonable coverage.

**Findings:**
- **Structure:** reading-list.adoc has sections "=== Chapter N: …" for Ch1–Ch12 with `[[reading-chNN]]` anchors. Entries use "Author, _Title_ <<Ref>> — description."
- **References:** Every lecture file sampled includes a "==== Reading" block with "For readings for this chapter, see the <<reading-list,Reading List>> (<<reading-chNN,Chapter N>>)." Chapter indexes also reference the Reading List in "Further Reading."
- **Bibliography:** Refs such as <<RussellNorvig2020>>, <<Lewis2020>> are standard AsciiDoc bibliography; resolution depends on the main book bibliography. No spot-check of the full bib file was done.
- **Coverage:** Parts I–IV each have multiple entries; mix of AIMA, papers (RAG, ReAct, etc.), and humanities (Foucault, Latour, Dewey).

**Recommendations:**
1. None required. Optionally verify that all <<Ref>> keys in reading-list appear in the main bibliography.

---

## 6. Use-case threading

**Scope:** [USE_CASES_DESIGN.md](../instructor/USE_CASES_DESIGN.md), Ch2 content (e.g. lecture-use-cases.adoc), and spot-check of Ch7, Ch8, Ch9, Ch12 for use-case callouts.

**Criteria:** USE_CASES_DESIGN coherent; document where use cases are introduced and referenced; if partial, state scope clearly; recommend documenting scope in design or manual.

**Findings:**
- **Design doc:** USE_CASES_DESIGN describes 8 capstone use cases (Literature Explorer, Local Business Assistant, etc.), rationale (coherence, real data, reduced scope creep), and data/API notes. Implementable as described.
- **Introduction:** Ch2 includes `lecture-use-cases.adoc` (2.2: Capstone Use Cases — Choose Your Domain). Students choose one use case by end of Ch2; "every chapter thereafter will refer to *your use case*."
- **Threading:** Use cases are introduced in Ch2; Ch12 capstone "customizes" the chosen use case. Explicit "apply to your use case" callouts in Ch3–Ch11 were not fully audited; CURRICULUM_CRITICAL_REVIEW already notes that "the extent to which *every* chapter's examples and labs reference these use cases is not fully documented."
- **Scope:** Current state is "Ch2 introduces; Ch12 capstone adopts one; Ch3–Ch11 may mix generic and use-case-specific." This is not stated in one place in USE_CASES_DESIGN or the Instructor Manual.

**Recommendations:**
1. Add a short "Current scope" subsection to USE_CASES_DESIGN or to Instructor Manual §3: "Use cases are introduced in Ch2 (lecture-use-cases); students choose one. Ch12 capstone customizes that use case. Ch3–Ch11 use generic or chapter-specific examples unless otherwise noted; instructors may add 'apply to your use case' prompts per chapter."
2. Optionally add a sentence in CURRICULUM_CRITICAL_REVIEW §7 (Risks) pointing to this scope statement.

---

## 7. Capstone (Ch12)

**Scope:** [CAPSTONE_RUBRIC.md](../instructor/CAPSTONE_RUBRIC.md), Ch12 syllabus, Ch12 lectures (thesis, presentation), Ch12 index and labs.

**Criteria:** Rubric dimensions align with Ch12 CLOs and PLO5; syllabus and lectures state thesis/presentation consistently; lab sequence supports capstone; grade mapping consistent with program spec.

**Findings:**
- **Rubric:** Five dimensions (Problem Definition, Implementation, Evaluation, Thesis, Presentation) each 1–4; total max 20. Letter-grade mapping 18–20 A down to <8 Incomplete. Aligns with PLO5 (synthesize agent, define problem, validate, deploy, communicate).
- **Ch12 CLOs:** Syllabus and manual list: define capstone problem and validate; customize agent; build interface and deploy; evaluate and benchmark; produce thesis and presentation. These map to the rubric dimensions.
- **Lectures:** Ch12 lectures cover problem definition, implementation, interface, deployment, evaluation, thesis, presentation. Content supports the rubric.
- **Labs:** Ch12 Lab 1 = repo assembly; Lab 2 = interface and deployment; Lab 3 = integration, evaluation, thesis draft, presentation, submission. Lab 3 explicitly includes "Draft thesis" and "Prepare presentation"; rubric's Thesis and Presentation are assessed on the final deliverable. Sequence supports the capstone.
- **Program spec:** Assessment strategy states capstone uses the rubric only and typically must be at least B. Ch12 syllabus states same. Consistent.

**Recommendations:**
1. None required for alignment. Only the Ch12 Lab 1 vs. rubric wording (see §1) is a minor clarification.

---

## 8. Sensitive topics

**Scope:** [INSTRUCTOR_MANUAL.md](../instructor/INSTRUCTOR_MANUAL.md) §10 Sensitive Topics; lectures mentioning bias, fairness, accountability, surveillance (e.g. Ch11, Ch4, Ch6, Ch7).

**Criteria:** Manual lists topics and framing advice; at least one lecture/lab per relevant chapter touches the topic; no contradictory guidance.

**Findings:**
- **Manual §10:** Lists bias and fairness (Ch11), accountability, surveillance and governance; advises framing as design choices with tradeoffs and encouraging nuanced discussion.
- **Ch11:** Governance and fairness are central; instructor notes in lectures reference "frame as design choices." Ch11 labs include bias audit (Lab 2), governance tool (Lab 3). Aligned.
- **Other chapters:** Ch4 (bias-variance, fairness of models), Ch6 (content, mediation), Ch7 (retrieval, representation) can touch sensitive issues; manual does not list them by chapter. §10 focuses on Ch11; that is sufficient for a "sensitive topics" section. No contradiction found.

**Recommendations:**
1. None required. Optionally add one line in §10: "Other chapters (e.g. Ch4, Ch6, Ch7) may surface bias or representation issues; use same framing (tradeoffs, multiple stakeholders)."

---

## 9. Terminology consistency

**Scope:** Sample of book and instructor text for "tool server," "tool," "agent," "orchestrator," "student-ai," "MCP," "capstone," "CLO/PLO."

**Criteria:** Same concept uses same term; "student-ai" used consistently for student's agent repo; acronyms defined or linked on first use.

**Findings:**
- **Tool server / tool:** Labs and manual consistently say labs produce "tool servers"; orchestrator "invokes" them. "Tool" used as shorthand (e.g. "ml_trainer tool") in places; meaning is clear from context.
- **Agent / orchestrator:** "Agent" = the student's AI system; "orchestrator" = the component (Ch10) that routes to tool servers. Instructor Manual §11 Terminology clarifies. Usage in lectures and labs is consistent.
- **student-ai:** Used in labs (e.g. "submodule into student-ai/", "student-ai/ repo") and DESIGN. Consistent for the student's repo.
- **Acronyms:** MCP, RAG, CLO, PLO appear in preface, manual, syllabi. MCP and RAG are expanded or explained in book/manual; CLO/PLO in manual §2. First-use definition could be stricter in a few places but no major inconsistency.
- **Capstone:** Used consistently for Ch12 project and rubric.

**Recommendations:**
1. None required. Terminology is consistent enough for teachability.

---

## 10. Optional reviews

**Scope:** Appendices, slides build, accessibility (heading/diagram structure), technical accuracy (spot-check). Not fully performed.

**Findings:**
- **Appendices:** Referenced from chapters (e.g. search, probability, gradients). No spot-check of notation or level consistency.
- **Slides:** Slides are generated from AsciiDoc; no build run or deck review.
- **Accessibility:** Heading hierarchy and diagram captions exist in lecture adoc; no formal accessibility audit.
- **Technical accuracy:** Ch4 risk/loss and Ch8 entailment have "In plain language" and formal blocks; no verification against AIMA.

**Recommendations:**
1. Optional follow-up: run book and slides build; fix any broken refs. Optionally spot-check one appendix and one deck for alignment with chapter content.

---

## Summary

| Area | Verdict | Top recommendation |
|------|---------|---------------------|
| 1. Labs | Minor issues | Align Ch12 LAB_RUBRICS Lab 1 row with lab-01.adoc (repo assembly) or document that problem definition is in L1–L2. |
| 2. Exercises and solutions | OK | Optional: add exercise numbers in EXERCISE_SOLUTIONS headers. |
| 3. Syllabi | OK | Add policies placeholder line to template or syllabi. |
| 4. Cross-references and build | OK | Optionally run build and fix broken refs. |
| 5. Reading list | OK | Optional: verify bib keys. |
| 6. Use-case threading | Minor issues | Document current scope (Ch2 introduces; Ch12 customizes; Ch3–11 generic unless noted) in USE_CASES_DESIGN or manual. |
| 7. Capstone | OK | No change. |
| 8. Sensitive topics | OK | Optional: note other chapters in §10. |
| 9. Terminology | OK | No change. |
| 10. Optional | Not done | Run build; optional spot-checks. |

**Cross-references:** [CURRICULUM_CRITICAL_REVIEW.md](CURRICULUM_CRITICAL_REVIEW.md) | [INSTRUCTOR_MANUAL_REVIEW.md](../instructor/INSTRUCTOR_MANUAL_REVIEW.md) | [NON_CS_CONTENT_REVIEW.md](NON_CS_CONTENT_REVIEW.md) | [ACCREDITATION_EVALUATION.md](ACCREDITATION_EVALUATION.md)
