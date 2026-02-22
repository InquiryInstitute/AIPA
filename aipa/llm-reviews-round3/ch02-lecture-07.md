# Review: 2.8: AI System Audits

**Source:** part-i/ch02-ai-in-practice/lecture-07.adoc

---

## Review of Lecture 2.8 – **AI System Audits**

### Summary & Grade
**Grade: B‑**  
The lecture meets most structural requirements (4‑6 core paragraphs, 2‑3 technical paragraphs, 2‑3 philosophical paragraphs, appropriate key‑point counts) and contains a clear hook, a step‑wise development, and a forward‑looking closing.  
However, the philosophical section runs a paragraph long, pushing the overall word count toward the low‑end of the 2 500‑3 500 word window, and several passages still read like “definition‑first” dumps (e.g., the bullet‑point lists repeat the same ideas without narrative expansion). The diagram is functional but could be tightened to reinforce the feedback loop more explicitly. With a few focused enrichments the lecture will comfortably fill a 90‑minute slot and keep students engaged.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with a Foucault epigraph and the provocative question *“What would happen if we never audited an AI system?”* followed by a concrete “music‑streaming bias” vignette. | ✅ Strong |
| **Development** | The **Conceptual Core** walks the reader through five audit stages (catalogue → evaluate → constitute → report → feedback) using the streaming example. The **Technical Example** shows a JSON artefact, a discovery script, and a three‑stage pipeline. The **Philosophical Reflection** adds a layer of critical theory (disciplinary tech, audit‑gaming, transparency vs security, self‑audit). | ✅ Good, but the philosophical part is a bit dense; could be split into two shorter paragraphs. |
| **Closing** | Ends with discussion prompts, a concrete lab‑prep description, and a teaser for the next lecture (self‑governing tool‑server). This creates a clear bridge to practice. | ✅ Effective |

**Overall Verdict:** The lecture has a coherent arc with a hook, development, and closing. Minor re‑ordering (e.g., moving the “self‑audit” paragraph to the end of the philosophical section) would improve pacing.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs | Key‑point bullets | Approx. word count* |
|---------|------------|-------------------|---------------------|
| Conceptual Core | 6 (within 4‑6) | 6 (within 6‑12) | ~1 200 |
| Technical Example | 3 (within 2‑3) | 5 (within 5‑8) | ~600 |
| Philosophical Reflection | 4 (target 2‑3) | 6 (within 5‑8) | ~600 |
| **Total** | **13** | **17** | **≈ 2 400‑2 600** |

\*Rough estimate based on average 150 words per paragraph plus bullet‑point expansions.

**Assessment:** The lecture sits at the lower edge of the word‑count window, mainly because the philosophical reflection is a bit verbose while the technical example is concise. Adding a short “real‑world audit failure” case study (≈ 200 words) and trimming the philosophical section to three paragraphs will bring the total comfortably into the 2 500‑3 500 range.

---

## 3. Interest & Engagement

| Issue | Why it may thin attention | Suggested fix |
|-------|---------------------------|---------------|
| **Definition‑first feel** in the bullet lists (e.g., “Cataloguing defines the audit boundary”) | Repeating the same idea that was just explained in the paragraph can feel redundant. | Convert some bullets into **actionable prompts** (e.g., “Ask: Which data sources are we missing?”) or **mini‑exercises** (“Sketch the audit boundary for a chatbot”). |
| **Philosophical section length** | Four dense paragraphs can feel abstract after the concrete technical part. | Split into two: (1) “Audits as disciplinary technologies” (incl. Foucault) and (2) “Practical tensions: audit‑gaming, transparency vs security, self‑audit”. End each with a **quick poll** or “raise‑hand” question. |
| **Lack of tension beyond bias** | The streaming example is relatable but may not convey stakes (e.g., regulatory fines, user harm). | Insert a **“what‑if” vignette** at the start of the Conceptual Core: *“Imagine the service is fined €10 M because a regulator discovered hidden bias after a whistle‑blower report.”* |
| **Lab connection** | Lab prep is described, but students may not see the immediate payoff. | Add a **“preview demo”** sentence: “In Lab 3 you’ll see the audit report appear in the monitoring dashboard you built in Lab 2, closing the loop in real time.” |

---

## 4. Diagram Review (PlantUML)

