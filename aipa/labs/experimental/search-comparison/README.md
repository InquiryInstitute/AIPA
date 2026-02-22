# Experimental Lab: Search Algorithm Comparison

## Objective

Compare BFS and A* search on graphs of varying size; validate complexity behavior and measure time and node expansions empirically.

## Hypothesis

- BFS and A* will find the same optimal path when step costs are uniform and the heuristic is admissible.
- Node expansions for A* will be fewer than BFS as graph size increases (when a good heuristic is used).
- Time and node expansions will grow with graph size; growth rate should align with theoretical complexity (O(b^d) for BFS, O(b^ε) for A* with good h).

## Protocol

1. **Graph generation:** Create undirected graphs with N nodes (e.g., N = 100, 500, 1000, 5000). Use a fixed branching factor or random connectivity.
2. **Problem setup:** Designate start and goal nodes. Ensure at least one path exists.
3. **Heuristic for A*:** Use straight-line distance (for spatial graphs) or a relaxed/approximate distance.
4. **Run each algorithm:** For each (N, algorithm), run 10 trials with different graph instances (or different start/goal pairs).
5. **Measure:** Node expansions, wall-clock time, solution length.

## Data Logging

Store results in `results/`:

- `config.yaml` — graph parameters, N values, number of trials, random seed
- `results.jsonl` — one line per run: `{"N": 500, "algorithm": "bfs", "expansions": 1234, "time_ms": 45, "path_length": 12}`
- `summary.csv` — aggregated mean and std per (N, algorithm)

## Statistical Test

- For each N, compare mean node expansions (BFS vs A*) using paired t-test or Wilcoxon signed-rank test (if non-normal).
- Report p-value and effect size (Cohen's d or relative difference).
- Plot expansions vs N for both algorithms; overlay theoretical curve if feasible.

## Deliverables

1. `reproduce.sh` or `run_experiment.py` — script to regenerate results
2. `results/` — config, raw data, summary
3. `report.md` — hypothesis, protocol, results, statistical analysis, interpretation

## Reproducibility Checklist

- [ ] Random seed fixed in config
- [ ] Full graph generation parameters documented
- [ ] All dependencies listed (e.g., requirements.txt)
- [ ] Results reproducible with single command
