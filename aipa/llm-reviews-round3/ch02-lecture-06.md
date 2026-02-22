# Review: 2.7: Human-AI Collaboration

**Source:** part-i/ch02-ai-in-practice/lecture-06.adoc

---

# Review of Lecture 2.7 – *Human‑AI Collaboration*  

**Grade: C‑**  

*Why*: The lecture opens with a solid hook and ends with a clear lab‑prep, but the core sections are under‑dense for a 90‑minute session (≈1 800 words vs. the target 2 500‑3 500). Several paragraphs read like definition dumps, and the diagram, while present, does not fully reinforce the narrative. The material would need roughly 30‑40 % more substantive content and tighter integration of examples, discussion, and reflective questions to sustain attention for a full class period.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Concrete, high‑stakes radiology hand‑off; poses tension and a “what would you do?” dilemma. | ✅ Strong |
| **Development** | – Explains HITL, three interaction modes, trust calibration, actor‑network view.<br>– Provides a tabular comparison and a loan‑approval UI checklist.<br>– Philosophical reflection links to distributed cognition and EU AI Act. | ⚠️ Mixed – the flow is logical but feels fragmented; the three “when/​how/​what” questions are not revisited explicitly in each sub‑section, and the transition from technical example to philosophical reflection is abrupt. |
| **Closing** | Lab 3 audit task and teaser for the next lecture on UI patterns. | ✅ Good, but could be tighter by explicitly tying back to the three opening questions. |
| **Overall Arc** | Hook → (definition‑heavy) core → example → philosophy → lab → preview. | ⚠️ Needs a clearer narrative thread that repeatedly answers *when*, *how*, and *what* throughout. |

**Suggested fix**: After each major subsection (Conceptual Core, Technical Example, Philosophical Reflection) insert a short “recap” paragraph that answers the three guiding questions again, showing how the material moves the class forward.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. Word Count | Target Range | Comments |
|---------|-------------------|--------------|----------|
| Conceptual Core (incl. Table 1 & Key Points) | ~ 850 | 1 000‑1 500 | Slightly thin; missing deeper discussion of failure modes, empirical data, and design patterns. |
| Technical Example (loan‑approval) | ~ 600 | 800‑1 200 | Needs richer scenario (e.g., edge cases, UI mock‑up screenshots) and a walkthrough of a feedback loop in practice. |
| Philosophical Reflection | ~ 550 | 800‑1 200 | Good concepts but could be expanded with concrete legal case studies, a short debate prompt, and a “what‑if” thought experiment. |
| **Total** | **≈ 2 000** | **2 500‑3 500** | **Under‑dense by ~ 500‑1 500 words**. |

**Key Points**: The current “Key Points” bullet lists are helpful but count toward the word budget; they should stay but be supplemented with richer narrative.

---

## 3. Interest & Engagement  

| Issue | Why it hurts engagement | Concrete remedy |
|-------|------------------------|-----------------|
| **Definition‑first style** in the “Conceptual Core” (e.g., “Human‑in‑the‑loop systems embed human judgment…”) | Students may tune out when presented with abstract definitions before seeing the problem in action. | Start the core with a *mini‑case*: a real‑world failure where missing HITL caused harm (e.g., a mis‑diagnosed skin lesion). Then unpack the definition. |
| **Sparse interactive moments** – only a few discussion prompts at the end. | 90 min classes need periodic “think‑pair‑share” or quick polls to keep attention. | Insert 2‑3 short activities: <br>1. Live poll on trust levels after showing a confidence score.<br>2. Pair‑work to map the loan‑approval flow onto the three collaboration modes.<br>3. Quick “thumbs‑up/down” on whether a given scenario is delegation vs. augmentation. |
| **Thin technical example** – only a list of actions. | No vivid illustration of how feedback actually updates a model. | Expand with a step‑by‑step walkthrough: a rejected loan triggers a data‑labeling pipeline, a model retraining job, and a performance dashboard update. Include a screenshot or mock UI. |
| **Philosophical section feels abstract** – no concrete legal case or ethical dilemma. | Students may disengage from high‑level theory. | Add a short case study (e.g., the 2018 Uber self‑driving car fatality) and ask: “Who is accountable under the EU AI Act?” Follow with a brief debate. |

