# Review: python
ROUTING = {
    "search": ["web_search"],
    "summarise": ["llm"],
    "audit": ["process_audit"],
    "govern": ["governance"]
}

**Source:** part-iv/ch10-architectures-of-intelligence/lecture-07.adoc

---

## Summary  
**Grade: D** – The lecture consists of a single two‑line Python snippet and offers no narrative, context, or learning objectives. It falls far short of the 2,500‑3,500‑word target and provides no hook, development, or closing. Without additional material the session would be impossible to fill for 90 minutes, and there are no diagrams to evaluate.

---

## Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | No concrete scenario, question, or tension is introduced. The reader is dropped straight into a dictionary definition. |
| **Development** | ❌ Missing | No problem statement, no explanation of why routing matters, no step‑by‑step build‑up (e.g., from monolithic pipelines to modular routing). |
| **Closing / Bridge** | ❌ Missing | No implication, no preview of a lab, no link to the next lecture. |

**Overall:** No narrative arc at all. The lecture needs a story‑line that starts with a real‑world pain point (e.g., “How does an autonomous analyst decide whether to call a web‑search service or an LLM?”), walks through design choices, and ends with a forward‑looking question or a lab activity.

---

## Density  

| Section | Expected (words) | Present (words) | Gap |
|---------|------------------|----------------|-----|
| Conceptual Core | 4‑6 paragraphs (≈1 200‑1 800 words) | 0 | – |
| Technical Example | 2‑3 paragraphs (≈600‑900 words) | 0 | – |
| Philosophical Reflection | 2‑3 paragraphs (≈600‑900 words) | 0 | – |
| **Total** | 2 500‑3 500 | **≈5** | **≈2 500‑3 500** |

The lecture contains only a single line of code (≈5 words). It does not meet any of the required density criteria.

---

## Interest  

- **Engagement:** A bare dictionary will not hold anyone’s attention for more than a few seconds.  
- **Thin/Vague:** The snippet is completely context‑free; students cannot infer its purpose, constraints, or alternatives.  
- **Definition‑first:** The only “definition” is presented without motivation or example.

**What to strengthen:**  
1. Begin with a vivid scenario (e.g., a digital assistant that must decide which backend service to invoke).  
2. Pose a provocative question: “Can a single static routing table handle the dynamic demands of modern AI pipelines?”  
3. Build a narrative that explores trade‑offs (static vs. learned routing, interpretability, governance).  
4. End with a hands‑on lab: students extend the routing table, add a new service, and evaluate performance.

---

## Diagram Review  

No PlantUML blocks are present. To support the narrative, at least two diagrams are recommended:

1. **Architecture Overview** – Show a high‑level flow: *User request → Router → Service (web_search, llm, process_audit, governance)*.  
2. **Routing Decision Logic** – A decision tree or state‑machine illustrating how a request key maps to one or more downstream modules.

When added, ensure:  
- Clear labels for each component.  
- Arrows indicating data flow and feedback loops (e.g., audit results feeding back to governance).  
- Use of colors or stereotypes to differentiate “AI services” from “process services”.

---

## Recommended Revisions  

1. **Create a Hook (1 paragraph, ~150 words).**  
   - Open with a concrete story (e.g., a compliance officer asking an AI system to “summarise the latest regulation” and the system must decide whether to call a web‑search API or an LLM).  
   - Pose a tension‑filled question about routing decisions.

2. **Write a Conceptual Core (4‑6 paragraphs, ~1 500 words).**  
   - Define *routing* in AI pipelines, contrast static vs. dynamic routing, discuss scalability, interpretability, and governance.  
   - Introduce the `ROUTING` dict as a concrete illustration of a static routing table.  
   - Explain each key (`search`, `summarise`, `audit`, `govern`) and the rationale for mapping to specific services.

3. **Develop a Technical Example (2‑3 paragraphs, ~800 words).**  
   - Show a minimal runnable script that receives a user intent, looks up `ROUTING`, dispatches to a mock function, and returns a result.  
   - Include code comments, a small test harness, and a discussion of error handling (missing keys, multiple services).  
   - Extend the example to demonstrate how to add a new service (e.g., “translate”) and discuss versioning.

4. **Add a Philosophical Reflection (2‑3 paragraphs, ~800 words).**  
   - Discuss the implications of hard‑coded routing for agency, bias, and accountability.  
   - Raise questions: “Who decides the routing policy? How can we audit it?”  
   - Connect to the broader theme of *architectures of intelligence* and preview the next lecture on *learned routing* or *meta‑control*.

5. **Insert Two PlantUML Diagrams.**  
   - **Diagram 1:** High‑level system architecture with the router at the centre.  
   - **Diagram 2:** Decision flow inside the router (key lookup → service list → parallel execution).  
   - Add labels, directional arrows, and a legend.

6. **Close with a Bridge (1 paragraph, ~150 words).**  
   - Summarise the key take‑aways.  
   - Pose an open problem for the lab: “Can you design a router that learns to re‑weight services based on runtime performance?”  
   - Point to the next lecture on *adaptive routing*.

7. **Word‑count Check.**  
   - After drafting, verify that the combined sections fall within 2 500‑3 500 words.

By following these steps the lecture will achieve a clear narrative arc, meet the density requirements, and become engaging enough for a full 90‑minute session.