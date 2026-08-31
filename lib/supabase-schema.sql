-- ==============================================================================
-- 🌟 Complete Supabase Database Schema for Farah Affes Portfolio & Admin Studio
-- 100% Deadlock-Free & Idempotent (Safe to run multiple times in Supabase SQL Editor)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. CREATE TABLES
-- ------------------------------------------------------------------------------

-- Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'Student',
    topic TEXT DEFAULT 'General question',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread'
);

-- Portfolio Dynamic Settings & Content
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
    id TEXT PRIMARY KEY DEFAULT 'current_state',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    hero JSONB NOT NULL DEFAULT '{}'::jsonb,
    about JSONB NOT NULL DEFAULT '{}'::jsonb,
    stats JSONB NOT NULL DEFAULT '[]'::jsonb,
    contact JSONB NOT NULL DEFAULT '{}'::jsonb,
    works JSONB NOT NULL DEFAULT '[]'::jsonb,
    videos JSONB NOT NULL DEFAULT '[]'::jsonb,
    audiences JSONB NOT NULL DEFAULT '[]'::jsonb,
    testimonials JSONB NOT NULL DEFAULT '[]'::jsonb,
    faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
    admin_pin TEXT DEFAULT 'farah2026'
);

-- Works & Portfolio Showcase
CREATE TABLE IF NOT EXISTS public.works (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tag TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    format TEXT,
    year TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- Video Lessons
CREATE TABLE IF NOT EXISTS public.videos (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    src TEXT NOT NULL,
    takeaways JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- Community Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- FAQ Items
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    q TEXT NOT NULL,
    a TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Single clean policy per table prevents deadlocks and lock contention
-- ------------------------------------------------------------------------------
DO $$
BEGIN
    -- contact_messages
    DROP POLICY IF EXISTS "Public access on contact_messages" ON public.contact_messages;
    CREATE POLICY "Public access on contact_messages" ON public.contact_messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    -- portfolio_settings
    DROP POLICY IF EXISTS "Public access on portfolio_settings" ON public.portfolio_settings;
    CREATE POLICY "Public access on portfolio_settings" ON public.portfolio_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    -- works
    DROP POLICY IF EXISTS "Public access on works" ON public.works;
    CREATE POLICY "Public access on works" ON public.works FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    -- videos
    DROP POLICY IF EXISTS "Public access on videos" ON public.videos;
    CREATE POLICY "Public access on videos" ON public.videos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    -- testimonials
    DROP POLICY IF EXISTS "Public access on testimonials" ON public.testimonials;
    CREATE POLICY "Public access on testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

    -- faqs
    DROP POLICY IF EXISTS "Public access on faqs" ON public.faqs;
    CREATE POLICY "Public access on faqs" ON public.faqs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
END $$;

-- ------------------------------------------------------------------------------
-- 5. ENABLE REALTIME REPLICATION (SAFE & IDEMPOTENT)
-- ------------------------------------------------------------------------------
DO $$
DECLARE
    tbl text;
    tables_to_add text[] := ARRAY[
        'contact_messages',
        'portfolio_settings',
        'works',
        'videos',
        'testimonials',
        'faqs'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables_to_add
    LOOP
        IF NOT EXISTS (
            SELECT 1 FROM pg_publication_tables 
            WHERE pubname = 'supabase_realtime' 
              AND schemaname = 'public' 
              AND tablename = tbl
        ) THEN
            EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', tbl);
        END IF;
    END LOOP;
END $$;

-- ==============================================================================
-- Schema setup complete!
-- ==============================================================================
