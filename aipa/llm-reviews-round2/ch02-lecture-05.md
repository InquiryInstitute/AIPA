# Review: 2.6: Failure Modes and Brittterness

**Source:** part-i/ch02-ai-in-practice/lecture-05.adoc

---

## Review of Lecture 2.6 – “Failure Modes and Brittterness”

**Grade: C‑**  
The lecture contains a decent set of concepts but falls short of the 90‑minute, 2 500‑3 500‑word target. The narrative arc is present but weakly developed, and several sections read like definition dumps. The single mind‑map diagram is useful but could be made far more pedagogically powerful.

---

### 1. Narrative Arc  

| Element | What the lecture does | Verdict |
|--------|-----------------------|---------|
| **Hook** | Starts with an epigraph and a rhetorical question (“What would happen if the map your AI relies on suddenly became outdated?”). | **Weak** – the hook is abstract; students need a concrete, emotionally‑charged scenario to feel the tension. |
| **Development** | Lists three failure families (adversarial, OOD, edge‑cases) → defines them → introduces “brittleness” → shows a taxonomy → suggests a stress‑test workflow. | **Fragmented** – the flow jumps from definition to taxonomy without a problem‑solution narrative. The “why do we care?” question is never fully answered before moving on. |
| **Closing / Bridge** | Ends with a “take‑away” that points to Lab 2 and a discussion prompt list. | **Adequate** – but the bridge to the next lecture (e.g., mitigation strategies) is only hinted at. |

**Overall narrative verdict:** The lecture needs a stronger opening story, a clearer problem → exploration → implication structure, and an explicit “what’s next” teaser (e.g., “In the next lecture we will see how to harden models against these brittleness modes”).

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. word count | Target range | Comments |
|---------|-------------------|--------------|----------|
| Epigraph / Intro | ~70 | 150‑250 | Too brief; could expand with a vivid case study. |
| Example Prompts | ~50 | 80‑120 | Fine as a teaser, but could be integrated into the story. |
| Conceptual Core | ~180 | 400‑600 | Definition‑heavy; needs illustrative anecdotes, data, and a mini‑case study. |
| Technical Example | ~230 | 500‑800 | Good outline but lacks concrete code snippets, metrics, or a walk‑through of a real‑world audit. |
| Philosophical Reflection | ~190 | 400‑600 | Thought‑provoking but could be deepened with a historical example (e.g., “Therac‑25” or “Google Photos mislabeling”). |
| Take‑away / Lab Prep / Discussion | ~150 | 200‑350 | Acceptable, but could be merged and expanded. |
| **Total** | **≈ 970** | **2 500‑3 500** | **~1 000 words** – roughly **⅓** of the required density. |

**Result:** The lecture is far too short. To fill a 90‑minute slot you need roughly **2–3 × more material** (additional examples, a small hands‑on walkthrough, and a richer philosophical discussion).

---

### 3. Interest & Engagement  

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Abstract hook** | No immediate stakes; students may not feel the urgency. | Open with a *real* incident (e.g., a self‑driving car misreading a stop sign after a sticker attack, or a medical‑image classifier failing on a new scanner). |
| **Definition‑first style** | Lists terms before showing why they matter. | Interleave each definition with a *story* or *demo* (show an adversarial image, then ask “What went wrong?”). |
| **Thin technical example** | No concrete numbers, no code, no visual output. | Add a short notebook‑style snippet: load a pretrained model, apply FGSM perturbation, print original vs. perturbed prediction, plot confidence histograms. |
| **Philosophical reflection is brief** | Misses the chance to connect to broader debates (e.g., “model interpretability vs. robustness”). | Expand with a historical failure (Therac‑25, Boeing 737 MAX) and ask students to compare the “map” in those domains. |
| **No forward motion** | Students finish without a clear sense of the next step. | End with a teaser: “Next week we’ll explore *defensive* techniques – adversarial training, domain adaptation, and uncertainty calibration.” |

---

