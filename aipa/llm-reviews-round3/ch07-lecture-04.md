# Review: 7.4: Symbolic Memory — Graphs and Knowledge Bases

**Source:** part-iii/ch07-memory-systems/lecture-04.adoc

---

# Review of Lecture 7.4 – “Symbolic Memory — Graphs and Knowledge Bases”

**Grade: B‑**  
The lecture has a solid hook, a clear step‑wise development, and the required three‑part structure.  It meets the length targets, but the narrative loses momentum in a few places (excessive bullet‑point dumping, a slightly thin philosophical section, and a diagram that could better illustrate the hybrid pipeline).  With modest tightening and a few engagement‑boosting tweaks the lecture will comfortably fill a 90‑minute session and keep students attentive.

---

## 1. Narrative Arc  

| Element | Evaluation | Comments |
|---------|------------|----------|
| **Hook** | ✅ Strong | Starts with a concrete, high‑stakes query (“What papers cite X …?”) that immediately creates tension between exactness and relevance. |
| **Development** | ✅ Good overall flow, but a bit fragmented | The conflict → “when symbolic” → “when vector” → “hybrid” → “limits” progression is logical.  However the “When Symbolic Retrieval Is Needed” and “When Vector Retrieval Is Needed” sections are essentially parallel lists; they could be merged into a single “Choosing the Right Modality” paragraph that juxtaposes the two, preserving the tension. |
| **Closing** | ✅ Clear bridge | The synthesis nicely points to the next lecture (“Planning with Symbolic Knowledge”).  Adding a provocative question (“What if the graph itself could be *planned*?”) would heighten the forward‑looking hook. |
| **Verdict** | **Mostly effective** | The arc is present, but the narrative could be tightened to avoid “definition‑first” bullet dumps and to keep a single, forward‑moving storyline. |

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. Paragraphs | Key‑point items | Meets target? |
|---------|-------------------|----------------|---------------|
| Conceptual Core | 5 (Conflict, Symbolic, Vector, Hybrid, Limits) | 8 | ✅ |
| Technical Example | 3 (intro, code block, step‑by‑step explanation) | 8 | ✅ |
| Philosophical Reflection | 4 (intro, epistemic ontology, ethical implications, design choice) | 8 | ✅ (a little long; could be trimmed to 3 paragraphs) |

Overall word count is comfortably within the 2 500‑3 500 range (≈ 2 900 w).  No section is under‑populated, but the philosophical part could be sharpened to avoid redundancy.

---

## 3. Interest & Engagement  

| Strength | Weakness | Suggested Boost |
|----------|----------|-----------------|
| Real‑world query hook; interactive **Pause‑and‑Reflect** and **Think‑Pair‑Share** prompts. | Several sections are heavy on bullet lists (“Key actions”, “Key points”) which can feel like a definition dump. | Replace some bullet lists with short narrative anecdotes (e.g., a story of a researcher missing a crucial citation because the graph was stale, then rescued by vector similarity). |
| Concrete Python demo with a toy graph. | The code block is dense; students may lose the “big picture” while reading it. | Add a **live‑coding** or **screen‑capture** suggestion for the lab, and precede the block with a one‑sentence “What we will see” overview. |
| Ethical discussion is timely. | The philosophical reflection is split into many short paragraphs, diluting impact. | Collapse into a **single “Why it matters”** paragraph that weaves epistemic bias, accountability, and design choice together, then end with a provocative question. |
| Closing synthesis points forward. | No explicit “what you’ll do next” activity in‑lecture (only lab prep). | Insert a **quick think‑pair‑share**: “Sketch a hybrid pipeline for a non‑academic domain (e.g., medical diagnosis). Which step would you tweak first?” – this keeps the class active for the full 90 min. |

---

## 4. Diagram Review (PlantUML)

**Current diagram** – a simple decision‑tree flowchart:

```
User Query → (Mode?) → {graph‑only, vector‑only, hybrid} → actions → stop
```

