# Review: 2.1: Real-World AI Deployments

**Source:** part-i/ch02-ai-in-practice/lecture-01.adoc

---

## Lecture 2.1 – Real‑World AI Deployments  
**Path:** `part-i/ch02-ai-in-practice/lecture-01.adoc`

---

### Summary & Grade
**Grade: B‑**  

The lecture has a solid opening vignette (the hospital LLM failure) and a clear three‑part structure (Conceptual Core → Technical Example → Philosophical Reflection). However, the narrative arc stalls after the hook; the sections drift into definition‑heavy lists, and the pacing feels uneven for a 90‑minute class. Word‑count is a bit low for the “core” (≈ 1 200 w) and the “technical example” (≈ 800 w), leaving little room for the deep discussion and lab‑prep that should fill a 90‑minute session. The single PlantUML diagram is useful but under‑labelled, and the key‑point bullet lists are too dense, making it hard for students to see the story‑line. With a few concrete hooks, tighter sequencing, and richer visual cues the lecture can reach the A‑range.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with a concrete, news‑worthy scenario (hospital LLM recall). It creates tension (performance boost → hidden failure) and raises a provocative question: *Why do models that look perfect in the lab break in the wild?* | ✅ Strong |
| **Development** | The three subsections each address a facet (conceptual, technical, philosophical) but they are presented as parallel “blocks” rather than a progressive story. The transition from “stakeholders & constraints” → “feedback loop” → “situated cognition” is logical, yet the lecture does **not** explicitly show how each builds on the previous one (e.g., “Because stakeholders multiply, we need observability; observability reveals situated cognition”). | ⚠️ Needs tighter connective tissue |
| **Closing / Bridge** | Ends with a “Discussion Prompts” list and a Lab‑Prep that ties back to the inventory tool. The bridge to the next lecture (presumably “Monitoring & Auditing”) is implicit but not explicit. | ⚠️ Weak – should state the forward‑looking implication (“Next we’ll learn how to turn the inventory into a live monitoring dashboard”). |
| **Overall Arc** | Hook → (Conceptual) → (Technical) → (Philosophical) → (Discussion) → (Lab) → (Next lecture). The arc is present but the **narrative momentum** stalls in the middle because each block is a self‑contained exposition rather than a cause‑effect chain. | ⚠️ Improve flow |

**Suggested Narrative Glue**  
1. After the hook, pose the *central problem*: “How do we guarantee that the 30 % gain survives when the world changes?”  
2. Use the **Conceptual Core** to list *what we need* (stakeholders, constraints).  
3. Show the **Technical Example** as a concrete illustration of those needs (the request‑path → feedback loop).  
4. Transition to **Philosophical Reflection** by asking “What does this loop tell us about the nature of AI intelligence?” – linking the concrete loop to the abstract idea of situated cognition.  
5. End with a **forward‑looking promise**: “In the next session we’ll turn this inventory into a live observability dashboard, giving you the tools to catch the drift before a recall.”  

---

## 2. Density (Target 2 500‑3 500 w)

| Section | Approx. Word Count | Target Range | Comments |
|---------|-------------------|--------------|----------|
| **Conceptual Core** | ~1 200 w | 1 200‑1 800 w (4‑6 paragraphs) | Meets lower bound but only 4 paragraphs; could be expanded with a short case‑study (e.g., a hiring‑algorithm bias scandal) to reach ~1 500 w. |
| **Technical Example** | ~800 w | 800‑1 200 w (2‑3 paragraphs) | Good length, but the paragraph on “monitoring” is thin; add a concrete metric (e.g., latency SLA breach) and a short demo of a drift‑detection rule. |
| **Philosophical Reflection** | ~850 w | 800‑1 200 w (2‑3 paragraphs) | Adequate; could be split into two clearer paragraphs (one on situated cognition, one on epistemic politics). |
| **Key‑point Lists** | 8 (core) + 6 (technical) + 6 (philosophical) = 20 items | 5‑8 per section | Slightly over‑dense; consider merging overlapping points (e.g., “Stakeholders multiply” and “Indirectly affected parties”). |
| **Total (excluding epigraph, prompts, discussion, lab prep)** | ~2 850 w | 2 500‑3 500 w | Within target, but the *distribution* is uneven (core is thin on narrative, technical is the heaviest). |

