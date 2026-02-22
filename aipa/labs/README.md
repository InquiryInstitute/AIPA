# AIPA Lab Execution

Playwright-based execution and verification for AIPA labs, with trace support for debugging and instructor review. Labs leverage **GitHub** and **GitHub Codespaces**—see [GITHUB_CODESPACES_LABS.md](../instructor/GITHUB_CODESPACES_LABS.md) for the full strategy.

## Setup

### Option A: GitHub Codespaces (recommended)

1. Open the repo in [Codespaces](https://github.com/codespaces).
2. The devcontainer installs labs deps and Playwright automatically.
3. Run tests from the terminal in `aipa/labs`.

### Option B: Local

```bash
cd aipa/labs
npm install
npx playwright install chromium   # or: npx playwright install
```

## Run Tests

```bash
# Run all lab tests
npm test

# Run with trace (for debugging; traces saved on failure)
npm run test:trace

# Run single chapter (e.g., Ch1)
npm run test:ch01

# Run single lab with trace
npx playwright test tests/ch01/lab-03.spec.ts --trace on
```

## View Traces

After a failure (or when run with `--trace on`), view the trace:

```bash
npx playwright show-trace test-results/.../trace.zip
# or: npm run trace test-results/.../trace.zip
```

## Testing Student Submissions

1. Start the student's Knowledge Graph Explorer (or other lab deliverable) on a known port (e.g., 3000 or 8080).
2. Set `LAB_BASE_URL` and run the test:

```bash
LAB_BASE_URL=http://localhost:8080 npx playwright test tests/ch01/lab-03.spec.ts --trace on
```

3. The test expects `data-testid` attributes:
   - `graph-viz` — graph visualization container
   - `query-input` — search/query input
   - `query-submit` — query submit button
   - `results` — results panel

Students should add these to their explorer UI for test compatibility.

## Narrative

Each lab has a companion `.narrative.md` file (e.g., `tests/ch01/lab-03.narrative.md`). Use it as a script when walking through the trace with instructors or students.

## Fixtures

The `fixtures/` directory contains reference implementations for testing:

- `ch01-explorer/` — minimal Knowledge Graph Explorer UI (Ch1 Lab 3)

When `LAB_BASE_URL` is not set, tests run against these fixtures. The `serve` package is used to serve them during test runs.

## GitHub Actions

On push or PR to `main`, the `.github/workflows/labs.yml` workflow runs lab tests. On failure, trace artifacts are uploaded for debugging with `pw trace`.
