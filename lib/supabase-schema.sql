-- ==============================================================================
-- Supabase Schema for Farah's Educator Portfolio & Resource Shop
-- Run this script in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Create table for Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'A student',
    topic TEXT DEFAULT 'General question',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived'))
);

-- 2. Create table for Material & Resource Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT DEFAULT 'Guest',
    customer_email TEXT DEFAULT 'Not provided',
    customer_phone TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT 'TND',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'fulfilled', 'cancelled')),
    notes TEXT
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies allowing public anonymous users to insert contact messages & orders
CREATE POLICY "Allow public inserts on contact_messages"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public inserts on orders"
    ON public.orders
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. Create policy allowing read access only to authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated read on contact_messages"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read on orders"
    ON public.orders
    FOR SELECT
    TO authenticated
    USING (true);
