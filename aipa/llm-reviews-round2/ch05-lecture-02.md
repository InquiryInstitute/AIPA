# Review: 5.2: Multilayer Networks and Backpropagation

**Source:** part-ii/ch05-neural-systems-and-representation/lecture-02.adoc

---

## Review of Lecture 5.2 – *Multilayer Networks and Backpropagation*

### Summary
**Grade: C‑** – The lecture has a decent hook and a clear logical flow, but it falls short of the 90‑minute density target (≈2 500‑3 500 words) and contains several definition‑first passages that would make a 90‑minute class feel thin. The narrative arc is present but could be tightened with more tension, concrete “what‑if” scenarios, and explicit bridges to the upcoming lab and next lecture. The sole PlantUML diagram is useful but under‑annotated.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with a concrete robot‑XOR task and the failure of a single‑layer perceptron. This is a strong, visual hook that creates immediate tension. | ✅ Good |
| **Development** | The lecture moves from the XOR problem → need for depth → credit‑assignment → activation functions → universal approximation → backpropagation. The steps are logical, but several sections jump straight into definitions (e.g., “Activation functions introduce non‑linearity”) without first asking a probing question or showing a failure case. | ⚠️ Needs more “problem → attempt → obstacle → insight” moments. |
| **Closing / Bridge** | Ends with a forward‑looking sentence (“Next up → Training dynamics…”) and a lab prep. The bridge is present but feels abrupt; the philosophical reflection could be used to segue more smoothly into the next topic. | ⚠️ Could be stronger. |

**Overall Verdict:** The arc is present but uneven. Strengthen the development by inserting mini‑conflicts (e.g., “What if we add more hidden units but keep them linear?”) and a more explicit “so what does this mean for our robot?” transition to the lab.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs | Key Points | Approx. Word Count* |
|---------|------------|------------|---------------------|
| Conceptual Core | 5 | 6 | ~1 200 |
| Technical Example | 2 | 5 | ~600 |
| Philosophical Reflection | 3 | 5 | ~500 |
| **Total** | 10 | 16 | **~2 300** |

\*Rough estimate based on typical paragraph length (≈120‑150 words).  

**Result:** The lecture is ~200‑1 200 words short of the lower bound. It also has fewer than the recommended 6‑12 key points in the Conceptual Core and 5‑8 in the Technical Example.  

**What’s missing?**  
* Additional concrete examples (e.g., a 3‑layer network solving a non‑XOR non‑linear toy problem).  
* A short “gradient‑flow” walk‑through with numeric values to make the chain rule tangible.  
* A deeper discussion of *why* the universal approximation theorem does **not** make depth unnecessary in practice (parameter efficiency, hierarchical reuse, regularisation).  
* A brief “historical vignette” (e.g., the 1986 Rumelhart‑Hinton backprop paper) to give context.  

---

## 3. Interest (Engagement)

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dumps** (e.g., “Activation functions introduce non‑linearity.”) | Students hear a term before seeing why it matters. | Re‑frame as a question: “What happens if we stack two linear layers? Let’s try it.” Follow with a quick demo (hand‑drawn plot) showing the collapsed linear map. |
| **Thin technical example** (only two paragraphs) | Not enough time to practice the backward pass; students may feel the lab is a jump. | Expand the example: show a concrete numeric forward pass (x = [0.5, ‑0.2]), compute z¹, a¹, etc., then compute ∂L/∂W³ numerically. Include a table of intermediate values. |
| **Philosophical reflection is abstract** | Might feel disconnected from the code‑heavy sections. | Insert a short “story” of a researcher visualising hidden‑layer filters and being surprised, then ask the class to guess what the network might be learning. |
| **No active “thinking” moments** | 90 min needs pauses for discussion or quick polls. | Add 2‑3 “Think‑Pair‑Share” prompts after the XOR discussion and after the backprop derivation. |
| **Lack of visual tension** | The diagram is static; students don’t see the *flow* of error. | Animate (or step‑wise reveal) the backward arrows during the lecture, highlighting the gradient at each layer. |

---

## 4. Diagram Review (PlantUML)

**Current diagram:**  
- Shows forward nodes (input → hidden1 → hidden2 → output → loss) and backward arrows labeled with generic ∂L/∂z.  
- Uses a single colour for all arrows, no distinction between forward and backward flow.  
- No explicit weight matrices, no activation function names on the edges, no numerical example.

**Recommendations**

| Issue | Suggested improvement |
|-------|-----------------------|
| **Missing colour coding** | Use **green** arrows for forward pass, **red** arrows for backward gradients. |
| **No activation labels** | Append “ReLU” on the edge H1→H2 and “Softmax” on H2→O, or place a small label inside each node. |
| **Weight matrices not shown** | Add a tiny box on each forward edge: “W¹, b¹”, “W², b²”, “W³, b³”. |
| **Gradient symbols ambiguous** | Replace “∂L/∂z³” with “δ³ = ∂L/∂z³” and similarly for δ², δ¹ to echo common notation. |
| **No loss type** | Indicate the loss (e.g., “Cross‑Entropy”) next to the loss node. |
| **No numerical example** | Include a tiny inset showing a sample value (e.g., “δ³ = [0.2, ‑0.1, 0.0]”). |
| **Layout** | Align nodes vertically to emphasise the layer hierarchy; add a thin dashed line separating forward and backward phases. |
| **Caption** | Expand the caption to explain the two‑phase flow: “Forward pass computes activations; backward pass propagates error signals (δ) to compute gradients.” |

---

## 5. Recommended Revisions (Prioritized)

1. **Add a “What‑if” mini‑experiment** right after the XOR hook:  
   - Show a 2‑layer *linear* network failing on XOR (plot).  
   - Pose the question “What if we add a non‑linearity?” → leads to depth discussion.

2. **Expand the Conceptual Core** to ~6‑8 paragraphs and 8‑10 key points:  
   - Include a short historical note on the 1986 backprop breakthrough.  
   - Provide a numeric illustration of the chain rule (e.g., compute ∂L/∂W¹ for a 2‑layer net with concrete numbers).  
   - Discuss parameter efficiency of depth vs. width (give a simple count comparison).

3. **Enrich the Technical Example**:  
   - Add a step‑by‑step numeric forward pass (values for x, W, b).  
   - Show the corresponding backward gradients with a small table.  
   - Include a “debug tip” on using `torch.autograd.gradcheck` (or equivalent).  

4. **Deepen the Philosophical Reflection**:  
   - Insert a short anecdote (e.g., visualising first‑layer filters in a trained net).  
   - Pose a concrete question: “If a hidden unit fires for both ‘cat’ and ‘dog’, what does that tell us about its representation?”  

5. **Insert active learning pauses** (Think‑Pair‑Share or quick polls) after:  
   - The XOR failure.  
   - The universal approximation theorem claim.  
   - The backprop derivation.

6. **Revise the PlantUML diagram** per the table above (colour‑code, label activations, show δ symbols, add loss type, optional numeric inset).

7. **Bridge to the next lecture** more explicitly:  
   - End the philosophical section with a sentence like: “Understanding how gradients flow is only half the story; the next challenge is keeping those gradients alive – a problem we’ll tackle when we discuss vanishing gradients and initialization.”  

8. **Word‑count check**: After the above expansions, aim for ~2 800‑3 200 words total (≈300‑350 words per paragraph on average).  

---

**Bottom line:** The lecture has a solid skeleton but needs more flesh—especially concrete numeric walk‑throughs, active engagement moments, and richer contextual storytelling—to fill a 90‑minute session and keep students hooked. Implement the revisions above and the lecture will meet both the density and interest criteria.