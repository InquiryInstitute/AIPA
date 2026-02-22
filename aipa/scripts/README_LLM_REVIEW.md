# Reviewing lectures with the Supabase LLM gateway

AIPA can use the **Supabase llm-gateway** (from the [Inquiry.Institute](https://github.com/.../Inquiry.Institute) repo) to have an LLM review each lecture and its PlantUML diagrams. The script writes Markdown reviews and optional revision suggestions so you can edit lectures by hand.

## Prerequisites

1. **Gateway deployed**  
   In the Inquiry.Institute repo, deploy the Edge Function:
   ```bash
   cd ../Inquiry.Institute
   ./scripts/deploy-llm-gateway.sh
   ```
   See `Inquiry.Institute/supabase/functions/llm-gateway/README.md` and `LLM_GATEWAY_AND_VECTOR_RAG_SETUP.md` for keys and setup.

2. **Env in AIPA**  
   From the same Supabase project (e.g. copy from Inquiry.Institute `.env.local`):
   - `SUPABASE_URL` — e.g. `https://xougqdomkoisrxdnagcj.supabase.co`
   - `SUPABASE_ANON_KEY` — the anon/public key

   Then:
   ```bash
   export SUPABASE_URL="https://..."
   export SUPABASE_ANON_KEY="eyJ..."
   ```

### Timeouts and retries

- **Supabase Edge Function duration:** Wall-clock limit is **150s** (free) or **400s** (paid plan); it is not configurable per function. Long lecture revisions can hit this and return **504 Gateway Timeout**. Use a paid plan if you need up to 400s.
- **Retries:** All gateway-calling scripts retry on **502, 503, 504** up to **2 times** with a **5s** delay. If you still see 504 after retries, the request is likely exceeding the plan limit; try shorter prompts or a faster model.

## Usage

From the **aipa** directory:

```bash
cd aipa

# List lectures only (no API calls)
node scripts/review-lectures-with-llm.mjs --dry-run

# Review all lectures; writes aipa/llm-reviews/<chapter>-<lecture>.md
node scripts/review-lectures-with-llm.mjs

# Limit to first 3 lectures (for testing)
node scripts/review-lectures-with-llm.mjs --limit 3
```

Output is written under `aipa/llm-reviews/` as one Markdown file per lecture (e.g. `ch01-lecture-01.md`). Each file contains the model’s review (narrative arc, density, diagram fit) and recommended revisions. Apply edits manually to the `.adoc` lectures.

### Step 2: Faculty-author revision

After reviews exist, run the **revision** script so the LLM acts as the faculty author and produces revised AsciiDoc (A quality, 90 min, interesting):

```bash
cd aipa
node scripts/revise-lectures-with-llm.mjs
```

Revised lectures are written to `aipa/llm-revisions/<chapter>-<lecture>.adoc`. Diff against the original in `part-*/ch*-*/lecture-*.adoc` and apply changes you want.

- `--skip-existing` — skip lectures that already have a revision file (resume a run).
- `--limit N` — process only the first N lectures.
- `--dry-run` — list what would be revised without calling the gateway.
- `--model <id>` — optional; send `model` in the gateway request body so the gateway can use a different model (e.g. `meta-llama/llama-3.1-405b-instruct`). Requires the llm-gateway to accept and forward the `model` parameter.

## What the scripts do

- Discovers all `lecture-*.adoc` (and `lecture-use-cases.adoc`) under `aipa/part-*`.
- For each lecture: sends full AsciiDoc + extracted PlantUML blocks to the llm-gateway with a fixed **system prompt** that asks for:
  - Narrative arc (hook, development, closing)
  - Density (paragraph and Key Points counts)
  - Diagram review (does each PlantUML match the narrative; concrete suggestions)
  - Recommended revisions (bullet list).
- Uses the gateway’s default model (e.g. gpt-oss-120b via OpenRouter). Pass `--model <id>` to use a different model if the gateway supports it.
- Throttles requests (~1.5 s between calls) to reduce rate limits.

### Comparing prose: default vs Llama 3.1 405B

To explore whether **Llama 3.1 405B** produces substantially better lecture prose, use the comparison script. It runs the same faculty-author revision for a few lectures twice (default model and 405B) and writes outputs side-by-side for diffing:

```bash
cd aipa
node scripts/compare-llm-prose.mjs --limit 3
```

To **focus on poorly graded lectures** (C and D only), pass a grades file. If `AIPA_LECTURE_GRADES.md` exists in the repo root it is used by default:

```bash
cd aipa
node scripts/compare-llm-prose.mjs --reviews-dir llm-reviews-round3 --limit 10
```

Or specify the file explicitly:

```bash
node scripts/compare-llm-prose.mjs --grades-file ../AIPA_LECTURE_GRADES.md --reviews-dir llm-reviews-round3
```

- **Output:** `llm-compare/default/<slug>.adoc` and `llm-compare/llama405b/<slug>.adoc`.
- **Options:** `--limit N` (default 3 when no grades file; no limit when using grades file), `--reviews-dir DIR`, `--model405b <id>`. With `--grades-file PATH`: only lectures graded C or D are compared (use `--min-grade B` to include B, or `--min-grade D` for D only).
- **Requirement:** The Supabase llm-gateway must accept an optional `model` field in the request body and forward it to the provider (e.g. OpenRouter). If the gateway does not support this yet, add it in Inquiry.Institute’s `llm-gateway` Edge Function.

Then diff to judge:  
`diff llm-compare/default/ch06-lecture-07.adoc llm-compare/llama405b/ch06-lecture-07.adoc`

**Using AWS Bedrock for the alternate model:**  
Pass `--bedrock` and use `--alt-model` with a Bedrock model ID (e.g. `anthropic.claude-sonnet-4-6-v1:0`). The first column still uses the Supabase gateway; the second uses the Bedrock Converse API. Install the SDK once: `npm install @aws-sdk/client-bedrock-runtime` (from repo root or aipa). Set `AWS_REGION` (or `--bedrock-region`) and AWS credentials (env or profile).

```bash
cd aipa
node scripts/compare-llm-prose.mjs --reviews-dir llm-reviews-round3 --limit 1 --bedrock --alt-model anthropic.claude-sonnet-4-6-v1:0 --alt-dir bedrock-sonnet
```

### Why some models used to output only a code fragment (fixed)

Two issues were identified and fixed:

1. **Lecture sent inside a code fence** — When the original lecture was wrapped in \`\`\`asciidoc ... \`\`\`, some models treated it as “complete this code block” and returned only the Lisp snippet. **Fix:** The script now sends the lecture as **plain text** by default (no fence). Use `--code-fence` to restore the old behavior.
2. **Extraction stopped at first \`\`\`** — When the model did return a full response wrapped in \`\`\`asciidoc ... \`\`\`, it often closed the fence right after the first code block. The extractor used a non-greedy match and kept only content up to that first \`\`\`, discarding the rest. **Fix:** Extraction now uses the **last** \`\`\` in the response, so the full lecture is kept.

With these changes, both the gateway default model and gpt-oss-120b on Bedrock produce full revised lectures (200+ lines). If you still see fragments, check gateway `max_tokens` and that the full prompt is sent.

**revise-lectures-with-llm.mjs** reads each `llm-reviews/<slug>.md` and the corresponding lecture `.adoc`, sends both to the gateway with a faculty-author system prompt (revise to A quality, 90 min, interesting; apply critic recommendations; preserve AsciiDoc/PlantUML), and writes `llm-revisions/<slug>.adoc`. Use `--skip-existing` to resume.

**apply-revisions.mjs** copies `llm-revisions/*.adoc` into the source lecture paths. Run after revising. Use `--backup` to save originals to `aipa/backup-lectures/` first; `--dry-run` to list only. Use `--from-dir llm-elevated` to apply elevated revisions; `--backup-dir backup-lectures-pre-elevate` to use a separate backup dir.

### Elevate all lectures to A

To bring every lecture to grade A after you have round-2 reviews and a grades file:

1. **Re-grade from round-2** (accurate baseline):  
   `node scripts/grade-lectures-with-llm.mjs --reviews-dir llm-reviews-round2 --output AIPA_LECTURE_GRADES_ROUND2.md`

2. **Run elevate-to-a.mjs** (only sub-A lectures):  
   `node scripts/elevate-to-a.mjs --grades-file AIPA_LECTURE_GRADES_ROUND2.md --reviews-dir llm-reviews-round2`  
   Writes revised AsciiDoc to `aipa/llm-elevated/<slug>.adoc`. Options: `--dry-run`, `--limit N`.

3. **Apply elevated revisions:**  
   `node scripts/apply-revisions.mjs --from-dir llm-elevated --backup`  
   Optionally `--backup-dir backup-lectures-pre-elevate` to keep a separate backup.

4. **Re-review and re-grade (verify):**  
   `node scripts/review-lectures-with-llm.mjs --output-dir llm-reviews-round3`  
   then  
   `node scripts/grade-lectures-with-llm.mjs --reviews-dir llm-reviews-round3 --output AIPA_LECTURE_GRADES.md`

5. If any lecture is still B/C/D, run `elevate-to-a.mjs` again with the round-3 grades and reviews, or edit the remaining lectures by hand using the round-3 review notes.

**review-revise-review.mjs** runs the full cycle: (1) critical review, (2) revise, (3) apply to source (with backup), (4) review again to `llm-reviews-round2/`. Options: `--limit N`, `--no-apply`, `--no-round2`.

The review script’s `--revise` flag is unused; use `revise-lectures-with-llm.mjs` for faculty-author revisions.

### Chapter 12 — ask-faculty (AI POV, postmodern voices)

Chapter 12 is authored from the **AI's point of view** in the **voice of postmodern thinkers** (Foucault, Derrida, Lyotard, Latour, Deleuze, Borges). Use the dedicated script and brief:

```bash
cd aipa
node scripts/ask-faculty-ch12.mjs
```

- **Options:** `--dry-run`, `--limit N`, `--skip-existing` (same as revise script).
- **Input:** Current Ch12 lectures in `part-iv/ch12-the-students-artificial-intelligence/` and the author brief at `part-iv/ch12-the-students-artificial-intelligence/CH12_AUTHOR_BRIEF.md`.
- **Output:** Revised AsciiDoc in `llm-revisions/ch12-lecture-01.adoc` … `ch12-lecture-08.adoc`. Diff and apply with `apply-revisions.mjs` (use `--backup` to keep originals).
