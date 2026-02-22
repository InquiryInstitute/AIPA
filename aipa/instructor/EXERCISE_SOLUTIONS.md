# Exercise Solutions (Instructor Only)

This document provides solution sketches and conceptual answers for chapter exercises. Use for grading, office hours, and exam preparation. Do not distribute to students.

---

## Chapter 1: Intelligence as Process

### 1. Conceptual: Stored vs. flowing intelligence

**Stored**: Intelligence as what the system *has*—knowledge base, trained weights, lookup tables. Example: endgame tablebase (chess), RAG vector store.

**Flowing**: Intelligence as *process*—transformations, computation, search at runtime. Example: search-based chess engine that explores state space on demand.

**Sample answer**: A tablebase stores precomputed optimal moves (stored); a search engine computes moves by exploring (flowing). Both achieve the same outcome; the locus of intelligence differs.

### 2. Conceptual: Metabolism metaphor

**Answer**: Metabolism captures *circulation* and *feedback*: intake, transform, output, feedback. "Processing" is one-way; metabolism implies the system's outputs feed back into its environment and itself. Knowledge flows through the system; it is not merely stored and retrieved.

### 3. Design: Knowledge graph schema

**Sketch**: Entities (e.g., papers: title, authors, venue; recipes: ingredients, steps). Relations: cites, authored_by, contains. Attributes: year, category. Omit: full text (use references), low-signal attributes. Connect to RAG: nodes as chunks, relations for graph retrieval, hybrid search.

### 4. Computational: 3-puzzle state representation

**Sketch**: State = tuple of 9 positions (0–8, 0 = empty). Actions: move empty up/down/left/right. Successor: swap 0 with neighbor if legal. State equality: tuple equality.

### 5. Design: Ch1 graph to Ch7 RAG

**Sketch**: (1) Export graph nodes/edges as documents. (2) Chunk node text + neighbor context. (3) Embed and index in vector store. (4) Optional: hybrid retrieval—vector similarity + graph traversal (neighbors of top-k). Data flow: Graph → chunk → embed → index; Query → embed → retrieve → RAG prompt.

---

## Chapter 2: AI in Practice

### 1. Conceptual: Observability

**Answer**: Observability (logs, metrics, traces) enables debugging, monitoring, audit. When absent: failures go undetected, drift unnoticed, accountability impossible. Cannot diagnose "why did the model fail?" without traces.

### 2. Conceptual: Model drift vs. distribution shift

**Model drift**: Model parameters or behavior change over time (e.g., online learning, retraining). **Distribution shift**: Input/target distribution changes; model unchanged. Example of drift: recommender retrained daily. Example of shift: COVID changed user behavior; model trained pre-COVID degrades.

### 3. Design: Audit schema

**Sketch**: components (name, version, config_hash), data_sources (path, hash, lineage), model_versions (id, training_data_ref, metrics), dependencies (graph of components). Track: timestamps, owners, change history.

### 4. Computational: Trace schema

**Sketch**: request_id (UUID), timestamp (ISO8601), component (string), input_hash (SHA256), output_hash (SHA256). Mock entries: 3–5 rows; vary components (llm, memory, search).

### 5. Design: Degradation detection

**Sketch**: Metrics: accuracy, latency p95, error rate, user feedback. Thresholds: alert if accuracy drops >X% vs. baseline, latency >Y ms. Baseline: rolling window or fixed reference. Automated tests on golden set; A/B comparison vs. previous version.

---

## Chapter 3: Search and Planning

### 1. Conceptual: State representation prior to algorithm

**Answer**: Representation defines the state space. Wrong representation → search finds "solutions" in the wrong space (e.g., abstract away crucial constraint; solution fails in practice). Algorithm assumes correct representation; garbage in, garbage out.

### 2. Conceptual: Admissibility and consistency

**Admissible**: h(n) ≤ true cost from n to goal. **Consistent**: h(n) ≤ c(n,n') + h(n') for successor n'. A* optimality requires admissible h; consistency ensures first expansion of a node is optimal (no need to re-expand). Inadmissible h can cause A* to skip optimal path.

### 3. Computational: BFS vs. DFS

