# Review: 2.1: Real-World AI Deployments

**Source:** part-i/ch02-ai-in-practice/lecture-01.adoc

---

## Review of Lecture 2.1 – *Real‑World AI Deployments*  

**Grade: B‑**  
The lecture has a solid hook and a clear narrative, but it falls short on the required depth (≈2 500‑3 500 words) and on the “definition‑first” avoidance. The conceptual core, technical example, and philosophical reflection are each a bit thin, and the PlantUML diagram needs clearer visual cues to reinforce the story.

---

### 1. Narrative Arc  

| Element | Verdict | Comments / Suggested Fixes |
|---------|---------|----------------------------|
| **Hook** | ✅ Strong | The hospital LLM recall story is concrete, urgent, and raises a provocative question. |
| **Development** | ⚠️ Needs tightening | The three sections (Conceptual Core → Technical Example → Philosophical Reflection) are present, but the progression feels “list‑like”. Insert a short “problem → attempted solution → failure” mini‑story that threads through all three parts (e.g., *“The team first rolled out the model, then added a drift detector, then discovered the detector missed pediatric drift because …”*). |
| **Closing / Bridge** | ✅ Good | The bridge to the next lecture (live monitoring dashboard) is explicit. Consider ending the narrative with a forward‑looking “What if we could see the drift before it harms patients?” to heighten tension. |

**Overall narrative verdict:** *Mostly effective, but the middle could benefit from a tighter causal chain that links the stakeholder map, the feedback loop, and the philosophical claim about situated cognition.*  

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Current Approx. | Target (Paragraphs) | Target (Key Points) | Gap |
|---------|----------------|----------------------|---------------------|-----|
| Conceptual Core | 3‑4 paragraphs (≈ 600 w) | 4‑6 paragraphs | 6‑12 | **~1 000 w missing** |
| Technical Example | 2 paragraphs (≈ 350 w) | 2‑3 paragraphs | 5‑8 | **~300 w missing** |
| Philosophical Reflection | 2 paragraphs (≈ 350 w) | 2‑3 paragraphs | 5‑8 | **~300 w missing** |
| **Total** | ≈ 1 300 w | 8‑12 paragraphs | 16‑28 points | **~1 200‑2 000 w short** |

**What to do:**  
* Expand each core paragraph with a concrete sub‑example (e.g., a different domain such as autonomous driving or finance).  
* Add a “What went wrong?” bullet after each sub‑example to surface the *limit* of the attempted solution.  
* Insert a short “Design checklist” paragraph (≈ 150 w) that enumerates the inventory items the audit tool will capture.  

---

### 3. Interest  

| Issue | Why it hurts attention | Concrete remedy |
|-------|------------------------|-----------------|
| **Definition‑first phrasing** (“Intelligent systems in production differ…”) | Stops the story flow; readers wait for an example. | Lead with a vivid vignette (“When the radiology team switched to a new CT scanner, the LLM’s confidence scores plummeted…”) and then explain the principle. |
| **Key‑point lists are generic** | Students may skim them without internalising. | Add a *“real‑world illustration”* after each bullet (e.g., for “Feedback loops must be observed” show a screenshot of a drift‑detector alert). |
| **Lack of tension in technical example** | The pipeline description reads like a static diagram. | Insert a “failure scenario” (e.g., a sudden surge of “COVID‑19” terminology that trips the drift detector) and ask students to predict the outcome before revealing it. |
| **Philosophical reflection is abstract** | Might feel detached from the earlier concrete story. | Tie back to the hospital case (“The recall made visible the hidden political decision of who gets to see the X‑ray”) and pose a provocative question (“If observability is power, who holds the keys?”). |

---

### 4. Diagram Review (PlantUML block)

| Aspect | Current state | Suggested improvement |
|--------|---------------|-----------------------|
| **Overall layout** | Mixes swim‑lanes and activity flow; start/stop symbols are confusing for a data‑pipeline diagram. | Use **activity diagram** with explicit **swim‑lanes for “User”, “System”, “Data Lifecycle”, “Monitoring”, “Stakeholders”**. Remove `start/stop`. |
| **Labels & arrows** | Some arrows lack directionality (e.g., `Logs / Feedback --> Metrics : "emit"`). | Add **arrowheads** on all flows, and label the *type* of data (e.g., “log events”, “metric samples”). |
| **Feedback loop clarity** | The loop from `Drift Detector` → `Retrain Trigger` → `Training Data` → `Model` → `Logs` is present but visually tangled. | Introduce a **curved arrow** or a **loop box** labeled “Continuous Retraining Loop”. Use a different colour (e.g., orange) for the loop to stand out. |
| **Stakeholder nodes** | Operators, Regulators, Patients appear as isolated boxes with a single arrow from `Recall`. | Show **bidirectional arrows** where appropriate (e.g., Operators ↔ Dashboard, Regulators ↔ Incident Report). Add a **legend** explaining symbols (dash = data, solid = control). |
| **Metrics** | “Metrics (latency, error, bias)” is a single node. | Split into three separate nodes or annotate with small icons to emphasise *multiple* observability dimensions. |
| **Styling** | Hand‑written style (`handwritten true`) is fine but may reduce legibility on slides. | Keep sketchy outline but increase font size and line thickness for readability in a 90‑min lecture. |
| **Missing element** | No explicit **drift‑threshold** visual cue. | Add a decision diamond labelled “Drift > θ?” before the `Retrain Trigger`. |

---

### 5. Recommended Revisions (Prioritized)

1. **Add ~1 200‑1 500 words** to reach the 90‑minute density target.  
   * Expand Conceptual Core with two additional concrete case studies (e.g., autonomous‑vehicle perception drift, credit‑scoring model under regulatory change).  
   * Insert a “Failure‑mode” paragraph after each case to illustrate limits.  

2. **Re‑order any definition‑first sentences** so that a concrete anecdote precedes the abstract principle.  

3. **Enrich Key‑Point lists** with short, concrete examples or mini‑exercises (e.g., “Stakeholder map → list three indirect actors for a smart‑home assistant”).  

4. **Introduce a “mini‑story” thread** that runs through all three sections: a chronological account of the hospital LLM rollout, the addition of a drift detector, the missed pediatric drift, and the eventual recall.  

5. **Revise the PlantUML diagram** per the suggestions above (clear swim‑lanes, coloured feedback loop, explicit decision diamond, bidirectional stakeholder arrows, legend).  

6. **Insert a “design checklist” paragraph** (≈ 150 w) right before the Lab Prep, summarising the inventory items the audit tool must capture.  

7. **Add a reflective question** at the end of the Philosophical Reflection to re‑ignite tension (“If we could make every feedback loop visible, would we ever need a recall?”).  

8. **Check word count** (use a script or editor) to ensure the final lecture sits between 2 500 and 3 500 words.  

---

**Bottom line:** The lecture already has a compelling hook and a logical closing, but it needs more flesh (additional examples, deeper causal narrative) to fill a 90‑minute slot and to keep students engaged throughout. Strengthening the diagram and eliminating definition‑first dumps will make the material both richer and more memorable.