# Review: 11.4: Experimental AI — A/B Testing and Statistical Rigor

**Source:** part-iv/ch11-ai-in-institutions/lecture-04.adoc

---

## Review of Lecture 11.4 – “Experimental AI: A/B Testing and Statistical Rigor”

### Summary & Grade
**Grade: C‑** – The lecture covers the right material, but the **narrative arc is weak**, the **density falls far short of the 2 500‑3 500‑word target**, and the **hook is only an epigraph** rather than a concrete, tension‑creating scenario. The diagram is overly simplistic and does not reinforce the learning objectives. With a few focused rewrites the lecture could become a solid 90‑minute session.

---

## 1. Narrative Arc  

| Element | Verdict | Comments / Suggested Fix |
|---------|---------|--------------------------|
| **Hook** | ❌ Weak | The opening epigraph (“Without comparison, we have only anecdotes”) is nice, but it does **not** place the learner in a vivid situation. A hook should be a *real‑world dilemma* (e.g., “Your company just rolled out a new chatbot that promises 2 % higher satisfaction. After a week, the support team is split – should you ship it to all users?”). |
| **Development** | ⚠️ Fragmented | The lecture jumps from “we need comparison” straight into a list of concepts. There is no clear problem → attempted solution → emerging limitation structure. The three main sections (Conceptual Core, Technical Example, Philosophical Reflection) are present, but each is a single block of text, making it hard to see the logical progression. |
| **Closing / Bridge** | ❌ Missing | The final paragraph ends with a “Lab 2” reminder but does not explicitly tie the statistical ideas back to governance or preview the next lecture (e.g., “Next we will examine causal inference for policy‑level decisions”). A closing sentence that *re‑states the stakes* and *points forward* is needed. |

**Overall Narrative Verdict:** **Insufficient** – the lecture needs a stronger opening scenario, a step‑by‑step build‑up (problem → method → limits), and a concluding bridge.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs (actual) | Target | Key‑point items (actual) | Target |
|---------|----------------------|--------|--------------------------|--------|
| Conceptual Core | 1 (≈ 150 words) | 4‑6 | 5 | 6‑12 |
| Technical Example | 1 (≈ 120 words) | 2‑3 | 3 | 5‑8 |
| Philosophical Reflection | 1 (≈ 130 words) | 2‑3 | 4 | 5‑8 |

**Word count estimate:** ~ 500 words total – **≈ 80 % below** the required length. The lecture would need **additional explanatory paragraphs**, **illustrative anecdotes**, and **expanded technical walk‑throughs** to reach the 90‑minute depth.

---

## 3. Interest (Engagement)

| Issue | Why it hurts engagement | Concrete way to fix |
|-------|------------------------|---------------------|
| **Definition‑first dump** | The first paragraph lists terms (p‑value, CI, Bonferroni) without a motivating story. | Start with a *live case study*: a product team debating whether to switch from Model A to Model B after a “pilot” run. |
| **Thin examples** | The technical example is a single bullet list; no data, no code snippets, no visual of results. | Show a small data table (e.g., 10 k requests per arm) and a plotted confidence‑interval bar chart. Include a short Python snippet using `scipy.stats.ttest_ind`. |
| **Missing tension** | No explicit trade‑off (speed vs. rigor, false‑positive risk). | Pose a provocative question: “If a 0.04 % lift costs $200 k in extra compute, do we ship?” |
| **No forward motion** | Lab is mentioned but not linked to learning outcomes. | End with a “What you’ll be able to do after Lab 2” bullet (e.g., “design, run, and report an A/B test inside the governance simulator”). |
| **Lack of narrative continuity** | The three sections feel isolated. | Use transition sentences: “Having understood the statistical toolbox, let’s see it in action…”, then “Now that we have a concrete result, what does it *mean* for our governance philosophy?” |

---

## 4. Diagram Review (PlantUML)

**Current diagram (Figure 11.4)**  

