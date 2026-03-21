# code-server on Google Cloud Run

Build context is the **repository root**. Local deploy:

```bash
cd infra/code-server-gcp
cp env.example .env   # edit GCP_PROJECT, PASSWORD, TRUSTED_ORIGINS
set -a && source .env && set +a
export SERVICE_NAME=aipa-cs-myorg-myrepo   # or use ./deploy-for-repo.sh owner/repo
./deploy-for-repo.sh InquiryInstitute/AIPA main
```

GitHub Actions: workflow **Deploy code-server (Cloud Run)** (manual). Set repository secrets `GCP_SA_KEY`, `GCP_PROJECT`, `CODE_SERVER_PASSWORD`, `CODE_SERVER_TRUSTED_ORIGINS`.

Embed from the static site: add your Pages hostname to `TRUSTED_ORIGINS` (no `https://`).
