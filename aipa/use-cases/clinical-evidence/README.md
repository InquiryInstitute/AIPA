# Clinical Evidence Summarizer

**Domain**: Healthcare  
**Agent role**: Retrieve, summarize, cite evidence

## Overview

Build an agent that helps clinicians or researchers find and summarize clinical evidence—systematic reviews, guidelines, and primary literature. Retrieve relevant studies, summarize findings, and cite sources. HIPAA-safe: no patient data; literature and guidelines only.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **PubMed** | Free | E-utilities API; biomedical literature |
| **Cochrane** | Summaries | Systematic review abstracts |
| **Clinical guidelines** | Open | NIH, WHO, specialty societies (often PDF/HTML) |

## Agent Components

- **Search**: Query PubMed by condition, intervention, outcome
- **Retrieve**: Top-k studies or guidelines
- **Summarize**: Synthesize findings; highlight strength of evidence
- **Cite**: Include PMID, DOI, and key excerpts
