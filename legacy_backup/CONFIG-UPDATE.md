# ✅ Updated: Simplified Configuration

## What Changed:

The Maner Law form now uses the **shared `config.js`** file instead of duplicating Supabase credentials.

## What This Means for You:

### **You Only Need to Update ONE File!**

Instead of updating credentials in multiple places, just update **`config.js`**:

```javascript
// In config.js (lines 7-8)
const SUPABASE_URL = 'https://your-project.supabase.co'; // ← Your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGc...'; // ← Your actual key
```

This will automatically work for:
- ✅ Portfolio contact form (`work-with-me.html`)
- ✅ Maner Law requirements form (`maner-law-if.html`)
- ✅ Any future forms you add

### **About Vercel Environment Variables:**

You asked about the Vercel environment variables - here's the deal:

**Vercel Environment Variables:**
- ✅ Work for **server-side code** (API routes, serverless functions)
- ❌ **Don't work** for **static HTML files** (they run in the browser)

**Your static HTML files need credentials in the code because:**
- They run in the **user's browser**, not on Vercel's servers
- The browser can't access Vercel's environment variables
- The Supabase **anon key is safe** to expose publicly (it's designed for this)

**Is it secure?**
- ✅ **YES!** The anon/public key is meant to be public
- ✅ Protected by Row Level Security (RLS) policies in Supabase
- ✅ This is the standard Supabase pattern for client-side apps

### **Summary:**

1. ✅ Keep your Vercel environment variables (good for future server-side features)
2. ✅ Update `config.js` with your Supabase credentials (needed for browser-side forms)
3. ✅ Both forms will work automatically
4. ✅ Only maintain credentials in ONE place (`config.js`)

---

**Next Step:** Just update `config.js` with your real Supabase URL and anon key, and you're done! 🎉
