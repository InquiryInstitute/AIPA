# Review: student-ai.git
$ cd student-ai
$ tree -L 2
.
├── orchestration      # orchestrator service (entry point)
├── llm                # embeddings, generation, caching
├── memory             # document store, graph DB, retrieval logic
├── reasoning          # logical inference, query planning
└── tools              # search, audit, domain‑specific adapters

**Source:** part-i/ch01-intelligence-as-process/lecture-08.adoc

---

## Review of **Lecture: student‑ai.git** (part‑i/ch01‑intelligence‑as‑process/lecture‑08.adoc)

### Summary
**Grade: D** – The lecture consists of a single code block that lists a repository layout. There is no narrative, no conceptual development, no key points, and no diagrams. As it stands it cannot fill a 90‑minute session, nor does it engage students. Substantial expansion is required before it can be used as a teaching resource.

---

## 1. Narrative Arc
| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | The lecture opens with a raw `git clone` command and a `tree` output. No concrete scenario, provocative question, or tension is introduced. |
| **Development** | ❌ Missing | No problem statement, no step‑by‑step explanation of why the repository structure matters, no illustration of how the components interact. |
| **Closing / Bridge** | ❌ Missing | No concluding remarks, no implication for a lab, no preview of the next lecture. |

**Overall verdict:** The lecture lacks any narrative arc. It reads as a “definition‑first dump” (in this case a dump of file names) rather than a story.

---

## 2. Density (Target: 2,500‑3,500 words, 4‑6 paragraphs per core section)

| Section | Current Length | Target | Gap |
|---------|----------------|--------|-----|
| Conceptual Core | 0 paragraphs / 0 words | 4‑6 paragraphs / ~1,500‑2,000 words | **Missing** |
| Technical Example | 0 paragraphs / 0 words | 2‑3 paragraphs / ~800‑1,200 words | **Missing** |
| Philosophical Reflection | 0 paragraphs / 0 words | 2‑3 paragraphs / ~800‑1,200 words | **Missing** |

**Key points:** None are present. The lecture does not meet any of the density requirements.

---

## 3. Interest (Engagement)

* **Hook:** No hook → students will not be motivated to stay for 90 minutes.
* **Concrete Scenarios:** The repository layout could be framed as “You are building a student‑assistant AI that can answer homework questions. How do you organise the code so that the system can retrieve knowledge, reason, and act?” – this is missing.
* **Tension / Question:** No open question (e.g., “How can we make the system retrieve the right document from memory while keeping latency low?”) to drive curiosity.
* **Forward Motion:** No roadmap, no “what we will build together” statement, no lab preview.

**Result:** The current material would hold attention for at most a few minutes.

---

## 4. Diagram Review

There are **no PlantUML diagrams** in the current lecture. Consequently, there is no visual reinforcement of any concept.

---

## 5. Recommended Revisions (Prioritized)

1. **Create a compelling hook (first 5‑10 minutes)**
   - Start with a short story: *“Imagine a student asking an AI tutor: ‘Explain why the sky is blue.’* Show how the request travels through the system."
   - Pose a provocative question: *“How does an AI decide which knowledge source to consult first?”*

2. **Introduce a high‑level architecture diagram**
   - Use PlantUML to draw a **system overview** showing the five top‑level packages (`orchestration`, `llm`, `memory`, `reasoning`, `tools`) and the data flow between them (request → orchestrator → memory retrieval → reasoning → LLM generation → tools → response).
   - Add labels for **inputs**, **outputs**, and **feedback loops** (e.g., caching results back into memory).

3. **Expand the Conceptual Core (≈1,800‑2,200 words)**
   - **Paragraph 1:** Define “AI as a process” and why modular decomposition matters.
   - **Paragraph 2:** Explain the role of **orchestration** (routing, session management).
   - **Paragraph 3:** Detail **LLM** responsibilities (embedding, generation, caching) and trade‑offs.
   - **Paragraph 4:** Discuss **Memory** (vector store vs graph DB, retrieval strategies).
   - **Paragraph 5:** Outline **Reasoning** (query planning, logical inference, tool use).
   - **Paragraph 6:** Describe **Tools** (search adapters, audit logs, domain‑specific APIs).
   - End with a **key‑point list** (6‑8 bullets) summarising each component’s purpose and interaction.

4. **Add a Technical Example (≈1,000 words)**
   - Walk through a concrete query (“What is the capital of France?”) step‑by‑step:
     1. Orchestrator receives request.
     2. Memory retrieval of relevant facts.
     3. Reasoning module decides whether a direct answer exists or if a tool call is needed.
     4. LLM generates the final response.
   - Include **code snippets** (Python pseudo‑code) for each step.
   - Highlight **error handling** and **caching**.

5. **Insert a Philosophical Reflection (≈1,000 words)**
   - Discuss the **process‑oriented view of intelligence** vs static “model‑only” view.
   - Raise questions about **modularity**: Does breaking intelligence into components limit emergent behavior?
   - Connect to broader themes in the textbook (e.g., post‑modern critiques of “black‑box” AI).
   - Provide a **bullet list** of reflective questions for class discussion.

6. **Closing / Bridge (≈5‑10 minutes)**
   - Summarise the main take‑aways.
   - Preview the upcoming lab: *“In the next session you will clone the repo, spin up the orchestrator, and experiment with adding a new tool.”*
   - Pose a forward‑looking question: *“What new component could you design to improve the system’s reasoning?”*

7. **Add at least two PlantUML diagrams**
   - **Diagram 1:** High‑level architecture (as above).
   - **Diagram 2:** Detailed flow for a single query (showing decision points, cache hits/misses, tool invocation).

8. **Word‑count check**
   - Aim for **2,500‑3,500 words** total across the three sections.
   - Ensure **6‑12 key points** per section (use bold headings or numbered lists for clarity).

---

### Final Note
The current lecture is essentially a placeholder. By embedding a narrative hook, fleshing out the conceptual core, providing a concrete technical walk‑through, and adding reflective discussion (plus supporting diagrams), the material can be transformed into a robust 90‑minute session that is both informative and engaging.