# Regulatory Compliance Navigator

**Domain**: Legal / Government  
**Agent role**: Retrieve, interpret, check compliance

## Overview

Build an agent that helps users navigate federal and state regulations—retrieve relevant sections, interpret requirements, and check whether actions or policies comply. Useful for compliance officers, legal teams, and policy analysts.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **eCFR** | Bulk XML | https://www.ecfr.gov/developer/documentation — federal regulations |
| **RegEx / Regs.gov** | API | Regulation search and retrieval |
| **State regs** | Varies | Often downloadable; check state sites |
| **NIST** | Public | Standards and frameworks |

## Agent Components

- **Search**: Find regulations by keyword, CFR part, topic
- **Retrieve**: Return full text of relevant sections
- **Interpret**: Summarize requirements; optionally reason about compliance
- **Check**: Given a scenario, determine if compliant (logic/reasoning)
