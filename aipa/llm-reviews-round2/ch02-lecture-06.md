# Review: 2.7: Human-AI Collaboration

**Source:** part-i/ch02-ai-in-practice/lecture-06.adoc

---

## Review of Lecture 2.7 – *Human‑AI Collaboration*  

**Grade: C‑** – the lecture covers the right topics but falls short of a 90‑minute, engaging session. The narrative is thin, the word‑count is well below the 2 500‑3 500 w target, and the opening lacks a concrete hook that would sustain attention. The diagram is functional but could be richer and more tightly tied to the story.

---

### 1. Narrative Arc  

| Element | Assessment | Suggested Fix |
|---------|------------|---------------|
| **Hook** | Starts with an epigraph and a one‑sentence claim. No vivid scenario, no problem statement, no tension. | Open with a short, relatable case study (e.g., “A radiology AI flags a lung nodule; the on‑call radiologist must decide whether to trust the suggestion in a 5‑minute emergency”). Pose a provocative question: “What happens when the AI is right, but the human is wrong, or vice‑versa?” |
| **Development** | The lecture moves from definition (HITL) → interaction modes → calibration → accountability → technical hand‑off → philosophical reflection. The flow is logical but feels like a series of definitions rather than a story that builds. | Re‑frame as a problem‑solution‑limit narrative: <br>1. **Problem** – high‑stakes decisions with imperfect AI. <br>2. **Response** – introduce HITL, show three modes with concrete examples. <br>3. **Limits** – trust calibration, legal accountability, “theatre” of human‑in‑the‑loop. <br>Interleave short anecdotes or data points (e.g., “In a study of loan‑approval AI, over‑trust cost banks $X M”). |
| **Closing / Bridge** | Ends with a “Take‑away” that points to Lab 3, but the bridge to the next lecture is weak. | Conclude with a forward‑looking statement: “Next we will look at how to design the UI that makes the hand‑off transparent, and how to evaluate the trust curve in practice.” This gives a clear segue to the following lecture. |

**Verdict:** Hook – *insufficient*; Development – *adequate but definition‑heavy*; Closing – *acceptable but could be stronger*.  

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. Paragraphs | Approx. Key Points | Estimated Word Count |
|---------|-------------------|--------------------|----------------------|
| Conceptual Core | 4 | 6 | ~800 |
| Technical Example | 2 | 5 | ~400 |
| Philosophical Reflection | 2 | 5 | ~400 |
| **Total** | 8 | 16 | **≈ 1 600** |

The lecture is roughly **1 600 words**, well below the 90‑minute target (≈ 2 500‑3 500). To reach the required density, each core section should be expanded:

* **Conceptual Core** – add a mini‑case study for each interaction mode, a short table comparing accountability, and a brief discussion of empirical findings on trust calibration.  
* **Technical Example** – walk through a concrete UI mock‑up, show pseudo‑code for the feedback‑signal pipeline, and include a “what‑if” failure scenario.  
* **Philosophical Reflection** – deepen the link to Latour’s actor‑network theory, bring in a contrasting view (e.g., “human‑as‑central” from classical ergonomics), and cite a recent policy (EU AI Act Art. 14).  

These additions will push the word count into the target range and give instructors more material for discussion.

---

### 3. Interest  

| Issue | Why it hurts engagement | Concrete way to strengthen |
|-------|------------------------|----------------------------|
| **Definition‑first dump** (e.g., “Human‑in‑the‑loop (HITL) systems insert human judgment…”) | Learners hear a definition before they care *why* it matters. | Start with the real‑world dilemma (the radiology case) and let the definition emerge as a solution. |
| **Thin examples** | Only three “example prompts” are listed; they are abstract. | Expand each prompt into a 2‑sentence vignette showing stakes, outcomes, and a surprise (e.g., an AI mis‑classifies a loan, the human catches it). |
| **Lack of tension** | No conflict or trade‑off is highlighted. | Pose a “what‑if” scenario: the AI is 95 % accurate but the human is 99 % accurate on rare cases; who should decide? |
| **Missing interactive hooks** | No quick polls, think‑pair‑share, or live demo suggestions. | Insert a 5‑minute live demo (e.g., a simple chatbot that asks for a confidence score) and ask students to vote on whether to accept the suggestion. |
| **Sparse narrative** | The sections feel like bullet‑point handouts. | Use a story arc: “We start with a problem, we try a solution, we discover a limitation, we iterate.” Highlight the “aha” moments. |

