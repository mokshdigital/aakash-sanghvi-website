# 🚀 Maner Law Form - Supabase Setup Guide

## ✅ What's Been Done

- ✅ Created SQL schema for `maner_law_submissions` table
- ✅ Updated HTML form to use Supabase instead of Resend
- ✅ Removed all email integration code
- ✅ Form now saves directly to database

---

## 📋 Setup Steps

### **Step 1: Run SQL Schema in Supabase** (2 minutes)

1. Open Supabase Dashboard
2. Go to **SQL Editor** → **New query**
3. Open `maner-law-form-schema.sql` from your project
4. Copy ALL contents and paste into SQL Editor
5. Click **"Run"**
6. Verify: ✅ "Success. No rows returned"

### **Step 2: Verify Table Created** (1 minute)

1. Go to **Table Editor** in Supabase
2. You should see: **`maner_law_submissions`**
3. Click on it to view the structure

### **Step 3: Update Form Credentials** (2 minutes)

1. Open `maner-law-if.html` in your editor
2. Find lines 363-364 (near the top of the `<script>` section)
3. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'; // ← Your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // ← Your actual anon key
```

**Where to get these:**
- Supabase Dashboard → **Settings** → **API**
- Copy **Project URL** and **anon public** key

### **Step 4: Test the Form** (2 minutes)

1. Open `maner-law-if.html` in your browser
2. Fill out the form with test data
3. Click **"Submit requirements"**
4. You should see: ✅ "Thank you! Your requirements have been submitted successfully."

### **Step 5: Verify Submission in Supabase** (1 minute)

1. Go to Supabase Dashboard
2. Click **Table Editor** → **maner_law_submissions**
3. You should see your test submission!

---

## 📊 Viewing Submissions

### **In Supabase Dashboard:**
1. **Table Editor** → **maner_law_submissions**
2. Click any row to see full details
3. Export to CSV if needed

### **Using SQL Queries:**
See `maner-law-queries.sql` for helpful queries:
- Get unread submissions
- Get recent submissions
- Mark submissions as read
- Search by email

---

## 🔐 Security

- ✅ **Row Level Security (RLS)** enabled
- ✅ **Public can submit** (INSERT only)
- ✅ **Public CANNOT read** submissions
- ✅ **Only you** can view via Supabase Dashboard
- ✅ **No API keys** exposed (anon key is safe for public use)

---

## 📁 Files Reference

| File | Purpose |
|------|---------|
| `maner-law-if.html` | The form (now with Supabase integration) |
| `maner-law-form-schema.sql` | Database table schema |
| `maner-law-queries.sql` | Helpful SQL queries |
| `MANER-LAW-SETUP.md` | This file |

---

## 🎯 What Changed

**Before:**
- ❌ Used Resend API to send emails
- ❌ Required API key configuration
- ❌ Submissions only via email
- ❌ No database storage

**After:**
- ✅ Uses Supabase database
- ✅ Submissions stored permanently
- ✅ Easy to view/export/search
- ✅ No email service needed
- ✅ More secure and scalable

---

## 🆘 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify Supabase credentials are correct
- Make sure SQL schema was run successfully

**"Error: relation 'maner_law_submissions' does not exist"**
- Run the SQL schema in Supabase SQL Editor

**Submissions not appearing?**
- Check you're looking at the right Supabase project
- Verify RLS policies are enabled
- Check browser console for errors

---

## 💡 Next Steps (Optional)

### **Add Email Notifications:**
If you want to receive email notifications when someone submits:
1. Use Supabase Database Webhooks
2. Or set up Supabase Edge Functions
3. Or use a service like Zapier to monitor the table

### **Add Admin Dashboard:**
Create a simple admin page to view submissions without logging into Supabase

### **Export Submissions:**
In Supabase Table Editor, click **Export** → **CSV** to download all submissions

---

**All set! Your form now saves to Supabase! 🎉**