**Current diagram** shows a start → Discover (split into three parallel artefacts) → Assess → Report → feedback arrow back to Discover.

| Observation | Recommendation |
|-------------|----------------|
| **Title & legend** – The title “Audit Tool Pipeline” is fine, but the diagram lacks a legend for the icons (📦, 🔗, ⚠️). | Add a small legend box on the right side explaining each icon. |
| **Feedback arrow** – The arrow is drawn as a simple line (`--> Discover`) without a label, so the loop’s purpose isn’t explicit. | Label the arrow “Update inventory / policy (feedback)”. Consider using a **dashed** line to indicate an asynchronous feedback loop. |
| **Parallel split** – The three parallel branches are shown but not clearly linked to the final report (e.g., the report should aggregate the three artefacts). | Add a **join** node after the three branches that feeds into the Assess step, making it clear that Assess consumes all three artefacts. |
| **Styling** – The sketchy‑outline theme is appropriate, but the diagram could benefit from **color coding** (e.g., blue for components, orange for dependencies, red for risks). | Use `#color` tags on the activity boxes, e.g., `:📦 Generate Components list; #LightBlue`. |
| **Scale** – The diagram is a bit cramped; the “Report” box is small compared to the earlier steps. | Increase the width of the Report node and add a note “JSON/YAML artefact”. |
| **Missing external input** – The audit pipeline often consumes **runtime logs** (Lab 2) as an input. | Add a small input arrow from the left side labeled “Trace logs (Lab 2)”. |

**Revised PlantUML sketch (concise):**

```plantuml
@startuml
!theme sketchy-outline

title Audit Tool Pipeline

'--- Legend
legend right
  📦 = Components
  🔗 = Dependencies
  ⚠️ = Risks
endlegend

start
:Discover\n(collect inventory, parse configs);
split
  :📦 Generate Components list; #LightBlue
split again
  :🔗 Generate Dependencies graph; #Orange
split again
  :⚠️ Generate Risks catalogue; #Red
end split
' join artefacts
:Assess\n(evaluate bias, safety, performance);
:Report\n(assemble JSON/YAML);
note right of Report
  Output: audit_report.json
end note
--> Discover : feedback (update inventory / policy)
stop
@enduml
```

---

## 5. Recommended Revisions (Prioritized)

1. **Trim & restructure the Philosophical Reflection**  
   * Reduce to three paragraphs (disciplinary tech, audit‑gaming & mitigation, transparency vs security & self‑audit).  
   * End each paragraph with a concrete discussion prompt or a “quick poll” question.

2. **Boost overall word count to ≥ 2 500**  
   * Insert a 200‑word “high‑stakes” vignette (regulatory fine, user backlash) at the start of the Conceptual Core.  
   * Add a 150‑word “real‑world audit failure” case (e.g., a credit‑scoring model that missed a bias due to incomplete component discovery).

3. **Convert some bullet‑point repeats into active learning moments**  
   * Replace “Cataloguing defines the audit boundary” with a short exercise: “List three hidden components you think might be missing in a typical recommendation pipeline.”  
   * Turn “Omitted criteria remain invisible” into a reflective question: “What criteria would you be tempted to drop to speed up the audit?”

4. **Enhance the diagram**  
   * Add a legend for icons.  
   * Label the feedback arrow and make it dashed.  
   * Colour‑code the three parallel artefacts.  
   * Include an external input arrow for runtime logs.

5. **Strengthen the hook & tension**  
   * Re‑phrase the opening question to include stakes: “What would happen if a hidden bias in an AI system went unchecked until a regulator slapped a €10 M fine on the company?”  
   * Mention the potential reputational damage to the streaming service.

6. **Explicitly tie Lab 3 to the lecture narrative**  
   * Add a sentence previewing the dashboard integration: “When you run Lab 3, the generated `audit_report.json` will automatically populate the monitoring dashboard you built in Lab 2, giving you a live view of the feedback loop.”

7. **Proofread for consistency**  
   * Ensure terminology is uniform (e.g., “audit pipeline” vs “audit tool pipeline”).  
   * Verify that all code blocks are properly indented and that the JSON example includes a trailing comma‑free format.

---

Implementing these edits will give the lecture a tighter narrative flow, meet the 90‑minute density target comfortably, and keep students actively engaged throughout the session.