# Review: 1.2: History of AI — Symbolic, Connectionist, Hybrid

**Source:** part-i/ch01-intelligence-as-process/lecture-02.adoc

---

## Review of Lecture 1.2 – “History of AI — Symbolic, Connectionist, Hybrid”

**Grade: C**  
The lecture has a promising hook and a clear thematic intention, but it falls short of the 90‑minute density target, contains too many “definition‑first” statements, and the narrative arc stalls after the hook. The core sections need more step‑by‑step development, tighter key‑point lists, and richer examples to sustain a full class period. The diagrams are useful but could be tightened to reinforce the story.

---

### 1. Narrative Arc  

| Element | What the lecture does | Verdict |
|---------|----------------------|---------|
| **Hook** | Starts with a vivid ER scenario that forces a choice between rule‑based and neural diagnosis, and asks the class to weigh interpretability vs performance. | ✅ Strong – concrete, raises tension. |
| **Development** | Moves into a high‑level “symbolic vs connectionist” dichotomy, then a brief chronology (Lisp → expert systems → perceptron → back‑prop → LLMs). The flow is more a list of facts than a problem‑solution‑limit progression. | ⚠️ Weak – needs a clearer “problem → response → limitation” thread (e.g., **Problem:** brittle expert systems; **Response:** learning from data; **Limitation:** loss of interpretability; **New Problem:** need for hybrid). |
| **Closing / Bridge** | Mentions that the lab will build a knowledge graph that later “connects to neural retrieval and generation.” The bridge is present but feels tacked on rather than a natural climax. | ⚠️ Needs a stronger payoff (e.g., preview a concrete demo of a neuro‑symbolic QA system, or pose a provocative question for the next lecture). |

**Overall Narrative Verdict:** *Mixed.* The hook is excellent, but the middle lacks a compelling arc and the ending does not fully capitalize on the tension introduced.

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs | Key‑point items | Word‑count estimate* |
|---------|------------|-----------------|----------------------|
| **Conceptual Core** | 1 (single block) | 9 (exceeds 5‑8) | ~350 w |
| **Technical Example** | 2 | 5 (good) | ~300 w |
| **Philosophical Reflection** | 2 | 5 (good) | ~250 w |
| **Hook / Epigraph / Prompts / Discussion / Lab Prep** | 5 (short) | – | ~400 w |
| **Total** | ~12 | – | **~1 300 w** |

\*Rough count based on typical sentence length; the actual file is well under the 2 500‑3 500‑word window for a 90‑minute lecture.

**Density Verdict:** *Insufficient.* The core conceptual block should be expanded to **4‑6 paragraphs** with **5‑8** concise key points. The current material would fill only ~30 % of a 90‑minute slot.

---

### 3. Interest & Engagement  

| Issue | Why it hurts engagement | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dump** in the Conceptual Core (e.g., “The symbolic tradition—logic, rules, expert systems—treats intelligence as manipulation of discrete symbols.”) | Students hear abstract labels before seeing why they matter. | Start the core with a *mini‑case*: “A radiologist needs to explain why a lung nodule was flagged. How would a rule‑based system do it vs. a neural net?” Then unpack definitions. |
| **Thin historical narrative** – dates are listed but the *human* story (funding wars, personalities, failures) is missing. | History feels like a timeline, not a story. | Insert short anecdotes (e.g., the MYCIN controversy, the “perceptron‑gate” at Stanford, the 1997 Deep Blue shock) and ask students to guess the outcome before revealing it. |
| **Key‑point overload** (9 items) → cognitive overload. | Learners struggle to retain the most important take‑aways. | Consolidate overlapping points (e.g., merge “Expert systems … limits” with “First AI winter”). Aim for 6‑7 high‑impact bullets. |
| **Lack of active learning** – only discussion prompts appear at the end. | No “think‑pair‑share” or quick polls during the core. | Sprinkle 2‑minute think‑pair‑share questions after each historical phase (e.g., “What would you have done differently in the 1980s expert‑system boom?”). |
| **Missing forward‑looking teaser** – the bridge to Lab 1 is vague. | Students may not see the relevance of the upcoming hands‑on work. | End with a short demo video (30 s) of a neuro‑symbolic QA system answering a medical query, then ask “How did the knowledge graph enable that explanation?” |

