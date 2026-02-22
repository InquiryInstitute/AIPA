# Review: 10.6: Scaling — Throughput and Latency

**Source:** part-iv/ch10-architectures-of-intelligence/lecture-06.adoc

---

## Review of Lecture 10.6 – *Scaling: Throughput and Latency*

### Summary  
**Grade: B‑**  
The lecture hits the required structural targets (4 ≈ 6 core paragraphs, 6‑12 key points per section) and the content is technically correct. However, the narrative arc leans on definition‑first exposition, the word‑count falls short of the 2 500‑3 500 word window, and the hook is only mildly engaging. With a stronger opening scenario, a few richer examples, and a tightened diagram, the lecture would comfortably fill a 90‑minute slot and keep students’ attention.

---

## 1. Narrative Arc  

| Element | Evaluation | Verdict |
|---------|------------|---------|
| **Hook** | Starts with “More users, more tools, more requests—how does the system hold up?” – a generic question, not a concrete, tension‑filled scenario. | **Weak** – needs a vivid incident (e.g., a real‑world outage or a “Black Friday” traffic spike) that forces the audience to care immediately. |
| **Development** | Logical progression: throughput ↔ latency → bottlenecks → scaling strategies. The flow is clear but each sub‑section is presented as a list of definitions before any problem‑solving narrative. | **Adequate** – the stepwise logic is present, but the “problem → response → limit” pattern could be sharpened by embedding mini‑case studies (e.g., “When the cache missed, latency jumped from 0.8 s to 4.2 s”). |
| **Closing / Bridge** | Ends with a brief statement that the next lecture ties the full stack together and a reminder to document scaling limits. | **Sufficient** – a clearer “so‑what” (e.g., “Now you can decide whether to scale vertically, horizontally, or both before you ship”) would give a stronger forward motion. |

**Overall Verdict:** The arc is present but under‑dramatised. Replace the opening question with a concrete incident, sprinkle short “what‑went‑wrong” anecdotes throughout, and finish with an explicit call‑to‑action that previews the next lecture’s focus on deployment patterns.

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Paragraphs | Key‑point items | Approx. word count* |
|---------|------------|----------------|---------------------|
| Conceptual Core | 4 | 8 | ~1 200 |
| Technical Example | 2 (plus bullet list) | 6 | ~800 |
| Philosophical Reflection | 2 | 6 | ~600 |
| **Total** | 8 | 20 | **≈ 2 600** |

\*Word count estimated from the supplied text; the actual total is likely **≈ 2 300‑2 500** words, a bit below the lower bound of the 2 500‑3 500 range.  

**Action:** Add roughly 300‑500 words distributed across the three sections—e.g., a short “real‑world case study” in the Conceptual Core, a deeper “batch‑vs‑parallel” comparison in the Technical Example, and a concrete sustainability metric (kWh per request) in the Philosophical Reflection.

---

## 3. Interest (Engagement)

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first style** (e.g., “Throughput is … Latency is …”) | Students hear a lecture‑style dump before seeing why it matters. | Start each definition with a *problem* (“When 10 k users hit the endpoint simultaneously, the response time spikes to 12 s – that’s latency”). |
| **Thin examples** | Only a generic load‑test is described; no vivid numbers or screenshots. | Insert a concrete experiment: “We sent 1 000 concurrent requests to a GPT‑4‑backed agent; p95 latency rose from 1.2 s to 8.4 s. After enabling a 95 % cache‑hit policy, latency fell back to 2.1 s.” |
| **Lack of interactive moments** | No prompts for quick polls or think‑pair‑share. | Add a “quick poll” after the bottleneck section: “Which component do you think will be the bottleneck in a 5‑tool orchestrator? (LLM / Network / Tool API)”. |
| **Missing forward‑looking tension** | The closing paragraph merely says “next lecture ties the full stack together.” | Pose a provocative question: “If you could only double one resource—CPU, GPU, or network bandwidth—where would you invest to halve latency?” – then hint that the next lecture will answer it. |

---

## 4. Diagram Review (PlantUML)

