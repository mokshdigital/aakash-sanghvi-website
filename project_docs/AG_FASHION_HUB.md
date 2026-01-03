# AG Fashion Hub - Project Documentation

## 📌 Project Overview
**Client:** AG Fashion Hub (Amitoj Enterprises Ltd.)
**Role:** Lead Full-Stack Developer & Designer
**Live URL:** (Digital Catalog / WhatsApp Commerce)
**Core Problem:** High-touch wholesale business needing digitization without losing the personal "chat" aspect. Standard e-commerce carts were too impersonal and complex for their workflow.
**Solution:** A Headless Custom Catalog that funnels every intent-to-buy directly into a pre-filled WhatsApp conversation.

## 🛠 Tech Stack
- **Frontend:** Vanilla JS (Custom Router, Config-driven)
- **Backend:** WordPress (Headless Mode)
- **API:** WPGraphQL
- **Data Modeling:** Pods Framework (Custom Post Types: Designs, Collections, Announcements)
- **Key Integration:** WhatsApp Business API (URL schemes)

## 🏗 System Architecture

### 1. Headless Configuration
The frontend is decoupled from WordPress. It fetches data via GraphQL.
- **Config File:** `assets/js/config.js` controls the entire app behavior (API endpoints, CDN URLs, pagination, contact numbers).

### 2. "Chat-to-Buy" Commerce Engine
Instead of a checkout, the system generates deep-linked WhatsApp messages.
**Function:** `CONFIG.getWhatsAppShareURL(design)`
- **Input:** Product Design Code, Price, Slug.
- **Output:** `https://wa.me/123456?text=Hi, I'd like to inquire about Design 101 (Price: $50)...`

### 3. CMS Structure (WordPress + Pods)
- **Collections:** Logic to group products (e.g., "Summer 2024").
- **Designs (Products):** The core unit. Fields: `designcode`, `price`, `fabric`, `gallery`.
- **Announcements:** Marquee text managed via CMS.
- **Blogs:** Standard WP posts exposed via API.

## 📘 User Manual Highlights
*Extracted from `AG-FASHION-HUB-USER-MANUAL.md`*

### Managing Products ("Designs")
1.  **Title:** MUST be the Design Code (e.g., `AG-1050`).
2.  **Featured Image:** The primary thumbnail.
3.  **Gallery:** Grid of additional angles.
4.  **Taxonomy:** "Collections" must be assigned for filtering to work.

### Critical Rules for Client
- **Do NOT delete the "Uncategorized" category.**
- **Image Names:** No spaces or special characters (use hyphens).
- **Cache:** If changes don't appear, purge the SG Optimizer cache.

## 🚀 Key Features to Showcase
1.  **WhatsApp Commerce:** 0-click friction. Immediate connection.
2.  **Client Autonomy:** The user manual allowed the client to run operations 100% independently.
3.  **Performance:** 99/100 Mobile Score (Vanilla JS, no heavy frameworks).
4.  **Digital Catalog:** Replaced PDF sharing with a searchable, filterable link.
