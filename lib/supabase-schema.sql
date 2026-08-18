-- ==============================================================================
-- 🌟 Complete Supabase Database Schema for Farah Affes Portfolio & Admin Studio
-- Run this complete script in your Supabase Project:
-- Dashboard -> SQL Editor -> New Query -> Paste & Click "Run"
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. TABLE: Contact Messages
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'Student',
    topic TEXT DEFAULT 'General question',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived'))
);

-- ------------------------------------------------------------------------------
-- 3. TABLE: Material & Resource Orders (Buy & Rent)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT DEFAULT 'Guest',
    customer_email TEXT DEFAULT 'Not provided',
    customer_phone TEXT NOT NULL,
    customer_location TEXT DEFAULT 'Sfax, Tunisia',
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT 'TND',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'confirmed', 'fulfilled', 'completed', 'cancelled')),
    rental_dates TEXT,
    notes TEXT
);

-- ------------------------------------------------------------------------------
-- 4. TABLE: Portfolio Dynamic Settings & Content Cache
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
    id TEXT PRIMARY KEY DEFAULT 'current_state',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    hero JSONB NOT NULL DEFAULT '{}'::jsonb,
    about JSONB NOT NULL DEFAULT '{}'::jsonb,
    stats JSONB NOT NULL DEFAULT '[]'::jsonb,
    contact JSONB NOT NULL DEFAULT '{}'::jsonb,
    admin_pin TEXT DEFAULT 'farah2026'
);

-- ------------------------------------------------------------------------------
-- 5. TABLE: Works & Portfolio Showcase
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.works (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('props', 'posters', 'flyers', 'classroom', 'worksheets')),
    tag TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    format TEXT,
    year TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 6. TABLE: Video Lessons
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.videos (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('pronunciation', 'grammar', 'storytelling', 'workshop')),
    thumbnail TEXT NOT NULL,
    src TEXT NOT NULL,
    takeaways JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 7. TABLE: Shop Products (Buy & Rent)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    buy_price NUMERIC(10, 2),
    rent_price NUMERIC(10, 2),
    options JSONB DEFAULT '["buy"]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 8. TABLE: Community Testimonials
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 9. TABLE: FAQ Items
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    q TEXT NOT NULL,
    a TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 10. ENABLE ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Public Anonymous Inserts (Visitors sending contact messages & orders)
DROP POLICY IF EXISTS "Allow public inserts on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public inserts on contact_messages"
    ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public inserts on orders" ON public.orders;
CREATE POLICY "Allow public inserts on orders"
    ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Public Read for all portfolio entities
DROP POLICY IF EXISTS "Allow public read on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public read on contact_messages"
    ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on orders" ON public.orders;
CREATE POLICY "Allow public read on orders"
    ON public.orders FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on portfolio_settings" ON public.portfolio_settings;
CREATE POLICY "Allow public read on portfolio_settings"
    ON public.portfolio_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on works" ON public.works;
CREATE POLICY "Allow public read on works"
    ON public.works FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on videos" ON public.videos;
CREATE POLICY "Allow public read on videos"
    ON public.videos FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on products" ON public.products;
CREATE POLICY "Allow public read on products"
    ON public.products FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on testimonials" ON public.testimonials;
CREATE POLICY "Allow public read on testimonials"
    ON public.testimonials FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow public read on faqs" ON public.faqs;
CREATE POLICY "Allow public read on faqs"
    ON public.faqs FOR SELECT TO anon, authenticated USING (true);

-- Full Updates / Deletes / Upserts
DROP POLICY IF EXISTS "Allow public update on contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public update on contact_messages"
    ON public.contact_messages FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on orders" ON public.orders;
CREATE POLICY "Allow public update on orders"
    ON public.orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on portfolio_settings" ON public.portfolio_settings;
CREATE POLICY "Allow public update on portfolio_settings"
    ON public.portfolio_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on works" ON public.works;
CREATE POLICY "Allow public update on works"
    ON public.works FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on videos" ON public.videos;
CREATE POLICY "Allow public update on videos"
    ON public.videos FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on products" ON public.products;
CREATE POLICY "Allow public update on products"
    ON public.products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on testimonials" ON public.testimonials;
CREATE POLICY "Allow public update on testimonials"
    ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update on faqs" ON public.faqs;
CREATE POLICY "Allow public update on faqs"
    ON public.faqs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 12. ENABLE SUPABASE REALTIME REPLICATION
-- ------------------------------------------------------------------------------
-- Enables instantaneous live updates across all connected browsers and phones
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.works;
ALTER PUBLICATION supabase_realtime ADD TABLE public.videos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.faqs;

-- ==============================================================================
-- Schema creation complete! Ready for live instant real-time sync.
-- ==============================================================================
