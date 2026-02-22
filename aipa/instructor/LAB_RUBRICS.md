# AIPA Lab Rubrics

Acceptance criteria for each of the 36 labs. Use for grading or self-assessment. Full exercise solutions: [EXERCISE_SOLUTIONS.md](EXERCISE_SOLUTIONS.md). See [INSTRUCTOR_MANUAL.md](INSTRUCTOR_MANUAL.md) for the complete instructor guide.

## Part I: Foundations

### Ch1: Intelligence as Process
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 0 | Documentation setup: Markdown, PlantUML; repo structure |
| Lab 1 | Knowledge graph: data model, ingestion pipeline; schema documented |
| Lab 2 | Query and traversal; at least 2 query types implemented |
| Lab 3 | Explorer interface: visualization or API; can query and display graph |

### Ch2: AI in Practice
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Audit: inventory of target AI system; components, dependencies mapped |
| Lab 2 | Trace schema: request_id, component, input/output; logs generated |
| Lab 3 | Audit pipeline: inventory + trace; report generation |

### Ch3: Search and Planning
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | State space: 2–3 domains formalized (S, s₀, G, A, succ) |
| Lab 2 | Search: BFS, DFS, A* implemented; A* with admissible heuristic |
| Lab 2b | (Optional) Lisp: state as S-expression; BFS or DFS; runs on one problem; doc state/successors |
| Lab 3 | Search engine: indexing, retrieval, ranking; tool server |

## Part II: Learning Systems

### Ch4: Learning from Data
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Data prep: load, preprocess, features, train/val/test split |
| Lab 2 | Training loop: baseline model; config for model type, hyperparameters |
| Lab 3 | ml_trainer: load_data, train, evaluate, export_model; tool server |

### Ch5: Neural Systems
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Architecture: forward pass; single and multilayer |
| Lab 2 | Training: init, regularization; training loop |
| Lab 3 | neural_classifier: create_architecture, train, predict, export; tool server |

### Ch6: Language and Models
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Embeddings: embed, similarity; sentence or token level |
| Lab 2 | Prompting: zero-shot, few-shot; template support |
| Lab 3 | llm tool: embed, generate, prompt, cache; tool server |

## Part III: Memory, Reasoning, Action

### Ch7: Memory Systems
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Vector store: index, search (top-k); backend (Chroma, FAISS, etc.) |
| Lab 2 | RAG pipeline: query → retrieve → generate |
| Lab 3 | Memory tool: index, search, rag_retrieve, add, update; tool server |

### Ch8: Reasoning and Inference
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Logic: propositional or FOL; assert, query, resolution |
| Lab 2 | Probability: Bayesian network; inference (exact or sampling) |
| Lab 3 | Reasoning tool: assert, query, prove, infer_probability, chain_of_thought |

### Ch9: Acting in the World
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Tool schemas: define, register; parse tool calls from LLM |
| Lab 2 | Execution layer: invoke tools; return results |
| Lab 3 | ReAct agent: think → act → observe; integrates llm, memory, tools |

## Part IV: System Integration

### Ch10: Architectures
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Pipeline design: components, data flow |
| Lab 2 | Tool client: discover tools, route requests |
| Lab 3 | Orchestrator: integrates all tools; end-to-end task completion |

### Ch11: AI in Institutions
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Policies: schema (rule_id, condition, action); compliance check |
| Lab 2 | Cost tracking, bias audit, A/B test setup |
| Lab 3 | Governance tool: define_policy, check_compliance, simulate, report |

### Ch12: Capstone
| Lab | Acceptance Criteria |
|-----|---------------------|
| Lab 1 | Repository assembly; tool client; end-to-end verification (problem definition covered in L1–L2). |
| Lab 2 | Interface (CLI/API); deployment; documentation |
| Lab 3 | Thesis; presentation; demo |