**Sketch**: BFS: queue, FIFO; DFS: stack, LIFO. Compare nodes expanded on same problem. BFS finds shortest path; DFS may find longer path first. 8-puzzle: BFS typically expands more nodes for shallow goals.

### 4. Computational: A* for 8-puzzle

**Sketch**: State = tuple of 9 positions. Manhattan distance: sum over each tile of |x - goal_x| + |y - goal_y|. Admissible: each tile moves at least Manhattan steps. Verify: compare path length to BFS shortest path; should match.

### 5. Design: Real-world state space

**Sketch (course scheduling)**: S = assignment of courses to time slots; s₀ = empty; G = all constraints satisfied; A = assign course to slot; succ = apply action if no conflict. Conflicts: same room, same instructor, student overlap.

---

## Chapter 4: Learning from Data

### 1. Conceptual: Bias-variance tradeoff

**Answer**: High bias: underfitting, model too simple. High variance: overfitting, model memorizes. Increase capacity when underfitting (training loss high). Add regularization when overfitting (val loss >> train loss). Sweet spot: balance both.

### 2. Conceptual: Why separate validation set?

**Answer**: Test set estimates generalization; use once at end. If we use test for model selection, we overfit to test—no unbiased estimate. Validation set proxies for "future" data; we tune on it, then report final performance on test.

### 3. Computational: Linear model, overfitting

**Sketch**: Fit y = wx + b on synthetic data. Plot train vs. val loss. Add polynomial features (x², x³): train loss drops, val loss rises—overfitting. Demonstrate sweet spot at low degree.

### 4. Computational: Stratified split

**Sketch**: Group by class; sample proportionally from each class for train/val/test. Verify: class ratios in each split ≈ overall. Use sklearn.model_selection.StratifiedShuffleSplit or manual grouping.

### 5. Design: ml_trainer config

**Sketch**: model_type (linear, mlp, cnn), data_path, hyperparameters (lr, epochs, batch_size, regularization), metrics (accuracy, F1, MSE). Agent specifies: task (train, eval), config_ref, data_ref. Response: model_id, metrics.

---

## Chapter 5: Neural Systems

### 1. Conceptual: Perceptron and XOR

**Answer**: Perceptron learns linear boundary. AND, OR: linearly separable. XOR: points (0,0), (1,1) vs. (0,1), (1,0)—no single line separates. Linear separability: a hyperplane can correctly classify all points.

### 2. Conceptual: Vanishing gradients

**Answer**: In deep nets with sigmoid/tanh, gradient is multiplied by derivative (<1) at each layer. Product → 0. Early layers get tiny updates; they hardly learn. Deeper = more multiplications = worse. ReLU, skip connections mitigate.

### 3. Computational: Perceptron on AND, OR, XOR

**Sketch**: AND: (0,0)→0, (0,1)→0, (1,0)→0, (1,1)→1. OR: (0,1), (1,0), (1,1)→1. XOR: (0,1), (1,0)→1; (0,0), (1,1)→0. Perceptron converges for AND, OR; fails for XOR (never converges).

### 4. Computational: MLP on XOR

**Sketch**: 2 hidden units, ReLU or sigmoid. XOR needs nonlinear boundary; one hidden layer suffices. Train with backprop; demonstrate convergence (loss → 0).

### 5. Design: neural_classifier config

**Sketch**: architecture (layers, units per layer), activation (relu, sigmoid), loss (cross_entropy, mse), optimizer (sgd, adam, lr). Agent specifies: input_shape, num_classes, config. Optional: pretrained, freeze_layers.

---

## Chapter 6: Language and Models

### 1. Conceptual: Self-attention vs. RNN

**Answer**: Self-attention: each token attends to all others in parallel; no recurrence; O(n²) for sequence length. RNN: sequential; hidden state carries past; O(n) but sequential. Attention allows long-range dependencies without vanishing gradient; parallelizable.

### 2. Conceptual: Zero-shot, few-shot, CoT

**Zero-shot**: No examples; task in prompt. **Few-shot**: 1–5 examples in prompt. **CoT**: "Let's think step by step"; model produces reasoning then answer. Use zero-shot for simple tasks; few-shot when format matters; CoT for complex reasoning.

### 3. Computational: Cosine similarity

