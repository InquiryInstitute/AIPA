# Review: 3.3: Informed Search — A* and Heuristics

**Source:** part-i/ch03-search-and-planning/lecture-03.adoc

---

## Review of Lecture 3.3 – *Informed Search: A* and Heuristics*  

**Grade: B‑**  

*Why*: The lecture covers the essential material and meets the word‑count target, but the narrative arc is weak (starts with a definition‑heavy “Conceptual Core” and only a thin hook). The pacing feels uneven – the “Conceptual Core” is dense with formalism, while the “Technical Example” and “Philosophical Reflection” are under‑developed for a 90‑minute session. The PlantUML diagram is useful but could be tighter and more explicitly tied to the story.

---

### 1. Narrative Arc  

| Element | Assessment | Verdict |
|---------|------------|---------|
| **Hook** | The opening epigraph is nice, but there is no concrete scenario or tension that grabs students’ imagination. The “Why does a naïve search struggle here?” question is the only hook, and it is buried under a list of prompts. | **Insufficient** – needs a vivid, problem‑driven opening. |
| **Development** | The lecture moves from a formal definition → description of greedy best‑first → A* → admissibility/consistency → heuristic design. The logical flow is correct, but the transition is abrupt; each sub‑section is presented as a list of facts rather than a story of a problem being solved. | **Adequate** – stepwise but lacks narrative momentum. |
| **Closing / Bridge** | The “Take‑away” points hint at the next chapter (planning), but the closing does not explicitly tie the current material to the upcoming lab or to a larger question (“What happens when our bet fails?”). | **Weak** – needs a stronger forward‑looking hook. |

**Overall Verdict**: The lecture has a *bare‑bones* narrative arc. It would benefit from a concrete, relatable scenario (e.g., “Finding the fastest route for an autonomous delivery robot in a city grid”) that is introduced at the start, revisited during the technical example, and reflected upon in the philosophical section.  

---

### 2. Density (Target ≈ 2,500‑3,500 words)

| Section | Approx. Paragraphs | Key‑point Count | Target Range | Verdict |
|---------|-------------------|----------------|--------------|---------|
| **Conceptual Core** | 5 (definition, greedy, A*, admissibility, design) | 7 | 4‑6 para, 6‑12 KP | **On‑track** (slightly heavy on formalism). |
| **Technical Example** | 3 (grid world, inadmissible heuristic, search‑engine analogy) | 8 | 2‑3 para, 5‑8 KP | **On‑track** (good length, but could add a step‑by‑step walk‑through of the algorithm). |
| **Philosophical Reflection** | 4 (prior, trade‑off, Bayesian analogy, ethics, extensions) | 8 | 2‑3 para, 5‑8 KP | **Slightly long** – one paragraph could be merged; risk of “lecture‑style essay” rather than interactive discussion. |

Overall word count is within the target, but the *distribution* is uneven: the Conceptual Core dominates the first half, leaving little “room to breathe” for the example and reflection.  

---

### 3. Interest (Engagement)

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dump** in Conceptual Core | Students see a formal definition before any concrete problem, which can feel abstract. | Start with a *story*: “Imagine a robot that must deliver a package in a city. It knows the map but not the traffic. How does it decide which streets to take?” Then introduce the heuristic as the robot’s “guess”. |
| **Thin technical example** | Only mentions “Manhattan vs. Euclidean vs. doubled Manhattan” without showing actual node‑expansion counts or visualizing the search frontier. | Include a small step‑by‑step table (or animated diagram) that shows the frontier after each expansion for each heuristic. |
| **Philosophical reflection** feels like a list of bullet‑point ideas rather than a discussion. | Risks losing students’ focus after 45 min of technical content. | Pose a *debate*: “Should we ever accept an inadmissible heuristic? What are the real‑world costs?” Let students argue in pairs, then reconvene. |
| **Lack of forward tension** | The “Take‑away” merely says “later we’ll see planning”. | End with a provocative question: “If we could guarantee optimality, why would we ever need heuristics at all?” – sets up the next lecture on *planning under constraints*. |

