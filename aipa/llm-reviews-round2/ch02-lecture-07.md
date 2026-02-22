# Review: 2.8: AI System Audits

**Source:** part-i/ch02-ai-in-practice/lecture-07.adoc

---

## Lecture 2.8 – AI System Audits  
**Path:** part‑i/ch02‑ai‑in‑practice/lecture‑07.adoc  

---

### Summary  
**Grade: B‑**  

The lecture has a clear hook (“What would happen if we never audited an AI system?”) and a logical progression from inventory → evaluation → governance → reporting → feedback.  The three main sections (Conceptual Core, Technical Example, Philosophical Reflection) each contain the required 4‑6 paragraphs and 5‑8 key‑point bullets, so the **density** is roughly on target.  

However, the narrative arc stalls after the hook; the middle feels like a definition dump, especially the “Conceptual Core” paragraph list.  The technical example is useful but could be enlivened with a concrete, domain‑specific scenario (e.g., a recommender system for a streaming service).  The philosophical reflection is strong but would benefit from a tighter link back to the earlier pipeline (e.g., “When the audit‑tool itself is the subject of audit, the feedback loop closes”).  

The PlantUML diagram is functional but sparse; adding labels for the three parallel artefacts and a feedback arrow from **Report** back to **Discover** would make the “dynamic governance loop” explicit.  

Overall the material can sustain a 90‑minute session, but it needs **more tension** and **storytelling** to keep students engaged throughout.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with a provocative “What would happen if we never audited an AI system?” plus a Foucault epigraph. Good concrete tension. | ✅ Strong |
| **Development** | Lists the five audit steps in a linear fashion. The steps are described, but the prose is definition‑heavy; there is little sense of a problem being solved or a story unfolding. The “Example Prompts” are a nice bridge, but they are not woven into a narrative that shows the audit in action. | ⚠️ Needs more story‑driven development (e.g., a case study of a failing system that is rescued by an audit). |
| **Closing / Bridge** | Ends with discussion prompts, lab prep, and a reading list. The bridge to the next lecture (tool‑server concept) is mentioned only in the Lab Prep line, which feels tacked on. | ⚠️ Weak – should explicitly tie the audit loop back to the “tool server” and preview the next lab’s objectives. |

**Overall Verdict:** Hook is solid; development and closing need tighter narrative connections and a clearer “problem → solution → limitation → implication” arc.

---

## 2. Density (Target ≈ 2 500‑3 500 words)  

| Section | Approx. Paragraphs | Approx. Key Points | Word Count Estimate |
|---------|-------------------|--------------------|---------------------|
| Conceptual Core | 5 | 6 | ~850 |
| Technical Example | 4 (JSON + Python + pipeline description) | 5 | ~750 |
| Philosophical Reflection | 4 | 6 | ~900 |
| **Total** | 13 | 17 | **≈ 2 500** |

The lecture sits at the low‑end of the word‑count window but still within the acceptable range for a 90‑minute session (especially because the lab work will fill time).  

**Recommendation:** Add ~200‑300 words of narrative (e.g., a short case study) to bring the total closer to the middle of the range and give the instructor more material for discussion.

---

## 3. Interest & Engagement  

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|----------------|
| **Definition‑first dump** in Conceptual Core (catalogues → evaluates → constitutes → produces → feeds back). | Students hear a list of verbs without seeing them in action. | Re‑frame as a *story*: “The recommender system for a music streaming service started delivering only mainstream hits. The engineering team ran an audit…”. Walk through each step with concrete observations. |
| **Technical example is abstract** (generic JSON schema). | Learners may not visualise the impact. | Use a domain‑specific example (e.g., bias against a minority genre) and show how the JSON entry maps to a real‑world risk. |
| **Philosophical reflection is dense** and jumps between concepts (disciplinary technology, audit‑gaming, transparency vs. security, self‑audit). | Cognitive overload; hard to keep a thread. | Break into two mini‑stories: (1) “The team tried to game the fairness audit” → illustrate audit‑gaming; (2) “When the audit report was published, competitors reverse‑engineered the model” → illustrate transparency vs. security. |
| **Lack of interactive tension** between sections. | Students may feel the lecture is a series of isolated blocks. | Insert a *“live audit”* demo (or a short video) after the Conceptual Core, then return to the philosophical implications of what was just seen. |
| **Discussion prompts are good** but could be tied to a *“think‑pair‑share”* activity. | Keeps the class moving. | Provide a 5‑minute structured activity: each pair writes a one‑sentence “audit‑gaming” scenario, then shares. |