---

### 4. Diagram Review  

#### Figure 1.2 – Mermaid Timeline  

| Observation | Recommendation |
|-------------|----------------|
| Uses generic sections (“Symbolic & Connectionist”, “Hybrid”) but the overlapping eras are not visually obvious. | Add **overlap shading** (e.g., semi‑transparent bars) to show that symbolic and connectionist co‑existed from 1956‑1990. |
| Winter periods are defined with `classDef winter` but not linked to the timeline bars. | Attach the `winter` class to the appropriate time spans (e.g., `winter1 : 1974-1980`). Also label them “AI Winter 1” and “AI Winter 2”. |
| No axis labels for “Year”. | Add `axis` label or a top‑level caption: “Year →”. |
| Title is fine, but the figure could benefit from a **legend** explaining colors (symbolic, connectionist, hybrid). | Insert a small legend box. |

#### Figure 1.3 – PlantUML Neuro‑Symbolic Pipeline  

| Observation | Recommendation |
|-------------|----------------|
| All arrows are solid; no distinction between **retrieval** (data‑flow) and **generation** (control‑flow). | Use **dashed arrows** for retrieval (`LLM -> KG`) and **solid arrows** for generation (`LLM -> LLM`). |
| Actors are unlabeled beyond “User”. | Add a note on the user arrow: “symptom list”. |
| The KG returns a subgraph but the diagram does not show that the subgraph is **symbolic**. | Add a label on the KG→LLM arrow: “symbolic subgraph (nodes/edges)”. |
| No feedback loop from the generated answer back to the KG (e.g., for grounding). | If you want to illustrate grounding, add a thin arrow from LLM back to KG labeled “verify / cite”. |
| Title is present, but the diagram could benefit from a **legend** distinguishing symbolic vs. connectionist components (e.g., colored boxes). | Color the KG box light‑blue (symbolic) and the LLM box orange (connectionist). Add a legend. |

---

### 5. Recommended Revisions (Prioritized)

1. **Expand the Conceptual Core to 4‑6 paragraphs**  
   - Paragraph 1: *Problem* – early AI needed explicit knowledge but struggled with brittleness.  
   - Paragraph 2: *Response* – symbolic expert systems (MYCIN, XCON) and their successes.  
   - Paragraph 3: *Limitation* – knowledge‑acquisition bottleneck → first AI winter.  
   - Paragraph 4: *Response* – connectionist resurgence (perceptron → back‑prop).  
   - Paragraph 5: *New Limitation* – opacity → second winter.  
   - Paragraph 6: *Hybrid emergence* – neuro‑symbolic pipelines, why they matter today.

2. **Trim the Conceptual Core key‑point list to 6 items** (merge related bullets, keep the most pedagogically useful).

3. **Insert at least two short “story” boxes** (e.g., MYCIN controversy, 1997 Deep Blue) with a quick “What happened?” question to keep students active.

4. **Add a forward‑looking teaser** (30‑second video or live demo) at the end of the core that shows a neuro‑symbolic QA system in action, then explicitly link to Lab 1.

5. **Re‑write the Technical Example** to include a **concrete dataset** (e.g., a small set of symptom‑diagnosis rules) and a **live coding snippet** that students can follow (pseudo‑code for rule matching vs. a tiny neural net).

6. **Revise the diagrams** per the recommendations above (overlap shading, legend, colored boxes, dashed vs. solid arrows, labels for symbolic vs. connectionist flows).

7. **Add 2‑minute think‑pair‑share prompts** after each historical phase (symbolic, connectionist, hybrid) to break up the lecture and reinforce retention.

8. **Check word count** – aim for ~2 800 words across the expanded core, technical example, and philosophical reflection. Use concise prose; avoid redundant sentences.

9. **Proofread for consistency** (e.g., “expert system” vs. “expert systems”, “knowledge‑graph” hyphenation) and ensure all citations (McCarthy 1960, Derrida 1967) have proper reference keys.

---

### Closing Note  

With the above revisions the lecture will meet the 90‑minute density, maintain a compelling narrative arc, and keep students actively engaged. The diagrams, once refined, will serve as visual anchors that reinforce the story of AI’s shifting paradigms rather than mere decorative elements. Good luck!