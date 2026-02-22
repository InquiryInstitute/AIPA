# Ch1 Lab 3: Knowledge Graph Explorer — Trace Narrative

Use this narrative when presenting or reviewing the Playwright trace for the Knowledge Graph Explorer lab. Read each step aloud or in your head as you follow the trace in `pw trace`.

---

## Overview

This trace demonstrates a working Knowledge Graph Explorer—the first visual interface students build for their agent's knowledge layer. We show that the graph loads, queries run, and results display. The explorer connects the ingestion pipeline (Lab 1) and query layer (Lab 2) to a user-facing interface.

---

## Step-by-Step Narrative

### 1. Load the explorer and confirm graph displays

The page loads at the explorer URL. We see the graph visualization: nodes and edges representing the knowledge graph. This confirms the ingestion pipeline and query layer are wired to the UI. The visualization may use D3, Cytoscape.js, or a simple SVG—what matters is that the structure is visible.

**Trace check**: The `[data-testid="graph-viz"]` element should be visible. The DOM shows the graph container.

### 2. Run a query and verify results update

We enter a query in the search box (e.g., `author:Smith`) and click Query. The results panel updates with matching nodes or documents. This demonstrates that `query_graph` and `traverse` are exposed through the interface. The user can now interrogate the graph.

**Trace check**: The query input is filled, the submit button is clicked, and the results area changes. We should see text reflecting the query or results (e.g., "Smith" or "result").

### 3. Confirm acceptance criteria: explorer launches, query works

We re-verify that the graph remains visible and the full flow works. The lab meets acceptance criteria: the explorer launches, displays the graph (or a subset), and users can run at least one query and see results.

**Trace check**: No errors in the console. The graph-viz element is still present and visible.

---

## Acceptance Criteria (Recap)

- [x] Explorer launches and displays the graph (or a subset)
- [x] Users can run at least one query and see results
- [x] (In full lab) README documents how to run and integrate; tool schema defined

---

## Connection to the Agent Stack

The Knowledge Graph Explorer is the first structured knowledge component. It will feed into memory (Ch7) and RAG—the graph can be queried by the agent or used to augment retrieval. The `query_graph` and `traverse` tools become part of the agent's tool schema in later chapters.
