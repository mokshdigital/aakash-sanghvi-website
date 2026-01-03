-- Add skills column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS skills TEXT[];

-- Update skills for existing projects
UPDATE projects 
SET skills = ARRAY['Product Strategy', 'Crisis Management', 'Go-to-Market'] 
WHERE slug = 'edustation';

UPDATE projects 
SET skills = ARRAY['Rapid Prototyping', 'Systems Design', 'Stakeholder Mgmt'] 
WHERE slug = 'eduabroad-expo';

UPDATE projects 
SET skills = ARRAY['UX Design', 'AI Integration', 'User Research'] 
WHERE slug = 'homebudget-ai';
