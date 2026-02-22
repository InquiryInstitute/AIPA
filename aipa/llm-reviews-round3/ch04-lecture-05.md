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
**Grade: D** – The material consists of a bare‑bones code snippet with a single‑line explanation. There is no narrative hook, no step‑by‑step development, no closing, and it falls far short of the 2 500‑3 500‑word target for a 90‑minute lecture. No diagrams are supplied, and the content would not sustain student attention for more than a few minutes.

---

## Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | The lecture opens with a `python` block; there is no concrete scenario, provocative question, or tension to draw learners in. |
| **Development** | ❌ Missing | No exposition of the problem (why compare two classifiers?), no intuition about the contingency table, no walk‑through of the test’s assumptions, calculation, or interpretation. |
| **Closing / Bridge** | ❌ Missing | The script ends with a print‑statement and a brief “significant / not significant” message. No link to downstream analysis, model selection, or the upcoming lab. |

**Overall Narrative Verdict:** *Absent.* The lecture needs a full story: start with a real‑world decision problem, introduce the need for a paired statistical test, develop the McNemar test conceptually, demonstrate the code, and finish by connecting to model‑evaluation pipelines or the next lab.

---

## Density  

| Section | Expected (words) | Actual (words) | Gap |
|---------|-------------------|----------------|-----|
| Conceptual Core (4‑6 paras, 6‑12 key points) | 1 200‑1 800 | 0 | – |
| Technical Example (2‑3 paras, 5‑8 key points) | 600‑900 | ~30 (code + 2 comments) | – |
| Philosophical Reflection (2‑3 paras, 5‑8 key points) | 600‑900 | 0 | – |
| **Total** | **2 500‑3 500** | **≈30** | **≈2 470‑3 470** missing |

The lecture is essentially a single code block; it does not meet any of the density requirements.

---

## Interest  

* **Engagement:** A 90‑minute session cannot be sustained by a code dump. Students will lose focus within minutes.  
* **Thin/Vague Sections:** No explanation of what `b` and `c` represent, why the diagonal entries are zero, what “exact=False, correction=True” does, or how to interpret the chi‑square statistic.  
* **Definition‑first:** The only “definition” is the function call; there is no conceptual grounding before the code.

**Concrete ways to add interest:**  

1. **Hook with a story** – e.g., “Two medical diagnostic models disagree on a set of patient records. How can we decide whether one truly outperforms the other?”  
2. **Interactive tension** – Pose the question “If both models have the same overall accuracy, can we still claim one is better?” then reveal that paired errors matter.  
3. **Step‑by‑step walk‑through** – Build the 2×2 contingency table on the board, compute the statistic by hand on a tiny dataset, then show the Python implementation.  
4. **Live demo** – Load a real dataset, run the test, and discuss what the p‑value means for model deployment.  
5. **Philosophical reflection** – Discuss the limits of statistical significance, the role of sample size, and the ethical stakes of declaring a model “better.”  

---

## Diagram Review  

No PlantUML diagrams are present. A visual aid is essential for this topic.

**Suggested diagrams:**  

| Diagram | Purpose | Suggested Elements |
|---------|---------|---------------------|
| **Contingency Table Flow** | Show how predictions from Model A and Model B map to the 2×2 table (cells a, b, c, d). | Labels `a` (both correct), `b` (A correct, B wrong), `c` (B correct, A wrong), `d` (both wrong). Arrows from prediction outcomes to cells. |
| **McNemar Test Geometry** | Illustrate the chi‑square statistic as a distance from the line *b = c*. | Plot b on x‑axis, c on y‑axis, diagonal line, shaded region representing the test statistic. |
| **Decision Flowchart** | When to use McNemar vs. other tests (e.g., paired t‑test, bootstrap). | Decision nodes: “paired binary outcomes?”, “independent samples?”, etc. |

Each diagram should be rendered in PlantUML with clear labels, a legend, and a caption linking it to the narrative.

---

## Recommended Revisions  

1. **Add a compelling hook (1‑2 paragraphs, 2‑3 key points).**  
   - Start with a real‑world scenario (e.g., medical diagnosis, spam detection).  
   - Pose a provocative question: “Can we trust the higher accuracy of Model B, or is the difference just noise?”  

2. **Develop a conceptual core (4‑6 paragraphs, 6‑12 key points).**  
   - Explain paired classification evaluation, the contingency table, and why simple accuracy comparison fails.  
   - Derive the McNemar statistic intuitively (difference of discordant pairs).  
   - Discuss assumptions (binary outcomes, matched samples) and the correction for continuity.  

3. **Expand the technical example (2‑3 paragraphs, 5‑8 key points).**  
   - Provide a tiny, fully worked‑out dataset (e.g., 20 instances) with predictions from two models.  
   - Show manual construction of the table, hand calculation of χ², then the Python code.  
   - Explain each argument in `mcnemar([[0,b],[c,0]], exact=False, correction=True)`.  

4. **Insert a philosophical reflection (2‑3 paragraphs, 5‑8 key points).**  
   - Discuss the meaning of “statistical significance” vs. practical significance.  
   - Highlight pitfalls: multiple testing, small sample bias, over‑reliance on p‑values.  
   - Connect to broader AI ethics: declaring a model superior can affect lives.  

5. **Create at least two PlantUML diagrams.**  
   - Contingency‑table flow diagram (as described).  
   - Decision‑flowchart for choosing McNemar vs. alternatives.  

6. **Close with a bridge to the lab or next lecture (1 paragraph, 2‑3 key points).**  
   - Outline a hands‑on exercise: students will load a dataset, train two classifiers, and run the McNemar test to decide which to deploy.  
   - Preview the next topic (e.g., bootstrap confidence intervals for paired metrics).  

7. **Word‑count check.**  
   - Aim for ~2 800 words total across the three sections to satisfy the 90‑minute density target.  

8. **Proofread for clarity and flow.**  
   - Avoid definition‑first dumps; always introduce a concept with a question or problem first.  

By implementing these revisions, the lecture will transform from a terse code snippet into a rich, engaging 90‑minute learning experience that aligns with the AIPA textbook’s pedagogical standards.