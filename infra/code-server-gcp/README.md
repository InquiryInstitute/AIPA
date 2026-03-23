# code-server on GCP — moved to **inqspace**

The canonical **Dockerfile**, **Cloud Build** config, **deploy scripts**, and **`aipa-lecturer-bridge`** extension for Inquiry Institute live in the **[InquiryInstitute/inqspace](https://github.com/InquiryInstitute/inqspace)** repository:

- **`infra/code-server-gcp/`** — image + Cloud Run deploy  
- **`extensions/aipa-lecturer-bridge/`** — VS Code / code-server WebSocket bridge  
- **`scripts/deploy-cloud-run-local.sh`** — local deploy with `gcloud auth login`

Deploy a Cloud Run service for **this** repo (or any org repo) from **inqspace** with:

```bash
cd ../inqspace   # clone https://github.com/InquiryInstitute/inqspace if needed
./scripts/deploy-cloud-run-local.sh InquiryInstitute/AIPA main
```

GitHub Actions: run **Deploy code-server (Cloud Run)** in the **inqspace** repo (not AIPA).
