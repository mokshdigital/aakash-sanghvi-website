-- ============================================
-- Aakash Sanghvi Portfolio - Database Schema
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROJECTS TABLE
-- Stores portfolio projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL, -- Array of technologies used
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. CONTACTS TABLE
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. PAGE VIEWS TABLE (Optional - for analytics)
-- Tracks page views
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- INDEXES for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Projects: Public read access, no write access (you'll add via SQL editor or admin panel later)
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

-- Contacts: Public can insert (contact form), no read access
CREATE POLICY "Public can submit contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Page Views: Public can insert (analytics), no read access
CREATE POLICY "Public can log page views" ON page_views
  FOR INSERT WITH CHECK (true);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

INSERT INTO projects (title, description, tech_stack, featured, display_order) VALUES
  (
    'Portfolio Website',
    'A clean, modern portfolio website showcasing AI-powered web development skills and projects. Features smooth scrolling, responsive design, and integrated booking system.',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Supabase'],
    true,
    1
  ),
  (
    'More Projects Coming',
    'Additional projects will be showcased here as they are completed and deployed.',
    ARRAY['TBD'],
    false,
    2
  );

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Run these to verify everything is set up correctly:
-- SELECT * FROM projects;
-- SELECT * FROM contacts;
-- SELECT * FROM page_views;