**Current diagram** – a linear flow: *Incoming Request → Cache? → LLM → (Tool?) → Assemble → Store → Return*. It captures the basic path but misses several pedagogical opportunities.

| Issue | Recommendation |
|-------|-----------------|
| **No explicit latency/throughput metrics** | Add notes or small boxes showing where latency is measured (e.g., “Log TTFT” after LLM) and where throughput counters are incremented (after “Return Response”). |
| **Missing feedback loops** | Show a loop from “Return Response” back to a “Metrics Dashboard” that can trigger scaling actions (e.g., “If req/s > 80 % of capacity → spin up replica”). |
| **Parallel tool calls are implied but not visualised** | Replace the single “Parallel Tool Calls” activity with a fork‑join construct: `fork → Tool A / Tool B / … → join`. |
| **Cache invalidation not represented** | Add a decision diamond after “Store in Cache” → “Invalidate? (model update / TTL)”. |
| **No representation of horizontal scaling** | Include a side‑box “Horizontal Replicas” with an arrow feeding into “Incoming Request” (load‑balancer). |
| **Stylistic** | Use `skinparam ArrowColor DarkGray` for clarity, label arrows with “fast path” / “slow path”, and give the diagram a title “Runtime scaling path (cache → LLM → tools)”. |

**Revised PlantUML sketch (conceptual):**

```plantuml
@startuml
title Runtime scaling path
skinparam backgroundColor #FDF6E3
skinparam ArrowColor DarkGray

start
:Incoming Request;
if (Cache Hit?) then (yes)
  :Return Cached Response;
  note right: p95 latency ✅
  stop
else (no)
  :Log start time;
  :Send to LLM;
  note right: latency logger (TTFT)
  if (Tool Needed?) then (yes)
    fork
      :Tool A Call;
    fork
      :Tool B Call;
    fork
      :Tool C Call;
    join
    note right: Parallelism / Batching
  endif
  :Assemble Response;
  :Store in Cache;
  if (Model updated?) then (yes)
    :Invalidate Cache Entry;
  endif
endif
:Return Response;
note right: Throughput counter (req/s)
stop
@enduml
```

---

## 5. Recommended Revisions (Prioritized)

1. **Rewrite the Hook**  
   - Begin with a short, vivid incident (e.g., “During a product launch, the orchestrator crashed when 12 k users hit the chat endpoint simultaneously”). Pose a concrete question: “How could we have prevented that?”  

2. **Inject Mini‑Case Studies**  
   - After each core definition (throughput, latency, bottleneck), add a 2‑sentence real‑world example with numbers and a screenshot of a monitoring chart.  

3. **Expand Word Count**  
   - Add ~400 words: a deeper discussion of *batching vs. parallelism* (pros/cons, when to choose each), a sustainability sidebar (kWh per request, carbon‑footprint calculators), and a brief “Scaling in the wild” paragraph referencing a known outage (e.g., OpenAI API throttling incident).  

4. **Add Interactive Elements**  
   - Insert 2‑3 quick polls or think‑pair‑share prompts (e.g., “Which scaling strategy would you try first on a budget‑constrained startup?”).  

5. **Strengthen Closing / Bridge**  
   - End with a forward‑looking challenge: “In the next lecture we’ll decide whether to add more GPU nodes or to redesign the orchestrator for better parallelism. Which path will you take?”  

6. **Revise PlantUML Diagram**  
   - Implement the fork‑join for parallel tool calls, add cache‑invalidation decision, show metrics logging, and optionally a load‑balancer box for horizontal scaling.  

7. **Polish Key‑Point Lists**  
   - Ensure each bullet starts with an action verb and ties back to a narrative question (e.g., “*Measure* latency distribution (p50, p95, p99) under load”).  

8. **Cross‑Reference Lab**  
   - Explicitly link the lab activities to the concepts introduced (e.g., “Lab 3’s cache‑hit‑ratio monitor directly implements the caching strategy discussed above”).  

---

Implementing these changes will transform Lecture 10.6 from a solid technical overview into a compelling, story‑driven session that comfortably occupies a 90‑minute class, keeps students engaged, and provides clear scaffolding for the subsequent material.