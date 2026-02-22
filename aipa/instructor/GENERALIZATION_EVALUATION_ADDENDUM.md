# Design Update Addendum: Generalization-Based Evaluation Framework

MS AI Curriculum

---

## 1. Core Principle

The agent is never evaluated on the exact prompts it was trained on.

Instead:
- training prompts are examples
- evaluation prompts are variations
- grading measures generalization

This ensures students build:

> reasoning systems, not lookup tables.

---

## 2. Prompt Families Instead of Prompt Lists

Each learning objective defines a **prompt family**.

A prompt family includes:
- canonical examples (shown to students)
- structural variations (not shown)
- adversarial variations
- domain-shifted versions

The student's agent must perform across the family.

---

## 3. Example

**Canonical prompt (shown)**

> Explain how RAG reduces hallucination.

**Evaluation variants (hidden)**
- Compare retrieval augmentation to fine-tuning for hallucination control.
- Why does retrieval sometimes increase hallucination?
- Describe a failure case where RAG worsens reasoning.
- Explain hallucination mitigation strategies in a multi-agent system.

These test conceptual understanding rather than memorized wording.

*Note: Prompt variants are curated in the Instructor Manual.*

---

## 4. Dimensions of Prompt Variation

Evaluation prompts should vary along multiple axes.

### 1. Surface phrasing variation
Tests linguistic robustness.

Example: "Explain" / "Describe" / "Compare" / "Argue for"

### 2. Structural variation
Tests reasoning flexibility.

Example: explanation vs critique; design vs analysis; diagnosis vs prediction

### 3. Domain transfer
Tests abstraction ability.

Example: RAG in legal domain; RAG in biology; RAG in robotics

### 4. Context perturbation
Tests inference robustness.

Example: incomplete data; misleading assumption; conflicting sources

### 5. Tool requirement shifts
Tests architectural adaptability.

Example: same question but requires retrieval; same question but requires computation; same question but requires simulation

---

## 5. Evaluation Rubric Update

Agents are no longer judged only on correctness. They are judged on:

| Dimension | Meaning |
|-----------|---------|
| Conceptual accuracy | Correct ideas |
| Reasoning transfer | Applies ideas in new form |
| Tool selection | Uses appropriate mechanisms |
| Error awareness | Recognizes uncertainty |
| Explanation clarity | Communicates reasoning |

This rewards intelligence rather than memorization.

---

## 6. Continuous Generalization Testing

Each course introduces:
- new prompt families
- new variation types
- new domain shifts

Agents must maintain performance on earlier families while adapting to new ones.

This simulates real deployment conditions.

---

## 7. Student Feedback Model

Students do not see:
- the exact evaluation prompts

They see:
- the family definition
- example variations
- performance summaries

This prevents prompt gaming while preserving transparency.

---

## 8. Instructor Role

Faculty curate:
- canonical prompts
- variant generators
- adversarial tests

They monitor:
- systematic failure patterns
- overfitting behaviors
- architecture limitations

Instruction becomes:

> guided generalization engineering.

---

## 9. Infrastructure Implications

The evaluation harness must support:
- prompt templating
- variation generation
- randomized evaluation sets
- versioned prompt banks

This turns assessment into:

> controlled experimentation.

---

## 10. Alignment with Program Philosophy

This update embodies the book's thesis.

If AI is epistemic metabolism, then intelligence means:

> adapting knowledge to new contexts.

Generalization testing measures exactly that.

Without it, the system is not intelligent—it is indexed.

---

## 11. Summary Statement

Agents are not evaluated on answers.

They are evaluated on their ability to reason across variations of problems.

This ensures graduates leave with:
- **adaptive systems**  
- not scripted ones  
- not memorized ones  
- not prompt-tuned ones  

but genuinely capable agents.
