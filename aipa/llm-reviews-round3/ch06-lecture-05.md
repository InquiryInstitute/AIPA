# Review: 6.5: Knowledge Engineering and AI-Mediated Communication

**Source:** part-ii/ch06-language-and-models/lecture-05.adoc

---

## Review of Lecture 6.5 – *Knowledge Engineering and AI‑Mediated Communication*

| **Grade** | **A** – The lecture mostly meets the 90‑minute, narrative‑driven, engaging criteria, but it falls short on length and a few “hook‑to‑resolution” moments. |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------|

---

### 1. Narrative Arc  

| **Component** | **Assessment** | **Comments** |
|---------------|----------------|--------------|
| **Hook** | ✅ Strong | The opening “five‑page executive brief by 9 am” scenario is concrete, time‑pressured, and immediately raises the provocative authorship question. |
| **Development** | ✅ Good but uneven | The lecture moves through three logical layers (Conceptual Core → Technical Example → Philosophical Reflection). Each layer builds on the previous one, but the transition from the technical examples back to the philosophical checkpoint feels abrupt; a brief “bridge” sentence would tighten the arc. |
| **Closing** | ✅ Clear | The “Closing Synthesis” restates the central insight and points to Lab 3 and the next lecture, giving a forward‑looking bridge. |
| **Overall Arc Verdict** | **Positive** – The story line is present, but the **tension** could be heightened by re‑introducing the authorship dilemma after each major section (e.g., “After you’ve built the pipeline, who now owns the brief?”). |

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| **Section** | **Paragraph Count** | **Key‑Point Count** | **Word‑Count Estimate** |
|-------------|---------------------|---------------------|--------------------------|
| Intro / Hook & Epigraph | 2 | 0 | ~180 |
| Conceptual Core | 5 | 6 | ~650 |
| Technical Example | 2 (plus two numbered examples) | 5 | ~500 |
| Philosophical Reflection | 2 | 5 | ~550 |
| Closing Synthesis | 1 | 0 | ~120 |
| Discussion Prompts | 1 (list) | 0 | ~150 |
| Lab Prep | 1 | 4 | ~200 |
| **Total** | **13** | **20** | **≈ 2 350** words |

**Result:** The lecture is **~150‑1 200 words short** of the 90‑minute sweet spot.  At a typical speaking rate (≈ 130 wpm) this yields ~18 minutes of talk, leaving a large gap for activities, examples, or deeper exposition.

---

### 3. Interest & Engagement  

| **Strengths** | **Weaknesses / Gaps** |
|---------------|-----------------------|
| • Concrete, time‑pressured scenario that students can picture. <br>• Mix of “how‑to” (prompt templates, validation scripts) and “why‑this‑matters” (authorship, bias). <br>• Lab‑oriented closing that promises hands‑on work. | • The **technical example** is presented as a bullet list; without a live demo or code snippet it can feel abstract. <br>• The **philosophical reflection** is dense; a short anecdote (e.g., a historical ghost‑writer story) would break the monotony. <br>• No **interactive hook** after the conceptual core (e.g., a quick think‑pair‑share on “who is the author?”). <br>• The lecture lacks a **quantitative teaser** (precision/recall of citation‑aware prompting) that would segue into the next lecture. |

**Suggested ways to boost interest**

1. **Mini‑demo** (5 min) showing a real prompt → JSON output → validation failure → automatic refinement loop.  
2. **Live poll** after the hook: “Who should be listed as author?” (options: human, LLM, both). Reveal poll results and tie back to provenance.  
3. **Story snippet** about a famous ghost‑writer (e.g., Dylan Thomas for film scripts) to humanise the “ghost” metaphor before the philosophical section.  
4. **Quick calculation**: estimate how many citations a 5‑page brief typically needs vs. how many the LLM can insert automatically; use this to illustrate the “speed vs. accuracy” trade‑off.

---

### 4. Diagram Review (PlantUML Figure 6.5)

| **Aspect** | **Current State** | **Improvement Suggestions** |
|-----------|-------------------|------------------------------|
| **Alignment with Narrative** | Shows the retrieve → prompt → generate → validate → refine loop, plus bias‑check and audit steps – matches the pipeline described in the lecture. | Add a **label** on the loop arrow that reads “Iterative refinement (prompt ↔ LLM)”. |
| **Clarity of Decision Nodes** | Two `if` blocks (Citation needed? / Bias check?) are present, but the “Bias check?” node only shows the *fail* branch. | Split the bias node into **“Bias check passes?”** (yes → continue) and **“Bias check fails?”** (no → add constraints). This makes the happy path explicit. |
| **Feedback Loops** | The “Refine prompt / regenerate” arrow returns to the Prompt step, but the arrow is a simple line. | Use a **curved arrow** with a label “Feedback → Prompt (refine)”. |
| **Provenance / Audit** | “Add audit metadata” appears after validation. | Add a **small side‑box** titled “Provenance record (prompt ID, model version, source IDs)” that feeds into both “Human review” and “Publish”. |
| **Styling** | Uses sketchy‑outline theme – appropriate for a lecture. | Add **color‑coded shapes**: retrieval (blue), prompting (green), validation (orange), bias (red) to help visual learners. |
| **Overall** | Functional but could be more pedagogically explicit. | Incorporate the above changes; the diagram will then serve as a **road‑map** that students can refer to while building Lab 3. |

---

### 5. Recommended Revisions (Prioritized)

1. **Expand the lecture to meet the 90‑minute word target**  
   - Insert a **5‑minute live coding demo** of the JSON‑prompt → validation → refinement cycle (show actual Python snippets).  
   - Add a **short historical anecdote** about ghost‑writing to flesh out the philosophical reflection.  
   - Include a **quantitative teaser** (e.g., “Citation‑aware prompting reduces hallucination from 23 % to 5 % in our pilot”) that previews the next lecture’s metrics.

2. **Strengthen the narrative tension**  
   - After each major section (Conceptual Core, Technical Example, Philosophical Reflection), pose the authorship question again and briefly discuss how the new material reshapes the answer.  
   - Use a **think‑pair‑share** or quick poll to keep students actively debating authorship.

3. **Enrich the Technical Example**  
   - Provide **sample code** for the Python validator (a few lines showing `jsonschema.validate` and citation lookup).  
   - Show a **failed validation screenshot** and the subsequent refined prompt, highlighting the iterative loop.

4. **Refine the Diagram** (see Table above)  
   - Add explicit “pass” branches for bias and citation checks.  
   - Label the feedback arrow and provenance side‑box.  
   - Apply color‑coding to differentiate stages.

5. **Add a “Metrics Preview” subsection** (≈ 150 words)  
   - Briefly define precision/recall for citation matching and factuality scores, linking to the upcoming lecture on evaluation.

6. **Clarify Lab 3 expectations**  
   - Provide a **bullet checklist** of deliverables (prompt template, validator script, audit log) so students can see the concrete artifacts they will produce.

7. **Proofread for definition‑first language**  
   - Ensure every term (e.g., “knowledge engineering”) is introduced via an example or problem rather than a bare definition. The current text is fine, but double‑check any future expansions.

---

### Closing Note  

With the above adjustments, Lecture 6.5 will comfortably fill a 90‑minute session, keep students intellectually hooked throughout, and provide a clear, visual roadmap that directly supports Lab 3. The narrative will feel tighter, the technical content richer, and the philosophical stakes more palpable—exactly the mix needed for a post‑modern AI course.