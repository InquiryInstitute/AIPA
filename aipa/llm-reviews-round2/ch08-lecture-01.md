# Review: 8.1: Propositional Logic — Syntax and Semantics

**Source:** part-iii/ch08-reasoning-and-inference/lecture-01.adoc

---

## Review of Lecture 8.1 – *Propositional Logic: Syntax and Semantics*  

**Grade: B‑**  

The lecture covers the essential material, but the narrative is thin, the “definition‑first” style dominates the first half, and the word‑count falls well short of the 2 500‑3 500 word target for a 90‑minute session. The hook is weak, the development is a list of facts, and the closing only hints at the next lecture without a compelling bridge to a lab or real‑world problem. The PlantUML figure is useful but could be made far more pedagogically expressive.

---

### 1. Narrative Arc  

| Element | What the lecture does | Verdict |
|---------|----------------------|---------|
| **Hook** | Starts with an epigraph and a one‑sentence tagline (“the simplest formal language for reasoning”). No concrete scenario, question, or tension. | **Insufficient** – needs a vivid problem that forces students to ask “why do we need propositional logic?” |
| **Development** | Defines entailment, syntax, semantics, CNF, resolution, model‑counting in a series of bullet‑style definitions. The technical example is a straightforward resolution walk‑through. | **Weak** – the flow is “definition → definition → definition” rather than a problem‑solution‑limit progression. |
| **Closing** | Briefly says “next lecture we will lift to first‑order logic.” No explicit link to the lab, no “so‑what” for agents. | **Minimal** – should close by showing how the norm just established will be used in Lab 1 or in a concrete agent task. |

**Overall narrative verdict:** The lecture lacks a clear arc. It needs a *hook* that presents a concrete reasoning failure (e.g., a robot that cannot decide whether to open a door), a *development* that shows how propositional logic solves the failure, and a *closing* that ties the solution to the upcoming lab and to the broader AI agenda.

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. paragraphs | Key‑point bullets | Word‑count estimate |
|---------|-------------------|-------------------|---------------------|
| Conceptual Core | 4 (intro + definition + syntax/semantics + truth‑table) | 8 | ~650 |
| Technical Example | 4 (setup, CNF, resolution pseudo‑code, result) | 7 | ~550 |
| Philosophical Reflection | 3 | 7 | ~500 |
| **Total** | **≈ 11** | **≈ 22** | **≈ 1 700** |

The lecture is **~1 700 words**, well below the 90‑minute target. To fill the time, we need:

* Additional worked examples (e.g., a SAT‑encoding of a simple puzzle).  
* A short “interactive demo” script (students trace a truth‑table or run a resolution step).  
* A deeper discussion of **model counting** (why it matters for planning/diagnosis).  
* A brief comparison with **other logics** (modal, probabilistic) to highlight limits.

---

### 3. Interest  

| Issue | Why it hurts engagement | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dump** (formal definition of entailment appears before any motivating story). | Students don’t see the relevance until later. | Open with a *real‑world dilemma*: “A delivery robot must decide whether a hallway is blocked. Its knowledge base says ‘If the sensor reads red then the hallway is blocked.’ How can the robot prove the hallway is safe?” |
| **Sparse narrative flow** – bullet points dominate. | Hard to maintain attention for 90 min. | Turn bullet lists into **mini‑stories**: each key point illustrated by a short scenario (e.g., “Validity = ‘the alarm never fires’”). |
| **Technical example too short** – only one tiny KB. | No sense of scaling or difficulty. | Add a second example that *fails* (show a KB that does **not** entail the goal) and let students predict the outcome before running resolution. |
| **Philosophical reflection** is a block of abstract prose. | Risks losing students who prefer concrete material. | Interleave reflective questions after each paragraph (e.g., “If logic is a norm, whose norm?”) and ask students to discuss in pairs. |
| **No active lab hook** – Lab 1 mentioned only at the end. | Students may not see the purpose of the lab. | Insert a **“lab preview”**: show a screenshot of a SAT solver UI, ask “What would happen if we added one more clause?” |

---

### 4. Diagram Review (PlantUML)

**Current diagram** – a syntax tree for the formula *(P ∧ Q) → R*.