### 4. Diagram Review (Mermaid mind‑map)

| Figure | Does it support the narrative? | Suggested improvements |
|--------|-------------------------------|------------------------|
| **Figure 2.5 – Failure mode taxonomy** | Shows the four top‑level buckets and leaf nodes, but the layout is dense and the colour scheme is subtle. | 1. Add **labels** on the edges (e.g., “Data drift → retrain”, “Adversarial → robustify”).<br>2. Use **distinct colours** for each bucket (e.g., blue for Drift, red for Adversarial, green for Edge Cases, orange for Evaluation).<br>3. Include **example icons** (camera for OOD images, shield for adversarial, magnifying glass for blind‑spot).<br>4. Add a **legend** explaining the leaf colour coding (leaf vs. doc).<br>5. Consider turning the mind‑map into a **flowchart** that shows the *audit pipeline*: Input → Detect failure → Classify (taxonomy) → Remediation path. |
| **Missing diagram** | No visual for the stress‑test workflow or for a concrete adversarial attack. | Insert a second figure: a **pipeline diagram** (Data → Perturbation generator → Model → Confidence check → Failure log). Annotate with sample numbers (e.g., “confidence drops from 0.92 → 0.12”). |

---

### 5. Recommended Revisions (prioritized)

1. **Rewrite the opening hook**  
   *Start with a 2‑minute narrative*: “A delivery drone flying over a city misreads a painted ‘No‑Fly’ zone because a graffiti artist added a tiny sticker… The drone crashes, the package is lost, and the company faces a lawsuit.” Follow with the map/territory metaphor.

2. **Expand the Conceptual Core to ~600 words**  
   - For each failure mode, give a **real‑world case study** (adversarial – stop‑sign stickers; OOD – night‑time autonomous‑car perception; edge‑case – rare medical pathology).  
   - Include a **small data table** showing performance drop (e.g., accuracy 92 % → 18 % under OOD).

3. **Enrich the Technical Example (≈ 800 words)**  
   - Provide a **code snippet** (Python + PyTorch/TensorFlow) that generates an FGSM adversarial image and logs confidence.  
   - Show **visuals** (original vs. perturbed image, confidence bar chart).  
   - Walk through the **taxonomy assignment** step‑by‑step.

4. **Deepen the Philosophical Reflection (≈ 600 words)**  
   - Compare AI brittleness to historic engineering failures (Therac‑25, Boeing 737 MAX).  
   - Discuss the **framing problem** with a concrete example (ImageNet classifier on radiology).  
   - Pose a **provocative question**: “If a model is deliberately narrow, is brittleness a bug or a feature?”

5. **Add a “Next‑Step” Bridge**  
   - End with a **preview** of Lecture 2.7 (Mitigation Strategies) and a **quick poll**: “Which failure mode worries you most in your own projects?”

6. **Revise Figure 2.5** (as per diagram suggestions) and **add a second pipeline diagram** for the stress‑test workflow.

7. **Increase interactive elements**  
   - Insert a **live poll** after the hook (“How many of you have seen a silent failure in a product you built?”).  
   - Provide a **short in‑class activity**: students sketch a failure‑mode taxonomy for a domain of their choice (e.g., chat‑bot, recommender).

8. **Word‑count check**  
   - Aim for **≈ 2 800 words** total across the three main sections (Conceptual Core, Technical Example, Philosophical Reflection).  
   - Use bullet‑point expansions, side‑bars, and short anecdotes to reach the target without padding.

---

## Summary

The lecture introduces essential failure‑mode concepts but needs **substantially more narrative depth, concrete examples, and interactive content** to fill a 90‑minute session and keep students engaged. Strengthening the opening story, fleshing out the technical walkthrough, and expanding the philosophical discussion will bring the lecture up to the required density and make it compelling. Updating the taxonomy diagram and adding a workflow figure will also reinforce learning outcomes. Implement the prioritized revisions above, and the lecture will move from a thin definition list to a vivid, practice‑oriented session.