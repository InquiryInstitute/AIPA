# Review: f(n) = g(n) + h(n)

**Source:** part-i/ch03-search-and-planning/lecture-03.adoc

---

## Review of Lecture **“f(n) = g(n) + h(n)”**  
*Path: part‑i/ch03‑search‑and‑planning/lecture‑03.adoc*

### Summary  
**Grade: D** – The lecture consists of a single formula line and no surrounding text, examples, or reflection. It fails to provide a hook, narrative development, or any of the required density for a 90‑minute session. No diagrams are present, and there is no indication of how the material will engage students or connect to labs or later topics.

---

## 1. Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | No concrete scenario, provocative question, or tension. The reader is dropped straight into a definition‑style statement. |
| **Development** | ❌ Missing | No problem statement (e.g., “How can we efficiently find optimal paths?”), no step‑by‑step exposition of *g(n)*, *h(n)*, admissibility, consistency, or how they combine in A* search. |
| **Closing / Bridge** | ❌ Missing | No implication, lab tie‑in, or preview of the next lecture (e.g., heuristic design, informed search variants). |

**Overall Narrative Verdict:** *Fail* – The lecture has no narrative arc at all.

---

## 2. Density (Target 2,500‑3,500 words, 4‑6 paragraphs of core concepts, etc.)

| Section | Current Content | Target | Gap |
|---------|----------------|--------|-----|
| Conceptual Core | 1 line (≈5 words) | 4‑6 paragraphs, 6‑12 key points | **~100 % missing** |
| Technical Example | None | 2‑3 paragraphs, 5‑8 key points | **Missing** |
| Philosophical Reflection | None | 2‑3 paragraphs, 5‑8 key points | **Missing** |

The lecture is far below the required word count and structural depth.

---

## 3. Interest  

- **Engagement:** A single equation cannot sustain attention for 90 minutes.  
- **Thin/Vague:** No context, no story, no “why should I care?”  
- **Definition‑first:** The formula is presented without motivation, violating the “no definition‑first dump” rule.

**What to strengthen:**  
1. Begin with a real‑world planning problem (e.g., robot navigating a warehouse, GPS route planning).  
2. Pose a provocative question: “How can we guarantee the shortest route without exploring every possible path?”  
3. Build tension by showing the exponential blow‑up of uninformed search, then introduce *f(n) = g(n) + h(n)* as the key insight.  
4. Interleave short interactive demos (e.g., step‑by‑step A* on a grid) and ask students to predict the next node.  
5. End with a “what if” philosophical angle: “When does a heuristic become a shortcut to truth, and when does it mislead us?”

---

## 4. Diagram Review  

No PlantUML blocks are present. A lecture on *f(n) = g(n) + h(n)* **must** include at least one diagram, such as:

- A graph showing open/closed sets, *g(n)* cost from start, *h(n)* heuristic estimate to goal, and *f(n)* values on nodes.  
- A flow‑chart of the A* algorithm loop highlighting where *f* is computed and used for node selection.  

Without diagrams, visual learners are left unsupported and the narrative loses a crucial reinforcement tool.

---

## 5. Recommended Revisions  

> **Priority 1 – Build a complete narrative (hook → development → closing).**  
> **Priority 2 – Expand to required density and word count.**  
> **Priority 3 – Add concrete technical examples and a philosophical reflection.**  
> **Priority 4 – Insert and refine diagrams.**  

### Actionable Edits  

1. **Add a Hook (≈1‑2 paragraphs, 2‑3 key points).**  
   - Example: “Imagine a delivery drone that must drop packages across a city in the shortest possible time. How does it decide which street to take next without trying every possible route?”  
   - Pose the question: “Can we combine what we already know (distance traveled) with an educated guess of what remains?”

2. **Develop the Core Concept (≈4‑5 paragraphs, 6‑10 key points).**  
   - Define *g(n)* (cost from start to node *n*).  
   - Define *h(n)* (heuristic estimate from *n* to goal).  
   - Explain admissibility & consistency, with simple proofs.  
   - Show how *f(n) = g(n) + h(n)* guides A* search.  
   - Contrast with uninformed search (BFS, Dijkstra) to highlight the benefit.

3. **Insert a Technical Example (≈2‑3 paragraphs, 5‑8 key points).**  
   - Use a 5×5 grid with start/goal cells.  
   - Walk through the first 5–6 expansions, computing *g*, *h*, *f* for each node.  
   - Include a table of node → (g, h, f) values.  
   - Ask students to predict the next node before revealing it.

4. **Add a Philosophical Reflection (≈2‑3 paragraphs, 5‑8 key points).**  
   - Discuss the nature of “knowledge vs. guess” in AI planning.  
   - Raise the question: “When does a heuristic become a bias?”  
   - Connect to broader themes: bounded rationality, trade‑offs between optimality and computational resources.

5. **Create at least two PlantUML diagrams.**  
   - **Diagram 1:** Search graph with node labels showing *g*, *h*, *f*. Include arrows for expansion order, highlight the frontier (open list).  
   - **Diagram 2:** A* algorithm flowchart: Initialize → Loop (Select node with min *f* → Expand → Update costs → Check goal) → Terminate.  
   - Ensure each diagram has clear labels, directional arrows, and a legend. Use colors to differentiate *g* (blue), *h* (green), *f* (red).

6. **Add a Closing / Bridge (≈1 paragraph, 2‑3 key points).**  
   - Summarize why *f = g + h* is powerful.  
   - Preview the next lecture: “Designing admissible heuristics for specific domains (e.g., Manhattan distance, pattern databases).”  
   - Mention the upcoming lab where students will implement A* on a maze.

7. **Word‑count check.**  
   - Aim for **≈2,800 words** across all sections.  
   - Use bullet lists for key points (5‑8 per section) to meet the “key‑point” requirement.

8. **Pedagogical Enhancements.**  
   - Insert short “Think‑Pair‑Share” prompts after the example.  
   - Provide a quick in‑class coding snippet (pseudo‑code) for the *f* calculation.  
   - Offer a “challenge” question: “What happens if *h* overestimates? Demonstrate with a small graph.”

---

### Final Note  

The current lecture is essentially a placeholder. To meet the AIPA textbook standards for a 90‑minute, engaging session, the author must flesh out the narrative, expand the content to the required density, embed concrete examples, provoke philosophical discussion, and supply clear, purpose‑driven diagrams. Implement the revisions above in the order listed, and the lecture will transform from a single line into a robust, student‑centered learning experience.