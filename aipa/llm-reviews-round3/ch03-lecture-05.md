# Review: pddl
(:action pick-up
 :parameters (?x)
 :precondition (and (clear ?x) (on-table ?x) (hand-empty))
 :effect (and (not (on-table ?x)) (not (hand-empty))
              (holding ?x) (not (clear ?x))))

**Source:** part-i/ch03-search-and-planning/lecture-05.adoc

---

## Review of Lecture **“pddl”**  

**Grade: D** – The material as submitted is far too thin for a 90‑minute session. It consists of a single PDDL action definition with no surrounding narrative, no pedagogical scaffolding, and no visual aids. Consequently it fails on every evaluation criterion (hook, development, closing, density, engagement, diagram relevance).

---

### 1. Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | The lecture opens with a raw syntax dump. There is no concrete scenario (e.g., a robot arm picking up blocks), no provocative question (“How does a planner know which block to lift first?”), and no tension. |
| **Development** | ❌ Missing | No step‑by‑step unpacking of the action’s components (parameters, preconditions, effects). No discussion of how this action fits into a larger planning problem, how it interacts with other actions, or how a planner searches for a sequence. |
| **Closing / Bridge** | ❌ Missing | No summary, no implication for the upcoming lab (e.g., implementing a planner), and no segue to the next lecture (e.g., STRIPS, heuristics). |

**Overall Narrative Verdict:** *Fail* – The lecture lacks any story line.

---

### 2. Density (Target: 2,500‑3,500 words, 4‑6 paragraphs, 6‑12 key points)

| Section | Current | Target | Gap |
|---------|---------|--------|-----|
| Conceptual Core | 0 paragraphs, 0 key points | 4‑6 paragraphs, 6‑12 points | **Complete absence** |
| Technical Example | 0 paragraphs, 0 key points | 2‑3 paragraphs, 5‑8 points | **Complete absence** |
| Philosophical Reflection | 0 paragraphs, 0 key points | 2‑3 paragraphs, 5‑8 points | **Complete absence** |

**Word count:** ~30 words (the PDDL snippet).  

**Overall Density Verdict:** *Fail* – The lecture is orders of magnitude below the required length and structure.

---

### 3. Interest  

- **Engagement:** A raw code block does not sustain attention for more than a minute.  
- **Thin/Vague Sections:** Every section is missing.  
- **Definition‑first dump:** The snippet is presented without any explanation, violating the “no definition‑first” rule.  

**What would keep students interested?**  
1. **Concrete scenario** (e.g., a robot arm in a kitchen).  
2. **Interactive question** (“If the hand is already holding a cup, can we pick up another?”).  
3. **Live demonstration** of a planner solving a block‑world problem, showing the role of `pick-up`.  
4. **Progressive reveal**: start with an informal description, then map each informal clause to the formal PDDL syntax.  
5. **Reflection** on the limits of STRIPS‑style actions (no conditional effects, no duration) and how modern planners extend PDDL.

---

### 4. Diagram Review  

- **No PlantUML blocks** are present.  
- **Opportunity:** A small state‑transition diagram (or a “planning graph” fragment) would illustrate the effect of `pick-up` on world state, reinforcing the precondition/effect semantics.

---

## Recommended Revisions (Prioritized)

1. **Add a strong hook (1‑2 paragraphs).**  
   - Begin with a vivid story: *“Imagine a kitchen robot that must clear the countertop before it can place a new dish. The first thing it must do is pick up the mug that’s in the way…”*  
   - Pose a question: *“How does the robot decide which object to grasp first?”*

2. **Introduce PDDL conceptually before the syntax.**  
   - Explain the purpose of a planning domain, the STRIPS heritage, and the role of actions.  
   - Provide a high‑level diagram of a planning problem (initial state → actions → goal).

3. **Decompose the `pick-up` action (4‑5 paragraphs).**  
   - **Parameters:** what `?x` stands for, type constraints, examples.  
   - **Preconditions:** explain each predicate (`clear`, `on-table`, `hand-empty`) with concrete world pictures.  
   - **Effects:** walk through each `not` and positive literal, showing the state change.  
   - **Key Points (6‑8):** e.g., “Preconditions must all hold simultaneously”, “Effects are applied atomically”, “The action is reversible only via a `put-down` action”.

4. **Provide a worked‑out planning example (2‑3 paragraphs).**  
   - Show a small initial state (three blocks on the table) and a goal (stack B on A).  
   - Step through the planner’s search tree, highlighting where `pick-up` is selected.  
   - Include a **PlantUML** state‑transition diagram that visualises the before/after of `pick-up`.

5. **Add a philosophical/reflective segment (2‑3 paragraphs).**  
   - Discuss the limits of this STRIPS‑style action (no conditional effects, no temporal constraints).  
   - Connect to modern extensions of PDDL (e.g., `:durative-action`, `:conditional-effect`).  
   - Pose a forward‑looking question for the next lecture: *“How can we model actions that take time or have probabilistic outcomes?”*

6. **Insert at least two diagrams.**  
   - **Diagram 1:** “World before vs. after `pick-up`” – show objects, hand status, and clear predicates.  
   - **Diagram 2:** Simple planning graph fragment illustrating the action’s place in a plan.  
   - Use PlantUML with clear labels, arrows, and a feedback loop (e.g., `hand-empty → holding → hand-empty` after a `put-down`).

7. **Close with a bridge to the lab.**  
   - Outline the upcoming hands‑on activity: writing a PDDL domain file for a block‑world, running a planner, and interpreting the plan.  
   - Provide a “take‑away” bullet list (3‑4 points) summarising what students should be able to do after the lecture.

8. **Expand word count to 2,800‑3,200 words.**  
   - Aim for ~5 paragraphs in the Conceptual Core, ~2–3 in the Technical Example, and ~2 in the Philosophical Reflection.  
   - Ensure each paragraph contains 3–4 sentences, each with a clear idea.

---

### Quick Checklist for the Author

- [ ] Hook paragraph with concrete scenario or provocative question.  
- [ ] Narrative flow: problem → action definition → example → limitation → bridge.  
- [ ] Minimum 4–6 paragraphs in the core, 2–3 in the example, 2 in reflection.  
- [ ] At least 6 key points in the core, 5 in the example, 5 in the reflection.  
- [ ] Two PlantUML diagrams with labels (`?x`, `hand-empty`, `clear`, etc.) and arrows showing state change.  
- [ ] Word count between 2,500‑3,500.  
- [ ] Closing slide that previews the next lecture (e.g., heuristics, temporal planning).  

Implementing these revisions will transform the lecture from a bare code dump into a compelling, 90‑minute learning experience that aligns with the AIPA textbook’s pedagogical standards.