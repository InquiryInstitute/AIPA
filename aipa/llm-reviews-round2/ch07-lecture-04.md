# Review: 7.4: Symbolic Memory — Graphs and Knowledge Bases

**Source:** part-iii/ch07-memory-systems/lecture-04.adoc

---

## Review of Lecture 7.4 – *Symbolic Memory — Graphs and Knowledge Bases*  

**Grade: B‑**  

The lecture has a solid hook and a clear closing bridge, but the overall pacing is uneven. The conceptual core is dense enough, yet the technical example and philosophical reflection are too brief to sustain a 90‑minute session without additional scaffolding. The PlantUML flowchart is functional but could be richer to illustrate the hybrid pipeline. Below is a detailed breakdown and concrete revision plan.

---

### 1. Narrative Arc  

| Element | Evaluation | Comments |
|---------|------------|----------|
| **Hook** | ✅ Strong | Starts with a concrete, high‑stakes query (“What papers cite X and are most relevant to my current project?”). This immediately creates tension between exact graph traversal and fuzzy semantic ranking. |
| **Development** | ⚠️ Needs stronger scaffolding | The lecture jumps from “When Symbolic Retrieval Is Needed” → “When Vector Retrieval Is Needed” → “Hybrid Retrieval”. The transitions are logical but feel like a list of definitions rather than a story. There is no explicit problem‑solution‑limit progression (e.g., *Problem*: pure graph is too narrow; *Response*: add vector ranking; *Limit*: still suffers from ontology bias). |
| **Closing** | ✅ Good bridge | Ends with a forward‑looking question about using graph‑derived facts for planning and points to the next lecture. This creates a narrative payoff. |
| **Verdict** | **Mixed** – Hook and closing are solid; development needs a tighter arc with a “conflict → resolution → open question” structure. |

---

### 2. Density (Target ≈ 2 500‑3 500 words)  

| Section | Approx. Paragraphs | Approx. Key Points | Word Count Estimate |
|---------|--------------------|--------------------|---------------------|
| Conceptual Core | 4‑5 | 8 | ~1 200 |
| Technical Example | 2 | 5 | ~600 |
| Philosophical Reflection | 2 | 5 | ~500 |
| **Total** | ~9 | ~18 | **≈ 2 300** |

*The lecture falls short of the 2 500‑3 500‑word window, mainly because the technical example and philosophical reflection are very brief. Adding a few more paragraphs (e.g., a walkthrough of a real‑world dataset, a short case study, or a deeper ethical discussion) would bring the total into the target range and give the instructor more material for in‑class interaction.*

---

### 3. Interest & Engagement  

| Issue | Why it matters | Suggested fix |
|-------|----------------|---------------|
| **Definition‑first style** in “When Symbolic Retrieval Is Needed” and “When Vector Retrieval Is Needed”. | Students may tune out if they hear a litany of bullet‑style facts without a narrative hook. | Re‑frame each subsection as a *mini‑scenario*: “Imagine you need to verify that Alice is Bob’s manager…” then show how the graph solves it, followed by a contrasting scenario for vectors. |
| **Thin technical example** – only a 5‑line pseudo‑API. | Not enough material for a 20‑minute live coding demo or guided walk‑through. | Expand the example: (1) load a tiny KG (e.g., a citation graph); (2) compute embeddings for paper abstracts; (3) run the hybrid pipeline step‑by‑step, printing intermediate results. |
| **Philosophical reflection** is a single paragraph. | Ethical and epistemic implications are a major draw for a post‑modern AI course; a brief mention feels perfunctory. | Add a short case study (e.g., gender bias in citation graphs) and a discussion prompt that forces students to think about ontology design choices. |
| **Lack of interactive checkpoints** – no quick “think‑pair‑share” or “mini‑quiz”. | 90‑minute sessions need periodic engagement to keep attention. | Insert 2‑3 “pause‑and‑reflect” boxes after each major subsection (e.g., “What would happen if the graph missed a citation edge?”). |

---

### 4. Diagram Review (PlantUML)  

