# Review: 1.1: Definitions of Intelligence — Stored vs. Flowing

**Source:** part-i/ch01-intelligence-as-process/lecture-01.adoc

---

## Review of Lecture 1.1 – “Definitions of Intelligence — Stored vs. Flowing”

| **Overall Grade** | **A** |
|-------------------|-------|
| **Why** | The lecture has a clear hook, a logical development, and a nice closing that points to the labs.  However, it falls short on **density** (≈1 300 words, well under the 2 500‑3 500 word target) and the **philosophical reflection** is missing one key point.  The diagrams are useful but need tighter alignment with the narrative.

---

### 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with a concrete, everyday question about Siri, then a rapid “think‑pair‑share”.  The blitz‑chess scenario is vivid and immediately frames the stored ↔ flowing tension. | ✅ Strong |
| **Development** | • Conceptual core introduces the two metaphors (stored vs. process) and grounds them in classic thought‑experiments (Turing test, Chinese Room). <br>• Technical example concretises the trade‑off with chess tablebases vs. search. <br>• Philosophical reflection expands to epistemic circulation and power.  The flow is step‑wise (problem → two contrasting answers → synthesis → implication). | ✅ Good, but the philosophical section is a bit thin (only 4 key points). |
| **Closing** | The “Discussion Prompts”, “Lab Prep”, and “Reading” sections explicitly bridge to the hands‑on work, giving students a clear “next step”. | ✅ Effective |
| **Overall Arc** | The lecture moves from concrete curiosity → abstract debate → concrete engineering → societal implications → lab.  The arc is coherent and keeps a narrative thread. | **Pass** |

---

### 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs | Key‑point items | Word‑count estimate | Meets target? |
|---------|------------|----------------|---------------------|---------------|
| Conceptual Core | 4 (within 4‑6) | 6 (within 6‑12) | ~1 200 | **No** (needs ~800‑1 200 more) |
| Technical Example | 3 (within 2‑3) | 5 (within 5‑8) | ~400 | **No** (needs ~300‑600 more) |
| Philosophical Reflection | 2 (within 2‑3) | 4 (needs 5‑8) | ~250 | **No** (add at least one more point & ~200 words) |
| **Total** | 9 | 15 | **≈ 1 850** | **Below** the required 2 500‑3 500 range |

**What’s missing?**  
* Additional elaboration on each core idea (e.g., historical anecdotes, quantitative trade‑offs, real‑world case studies).  
* A “mini‑case study” that walks through a concrete system (e.g., a retrieval‑augmented chatbot) step‑by‑step, showing both stored and flowing components.  
* A short “implications” paragraph that ties the philosophical reflection back to design decisions (e.g., latency vs. privacy).

---

### 3. Interest (Will it hold attention for 90 min?)

| Observation | Recommendation |
|-------------|----------------|
| **Hook is solid**, but the rest of the lecture leans heavily on exposition. | Sprinkle **micro‑activities** every 10‑15 min (e.g., quick polls, “raise‑your‑hand if you think X”, 2‑minute sketch‑the‑system on paper). |
| **Conceptual Core** is dense with philosophy; students may drift if not anchored. | Insert a **“live debate”**: split the room, one side defends stored representation, the other defends process view.  Give them 3 minutes to prepare, then 5 minutes to argue. |
| **Technical Example** is short and could feel like a “demo” rather than a discussion. | Add a **live demo** (or a short video) of a tablebase lookup vs. a search engine, showing latency and memory footprints. |
| **Philosophical Reflection** ends abruptly. | Pose a **“future‑scenario”**: imagine a city‑wide AI traffic‑control system that is purely flowing vs. one that is a massive stored model. Ask students to predict social outcomes. |
| **Lab Prep** is mentioned but not linked to the lecture content. | End with a **“preview carousel”**: show screenshots of the knowledge‑graph lab interface, ask students to guess which parts are stored vs. flowing. |