---

### 4. Diagram Review (PlantUML Figure 2.6)

| Aspect | Current State | Suggested Improvements |
|--------|----------------|------------------------|
| **Alignment with narrative** | Shows a linear feedback loop (AI → Human → Action → Correction → AI). It does not illustrate the three interaction modes (delegation, augmentation, partnership) or the trust‑calibration curve. | Add three parallel branches labelled *Delegation*, *Augmentation*, *Partnership* that converge on the same loop. Use different colors or line styles. |
| **Labels & Arrows** | Arrows are generic (“recommendation”, “approve / reject”). No explicit “confidence score” or “explanation” node. | Insert a node “Explainability / Rationale” between AI and Human, with a dashed arrow indicating optional display. Add a label on the Human→Action arrow: “Decision (trust level)”. |
| **Feedback loops** | Only one feedback arrow (Correction → AI). No audit‑log feedback to trust calibration. | Add an arrow from “Audit Log” back to “Human” labeled “Performance dashboard” to show that the human can see system reliability over time. |
| **Visual clarity** | All rectangles, no icons, making it look like a flowchart rather than a network. | Replace rectangles with stereotypical icons (brain for AI, person silhouette for Human, gear for Action). Use the `!define` skinparam to give a “sketchy” feel consistent with the theme. |
| **Scope** | Does not show organizational context (the “network node” from Latour). | Add an outer container labeled “Organizational Context” that encloses the whole loop, with a thin arrow indicating “policy / regulation”. |

---

### 5. Recommended Revisions (prioritized)

1. **Rewrite the opening hook**  
   * Insert a 2‑paragraph, high‑stakes case study (e.g., medical triage, autonomous vehicle hand‑off). Pose a provocative question about trust and responsibility.  

2. **Expand the Conceptual Core to ~1 200 words**  
   * For each interaction mode (delegation, augmentation, partnership) give a concrete example, a short table of accountability, and a citation to an empirical study.  
   * Add a paragraph on “trust calibration in practice” with a simple graph (trust curve) and a real‑world statistic.  

3. **Enrich the Technical Example (~800 words)**  
   * Walk through a UI mock‑up (screenshots or ASCII sketches).  
   * Provide pseudo‑code for the feedback‑signal pipeline and discuss failure modes (e.g., noisy corrections).  
   * Include a mini‑exercise: students design a hand‑off checklist.  

4. **Deepen the Philosophical Reflection (~600 words)**  
   * Connect Latour’s actor‑network theory to contemporary AI governance (EU AI Act, US NIST guidelines).  
   * Present a contrasting view (human‑as‑central ergonomics) and discuss trade‑offs.  

5. **Add interactive elements**  
   * 5‑minute live demo or poll on trust decisions.  
   * “Think‑pair‑share” prompts after each major section.  

6. **Revise Figure 2.6**  
   * Incorporate the three interaction‑mode branches, an “Explainability” node, and a “Policy” container.  
   * Use icons, color‑coding, and clearer arrow labels as per the suggestions above.  

7. **Strengthen the closing bridge**  
   * End with a forward‑looking sentence that previews the next lecture (e.g., UI design for transparent hand‑offs) and ties back to the opening case study.  

8. **Proof‑read for consistency**  
   * Ensure all key‑point bullet lists are parallel in style and that terminology (HITL, human‑in‑the‑loop, human‑AI collaboration) is used consistently.  

---

**Bottom line:** With a compelling opening scenario, richer examples, added interactive moments, and a more informative diagram, Lecture 2.7 can meet the 90‑minute depth requirement and keep students actively engaged throughout. Implement the prioritized edits above, and the lecture will move from a “definition dump” to a memorable, practice‑oriented narrative.