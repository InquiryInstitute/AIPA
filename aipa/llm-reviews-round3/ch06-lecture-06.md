# Review: python
import time, hashlib
from collections import OrderedDict

class LLMCache:
    def __init__(self, ttl_seconds=86400, maxsize=10_000):
        self.ttl = ttl_seconds
        self.store = OrderedDict()
        self.maxsize = maxsize

    def _make_key(self, prompt, model, **params):
        key_material = f"{model}|{prompt}|{sorted(params.items())}"
        return hashlib.sha256(key_material.encode()).hexdigest()

    def get(self, key):
        entry = self.store.get(key)
        if entry and (time.time() - entry['ts'] < self.ttl):
            # move to end to reflect recent use (LRU)
            self.store.move_to_end(key)
            return entry['response']
        elif entry:
            # stale entry – remove
            del self.store[key]
        return None

    def set(self, key, response):
        if len(self.store) >= self.maxsize:
            self.store.popitem(last=False)   # evict LRU
        self.store[key] = {'response': response, 'ts': time.time()}

**Source:** part-ii/ch06-language-and-models/lecture-06.adoc

---

## Summary  
**Grade: D** – The lecture consists solely of a raw Python implementation of an LLM cache. It lacks any narrative hook, developmental arc, or concluding reflection, and it falls far short of the 2,500‑3,500‑word target for a 90‑minute session. No diagrams are provided, and the material is presented as a definition‑first dump, which will not sustain student attention for a full class period.

---

## Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | The lecture opens with a code block; there is no concrete scenario (e.g., “Your team just hit the $10 000‑per‑day limit on GPT‑4 calls”) or provocative question to create tension. |
| **Development** | ❌ Missing | No step‑by‑step exposition of the problem (high latency / cost), design choices (TTL, LRU, hashing), or incremental building of the solution. The code is shown without explanation of each method, its trade‑offs, or how it integrates with a larger system. |
| **Closing / Bridge** | ❌ Missing | No summary, implication, or segue to a lab or the next lecture (e.g., “Next we’ll benchmark cache hit rates and explore distributed caching”). |

**Overall Narrative Verdict:** The lecture has **no narrative arc**. It reads like a snippet from a reference manual rather than a teaching session.

---

## Density  

| Section | Expected (words) | Actual | Key‑point count (expected) | Actual |
|---------|-------------------|--------|----------------------------|--------|
| Conceptual Core | 4‑6 paragraphs / 2,500‑3,500 words | 0 paragraphs / ~120 words (code comments) | 6‑12 | 0 |
| Technical Example | 2‑3 paragraphs / 5‑8 key points | 0 paragraphs / 0 key points | 5‑8 | 0 |
| Philosophical Reflection | 2‑3 paragraphs / 5‑8 key points | 0 paragraphs / 0 key points | 5‑8 | 0 |

**Verdict:** The lecture is **dramatically under‑dense**; it provides none of the required textual exposition or key‑point scaffolding.

---

## Interest  

- **Engagement:** A 90‑minute class cannot be sustained by a single code listing. Students will quickly lose focus.  
- **Thin/Vague Sections:** All sections are missing; there is no context, no “why does this matter?”, and no real‑world example to keep curiosity alive.  
- **Definition‑first:** The code is presented before any problem statement, violating the “hook‑first” principle.

**Suggested ways to add interest:**  
1. Begin with a story (“The research team’s demo crashed because the LLM API throttled after 500 requests”).  
2. Pose a question: “How can we guarantee sub‑second response times while keeping API costs under $100 a day?”  
3. Use live demo: run a request, show latency, then show the cache in action.  
4. Interleave short think‑pair‑share activities (“What could go wrong if the TTL is too long?”).  
5. End with a forward‑looking challenge (“Implement a distributed version of this cache for a multi‑node inference service”).

---

## Diagram Review  

No PlantUML blocks are present. A visual aid is essential for this topic.

**Recommended diagrams:**  

| Diagram | Purpose | Suggested Elements |
|---------|---------|---------------------|
| **Cache Lookup Flow** | Shows the decision path: check key → hit? → return response → miss? → call LLM → store → return | - Start node “Receive Prompt” <br> - Decision diamond “Key in store & fresh?” <br> - Arrow to “Return cached response” (hit) <br> - Arrow to “Call LLM” (miss) <br> - Action “Store result (hash, TTL)” <br> - Loop back to “Return response” |
| **LRU Eviction Process** | Visualises how the oldest entry is removed when `maxsize` is exceeded | - Queue of entries ordered by recent use <br> - Arrow “Add new entry” pushes to tail <br> - Condition “size > maxsize?” → “Evict head (LRU)” |
| **System Architecture** | Places the cache in the broader AI pipeline (frontend → cache → LLM API → DB) | - Boxes for “User Interface”, “Cache Service”, “LLM Provider”, “Persistence Layer” <br> - Arrows showing request/response flow <br> - Labels for latency and cost at each hop |

---

## Recommended Revisions  

1. **Add a Hook (high priority)**  
   - Open with a 2‑minute anecdote or a provocative question about cost/latency of LLM calls.  
   - Show a live or simulated example of a slow, expensive request.

2. **Develop a Structured Narrative**  
   - **Problem Statement** (5‑7 paragraphs): Explain why caching matters for LLM‑driven applications (cost, rate limits, latency).  
   - **Design Goals** (3‑5 key points): TTL, size limit, LRU eviction, hash‑based keys, thread‑safety.  
   - **Solution Walk‑through** (6‑8 paragraphs): Introduce the `LLMCache` class line‑by‑line, linking each method to a design goal.  
   - **Limitations & Extensions** (2‑3 paragraphs): Discuss cache staleness, hash collisions, distributed caches, security concerns.

3. **Expand Technical Example**  
   - Provide a complete runnable script that: (a) makes a mock LLM call (sleep + dummy text), (b) caches the result, (c) demonstrates hit/miss and eviction.  
   - Include at least 5 key points (e.g., “Hashing ensures deterministic keys”, “TTL prevents stale answers”, “OrderedDict implements LRU”, “popitem(last=False) evicts oldest”, “move_to_end updates usage”).

4. **Insert Philosophical Reflection**  
   - Prompt students to consider: “What does caching imply about the nature of knowledge in AI systems?” <br> - Discuss trade‑offs between freshness and efficiency, and ethical implications of serving outdated model outputs.

5. **Create PlantUML Diagrams** (as listed above) and embed them after the corresponding explanatory paragraphs. Ensure each diagram has clear labels, directional arrows, and a caption that ties back to the narrative.

6. **Word‑Count & Key‑Point Targets**  
   - Aim for **≈2,800 words** total across the three sections.  
   - Provide **6‑8 bullet‑point summaries** at the end of each major section for quick review.

7. **Pedagogical Enhancements**  
   - Insert **think‑pair‑share** prompts after the problem statement and after the design goals.  
   - Add a **mini‑lab** (15‑20 min) where students modify the cache to support async calls or a Redis backend.  
   - Conclude with a **bridge** to the next lecture (e.g., “Next: Distributed caching strategies for large‑scale LLM services”).

Implement these revisions to transform the lecture from a bare code dump into a compelling, 90‑minute learning experience.