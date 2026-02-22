# Review: 10.6: Scaling — Throughput and Latency

**Source:** part-iv/ch10-architectures-of-intelligence/lecture-06.adoc

---

## Review of Lecture 10.6 – “Scaling — Throughput and Latency”

### Summary
**Grade: C** – The lecture touches the right concepts but falls short of a 90‑minute session. The narrative starts with a reasonable hook, yet the development is a series of definition‑style bullet points rather than a story that builds tension and resolves it. Word‑count is well under the 2 500‑3 500 word target, and several sections are “definition‑first” dumps. The PlantUML diagram is functional but under‑annotated and does not reinforce the trade‑off narrative. Substantial expansion and re‑structuring are required before the material can sustain a full class period.

---

## 1. Narrative Arc  

| Element | Current State | Verdict |
|---------|----------------|---------|
| **Hook** | “More users, more tools, more requests—how does the system hold up?” – a generic problem statement. | **Weak** – it states the problem but lacks a concrete, vivid scenario (e.g., “Your chatbot that handled 10 k‑day‑1 users suddenly stalls when a news‑breaking event drives 5 × traffic”). |
| **Development** | Lists throughput, latency, bottlenecks, then enumerates three scaling strategies. The flow is *definition → list → bullet*. No clear progression from a real‑world incident to profiling → discovery → mitigation → evaluation. | **Missing tension** – the student never sees a “crisis” that forces a decision, nor a step‑by‑step resolution. |
| **Closing / Bridge** | Ends with a philosophical note and a lab prompt. No explicit “what comes next” (e.g., “next we’ll look at cost‑aware autoscaling”). | **Adequate but abrupt** – the bridge to the next lecture is vague. |

**Overall Narrative Verdict:** *Insufficient.* The lecture needs a story‑line that starts with a concrete failure case, walks through profiling, decision‑making, and ends with a measurable improvement and a teaser for the next topic (e.g., cost‑aware scaling or reliability).

---

## 2. Density (Target ≈ 2 500‑3 500 words)

| Section | Approx. Word Count | Target Range | Comments |
|---------|-------------------|--------------|----------|
| Conceptual Core | ~350 w | 1 200‑1 800 w | Too brief; only 4‑5 paragraphs, 8 key points – needs deeper exposition, examples, and mini‑case studies. |
| Technical Example | ~260 w | 800‑1 200 w | Only a single load‑test recipe; should include code snippets, data‑visualisation (latency histograms), and a “what‑if” walk‑through of each scaling technique. |
| Philosophical Reflection | ~260 w | 800‑1 200 w | Mostly high‑level statements; needs richer connections to governance frameworks, concrete sustainability metrics, and stakeholder analysis. |
| **Total** | ~870 w | 2 500‑3 500 w | **Deficit of ~1 600‑2 600 words**. |

**Key‑point density** is within the 5‑8 range, but the *content* per point is minimal. The lecture will run out of material long before 90 minutes.

---

## 3. Interest & Engagement  

| Issue | Why it hurts attention | Suggested fix |
|-------|------------------------|---------------|
| **Definition‑first dump** (e.g., “Throughput is … Latency is …”) | Students tune out when concepts are presented without context. | Start with a live demo (or video) of a chatbot lagging under load; ask “What just happened?” and let students hypothesise before giving definitions. |
| **Lack of concrete numbers** | “50 req/s” feels abstract. | Provide a table of realistic service‑level objectives (SLOs) for different product tiers (consumer vs. enterprise). |
| **No visual tension** | No visual of a bottleneck “spike”. | Show a real latency‑vs‑concurrency graph that spikes dramatically when a particular tool becomes the bottleneck. |
| **Missing decision point** | Students never see a trade‑off choice. | Pose a scenario: “You can cache 80 % of queries but cache invalidation costs 200 ms. Do you enable it?” Walk through the calculation. |
| **Lab is mentioned only at the end** | No sense of “why we need to do this now”. | Interleave mini‑exercises: after profiling, have students annotate a sample trace, then immediately discuss mitigation. |
| **Philosophical reflection feels detached** | No tie‑back to the concrete system they just built. | Frame the reflection as a “post‑mortem” after the lab: “What does the energy bill tell us about our scaling choices?” |

---

## 4. Diagram Review (PlantUML)

**Current Diagram** – a linear flowchart with a cache‑hit decision, LLM call, optional parallel tool calls, assembly, cache store, and throughput counter.

