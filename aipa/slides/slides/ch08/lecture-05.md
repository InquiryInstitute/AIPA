---
theme: default
title: LLMs and Structured Reasoning
style: |
  .aima-tag { font-size: 0.65em; color: #888; vertical-align: super; margin-left: 0.15em; }
---

# LLMs and Structured Reasoning

> "Chain-of-thought: reasoning as generated text."
> — (LLM reasoning)


---
layout: default
---

# Conceptual Core

- CoT: step-by-step
- Tree of thoughts, self-consistency
- LLM + symbolic: generate, verify

---
layout: default
---

# Conceptual Core (continued)

- Limitations: hallucination, no guarantee
- Simulated vs. actual inference

---
layout: default
---

# Technical Example

- Compare standard vs. CoT
- Parse, verify
- Lab 3: Combine LLM + symbolic

---
layout: default
---

# Philosophical Reflection

- Simulated vs. actual
- Trust when we verify
- LLM = heuristic; symbolic = guarantee
.Figure 8.5: CoT and verification pipeline
[plantuml,ch08-l05,png,theme=sketchy-outline]
....
@startuml
start
:Prompt;
:Chain-of-Thought;
:Verify;
:Result;
stop
@enduml
....

---
layout: default
---

# Discussion Prompts

- When is CoT "real" reasoning?
- How do we verify LLM reasoning?
- What is the role of symbolic verification?

---
layout: default
---

# Diagram

```mermaid
flowchart LR
  PROMPT[Prompt] --> COT[Chain-of-Thought]
  COT --> VERIFY[Verify]
  VERIFY --> RESULT[Result]
```

---
layout: default
---

# Lab Prep

- Lab 3: Combine logic, probability, LLM
- chain_of_thought
- Optional verification

---
layout: center
---

# Questions?
