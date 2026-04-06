# AG Fashion Hub - User Manual
## Content Management System Guide

**Version:** 2.0
**Last Updated:** December 28, 2025
**CMS URL:** https://cms.amitojenterprisesltd.ca/wp-admin
**Website URL:** https://amitojenterprisesltd.ca

---

## Table of Contents

1. [Introduction](#introduction)
2. [Logging In](#logging-in)
3. [Managing Dress Collections](#managing-dress-collections)
4. [Managing Dress Designs (Products)](#managing-dress-designs-products)
5. [Managing Blog Posts](#managing-blog-posts)
6. [Managing Announcements](#managing-announcements)
7. [WhatsApp Inquiry Feature](#whatsapp-inquiry-feature)
8. [Image Upload Guidelines](#image-upload-guidelines)
9. [Common Errors & How to Avoid Them](#common-errors--how-to-avoid-them)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)
12. [Contact Support](#contact-support)

---

## Introduction

This manual will guide you through managing content on the AG Fashion Hub website. The website displays several types of content:

- **Dress Collections** - Categories of clothing (e.g., "Sarees", "Lehengas")
- **Dress Designs** - Individual products within collections
- **Blog Posts** - Articles and updates for your customers
- **Announcements** - Site-wide banners for promotions, updates, and important messages

**Important:** Changes you make in the CMS will appear on the live website immediately after saving. Always double-check your content before publishing.

---

## Logging In

### Steps to Log In:

1. Open your web browser (Chrome, Safari, or Firefox recommended)
2. Go to: **https://cms.amitojenterprisesltd.ca/wp-admin**
3. Enter your username
4. Enter your password
5. Click **"Log In"**

### ⚠️ Important Security Tips:

- Never share your login credentials
- Use a strong password (at least 12 characters)
- Log out when finished, especially on shared computers
- If you forget your password, click "Lost your password?" on the login page

---

## Managing Dress Collections

Collections are categories that group similar products together (e.g., "Wedding Sarees", "Party Lehengas").

### Viewing All Collections

1. In the WordPress dashboard, hover over **"Pods Admin"** in the left menu
2. Click **"Dress Collections"**
3. You'll see a list of all existing collections

### Adding a New Collection

1. Click **"Pods Admin" → "Dress Collections"**
2. Click **"Add New"** at the top
3. Fill in all required fields (see below)
4. Click **"Publish"** when ready

### Collection Fields Guide

| Field Name | Required | Description | Example | Common Errors to Avoid |
|------------|----------|-------------|---------|------------------------|
| **Title** | ✅ Yes | Main collection name | "Wedding Lehengas" | ❌ Don't use special characters like @, #, $ |
| **Collection Name** | ✅ Yes | Display name on website | "Wedding Lehengas Collection" | ❌ Don't leave blank |
| **Hero Image** | ✅ Yes | Main image for collection card | Upload high-quality image | ❌ Don't use images smaller than 800x600px |
| **Description** | ⚠️ Optional | Brief description | "Elegant wedding lehengas for your special day" | ❌ Don't write too much (keep under 200 characters) |
| **Meta Title** | ⚠️ Optional | SEO title for search engines | "Wedding Lehengas - AG Fashion Hub" | Keep under 60 characters |
| **Meta Description** | ⚠️ Optional | SEO description | "Browse our exclusive collection..." | Keep under 160 characters |

### ⚠️ CRITICAL ERRORS TO AVOID:

❌ **DO NOT:**
- Leave "Title" or "Collection Name" blank
- Upload images in the wrong orientation (portrait for hero images works best)
- Use duplicate collection names
- Delete collections that have designs linked to them

✅ **DO:**
- Use clear, descriptive names
- Upload high-quality images (at least 800x600px)
- Check spelling and grammar before publishing
- Preview before publishing

### Editing an Existing Collection

1. Go to **"Pods Admin" → "Dress Collections"**
2. Find the collection you want to edit
3. Click on the collection name
4. Make your changes
5. Click **"Update"** (NOT "Publish" - that's only for new items)

### Deleting a Collection

⚠️ **WARNING:** Deleting a collection will NOT delete the designs, but they will lose their collection link!

1. Go to **"Pods Admin" → "Dress Collections"**
2. Hover over the collection name
3. Click **"Trash"**
4. Confirm the deletion

---

## Managing Dress Designs (Products)

Designs are individual products that appear on your website.

### Viewing All Designs

1. Hover over **"Pods Admin"** in the left menu
2. Click **"Dress Designs"**
3. You'll see a list of all products

### Adding a New Design

1. Click **"Pods Admin" → "Dress Designs"**
2. Click **"Add New"**
3. Fill in all required fields (see detailed guide below)
4. Click **"Publish"**

### Design Fields Guide

| Field Name | Required | Description | Example | Common Errors to Avoid |
|------------|----------|-------------|---------|------------------------|
| **Title** | ✅ Yes | Product name | "Red Bridal Lehenga" | ❌ Don't leave blank |
| **Design Code** | ✅ Yes | Unique product code | "AG-LEH-001" | ❌ Don't duplicate codes! Each must be unique |
| **Design Gallery** | ✅ Yes | Product images (3-10 images) | Upload multiple photos | ❌ Don't upload less than 3 images |
| **Description** | ⚠️ Optional | Product details | "Beautiful red lehenga with intricate embroidery" | Keep it concise |
| **Fabric** | ⚠️ Optional | Material type | "Silk, Velvet, Cotton" | Use commas to separate multiple fabrics |
| **Color** | ⚠️ Optional | Color name(s) | "Red, Gold" | Use commas for multiple colors |
| **Price** | ⚠️ Optional | Product price | "299.99" | ❌ Don't include $ symbol - just numbers |
| **Size** | ⚠️ Optional | Available sizes | "S, M, L, XL" | Use commas to separate sizes |
| **Linked Collection** | ✅ Yes | Select collection | Choose from dropdown | ❌ Don't leave unselected |
| **Availability** | ⚠️ Optional | Stock status checkbox | Check box for "In Stock" | ✅ Checked = In Stock, ❌ Unchecked = Out of Stock |
| **Care Instructions** | ⚠️ Optional | Product care guidelines | "Dry clean only. Do not bleach." | Plain text (supports HTML formatting) |
| **Show in New Arrivals** | ⚠️ Optional | Feature on homepage | Check box | ✅ Checked = appears in "New Arrivals" section |
| **Occasion** | ⚠️ Optional | Event type | "Wedding, Party, Casual" | Use commas for multiple occasions |
| **Tag** | ⚠️ Optional | Keywords | "bridal, traditional, heavy-work" | Use commas to separate tags |

### 🚨 CRITICAL DESIGN ERRORS TO AVOID:

#### 1. **Duplicate Design Codes**
❌ **WRONG:** Using "AG-001" for multiple products
✅ **CORRECT:** Each product must have a unique code (AG-001, AG-002, AG-003, etc.)

**Why it matters:** Duplicate codes will confuse customers and cause issues with WhatsApp inquiries.

#### 2. **Price Formatting**
❌ **WRONG:** `$299.99`, `CAD 299`, `299 dollars`
✅ **CORRECT:** `299.99` (numbers and decimal point only)

#### 3. **Gallery Images**
❌ **WRONG:**
- Uploading only 1-2 images
- Uploading blurry or low-quality images
- Mixing portrait and landscape orientations randomly

✅ **CORRECT:**
- Upload 3-10 clear, high-quality images
- First image should be the main product photo
- Use consistent orientations when possible
- Minimum 800x800px for each image

#### 4. **Availability Field**
⚠️ **IMPORTANT:** This is a **checkbox field**, NOT a text field!

❌ **WRONG:** Typing "In Stock", "Available", "Yes" as text
✅ **CORRECT:** 
- ✅ **Check the box** = Product is "In Stock"
- ❌ **Leave unchecked** = Product is "Out of Stock"

**Why it matters:** The website filters and stock badges depend on this checkbox being properly set. You don't type anything - just check or uncheck the box.

#### 5. **Collection Linking**
❌ **WRONG:** Leaving "Linked Collection" empty
✅ **CORRECT:** Always select a collection from the dropdown

**Why it matters:** Products without a collection won't display properly on the website.

#### 6. **Comma-Separated Lists**
For fields like Fabric, Color, Size, Occasion, and Tag:

❌ **WRONG:**
- `Red/Gold/Green` (using slashes)
- `Red; Gold; Green` (using semicolons)
- `Red Gold Green` (using spaces only)

✅ **CORRECT:** `Red, Gold, Green` (commas with spaces)

#### 7. **Show in New Arrivals Field**
This checkbox controls whether your product appears in the "New Arrivals" section on the homepage.

- ✅ **Checked** = Product will appear in "New Arrivals" section (if space allows)
- ❌ **Unchecked** = Product will NOT appear in "New Arrivals" section

**Important Notes:**
- Only up to 8 products marked for New Arrivals will be displayed
- If fewer than 8 products are marked, the system will show the most recent products to fill the remaining slots
- This helps you feature new or important products prominently on the homepage

### Step-by-Step: Adding Product Images

1. In the Design edit screen, find **"Design Gallery"**
2. Click **"Add Image"** or **"Upload Files"**
3. Either drag-and-drop images or click **"Select Files"**
4. Select 3-10 images from your computer
5. Wait for upload to complete (you'll see progress bars)
6. The first image will be the main product photo
7. You can drag to reorder images
8. Click **"Update"** or **"Publish"**

**Image Requirements:**
- ✅ Format: JPG, PNG, or WebP
- ✅ Size: At least 800x800px (larger is better)
- ✅ File size: Under 5MB per image
- ✅ Quality: Clear, well-lit, professional photos
- ❌ Avoid: Blurry, dark, or pixelated images

### Editing an Existing Design

1. Go to **"Pods Admin" → "Dress Designs"**
2. Find the product you want to edit
3. Click on the product name
4. Make your changes
5. Click **"Update"**

### Bulk Editing Designs

If you need to update multiple products:

1. Go to **"Pods Admin" → "Dress Designs"**
2. Check the boxes next to products you want to edit
3. Select **"Edit"** from the **"Bulk Actions"** dropdown
4. Click **"Apply"**
5. Make changes in the bulk edit screen
6. Click **"Update"**

⚠️ **Warning:** Be careful with bulk edits - they affect multiple products at once!

### Understanding "New Arrivals" on Homepage

The homepage features a "New Arrivals" section that highlights featured products. Here's how it works:

**How Products Appear in New Arrivals:**
1. **Primary:** Products with "Show in New Arrivals" checkbox ✅ checked
2. **Fallback:** If fewer than 8 products are marked, the system automatically fills remaining slots with the most recent products

**Display Rules:**
- Maximum 8 products are shown in the New Arrivals section
- If you mark more than 8 products for New Arrivals, only the 8 most recent marked products will display
- Products are displayed in reverse chronological order (newest first)
- Only Published products appear

**Best Practices for New Arrivals:**
- ✅ Mark your newest or most important products for New Arrivals
- ✅ Update regularly to keep the section fresh
- ✅ Uncheck "Show in New Arrivals" on older products to make room for new ones
- ✅ Use this feature to highlight seasonal collections or limited-time products

**To Feature a Product in New Arrivals:**
1. Edit the product
2. ✅ Check the "Show in New Arrivals" checkbox
3. Click "Update"
4. The product will appear in the New Arrivals section (if space allows)

### WhatsApp Inquiry Button on Products

Every product card on the website includes a **WhatsApp inquiry button**. When customers click this button:

1. **Opens WhatsApp** with a pre-filled message directed to your business
2. **Message includes:**
   - Design Code (e.g., AG_D3_2025003)
   - Price (if available)
   - Direct link to the product page

**Example message:**
```
Hi, I'd like to inquire about AG_D3_2025003 (Price: $69.00)

https://amitojenterprisesltd.ca/product-detail.html?slug=...
```

**What you need to do:**
- Nothing! The button is automatically added to all product cards
- Ensure your Design Code is unique and correct (this is what appears in the message)
- Make sure prices are entered correctly (they appear in the inquiry message)

This feature helps customers quickly inquire about products they're interested in, making it easier for you to receive and respond to inquiries.

### Testing WhatsApp Inquiry Button

After adding or updating a product, test the WhatsApp button:

1. **Visit the product page** on your website
2. **Click the WhatsApp button** on the product card or detail page
3. **Verify the message includes:**
   - ✅ Correct Design Code
   - ✅ Correct Price (if set)
   - ✅ Working product link
4. **Check that the message is sent to the correct WhatsApp number**

**Note:** You can test this yourself, but the message will go to your business WhatsApp number. This is normal - you're verifying the system works correctly.

---

## Managing Blog Posts

Blog posts help you share news, styling tips, and updates with customers.

### Adding a New Blog Post

1. Click **"Posts"** in the left menu
2. Click **"Add New"**
3. Enter your post title
4. Write your content in the editor
5. Add a featured image (right sidebar → "Featured Image")
6. Select categories (right sidebar → "Categories")
7. Click **"Publish"**

### Blog Post Checklist:

✅ **Before Publishing:**
- [ ] Title is clear and descriptive
- [ ] Content is free of spelling/grammar errors
- [ ] Featured image is uploaded (at least 1200x630px)
- [ ] At least one category is selected
- [ ] Post is proofread and formatted properly

### Blog Best Practices:

- **Title:** Keep under 60 characters for SEO
- **Featured Image:** Use high-quality, relevant images
- **Content Length:** At least 300 words for meaningful content
- **Categories:** Select appropriate categories (don't create duplicates)
- **Formatting:** Use headings (H2, H3) to break up text
- **Links:** Link to relevant products when mentioning them

---

## Managing Announcements

Announcements are site-wide banners that appear at the top of every page on your website. They're perfect for:
- 🎉 Promotional offers and sales
- 📢 Important updates or news
- ⚠️ Special notices (shipping delays, holiday hours, etc.)
- 🎁 Limited-time deals

### Viewing All Announcements

1. In the WordPress dashboard, hover over **"Pods Admin"** in the left menu
2. Click **"Announcements"**
3. You'll see a list of all announcements (active and inactive)

### Adding a New Announcement

1. Click **"Pods Admin" → "Announcements"**
2. Click **"Add New"** at the top
3. Fill in the fields (see guide below)
4. Click **"Publish"** when ready

### Announcement Fields Guide

| Field Name | Required | Description | Example | Notes |
|------------|----------|-------------|---------|-------|
| **Title** | ✅ Yes | Announcement headline | "Holiday Sale - 20% Off!" | Keep it short and attention-grabbing |
| **Message** | ✅ Yes | Main announcement text | "Shop now and save 20% on all lehengas" | Keep under 100 characters for best display |
| **Is Active** | ✅ Yes | Whether announcement is displayed | Check box | ✅ Checked = visible on site, ❌ Unchecked = hidden |
| **Link URL** | ⚠️ Optional | Where to link when clicked | "https://amitojenterprisesltd.ca/collections.html" | Leave blank if no link needed |
| **Link Text** | ⚠️ Optional | Text for the link button | "Shop Now" | Only needed if Link URL is provided |
| **Background Color** | ⚠️ Optional | Custom background color | "#FF5733" or "Red" | Use hex codes or color names |
| **Text Color** | ⚠️ Optional | Custom text color | "#FFFFFF" or "White" | Ensure good contrast with background |
| **Priority** | ⚠️ Optional | Display order (higher = shown first) | "10" | If multiple active announcements exist, highest priority shows first |

### ⚠️ CRITICAL ANNOUNCEMENT RULES:

**How Announcements Work:**
- Only **ONE** announcement displays at a time (the highest priority active announcement)
- Announcements must be both **Published** AND **Is Active checked** to display
- Users can dismiss announcements (they won't see them again in that browser session)
- If multiple announcements are active, only the one with the **highest Priority** number displays

**Best Practices:**
- ✅ Keep messages short and clear (under 100 characters)
- ✅ Use eye-catching colors that match your brand
- ✅ Always test on mobile devices (announcements are responsive)
- ✅ Set appropriate priority for seasonal/timed announcements
- ✅ Uncheck "Is Active" when announcement period ends (don't delete immediately - you might need it again)

### Editing an Existing Announcement

1. Go to **"Pods Admin" → "Announcements"**
2. Find the announcement you want to edit
3. Click on the announcement title
4. Make your changes
5. Click **"Update"**

### Activating/Deactivating Announcements

**To show an announcement:**
1. Edit the announcement
2. Ensure status is **"Published"**
3. ✅ **Check the "Is Active" box**
4. Click **"Update"**

**To hide an announcement (without deleting):**
1. Edit the announcement
2. ❌ **Uncheck the "Is Active" box**
3. Click **"Update"**

The announcement stays in your system but won't display on the website.

### Priority System Explained

Priority determines which announcement shows when multiple are active:
- **Higher number = shown first**
- Example: Priority "10" shows before Priority "5"
- If priorities are equal, the most recently published announcement shows
- **Tip:** Use priority 10 for most important, 5 for normal, 1 for fallback announcements

### Color Customization Tips

**Choosing Colors:**
- Use hex color codes (e.g., `#FF5733`) or color names (e.g., `Red`)
- Ensure good contrast between background and text colors
- Test readability on both desktop and mobile
- Match your brand colors for consistency

**Example Combinations:**
- Background: `#FF5733` (Red) + Text: `#FFFFFF` (White) - Great for sales
- Background: `#2ECC71` (Green) + Text: `#FFFFFF` (White) - Great for success messages
- Background: `#3498DB` (Blue) + Text: `#FFFFFF` (White) - Great for informational messages

### Deleting an Announcement

⚠️ **Note:** It's better to deactivate announcements (uncheck "Is Active") rather than delete them, in case you need them again.

1. Go to **"Pods Admin" → "Announcements"**
2. Hover over the announcement name
3. Click **"Trash"**
4. Confirm the deletion

**Note:** Trashed announcements are permanently deleted after 30 days.

---

## WhatsApp Inquiry Feature

The website includes a comprehensive WhatsApp inquiry system that helps customers contact you directly about products.

### How It Works

**On Product Cards:**
- Every product card on collection pages, homepage, and search results has a WhatsApp button
- The button appears next to the "In Stock" badge
- Clicking it opens WhatsApp with product-specific details

**On Product Detail Pages:**
- A prominent "Share on WhatsApp" button is available in the product actions section
- Clicking it opens WhatsApp with the same pre-filled message

**Floating Button:**
- A floating WhatsApp button appears on all pages (bottom-right corner)
- Clicking it opens WhatsApp with a general inquiry message

### What Information is Sent

When customers click the WhatsApp button on a product, the message automatically includes:

1. **Greeting:** "Hi, I'd like to inquire about"
2. **Design Code:** The unique product code (e.g., AG_D3_2025003)
3. **Price:** If the product has a price set (e.g., Price: $69.00)
4. **Product Link:** Direct URL to the product page

**Example Full Message:**
```
Hi, I'd like to inquire about AG_D3_2025003 (Price: $69.00)

https://amitojenterprisesltd.ca/product-detail.html?slug=red-bridal-lehenga
```

### What You Need to Do

**In WordPress (CMS):**
- ✅ Ensure **Design Code** is unique and correctly entered
- ✅ Enter **Price** accurately (numbers only, no $ symbol)
- ✅ Make sure products are **Published** (not draft)

**Everything else is automatic!**
- Buttons are automatically added to all product cards
- Messages are automatically formatted
- Links are automatically generated

### Best Practices

1. **Unique Design Codes:** Ensure every product has a unique design code - this helps you quickly identify which product customers are inquiring about

2. **Accurate Pricing:** Keep prices updated so customers see correct pricing in their inquiry messages

3. **Quick Response:** Since customers get a direct link to the product, they can share it back to you if needed. Respond promptly to inquiries!

4. **Product Availability:** Update the Availability checkbox regularly so customers know what's in stock

### Troubleshooting WhatsApp Messages

**If messages aren't including product details:**
- Check that the Design Code field is filled in
- Verify the product is Published (not Draft)
- Clear your browser cache and try again

**If the WhatsApp button isn't appearing:**
- Check that product has required fields filled (Title, Design Code, Gallery)
- Verify product is Published
- Check that the product has a Linked Collection

---

## Image Upload Guidelines

Images are crucial for showcasing your products. Follow these guidelines for best results.

### Image Requirements

| Image Type | Minimum Size | Recommended Size | Format | Max File Size |
|------------|--------------|------------------|--------|---------------|
| **Collection Hero Image** | 800x600px | 1200x800px | JPG/PNG | 3MB |
| **Design Gallery Images** | 800x800px | 1200x1200px | JPG/PNG | 5MB each |
| **Blog Featured Image** | 1200x630px | 1200x630px | JPG/PNG | 3MB |

### Image Upload Steps:

1. Click **"Add Image"** or **"Set Featured Image"**
2. Click **"Upload Files"**
3. Drag-and-drop or click **"Select Files"**
4. Wait for upload to complete
5. Fill in **"Alt Text"** (describe the image for accessibility)
6. Click **"Set Image"** or **"Select"**

### ✅ Image Best Practices:

- Use clear, well-lit, professional photos
- Keep file sizes optimized (compress before upload)
- Use descriptive alt text for all images
- Maintain consistent styling across product photos
- Use high-resolution images (website will auto-resize)

### ❌ Image Errors to Avoid:

- **Blurry or pixelated images** - Makes products look unprofessional
- **Inconsistent backgrounds** - Maintain visual consistency
- **Wrong orientation** - Match product type (portrait vs. landscape)
- **Missing alt text** - Important for accessibility and SEO
- **Oversized files** - Slows down website (compress before upload)

### How to Optimize Images Before Upload:

1. **Use free tools:**
   - TinyPNG.com - Compress images without quality loss
   - Squoosh.app - Google's image compression tool
   - Canva.com - Resize and edit images

2. **Recommended settings:**
   - Format: JPG for photos, PNG for graphics with transparency
   - Quality: 80-90% (balances quality and file size)
   - Dimensions: Follow table above

---

## Common Errors & How to Avoid Them

### Error 1: "This design code already exists"

**Problem:** You're trying to use a design code that's already assigned to another product.

**Solution:**
1. Use unique codes for each product
2. Check existing designs before creating new ones
3. Use a numbering system (e.g., AG-001, AG-002, AG-003)

---

### Error 2: Product not appearing on website

**Possible Causes & Solutions:**

**Cause 1:** Product is in "Draft" status
✅ **Solution:** Change status to "Published"

**Cause 2:** No collection linked
✅ **Solution:** Edit the design and select a "Linked Collection"

**Cause 3:** No images uploaded
✅ **Solution:** Add at least 3 images to "Design Gallery"

**Cause 4:** Title is blank
✅ **Solution:** Add a proper title to the design

---

### Error 3: Images not displaying correctly

**Possible Causes & Solutions:**

**Cause 1:** Image file too large
✅ **Solution:** Compress image to under 5MB before uploading

**Cause 2:** Unsupported format
✅ **Solution:** Convert to JPG or PNG

**Cause 3:** Image upload didn't complete
✅ **Solution:** Wait for green checkmark, then save

---

### Error 4: Filters not working on website

**Problem:** Products don't appear when customers use filters.

**Cause:** Incorrect formatting in fields like "Availability", "Color", "Occasion"

**Solution:**
- **Availability:** ✅ Check the box for "In Stock", ❌ Uncheck for "Out of Stock" (it's a checkbox, not text!)
- **Color/Fabric/Occasion:** Use comma-separated lists: "Red, Gold, Green"
- **Price:** Numbers only, no currency symbols: "299.99"

---

### Error 5: Collection appears empty

**Problem:** Collection page shows "No designs found"

**Solutions:**
1. Ensure designs have this collection selected in "Linked Collection"
2. Ensure designs are published (not drafts)
3. Check that designs have required fields filled

---

## Best Practices

### Daily Operations

1. **Before Adding Content:**
   - Have all images ready and optimized
   - Have product details written and proofread
   - Check for duplicate design codes

2. **While Adding Content:**
   - Fill all required fields first
   - Save drafts frequently (click "Save Draft")
   - Preview before publishing
   - Double-check prices and codes

3. **After Publishing:**
   - Visit the live website to verify it displays correctly
   - Test product page, filters, and images
   - Check WhatsApp link works with correct product info

### Weekly Maintenance

- Review and update product availability (check/uncheck Availability boxes)
- Check for any products missing images
- Update blog with new content
- Review and respond to any customer inquiries (check WhatsApp messages)
- Update "New Arrivals" section (check/uncheck products as needed)
- Review active announcements (deactivate expired promotions)

### Monthly Checklist

- [ ] Audit all product codes for duplicates
- [ ] Check all images are displaying properly
- [ ] Update seasonal collections
- [ ] Review and update pricing
- [ ] Clean up draft posts/products
- [ ] Review and update announcements (archive old ones)
- [ ] Update "New Arrivals" section with fresh products
- [ ] Verify all WhatsApp inquiry buttons work correctly
- [ ] Check that care instructions are added to all products
- [ ] Review product descriptions and update as needed
- [ ] Back up product data (WordPress handles this automatically, but verify)

---

## Troubleshooting

### "I can't log in"

1. Verify you're at the correct URL: https://cms.amitojenterprisesltd.ca/wp-admin
2. Check Caps Lock is off
3. Try "Forgot Password" link
4. Clear browser cache and cookies
5. Try a different browser

### "Changes aren't showing on the website"

1. Verify you clicked "Publish" or "Update"
2. Wait 1-2 minutes for changes to propagate
3. Hard refresh the website (Ctrl+F5 on Windows, Cmd+Shift+R on Mac)
4. Clear your browser cache
5. Check in incognito/private browsing mode

### "Images won't upload"

1. Check file size (must be under 5MB)
2. Check file format (use JPG or PNG)
3. Check your internet connection
4. Try uploading one image at a time
5. Try compressing the image first

### "I accidentally deleted something"

1. Go to **"Pods Admin" → "Dress Collections"** or **"Dress Designs"**
2. Click **"Trash"** at the top
3. Find the deleted item
4. Click **"Restore"**

**Note:** Items in trash are permanently deleted after 30 days.

### "The website looks broken"

1. Don't panic - this is usually a browser cache issue
2. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
3. Clear browser cache and cookies
4. Try viewing in incognito/private mode
5. If still broken, contact technical support immediately

---

## Field Reference Quick Guide

### Required Fields Summary

**Every Dress Collection Must Have:**
- ✅ Title
- ✅ Collection Name
- ✅ Hero Image

**Every Dress Design Must Have:**
- ✅ Title
- ✅ Design Code (unique!)
- ✅ Design Gallery (3-10 images)
- ✅ Linked Collection

**Every Announcement Must Have:**
- ✅ Title
- ✅ Message
- ✅ Is Active (checkbox - checked to display)

**Every Blog Post Must Have:**
- ✅ Title
- ✅ Content
- ✅ Featured Image
- ✅ At least one category

### Field Formatting Reference

| Field | Format | Example | Wrong Example |
|-------|--------|---------|---------------|
| **Price** | Numbers only | `299.99` | ❌ `$299.99` |
| **Availability** | Checkbox | ✅ Checked = In Stock | ❌ Typing "In Stock" as text |
| **Show in New Arrivals** | Checkbox | ✅ Checked = Featured | N/A |
| **Is Active** (Announcements) | Checkbox | ✅ Checked = Visible | ❌ Typing "Yes" as text |
| **Colors** | Comma-separated | `Red, Gold` | ❌ `Red/Gold` |
| **Sizes** | Comma-separated | `S, M, L` | ❌ `S M L` |
| **Design Code** | Alphanumeric | `AG-LEH-001` | ❌ Duplicates |
| **Occasion** | Comma-separated | `Wedding, Party` | ❌ `Wedding/Party` |

---

## Content Writing Tips

### Writing Product Descriptions

**Good Description:**
> "Elegant red bridal lehenga featuring intricate gold embroidery. Perfect for weddings and special occasions. Made from premium silk fabric with velvet borders."

**Poor Description:**
> "Red lehenga."

**Tips:**
- Highlight key features (embroidery, fabric, color)
- Mention occasions (wedding, party, casual)
- Keep it under 200 characters
- Use descriptive adjectives (elegant, stunning, beautiful)
- Mention unique selling points

### Writing Collection Descriptions

**Good Description:**
> "Discover our exclusive wedding saree collection featuring traditional designs with modern elegance. Perfect for brides and wedding guests."

**Poor Description:**
> "Wedding sarees."

**Tips:**
- Explain what makes this collection special
- Mention target audience (brides, guests, etc.)
- Keep it concise but descriptive
- Use emotional/aspirational language

### Writing Blog Posts

**Good Practices:**
- Start with an engaging introduction
- Use subheadings to break up content
- Include relevant product links
- Add high-quality images
- End with a call-to-action (e.g., "Shop the collection")

---

## SEO Best Practices

### Meta Titles

- Keep under 60 characters
- Include primary keyword
- Include brand name
- Example: "Wedding Lehengas - AG Fashion Hub"

### Meta Descriptions

- Keep under 160 characters
- Include primary and secondary keywords
- Write a compelling summary
- Include a call-to-action
- Example: "Browse our exclusive wedding lehenga collection featuring traditional and modern designs. Shop now at AG Fashion Hub."

### Image Alt Text

- Describe the image clearly
- Include relevant keywords naturally
- Keep under 125 characters
- Example: "Red bridal lehenga with gold embroidery - AG Fashion Hub"

---

## Workflow Templates

### Template: Adding a New Product

1. **Preparation** (before logging in)
   - [ ] Product photos ready (3-10 images, optimized)
   - [ ] Product details written
   - [ ] Unique design code assigned
   - [ ] Price confirmed
   - [ ] Collection determined

2. **In WordPress:**
   - [ ] Go to Pods Admin → Dress Designs → Add New
   - [ ] Enter Title
   - [ ] Enter Design Code
   - [ ] Upload Design Gallery images
   - [ ] Enter Description
   - [ ] Enter Fabric
   - [ ] Enter Color
   - [ ] Enter Price (numbers only)
   - [ ] Enter Size
   - [ ] Select Linked Collection
   - [ ] Set Availability (check/uncheck box)
   - [ ] Enter Care Instructions (optional)
   - [ ] Set Show in New Arrivals (check if featured product)
   - [ ] Enter Occasion
   - [ ] Add Tags
   - [ ] Click "Publish"

3. **Verification:**
   - [ ] Visit website and find the product
   - [ ] Check all images display
   - [ ] Test filters (color, price, occasion)
   - [ ] Click WhatsApp button to verify product info (check code, price, link)
   - [ ] Check product appears in correct collection
   - [ ] If marked for New Arrivals, verify it appears on homepage
   - [ ] Check care instructions display correctly (if added)

### Template: Weekly Content Update

1. **Monday:**
   - [ ] Review inventory
   - [ ] Update "Out of Stock" products
   - [ ] Plan blog post for the week

2. **Wednesday:**
   - [ ] Add new products (if any)
   - [ ] Write and publish blog post
   - [ ] Update social media

3. **Friday:**
   - [ ] Review week's changes
   - [ ] Check all products display correctly
   - [ ] Plan next week's content

---

## Keyboard Shortcuts

Save time with these WordPress shortcuts:

| Action | Windows | Mac |
|--------|---------|-----|
| **Save Draft** | Ctrl + S | Cmd + S |
| **Publish/Update** | Ctrl + Alt + P | Ctrl + Option + P |
| **Bold Text** | Ctrl + B | Cmd + B |
| **Italic Text** | Ctrl + I | Cmd + I |
| **Insert Link** | Ctrl + K | Cmd + K |
| **Undo** | Ctrl + Z | Cmd + Z |
| **Redo** | Ctrl + Shift + Z | Cmd + Shift + Z |

---

## Contact Support

### For Technical Issues:

**Developer Contact:** [Your Developer Contact Info]
**Email:** [Support Email]
**Response Time:** 24-48 hours

### Before Contacting Support:

Please provide:
1. What you were trying to do
2. What went wrong
3. Screenshots of the error (if applicable)
4. Which browser you're using
5. When the issue started

### For Hosting/Domain Issues:

**Hosting Provider:** Hostinger
**Account:** amitojenterprisesltd.ca

---

## Appendix: Glossary

**Announcement** - Site-wide banner displayed at top of pages
**CMS** - Content Management System (WordPress)
**Design Code** - Unique identifier for each product
**Draft** - Unpublished content saved for later
**Featured Image** - Main image for blog posts
**Gallery** - Collection of multiple images
**Hero Image** - Large main image on collection cards
**Is Active** - Checkbox field that controls visibility of announcements
**Linked Collection** - The category a product belongs to
**Meta Description** - SEO description for search engines
**Meta Title** - SEO title for search engines
**New Arrivals** - Featured products section on homepage
**Pods** - Custom post type framework used for Collections, Designs, and Announcements
**Priority** - Number that determines display order (higher = shown first)
**Publish** - Make content live on the website
**Slug** - URL-friendly version of title
**WordPress** - The CMS platform used for AG Fashion Hub

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | November 28, 2025 | Initial user manual created |
| 2.0 | December 28, 2025 | Major update: Fixed Availability field documentation (checkbox, not text), Added Care Instructions field, Added Show in New Arrivals field, Added complete Announcements management section, Added WhatsApp Inquiry Feature documentation, Updated all field references and error sections |

---

## Quick Reference Card

**Print this page and keep it near your computer!**

### 🔐 Login
**URL:** https://cms.amitojenterprisesltd.ca/wp-admin

### ✅ Required Fields Checklist

**Collections:**
- [ ] Title
- [ ] Collection Name
- [ ] Hero Image

**Designs:**
- [ ] Title
- [ ] Design Code (UNIQUE!)
- [ ] Gallery (3-10 images)
- [ ] Linked Collection

**Announcements:**
- [ ] Title
- [ ] Message
- [ ] Is Active (CHECKED to display)

### ⚠️ Top 5 Errors to Avoid

1. ❌ Duplicate design codes
2. ❌ Price with $ symbol (use numbers only: 299.99)
3. ❌ Typing availability as text (it's a CHECKBOX - check/uncheck it!)
4. ❌ Less than 3 gallery images
5. ❌ No linked collection selected

### 📞 Emergency Contacts

**Technical Support:** [Your Contact]
**Hostinger Support:** support@hostinger.com

---

**End of User Manual**

*This manual is maintained by the AG Fashion Hub development team. For updates or corrections, please contact your developer.*
