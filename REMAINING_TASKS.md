# Remaining Tasks

This document outlines the final steps needed to complete the current portfolio enhancements.

## 1. Asset Collection (User Action Required)
The **FieldOps OS** case study and homepage showcase are live, but they are currently using placeholder boxes. You need to gather **7 screenshots** and drop them into the `public/images/fieldops/` directory.

| Filename | Description | Location in UI |
|---|---|---|
| `desktop-hero.png` | A full-page desktop view (e.g., Calendar/Dispatch Board or Work Order list). | Homepage floating frame & Case Study Section 02 |
| `mobile-hero.png` | Your phone showing the Tech Dashboard job list. | Homepage floating frame |
| `work-order-detail.png` | The Work Order detail page (tasks, files, status). | Case Study — Section 02 |
| `dispatch-board.png` | The calendar/dispatch grid. | Case Study — Section 03 Left |
| `tech-dashboard.png` | Mobile tech job detail or checklist. | Case Study — Section 03 Right |
| `ai-report.png` | The AI Report Generator with a chart rendered. | Case Study — Section 04 AI Reports |
| `ai-wo-creator.png` | The multimodal WO Creator input/wizard. | Case Study — Section 04 AI WO |

## 2. SEO / Schema Finalization (Quick Code Fix)
*   **JSON-LD Collection Schema**: Add `FieldOps OS` to the `ProjectsCollectionSchema` inside `src/components/JsonLd.tsx` so that Google's crawler registers it as part of the overall portfolio collection.

## 3. AG Fashion Hub Hardcoding (Pending from Previous Session)
To fully decouple the "Fashion Client Website" from its live WordPress backend, we need to implement the hardcoded data strategy:
*   Create a `mock-data.js` interceptor file.
*   Modify `graphql-client.js` to return the hardcoded JSON data instead of making actual network requests to the `config.js` endpoints.
*   Inject the mock script tag into the local HTML files residing in `public/live_projects/Fashion Client Website/`.