### Does it reinforce the narrative?
* It mirrors the “graph‑only / vector‑only / hybrid” decision introduced in the core, but it **does not** visualise the *two‑stage* hybrid pipeline (filter → rank → combine) that is the central technical contribution.
* The “Mode?” diamond is vague; students may wonder who or what decides the mode.

### Concrete improvements
1. **Rename the decision node** to “Select Retrieval Mode (user / system)”.  
2. **Add a sub‑flow for the hybrid branch** that explicitly shows:  
   * `Graph Filter → Subgraph S` (label arrow “structural constraint”)  
   * `Vector Ranking (query + embeddings of S)` (label arrow “semantic scoring”)  
   * `Combine Scores (weighted sum)` → `Final Results`.  
3. **Show fallback loop**: from “Graph Filter → empty set” back to “Vector‑only fallback”.  
4. **Include data stores**: a small “KG store” icon feeding the Graph Filter, and a “Vector index” icon feeding the Vector Ranking.  
5. **Add brief annotations** on the arrows (e.g., “produces candidate IDs”, “cosine similarity”).  
6. **Styling** – keep the cerulean theme but use `skinparam ArrowColor DarkBlue` and `skinparam NoteBackgroundLightYellow` for the two notes already present, to make them stand out.

A revised PlantUML sketch (pseudo‑code) could be:

```plantuml
@startuml
skinparam backgroundColor #F9F9F9
actor User
rectangle "KG Store" as KG
rectangle "Vector Index" as V

User -> "Select Retrieval Mode" : query
alt Graph‑only
    KG -> "Graph Filter"
    "Graph Filter" --> User : structured results
else Vector‑only
    V -> "Vector Retrieval"
    "Vector Retrieval" --> User : similar chunks
else Hybrid
    KG -> "Graph Filter"
    "Graph Filter" --> "Subgraph S"
    V -> "Vector Ranking\n(on S)"
    "Vector Ranking" --> "Combine Scores"
    "Combine Scores" --> User : final ranked list
    alt No candidates
        "Graph Filter" --> "Vector Retrieval (fallback)"
    end
end
@enduml
```

---

## 5. Recommended Revisions (Prioritized)

1. **Merge the “When Symbolic” / “When Vector” sections** into a single “Choosing the Right Modality” paragraph that directly contrasts the two, preserving the conflict tension and reducing bullet‑heavy text.
2. **Condense the Philosophical Reflection** to three tightly‑linked paragraphs (why symbols matter, why vectors matter, ethical/ontological stakes) and end with a provocative question that leads into the next lecture.
3. **Enhance the hybrid pipeline diagram** as outlined above – show the two‑stage filter‑rank‑combine flow, the fallback loop, and the data stores.  This visual will become a reference point for the lab.
4. **Add a short “big‑picture preview” before the code block** (1‑2 sentences) and a **live‑coding cue** in the lecture notes so the instructor can keep the class’s focus while the code is displayed.
5. **Insert an in‑lecture active learning moment** after the “Hybrid Retrieval in Practice” paragraph: ask students to sketch a hybrid pipeline for a domain of their choice (e.g., e‑commerce recommendations) and share a couple of examples.
6. **Replace some “Key Points” bullet lists with inline summarising sentences** (e.g., after the limits paragraph, write “Thus, designers must balance ontology coverage, storage cost, and fallback strategies.”).  Keep the explicit “Key Points” box for review, but avoid redundancy.
7. **Clarify the “Mode?” decision** – specify whether the mode is user‑specified, system‑determined, or a hybrid of both.  A one‑sentence note will prevent confusion.
8. **Proofread for consistency** (e.g., “graph‑filter” vs “Graph Filter”, “vector‑only” vs “Vector‑only”) and ensure all acronyms (KG, API) are introduced before first use.

---

### Final Thought

With the above tightening, the lecture will flow as a single, compelling story: **Problem → Symbolic solution → Sub‑symbolic solution → Hybrid synthesis → Ethical stakes → Next step (planning)**.  The revised diagram and interactive prompts will keep students mentally engaged for the full 90 minutes, and the lab preparation will feel like a natural continuation of the narrative.