---

### 4. Diagram Review  

| Diagram | Does it match the narrative? | Suggested concrete improvements |
|---------|----------------------------|---------------------------------|
| **Diagram 1 – Stored vs. Flowing Intelligence** | Captures the two lanes and a hybrid connection, echoing the “Stored Knowledge ↔ Input” arrows in the text.  However, the flow arrows are generic (`-->`) and the feedback loops are not clearly labeled as *learning* or *update*. | 1. Add **labels** on the arrows: “Retrieve”, “Update (re‑train)”, “Transform”, “Compose”, “Feedback”. <br>2. Use **different arrow styles** (solid for data flow, dashed for learning) to distinguish retrieval from learning. <br>3. Insert a **small icon** (e.g., a gear) on the “Transform” step to hint at computation. <br>4. Place a **legend** in the corner explaining the colors (Stored = blue, Flow = orange). |
| **Diagram 2 – Retrieval‑Augmented Generation (Hybrid)** | Mirrors the hybrid discussion in the technical example and lab prep.  The components are correctly identified, but the diagram lacks a clear **feedback loop** from Output back to the Knowledge Base, which the text mentions (“log usage (optional feedback)”). | 1. Draw a **curved arrow** from “Generated Output” back to “External Knowledge Base” labeled “Usage logging / fine‑tune”. <br>2. Add **notes** on the two stored boxes: “high storage, low per‑token compute” (LLM) and “low storage, high per‑query compute” (KB). <br>3. Highlight the **hybrid interaction** with a shaded “augmented prompt” box that sits between KB and LLM. <br>4. Include a **title** above the diagram: “Hybrid Retrieval‑Augmented Generation – Stored + Flowing”. |

---

### 5. Recommended Revisions (Prioritized)

1. **Increase overall word count to ≥ 2 500**  
   * Add a **historical vignette** (e.g., early expert systems vs. early neural nets).  
   * Insert a **mini‑case study** of a modern RAG chatbot, walking through a user query step‑by‑step.  
   * Expand the **philosophical reflection** with at least one more key point (e.g., “The locus of intelligence influences accountability: stored models are auditable, flowing processes are opaque”).  

2. **Enrich the Philosophical Reflection**  
   * Add a fifth key point (e.g., “Hybrid systems inherit both auditability and opacity, demanding new governance frameworks”).  
   * Provide a concrete example of governance (e.g., EU AI Act’s “high‑risk” classification).  

3. **Embed micro‑activities** to sustain engagement (debate, live demo, quick polls).  
   * Write short “instruction boxes” in the AsciiDoc (e.g., `[%interactive]` or `*Poll:*`).  

4. **Refine Diagram 1**  
   * Label each arrow, differentiate arrow styles, add legend, and clarify the hybrid connection.  

5. **Refine Diagram 2**  
   * Add the feedback arrow, annotate storage/computation trade‑offs, and highlight the augmented prompt.  

6. **Link Lab Prep more tightly**  
   * After the hybrid diagram, insert a **“What you’ll build”** paragraph that maps each diagram component to a concrete lab artifact (e.g., “the ‘Stored Knowledge’ box becomes the graph’s node table”).  

7. **Proofread for parallelism and terminology**  
   * Ensure consistent use of “stored‑representation” vs. “stored representation”.  
   * Align bullet‑point phrasing (all start with a noun or verb).  

8. **Add a brief “Take‑away” slide** (2‑3 bullet points) at the very end to reinforce the three dimensions: **(1) Where is knowledge stored? (2) How is it processed? (3) What power dynamics arise?**  

---

**Bottom line:** The lecture already has a compelling hook and a logical flow, but to meet the 90‑minute, 2 500‑3 500‑word standard it needs **more substantive exposition**, a **richer philosophical section**, and **tighter diagram integration**. Implement the revisions above and the lecture will comfortably fill a full session while keeping students actively engaged.