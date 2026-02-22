# Critical Review: Instructor Manual (Teachability)

This document reviews the AIPA Instructor Manual from the perspective of a first-time instructor asking: *Can I actually teach this course with what’s here?* Most gaps below have been addressed in the manual; see **Current status (post-implementation)** at the end for the current assessment.

---

## Strengths

- **Structure:** Clear TOC; PLOs/CLOs (§2), pacing (§3), lecture breakdown (§4), lab rubrics (§5), capstone rubric (§6), assessment (§7) are easy to find.
- **Outcomes:** Program and course outcomes are in one place with PLO tags; supports alignment and accreditation.
- **Grading:** Lab acceptance criteria and capstone rubric are concrete and usable for grading.
- **Pedagogy:** 90-minute lecture phases, discussion tips, and common pitfalls are practical and chapter-specific.
- **Sensitive topics:** Bias, accountability, and surveillance are flagged with framing advice.
- **References:** Links to INSTRUCTOR_NOTES, LAB_RUBRICS, CAPSTONE_RUBRIC, syllabi, and curriculum spec.

---

## Gaps That Affect Teachability

### 1. No “Before you teach” / Getting started

An instructor new to AIPA does not see:
- Where the **lecture content** lives (book chapters vs. `part-*/ch*/lecture-*.adoc`).
- Where **slides** come from and how to run them (`aipa/slides/`, `npm run generate`, `npm run dev`).
- What to do **before the semester**: build or obtain the book, set up GitHub Classroom (if used), decide on syllabus from `curriculum/syllabi/`, optionally run slide build.

**Impact:** First-time instructors may not know where to get the actual material they will teach from or how to prepare.

### 2. Lecture and slide sources not stated

The manual describes *how* to run a 90-minute lecture (phases, timing) but not *what* to teach from:
- Lecture prose and key points: in the book and in `aipa/part-X/chYY-*/lecture-NN.adoc`.
- Slides: generated from those sources via `aipa/slides/` (see `slides/README.md`); built decks in `dist/chNN-lecture-MM/`.

**Impact:** Instructors may not discover the slide pipeline or the link between book, adoc, and slides.

### 3. Lab delivery and timing unclear

- **When** are labs done—in class, as homework, or both?
- **When** are they due? Pacing says “Weeks 1–2: Ch1” but not “Lab 0 due Week 1, Lab 1 due Week 2,” etc.
- Ch1 has **Lab 0** (documentation) plus Labs 1–3; the narrative “8 lectures + 3 labs” can be read as “3 labs per chapter” and might obscure Lab 0 for Ch1.

**Impact:** Instructors and students may be unsure about lab schedule and expectations.

### 4. Exam policy underspecified

Assessment says “Exams 30% (optional; some courses may use participation + exercises only).” The manual does not give:
- Typical options: e.g. (A) midterm + final, (B) final only, (C) no exams with higher weight on labs + participation.
- When to use which (e.g. “no exam” for project-heavy courses).

**Impact:** Instructors may be unsure whether to give exams and how to weight them.

### 5. Student syllabus not addressed

Syllabi in `curriculum/syllabi/` are written for instructors (they reference LAB_RUBRICS, MSc_PROGRAM_SPEC). The manual does not say:
- That instructors should **produce a student-facing syllabus** (e.g. from SYLLABUS_TEMPLATE or by adapting a curriculum syllabus).
- That policies (late work, accommodations, AI use) are per institution and can be added there.

**Impact:** Students may not receive a clear, policy-complete syllabus.

### 6. Prerequisites and optional readings

- Overview lists prerequisites but does not link to **PREREQUISITES_AND_DEPENDENCIES.md**, which explains *where* each topic is used (e.g. before Ch4, Ch8). That helps instructors decide what to review.
- The book’s **Reading List** (appendix) is not mentioned; instructors may want to assign optional readings per chapter.

**Impact:** Missed support for prerequisite review and optional reading assignments.

### 7. Ch1 Lab 0 and “3 labs” wording

- “Most chapters have 8 lectures + 3 labs” is accurate for Ch2–12, but Ch1 has **Lab 0** plus Labs 1–3 (four lab assignments). The manual could state this explicitly.
- Lab rubrics correctly list Ch1 Lab 0; the narrative could say “Ch1 includes Lab 0 (documentation) then Labs 1–3.”

**Impact:** Minor confusion about number of Ch1 labs and what Lab 0 is.

### 8. TA / multi-instructor use

No guidance on:
- Using TAs (e.g. TAs grade labs using §5; capstone graded by instructor or panel).
- Team teaching (who covers which chapters, handoff).

**Impact:** Larger or team-taught courses get no direct guidance (can be added briefly).

---

## Recommendations (implemented in manual)

1. **Add § “Getting started (before you teach)”** after Overview: where lecture content and slides live, how to run slides, what to do before semester (book, syllabus, GitHub Classroom if used), link to PREREQUISITES_AND_DEPENDENCIES and Reading List.
2. **Clarify lab delivery and timing:** In Course Structure and Pacing, add a short “Lab delivery” subsection: typical model (e.g. labs as homework with due dates aligned to pacing), and explicit note that Ch1 has Lab 0 plus Labs 1–3.
3. **Clarify exam options:** In Assessment Strategy, add one sentence or bullet: e.g. “Common options: (A) midterm + final, (B) final only, (C) no exams (increase labs/participation weight).”
4. **Student syllabus:** In Assessment or Getting started, add one line: “Produce a student-facing syllabus from [SYLLABUS_TEMPLATE](../curriculum/SYLLABUS_TEMPLATE.md) or [curriculum/syllabi/](../curriculum/syllabi/); add institutional policies (late work, accommodations, AI use).”
5. **Ch1 Lab 0:** In the “Weekly structure” or “Lab integration” text, state explicitly that Ch1 includes Lab 0 (documentation) plus Labs 1–3.
6. **Optional:** Short “TAs / team teaching” bullet (e.g. in Terminology or Reference): TAs can grade labs per §5; capstone by instructor/panel; handoffs for team teaching.

---

## Summary

The manual is **strong on outcomes, grading, pacing, and pedagogy** but **light on operational “how do I get ready and what do I teach from?”** Adding a **Getting started** section, **explicit lecture/slide and lab timing/syllabus guidance**, and **small clarifications** (Ch1 Lab 0, exam options, prerequisites/readings) would make the course clearly teachable for a first-time instructor.

---

## Current status (post-implementation)

**Implemented:** The manual now includes: Getting started (lecture content paths, slides commands, before-semester checklist, student syllabus, link to GitHub Classroom); prerequisites link to PREREQUISITES_AND_DEPENDENCIES and Reading List; lab delivery and timing (homework model, due-date guidance, Ch1 Lab 0 explicit); exam options (A/B/C); student syllabus instruction (template/syllabi + institutional policies); Ch1 Lab 0 in weekly structure and terminology; TAs/team teaching in Terminology.

**Reassessment:** The manual is **teachable** for a first-time instructor: they can find content, slides, pacing, rubrics, and syllabus guidance in one place.

**Remaining (optional):** A single "Day 1" or "Week 0" checklist (book available, syllabus posted, repo cloned, slides built) under Getting started would further reduce friction; not required for teachability.

**Cross-reference:** For a full curriculum critical review (including how the manual fits into AIPA), see [aipa/curriculum/CURRICULUM_CRITICAL_REVIEW.md](../curriculum/CURRICULUM_CRITICAL_REVIEW.md).
