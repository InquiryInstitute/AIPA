# Local Business Assistant

**Domain**: Commerce  
**Agent role**: Recommend, answer questions, route/plan

## Overview

Build an agent that helps users discover and compare local businesses—restaurants, shops, services. Recommend based on preferences; answer questions about hours, location, ratings; optionally suggest routes or plans.

## APIs and Data Sources

| Source | Access | Notes |
|--------|--------|-------|
| **Yelp Fusion** | Free tier | https://www.yelp.com/developers — businesses, reviews; rate limits apply |
| **Google Places** | Quota | Places API for details; requires billing account |
| **Municipal open data** | Varies | City licenses, inspections, permits (e.g., data.sfgov.org) |

## Agent Components

- **Search**: Find businesses by category, location, query
- **Recommend**: Filter and rank by rating, distance, preferences
- **Retrieve**: Answer "what are the hours?", "is it wheelchair accessible?"
- **Plan**: Suggest itinerary or route (optional)
