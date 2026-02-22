# Lab Execution Plan: Playwright Trace (pw trace)

This document plans the use of **Playwright trace** (`pw trace` / `playwright show-trace`) to execute and verify each AIPA lab. Traces enable reproducible runs, debugging of failures, and instructor review of student submissions.

---

## 1. Why Playwright Trace?

- **Reproducible execution**: Record full session (network, DOM, screenshots) for each lab run
- **Failure debugging**: On test failure, `pw trace trace.zip` shows exactly what happened
- **Instructor review**: Inspect student lab execution without re-running manually
- **CI/CD integration**: Run lab verification in GitHub Actions; retain traces on failure

---

## 2. Lab Landscape

| Lab Type | Labs | UI? | Trace Use |
|----------|------|-----|-----------|
| **CLI/API only** | Ch2 audit, Ch3 search, Ch4 ml_trainer, Ch5 neural_classifier, Ch7 memory, Ch8 reasoning, Ch9 ReAct | No | Trace subprocess/API calls via custom harness |
| **Optional web UI** | Ch1 L3 (explorer), Ch6 L3 (llm tool demo) | Yes (CLI or web) | Trace web path when students choose web |
| **Orchestrator/agent** | Ch10 L3, Ch11 L3, Ch12 capstone | Often web or CLI demo | Trace if web demo exists |
| **Capstone** | Ch12 | Varies | Trace per-student deployment |

**Strategy**: Prioritize labs with web UIs for native Playwright tracing. For CLI/API labs, wrap execution in a thin Playwright context that records subprocess output and HTTP requests, or use a hybrid: Playwright for any web components, plus a custom runner that produces trace-like artifacts (logs, screenshots of CLI output).

---

## 3. Proposed Structure

### 3.1 Directory Layout

```
aipa/
  labs/
    playwright.config.ts      # Shared config: trace on, baseURL
    tests/
      ch01/                   # Ch1 labs
        lab-01.spec.ts        # Knowledge graph (API/spawn)
        lab-02.spec.ts        # Query, traversal
        lab-03.spec.ts        # Explorer UI (web) — primary trace target
      ch02/
        lab-01.spec.ts        # Audit (spawn/API)
        ...
      ch12/
        capstone.spec.ts      # Capstone demo
```

### 3.2 Playwright Config (trace-enabled)

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    trace: 'on-first-retry',  // or 'retain-on-failure' for CI
    baseURL: process.env.LAB_BASE_URL || 'http://localhost:3000',
  },
  // For labs that spawn servers: expect each test to start/stop its own server
  timeout: 60000,  // Labs may take time to start
});
```

### 3.3 Execution Commands

```bash
# Run all lab tests with trace
npx playwright test --trace on

# Run single chapter
npx playwright test tests/ch01 --trace on

# Run single lab
npx playwright test tests/ch01/lab-03.spec.ts --trace on

# View trace after failure
npx playwright show-trace test-results/.../trace.zip
# or: pw trace test-results/.../trace.zip
```

---

## 4. Per-Lab Execution Approach

| Chapter | Lab | Execution | Trace Capture |
|---------|-----|-----------|---------------|
| **Ch1** | L0 | N/A (docs) | — |
| **Ch1** | L1 | Spawn ingestion script; assert output | Custom log artifact |
| **Ch1** | L2 | Spawn query CLI; assert JSON/output | Custom log artifact |
| **Ch1** | L3 | Navigate to explorer UI; assert graph visible | **Playwright trace** |
| **Ch2** | L1–L3 | Spawn audit CLI or hit API | Custom or API trace |
| **Ch3** | L1–L2 | Spawn Python/JS; assert search output | Custom |
| **Ch3** | L3 | Hit search API or spawn server + browse | **Playwright trace** if UI |
| **Ch4–Ch5** | All | Spawn ml_trainer/neural_classifier | Custom (stdout, files) |
| **Ch6** | L3 | Hit llm API or demo page | **Playwright trace** if web demo |
| **Ch7–Ch9** | All | Hit tool APIs or spawn servers | Custom or API |
| **Ch10–Ch12** | L3 | Orchestrator/capstone — likely web demo | **Playwright trace** |

---

## 5. Phased Rollout

1. **Phase 1**: Add `playwright.config.ts` and tests for labs with clear web UIs (Ch1 L3, Ch6 L3, Ch10 L3 if web).
2. **Phase 2**: Add spawn-based tests for CLI labs; produce trace-like artifacts (e.g., JSON logs with timestamps, screenshots of terminal output).
3. **Phase 3**: Integrate into CI; retain traces on failure; document `pw trace` workflow for instructors.

---

## 6. Trace Narrative

Each lab trace should be accompanied by a **narrative**—descriptive text that explains what is being demonstrated as the solution runs. Viewers (instructors, students, reviewers) can follow along and understand *what* is happening and *why* at each step.

### 6.1 Purpose

- **Demo walkthrough**: Instructors present the trace while reading the narrative; the trace becomes a guided demonstration.
- **Grading context**: Reviewers understand the intended flow before inspecting a student's trace.
- **Student feedback**: "Here's what a correct solution does at step 3" helps students compare their run to the reference.
- **Documentation**: The narrative doubles as a solution description for the lab.

### 6.2 Implementation Options

| Approach | Where | Pros | Cons |
|----------|-------|------|------|
| **test.step() descriptions** | In the spec file | Shows directly in Playwright trace viewer; no extra files | Must be concise; mixed with test logic |
| **Companion narrative file** | `tests/ch01/lab-03.narrative.md` | Full prose; reusable for slides, docs | Not embedded in trace; two sources to maintain |
| **Hybrid** | test.step() for trace + `.narrative.md` for full script | Best of both: trace labels + rich narrative | Slight duplication |

**Recommended**: Hybrid. Use `test.step('Narrative text here')` for labels visible in the trace, and maintain a `.narrative.md` file per lab with the full demo script for presentations and documentation.

### 6.3 Narrative Structure

Each narrative should:

1. **Introduce** the lab and what the solution demonstrates
2. **Describe each step** in order: action taken, what the user sees, what it confirms
3. **Close** with acceptance criteria met and how this connects to the agent stack

Example format for `lab-03.narrative.md`:

```markdown
# Ch1 Lab 3: Knowledge Graph Explorer — Trace Narrative

