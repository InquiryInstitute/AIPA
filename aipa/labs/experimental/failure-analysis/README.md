# Experimental Lab: Agent Failure Analysis

## Objective

Build a systematic taxonomy of agent failures; measure frequency by category on a fixed task set; produce a failure audit report.

## Hypothesis

- Agent failures can be classified into a finite set of categories (e.g., tool hallucination, schema mismatch, context overflow, recursive loop, wrong tool choice).
- Failure distribution will vary by task type and model.
- A structured taxonomy enables targeted mitigation and evaluation.

## Protocol

1. **Task set:** Define 30–50 agent tasks (tool-using prompts) with expected behavior.
2. **Taxonomy:** Define failure categories, e.g.:
   - Tool hallucination (invokes non-existent tool)
   - Schema mismatch (wrong arguments, type error)
   - Context overflow (exceeds context window)
   - Recursive loop (repeated identical actions)
   - Wrong tool choice (correct tool exists but agent picks another)
   - Timeout / no response
   - Other (specify)
3. **Execution:** Run agent on each task; capture full trace (prompts, tool calls, responses).
4. **Annotation:** For each failure, assign primary category. Use two annotators for subset; compute agreement (Cohen's kappa).
5. **Aggregation:** Count failures per category; compute rates and confidence intervals (e.g., bootstrap).

## Data Logging

Store in `results/`:

- `config.yaml` — agent config, model, task set path
- `traces/` — one JSON per task with full trace
- `annotations.jsonl` — task_id, outcome (success/failure), failure_category, notes
- `summary.csv` — category, count, rate, 95% CI

## Statistical Analysis

- Report failure rate with binomial confidence interval.
- Per-category rates; compare categories (e.g., chi-square if comparing across models).
- Inter-annotator agreement (Cohen's kappa) on labeled subset.

## Deliverables

1. `run_agent.py` — executes tasks, saves traces
2. `annotate.py` — helper for category assignment
3. `results/` — traces, annotations, summary
4. `report.md` — taxonomy, protocol, failure distribution, recommendations

## Reproducibility Checklist

- [ ] Task set versioned
- [ ] Agent and model version documented
- [ ] Taxonomy definition in config or README
- [ ] Annotation guidelines documented
