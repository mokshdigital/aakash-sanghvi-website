-- 1. Ensure all columns exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metric_value TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metric_description TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS role TEXT;

-- 2. Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- 3. Upsert the Featured Projects (With thumbnail_url and detail_url placeholders)
INSERT INTO projects (
    title, 
    slug, 
    metric_value, 
    metric_description, 
    role, 
    featured, 
    display_order, 
    description, 
    tech_stack,
    thumbnail_url,
    detail_url
)
VALUES 
(
  'EduStation — EdTech SaaS Platform',
  'edustation',
  '0 → 5K',
  'students in 60 days during COVID',
  'Founder / PM',
  true,
  1,
  'EdTech SaaS Platform',
  ARRAY['React', 'Node.js'],
  '/images/placeholder.png',
  '/projects/edustation'
),
(
  'EduAbroad Expo Manager',
  'eduabroad-expo',
  '10 Days',
  'to ship. 2,000+ students. 50+ universities.',
  'Lead Developer',
  true,
  2,
  'Event Management System',
  ARRAY['No-Code', 'Supabase'],
  '/images/placeholder.png',
  '/projects/eduabroad-expo'
),
(
  'HomeBudget AI',
  'homebudget-ai',
  'Shipped',
  'AI-powered personal finance PWA',
  'Solo PM / Designer',
  true,
  3,
  'Personal Finance PWA',
  ARRAY['Next.js', 'AI'],
  '/images/placeholder.png',
  '/projects/homebudget-ai'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  metric_value = EXCLUDED.metric_value,
  metric_description = EXCLUDED.metric_description,
  role = EXCLUDED.role,
  featured = EXCLUDED.featured,
  display_order = EXCLUDED.display_order;
