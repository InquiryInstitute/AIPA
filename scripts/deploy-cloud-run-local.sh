#!/usr/bin/env bash
# Deploy code-server to Cloud Run using your local gcloud login (not GitHub Actions).
# Usage:
#   gcloud auth login   # if you see "Reauthentication failed"
#   cp infra/code-server-gcp/env.example infra/code-server-gcp/.env
#   # edit .env: GCP_PROJECT, PASSWORD, TRUSTED_ORIGINS=aipa.castalia.institute,…
#   ./scripts/deploy-cloud-run-local.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if ! gcloud auth print-access-token >/dev/null 2>&1; then
  echo "gcloud is not authenticated. Run: gcloud auth login" >&2
  exit 1
fi
ENV_FILE="${ROOT}/infra/code-server-gcp/.env"
if [[ -f "${ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
fi
: "${GCP_PROJECT:?Set GCP_PROJECT (e.g. in infra/code-server-gcp/.env)}"
: "${PASSWORD:?Set PASSWORD}"
: "${TRUSTED_ORIGINS:?Set TRUSTED_ORIGINS (comma-separated hostnames)}"
export GCP_PROJECT GCP_REGION="${GCP_REGION:-us-central1}" PASSWORD TRUSTED_ORIGINS
export GIT_REPO_URL="${GIT_REPO_URL:-https://github.com/InquiryInstitute/AIPA.git}"
export GIT_REF="${GIT_REF:-main}"
cd "${ROOT}/infra/code-server-gcp"
exec ./deploy-for-repo.sh InquiryInstitute/AIPA main
