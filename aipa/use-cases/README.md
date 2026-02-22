# AIPA Capstone Use Cases

This folder contains documentation for the eight capstone use cases introduced in Chapter 2. Select one use case by the end of Ch2; your capstone (Ch12) customizes the agent for that domain.

## Use Cases

| Use Case | Directory | Domain |
|----------|-----------|--------|
| Literature Explorer | [literature-explorer/](literature-explorer/) | Academia |
| Local Business Assistant | [local-business/](local-business/) | Commerce |
| Regulatory Compliance Navigator | [regulatory-navigator/](regulatory-navigator/) | Legal/Gov |
| Clinical Evidence Summarizer | [clinical-evidence/](clinical-evidence/) | Healthcare |
| Course Design Assistant | [course-design/](course-design/) | Education |
| Civic Issue Tracker | [civic-tracker/](civic-tracker/) | Civic Tech |
| Sustainability Advisor | [sustainability-advisor/](sustainability-advisor/) | Environment |
| Patent Prior Art Assistant | [patent-prior-art/](patent-prior-art/) | IP/Legal |

## How to Choose

- Pick a domain that interests you or relates to your role, employer, or client
- Ensure the data sources (APIs, open data) are accessible and usable for course projects
- Check the per-use-case README for API notes, rate limits, and sample queries

## Integration with Labs

Labs build the agent stack in `student-ai/`. Your use case informs:
- **Ch1**: Knowledge graph entities (papers, businesses, regs, etc.)
- **Ch3**: State space formulation for your domain
- **Ch7**: What to index for RAG
- **Ch9**: Which tools the agent needs

Your capstone applies the full stack to your chosen use case.
