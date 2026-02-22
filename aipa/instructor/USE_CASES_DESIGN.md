# Use Cases: Real-World Applications Through the Textbook

This document explores introducing **8 capstone use cases** in Chapter 2, which students select and follow through the entire textbook. Each use case would be grounded in real-world data and APIs where possible.

---

## 1. Design Rationale

**Current state**: Examples (hiring algorithms, loan approval, medical diagnosis, recommendation systems) are scattered as illustrations. Students define capstone problems late (Ch12) without a coherent thread.

**Proposed**: Introduce 8 well-defined use cases in Ch2. Each student (or team) selects one at the outset. Lectures, labs, and examples in every chapter reference these use cases. By Ch12, the capstone is *customizing* the chosen use case, not inventing from scratch.

**Benefits**:
- **Coherence**: "Apply this to your use case" replaces generic examples
- **Real data**: Use cases chosen for accessible APIs and datasets
- **Threaded narrative**: Search (Ch3), memory (Ch7), reasoning (Ch8), agent (Ch9) all make sense in the context of *your* domain
- **Reduced scope creep**: Bounded problem space; students deepen rather than broaden

### 1.1 Current scope

- Use cases are introduced in Ch2 (lecture-use-cases.adoc); students choose one by end of Ch2.
- Ch12 capstone customizes the chosen use case (problem, agent, thesis, presentation).
- Ch3–Ch11 use generic or chapter-specific examples unless otherwise noted; instructors may add "apply to your use case" prompts per chapter.

---

## 2. Proposed Use Cases (8)

| # | Use Case | Domain | Real Data / APIs | Agent Role |
|---|----------|--------|------------------|------------|
| 1 | **Literature Explorer** | Academia | Semantic Scholar API, OpenAlex, PubMed; arXiv | Search, summarize, cite; RAG over papers |
| 2 | **Local Business Assistant** | Commerce | Yelp API, Google Places; municipal open data | Recommend, answer questions, route/plan |
| 3 | **Regulatory Compliance Navigator** | Legal/Gov | eCFR, state regs (often downloadable); NIST | Retrieve, interpret, check compliance |
| 4 | **Clinical Evidence Summarizer** | Healthcare | PubMed, Cochrane; clinical guidelines (open) | Retrieve, summarize, cite evidence |
| 5 | **Course Design Assistant** | Education | OER Commons, curriculum standards (CC) | Recommend resources, align to standards |
| 6 | **Civic Issue Tracker** | Civic Tech | City council agendas, 311 data, LegiScan | Track issues, summarize, notify |
| 7 | **Sustainability Advisor** | Environment | EPA APIs, Energy Star; open emissions data | Compare products, advise on footprint |
| 8 | **Patent Prior Art Assistant** | IP/Legal | USPTO Open Data, Google Patents (limited) | Search, summarize, compare claims |

**Criteria for inclusion**:
- Public or low-friction API / dataset
- Clear agent task: search, retrieve, reason, recommend
- Relevant to diverse student interests (academia, commerce, civic, health, etc.)
- Bounded scope: can be implemented with 12 tools

---

## 3. Real-World Data and APIs

| Use Case | Data Sources | API / Access | Notes |
|----------|--------------|--------------|-------|
| Literature Explorer | Papers, citations | Semantic Scholar (free, key), OpenAlex (free), PubMed (free) | Strong fit; well-documented |
| Local Business Assistant | Businesses, reviews | Yelp Fusion (free tier), Google Places (quota) | Rate limits; fallback: mock data |
| Regulatory Navigator | Federal/state regs | eCFR (bulk XML), RegEx, state sites | eCFR bulk download; parsing needed |
| Clinical Evidence | Medical literature | PubMed E-utilities (free), Cochrane (summaries) | HIPAA-safe; evidence synthesis |
| Course Design | OER, standards | OER Commons API, state standards (varies) | Some APIs limited; CC-licensed content |
| Civic Issue Tracker | Agendas, 311, bills | LegiScan (limited free), city open data portals | City-specific; SF, NYC, etc. have APIs |
| Sustainability Advisor | EPA, Energy Star | EPA APIs (air, water, toxics), Energy Star (data files) | Good coverage; product data trickier |
| Patent Prior Art | USPTO, patents | USPTO bulk data, PatentsView API | Large datasets; subset for demos |