| Issue | Comment | Concrete improvement |
|-------|---------|----------------------|
| **Labeling** – nodes are just “→”, “∧”, “P”, “Q”, “R”. No indication that this is a *parse tree* or that the leaves are *atoms*. | Students may not connect the picture to the definition of well‑formed formulas. | Add a caption inside the diagram: `node "→" as impl <<operator>>`. Use `skinparam` to style leaf nodes differently (e.g., `fontColor #006600`). |
| **Missing directionality** – the tree is drawn left‑to‑right, which can be confusing for a hierarchical syntax tree. | The visual hierarchy is not obvious. | Use `direction top-down` and place the root at the top, children below. |
| **No illustration of semantics** – the diagram only shows syntax, but the lecture also stresses truth‑tables. | Missed opportunity to link syntax and semantics. | Add a second small box next to the tree showing the truth‑table for the same formula, with arrows labeled “evaluate”. |
| **No feedback loop** – resolution and model‑counting are later topics; the diagram could hint at how the tree feeds into CNF conversion. | The figure feels isolated. | Add a dashed arrow from the tree to a “CNF” node, labeled “→ transform”. |
| **Stylistic** – theme `sketchy-outline` is fine, but colors are low‑contrast for printed handouts. | May be hard to read on a projector. | Use a higher‑contrast palette (`#FFFFFF` background, dark node borders) or provide a separate high‑contrast version. |

**Revised PlantUML sketch (suggested):**

```plantuml
@startuml
skinparam backgroundColor #FFFFFF
skinparam node {
  BackgroundColor #E8F5E9
  BorderColor #2E7D32
}
' top‑down syntax tree
direction top-down
node "→" as impl <<operator>> {
  node "∧" as and <<operator>> {
    node "P" as p <<atom>>
    node "Q" as q <<atom>>
  }
  node "R" as r <<atom>>
}
' semantic side
node "Truth Table" as tt {
  note right: (P ∧ Q) → R\nT T T → T\nT T F → F\n… (8 rows)
}
impl -[#gray,dashed]-> tt : evaluate

@enduml
```

---

### 5. Recommended Revisions (prioritized)

1. **Create a compelling hook** (first 5‑7 min).  
   *Start with a concrete agent problem (e.g., robot navigation) that fails without a formal reasoning norm.* Pose the question: “How can the robot be sure its conclusion is correct?”

2. **Restructure the Conceptual Core** into a **problem → formalism → mechanical test** narrative.  
   - Present a small KB, ask “Does this entail X?”  
   - Introduce entailment *as the answer* to that question, then give the formal definition.

3. **Expand the technical section**:  
   - Add a **second example** where resolution fails (showing incompleteness of a naïve search).  
   - Include a **hands‑on truth‑table activity** (students fill a table for a given formula).  
   - Provide a **mini‑demo** of a SAT solver (e.g., MiniSat command line) with screenshots.

4. **Lengthen the philosophical reflection** by interleaving **discussion prompts** after each paragraph and by linking the norm to **real‑world AI safety** (e.g., why guarantees matter for autonomous systems).

5. **Integrate the lab preview** early (after the first example). Show a **pipeline diagram**: KB → CNF → SAT/Resolution → Query answer. Mention Lab 1 explicitly and give a concrete deliverable (e.g., “Your task: encode the ‘lights‑out’ puzzle in propositional logic”).

6. **Revise the PlantUML diagram** as per the suggestions above, and add a **second diagram** that visualizes the CNF conversion or the resolution process (clauses as sets, resolvent arrow).

7. **Check word count** – aim for ~2 800 words. Add ~600 words by:
   - Elaborating on model counting (include a tiny example with 2 ³ = 8 models vs. 1 model).  
   - Briefly comparing propositional logic to **Horn clauses** and **SAT‑solvers**.  
   - Adding a short “historical note” on why material implication was chosen.

8. **Polish key‑point sections**: keep them, but ensure each bullet is tied to a narrative moment (e.g., “*Validity* – the alarm never fires, no matter the sensor reading”).

9. **Add transition sentences** between sections (e.g., “Having seen how we can mechanically test entailment, let us now look at a concrete resolution proof…”).

10. **Proofread for consistency** (use the same notation for entailment `⊨`, for CNF `∧` vs. `∧` etc.) and ensure all citations are properly linked.

---

#### Quick “Hook” Draft (to replace the epigraph)

> **Imagine a delivery robot that must decide whether a hallway is blocked.**  
> Its knowledge base contains the rules  
> 1. *If the red sensor flashes, the hallway is blocked.*  
> 2. *If the hallway is blocked, the robot must turn back.*  
> The robot’s current sensor reading is **red**.  
> **Can the robot *prove* that it must turn back?**  
> The answer hinges on a *norm* that tells us when a conclusion *logically follows* from the premises – that norm is **propositional logic**.

Insert this at the very start, and the rest of the lecture can be framed as “how we give the robot that norm, how we test it, and what its limits are.”  

---  

By implementing the above changes, Lecture 8.1 will become a **cohesive, engaging, and appropriately sized** session that prepares students for Lab 1 and for the deeper logical formalisms that follow.