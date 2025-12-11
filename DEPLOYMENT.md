# 🚀 Deployment Guide - Aakash Sanghvi Portfolio

Complete step-by-step guide to deploy this portfolio to Vercel with Supabase backend.

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Vercel account
- [ ] Supabase account (free)

---

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Organization:** Create new or select existing
   - **Project name:** `aakash-portfolio`
   - **Database password:** (save this securely!)
   - **Region:** Choose closest to your location
4. Click **"Create new project"**
5. Wait 2-3 minutes for provisioning

### 1.2 Run Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase-setup.sql` from this repo
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. Verify success: You should see "Success. No rows returned"

### 1.3 Get Your API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. Copy these two values (you'll need them for Vercel):
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Import Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. If not connected, authorize GitHub
4. Search for: `mokshdigital/aakash-sanghvi-website`
5. Click **"Import"**

### 2.2 Configure Environment Variables

**IMPORTANT:** Before clicking "Deploy", add environment variables:

1. Expand **"Environment Variables"** section
2. Add the following variables:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |

3. Make sure **"Production"**, **"Preview"**, and **"Development"** are all checked

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Click **"Visit"** to see your live site! 🎉

---

## 🔧 Step 3: Configure Local Development (Optional)

If you want to run the site locally:

### 3.1 Clone Repository

```bash
git clone https://github.com/mokshdigital/aakash-sanghvi-website.git
cd aakash-sanghvi-website
```

### 3.2 Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...
   ```

### 3.3 Update config.js

1. Open `config.js`
2. Replace placeholders with your actual values:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGc...';
   ```

### 3.4 Run Local Server

```bash
# Using Python (built-in)
python -m http.server 8000

# Or using Node.js
npx serve

# Or using PHP
php -S localhost:8000
```

Visit: `http://localhost:8000`

---

## ✅ Step 4: Verify Everything Works

### 4.1 Test Contact Form

1. Go to your live site
2. Navigate to **"Work With Me"** page
3. Fill out and submit the contact form
4. Check Supabase:
   - Go to **Table Editor** → **contacts**
   - You should see your submission!

### 4.2 Test Projects Display

1. Go to **"Projects"** page
2. Enter password: `portfolio2024`
3. You should see the sample projects from the database

### 4.3 Check Analytics (Optional)

1. In Supabase, go to **Table Editor** → **page_views**
2. You should see page view logs

---

## 🔄 Step 5: Automatic Deployments

Now that everything is connected:

1. **Any push to `main` branch** → Automatic production deployment
2. **Any pull request** → Automatic preview deployment
3. **Vercel will notify you** via email/dashboard

---

## 📝 Step 6: Update Projects (Add Your Own)

### Option A: Via Supabase Dashboard (Easy)

1. Go to Supabase → **Table Editor** → **projects**
2. Click **"Insert row"**
3. Fill in:
   - **title:** Your project name
   - **description:** Project description
   - **tech_stack:** `{"HTML", "CSS", "JavaScript"}` (array format)
   - **image_url:** URL to project image
   - **live_url:** Live project URL
   - **github_url:** GitHub repo URL
   - **featured:** `true` or `false`
4. Click **"Save"**

### Option B: Via SQL Editor (Advanced)

```sql
INSERT INTO projects (title, description, tech_stack, image_url, live_url, github_url, featured)
VALUES (
  'My Awesome Project',
  'Description of my project',
  ARRAY['React', 'Next.js', 'Tailwind'],
  'https://example.com/image.jpg',
  'https://myproject.com',
  'https://github.com/user/repo',
  true
);
```

---

## 🔐 Security Notes

- ✅ **Never commit `.env` file** to GitHub (already in `.gitignore`)
- ✅ **Supabase anon key is safe** to expose (protected by RLS policies)
- ✅ **Row Level Security (RLS)** is enabled on all tables
- ✅ **Public can only:**
  - Read projects
  - Submit contact forms
  - Log page views
- ❌ **Public cannot:**
  - Delete or modify data
  - Read contact submissions
  - Access admin functions

---

## 🆘 Troubleshooting

### "Supabase client not initialized"
- Check that `config.js` has correct credentials
- Check browser console for errors
- Verify environment variables in Vercel

### Contact form not working
- Check Supabase RLS policies are enabled
- Verify `contacts` table exists
- Check browser console for errors

### Projects not displaying
- Verify projects exist in Supabase table
- Check RLS policy allows public read
- Check browser console for errors

---

## 📞 Need Help?

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues:** [Create an issue](https://github.com/mokshdigital/aakash-sanghvi-website/issues)

---

## 🎉 You're All Set!

Your portfolio is now:
- ✅ Live on Vercel
- ✅ Connected to Supabase database
- ✅ Auto-deploying from GitHub
- ✅ Collecting contact form submissions
- ✅ Tracking analytics

**Next steps:**
1. Add your real projects to Supabase
2. Customize the design
3. Add more features!

---

Built with ❤️ by Aakash Sanghvi
