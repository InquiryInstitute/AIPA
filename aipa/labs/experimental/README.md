# Experimental Labs

These labs are **hypothesis-driven** and require: hypothesis, protocol, data logging, statistical test, and write-up. They complement the build-oriented labs by training students in empirical evaluation and scientific rigor.

## Labs

| Lab | Topic | Skills |
|-----|-------|--------|
| [Search Comparison](search-comparison/) | BFS vs A* on varying graph size | Controlled experiment, complexity validation |
| [Model Comparison](model-comparison/) | Same prompt, 3–5 models; accuracy, latency, cost | Paired comparison, statistical significance |
| [RAG Ablations](rag-ablations/) | Chunk size, top-k, reranker | Ablation studies, benchmarking |
| [Failure Analysis](failure-analysis/) | Agent failure taxonomy and frequency | Failure analysis, taxonomy design |
| [Latency–Accuracy](latency-accuracy/) | Model size/quantization vs latency and accuracy | Pareto analysis, tradeoff modeling |

## Requirements

Each lab must include:

1. **Hypothesis** — Testable statement about system behavior
2. **Protocol** — Step-by-step experimental procedure
3. **Data logging** — `config.yaml`, raw data, summary in `results/`
4. **Statistical test** — Appropriate test (paired t-test, bootstrap, etc.) with p-value and effect size
5. **Write-up** — `report.md` with hypothesis, protocol, results, analysis, conclusions
6. **Reproducibility** — `reproduce.sh` or equivalent; fixed seeds; versioned data

See the main [Reproducibility](../../reproducibility.adoc) guide for standards.
