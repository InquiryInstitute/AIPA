---
theme: default
title: Memory Updates, Eviction, and Consistency
style: |
  .aima-tag { font-size: 0.65em; color: #888; vertical-align: super; margin-left: 0.15em; }
---

# Memory Updates, Eviction, and Consistency

> "Forgetting is also a form of memory."
> — Freud (adapted)


---
layout: default
---

# Conceptual Core

- Updates: add, modify, delete
- Eviction: LRU, importance
- Consistency: refresh index

---
layout: default
---

# Conceptual Core (continued)

- Versioning
- Forgetting = selective retention

---
layout: default
---

# Technical Example

- Update: delete old, add new
- Eviction policy
- Lab 3: Updates in memory tool

---
layout: default
---

# Philosophical Reflection

- Eviction = governance
- Selective retention
- Curation, not comprehensiveness
.Figure 7.5: Memory lifecycle
[plantuml,ch07-l05,png,theme=sketchy-outline]
....
@startuml
start
:Add;
:Update;
:Evict;
:Refresh Index;
stop
@enduml
....

---
layout: default
---

# Discussion Prompts

- What should the agent forget?
- Who decides eviction policy?
- Is "forgetting" a bug or a feature?

---
layout: default
---

# Diagram

```mermaid
flowchart LR
  ADD[Add] --> UPDATE[Update] --> EVICT[Evict]
  UPDATE --> REFRESH[Refresh Index]
```

---
layout: default
---

# Lab Prep

- Lab 3: add, update, delete
- Eviction
- Index consistency

---
layout: center
---

# Questions?
