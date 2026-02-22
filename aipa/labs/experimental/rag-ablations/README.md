# Experimental Lab: RAG Ablation Studies

## Objective

Vary RAG pipeline parameters (chunk size, top-k, reranker) and measure retrieval accuracy and end-to-end generation quality.

## Hypothesis

- Chunk size affects retrieval recall: too small fragments context; too large dilutes relevance.
- Top-k retrieval count trades recall vs noise; a reranker can improve precision.
- RAGAS (or similar) metrics will reflect these tradeoffs; optimal settings are task-dependent.

## Protocol

1. **Corpus and queries:** Use a fixed document corpus and query set with ground-truth relevant passages.
2. **Ablation factors:**
   - Chunk size: e.g., 128, 256, 512, 1024 tokens
   - Top-k: e.g., 3, 5, 10, 20
   - Reranker: none vs cross-encoder (e.g., ms-marco-MiniLM)
3. **Pipeline:** Chunk → embed → retrieve top-k → (optional) rerank → inject into prompt → generate.
4. **Metrics:**
   - Retrieval: Recall@k, Precision@k, MRR
   - End-to-end: RAGAS faithfulness, answer relevancy, context precision (if using RAGAS)
5. **Runs:** For each configuration, run on full query set; repeat 3 times with fixed seed for variance.

## Data Logging

Store in `results/`:

- `config.yaml` — chunk_sizes, top_k_values, reranker options, corpus path, query set path, embedding model
- `retrieval_metrics.jsonl` — config_id, run, recall_at_k, precision_at_k, mrr
- `ragas_metrics.jsonl` — config_id, run, faithfulness, answer_relevancy, context_precision
- `summary.csv` — aggregated mean and std per config

## Statistical Test

- For each metric, compare configurations using paired comparisons or ANOVA if multiple factors.
- Report confidence intervals; identify configurations that are significantly better (p < 0.05).
- Ablation plots: metric vs chunk_size (fixed top-k), metric vs top_k (fixed chunk size).

## Deliverables

1. `run_ablations.py` — runs all configs, computes metrics, logs results
2. `results/` — config, retrieval and RAGAS metrics, summary
3. `report.md` — hypothesis, protocol, results, statistical analysis, recommended settings

## Reproducibility Checklist

- [ ] Corpus and query set versioned
- [ ] Embedding model and version documented
- [ ] Chunking strategy (overlap, delimiter) documented
- [ ] RAGAS version and prompt template documented
