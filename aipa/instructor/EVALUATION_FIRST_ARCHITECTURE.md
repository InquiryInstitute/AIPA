# Design Update: Evaluation-First Architecture

*Artificial Intelligence: A Postmodern Approach* (AIPA)  
MS in AI Curriculum Revision

**See also:** [Generalization-Based Evaluation Framework](GENERALIZATION_EVALUATION_ADDENDUM.md) — prompt families, variation dimensions, reasoning systems vs lookup tables.

---

## 1. Rationale for the Update

The original structure framed AI systems as epistemic infrastructure and focused on building agents capable of participating in knowledge systems.

This update makes explicit that:

**An AI system is only meaningful insofar as its performance can be evaluated.**

Therefore:
- evaluation is not the final step
- evaluation is not grading
- evaluation is the organizing principle of the course

Each student's agent becomes:

> a continuously assessed epistemic participant  
> not a static project artifact

---

## 2. Core Pedagogical Shift

| Previous Model | Updated Model |
|----------------|---------------|
| 1. Learn concept | 1. Define evaluation prompts |
| 2. Build component | 2. Build agent to answer them |
| 3. Integrate system | 3. Improve architecture iteratively |
| 4. Evaluate at end | 4. Measure performance continuously |

This reverses the flow:

**evaluation → design → iteration**

---

## 3. New Course Principle

Every lecture, lab, and assignment exists to improve the agent's ability to answer a defined set of prompts.

Students are no longer graded on:
- homework
- quizzes
- code submissions

They are graded on:

> how well their AI performs on benchmark prompts

---

## 4. Prompt-Centric Learning Framework

Each course begins with:

### A Prompt Set

Prompts represent:
- domain knowledge
- reasoning tasks
- tool use
- synthesis
- judgment

These prompts become:
- the curriculum specification
- the evaluation benchmark
- the design driver

Students immediately see: *"This is what my agent must eventually do."*

---

## 5. Evaluation Layers

### Layer 1 — Functional correctness

Can the agent:
- retrieve information
- invoke tools
- parse data
- follow instructions

Measured by automated tests.

### Layer 2 — Reasoning quality

Does the agent:
- justify claims
- chain reasoning steps
- handle uncertainty
- cite evidence

Measured via rubric scoring or LLM judges.

### Layer 3 — Architectural robustness

Does the agent:
- degrade gracefully
- detect uncertainty
- retry failed calls
- use fallback strategies

Measured through adversarial prompts.

### Layer 4 — Institutional fitness

Does the agent:
- produce traceable outputs
- document reasoning
- respect domain constraints
- communicate clearly

Measured via human review.

---

## 6. Continuous Evaluation Loop

Every lab now follows this cycle:

1. Run evaluation prompts
2. Record agent performance
3. Identify failure modes
4. Modify architecture
5. Re-run evaluation

This turns the course into:
- a research lab
- an engineering sprint
- a performance experiment

simultaneously.

---

## 7. New Structure for Each Chapter

Every chapter now contains:

| Element | Purpose |
|---------|---------|
| **1. Prompt Targets** | What the agent should improve at after this chapter |
| **2. Architectural Intervention** | What system component students will add or modify |
| **3. Evaluation Criteria** | How performance will be measured |
| **4. Iteration Loop** | Instructions for testing and refining |

This makes the book a design manual, not just an instructional text.

---

## 8. Example: Chapter Integration

**Chapter: Retrieval Systems**

| Element | Content |
|---------|---------|
| **Prompt Targets** | answer domain questions with citations; synthesize multiple sources; detect missing knowledge |
| **Intervention** | add vector store; add retrieval logic; add citation formatting |
| **Evaluation** | correctness of answers; citation accuracy; hallucination rate |
| **Iteration** | students refine chunking, ranking, or prompting |

---

## 9. Student Assessment Model

Grades derive from:

| Component | Weight |
|-----------|--------|
| Agent performance on prompt set | 50% |
| Improvement over time | 25% |
| Architecture documentation | 15% |
| Failure analysis reflection | 10% |

This rewards:
- learning
- iteration
- understanding system behavior

not just producing a working artifact.

---

## 10. Infrastructure Requirements

To support this update, the program must provide:
- prompt evaluation harness
- logging system
- reproducible test runs
- performance dashboards

This turns the course into:

> a controlled experimental environment

rather than ad-hoc coding exercises.

---

## 11. Benefits of the Update

This design:
- aligns teaching with real AI development
- teaches empirical reasoning
- reinforces iterative design thinking
- produces deployable agents
- avoids superficial assignments

Most importantly: **Students graduate with evidence their systems work.**

---

## 12. Philosophical Alignment

This update strengthens the book's core thesis.

If AI is epistemic metabolism, then evaluation is:

> the measurement of metabolic health

Without evaluation, the system cannot be said to function.

Thus evaluation becomes not an add-on, but:

> the condition of intelligence itself.

---

## 13. Implementation Timeline

| Phase | Changes |
|-------|---------|
| **Immediate** | Add prompt targets to each chapter; add evaluation loop sections; provide rubric templates |
| **Medium term** | Build automated evaluation harness; develop benchmark prompt library |
| **Long term** | Create shared institutional prompt bank; allow cross-cohort benchmarking |

---

## 14. Final Summary

The update reframes the curriculum from:

**Teaching AI concepts**

to

**Training AI systems under empirical scrutiny**

Students no longer just learn AI. They cultivate an AI that must prove itself.
