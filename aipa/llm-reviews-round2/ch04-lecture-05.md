# Review: python
from statsmodels.stats.contingency_tables import mcnemar

# b = # cases where A correct, B wrong
# c = # cases where B correct, A wrong
result = mcnemar([[0, b],
                  [c, 0]], exact=False, correction=True)

print(f"McNemar chi2={result.statistic:.2f}, p={result.pvalue:.3f}")
if result.pvalue < 0.05:
    print("Significant difference between models")
else:
    print("No significant difference")

**Source:** part-ii/ch04-learning-from-data/lecture-05.adoc

---

## Summary  
**Grade: D** – The lecture consists of a single code snippet with a few comments. It lacks any narrative hook, step‑by‑step development, or concluding reflection. The length is far below the 2,500‑3,500‑word target for a 90‑minute session, and there are no diagrams to support understanding. As written it would occupy at most a few minutes of class time and would leave students confused about *why* they should care about McNemar’s test or how it fits into the broader learning‑from‑data story.

---

## Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ | No opening scenario, question, or tension. The lecture starts abruptly with `python` and a library import. |
| **Development** | ❌ | No explanation of the problem (comparing two classifiers), the statistical reasoning behind McNemar’s test, or the meaning of the contingency table entries. The code is presented without context, derivation, or step‑wise walkthrough. |
| **Closing / Bridge** | ❌ | The snippet ends with a simple `if` statement. There is no discussion of what to do with a significant result, how it informs model selection, or how it leads into a lab or the next lecture. |

**Verdict:** The narrative arc is essentially nonexistent.

---

## Density  

| Section | Expected (words / paragraphs / key points) | Actual | Gap |
|---------|--------------------------------------------|--------|-----|
| Conceptual Core | 4‑6 paragraphs, 6‑12 key points, ~1,200‑1,800 words | 0 paragraphs, 0 key points | – |
| Technical Example | 2‑3 paragraphs, 5‑8 key points, ~600‑900 words | 1 short code block, no explanatory prose | – |
| Philosophical Reflection | 2‑3 paragraphs, 5‑8 key points, ~600‑900 words | None | – |
| **Total** | ~2,500‑3,500 words | ~50 words (code + comments) | **~2,450‑3,450 words missing** |

---

## Interest  

* **Engagement:** Without a real‑world scenario (e.g., “You have two medical diagnostic models and need to know if one truly outperforms the other”), students have no reason to stay focused.  
* **Thin sections:** The entire lecture is a definition‑first dump (the code) with no narrative, no “story” of a problem arising, no exploration of alternatives, and no “what‑next” discussion.  
* **Concrete ways to add tension:**  
  1. Pose a provocative question: *“Can we trust a 2 % improvement in accuracy, or is it just random noise?”*  
  2. Show a failing example where naïve accuracy comparison leads to the wrong conclusion.  
  3. Build a step‑by‑step derivation of the McNemar statistic, linking it to hypothesis testing.  
  4. End with a “What does a significant result mean for model deployment?” teaser for the next lab.

---

## Diagram Review  

There are **no PlantUML diagrams** in the current lecture, so no figure to evaluate. Adding a visual of the 2 × 2 contingency table and the flow of the test (data → table → chi‑square → decision) would greatly reinforce the concept.

---

## Recommended Revisions  

| Priority | Action |
|----------|--------|
| **1** | **Create a hook**: Open with a concrete case study (e.g., two spam‑filter classifiers evaluated on a labeled email set). Pose the question “Is the observed difference real?” |
| **2** | **Introduce the statistical problem**: Explain why simple accuracy comparison can be misleading; introduce the idea of paired binary outcomes. |
| **3** | **Derive the contingency table**: Show a small example with counts `a, b, c, d` and explain what each cell means. |
| **4** | **Explain McNemar’s test**: Walk through the null hypothesis, the test statistic formula, the continuity correction, and the interpretation of `p‑value`. Include at least 5 key points. |
| **5** | **Expand the technical example**: Provide a full Python notebook snippet that (a) loads a toy dataset, (b) trains two simple models, (c) computes predictions, (d) builds the contingency table, (e) runs `mcnemar`, and (f) visualizes the table. Add inline comments and print statements that explain each step. |
| **6** | **Add a PlantUML diagram**: Visualize the flow: *Predictions → Paired outcomes → Contingency table → McNemar statistic → Decision*. Label arrows with “counts b, c”, “chi‑square”, “p‑value”. |
| **7** | **Philosophical reflection** (2‑3 paragraphs): Discuss the limits of statistical significance (sample size, effect size), the danger of p‑hacking, and how hypothesis testing fits into the broader AI ethics conversation. Provide 5‑8 reflective key points. |
| **8** | **Closing bridge**: Summarize the takeaway, pose a forward‑looking question (“How could we extend this test to multi‑class models?”) and preview the upcoming lab where students will implement the test on a real dataset. |
| **9** | **Length check**: Ensure the combined sections reach ~2,800 words (≈4–5 pages of prose) and contain 15–20 distinct key points across the three sections. |
| **10** | **Pedagogical scaffolding**: Insert short “Think‑pair‑share” prompts after the derivation and before the code execution to keep students actively engaged. |

Implementing these revisions will transform the lecture from a terse code dump into a full‑fledged 90‑minute session with a clear narrative, appropriate depth, and engaging content.