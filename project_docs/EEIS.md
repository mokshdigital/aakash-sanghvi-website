# Express Entry Immigration Services (EEIS) - Project Documentation

## 📌 Project Overview
**Client:** Express Entry Immigration Services
**Role:** Lead Full-Stack Developer
**Migration:** Monolithic WordPress -> Headless Next.js 14
**Status:** COMPLETE (Phases 3-8 finished)

## 🛠 Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend:** WordPress (Headless) + WPGraphQL + ACF
- **Rendering Strategy:** ISR (Incremental Static Regeneration) - 60s revalidation
- **Deployment:** Vercel (Frontend) + Hostinger (WP Backend)

## 🏗 Key Technical Implementation

### 1. Hybrid Rendering (ISR)
Strategy effectively bridges the gap between static performance and dynamic content.
- **Revalidation:** 60 seconds.
- **Benefit:** End users hit Vercel Edge Cache (instant load), while content editors see changes appear within a minute without a full rebuild.

### 2. The "Sanitization Bridge"
A custom pipeline to render WordPress WYSIWYG content safely in React.
- **Problem:** `dangerouslySetInnerHTML` is risky; XSS attacks possible.
- **Solution:** Custom parser that whitelists safe tags (`<b>`, `<i>`, `<span>` with specific inline styles) and strips dangerous ones (`<script>`, `<iframe>`, `onclick`).
- **Files:** `src/lib/utils/sanitize.ts`

### 3. Dynamic Filtering
- **Mega Menu:** Auto-sorts "Study", "Work", "PR" based on CMS menu order.
- **Service Categories:** Dynamic routing `[category]/[slug]`.

## 🔒 Security & Code Quality
*Based on `CODE_REVIEW_REPORT.md`*
- **Audit Result:** Passed Senior Lead Dev Review.
- **Fixed Criticals:** Exposed API Keys (Resend) were rotated and moved to env vars.
- **Fixed Risks:** Removed all `console.log` from production; implemented Zod schemas for strict type safety on API responses.

## 📊 Impact Metrics
- **60s** Global Content Revalidation.
- **100%** Type Safety (Strict TypeScript).
- **Grade A** Security Score.

## 📂 Project Structure
- `/src/lib/api`: WordPress fetchers.
- `/src/components/ui`: Shadcn primitives.
- `/src/components/sections`: Feature-rich blocks (Hero, Features, Stats).
- `docs/CONTEXT.md`: The master tracking document for the project phases.
