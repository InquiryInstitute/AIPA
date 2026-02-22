# Review: 3.4: Adversarial Search — Game Trees

**Source:** part-i/ch03-search-and-planning/lecture-04.adoc

---

## Review of Lecture 3.4 – *Adversarial Search — Game Trees*  

**Grade: B‑**  
The lecture has a solid hook and a clear step‑by‑step narrative, but it falls short of the 2 500‑3 500 word target and contains a few definition‑first moments that could be re‑framed as story‑driven observations. With modest expansion and a few structural tweaks the material will comfortably fill a 90‑minute session and stay engaging throughout.

---

### 1. Narrative Arc  

| Element | Evaluation | Comments |
|---------|------------|----------|
| **Hook** | ✅ Strong | Starts with a vivid “last‑move tic‑tac‑toe” scenario that immediately raises a concrete problem (“What move guarantees a draw?”). |
| **Development** | ✅ Good progression | The Core moves from “what is a game tree?” → “MAX/MIN anatomy” → “minimax recursion” → “α‑β pruning” → “depth‑limit & horizon”. Each step builds on the previous one, and the technical example mirrors the conceptual steps. |
| **Closing** | ✅ Satisfactory but could be tighter | The “take‑away” sentence links to Chapter 8, but the bridge could be made more explicit (e.g., “Next we will see how probabilistic opponent models extend minimax”). |
| **Overall Verdict** | **Strong** | The lecture follows a classic problem‑solution‑implication arc; the only weakness is a slight “definition dump” in the “Game‑tree anatomy” paragraph (the node/edge description could be introduced through a small live walk‑through). |

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. Paragraphs | Approx. Key Points | Word Count Estimate |
|---------|-------------------|-------------------|---------------------|
| **Conceptual Core** | 5 | 8 | ~620 |
| **Technical Example** | 3 | 7 | ~380 |
| **Philosophical Reflection** | 3 | 5 | ~350 |
| **Intro / Epigraph / Prompts / Discussion / Lab / Reading** | 7 | – | ~300 |
| **Total** | – | – | **≈ 1 650 words** |

**Result:** ~1 650 words – roughly **50 %** of the required density.  

**What’s missing:**  

* A longer, step‑by‑step walk‑through of a concrete 3‑move tic‑tac‑toe tree (including a table of node values).  
* A “live coding” snippet that students can run in a REPL, with commentary on each recursive call.  
* A short case study (e.g., Connect Four or a simple Nim variant) to illustrate why depth‑limit and evaluation matter.  
* A brief “historical note” on the origin of α‑β pruning (Knuth & Moore, 1975) to give context.  

Adding ~800‑1 200 words across these points will bring the lecture into the target range.

---

### 3. Interest  

| Issue | Why it matters | Suggested fix |
|-------|----------------|---------------|
| **Definition‑first phrasing** (e.g., “Game‑tree anatomy. Each node stores …”) | Risks losing the narrative momentum. | Re‑write as a short story: “Imagine we label the current board ‘Root’. From there we draw two branches …” |
| **Thin technical example** (only a few lines of pseudo‑code) | Students may not see the algorithm in action. | Expand the code block, annotate each line, and include a printed trace of the recursion for a specific board. |
| **Limited interactive tension** | The lecture is mostly exposition; 90 min can feel lecture‑heavy. | Insert a quick “think‑pair‑share” after the hook: ask learners to propose a move, then reveal the minimax answer. |
| **Missing visual dynamics** | The PlantUML diagram is static; students benefit from seeing the pruning unfold. | Add a second diagram that animates the pruning (e.g., using numbered steps or a “before/after” side‑by‑side view). |
| **No explicit time‑budget cue** | Learners may not know when to switch from theory to lab. | At the end of the Core, insert a “5‑minute pause” cue for a short in‑class coding demo. |

---

### 4. Diagram Review (PlantUML Figure 3.4)

| Aspect | Current state | Recommendation |
|--------|---------------|----------------|
| **Alignment with narrative** | Shows a depth‑2 tree with α‑β cut‑off, matching the pruning paragraph. | Keep, but add a caption that explicitly references the “left subtree raises α to 3, right subtree pruned because β = 2”. |
| **Labels & arrows** | Nodes are colored but edge labels only show “α = … / β = …”. | Add the *value* of each leaf (e.g., “+3”, “‑1”, “+2”, “0”) on the edges, and annotate the pruned edges with a red “✖” or “pruned”. |
| **Legend** | Present, but could be clearer. | Move the legend to the top‑right corner, use larger font, and include a short note: “Solid arrows = explored, dashed red arrows = pruned”. |
| **Feedback loops** | None (appropriate). | Consider adding a tiny “back‑propagation” arrow from leaf to parent to illustrate value propagation (optional). |
| **Stylistic consistency** | Uses sketchy‑outline theme; colors are subtle. | Ensure the MAX background (#E0F7FA) and MIN background (#FFF3E0) are distinct enough for printed black‑and‑white copies (add pattern shading). |
| **Overall clarity** | Reasonably clear but a bit cramped. | Increase node spacing, label the root as “Root (MAX)”, and add a small inset table summarising α/β values at each step. |

---

### 5. Recommended Revisions (Prioritized)

1. **Expand the Core to meet word‑count target**  
   - Insert a **step‑by‑step walk‑through** of a 3‑move tic‑tac‑toe tree (include a table of node values).  
   - Add a **historical sidebar** on α‑β pruning (cite Knuth & Moore, 1975).  
   - Provide a **mini‑case study** (e.g., Connect Four) that demonstrates depth‑limit and horizon effect.

2. **Re‑frame definition‑heavy paragraphs as narrative**  
   - Rewrite “Game‑tree anatomy” as a short story of constructing the tree from the current board.  
   - Introduce “minimax recursion” by first posing the question “What would I do if I knew my opponent’s best reply?” and then deriving the recursion.

3. **Enrich the technical example**  
   - Show a **full code listing** (Python or pseudocode) with inline comments.  
   - Include a **sample execution trace** (printout of recursive calls and α/β updates).  
   - Add a **small timing table** comparing node counts for plain minimax vs. α‑β on tic‑tac‑toe and Connect Four.

4. **Increase interactive tension**  
   - After the hook, ask students to **predict the safe move** before revealing minimax.  
   - Insert a **5‑minute live coding demo** where the instructor runs the minimax function on the board introduced at the start.  
   - Use a **think‑pair‑share** to discuss the “rational opponent” assumption.

5. **Upgrade Figure 3.4**  
   - Add leaf values on edges, annotate pruned edges with a red “✖”.  
   - Provide a caption that explicitly ties the diagram to the α‑β paragraph.  
   - Ensure colors are distinguishable in grayscale and increase spacing for readability.

6. **Strengthen the closing bridge**  
   - End the Core with a **forward‑looking sentence**: “In the next chapter we will relax the perfect‑rationality assumption and let the opponent act probabilistically, leading to the Expectimax and Monte‑Carlo Tree Search algorithms.”  

7. **Polish ancillary sections**  
   - Shorten the “Reading” block to a single bullet list.  
   - Align the “Discussion Prompts” with the newly added case study (e.g., “How would α‑β behave on a Connect Four board?”).  

---

**Final Note:**  
Implementing the above changes will bring the lecture into the desired 90‑minute density, keep students actively engaged, and ensure every diagram directly reinforces the learning narrative. The core concepts of adversarial search will then be both **deeply understood** and **memorable** for the class.