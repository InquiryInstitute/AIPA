# Literature Explorer

**Domain**: Academia  
**Agent role**: Search, summarize, cite; RAG over papers

## Overview

Build an agent that helps researchers explore academic literature—search papers, retrieve relevant passages, summarize findings, and cite sources. The agent uses RAG over a corpus of papers augmented with live API queries.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **Semantic Scholar** | Free API key | https://www.semanticscholar.org/product/api — paper search, citations, abstracts |
| **OpenAlex** | Free, no key | https://openalex.org — open catalog of scholarly works |
| **PubMed** | Free | https://pubmed.ncbi.nlm.nih.gov — E-utilities API for biomedical literature |
| **arXiv** | Bulk or API | https://arxiv.org/help/api — preprint abstracts and metadata |

## Sample Queries

- "Find papers on transformer attention mechanisms"
- "What does the literature say about retrieval-augmented generation?"
- "Summarize the key findings in these three papers"

## Data Format Notes

- Papers: title, authors, abstract, year, venue, citations
- Semantic Scholar returns JSON with paperId, title, abstract, year, citationCount
- OpenAlex uses open JSON schema; good for citation graphs

## Agent Components

- **Search**: Query APIs or indexed corpus
- **Retrieve**: Top-k relevant passages for RAG
- **Summarize**: LLM with retrieved context
- **Cite**: Include source paper IDs and snippets in output

## Starter Checklist

1. Obtain Semantic Scholar API key (or use OpenAlex for no-key start)
2. Run a test query: search for 5 papers on a topic
3. Design knowledge graph schema: Paper, Author, Citation, Venue
