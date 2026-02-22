# Review: 3.1: Problem Spaces and State Representation

**Source:** part-i/ch03-search-and-planning/lecture-01.adoc

---

## Review of Lecture 3.1 – *Problem Spaces and State Representation*  

**Grade: B‑** – The lecture contains the essential material and a nice philosophical hook, but the narrative flow is uneven, the word‑count falls short of the 90‑minute target, and the sole diagram is under‑explained. With modest restructuring and added “tension” moments the lecture can comfortably fill a 90‑minute session and keep students engaged.

---

### 1. Narrative Arc  

| Element | What the draft does | Verdict |
|---------|--------------------|---------|
| **Hook** | Starts with a vivid maze‑scenario and a Derrida epigraph. | **Good** – concrete, puzzling situation that raises a question (“Can you find a way out with a map that deliberately omits the very obstacle you must avoid?”). |
| **Development** | Moves to a formal definition, then to examples (8‑puzzle, navigation), then to a philosophical reflection. | **Mixed** – the transition from formal definition to examples is abrupt; the philosophical paragraph feels tacked on after the technical material rather than woven throughout. |
| **Closing / Bridge** | Ends with discussion prompts, lab prep, and a reading list. | **Weak** – the “bridge” to the lab is present, but there is no explicit “so what now?” statement that ties the philosophical stakes back to the upcoming lab or to the next lecture (e.g., “next we will see how representation choices affect algorithmic performance”). |

**Overall narrative verdict:** The lecture has a strong opening but lacks a clear through‑line that shows *why* representation matters *right now* and *what* the student will be able to do after the session. The philosophical reflection should be introduced earlier as a “why‑care” question, not as a separate after‑thought.

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. paragraph count | Approx. key‑point count | Word‑count estimate* |
|---------|------------------------|------------------------|----------------------|
| Conceptual Core | 4 | 8 | ~650 |
| Technical Example | 3 | 7 | ~550 |
| Philosophical Reflection | 2 | 7 | ~500 |
| **Total (main sections)** | **9** | **22** | **~1 700** |

\*Rough estimate based on typical 150‑word paragraphs.  

**Result:** The lecture is **~1 200 words short** of the 90‑minute density target. At a normal lecture pace (≈ 130‑150 wpm) you would need ~2 500‑3 000 words to fill 90 minutes with time for questions and the lab preview.

**What is missing?**  
* A **worked‑through search trace** (e.g., BFS on the 8‑puzzle) showing how the representation drives the algorithm step‑by‑step.  
* A **comparative case study** where two different state representations of the same domain lead to dramatically different search outcomes (e.g., grid vs. continuous coordinates for robot navigation).  
* A **short “failure story”** (real‑world example: autonomous vehicle planning that ignored road‑surface friction) to illustrate the stakes.

---

### 3. Interest & Engagement  

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dump** – the formal tuple appears before any intuition. | Students may tune out before seeing the concrete relevance. | Introduce the tuple *after* the maze story, using the story’s “walls‑only map” as a concrete instance of (S, s₀, G, A, succ). |
| **Philosophical reflection isolated** – appears after the technical example, breaking momentum. | The shift from code‑like description to literary musings feels jarring. | Interleave a “Why does abstraction matter?” question right after the formal definition, then give the 8‑puzzle example, then return to the philosophical lens. |
| **Sparse visualisation** – only one tiny graph, no labels for actions, no indication of “search frontier”. | The diagram does not reinforce the algorithmic process. | Add a second diagram showing a BFS frontier expanding from s₀, with explored vs. frontier nodes highlighted. |
| **No explicit “big picture”** – students may not see how this ties to later planning, reinforcement learning, etc. | Lack of forward‑looking hook reduces retention. | End the lecture with a 2‑sentence teaser: “Next we will see how the same state space can be searched with uninformed vs. informed strategies, and how the choice of representation can make or break optimality.” |

---

### 4. Diagram Review (PlantUML block)

**Current diagram** – a minimal four‑node graph (s₀ → S₁ / S₂ → G) with a note about “only tile positions”.  