## Overview
This trace demonstrates a working Knowledge Graph Explorer. We show that the graph loads, queries run, and results display. The explorer is the first visual interface students build for their agent's knowledge layer.

## Step-by-Step Narrative

1. **Load the explorer** — The page loads at /explorer. We see the graph visualization (nodes and edges). This confirms the ingestion pipeline (Lab 1) and query layer (Lab 2) are wired to the UI.

2. **Run a query** — We enter a query in the search box and submit. The results panel updates with matching nodes. This demonstrates query_graph and traverse are exposed through the interface.

3. **Inspect a node** — We click a node to view its attributes and edges. The detail view shows provenance (if implemented). This confirms the explorer supports inspection for accountability (Ch1 theme).

4. **Visualize** — The graph reflows or filters. We confirm the visualization responds to user input and reflects the underlying graph structure.
```

### 6.4 Using test.step() for Trace Labels

In the spec, wrap actions in steps whose descriptions match the narrative:

```ts
await test.step('Load the explorer and confirm graph displays', async () => {
  await page.goto('/explorer');
  await expect(page.locator('[data-testid="graph-viz"]')).toBeVisible();
});

await test.step('Run a query and verify results update', async () => {
  await page.fill('[data-testid="query-input"]', 'author:Smith');
  await page.click('[data-testid="query-submit"]');
  await expect(page.locator('[data-testid="results"]')).toContainText('Smith');
});
```

These step names appear in the trace timeline and serve as the narrative backbone when viewing with `pw trace`.

### 6.5 Per-Lab Narrative Files

| Lab | Narrative File | Notes |
|-----|----------------|-------|
| Ch1 L3 | `tests/ch01/lab-03.narrative.md` | Explorer demo |
| Ch3 L3 | `tests/ch03/lab-03.narrative.md` | Search engine UI (if web) |
| Ch6 L3 | `tests/ch06/lab-03.narrative.md` | LLM tool demo |
| Ch10 L3 | `tests/ch10/lab-03.narrative.md` | Orchestrator end-to-end |
| Ch12 | `tests/ch12/capstone.narrative.md` | Capstone demo (varies by project) |

---

## 7. Instructor Workflow

1. **Grading**: Run `npx playwright test tests/chXX --trace on` against student submission.
2. **Narrative**: Open the lab's `.narrative.md` and use it as a script when walking through the trace.
3. **Failure**: Run `npx playwright show-trace <trace-path>` to inspect DOM, network, console.
4. **Feedback**: Share trace (or screenshots) and narrative excerpt with student for debugging guidance.

---

## 8. Dependencies

- `@playwright/test` in `package.json`
- Optional: `child_process` / `execa` wrappers for CLI labs to capture stdout/stderr into trace-like logs

---

## 9. Next Steps

- [x] Add `package.json` with Playwright in `aipa/labs/`
- [x] Create `playwright.config.ts` with trace on
- [x] Implement Ch1 L3 explorer test as pilot
- [x] Add `lab-03.narrative.md` for Ch1 L3 as pilot narrative
- [x] Document student setup in `aipa/labs/README.md`
- [ ] Phase 2: Add spawn-based tests for CLI labs (Ch2, Ch3 L1–L2, etc.)
- [ ] Phase 3: Integrate into CI; retain traces on failure
