---
theme: default
title: Sampling and Approximate Inference
style: |
  .aima-tag { font-size: 0.65em; color: #888; vertical-align: super; margin-left: 0.15em; }
---

# Sampling and Approximate Inference

> "Approximate is often good enough—and tractable."
> — (sampling)


---
layout: default
---

# Conceptual Core

- Rejection, importance sampling
- MCMC: Gibbs, Metropolis-Hastings
- Convergence, burn-in

---
layout: default
---

# Conceptual Core (continued)

- Approximation vs. exactness
- Precision vs. computability

---
layout: default
---

# Technical Example

- Gibbs sampling
- Compare: accuracy, time
- Lab 2: Sampling in engine

---
layout: default
---

# Philosophical Reflection

- Epistemic humility
- Satisfice
- Good enough
.Figure 8.4: Sampling (MCMC trace)
[plantuml,ch08-l04,png,theme=sketchy-outline]
....
@startuml
start
:Sample 1;
:Sample 2;
:Sample 3;
:Sample N;
stop
@enduml
....

---
layout: default
---

# Discussion Prompts

- When is approximate inference acceptable?
- How do we know sampling has converged?
- What is the cost of approximation?

---
layout: default
---

# Diagram

```mermaid
flowchart LR
  S1[Sample 1] --> S2[Sample 2] --> S3[Sample 3] --> SN[Sample N]
```

---
layout: default
---

# Lab Prep

- Lab 2: Sampling
- Gibbs or MH
- Fallback when exact is slow

---
layout: center
---

# Questions?