| Strength | Weakness | Concrete improvement |
|----------|----------|----------------------|
| Sketchy style matches the “post‑modern” aesthetic. | No indication of *actions* on edges (labels are generic “move‑up”, “move‑right” but not tied to the 8‑puzzle). | Label edges with the *actual* actions (e.g., “slide tile 1 left”). |
| Shows start and goal nodes. | No visual cue of *search* (frontier, visited set). | Add a different colour or dashed outline around nodes that would be *expanded* first in BFS. |
| Note only appears on S₁. | No legend; students may not know what the note refers to. | Move the note to a caption below the diagram, or add a legend box explaining “State = tile positions only”. |
| No scale – the graph looks too small to discuss. | The diagram is too abstract to support the “maze” hook. | Provide a second diagram: a 3×3 grid of tiles with one empty cell, and arrows showing the same transitions. This grounds the abstract graph in the concrete puzzle. |

**Revised PlantUML suggestion (sketchy outline retained):**

```plantuml
@startuml
skinparam backgroundColor transparent
skinparam handwritten true

node "s₀\n(start)" as Start #LightGreen
node "S₁\n(tile‑swap)" as S1
node "S2\n(tile‑swap)" as S2
node "G\n(goal)" as Goal #LightBlue

Start --> S1 : slide 1↓
Start --> S2 : slide 2→
S1 --> Goal : slide 3↓
S2 --> Goal : slide 4→

' frontier illustration
node "Frontier" as F #Yellow
F -[dashed]-> S1
F -[dashed]-> S2

note bottom of diagram
  State = tuple of tile positions (0 = empty)
  Edges = legal moves of the empty tile
endnote
@enduml
```

---

### 5. Recommended Revisions (prioritized)

1. **Restructure the narrative**  
   - Open with the maze scenario → ask “What must we *represent* to search?” → introduce the formal tuple *after* this question.  
   - Immediately follow with the 8‑puzzle as a concrete instantiation of the tuple.  
   - Insert a short “search trace” (BFS or A*) that walks through the graph, showing how the representation drives the algorithm.  
   - Return to the philosophical question (“What did we leave out?”) *before* the formal definition, so the definition feels like a tool rather than a wall.

2. **Add ~1 200 words**  
   - **Search trace** (≈ 300 words, 2‑3 paragraphs, 5‑6 key points).  
   - **Comparative representation case study** (≈ 400 words, 2 paragraphs, 6‑7 key points).  
   - **Failure story** (≈ 200 words, 1 paragraph, 4‑5 key points).  
   - **Forward‑looking teaser** (≈ 100 words, 1 paragraph, 2‑3 key points).  

3. **Enrich the technical example**  
   - Show pseudo‑code for `succ(state, action)` and a small table of a few successor states.  
   - Highlight the need for *hashing* and *duplicate detection* with a concrete example (e.g., revisiting a previously seen tile configuration).  

4. **Integrate philosophy throughout**  
   - After each technical sub‑section, pose a reflective question (“What does this abstraction ignore?”).  
   - Replace the stand‑alone “Philosophical Reflection” heading with “Why representation matters: philosophical & ethical lenses”.  

5. **Upgrade visual assets**  
   - Replace the single minimal graph with two diagrams (the abstract graph and the concrete 8‑puzzle grid).  
   - Add colour/legend to indicate start, goal, frontier, and explored nodes.  
   - Ensure each diagram is referenced in the text (“see Figure 3.1a”) and used to illustrate a point.  

6. **Polish discussion prompts**  
   - Convert each bullet into a *question* that directly ties to a preceding concept (e.g., “Given our 8‑puzzle representation, what would happen if we also stored the number of moves made so far?”).  
   - Limit to 4‑5 high‑impact prompts to keep the class discussion focused.  

7. **Lab connection**  
   - Add a short “What you will do in Lab 1” paragraph that explicitly maps the lecture’s key points to the lab deliverables (e.g., “You will implement `succ` for both a grid world and a continuous world; compare the size of the explored frontier”).  

---

#### Quick “90‑minute” pacing outline (after revisions)

| Time | Activity |
|------|----------|
| 0‑5 min | Hook: maze scenario + Derrida quote |
| 5‑15 min | informal walk‑through of state‑space tuple using the maze |
| 15‑30 min | 8‑puzzle concrete example + pseudo‑code for `succ` |
| 30‑45 min | Live search trace (BFS) on the 8‑puzzle graph (whiteboard) |
| 45‑55 min | Comparative representation case study (grid vs. continuous) |
| 55‑65 min | Philosophical/ethical interlude (abstraction choices) |
| 65‑75 min | Failure story & discussion prompts |
| 75‑85 min | Lab preview & forward‑looking teaser for next lecture |
| 85‑90 min | Q&A / wrap‑up |

With the above edits the lecture will meet the 90‑minute word‑count, maintain a clear narrative arc, and keep students actively engaged throughout.