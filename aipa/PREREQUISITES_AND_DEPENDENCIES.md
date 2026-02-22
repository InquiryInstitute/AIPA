# AIPA Prerequisites and Dependencies

Topics students need to know that are **outside the scope** of this book. The book assumes or references these; it does not teach them.

**Recommended entry:** Bachelor's degree or equivalent. **CS or technical background is not required.** Non-CS and non-technical students are supported: the curriculum is designed so they can succeed with the AI Tutor. For full program-level entry requirements, see [curriculum/MSc_PROGRAM_SPEC.md](curriculum/MSc_PROGRAM_SPEC.md).

**The AI Tutor will ensure coverage of these topics.** This list defines what the AI Tutor must be able to teach—so students (including those without a technical background) can fill gaps on demand rather than rely solely on external resources.

## Purpose

- **AI Tutor scope**: Topics the AI Tutor is responsible for teaching when students ask
- **Instructors**: Identify prep modules, prerequisite courses, or external pointers

---

## Foundations (referenced throughout)

| Topic | Where used | Notes |
|-------|------------|-------|
| **AIMA fundamentals** | Search (Ch3), reasoning (Ch8), agents (Ch9) | Terms like *agent*, *rational agent*, *search*, *state space*, *heuristic*, *Bayesian network* are marked for AIMA reference. Book assumes readers can look up definitions. |
| **Basic linear algebra** | Neural nets (Ch5), embeddings (Ch6, Ch7) | Vectors, dot product, matrix multiply. Preface lists this. |
| **Introductory probability** | Reasoning (Ch8) | Bayes' rule, conditional probability. Preface lists this. |
| **Python** | All labs | Preferred language. Basic syntax, packages, virtual environments. Preface lists this. |

---

## Infrastructure & Tooling

| Topic | Where used | Notes |
|-------|------------|-------|
| **OAuth** | API integration (Ch10), auth for external services | Setting up OAuth flows (client credentials, authorization code). Not taught. |
| **Supabase** | Optional backend for memory, auth, storage | Some labs may use Supabase; setup is external. |
| **Docker** | Deployment (Ch12), running tool servers | Containerization, docker-compose. Book mentions but does not teach. |
| **Git / GitHub Classroom** | All labs | Version control, submodules, repo structure. Assumed. |
| **REST APIs** | Ch10 (API integration), tool protocol | HTTP, JSON, endpoints. Used but not taught from scratch. |

---

## ML / Data Science Stack

| Topic | Where used | Notes |
|-------|------------|-------|
| **PyTorch or TensorFlow** | Ch5 (neural nets), Ch6 (embeddings) | Framework basics. Book uses concepts; implementation details vary. |
| **Vector DBs (Chroma, FAISS, Pinecone)** | Ch7 (memory) | Setup, indexing, querying. Labs choose backend; setup is external. |
| **Scikit-learn** | Ch4 (ML trainer) | Fit, predict, metrics. Assumed familiarity. |
| **Data preprocessing (pandas, etc.)** | Ch4 | Loading, cleaning, feature engineering. Assumed. |

---

## Agent & Protocol Stack

| Topic | Where used | Notes |
|-------|------------|-------|
| **MCP (Model Context Protocol)** | Tool protocol (Ch9, Ch10) | Tool discovery, invocation. Book describes concept; implementation may use MCP or similar. |
| **LLM APIs (OpenAI, Anthropic, etc.)** | Ch6, Ch9 | API keys, rate limits, billing. Setup is external. |
| **Embedding models** | Ch6, Ch7 | OpenAI, Cohere, local models. Choice and setup external. |

---

## Security & Governance

| Topic | Where used | Notes |
|-------|------------|-------|
| **API keys, secrets management** | Throughout | `.env`, Vault, etc. Not taught. |
| **Input validation, sanitization** | Ch11 (governance), Ch12 (deployment) | Security basics. Referenced, not covered in depth. |
| **Rate limiting** | Ch10, Ch11 | Implementation details external. |

---

## Suggested Resources (placeholder)

*Add links as you identify good tutorials:*

- **AIMA**: https://aima.cs.berkeley.edu/
- **OAuth 2.0**: [add resource]
- **Supabase**: https://supabase.com/docs
- **Docker**: [add resource]
- **MCP**: [add resource]

---

## Maintenance

When adding content that assumes external knowledge, add it here. Tag with chapter for traceability. These topics become part of the **AI Tutor's teaching scope**—ensure the tutor can cover them. Optionally add a "Suggested resource" link for reference.
