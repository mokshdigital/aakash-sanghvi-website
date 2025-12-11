-- ============================================
-- QUICK SETUP GUIDE - Maner Law Form
-- ============================================

-- STEP 1: Run the SQL schema
-- Copy the contents of maner-law-form-schema.sql and run it in Supabase SQL Editor

-- STEP 2: Update the HTML form
-- Replace the JavaScript in maner-law-if.html with Supabase integration

-- STEP 3: Test the form
-- Submit a test entry and check Supabase Table Editor → maner_law_submissions

-- ============================================
-- HOW TO VIEW SUBMISSIONS
-- ============================================

-- In Supabase Dashboard:
-- 1. Go to Table Editor
-- 2. Click on "maner_law_submissions"
-- 3. View all submissions with timestamps
-- 4. Click any row to see full details
-- 5. Export to CSV if needed

-- ============================================
-- USEFUL QUERIES
-- ============================================

-- Get all unread submissions:
SELECT * FROM maner_law_submissions 
WHERE read = false 
ORDER BY submitted_at DESC;

-- Get submissions from last 7 days:
SELECT * FROM maner_law_submissions 
WHERE submitted_at >= NOW() - INTERVAL '7 days'
ORDER BY submitted_at DESC;

-- Count total submissions:
SELECT COUNT(*) as total_submissions FROM maner_law_submissions;

-- Mark a submission as read (replace the UUID):
UPDATE maner_law_submissions 
SET read = true 
WHERE id = 'your-submission-uuid-here';

-- Get submissions by contact email:
SELECT * FROM maner_law_submissions 
WHERE contact_email = 'example@email.com'
ORDER BY submitted_at DESC;