**Action**: Add ~300‑400 w to the Conceptual Core (a mini‑case, a short story of a failed deployment) and trim a few redundant bullet points.

---

## 3. Interest & Engagement  

| Issue | Why it hurts attention | Remedy |
|-------|------------------------|--------|
| **Definition‑first style** in the Conceptual Core (e.g., “Intelligent systems in production differ from prototypes in the lab.”) | Starts with abstract claim before the concrete stakes. | Lead with a *question* or *anecdote*: “Imagine you’re a radiologist who just got a new AI assistant…”. |
| **Bullet‑heavy key‑point sections** | Long lists can feel like a reading‑assignment rather than a discussion. | Convert some bullets into *interactive polls* (e.g., “Which stakeholder is most likely to notice a drift first?”). |
| **Lack of visual tension** in the diagram (no explicit “error spike” or “recall” node) | Students may not see the failure loop. | Add a “Failure/Recall” node and a feedback arrow to “Regulators”. |
| **Lab Prep appears at the very end** without a clear *why now* | Students may not see the relevance to the lecture’s story. | Insert a short “Live demo” segment: show a mock dashboard where a spike triggers a recall alert. |
| **Discussion prompts are good but not scaffolded** | Could be overwhelming; students may not know which angle to take. | Provide a *starter* for each prompt (e.g., “One example: the COMPAS risk‑assessment tool”). |

**Overall**: The lecture will hold attention if the instructor alternates between story, diagram walk‑through, and quick pair‑share activities every 15‑20 minutes. Right now the script leans heavily on reading.

---

## 4. Diagram Review (PlantUML)

**Current Diagram**  

```
@startuml
|Request Path|
start
:User;
:API;
:Model;
|Data (lifecycle)|
:Training Data;
:Knowledge Store;
:Logs / Feedback;
stop

' feedback loop
Logs / Feedback --> Training Data : "retrain trigger"
Training Data --> Model : "updated model"
Model --> Logs / Feedback : "new logs"

' augmentation
Knowledge Store ..> Model : "retrieval‑augmentation"

' monitoring
Logs / Feedback --> Monitoring : "metrics"
Monitoring --> Dashboard : "alerts"
@enduml
```

| Aspect | Evaluation | Suggested Improvement |
|--------|------------|------------------------|
| **Alignment with narrative** | Shows request path and feedback loop, matching the Technical Example. However, the *hospital recall* scenario (error spike → recall) is missing, and the *stakeholder* layer (operators, regulators) is absent. | Add three extra swim‑lanes: **Operators**, **Regulators**, **Patients**. Insert a “Recall/Alert” box that receives input from **Monitoring** and sends a signal to **Operators** and **Regulators**. |
| **Labels & Arrows** | Arrows are labelled, but the direction of the “knowledge store” augmentation is a dotted line (`..>`), which may be confusing. | Use a solid arrow with label “retrieval‑augmented inference”. Add a legend or tooltip for dotted vs solid. |
| **Feedback Loop Clarity** | The loop `Logs → Training Data → Model → Logs` is correct but visually dense; the “retrain trigger” label is vague. | Split the loop: `Logs → Drift Detector → Retrain Trigger → Training Data`. Show a decision node (“Drift? Yes/No”). |
| **Styling** | Theme `sketchy-outline` is fine for a lecture, but the diagram is cramped; the “stop” node is unnecessary. | Remove `stop`; replace with an end‑state “Service Ready”. Increase vertical spacing between the two swim‑lanes. |
| **Missing Metrics** | Monitoring → Dashboard is present, but the diagram does not show *metrics* (latency, error rate). | Add a box “Metrics (latency, error‑rate, bias‑score)” feeding into Monitoring. |
| **Overall readability** | Acceptable for a quick glance, but students may miss the *recall* feedback. | Add a red‑colored “Recall” node with a bold arrow from **Dashboard → Recall** and a feedback arrow to **Model** (e.g., “rollback”). |

