/*
  # Create CMS Content Management System

  1. New Tables
    - `cms_content`
      - `id` (uuid, primary key)
      - `slug` (text, unique per language)
      - `title` (text)
      - `content` (text, supports markdown)
      - `meta_description` (text, optional)
      - `language` (text, default 'en')
      - `published` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `cms_content` table
    - Add policy for public read access to published content
    - Add policy for authenticated users to manage all content

  3. Indexes
    - Unique index on slug + language combination
    - Index on published status and language for fast queries
*/

-- Create cms_content table
CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  meta_description text,
  language text NOT NULL DEFAULT 'en',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique index for slug + language combination
CREATE UNIQUE INDEX IF NOT EXISTS cms_content_slug_language_idx 
ON cms_content (slug, language);

-- Create index for published content queries
CREATE INDEX IF NOT EXISTS cms_content_published_idx 
ON cms_content (published, language);

-- Enable Row Level Security
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published content
CREATE POLICY "Anyone can view published content"
ON cms_content
FOR SELECT
TO anon, authenticated
USING (published = true);

-- Policy for authenticated users to manage all content
CREATE POLICY "Authenticated users can manage content"
ON cms_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_cms_content_updated_at
  BEFORE UPDATE ON cms_content
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();