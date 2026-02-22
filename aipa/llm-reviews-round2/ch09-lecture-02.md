# Review: json
{
  "name": "search",
  "description": "Run a web search and return the top results.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {"type": "string"},
      "k": {"type": "integer", "default": 5}
    },
    "required": ["query"]
  }
}

**Source:** part-iii/ch09-acting-in-the-world/lecture-02.adoc

---

## Review of Lecture – “search” (JSON Function Spec)

### Summary  
**Grade: D** – The lecture consists of a single JSON block with no surrounding narrative, context, or pedagogical scaffolding. It fails to provide a hook, a developmental arc, or any of the required sections (conceptual core, technical example, philosophical reflection). Consequently it cannot sustain a 90‑minute session, nor does it engage students.  

---

## 1. Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | There is no opening scenario, question, or tension. The reader is dropped straight into a definition‑like JSON dump. |
| **Development** | ❌ Missing | No problem statement, no explanation of why a “search” tool is needed, no step‑by‑step walk‑through of the spec, no discussion of validation, error handling, or integration with an LLM. |
| **Closing / Bridge** | ❌ Missing | No implication, no segue to a lab, no preview of the next topic (e.g., chaining tools, grounding, evaluation). |

**Overall** – The lecture has **no narrative arc**. It reads as a raw artifact rather than a teaching unit.

---

## 2. Density (Target: 2,500‑3,500 words, 4‑6 paragraphs per core section)  

| Section | Current Content | Target | Gap |
|---------|----------------|--------|-----|
| **Conceptual Core** | 0 paragraphs, 0 key points | 4‑6 paragraphs, 6‑12 key points | Entirely absent |
| **Technical Example** | 0 paragraphs, 0 key points | 2‑3 paragraphs, 5‑8 key points | Absent |
| **Philosophical Reflection** | 0 paragraphs, 0 key points | 2‑3 paragraphs, 5‑8 key points | Absent |
| **Word Count** | ~30 words (JSON) | 2,500‑3,500 | Short by >2,500 words |

**Conclusion** – The lecture does not meet any density requirement.

---

## 3. Interest  

- **Engagement**: A raw JSON object provides no story, no curiosity, and no reason for students to stay for 90 minutes.  
- **Thin/Vague Sections**: All sections are missing; the only “section” is a definition‑first dump.  
- **Opportunities for Hook**:  
  1. Start with a real‑world scenario (e.g., a personal assistant that must fetch up‑to‑date news).  
  2. Pose a provocative question: *“How does an LLM know what to ask the web when it has no built‑in knowledge of today’s events?”*  
  3. Show a failure case where a missing `k` parameter leads to an empty result, creating tension.  

**What to Strengthen**: Build a narrative that moves from *problem* → *design of a tool contract* → *implementation details* → *limitations* → *ethical/philosophical implications*.

---

## 4. Diagram Review  

- **PlantUML blocks**: None present.  
- **Recommendation**: Add at least one diagram to visualise the interaction between the LLM, the “search” tool, and the external web API. Possible diagram types: sequence diagram, component diagram, or data‑flow diagram.  

---

## 5. Recommended Revisions (Prioritized)

1. **Create a Hook (5‑10 minutes)**
   - Open with a short story or demo: “Imagine you ask your AI assistant ‘What’s the latest COVID‑19 case count in Italy?’ and it replies with yesterday’s data. Why? Because it needs a live search tool.”
   - Pose a question that the lecture will answer.

2. **Develop a Conceptual Core (30‑35 minutes)**
   - Explain **function calling** in LLMs: why we need a contract, how JSON schema acts as an interface.
   - Break down each field of the JSON (`name`, `description`, `parameters`, `type`, `properties`, `required`, defaults) and discuss design choices.
   - Introduce **validation** (JSON Schema validation, type safety) and **error handling** (missing required fields, out‑of‑range `k`).
   - Provide 6‑8 bullet‑point key concepts (e.g., “Explicit contracts make LLM behaviour predictable”).

3. **Add a Technical Example (20‑25 minutes)**
   - Walk through a concrete Python (or JavaScript) implementation that registers the `search` tool with an LLM (e.g., OpenAI’s `ChatCompletion` with `functions`).
   - Show a live query: `query="latest Nobel prize winners", k=3`.
   - Demonstrate parsing the LLM’s function call, invoking a real web‑search API (e.g., Bing, SerpAPI), and returning formatted results.
   - Highlight edge cases (empty results, network failure) and how to surface them back to the model.

4. **Insert a Diagram (5‑10 minutes)**
   - **Sequence Diagram**: LLM → Function‑call request → Tool (search API) → Results → LLM → Final answer.
   - Label arrows with “function call JSON”, “search request”, “search response”, “LLM continuation”.
   - Use feedback loop to show how the model can re‑ask if `k` is too low.

5. **Philosophical Reflection (15‑20 minutes)**
   - Discuss **agency vs. tool**: Is the LLM “searching” or merely orchestrating a tool?
   - Explore **trust and epistemic authority**: How do we ensure the model doesn’t hallucinate results even when the tool returns correct data?
   - Raise **ethical concerns**: privacy of queries, bias in search rankings, cost of API calls.
   - End with a forward‑looking question: “What other world‑interacting tools will we need as LLMs become more autonomous?”

6. **Closing / Bridge (5 minutes)**
   - Summarise key take‑aways.
   - Preview the next lecture (e.g., “Chaining multiple tools: search + calculator + memory”).
   - Assign a short lab: implement the `search` function and integrate it with a provided LLM stub.

7. **Word‑Count & Structure Check**
   - Aim for **≈2,800 words** across the three sections.
   - Use **4‑6 paragraphs** for the conceptual core, **2‑3 paragraphs** for the technical example, **2‑3 paragraphs** for the philosophical reflection.

8. **Add Supporting Materials**
   - Provide a downloadable JSON schema file.
   - Include a sample notebook with the implementation.
   - Offer a reading list (e.g., OpenAI function‑calling docs, JSON Schema spec, papers on tool‑use in LLMs).

---

### Bottom Line
The current lecture is a placeholder, not a teaching unit. By inserting a compelling hook, fleshing out the conceptual core, demonstrating a concrete implementation, adding a clear diagram, and reflecting on broader implications, the authors can transform this into a 90‑minute, engaging, and pedagogically sound lecture.