| Issue | Impact on Narrative | Concrete Improvement |
|-------|---------------------|----------------------|
| **No explicit bottleneck identification** | The diagram never shows where profiling feeds back into the decision to cache/parallelize. | Add a “Profile → Identify Bottleneck” box feeding into a decision node that selects *Caching*, *Parallelism*, or *Batching*. |
| **Parallel tool calls are a single block** | Hides the concurrency aspect. | Split into a fork‑join pattern: `fork` → *Tool A*, *Tool B*, … → `join`. Label the fork with “Spawn N parallel calls”. |
| **Latency measurement is only a note** | Does not illustrate where latency is logged per component. | Attach a “Latency Logger” activity to each component (LLM, each tool) with arrows feeding into a “Latency Dashboard”. |
| **Throughput counter is at the very end** | Misses the idea of a real‑time throughput monitor that can trigger autoscaling. | Add a feedback arrow from “Throughput counter” back to a “Scale‑out decision” box (e.g., “if req/s > threshold → spin up worker”). |
| **Cache key generation is omitted** | Students may not understand why prompts are hashed. | Insert a “Generate Cache Key (prompt hash + tool inputs)” step before the cache lookup. |
| **Stylistic** | Sketchy‑outline theme is fine, but missing labels on arrows (e.g., “hit?”, “miss?”, “store”). | Label each decision arrow (`yes`/`no`) and add a legend for symbols. |

**Revised PlantUML sketch (pseudo‑code)**  

```plantuml
@startuml
skinparam backgroundColor #FDF6E3
title Scaling Flow (Cache, Parallelism, Measurement)

start
:Incoming Request;
:Generate Cache Key;
if (Cache Hit?) then (yes)
  :Return Cached Response;
  note right: p95 latency met
else (no)
  :Profile? (optional) --> [Profile Component Times];
  if (Bottleneck == LLM?) then (yes)
    :Apply Batching;
  else (no)
    if (Bottleneck == Tool?) then (yes)
      :Enable Parallel Calls;
    endif
  endif
  :Send to LLM;
  note right: Log LLM latency
  if (Tool Needed?) then (yes)
    fork
      :Tool A Call;
      note right: Log latency A
    fork
      :Tool B Call;
      note right: Log latency B
    endfork
    :Aggregate Tool Results;
  endif
  :Assemble Response;
  :Store in Cache;
endif
:Return Response;
:Increment Throughput Counter;
if (Throughput > threshold?) then (scale out)
  :Trigger Autoscaler;
endif
stop
@enduml
```

---

## 5. Recommended Revisions (Prioritized)

1. **Rewrite the Hook**  
   - Begin with a vivid, time‑boxed incident (e.g., “During a breaking‑news event, our chatbot’s response time jumped from 0.8 s to 12 s, causing a cascade of user complaints”).  
   - Pose a provocative question: “What would you do to keep the service usable?”

2. **Expand Conceptual Core to 4–5 substantive paragraphs**  
   - Include a short case study (e.g., e‑commerce chatbot vs. internal tool).  
   - Explain *service‑level objectives* (SLOs) and *service‑level indicators* (SLIs) for throughput/latency.  
   - Introduce *queueing theory* basics (M/M/1, utilization) to give a quantitative feel.  

3. **Add a “Decision‑Making” sub‑section**  
   - Walk through profiling → bottleneck identification → selection of scaling strategy (caching, parallelism, batching).  
   - Show a decision matrix (cost vs. latency impact).  

4. **Enrich Technical Example**  
   - Provide a minimal Python/Node snippet that runs a concurrent load test (e.g., `asyncio.gather` or `locust`).  
   - Show sample output (latency histogram, CPU/GPU utilisation).  
   - Demonstrate each scaling technique with before/after numbers.  

5. **Integrate Mini‑Exercises**  
   - After profiling, ask students to annotate a trace diagram.  
   - After each mitigation, have them compute the new p95 latency and discuss trade‑offs.  

6. **Deepen Philosophical Reflection**  
   - Cite concrete sustainability metrics (kWh per inference, carbon‑equivalent).  
   - Link to NIST AI RMF sections on “Resource Management”.  
   - Provide a stakeholder table (developers, product owners, ops, end‑users) and ask who should own scaling decisions.  

7. **Bridge to Next Lecture**  
   - End with a teaser: “Next we’ll explore cost‑aware autoscaling and how to embed economic SLOs into the orchestrator.”  

8. **Revise PlantUML Diagram** (as per the sketch above)  
   - Add explicit profiling, decision nodes, fork‑join for parallel tools, latency logging, and autoscaling feedback.  
   - Label all arrows and include a legend.  

9. **Word‑Count Check**  
   - Target ~1 200 w for Conceptual Core, ~1 000 w for Technical Example, ~800 w for Philosophical Reflection.  
   - Use sub‑headings and numbered steps to guide a 90‑minute pacing plan (e.g., 20 min hook + theory, 30 min demo & profiling, 20 min mitigation, 15 min discussion).  

10. **Add Reading & Resources**  
    - Insert specific articles on latency‑aware design (e.g., “Designing Low‑Latency AI Services” – ACM Queue).  
    - Provide links to open‑source load‑testing tools (Locust, k6) and caching libraries (Redis, LRU).  

---

### Closing Note
If the author follows the above roadmap, the lecture will evolve from a terse definition list into a story‑driven, hands‑on session that comfortably fills a 90‑minute class, keeps students engaged, and provides clear scaffolding for the subsequent material.