**Revised PlantUML Sketch (conceptual)**  

```plantuml
@startuml
skinparam backgroundColor #F9F9F9
skinparam handwritten true

'--- Swimlanes -------------------------------------------------
|Request Path|
start
:User;
:API;
:Model;
|Data (lifecycle)|
:Training Data;
:Knowledge Store;
:Logs / Feedback;
|Monitoring|
:Metrics (latency, error, bias);
:Drift Detector;
if (Drift?) then (yes)
  :Retrain Trigger;
  --> Training Data;
endif
stop

'--- Feedback Loop --------------------------------------------
Logs / Feedback --> Metrics : "emit"
Metrics --> Drift Detector : "evaluate"
Drift Detector --> Retrain Trigger : "signal"
Retrain Trigger --> Training Data : "re‑train"
Training Data --> Model : "updated model"
Model --> Logs / Feedback : "new logs"

'--- Augmentation ---------------------------------------------
Knowledge Store --> Model : "retrieval‑augmented inference"

'--- Stakeholder & Recall ------------------------------------
|Operators|
:Operator Dashboard;
Metrics --> Operator Dashboard : "alerts"
Operator Dashboard --> Recall : "manual shutdown"
|Regulators|
Recall --> Regulators : "report"
|Patients|
Recall --> Patients : "service interruption"

@enduml
```

*The revised diagram adds explicit monitoring, drift detection, and a recall pathway that ties back to operators and regulators – exactly the story introduced in the hook.*

---

## 5. Recommended Revisions (Prioritized)

1. **Strengthen the narrative glue**  
   - Insert a *central question* after the hook: “How can we guarantee that a 30 % turnaround gain survives when the clinical context changes?”  
   - Add explicit transition sentences linking Conceptual → Technical → Philosophical (e.g., “To manage those stakeholders we need an observable pipeline; the pipeline itself reveals why context matters.”).

2. **Expand the Conceptual Core (~300 w)**  
   - Brief case study of a real‑world failure (e.g., Amazon hiring tool, COMPAS risk scores).  
   - Highlight the *cost* of ignoring stakeholders (legal, reputational).  

3. **Trim & merge redundant key‑point bullets**  
   - Combine “Technology neither good nor bad nor neutral” with “Choices have distributional effects”.  
   - Reduce the list to 6–7 crisp points per section.

4. **Revise the PlantUML diagram** (see revised sketch).  
   - Add stakeholder lanes, drift‑detector decision node, and a “Recall” box.  
   - Use colour/high‑contrast for the recall path to make the failure loop obvious.

5. **Insert an interactive “Live Demo” (5‑10 min)**  
   - Show a mock dashboard where a sudden error‑rate spike triggers a red alert and a simulated recall.  
   - Tie the demo directly to the diagram (highlight the arrows that light up).

6. **Scaffold discussion prompts**  
   - Provide a one‑sentence example for each prompt in the slide notes.  
   - Encourage small‑group sharing before whole‑class debrief.

7. **Explicitly bridge to the next lecture**  
   - End with a forward‑looking sentence: “Next week we’ll turn the inventory you just built into a real‑time monitoring system that can automatically flag drift before a recall is needed.”  

8. **Add a short “Reflection Prompt” at the end of each major section**  
   - After Conceptual Core: “Write one sentence describing a stakeholder you hadn’t considered before.”  
   - After Technical Example: “What metric would you monitor first, and why?”  

9. **Check word‑count**  
   - After revisions, aim for ~1 500 w in Conceptual Core, ~1 000 w in Technical Example, ~1 000 w in Philosophical Reflection (total ≈ 3 500 w).  

10. **Proofread for consistency**  
    - Ensure terms like “feedback loop”, “drift”, “observability” are used consistently across sections and the diagram.

---

### Final Thought
With a tighter story arc, richer concrete examples, and a more informative diagram, Lecture 2.1 will not only fill a 90‑minute slot comfortably but also keep students actively engaged, primed for the hands‑on inventory lab, and eager for the next session on monitoring & accountability.