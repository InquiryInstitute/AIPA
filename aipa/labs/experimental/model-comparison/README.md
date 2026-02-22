# Experimental Lab: Model Comparison

## Objective

Compare 3–5 LLMs on the same evaluation set; measure accuracy, latency, and cost; perform statistical validation of differences.

## Hypothesis

- Models will differ significantly in task accuracy on a fixed evaluation set.
- Latency and cost will trade off with model size/capability.
- Pairwise differences in accuracy will be statistically significant for at least some model pairs (after correction for multiple comparisons if applicable).

## Protocol

1. **Evaluation set:** Use a fixed set of N prompts (e.g., N ≥ 50) with ground-truth labels or reference answers. No test-set tuning.
2. **Models:** Select 3–5 models (e.g., via OpenRouter or local inference): vary by size, vendor, or architecture.
3. **Prompts:** Use identical prompt template and instructions for all models.
4. **Runs:** Execute each (prompt, model) pair; capture response, latency (ms), and token usage.
5. **Scoring:** Apply task-specific rubric (e.g., exact match, LLM-as-judge, human eval subset). Compute per-instance scores.

## Data Logging

Store in `results/`:

- `config.yaml` — model IDs, evaluation set path, N, seed, prompt template hash
- `raw_responses.jsonl` — prompt_id, model, response, latency_ms, input_tokens, output_tokens
- `scores.jsonl` — prompt_id, model, score
- `summary.csv` — model, mean_score, std_score, mean_latency_ms, mean_cost_usd

## Statistical Test

- Paired t-test (or bootstrap) for each model pair on per-instance scores.
- Report p-values; apply Bonferroni or FDR correction if testing multiple pairs.
- Report 95% confidence intervals for mean score per model.
- Plot: accuracy vs latency, accuracy vs cost (Pareto-style).

## Deliverables

1. `run_experiment.py` — fetches models, runs evaluation, logs results
2. `results/` — config, raw responses, scores, summary
3. `report.md` — hypothesis, protocol, results, statistical analysis, conclusions

## Reproducibility Checklist

- [ ] Evaluation set versioned (checksum or commit)
- [ ] Random seed fixed; prompt order consistent
- [ ] Model versions and API endpoints documented
- [ ] Token cost calculation documented (per-model pricing)
