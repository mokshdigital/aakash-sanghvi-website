-- ============================================
-- FIX: Allow admin dashboard to read submissions
-- ============================================
-- Run this in Supabase SQL Editor to allow reading submissions

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "No public read access" ON maner_law_submissions;

-- Create new policy that allows reading
CREATE POLICY "Allow reading submissions" ON maner_law_submissions
  FOR SELECT USING (true);

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'maner_law_submissions';