**Current diagram** (flowchart of three modes).  

| Aspect | Assessment | Recommendation |
|--------|------------|----------------|
| **Relevance to narrative** | Shows the three retrieval modes but does **not** illustrate the *hybrid pipeline* (graph filter → vector rank → combine). | Add a sub‑flow inside the “hybrid” branch that visualises the two‑step process, with arrows labeled “filter” and “rank”. |
| **Labels & Clarity** | Nodes are generic (“Query”, “Graph Filter”, “Vector Retrieval”). No indication of inputs/outputs (e.g., embeddings, subgraph). | Include small annotations: “query embedding” entering the vector step; “subgraph S” exiting the filter step. |
| **Feedback loops** | None. In practice, hybrid retrieval may iterate (e.g., re‑rank after expanding the subgraph). | Add an optional loop from “Combine Results” back to “Graph Filter” labelled “refine filter (optional)”. |
| **Stylistic** | Uses default shapes; theme is fine. | Use a decision diamond for “Mode?” and a split‑join symbol for the hybrid branch to emphasise parallelism. |
| **Overall** | Functional but under‑exploits visual storytelling. | Redesign as a **pipeline diagram** rather than a decision tree: start → Graph Filter → Vector Ranking → Combine → Output. Include a side‑note box that explains “Hybrid = filter + rank”. |

---

### 5. Recommended Revisions (Prioritized)  

1. **Re‑structure the development narrative**  
   - Insert a *conflict* paragraph: “Pure graph queries return exact facts but miss relevance; pure vector search returns relevance but can hallucinate facts.”  
   - Follow with a *resolution* paragraph describing the hybrid pipeline as the *solution*.  
   - End with a *limit* paragraph (e.g., ontology bias, maintenance cost).  

2. **Enrich the technical example** (≈ 300 words)  
   - Load a tiny citation graph (5‑6 nodes).  
   - Show how to compute embeddings for each paper (e.g., using a pre‑trained sentence‑transformer).  
   - Walk through the three pipeline steps, printing the subgraph and similarity scores.  
   - Provide a “What‑if” variant where the graph is missing an edge, illustrating the need for fallback to vector similarity.  

3. **Deepen the philosophical reflection** (≈ 250 words)  
   - Add a concrete bias case (e.g., under‑representation of women in citation graphs).  
   - Pose an ethical question: “If the ontology excludes certain relations, what knowledge is invisible to the agent?”  
   - Link back to design choices (who curates the KG, how updates happen).  

4. **Add interactive checkpoints** (2‑3 minutes each)  
   - After “When Symbolic Retrieval Is Needed”: *Think‑pair‑share*: “Give an example where an exact fact is crucial.”  
   - After hybrid pipeline description: *Mini‑quiz*: “Which step would you modify to improve recall?”  

5. **Revise the PlantUML diagram**  
   ```plantuml
   @startuml
   start
   :User Query;
   if (Mode?) then (graph‑only)
     :Graph Filter;
     :Return Structured Results;
   elseif (vector‑only)
     :Vector Retrieval;
     :Return Similar Chunks;
   else (hybrid)
     :Graph Filter;
     note right: produces subgraph S
     :Vector Ranking;
     note right: uses query embedding + embeddings of S
     :Combine Results;
   endif
   stop
   @enduml
   ```  
   - Add notes, label arrows, and optionally a loop back for “refine filter”.  

6. **Expand word count to target**  
   - By adding the above sections, the lecture will reach ~2 800‑3 200 words, fitting the 90‑minute slot comfortably.  

7. **Update the “Key Points” lists**  
   - Ensure each list contains 6‑8 bullet points (as per density guidelines) and mirrors the narrative flow (problem → solution → implication).  

---

### Closing Note  

With the suggested narrative tightening, richer examples, deeper ethical discussion, and a more informative diagram, Lecture 7.4 will comfortably fill a 90‑minute class, keep students engaged, and provide ample material for discussion and lab preparation. The core content is already strong; the revisions mainly add **storytelling depth** and **interactive scaffolding**.