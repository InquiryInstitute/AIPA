# Lab Rubrics for Experimental Labs

Experimental labs require hypothesis, protocol, data logging, statistical analysis, and reproducibility. Use these rubrics to grade submissions.

## General Criteria (All Experimental Labs)

| Criterion | Weight | Exemplary (4) | Proficient (3) | Developing (2) | Unsatisfactory (1) |
|-----------|--------|---------------|----------------|----------------|---------------------|
| **Hypothesis** | 15% | Clear, testable, grounded in prior work | Testable and specific | Vague or untestable | Missing or irrelevant |
| **Protocol** | 20% | Complete, reproducible, documented | Complete and documented | Incomplete or ambiguous | Missing or inconsistent |
| **Data logging** | 20% | config.yaml, raw data, summary; versioned | All required artifacts present | Partial; missing config or summary | Minimal or absent |
| **Statistical analysis** | 20% | Appropriate test, p-value, effect size, CI | Correct test and p-value | Test used but incomplete | No statistical validation |
| **Reproducibility** | 15% | Single command reproduces; seeds fixed | Reproduce script works | Partial; minor gaps | Cannot reproduce |
| **Write-up** | 10% | Clear, structured, interprets results | Complete with interpretation | Incomplete or superficial | Minimal or missing |

## Lab-Specific Additions

### Search Comparison

- **Node expansion / complexity:** Correctly reports and compares expansions; plots vs N
- **Theoretical alignment:** Discusses how empirical results align with O(b^d) / O(b^ε)

### Model Comparison

- **Multiple models:** Compares 3+ models on same evaluation set
- **Pairwise significance:** Reports p-values for key comparisons; addresses multiple comparisons if applicable
- **Cost/latency:** Includes cost and latency metrics; discusses tradeoffs

### RAG Ablations

- **Factor isolation:** Varies one factor at a time (or documents full factorial design)
- **Metrics:** Uses retrieval metrics (Recall@k, MRR) and optionally RAGAS
- **Recommendation:** Provides evidence-based recommended settings

### Failure Analysis

- **Taxonomy:** Clear, mutually exclusive categories; defined before annotation
- **Inter-annotator agreement:** Reports kappa or similar for subset (if applicable)
- **Actionable insights:** Connects failure distribution to mitigation strategies

### Latency–Accuracy

- **Pareto frontier:** Correctly identifies and plots Pareto-optimal points
- **Constraint analysis:** For given latency budget, reports best accuracy with CI

## Reproducibility Checklist (Instructor Verification)

Before accepting a lab, verify:

- [ ] `reproduce.sh` or `run_experiment.py` runs without manual intervention
- [ ] Config includes random seed(s)
- [ ] Results directory contains config, raw data, summary
- [ ] Re-running yields equivalent results (within documented tolerance)

## Feedback Templates

**Strong submission:** "Hypothesis is testable, protocol is clear, and statistical analysis (paired t-test, p=0.02, d=0.6) supports your conclusion. Reproducibility script runs cleanly."

**Needs improvement:** "Add confidence intervals to your metrics. The protocol does not specify the random seed—please add to config.yaml. Re-run and verify reproducibility."

**Major revision:** "Statistical test is inappropriate for paired comparison; use paired t-test or bootstrap. Data logging is incomplete; include raw responses and summary. Reproducibility script failed on fresh run."
