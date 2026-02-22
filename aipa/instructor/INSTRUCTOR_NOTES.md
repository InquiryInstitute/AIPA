# AIPA Instructor Notes

Pacing, common pitfalls, and discussion tips for teaching with AIPA. For the consolidated instructor guide, see [INSTRUCTOR_MANUAL.md](INSTRUCTOR_MANUAL.md).

## Lecture Pacing (90 minutes)

Each lecture targets ~90 minutes. Suggested breakdown:

| Phase | Duration | Content |
|-------|----------|---------|
| Example Prompts + Epigraph | 5 min | Orient students; connect prompts to concepts |
| Conceptual Core | 25–30 min | Main ideas; formal definitions; key points |
| Technical Example | 25–30 min | Worked example; lab preview; hands-on demo |
| Philosophical Reflection | 15–20 min | Discussion; connections to broader themes |
| Discussion Prompts | 10–15 min | Class discussion; student questions |
| Lab Prep | 5–10 min | Bridge to hands-on; clarify deliverables |

Adjust based on class level. Advanced sections may move faster; weaker sections may need more Technical Example time.

## Common Pitfalls

### Part I (Ch1–3)
- **Ch1**: Students may conflate "stored" vs. "flowing" with "symbolic" vs. "connectionist." Emphasize: both views can apply to either paradigm.
- **Ch2**: Audit tool can feel abstract. Use a concrete deployed system (e.g., a public API) as the target for Lab 1.
- **Ch3**: State space formulation is often underspecified. Insist on explicit S, s₀, G, A, succ before coding.

### Part II (Ch4–6)
- **Ch4**: Bias-variance is counterintuitive. Use visualizations (train vs. val loss over epochs).
- **Ch5**: XOR is the canonical example. Don't skip the perceptron failure; it motivates multilayer nets.
- **Ch6**: Prompting is experiential. Allocate time for students to experiment with zero-shot, few-shot, CoT.

### Part III (Ch7–9)
- **Ch7**: RAG quality depends on chunking and retrieval. Bad chunks hurt more than no chunks. Demo both.
- **Ch8**: Probabilistic reasoning is dense. Consider splitting 8.3 (Bayesian networks) across two sessions.
- **Ch9**: ReAct loop is where the agent "comes alive." Let students run and trace a multi-step task.

### Part IV (Ch10–12)
- **Ch10**: Orchestrator integration is integration-heavy. Expect debugging; allocate buffer time.
- **Ch11**: Governance discussions can be sensitive (bias, fairness). Use "Notes for Instructors" callouts.
- **Ch12**: Capstone scope creep is common. Enforce tight problem definition in L1–L2.

## Discussion Tips

- **Example Prompts**: Start each lecture by asking "How would an AI agent solve these?" before revealing the lecture content.
- **Philosophical Reflection**: Use small-group discussion (2–3 min) before whole-class share. Reduces pressure and increases participation.
- **Discussion Prompts**: Pick 2–3 per lecture; don't try to cover all six. Prioritize those that connect to labs or the capstone.
- **Metabolism metaphor**: Return to it throughout. "Where does knowledge flow in this system? Where does it get stuck?"

## Terminology Consistency

- **Orchestrator**: The component (Ch10) that routes requests to tool servers, coordinates multi-step tasks, and ties the agent stack together. Lives in `student-ai/orchestration/`.
- **Orchestration**: The activity of coordinating tools; the orchestrator performs orchestration.
- **Tool client**: The implementation pattern—the orchestrator is a tool client that discovers and invokes tool servers (search, memory, reasoning, llm, audit). Use "orchestrator" for the component; "tool client" when emphasizing the client-server relationship.
- **Lab Prep**: Lectures reference "Lab 1," "Lab 2," "Lab 3"—these map to `lab-01.adoc`, `lab-02.adoc`, `lab-03.adoc` in each chapter.

## Sensitive Topics

- **Bias and fairness (Ch11)**: Frame as design choices with tradeoffs, not moral absolutes. Reference Buolamwini & Gebru, Mehrabi et al.
- **Accountability**: Who is responsible when the agent errs? Designers, deployers, users? Encourage nuanced discussion.
- **Surveillance and governance**: AI in institutions raises power and surveillance questions. Acknowledge; don't dismiss.

## Two-Semester Pacing

- **Semester 1**: Parts I and II (Ch1–6). By midterm: knowledge graph, audit tool, search engine, ml_trainer, neural classifier, llm tool.
- **Semester 2**: Parts III and IV (Ch7–12). By final: memory, reasoning, tool-calling agent, orchestrator, governance, capstone.

## Lab Integration

- Labs are interleaved with lectures. Don't delay labs until "after" the lecture; the lecture's Lab Prep section bridges directly.
- Each lab produces a tool server. Ensure students register tools and test with the orchestrator as they build.
- Capstone (Ch12) integrates all 12 tools. Students should have a running agent by Ch9 L3; Ch10–11 add orchestration and governance.
