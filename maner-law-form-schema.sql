-- ============================================
-- Maner Law Website Requirements Form - Database Schema
-- ============================================
-- Run this in Supabase SQL Editor to create the table for form submissions
-- ============================================

-- Create table for Maner Law form submissions
CREATE TABLE IF NOT EXISTS maner_law_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 1. Firm & Primary Contact
  firm_name TEXT,
  location TEXT,
  website TEXT,
  contact_name TEXT NOT NULL,
  contact_role TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  
  -- 2. Lawyer Profiles
  lawyer1_name TEXT,
  lawyer1_titles TEXT,
  lawyer1_email TEXT,
  lawyer1_bio TEXT,
  lawyer2_name TEXT,
  lawyer2_titles TEXT,
  lawyer2_email TEXT,
  lawyer2_bio TEXT,
  
  -- 3. Practice Areas
  practice_areas TEXT, -- Comma-separated list from checkboxes
  practice_areas_other TEXT,
  
  -- 4. Website Goals & Style
  goals TEXT, -- Comma-separated list from checkboxes
  style TEXT,
  
  -- 5. Features & Compliance
  features TEXT, -- Comma-separated list from checkboxes
  compliance TEXT, -- Comma-separated list from checkboxes
  
  -- 6. Timeline, Budget & Notes
  timeline TEXT,
  budget TEXT,
  notes TEXT,
  
  -- Metadata
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  read BOOLEAN DEFAULT false,
  ip_address TEXT, -- Optional: to track where submission came from
  user_agent TEXT -- Optional: to track browser/device info
);

-- ============================================
-- INDEXES for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_maner_law_submitted_at ON maner_law_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_maner_law_read ON maner_law_submissions(read);
CREATE INDEX IF NOT EXISTS idx_maner_law_contact_email ON maner_law_submissions(contact_email);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE maner_law_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Public can insert (submit forms)
CREATE POLICY "Public can submit Maner Law forms" ON maner_law_submissions
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users can read (you'll need to set up auth for this)
-- For now, we'll allow no public reads - you'll access via Supabase dashboard
CREATE POLICY "No public read access" ON maner_law_submissions
  FOR SELECT USING (false);

-- ============================================
-- OPTIONAL: Function to mark submission as read
-- ============================================

CREATE OR REPLACE FUNCTION mark_maner_submission_read(submission_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE maner_law_submissions
  SET read = true
  WHERE id = submission_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VERIFICATION
-- ============================================

-- Run this to verify the table was created:
-- SELECT * FROM maner_law_submissions;

-- ============================================
-- NOTES
-- ============================================

-- To view submissions in Supabase:
-- 1. Go to Table Editor → maner_law_submissions
-- 2. You'll see all form submissions with timestamps
-- 3. Click on a row to view full details
-- 4. You can export to CSV for backup

-- To get unread submissions count:
-- SELECT COUNT(*) FROM maner_law_submissions WHERE read = false;

-- To get recent submissions:
-- SELECT * FROM maner_law_submissions ORDER BY submitted_at DESC LIMIT 10;
