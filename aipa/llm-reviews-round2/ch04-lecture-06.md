# Review: python
import mlflow
import mlflow.sklearn
import torch
import numpy as np

def train(model, cfg, train_loader):
    # 1️⃣ Start a run – the context manager guarantees proper closure
    with mlflow.start_run() as run:
        # 2️⃣ Log hyper‑parameters and seeds
        mlflow.log_params(cfg)
        mlflow.log_param("numpy_seed", cfg["seed"])
        mlflow.log_param("torch_seed", cfg["seed"])
        np.random.seed(cfg["seed"])
        torch.manual_seed(cfg["seed"])

        # 3️⃣ Train the model (example loop omitted)
        for epoch in range(cfg["epochs"]):
            loss = train_one_epoch(model, train_loader)
            mlflow.log_metric("loss", loss, step=epoch)

        # 4️⃣ Log the final model artifact
        mlflow.sklearn.log_model(model, "model")
        # 5️⃣ Store the full configuration for later replay
        mlflow.log_dict(cfg, "config.yaml")

**Source:** part-ii/ch04-learning-from-data/lecture-06.adoc

---

## Review of Lecture 06 – “Python + MLflow”

**Grade: D** – The material is far below the 90‑minute, narrative‑driven standard required for the AIPA textbook. It consists almost entirely of a raw code listing with no contextual framing, no conceptual exposition, and no diagrams. Consequently it fails on every evaluation criterion.

---

### 1. Narrative Arc  

| Element | Verdict | Comments |
|---------|---------|----------|
| **Hook** | ❌ Missing | The lecture opens with a bare code block. There is no concrete scenario (e.g., “You just finished training a model and need to reproduce it three months later”) or provocative question (“How can you guarantee that a model you ship today can be exactly re‑run tomorrow?”). |
| **Development** | ❌ Missing | No step‑by‑step story. The code comments are the only “development”, but they are just checklist items. There is no explanation of *why* each MLflow call matters, no discussion of experiment tracking, reproducibility, or the trade‑offs of logging artifacts vs. metrics. |
| **Closing / Bridge** | ❌ Missing | The lecture ends abruptly after the `log_dict` call. No summary, no implication for downstream tasks (e.g., model serving, hyper‑parameter search), and no segue to a lab or the next lecture. |

**Overall verdict:** No narrative arc at all.

---

### 2. Density (Target ≈ 2,500‑3,500 words)

| Section | Expected size | Actual size | Gap |
|---------|----------------|-------------|-----|
| Conceptual Core (4‑6 paragraphs, 6‑12 key points) | ~1,200 words | 0 paragraphs, 0 key points | – |
| Technical Example (2‑3 paragraphs, 5‑8 key points) | ~800 words | 1 short code block, no prose | – |
| Philosophical Reflection (2‑3 paragraphs, 5‑8 key points) | ~500 words | 0 | – |
| **Total** | 2,500‑3,500 words | ~150 words (mostly code) | **≈ 2,350 word short** |

The lecture is essentially a code dump; it does not meet any of the required paragraph or key‑point counts.

---

### 3. Interest & Engagement  

- **Attention span:** A 90‑minute session cannot be sustained by a single code listing. Students will quickly lose focus.
- **Thin/Vague sections:** Every line is a “definition‑first” style comment; there is no story, no problem statement, no data‑driven motivation.
- **Missing hooks:** No real‑world example (e.g., tracking experiments for a Kaggle competition) to create tension.
- **No interactive element:** No prompts for students to predict the output, no “what‑if” variations, no lab instructions.

**What needs to change:** Introduce a concrete use‑case, walk through the experiment lifecycle, interleave short explanatory paragraphs, and embed reflective questions.

---

### 4. Diagram Review  

- **PlantUML blocks:** None are present.  
- **Recommendation:** Add at least one diagram that visualises the MLflow tracking architecture (run → parameters → metrics → artifacts) and a second that shows the data flow from training loop to logged artifacts.  

---

## Recommended Revisions (Prioritized)

