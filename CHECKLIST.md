# 🚀 Vercel + Supabase Deployment Checklist

## ✅ What's Done

- [x] Created `.gitignore` to protect sensitive files
- [x] Created `.env.example` template for environment variables
- [x] Created `supabase-setup.sql` database schema
- [x] Created `config.js` for Supabase client initialization
- [x] Created `DEPLOYMENT.md` with full deployment guide
- [x] Added contact form to `work-with-me.html` with Supabase integration
- [x] Updated `styles.css` with contact form styling
- [x] Created `package.json` for dependencies

---

## 📝 Your Action Items

### Step 1: Push Code to GitHub (5 minutes)

```bash
# Navigate to your project directory
cd "e:\Moksh Digital Web Designer\Portfolio\Aakash Sanghvi website"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Add Supabase integration and contact form"

# Add remote (your repo)
git remote add origin https://github.com/mokshdigital/aakash-sanghvi-website.git

# Push to GitHub
git push -u origin main
```

**Note:** If you get an error about existing remote, use:
```bash
git remote set-url origin https://github.com/mokshdigital/aakash-sanghvi-website.git
git push -u origin main --force
```

---

### Step 2: Create Supabase Project (5 minutes)

1. **Go to:** [supabase.com](https://supabase.com)
2. **Click:** "Start your project" or "New Project"
3. **Sign up/Login** (free, no credit card required)
4. **Create Organization** (if first time)
5. **Create New Project:**
   - **Name:** `aakash-portfolio`
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to you (e.g., `US East`)
   - **Pricing Plan:** Free
6. **Click:** "Create new project"
7. **Wait:** 2-3 minutes for project to provision

---

### Step 3: Set Up Database (5 minutes)

1. **In Supabase Dashboard:**
   - Click **SQL Editor** (left sidebar, looks like `</>`)
   - Click **"New query"**

2. **Copy & Paste:**
   - Open the file `supabase-setup.sql` from your project
   - Copy the ENTIRE contents
   - Paste into the SQL Editor

3. **Run:**
   - Click **"Run"** button (or press `Ctrl+Enter`)
   - You should see: ✅ "Success. No rows returned"

4. **Verify:**
   - Click **Table Editor** (left sidebar)
   - You should see 3 tables: `projects`, `contacts`, `page_views`
   - Click on `projects` - you should see 2 sample projects

---

### Step 4: Get Supabase Credentials (2 minutes)

1. **In Supabase Dashboard:**
   - Click **Settings** (gear icon, bottom left)
   - Click **API** in the left menu

2. **Copy These Two Values:**
   
   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
   ```

3. **Save them** - you'll need these for Vercel!

---

### Step 5: Deploy to Vercel (5 minutes)

1. **Go to:** [vercel.com/new](https://vercel.com/new)

2. **Import Repository:**
   - Click **"Import Git Repository"**
   - If not connected, click **"Connect GitHub"** and authorize
   - Search for: `mokshdigital/aakash-sanghvi-website`
   - Click **"Import"**

3. **Configure Project:**
   - **Project Name:** `aakash-sanghvi-portfolio` (or keep default)
   - **Framework Preset:** Leave as "Other"
   - **Root Directory:** `./`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty

4. **Add Environment Variables:**
   - Click **"Environment Variables"** to expand
   - Add these two variables:

   | Name | Value |
   |------|-------|
   | `SUPABASE_URL` | Paste your Supabase Project URL |
   | `SUPABASE_ANON_KEY` | Paste your Supabase anon key |

   - Make sure all three checkboxes are checked:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

5. **Deploy:**
   - Click **"Deploy"**
   - Wait 1-2 minutes
   - Click **"Visit"** when done! 🎉

---

### Step 6: Update config.js with Your Credentials (IMPORTANT!)

**For the site to work, you need to update config.js:**

1. **Open:** `config.js` in your project
2. **Replace** the placeholder values:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co'; // ← Your actual URL
   const SUPABASE_ANON_KEY = 'eyJhbGc...'; // ← Your actual key
   ```

3. **Save and commit:**
   ```bash
   git add config.js
   git commit -m "Update Supabase credentials"
   git push
   ```

4. **Vercel will auto-deploy** the update!

---

### Step 7: Test Everything (5 minutes)

1. **Visit your live site** (Vercel will give you a URL like `https://aakash-sanghvi-portfolio.vercel.app`)

2. **Test Contact Form:**
   - Go to "Work With Me" page
   - Fill out the contact form
   - Click "Send Message"
   - You should see: ✅ "Message sent successfully!"

3. **Verify in Supabase:**
   - Go to Supabase Dashboard
   - Click **Table Editor** → **contacts**
   - You should see your test submission!

4. **Test Projects Page:**
   - Go to "Projects" page
   - Enter password: `portfolio2024`
   - You should see the sample projects

---

## 🎉 You're Done!

Your portfolio is now:
- ✅ Live on Vercel
- ✅ Connected to Supabase (free tier)
- ✅ Auto-deploying from GitHub
- ✅ Collecting contact form submissions
- ✅ Ready for your real projects!

---

## 🔄 Next Steps (Optional)

### Add Your Real Projects

**Option 1: Via Supabase Dashboard (Easy)**
1. Go to Supabase → **Table Editor** → **projects**
2. Click **"Insert row"** → **"Insert row"** (not "Insert rows")
3. Fill in your project details
4. Click **"Save"**

**Option 2: Via SQL**
1. Go to **SQL Editor**
2. Run:
```sql
INSERT INTO projects (title, description, tech_stack, image_url, live_url, github_url, featured)
VALUES (
  'My Awesome Project',
  'Description here',
  ARRAY['React', 'Next.js', 'Tailwind'],
  'https://example.com/image.jpg',
  'https://myproject.com',
  'https://github.com/user/repo',
  true
);
```

### Custom Domain (Optional)
1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS instructions

---

## 🆘 Troubleshooting

**Contact form not working?**
- Check browser console for errors
- Verify `config.js` has correct credentials
- Check Supabase RLS policies are enabled

**"Supabase client not initialized"?**
- Make sure `config.js` is loaded before other scripts
- Check that credentials are correct
- Clear browser cache and reload

**Projects not showing?**
- Verify projects exist in Supabase table
- Check password is correct: `portfolio2024`
- Check browser console for errors

---

## 📞 Need Help?

- **Full Guide:** See `DEPLOYMENT.md` in your project
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)

---

**Built with ❤️ using Supabase (free tier) + Vercel (free tier)**
