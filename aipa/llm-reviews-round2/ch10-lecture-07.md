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
**Grade: D** – The current “lecture” consists of a single two‑line Python dictionary. It contains no narrative, no pedagogical scaffolding, no technical depth, and no philosophical reflection. As written it would occupy a few seconds of a 90‑minute class, let alone engage students. Major expansion is required before it can be considered a viable lecture for *Artificial Intelligence: A Postmodern Approach*.

---

## 1. Narrative Arc  

| Element | Verdict | Comments |
|--------|---------|----------|
| **Hook** | ❌ Missing | There is no opening scenario, provocative question, or tension‑setter. |
| **Development** | ❌ Missing | No problem statement, no step‑by‑step exposition of why routing matters, how the dictionary is used, or what alternatives exist. |
| **Closing / Bridge** | ❌ Missing | No implication, no preview of a lab, no link to later topics (e.g., governance of AI pipelines). |

**Overall:** The lecture lacks any narrative structure. It reads as a “definition‑first dump” (in fact, a code dump) with no story to follow.

---

## 2. Density (Target 2,500‑3,500 words)  

| Section | Expected Length | Actual Length | Gap |
|---------|----------------|--------------|-----|
| Conceptual Core (4‑6 paragraphs, 6‑12 key points) | ~1,200‑1,500 words | 0 | – |
| Technical Example (2‑3 paragraphs, 5‑8 key points) | ~600‑900 words | 0 | – |
| Philosophical Reflection (2‑3 paragraphs, 5‑8 key points) | ~600‑900 words | 0 | – |
| **Total** | 2,500‑3,500 words | **≈ 20 words** | **≈ 2,480‑3,480 missing** |

The lecture is essentially empty of content.

---

## 3. Interest  

- **Engagement:** A raw dictionary offers no hook for curiosity. Students will not see why “routing” matters in AI architectures.  
- **Cognitive Load:** The single line of code is too trivial to sustain attention; it will likely be ignored.  
- **Opportunity:** The topic *routing* can be turned into a compelling story about how modern AI systems orchestrate heterogeneous components (search APIs, LLMs, audit logs, governance checks).  

**What needs strengthening:**  
1. **Start with a concrete scenario** – e.g., “Imagine a corporate chatbot that must first retrieve up‑to‑date web data, then summarise it, then verify compliance before responding.”  
2. **Pose a tension** – “How do we guarantee that each step runs in the right order, respects privacy, and can be swapped out without breaking the whole system?”  
3. **Show the dictionary as a *design artifact*** that encodes the orchestration, then walk through each entry, explain the underlying services, and discuss alternatives (rule‑based pipelines, event‑driven architectures, LLM‑driven routing).  
4. **End with a forward‑looking question** – “What governance mechanisms can we embed into the routing layer to prevent misuse of AI?” – leading naturally into a hands‑on lab or the next lecture on “AI governance”.

---

## 4. Diagram Review  

*No PlantUML blocks are present.*  

**Recommendation:** Add at least one diagram to visualise the routing architecture:

| Suggested Diagram | Why it helps | Suggested PlantUML improvements |
|-------------------|--------------|---------------------------------|
| **High‑level pipeline flow** (User → Router → Service A/B/C/D → Aggregator → Response) | Gives students a mental map of data flow; anchors the dictionary entries in a visual context. | - Label each node with the service name (e.g., `web_search`, `llm`, `process_audit`, `governance`). <br> - Use directed arrows to show order. <br> - Add a “fallback” or “error handling” branch to illustrate robustness. |
| **Routing decision table** (inputs → routing keys → selected modules) | Shows how the dictionary is consulted at runtime. | - Represent the dictionary as a table. <br> - Highlight the key `"search"` mapping to `web_search`. <br> - Use colour to differentiate mandatory vs optional modules. |
| **Governance feedback loop** (audit → governance → policy update) | Reinforces the philosophical angle of oversight. | - Include a loop arrow from `process_audit` back to `governance`. <br> - Annotate with “policy enforcement”. |

---

## 5. Recommended Revisions (Prioritized)

1. **Create a narrative hook (5‑10 min).**  
   - Open with a vivid, real‑world use‑case (e.g., a compliance‑aware research assistant).  
   - Pose a concrete problem: “How do we guarantee the right sequence of AI services while staying auditable?”

2. **Expand the **Conceptual Core** (30‑35 min).**  
   - Define *routing* in the context of AI system architecture (not just a Python dict).  
   - Discuss design patterns: static routing tables, dynamic rule engines, event‑driven orchestration.  
   - List 6‑8 key points (e.g., decoupling, extensibility, fault tolerance, security, observability, policy compliance).

3. **Develop a **Technical Example** (20‑25 min).**  
   - Walk through the provided dictionary line‑by‑line, mapping each key to a concrete micro‑service (show code snippets, API contracts).  
   - Demonstrate how the router is invoked (e.g., `router.handle(request)`).  
   - Include a small runnable demo or Jupyter notebook that sends a request through the pipeline and prints intermediate results.  
   - Highlight 5‑8 technical points (e.g., lazy loading, error handling, logging, configuration management, testing).

4. **Add a **Philosophical Reflection** (15‑20 min).**  
   - Discuss the ethical stakes of routing decisions (who decides which service runs first?).  
   - Connect to broader themes of AI governance, accountability, and post‑modern critiques of technocratic control.  
   - Pose open‑ended questions for class discussion.

5. **Insert at least two PlantUML diagrams** (5‑10 min each).  
   - A pipeline flow diagram and a governance feedback loop.  
   - Ensure labels, directional arrows, and colour coding reinforce the spoken narrative.

6. **Design a short **lab or in‑class activity** (10‑15 min).**  
   - Students modify the routing dict to add a new service (e.g., a sentiment‑analysis module) and observe the effect.  
   - Prompt them to write a simple policy rule that blocks routing to `web_search` for certain keywords, linking back to governance.

7. **Provide a **closing bridge** (2‑3 min).**  
   - Summarise the main take‑aways.  
   - Preview the next lecture (e.g., “From routing to self‑governing AI: autonomous policy learning”).

8. **Edit the existing code block** for clarity:  
   ```python
   # Routing table: maps high‑level intents to concrete service pipelines
   ROUTING = {
       "search":   ["web_search"],          # retrieve fresh web data
       "summarise": ["llm"],                # generate concise summary via LLM
       "audit":    ["process_audit"],        # log and verify actions
       "govern":   ["governance"]           # enforce policy & compliance
   }
   ```

9. **Add reading references** (2‑3 scholarly sources) for students who want deeper insight into AI system orchestration and governance.

---

### Bottom Line
The current material is far from a 90‑minute lecture. By embedding a concrete scenario, expanding conceptual and technical depth, weaving in philosophical discussion, and supporting the narrative with clear diagrams and a hands‑on component, the lecture can be transformed into an engaging, pedagogically sound session that aligns with the AIPA textbook’s standards.