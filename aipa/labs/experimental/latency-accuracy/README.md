# Experimental Lab: Latency–Accuracy Tradeoff

## Objective

Vary model size or quantization; plot Pareto frontier of latency vs accuracy; support model selection under constraints.

## Hypothesis

- Larger models (or higher precision) improve accuracy but increase latency.
- Quantization (e.g., INT8, INT4) reduces latency with accuracy degradation that varies by task.
- A Pareto frontier exists; optimal choice depends on deployment constraints (e.g., max 200ms latency).

## Protocol

1. **Model variants:** Select a base model family and variants: e.g., 7B, 13B, 70B; or FP16, INT8, INT4.
2. **Evaluation set:** Fixed set of N tasks (e.g., classification, generation, retrieval) with accuracy metric.
3. **Measurement:** For each variant, run on full set; record per-request latency (p50, p95) and aggregate accuracy.
4. **Environment:** Fix hardware (CPU/GPU), batch size, and concurrency for fair comparison.
5. **Runs:** Repeat 3–5 times; report mean and std for accuracy and latency.

## Data Logging

Store in `results/`:

- `config.yaml` — model variants, hardware, batch size, evaluation set
- `runs.jsonl` — variant, run_id, accuracy, latency_p50_ms, latency_p95_ms
- `summary.csv` — variant, mean_accuracy, std_accuracy, mean_latency_p50, mean_latency_p95

## Analysis

- Plot: accuracy (y) vs latency (x). Identify Pareto-optimal points.
- For a given latency budget, report best achievable accuracy (with CI).
- Fit or annotate tradeoff curve if appropriate.

## Deliverables

1. `run_benchmark.py` — runs all variants, records latency and accuracy
2. `results/` — config, runs, summary
3. `plot_pareto.py` — generates Pareto frontier plot
4. `report.md` — hypothesis, protocol, results, Pareto analysis, recommendations

## Reproducibility Checklist

- [ ] Model variants and versions documented
- [ ] Hardware and software environment documented
- [ ] Batch size and concurrency fixed
- [ ] Evaluation set versioned
