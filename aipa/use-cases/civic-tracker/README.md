# Civic Issue Tracker

**Domain**: Civic Tech  
**Agent role**: Track issues, summarize, notify

## Overview

Build an agent that helps citizens track civic issues—city council agendas, 311 reports, legislation. Summarize meetings or bills; track status; optionally notify when items of interest appear.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **LegiScan** | Limited free | State legislation tracking |
| **City open data** | Varies | SF, NYC, etc. have 311, agendas, permits APIs |
| **Council agendas** | Often HTML/PDF | Scraping or official feeds per city |

## Agent Components

- **Search**: Find agendas, 311 cases, bills by keyword or category
- **Track**: Monitor updates; store state
- **Summarize**: Condense meeting minutes or bill text
- **Notify**: Alert when matching items appear (optional)
