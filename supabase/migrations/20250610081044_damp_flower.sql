-- Check if cms_content table exists before creating it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'cms_content') THEN
    -- Create cms_content table
    CREATE TABLE cms_content (
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
    CREATE UNIQUE INDEX cms_content_slug_language_idx 
    ON cms_content (slug, language);

    -- Create index for published content queries
    CREATE INDEX cms_content_published_idx 
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
  END IF;
END $$;

-- Create updated_at trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_cms_content_updated_at') THEN
    -- Create updated_at trigger function if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_updated_at') THEN
      CREATE OR REPLACE FUNCTION handle_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    END IF;

    -- Create the trigger
    CREATE TRIGGER set_cms_content_updated_at
      BEFORE UPDATE ON cms_content
      FOR EACH ROW
      EXECUTE FUNCTION handle_updated_at();
  END IF;
END $$;