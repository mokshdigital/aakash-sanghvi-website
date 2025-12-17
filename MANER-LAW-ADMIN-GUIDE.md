# 🔐 Maner Law Admin Dashboard - User Guide

## Overview

I've created a password-protected admin dashboard where you can view all Maner Law form submissions in a beautiful, organized interface.

---

## 📍 How to Access

### **Local (Testing)**
Open the file directly:
```
file:///e:/Moksh Digital Web Designer/Portfolio/Aakash Sanghvi website/maner-law-admin.html
```

### **Live (After Deployment)**
Once deployed to Vercel:
```
https://your-vercel-domain.vercel.app/maner-law-admin.html
```

---

## 🔑 Login Credentials

**Default Password:** `maner2024`

**To change the password:**
1. Open `maner-law-admin.html`
2. Find line 242: `const ADMIN_PASSWORD = 'maner2024';`
3. Change to your desired password
4. Save and commit

---

## ✨ Features

### **Dashboard Overview**
- 📊 **Total Submissions** - Count of all form responses
- 🆕 **Unread Count** - Number of new submissions
- 🔍 **Search** - Filter by name, email, or firm name
- 🔄 **Refresh** - Reload latest submissions
- 🚪 **Logout** - Secure logout

### **Submission Cards**
Each submission is displayed in a beautiful card showing:

**Firm & Contact Information:**
- Firm name, location, website
- Contact name, email, phone, role

**Lawyer Profiles:**
- Up to 2 lawyer profiles
- Names, titles, emails, bios

**Practice Areas & Goals:**
- Selected practice areas
- Website goals and desired style

**Features & Compliance:**
- Requested features
- Compliance requirements

**Timeline & Budget:**
- Preferred timeline
- Budget range
- Additional notes

---

## 🎨 Visual Features

- **Color-coded badges** - "NEW" badge for unread submissions
- **Organized sections** - Grouped by category with icons
- **Responsive cards** - Hover effects and smooth animations
- **Empty state handling** - Shows "Not provided" for empty fields
- **Date formatting** - Human-readable timestamps

---

## 🔒 Security

- **Password protected** - Requires login to view
- **Session-based** - Stays logged in during browser session
- **Logout button** - Clear session anytime
- **Read-only** - Cannot modify or delete submissions from dashboard

---

## 💡 Tips

### **Viewing Submissions**
- Submissions are sorted by newest first
- Use search to quickly find specific clients
- Click refresh to get latest submissions

### **Managing Submissions**
To mark as read or delete:
1. Go to Supabase Dashboard
2. Table Editor → `maner_law_submissions`
3. Edit or delete rows directly

### **Exporting Data**
In Supabase Table Editor:
1. Click **Export** button
2. Choose CSV format
3. Download for backup or analysis

---

## 🚀 Next Steps

### **Optional Enhancements:**

1. **Add "Mark as Read" button**
   - Update submission status from dashboard
   - Requires adding update functionality

2. **Add Email Notifications**
   - Get notified when new submission arrives
   - Use Supabase webhooks or Edge Functions

3. **Add Filters**
   - Filter by date range
   - Filter by read/unread status
   - Filter by practice area

4. **Add Export Feature**
   - Export filtered results to CSV
   - Generate PDF reports

---

## 📝 File Location

**File:** `maner-law-admin.html`

**Dependencies:**
- `config.js` - Supabase configuration
- Supabase database with `maner_law_submissions` table

---

## 🆘 Troubleshooting

**Can't login?**
- Check password in line 242 of `maner-law-admin.html`
- Default is `maner2024`

**No submissions showing?**
- Make sure SQL schema was run in Supabase
- Check browser console for errors
- Verify Supabase credentials in `config.js`

**"Loading..." forever?**
- Check Supabase connection
- Verify table `maner_law_submissions` exists
- Check browser console for errors

---

**Your admin dashboard is ready! 🎉**

Access it locally now to test, and it will be live on Vercel after deployment!