**Sketch**: embed(text1), embed(text2); cos_sim = dot(a,b)/(||a||*||b||). Use sentence-transformers or OpenAI embed. Compare similar vs. dissimilar sentences.

### 4. Computational: LLM cache

**Sketch**: key = hash(prompt + model + params); value = response. On hit: return cached; on miss: call LLM, store. Measure hit rate on repeated or similar prompts (e.g., user loops).

### 5. Design: llm tool schema

**Sketch**: embed(text) → vector; generate(prompt, max_tokens, temperature) → text. Agent controls: max_tokens (length), temperature (creativity). Optional: top_p, stop_sequences.

---

## Chapter 7: Memory Systems

### 1. Conceptual: Why external memory?

**Answer**: Context window is fixed (e.g., 128K tokens). Cannot fit full corpus. External memory: store in vector store/graph; retrieve relevant chunks; inject into context. Enables access to large corpora.

### 2. Conceptual: Episodic, semantic, procedural

**Episodic**: "What happened this session" (experiences). **Semantic**: Facts, knowledge base, indexed docs. **Procedural**: How to do things (e.g., tool use patterns). Agent: episodic = conversation history; semantic = RAG store; procedural = tool schemas.

### 3. Computational: Chunking

**Sketch**: Fixed-size: split by token count, overlap. Sentence-based: split at sentence boundaries. Compare retrieval quality (e.g., recall@k) on QA task. Sentence-based often better for coherent chunks.

### 4. Computational: Minimal RAG

**Sketch**: embed(query) → search vector store → top-k chunks → prompt = context + query → LLM.generate. Evaluate: accuracy on 5–10 QA pairs with/without retrieval. Metric: exact match or F1.

### 5. Design: Memory tool schema

**Sketch**: index(docs) → status; search(query, k) → list of chunks; rag_retrieve(query, k) → formatted context string. Agent receives: from search, chunks with scores; from rag_retrieve, ready-to-inject context.

---

## Chapter 8: Reasoning and Inference

### 1. Conceptual: Propositional vs. FOL

**Propositional**: Sufficient for finite, fixed set of facts; no variables, no quantification. **FOL**: Needed for "all X", "exists Y", relations, reusable rules. Example: "All students pass" needs FOL.

### 2. Conceptual: Bayes' rule

**Answer**: P(X|e) = P(e|X)P(X) / P(e). Updates prior P(X) to posterior given evidence e. Likelihood P(e|X) measures how well X predicts e. Posterior ∝ likelihood × prior.

### 3. Computational: Resolution

**Sketch**: Convert KB + ¬query to CNF. Resolve pairs of clauses (one contains L, other ¬L); add resolvent. Repeat until empty clause (query entailed) or no new clauses (not entailed). Use PySat or Z3 for implementation.

### 4. Computational: Variable elimination

**Sketch**: Build small BN (3–4 nodes). Query P(X|e). Choose elimination order. For each non-query, non-evidence var Z: multiply factors containing Z, marginalize out Z. Normalize. Compare to exact computation.

### 5. Design: Reasoning tool schema

**Sketch**: assert(fact) → ok; query(goal) → answer; chain_of_thought(prompt) → reasoning + answer. Agent: assert from perception; query for logic; CoT for complex reasoning. Combine: retrieve facts → assert → query for deduction; CoT for abduction/induction.

---

## Chapter 9: Acting in the World

### 1. Conceptual: Reflex vs. model-based agents

**Reflex**: Percept → action directly; no internal state. **Model-based**: Maintain state; plan; act over time. Reflex: simple, fast, reactive (thermostat). Model-based: planning, delayed reward, complex tasks (chess, navigation).

### 2. Conceptual: ReAct interleaving

**Answer**: Full plan may be wrong; world changes; planning is expensive. Interleaving: act, observe, replan. Enables correction; handles uncertainty; reduces commitment to bad plans.

### 3. Computational: Tool schema

**Sketch**: JSON with name, description, parameters (JSON Schema). Parse; validate tool call (params match schema). Example: {"name":"search","parameters":{"query":"string"}}.

### 4. Computational: ReAct loop

