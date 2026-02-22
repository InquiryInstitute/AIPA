# Course Design Assistant

**Domain**: Education  
**Agent role**: Recommend resources, align to standards

## Overview

Build an agent that helps instructors design courses—recommend OER (Open Educational Resources), align content to curriculum standards, and suggest assessments or activities. Useful for curriculum designers and faculty.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **OER Commons** | API | https://www.oercommons.org — search OER by subject, level |
| **State standards** | Varies | CCSS, state frameworks; some available as open data |
| **Licensing** | CC | Most OER is CC-licensed for reuse |

## Agent Components

- **Search**: Find OER by topic, grade level, resource type
- **Recommend**: Suggest resources that align to a standard or learning objective
- **Align**: Map content to standards (reasoning over alignment)
- **Summarize**: Describe resource and how it fits a unit