---

## 4. Diagram Review (PlantUML Figure 2.6)

| Aspect | Current state | Suggested improvement |
|--------|---------------|------------------------|
| **Overall match to narrative** | Shows three interaction modes as parallel dashed arrows from AI to Human, plus Explainability, Action, Feedback, Audit. | Good high‑level alignment, but the *three modes* are not visually distinguished beyond background colors; the narrative stresses *delegation, augmentation, partnership* as distinct pathways. |
| **Clarity of nodes & labels** | Nodes are labeled but some are generic (“Action Executor”, “Correction”). | Add concise action verbs on the arrows (e.g., “Approve/Reject/Edit”). Rename “Correction” → “Feedback Signal”. |
| **Color usage** | Background colors (DELEGATION, AUGMENTATION, PARTNERSHIP) applied to AI node only – confusing. | Apply the same color to the *arrow* or to the *Human* node variant to show which mode is active. Consider a legend: <br>🟥 Delegation, 🟩 Augmentation, 🟦 Partnership. |
| **Feedback loop** | Arrow from “Correction” back to AI is present but unlabeled. | Label as “Training / Model Update”. Show a separate “Monitoring Dashboard” node that consumes audit logs for trust calibration (as mentioned in the text). |
| **Organizational context box** | Contains all nodes, making the diagram crowded. | Split into two containers: “AI Engine & Explainability” and “Human‑Centric Interaction”. Keep “Organizational Context” as an outer frame with a thin border, not a container that houses every element. |
| **Stylistic** | Uses `sketchy-outline` theme – fine for informal slides, but may reduce readability on projected screens. | Switch to a cleaner theme (e.g., `plain`) or keep sketchy but increase line thickness and font size. |
| **Missing quantitative cue** | No confidence score displayed in the diagram, though the narrative stresses its importance. | Add a small label on the AI → Human arrow: “Recommendation + confidence”. |

---

## 5. Recommended Revisions (Prioritized)

1. **Add ~ 600‑900 words of narrative depth**  
   - Insert a *real‑world failure* vignette at the start of the Conceptual Core.  
   - Expand the loan‑approval example with a step‑by‑step UI walkthrough and a concrete feedback‑to‑model pipeline.  
   - Flesh out the philosophical reflection with a short legal case study and a “what‑if” scenario.

2. **Re‑thread the three guiding questions**  
   - After each major subsection, include a 2‑sentence recap that explicitly answers *when*, *how*, and *what* for that material.  
   - End the lecture with a concise “closing loop” that revisits the questions and previews the next UI‑design lecture.

3. **Insert interactive micro‑activities** (≈ 5‑7 min each)  
   - Live poll on trust vs. confidence.  
   - Pair‑work mapping of the loan scenario to the three collaboration modes.  
   - Quick debate on accountability in a given case.

4. **Revise Figure 2.6**  
   - Apply mode‑specific colors to arrows or human node variants.  
   - Add a legend for the three modes.  
   - Relabel “Correction” → “Feedback Signal” and annotate the feedback arrow as “Model Update”.  
   - Split the container layout as suggested and increase readability (larger fonts, clearer lines).  

5. **Condense the “Key Points” bullets**  
   - Keep them but merge overlapping items (e.g., combine “trust calibration” and “over‑/under‑trust costly”).  
   - Use them as slide headings rather than a dense list, freeing word count for richer exposition.

6. **Provide a short “cheat‑sheet” handout**  
   - Summarize the three modes, accountability matrix, and UI checklist.  
   - Helps students follow along and reduces the need for excessive on‑slide text.

7. **Link Lab 3 more tightly to lecture content**  
   - Include a brief “audit‑report template” excerpt in the lecture slides.  
   - Show a sample filled‑in entry to illustrate visibility, authority, and traceability in practice.

---

**Bottom line**: The lecture has a promising hook and a clear pedagogical goal, but it falls short on depth and sustained engagement for a 90‑minute class. By enriching the narrative with concrete cases, weaving the guiding questions throughout, adding interactive moments, and polishing the diagram, the session will meet the required density and keep students actively invested.