# AIPA + AIMA Mapping

*Artificial Intelligence: A Postmodern Approach* (AIPA) and *Artificial Intelligence: A Modern Approach* (AIMA) complement each other. Use this mapping to pair readings and assign the right resource for each learning objective.

## Design vs. Derivation

| Topic | AIPA provides | AIMA provides |
|-------|---------------|---------------|
| **Search** | Problem spaces as design; agent tool integration; orchestration | Ch 3–4: Formal algorithms, pseudocode, complexity proofs |
| **Logic & inference** | Reasoning as epistemic practice; tool schema design | Ch 7–9: Propositional/FOL, resolution, unification |
| **Uncertainty** | Bayesian systems as infrastructure; RAG and retrieval | Ch 12–15: Probability, Bayesian networks, temporal models |
| **Learning** | Data pipelines; ml_trainer tool; MLOps | Ch 19–20: PAC, decision trees, probabilistic learning |
| **Neural/Deep** | Representation; neural_classifier; fine-tuning | Ch 21: Backprop, CNNs, RNNs, architectures |
| **NLP** | llm tool; prompt architecture; embeddings | Ch 23–24: Grammar, parsing, transformers |
| **Agents** | Tool orchestration; ReAct loop; failure taxonomy | Ch 2: Agent structure; Ch 11: Planning |
| **Ethics/Governance** | AI as epistemic infrastructure; governance tool | Ch 27: Philosophy, ethics, safety |

**Principle:** AIPA teaches *how to build and design*; AIMA teaches *why it works mathematically*. Assign AIPA for architecture and systems; assign AIMA (or Murphy/Goodfellow for ML) for derivations and proofs.

## AIMA Chapter Mapping by AIPA Chapter

| AIPA Chapter | AIMA chapters | Notes |
|--------------|---------------|-------|
| Ch1 Intelligence as Process | Ch 1–2 | Agents, knowledge as metabolism |
| Ch2 AI in Practice | Ch 2, 19, 27 | Evaluation, benchmarking, ethics |
| Ch3 Search and Planning | Ch 3–4, 11 | Search algorithms, planning; AIPA Appendix A |
| Ch4 Learning from Data | Ch 19–20 | ML foundations; AIPA Appendix C, D |
| Ch5 Neural Systems | Ch 21 | Deep learning; AIPA Appendix D |
| Ch6 Language and Models | Ch 23–24 | NLP, transformers |
| Ch7 Memory Systems | Ch 19, 23–24 | Retrieval, embeddings |
| Ch8 Reasoning and Inference | Ch 7–9, 12–14 | Logic, probability; AIPA Appendix B |
| Ch9 Acting in the World | Ch 2, 11 | Agents, planning |
| Ch10 Architectures of Intelligence | Ch 2, 11, 21–24 | System integration |
| Ch11 Governance | Ch 27 | Ethics, safety |
| Ch12 Capstone | All | Integration |

## Additional Technical Companions

- **Murphy, *Probabilistic Machine Learning*** — For deep treatment of Bayesian inference, graphical models, and ML theory.
- **Goodfellow et al., *Deep Learning*** — For optimization, regularization, and neural architectures.
- **LLM/Agents papers** — For ReAct, tool use, RAG; supplement Ch6–10.

## Instructor Notes

- Use AIPA as the **primary design text** and lab spine. Point to AIMA for formal coverage when students need derivations.
- The AI Tutor (see `resources/AIMA.md`) can cite AIMA chapters. Ensure it also references AIPA appendices for formal content.
- For courses that emphasize theory, assign AIMA chapters and AIPA appendices; for applied courses, emphasize AIPA main text and labs.
