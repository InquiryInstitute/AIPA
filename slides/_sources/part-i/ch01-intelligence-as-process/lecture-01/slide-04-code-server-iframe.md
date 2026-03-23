---
title: "Demo — code-server in an iframe"
---

# code-server in the browser

The iframe below uses the **`code_server_url`** substitution (`http://127.0.0.1:18180` locally). On **GitHub Pages**, CI rewrites it to your **Cloud Run** URL (set secret `CODE_SERVER_URL` on the AIPA repo — deploy the service from **[inqspace](https://github.com/InquiryInstitute/inqspace)** with `./scripts/deploy-cloud-run-local.sh InquiryInstitute/AIPA main`).

<iframe
  title="code-server"
  src="{{ code_server_url }}/"
  style="width:100%;min-height:72vh;border:1px solid #ccc;border-radius:8px;"
  allow="clipboard-read; clipboard-write; fullscreen"
></iframe>

**Trusted origins:** add your GitHub Pages host (e.g. `inquiryinstitute.github.io`) and course domain to Cloud Run `TRUSTED_ORIGINS` when deploying from inqspace.