**Strategy**: Provide starter datasets or API wrappers in `aipa/use-cases/` so students can run end-to-end without wrestling with API auth on day one. Full API integration is a lab or capstone extension.

---

## 4. Chapter 2 Integration

**Where**: New lecture or expanded section early in Ch2 (e.g., after 2.1 or as 2.2), titled something like "Capstone Use Cases: Choose Your Domain."

**Content**:
- Present all 8 use cases with 1–2 paragraph descriptions
- For each: domain, primary task, stakeholders, data sources, ethical/regulatory notes
- **Selection exercise**: Students submit their choice (or team choice) by end of Ch2
- **Running example**: "In the lectures ahead, we'll refer to these use cases. When you see 'apply to your use case,' use your selected domain."

**Deliverable**: A short "Use Case Brief" — 1 page: choice, rationale, initial data source, success criteria. Becomes the seed for Ch12 problem definition.

---

## 5. Threading Through Chapters

| Chapter | How Use Cases Appear |
|---------|----------------------|
| **Ch1** | Knowledge graph: model your domain's entities (papers, businesses, regs, etc.) |
| **Ch2** | Audit: inventory a real system in your domain; trace compliance/data flow |
| **Ch3** | Search: state space for your domain (e.g., paper citation graph, regulation hierarchy) |
| **Ch4** | ML: train a classifier relevant to your domain (e.g., paper vs. not, compliant vs. not) |
| **Ch5** | Neural: classify or embed your domain objects |
| **Ch6** | LLM: prompts for your domain (summarize, recommend, cite) |
| **Ch7** | Memory/RAG: index your domain corpus; retrieve for answers |
| **Ch8** | Reasoning: logic/probability for your domain (e.g., compliance rules, evidence chains) |
| **Ch9** | Agent: tool-calling for your use case (search, retrieve, summarize) |
| **Ch10** | Orchestrator: wire tools for your workflow |
| **Ch11** | Governance: policies for your domain (bias, fairness, transparency) |
| **Ch12** | Capstone: integrate, evaluate, deploy *your* use case |

**Example prompts per chapter** (illustrative):
- Ch3: "Formulate your use case as a state space. What are states, actions, goals?"
- Ch7: "What would you index for RAG in your use case? What chunking strategy?"
- Ch9: "What tools does your agent need? Map them to your use case."

---

## 6. Implementation Options

### Option A: Use Case Appendix
- Add `front-matter/use-cases.adoc` or `part-i/ch02-ai-in-practice/use-cases.adoc`
- 8 subsections, one per use case
- Referenced from Ch2 index; linked from Ch12

### Option B: Integrated Lecture
- New lecture 2.2: "Capstone Use Cases"
- Full treatment in one place; later chapters cite it

### Option C: Sidebar / Callout Pattern
- Each chapter has a "Your Use Case" callout or sidebar
- "Apply to [Literature Explorer | Local Business | …]: …"

### Option D: Separate Use Case Repo
- `aipa/use-cases/` with per-use-case README, sample data, API wrappers
- Labs can clone or link; Ch2 directs students there

**Recommendation**: Combine B + D — one Ch2 lecture for selection and overview; `use-cases/` repo or folder with starter data and API notes.

---

## 7. Open Questions

1. **Team size**: Use cases for individuals or teams? (Affects complexity.)
2. **Switching**: Can students change use case mid-course, or is lock-in at Ch2 too early?
3. **Data licensing**: Ensure all sources are usable for course projects (no ToS violations).
4. **Instructor load**: Maintaining 8 use-case examples across 12 chapters — templates vs. full custom content.
5. **Assessment**: Rubric per use case, or one rubric with use-case-agnostic criteria?

---

## 8. Next Steps

- [ ] Validate use cases with instructors (coverage, API availability)
- [ ] Draft Ch2 "Capstone Use Cases" lecture
- [ ] Create `use-cases/` skeleton with one full example (e.g., Literature Explorer)
- [ ] Add "Apply to your use case" prompts to 2–3 chapters as pilot
- [ ] Update Ch12 problem definition to reference use case selection
