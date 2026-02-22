# AI Tutor: Guidance for Non-CS and Non-Technical Students

This document defines how the AI Tutor should support non-CS and non-technical students (e.g. humanities, social sciences, policy). The curriculum design assumes these learners can succeed with the Tutor teaching prerequisite topics on demand; this file specifies **plain-language-first** explanations, minimal notation, and environment/lab support so the Tutor (and its designers) have a single reference.

**Related documents:**
- [PREREQUISITES_AND_DEPENDENCIES.md](../PREREQUISITES_AND_DEPENDENCIES.md) — *What* topics the Tutor is responsible for teaching (programming, math, tooling).
- [NON_CS_CONTENT_REVIEW.md](../curriculum/NON_CS_CONTENT_REVIEW.md) — Evidence and chapter-by-chapter snapshot for non-CS readers.
- [INSTRUCTOR_MANUAL.md](INSTRUCTOR_MANUAL.md) §1 — Institutional minimal-path options (pair programming, simplified deliverables).

---

## 1. When explaining AIMA-marked terms

Terms that appear in the book with AIMA reference (e.g. state space, heuristic, knowledge base, rational agent) should be explained **in one sentence in plain language first**, then the formal or AIMA-style definition if the student needs it.

**Terms to prioritize:**

| Term | Plain-language first |
|------|----------------------|
| **State space** | The set of possible situations, plus a starting situation, a goal, and actions that change one situation into another; search is finding a sequence of actions from start to goal. |
| **Heuristic** | A rule-of-thumb estimate of how far you are from the goal; it guides search without doing a full lookahead. |
| **Knowledge base** | A stored set of facts and rules the system reasons over (e.g. "If P and Q then R"). |
| **Rational agent** | An agent that chooses actions to get the best expected outcome given what it knows. |
| **Transition model** | The rule that says: from this situation and this action, what situation do we get next? |
| **Search** (AIMA sense) | Exploring possible situations step by step from start until we reach a goal. |

---

## 2. When explaining formal definitions

For the dense formal blocks in the book (state space tuple in Ch3, risk/loss in Ch4, entailment in Ch8):

1. Give a one-sentence **"Key idea"** or **"In plain language"** version first.
2. Then give the formal definition (or point to the book).
3. Optionally add a one-sentence recap.

The book now includes "In plain language" lines immediately before these blocks in:
- Ch3 Lecture 1 (state space)
- Ch4 Lecture 1 (risk, loss, generalization, overfitting)
- Ch8 Lecture 1 (entailment)

Use those when the student is reading the book; when the student asks "what does this mean?", lead with the plain-language version.

---

## 3. Concept walkthroughs (minimal notation first)

When a non-CS student asks for a walkthrough of a core concept, use minimal notation and build up:

- **State space:** "You have possible situations, a start, a goal, and actions that change situations. Search is finding a sequence of actions from start to goal."
- **Risk / loss:** "We want the model to do well on future data. We measure how wrong it is with a loss function and approximate that using a train/validation split because we can't see the true distribution."
- **Entailment:** "One set of statements entails another when whenever the first are true, the second must be true—logical consequence."
- **Tool schema:** "A description of what a tool needs (inputs) and what it returns (outputs) so the agent can discover and call it."

---

## 4. Environment and lab support

Non-CS students often need step-by-step support for:

- **GitHub Codespaces:** Opening the repo in Codespaces, using the dev container, port forwarding for apps. See [GITHUB_CODESPACES_LABS.md](GITHUB_CODESPACES_LABS.md).
- **Repo clone and submission:** Cloning, committing, pushing; submitting via GitHub Classroom if used.
- **API keys and `.env`:** Where to get keys (e.g. OpenAI, Anthropic), where to put them (`.env`), not committing secrets.
- **Running a Python script or lab command:** e.g. `python script.py`, `npm run …`, from the project root or lab directory.

Point to [PREREQUISITES_AND_DEPENDENCIES.md](../PREREQUISITES_AND_DEPENDENCIES.md) for the full list of topics the Tutor teaches; environment and tooling are part of that scope.

---

## 5. High-friction chapters

Chapters where non-CS readers most need jargon and formal-definition support:

- **Ch3 (Search and Planning)** — State space, heuristics, BFS/DFS/A*, representation. Plain-language line in Lecture 1; glossary has "For non-technical readers" for state space and heuristic.
- **Ch4 (Learning from Data)** — Risk, loss, train/val/test, overfitting, bias-variance. Plain-language line in Lecture 1.
- **Ch8 (Reasoning and Inference)** — Propositional logic, entailment, resolution. Plain-language line in Lecture 1.

Direct students to the book's "In plain language" sentences and the [Glossary](../glossary/glossary.adoc) when they hit these chapters.