```
start
:Traffic;
:Control;
:Metrics A;
:Treatment;
:Metrics B;
:Compare;
stop
```

| Issue | Suggested Improvement |
|-------|------------------------|
| **No clear flow direction** – arrows are implicit, making the process hard to follow. | Add explicit `-->` arrows (`start --> :Traffic; --> :Control; --> :Metrics A; --> :Treatment; --> :Metrics B; --> :Compare; --> stop`). |
| **Missing labels for decision points** – “Control” and “Treatment” are just boxes; the random split is not shown. | Insert a decision node: `if (Random split?) then (Control) else (Treatment)`. |
| **No metric aggregation** – the diagram shows two separate metric boxes but never merges them for comparison. | Add a merge node after both metric collections: `--> :Aggregate results; --> :Statistical test;`. |
| **No feedback loop** – In real A/B testing you may iterate (e.g., stop early for significance). | Include a loop back from `:Compare` to `:Traffic` with a guard `[p < 0.05]` to illustrate early stopping. |
| **Styling** – “sketchy-outline” is fine, but adding colors (green for control, blue for treatment) helps visual distinction. | Use `skinparam backgroundColor #F9F9F9` and `skinparam ArrowColor #555555`. |
| **Caption** – The current caption (“A/B test design”) is generic. | Expand to “Typical A/B test pipeline: random traffic split → per‑arm metric collection → statistical comparison → decision”. |

---

## 5. Recommended Revisions (Prioritized)

1. **Create a compelling hook** (first 2‑3 minutes).  
   - Write a short vignette: a product manager receives a “2 % lift” claim and must decide whether to roll out.  
   - Pose a concrete question that the lecture will answer.

2. **Expand the Conceptual Core to 4‑5 paragraphs**.  
   - Paragraph 1: the anecdote → need for comparison.  
   - Paragraph 2: basic A/B design (randomization, metrics).  
   - Paragraph 3: statistical inference (p‑value, CI, effect size) with a tiny numeric example.  
   - Paragraph 4: pitfalls (multiple testing, type I/II errors).  
   - Paragraph 5: best‑practice checklist (pre‑register, report CI, include negative results).

3. **Enrich the Technical Example** (2‑3 paragraphs).  
   - Show a realistic dataset (e.g., 50 k requests per arm).  
   - Walk through a Python code snippet (using `pandas` + `scipy`).  
   - Present a plotted result (bar chart with error bars) and interpret it.

4. **Deepen the Philosophical Reflection** (2‑3 paragraphs).  
   - Connect statistical rigor to governance (evidence‑based policy).  
   - Discuss the ethical dimension of “p‑hacking” in AI product releases.  
   - End with a forward‑looking statement linking to the next lecture (causal inference, A/B vs. RCT).

5. **Add a closing bridge** (≈ 1 paragraph).  
   - Summarize the stakes, preview Lab 2 outcomes, and tease the next topic.

6. **Revise Figure 11.4** per the diagram suggestions.  
   - Use explicit arrows, decision node, aggregation step, early‑stopping loop, and colour coding.  
   - Update the caption to reflect the full pipeline.

7. **Adjust key‑point lists** to meet the 6‑8 item range per section.  
   - For Conceptual Core, add points on “randomization”, “pre‑registration”, “interpretation of effect size”.  
   - For Technical Example, add “visualisation of results”, “sample‑size calculation”, “handling missing data”.  
   - For Philosophical Reflection, add “ethical reporting”, “governance implications”, “limits of statistical significance”.

8. **Word‑count check** – after the above expansions, aim for **≈ 2 800 words** total (≈ 900 words per main section). Use a word‑count tool before finalizing.

---

### Closing Note
Implementing the above changes will transform Lecture 11.4 from a terse checklist into an **engaging, story‑driven session** that comfortably fills a 90‑minute class, provides concrete technical practice, and ties the statistical tools to the broader governance narrative of the textbook.