---

### 4. Diagram Review (PlantUML)

**Diagram 1 – “A* expansion with f‑values”**

| Aspect | Current state | Recommendation |
|--------|---------------|----------------|
| **Relevance** | Shows a tiny tree (Start → A/B/C → Goal) with f‑values, illustrating that the node with lowest f is selected first. Good for visualizing the *selection* rule. | Keep, but add a *counter* of node expansions to make the trade‑off clearer (e.g., annotate how many nodes each heuristic would expand). |
| **Clarity of labels** | Nodes display `g`, `h`, `f` but the meaning of the numbers is not explained in the caption. | Add a legend or a caption: “Numbers are cumulative cost `g`, heuristic estimate `h`, and total `f = g+h`”. |
| **Feedback loop / arrows** | Only forward arrows; no indication of *re‑opening* a node when a better path is found (important for A*). | Add a dashed back‑arrow from `Goal` to `A` (or a note) showing that if a cheaper path to `A` were discovered, the frontier would be updated. |
| **Stylistic consistency** | Uses “sketchy‑outline” theme, which is fine, but node colors are similar to background, reducing contrast. | Darken node border or use a contrasting fill (e.g., light gray) to improve readability on printed slides. |
| **Scale** | `scale 1.5` makes the diagram large enough, but the text inside nodes is cramped. | Increase node width or split the label into two lines (`g=2\nh=3\nf=5`). |

---

## Recommended Revisions (Prioritized)

1. **Add a concrete hook (5‑minute opening).**  
   - Begin with a short narrative (e.g., autonomous delivery robot, game‑AI pathfinding, or puzzle‑solving).  
   - Pose a tension‑raising question: “Can we guarantee the robot always takes the fastest route without exploring every street?”  

2. **Re‑order the Conceptual Core.**  
   - After the hook, present *intuition* of a heuristic before the formal definition.  
   - Use a simple visual (e.g., a grid with a “guess” arrow) to illustrate “estimate of remaining cost”.  

3. **Enrich the Technical Example.**  
   - Provide a step‑by‑step table of frontier contents for each heuristic (Manhattan, Euclidean, doubled Manhattan).  
   - Show node‑expansion counts and final path cost side‑by‑side.  
   - Optionally embed a short animation or a “live coding” snippet.  

4. **Turn the Philosophical Reflection into an interactive segment.**  
   - Pose two debate prompts (inadmissible heuristic acceptability; ethical bias).  
   - Allocate 10 min for pair discussion, then reconvene for a brief summary.  

5. **Strengthen the closing bridge.**  
   - End with a provocative forward‑looking question linking A* to planning: “If we can guarantee optimality with A*, why do planners still need heuristics?”  
   - Preview the next lecture’s focus on *admissible planning* and *heuristic search in high‑dimensional spaces*.  

6. **Revise Diagram 1.**  
   - Add a legend/caption explaining `g`, `h`, `f`.  
   - Include a dashed back‑arrow (or note) to illustrate node re‑opening.  
   - Adjust node colors for contrast and split labels for readability.  

7. **Trim the Philosophical Reflection to 3 paragraphs.**  
   - Merge “ethical implications” with “bias” into a single paragraph.  
   - Keep the Bayesian analogy and the stochastic extension as separate, concise points.  

8. **Balance key‑point density.**  
   - Reduce the “Key Points” list in the Conceptual Core to 5 items (focus on the most essential).  
   - Ensure each subsequent section’s key‑point list aligns (5‑7 items).  

9. **Add a short “What‑if” scenario in the Discussion Prompts.**  
   - Example: “What happens if the heuristic is perfect? What if it is completely wrong?” – encourages students to think about extremes.  

10. **Proofread for consistency of terminology.**  
    - Use either “admissible” or “guardrail” consistently; avoid mixing informal metaphors with formal language in the same paragraph.  

---

**Final Note:** With the above revisions, Lecture 3.3 will transition from a dense, definition‑heavy exposition to a story‑driven, interactive session that sustains student attention for a full 90‑minute class while still delivering the required technical depth.