1. **Create a compelling hook (≈ 2 minutes).**  
   - Begin with a short story: *“Imagine you have just trained a state‑of‑the‑art image classifier. Two weeks later, a teammate asks you to reproduce the exact training run. How do you guarantee the same seeds, hyper‑parameters, and model version?”*  
   - Pose a provocative question: *“Can we ever truly “re‑run” a deep‑learning experiment without a tracking system?”*

2. **Add a **Conceptual Core** section (≈ 1,200 words).**  
   - Explain **experiment tracking**: purpose, benefits, typical pitfalls.  
   - Introduce **MLflow** (components: Tracking Server, UI, Projects, Models).  
   - List **key concepts** (run, experiment, metric, parameter, artifact).  
   - Provide 6‑12 bullet‑point take‑aways (e.g., “All hyper‑parameters should be logged before the first training step”).

3. **Expand the **Technical Example** (≈ 800 words).**  
   - Break the code into **four narrative steps**:  
     1. *Initialize* – create an experiment, set a run name.  
     2. *Log parameters & seeds* – why deterministic seeds matter.  
     3. *Training loop* – show a minimal `train_one_epoch` with a dummy loss, and discuss logging frequency.  
     4. *Finalize* – log model artifact, export config, end run.  
   - For each step, write a 2‑3 sentence paragraph explaining the *why* and *what could go wrong* (e.g., forgetting to set seeds leads to nondeterminism).  
   - Add **key points** (5‑8) such as “Use `mlflow.start_run()` as a context manager to guarantee closure”.

4. **Insert a **Philosophical Reflection** (≈ 500 words).**  
   - Discuss reproducibility in AI research: the “reproducibility crisis”.  
   - Contrast **ad‑hoc notebooks** vs. **formal tracking**.  
   - Pose reflective questions: *“If you could only keep one artifact from an experiment, what would it be and why?”*  
   - End with a bridge to the next lecture (e.g., “Next we’ll see how to version data with DVC and integrate it with MLflow”).

5. **Add at least two PlantUML diagrams.**  
   - **Diagram 1 – MLflow Tracking Flow:**  
     - Nodes: `Experiment → Run → Parameters / Metrics / Artifacts → Tracking Server → UI`.  
     - Arrow labels: “log_param”, “log_metric”, “log_model”.  
     - Include a feedback loop showing “run → UI (inspect) → modify → new run”.  
   - **Diagram 2 – Training Loop Integration:**  
     - Show `train_one_epoch` feeding loss to `mlflow.log_metric`.  
     - Highlight where seeds are set, where model is saved.  
     - Use colors to differentiate “code” vs. “MLflow API”.  

6. **Embed interactive checkpoints.**  
   - After the hook, ask students to write down three pieces of information they would need to reproduce a run.  
   - After the technical example, give a short “fill‑in‑the‑blank” snippet where a student must add the missing `mlflow.log_param` call.  
   - End with a **mini‑lab**: run the provided script, open the MLflow UI, and locate the logged metrics and model.

7. **Polish the prose and formatting.**  
   - Replace the raw code block with a **listing** that includes line numbers and brief inline comments.  
   - Use **Admonitions** (`NOTE`, `TIP`, `WARNING`) to highlight best practices (e.g., “Never log secrets as parameters”).  
   - Ensure each paragraph is 3‑5 sentences, avoiding single‑sentence “definition dumps”.

8. **Check word count.**  
   - Aim for **≈ 2,800 words** total across the three sections. Use a word‑counter to verify before finalizing.

---

### Quick “Before‑After” Sketch

| Before | After |
|--------|-------|
| `python\nimport mlflow…` (code only) | **Hook:** “You just finished a model that beats the state‑of‑the‑art on CIFAR‑10. Two weeks later…”. **Conceptual Core** (4 paragraphs). **Technical Example** (expanded, interleaved prose). **Philosophical Reflection** (2 paragraphs). **Diagrams** (PlantUML). **Lab instructions**. |

Implementing the above revisions will transform Lecture 06 from a bare‑bones code dump into a fully‑fledged, 90‑minute learning experience that aligns with the AIPA textbook’s pedagogical standards.