---

## 4. Diagram Review  

**Diagram 1 – Audit Tool Pipeline**  

| Aspect | Current state | Suggested improvement |
|--------|---------------|-----------------------|
| **Overall match** | Shows Discover → Assess → Report with three parallel artefacts. Aligns with pipeline description. | Add a **feedback arrow** from **Report** back to **Discover** (or to a “Update inventory” node) to visualise the “dynamic governance loop” discussed in the Conceptual Core. |
| **Labels** | Nodes are labelled, but the parallel split artefacts are only described in the split text. | Replace “Generate Components list”, “Generate Dependencies graph”, “Generate Risks catalogue” with **artefact icons** (e.g., 📦, 🔗, ⚠️) and add short captions underneath. |
| **Arrows** | Straight arrows, no indication of data flow direction beyond the main line. | Use **dotted arrows** for “metadata” (e.g., trace logs) feeding into Discover, and a **bold arrow** from Report to “Policy/Design” (outside the diagram) to emphasise the feedback loop. |
| **Styling** | Theme “sketchy‑outline” is fine for a textbook, but the diagram is a bit cramped. | Increase vertical spacing between the three parallel branches, and add a **legend** in the bottom‑right corner explaining the icons. |
| **Caption** | “Figure 2.7: Audit tool pipeline (discover → assess → report)” – correct numbering? | Verify numbering (lecture 2.8 should probably be Figure 2.8). Update caption to reference the “dynamic governance loop”. |

---

## 5. Recommended Revisions (Prioritized)

1. **Introduce a concrete case study** (≈ 200 words) at the start of the Conceptual Core. Show a broken AI system, the decision to audit, and the resulting changes. This turns the definition list into a story.
2. **Re‑order the five audit steps** into a *problem‑solution* narrative:  
   - *Problem*: hidden bias or performance drop →  
   - *Discovery*: inventory →  
   - *Assessment*: evaluate →  
   - *Constitution*: decide what to surface →  
   - *Report & Feedback*: act on findings.  
   Use transition sentences (“Having discovered … we now evaluate …”) to create flow.
3. **Enrich the Technical Example** with a domain‑specific JSON entry (e.g., “bias‑against‑indie‑artists”) and a short paragraph explaining its real‑world impact.
4. **Add a live demo or video** (2‑3 min) of the audit pipeline running on a toy project (e.g., the “student‑ai” repo). Tie the demo directly to the diagram.
5. **Split the Philosophical Reflection** into two sub‑sections:  
   - *Audit‑gaming & Reflexivity* (with a concrete example).  
   - *Transparency vs. Security & Self‑Audit* (with a short vignette).  
   End each sub‑section with a single “Take‑away” bullet.
6. **Update the diagram**:  
   - Add feedback arrow from Report to Discover (or to a “Policy Update” node).  
   - Replace split‑branch text with icons + concise captions.  
   - Add legend and increase spacing.  
   - Verify figure numbering in the caption.
7. **Strengthen the closing bridge**: after Lab Prep, add a paragraph that explicitly says, “In the next lecture we will extend the audit tool into a *tool‑server* that the agent can call autonomously, completing the loop introduced here.”
8. **Embed a short structured activity** (think‑pair‑share) after the discussion prompts to keep the class interactive.
9. **Proofread for consistency**: ensure “audit” is not alternately capitalised, and that “Lab 3” references the correct lecture number (2.8) throughout.
10. **Optional**: Provide a short “quick‑check” quiz (3‑4 multiple‑choice questions) at the end of the lecture to reinforce the five audit steps.

---

Implementing the above changes will transform the lecture from a solid informational overview into an engaging, story‑driven session that sustains attention for a full 90‑minute class while preserving the required conceptual, technical, and philosophical depth.