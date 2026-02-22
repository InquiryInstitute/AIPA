# Labs: GitHub and Codespaces Strategy

AIPA labs are designed to leverage **GitHub** and **GitHub Codespaces** as the primary development and submission environment.

---

## 1. GitHub Codespaces

### 1.1 Why Codespaces

- **Zero local setup**: Students open the repo in Codespaces and work in a pre-configured environment.
- **Consistent environment**: Same Node, Python, Playwright, and tools for everyone.
- **Port forwarding**: Student apps (explorer, orchestrator) are accessible at `https://<codespace>-3000.app.github.dev` for testing.
- **Instructor demos**: Present trace runs in the same environment students use.

### 1.2 Devcontainer

The `.devcontainer/devcontainer.json` configures:

- Node 20, Python 3
- Playwright (Chromium) for lab tests
- Labs dependencies (`aipa/labs`: Playwright, serve)
- Graphviz, PlantUML, AsciiDoc tooling for the textbook
- Post-create: `npm install` in labs, `npx playwright install chromium`

### 1.3 "Open in Codespaces"

Each lab (or the main repo) should link:

```
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/<org>/<repo>?devcontainer_path=.devcontainer/devcontainer.json)
```

Students click → new Codespace → ready to work.

### 1.4 Ports

| Port | Use |
|------|-----|
| 3000 | Fixture server (labs); student explorer (when testing) |
| 8080 | Common alternative for student web apps |
| 5173 | Vite dev server (if used) |

Codespaces forwards ports automatically. Use `localhost:3000` in the Codespace; the public URL is shown in the Ports panel.

---

## 2. GitHub

### 2.1 Repo Structure

- **Template repo**: `aipa-student` or `aipa-labs-template` with devcontainer, labs tests, empty `student-ai/`.
- **GitHub Classroom**: Create assignments from the template; each student gets a private fork.
- **Submission**: Push to `main` (or `submit` branch); Actions run lab tests.

### 2.2 GitHub Actions

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `.github/workflows/labs.yml` | Push, PR to `main` (paths: labs, fixtures, student-ai) | Run Playwright lab tests; upload trace artifact on failure |
| Optional: `labs-schedule.yml` | Scheduled | Batch-run tests on student repos (if using GitHub API) |

**Path note**: If the repo root is `aipa/` (i.e. `.github` lives in the repo root), change workflow paths from `aipa/labs/**` to `labs/**` and working-directory from `aipa/labs` to `labs`.

### 2.3 Trace Artifacts

On test failure, the workflow uploads `playwright-report` and `test-results` (including trace ZIPs) as artifacts. Instructors download and run `pw trace` for debugging.

### 2.4 Branch Strategy

- `main` — integration branch; tests must pass on PR
- `submit` — optional; students push here for grading
- Per-lab branches: `lab/ch01`, `lab/ch02` — optional for staged submission

---

## 3. Student Workflow

1. **Accept assignment** (GitHub Classroom) → get private repo
2. **Open in Codespaces** → devcontainer spins up
3. **Work on lab** in `student-ai/` (or designated dir)
4. **Run tests locally**: `cd aipa/labs && npm run test:ch01`
5. **Push** → GitHub Actions runs tests
6. **Review**: Check Actions; on failure, download trace artifact, run `pw trace`

---

## 4. Instructor Workflow

1. **Template**: Maintain `aipa-labs-template` with devcontainer and lab tests
2. **Classroom**: Create assignment from template; set deadline
3. **Grading**: Clone student repo → Open in Codespaces → run tests, or use Actions artifacts
4. **Trace review**: Download failed trace from Actions; share `pw trace` + narrative with student

---

## 5. Implementation Checklist

- [x] Devcontainer includes Playwright and labs deps
- [x] GitHub Actions workflow for lab tests
- [ ] Add "Open in Codespaces" badge to repo README
- [ ] Create GitHub Classroom assignment template
- [ ] Document port forwarding for student apps in lab README
- [ ] Optional: GitHub Pages for trace viewer (trace.playwright.dev supports upload)
