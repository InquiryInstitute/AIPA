#!/usr/bin/env bash
# GitHub Actions: set Jupyter Book html.baseurl for GitHub Pages; optional CODE_SERVER_URL / AI_LECTURER_WS_URL.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
REPO_NAME="${GITHUB_REPOSITORY##*/}"
MAIN_BASE="/${REPO_NAME}"
SLIDES_BASE="/${REPO_NAME}/slides"
# Match any quoted baseurl (empty or preset for local preview) so Actions always sets repo-relative paths.
if sed --version >/dev/null 2>&1; then
  sed -i "s|^  baseurl: \".*\"|  baseurl: \"${MAIN_BASE}\"|" _config.yml
  sed -i "s|^  baseurl: \".*\"|  baseurl: \"${SLIDES_BASE}\"|" slides-book/_config.yml
else
  sed -i '' "s|^  baseurl: \".*\"|  baseurl: \"${MAIN_BASE}\"|" _config.yml
  sed -i '' "s|^  baseurl: \".*\"|  baseurl: \"${SLIDES_BASE}\"|" slides-book/_config.yml
fi

if [[ -n "${CODE_SERVER_URL:-}" ]]; then
  CSU="${CODE_SERVER_URL%/}"
  OLD="http://127.0.0.1:18180"
  if sed --version >/dev/null 2>&1; then
    sed -i "s|${OLD}|${CSU}|g" slides-book/_config.yml
    sed -i "s|${OLD}|${CSU}|g" \
      slides-book/part-i/ch01-intelligence-as-process/lecture-01/slide-04-code-server-iframe.md \
      slides-book/part-i/ch01-intelligence-as-process/lecture-01/slide-05-ai-lecturer-terminal.md
    if [[ -f slides-book/_static/lecturer-outer-frame-demo.html ]]; then
      sed -i "s|${OLD}|${CSU}|g" slides-book/_static/lecturer-outer-frame-demo.html
    fi
  else
    sed -i '' "s|${OLD}|${CSU}|g" slides-book/_config.yml
    sed -i '' "s|${OLD}|${CSU}|g" \
      slides-book/part-i/ch01-intelligence-as-process/lecture-01/slide-04-code-server-iframe.md \
      slides-book/part-i/ch01-intelligence-as-process/lecture-01/slide-05-ai-lecturer-terminal.md
    if [[ -f slides-book/_static/lecturer-outer-frame-demo.html ]]; then
      sed -i '' "s|${OLD}|${CSU}|g" slides-book/_static/lecturer-outer-frame-demo.html
    fi
  fi
fi
if [[ -n "${AI_LECTURER_WS_URL:-}" ]]; then
  if sed --version >/dev/null 2>&1; then
    sed -i "s|ai_lecturer_ws_url: \".*\"|ai_lecturer_ws_url: \"${AI_LECTURER_WS_URL}\"|" slides-book/_config.yml
  else
    sed -i '' "s|ai_lecturer_ws_url: \".*\"|ai_lecturer_ws_url: \"${AI_LECTURER_WS_URL}\"|" slides-book/_config.yml
  fi
fi
