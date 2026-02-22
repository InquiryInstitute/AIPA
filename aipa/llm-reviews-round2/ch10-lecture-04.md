# Review: 10.4: API Integration — REST, Authentication

**Source:** part-iv/ch10-architectures-of-intelligence/lecture-04.adoc

---

## Review of Lecture 10.4 – “API Integration — REST, Authentication”

### Summary  
**Grade: C** – The lecture has a clear hook and a logical progression, but it falls far short of the 2 500‑3 500‑word target for a 90‑minute session, and several sections are definition‑heavy or too terse to sustain engagement. The narrative arc is present, but the density and interest levels need substantial bolstering. The PlantUML diagram is functional but under‑annotated.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with a vivid “autonomous personal assistant” scenario that raises concrete tension (need to reach external services without human help). | ✅ Strong |
| **Development** | Moves from REST basics → authentication → operational concerns → ecosystem → brittleness, each building on the previous idea. The philosophical reflection ties back to the hook and previews the next lecture. | ✅ Good, but the step‑by‑step reasoning is sometimes reduced to bullet‑style definitions rather than a story of a problem being solved. |
| **Closing / Bridge** | Ends with a forward‑looking statement about the orchestrator and Lab 3, giving a clear next step. | ✅ Effective |
| **Overall Arc** | The lecture follows a classic “problem → solution → limitation → next‑step” arc, but the **problem** (API failure) is not dramatized enough throughout the body. | ⚠️ Needs more tension‑building (e.g., a “live‑demo” failure narrative). |

**Verdict:** The arc is present but could be tightened by weaving a single running example (e.g., the assistant scheduling a meeting) through every subsection, rather than resetting the focus each time.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. Paragraphs | Approx. Key Points | Word Count (est.) |
|---------|-------------------|-------------------|-------------------|
| Conceptual Core | 5 | 8 | ~350 |
| Technical Example | 2 | 6 | ~150 |
| Philosophical Reflection | 2 | 4 | ~180 |
| Epigraph, Prompts, Discussion, Lab Prep, Reading | 6 | 10 | ~300 |
| **Total** | **15** | **28** | **≈ 1 000 words** |

**Assessment:** The lecture is **~1 000 words**, roughly **⅓** of the required length. To fill a 90‑minute slot you need **≈ 2 500‑3 500 words**, i.e., **2‑3×** the current material.

---

## 3. Interest  

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dumps** (e.g., “REST fundamentals define a uniform interface…”) | Learners hear a list of facts before seeing why they matter. | Re‑frame each definition as a response to a concrete failure (e.g., “When the assistant receives a 429, why does the HTTP verb matter?”). |
| **Thin technical example** (single 15‑line Python snippet) | No narrative of debugging, no variation of failure modes. | Expand the example: show a failing call, log the back‑off, then refactor into a reusable “API client” class. Include a short “walk‑through” of the call stack. |
| **Philosophical reflection is short** | Limited time for students to contemplate the ethical dimension. | Add a mini‑case study (e.g., a data‑privacy breach caused by an outdated API version) and ask students to discuss governance policies. |
| **Lack of interactive moments** | 90 min needs at least 2‑3 active checkpoints. | Insert “Think‑Pair‑Share” after the conceptual core (identify three risks in a given API spec) and a quick live‑coding demo of handling a 429. |
| **Missing visual reinforcement** | Only one simple diagram; no flow of tokens, no observability. | Add a second diagram showing OAuth token exchange and a third showing logging/tracing flow. |

---

## 4. Diagram Review  

**Current PlantUML (Diagram 1)**  

```
component Agent
component "Orchestrator\n(tool server)" as Orchestrator
component "External API\n[Auth, Rate‑limit]" as API

Agent --> Orchestrator : request (GET/POST)
Orchestrator --> API : call (Auth header)
API --> Orchestrator : response (JSON)
Orchestrator --> Agent : result

alt error 429 / 5xx
    Orchestrator --> Orchestrator : exponential back‑off & retry
end
```

| Aspect | Evaluation | Suggested Improvement |
|--------|------------|-----------------------|
| **Alignment with narrative** | Shows the basic request‑response loop and retry, matching the technical example. | Add a **token acquisition** sub‑flow (Agent → Orchestrator → Auth Server → Orchestrator) to illustrate OAuth. |
| **Labels / Clarity** | “Auth header” is vague; error loop is unlabeled on the diagram. | Label the header with `Bearer <token>`. Add a note on the retry arrow: “back‑off (2ⁿ s)”. |
| **Feedback loops** | Only one loop (retry). | Add a **observability loop**: Orchestrator → Logger → Orchestrator (log request ID, latency). |
| **Stylistic** | Sketchy outline is fine for a lecture, but the components are cramped. | Use `skinparam componentBorderColor DarkBlue` and `skinparam ArrowColor DarkGray` for better contrast. |
| **Missing actors** | No representation of the **OAuth Authorization Server** or **Rate‑limit monitor**. | Introduce a small “Auth Server” component and a “Rate‑limit Service” component, with dashed arrows indicating policy checks. |

---

## 5. Recommended Revisions  

**Priority 1 – Expand Core Content (≥ 1 500 words)**  
1. **Thread a single running example** (the personal‑assistant meeting scheduler) through every subsection:  
   - REST: show the exact endpoint (`POST /calendars/{id}/events`).  
   - Authentication: walk through OAuth “Authorization Code” exchange with screenshots.  
   - Rate‑limit: present a realistic limit (e.g., 10 req/s) and show the agent hitting it.  
2. **Add a “Failure Narrative”**: start the technical example with a failed call, then iteratively improve it (add back‑off, add retry limit, add structured exception).  

**Priority 2 – Increase Interactivity & Reflection**  
1. Insert **two short in‑class activities** (5‑10 min each):  
   - *Risk Identification*: students list three brittleness risks for a given API spec.  
   - *Live Debug*: run the Python snippet, force a 429, and ask students to propose a fix.  
2. Expand the **Philosophical Reflection** with a 300‑word case study on “API deprecation and user trust”.  

**Priority 3 – Enrich Diagrams**  
1. Create **Diagram 1‑A** (OAuth token flow) and **Diagram 1‑B** (Observability & logging).  
2. Add explicit labels (`Bearer token`, `Retry count`, `Request‑ID`) and use different arrow styles (solid for data, dashed for control).  

**Priority 4 – Flesh Out Technical Example**  
1. Break the snippet into **three code blocks**: (a) raw request, (b) retry wrapper, (c) integration into the orchestrator’s tool‑server interface.  
2. Provide a **minimal test harness** (pytest) that simulates 429 responses with `responses` library.  

**Priority 5 – Word‑Count Boost**  
1. Add a **“Common REST Pitfalls”** subsection (e.g., misuse of GET for state‑changing actions).  
2. Include a **“Security Checklist”** (10 bullet items) with brief explanations.  
3. Expand **Reading & Resources** with short annotations (why each RFC matters for agents).  

**Priority 6 – Polish Language**  
1. Replace any remaining definition‑first sentences with “problem → solution” phrasing.  
2. Ensure each paragraph ends with a **transition sentence** that points to the next concept.  

---

### Final Note  
If the lecture is expanded to roughly **2 800 words** (≈ 4‑5 pages of dense prose plus the interactive elements) and the diagrams are enriched, it will comfortably fill a 90‑minute slot, keep students engaged, and provide a solid bridge to the upcoming orchestrator lab.