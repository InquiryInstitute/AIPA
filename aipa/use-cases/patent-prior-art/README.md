# Patent Prior Art Assistant

**Domain**: IP / Legal  
**Agent role**: Search, summarize, compare claims

## Overview

Build an agent that helps with patent prior art research—search patents, summarize claims, and compare to a given invention or concept. Useful for patent attorneys, inventors, and IP researchers.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **USPTO** | Bulk / PatentsView | https://patentsview.org — patent metadata and text |
| **Google Patents** | Limited | Search; API access restricted |
| **PatentsView API** | Free | Patent data, classifications, citations |

## Agent Components

- **Search**: Find patents by keyword, classification, inventor
- **Retrieve**: Return claims, abstract, citations
- **Summarize**: Condense claims or prior art
- **Compare**: Identify overlap or distinction from a reference (reasoning)
