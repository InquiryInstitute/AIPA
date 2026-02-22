# Review: 3.4: Adversarial Search — Game Trees

**Source:** part-i/ch03-search-and-planning/lecture-04.adoc

---

## Review of Lecture 3.4 – *Adversarial Search — Game Trees*

### Summary
**Grade: B‑**  
The lecture meets the structural requirements for a 90‑minute session (proper paragraph counts, key‑point density, and overall word count). The hook is concrete and the narrative proceeds logically from game‑tree basics to minimax, α‑β pruning, and philosophical implications. However, the **conceptual core leans toward definition‑first exposition**, and the **alpha‑beta section could benefit from a more vivid, tension‑building example**. The PlantUML diagram is functional but under‑annotated, missing the opportunity to visualise the pruning decision. Strengthening the hook‑to‑resolution arc and enriching the diagram will make the material more engaging for a full 90‑minute class.

---

## 1. Narrative Arc  

| Element | Evaluation | Comments |
|---------|------------|----------|
| **Hook** | ✅ Strong | Starts with a vivid “last move in tic‑tac‑toe” scenario that poses a concrete problem (“What single move guarantees at least a draw?”). |
| **Development** | ⚠️ Mixed | The conceptual core introduces concepts in a logical order, but each sub‑section opens with a terse definition (e.g., “Minimax recursion”). The flow would be smoother if each concept were introduced through a short *story* or *question* that builds on the previous one (e.g., “If we could look ahead to the end of the game, how would we decide which move to make?”). |
| **Closing / Bridge** | ✅ Good | The philosophical reflection ends with a forward‑looking statement (“prepares us for those more nuanced interaction models”) and the lab prep points to the next practical activity. |

**Verdict:** The lecture has a clear arc, but the *development* stage needs more narrative tension and less “definition‑first” dumping.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs | Key‑Points | Approx. Words* |
|---------|------------|------------|----------------|
| Conceptual Core | 5 (within 4‑6) | 6 (within 6‑12) | ~1 200 |
| Technical Example | 3 (within 2‑3) | 6 (within 5‑8) | ~900 |
| Philosophical Reflection | 3 (within 2‑3) | 5 (within 5‑8) | ~800 |
| **Total** | 11 | 17 | **≈ 2 900** |

\*Word count is an estimate based on average paragraph length (≈ 120‑150 words). The lecture sits comfortably inside the target range.

---

## 3. Interest (Engagement)

| Issue | Why it may lose attention | Suggested remedy |
|-------|---------------------------|------------------|
| **Definition‑first style** in the “Minimax recursion” and “Alpha‑beta pruning intuition” paragraphs. | Students may feel they are being handed formulas before seeing why they matter. | Start each paragraph with a *question* or *mini‑scenario*: “Suppose we are at a node where it’s our turn—how do we decide which child to pick?” Follow with a brief informal description before the formal recursion. |
| **Sparse concrete examples** for α‑β pruning. | The pruning note (“β ≤ α → prune subtree”) is abstract; learners may not visualise the cut‑off. | Insert a short “live‑coding” style walk‑through: show a depth‑2 tree, list the α and β values as they are updated, and highlight the exact moment the rightmost subtree is discarded. |
| **Limited emotional stakes** beyond the opening tic‑tac‑toe. | After the hook, the lecture settles into a dry exposition. | Sprinkle “what‑if” prompts: “What happens if we prune too aggressively? Could we miss a winning line?” or “How does the horizon effect manifest in a real chess match?” |
| **Lab prep is optional** and may feel disconnected. | Students might wonder why they should invest effort. | Tie the lab to the earlier hook: “Implement the minimax engine that can always force a draw in tic‑tac‑toe – the same problem we posed at the start.” |

---

## 4. Diagram Review (PlantUML – Figure 3.4)

| Aspect | Current state | Suggested improvement |
|--------|---------------|-----------------------|
| **Clarity of α/β values** | Only a note on the root node shows α = ‑∞, β = +∞. | Add inline labels on the edges from the root to each MIN node, e.g., “α = 3 after evaluating left subtree”. |
| **Pruned subtree visualisation** | A generic note “β ≤ α → prune subtree”. | Draw the pruned edges with a **dashed red line** and optionally a “✖” over the whole subtree. Use a distinct background colour (light gray) for pruned nodes. |
| **Node types** | MAX node coloured teal, MIN node orange – good. | Add a small legend (or label) indicating “MAX (our player)”, “MIN (opponent)”. |
| **Leaf values** | Leaves show “+3”, “‑1”, “0”, “+2”. | Include the α/β thresholds that cause pruning, e.g., annotate leaf “+2 (β = 2)”. |
| **Overall narrative** | Diagram is presented after the technical example, but the text does not reference the specific node values. | In the “Alpha‑beta implementation with a pruning trace” paragraph, refer explicitly to the diagram: “Figure 3.4 shows how the left subtree raises α to 3, causing the right subtree (β = 2) to be cut off.” |
| **Styling** | Theme “sketchy‑outline” is fine, but font size may be small for a projected slide. | Increase node font size (`skinparam defaultFontSize 14`) and ensure enough contrast for the note box. |

---

## 5. Recommended Revisions (Prioritized)

1. **Re‑write the Conceptual Core with narrative hooks**  
   - Begin each sub‑section with a short question or scenario (e.g., “If we could look ahead to the end of the game, what would we choose?”).  
   - Follow with an informal explanation before presenting the formal recursion or α/β definition.

2. **Enrich the α‑β pruning section with a step‑by‑step trace**  
   - Add a concrete depth‑2 tree example in the text, showing α and β values after each child is examined.  
   - Highlight the exact moment pruning occurs and explain why it is safe.

3. **Upgrade Figure 3.4**  
   - Annotate edges with current α/β values.  
   - Render pruned branches as dashed red lines with a “✖”.  
   - Add a legend for MAX/MIN node colours.  
   - Increase font size for readability.

4. **Insert “tension” prompts throughout**  
   - After the horizon‑effect paragraph, ask: “Can you think of a real game where a shallow search leads to a blunder?”  
   - In the philosophical reflection, pose: “If we model the opponent as fallible, how does the optimal strategy change?”

5. **Tie the Lab Prep more tightly to the opening hook**  
   - Re‑phrase the lab description: “Implement a minimax engine that can always force a draw in the tic‑tac‑toe scenario introduced at the start of the lecture.”

6. **Minor polishing**  
   - Replace the generic “α ≥ β” wording with “when α becomes greater than or equal to β, the remaining siblings cannot improve the current player's outcome”.  
   - Ensure all key‑point bullet items are phrased as actionable take‑aways (e.g., “α‑β pruning reduces explored nodes by up to 70 % in small games”).  

---

**Overall**, with the above narrative tightening, richer examples, and a more informative diagram, Lecture 3.4 will sustain student attention for the full 90‑minute session and provide a memorable bridge from basic search to the more sophisticated multi‑agent reasoning that follows later in the book.