**Sketch**: prompt = "Thought: ... Action: ..."; loop: call LLM → parse action → execute tool → append observation → repeat. Max 3 steps. Simple task: "What is 2+2?" or "Search for X."

### 5. Design: Tool-calling agent

**Sketch**: Discover: load tool schemas from config/registry. Parse: extract action and params from LLM output (regex or structured output). Execute: dispatch to tool, capture result. Errors: retry, fallback, or report. Loop: thought → action → observation until done.

---

## Chapter 10: Architectures of Intelligence

### 1. Conceptual: Pipeline vs. loop

**Pipeline**: Fixed sequence (input → A → B → C → output). **Loop**: Iterative (observe → think → act → observe). Pipeline: batch, offline, deterministic. Loop: interactive, online, reactive. Use pipeline for one-shot; loop for agents.

### 2. Conceptual: Orchestrator role

**Answer**: Receives user request; routes to appropriate tools (search, memory, reasoning, llm); aggregates results; returns response. Coordinates: which tool(s) to call, in what order; handles multi-step tasks.

### 3. Computational: Tool client

**Sketch**: Given schemas and request, match request to tool (keyword match: "search" → search tool; or LLM: "which tool?"). Return tool name + suggested params.

### 4. Computational: Structured logging

**Sketch**: Log: request_id, step, tool_call, result, timestamp. Trace multi-step: e.g., search → rag_retrieve → generate. JSON or structured format.

### 5. Design: Orchestrator API

**Sketch**: POST /request {query, context}; internal: route → tools → aggregate; return {response, trace}. Or: stream interface for long tasks. Error handling: partial results, retries.

---

## Chapter 11: AI in Institutions

### 1. Conceptual: Governance constitutive

**Answer**: Governance doesn't just constrain—it defines what the system *is*. Policies shape capabilities, user expectations, and system identity. Foucault: norms constitute subjects. Policy choices (allow/block, thresholds) define the system's behavior space.

### 2. Conceptual: Fairness metrics

**Equalized odds**: Same TPR, FPR across groups. **Demographic parity**: Same approval rate across groups. **Individual fairness**: Similar individuals treated similarly. Conflict: parity and equalized odds can conflict; satisfying one may violate another (Impossibility results, Chouldechova).

### 3. Computational: Policy checker

**Sketch**: Policy = list of rules {action, condition, allow/block}. Given action + context, evaluate conditions; return allow/block. Example: block if action="external_api" and user not in allowlist.

### 4. Computational: A/B test design

**Sketch**: Null: no difference between configs. Metric: accuracy, latency, cost. Sample size: power analysis (e.g., detect 5% lift with 80% power). Decide: t-test or CI; reject null if p < 0.05 or CI excludes 0.

### 5. Design: Governance tool schema

**Sketch**: define_policy(rules) → policy_id; check_compliance(action, context) → {allowed, reason}; simulate(action) → projected outcome. Agent receives: compliance decision, optional explanation.

---

## Chapter 12: The Student's Artificial Intelligence

### 1. Conceptual: Problem definition constructed

**Answer**: Problem is not given—stakeholders (users, domain experts, designers) negotiate. User plays role in defining value, success, scope. Constructed: reflects priorities, constraints, and power relations.

### 2. Conceptual: Rigorous evaluation

**Answer**: Test set (held out, representative); multiple metrics (accuracy, latency, fairness); baselines (random, previous system, human); ablation (remove components); statistical significance. Report limitations.

### 3. Design: Problem definition (one page)

**Sketch**: Problem (1–2 para); Users (who, needs); Value (why it matters); Scope (in/out); Success criteria (measurable). Example: "Help students find relevant papers; users = researchers; value = time saved; scope = CS domain; success = recall@10 > 0.8."

### 4. Design: Evaluation plan

**Sketch**: Test set (size, source, split); metrics (primary + secondary); baselines (2–3); ablations (remove RAG, remove CoT, etc.); comparison table. What to compare: full system vs. ablations vs. baselines.

### 5. Design: Thesis structure

**Sketch**: Problem (motivation, gap); Approach (method, design); Implementation (system, tools); Evaluation (setup, results); Limitations (what we didn't do); Future work. ~15–25 pages typical.

---

*End of solutions. Revise as needed for your course.*
