-- ========================================================
-- FORMA × AKSHATH 24-HOUR HACKATHON DATABASE SCHEMA & PRODUCTION DATA
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query > Run)
-- ========================================================

-- --------------------------------------------------------
-- 1. TEAMS TABLE (Synchronized from Google Form registrations)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id VARCHAR(50) UNIQUE NOT NULL,           -- e.g. FM-101, FM-102
    team_name VARCHAR(255) NOT NULL,
    leader_name VARCHAR(255) NOT NULL,
    leader_email VARCHAR(255) NOT NULL,
    leader_phone VARCHAR(50),
    members TEXT[] NOT NULL DEFAULT '{}',          -- Array of member names (up to 4 members)
    member_emails TEXT[] DEFAULT '{}',             -- Array of member emails
    track VARCHAR(255) DEFAULT 'General / Open Track (Selection at Check-in)',
    payment_status VARCHAR(50) DEFAULT 'Verified', -- 'Verified' | 'Pending'
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was previously created
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS member_emails TEXT[] DEFAULT '{}';
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS leader_phone VARCHAR(50);

-- Enable Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Allow public search & read so participants can check their Team ID in Check-in Portal
DROP POLICY IF EXISTS "Allow public read on teams" ON public.teams;
CREATE POLICY "Allow public read on teams" 
ON public.teams FOR SELECT USING (true);

-- Allow inserting teams (via Admin Portal & registration forms)
DROP POLICY IF EXISTS "Allow public insert on teams" ON public.teams;
CREATE POLICY "Allow public insert on teams" 
ON public.teams FOR INSERT WITH CHECK (true);

-- Allow updating teams
DROP POLICY IF EXISTS "Allow public update on teams" ON public.teams;
CREATE POLICY "Allow public update on teams" 
ON public.teams FOR UPDATE USING (true);

-- Allow deleting teams (organizer cleanup)
DROP POLICY IF EXISTS "Allow public delete on teams" ON public.teams;
CREATE POLICY "Allow public delete on teams" 
ON public.teams FOR DELETE USING (true);


-- --------------------------------------------------------
-- 2. SUBMISSIONS TABLE (Project hand-off before final deadline)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id VARCHAR(50) NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    track VARCHAR(255) NOT NULL,
    github_url TEXT NOT NULL,
    video_url TEXT NOT NULL,
    live_demo_url TEXT NOT NULL,
    tech_stack TEXT,
    description TEXT,
    challenges_solved TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow teams to submit their project
DROP POLICY IF EXISTS "Allow public insert on submissions" ON public.submissions;
CREATE POLICY "Allow public insert on submissions" 
ON public.submissions FOR INSERT WITH CHECK (true);

-- Allow reading submissions for admin review & confirmation receipts
DROP POLICY IF EXISTS "Allow public read on submissions" ON public.submissions;
CREATE POLICY "Allow public read on submissions" 
ON public.submissions FOR SELECT USING (true);


-- --------------------------------------------------------
-- 3. ANNOUNCEMENTS TABLE (Realtime 24h War Room broadcasts)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tag VARCHAR(50) DEFAULT 'BROADCAST',          -- 'MILESTONE', 'URGENT', 'TIPS', 'IMPORTANT'
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    color VARCHAR(50) DEFAULT '#ff2a7a',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read of announcements
DROP POLICY IF EXISTS "Allow public read on announcements" ON public.announcements;
CREATE POLICY "Allow public read on announcements" 
ON public.announcements FOR SELECT USING (true);

-- Allow organizers / admin modal to broadcast new announcements
DROP POLICY IF EXISTS "Allow public insert on announcements" ON public.announcements;
CREATE POLICY "Allow public insert on announcements" 
ON public.announcements FOR INSERT WITH CHECK (true);

-- Turn on Realtime for live broadcasts across all connected screens
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'announcements'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
  END IF;
END $$;


-- ========================================================
-- PRODUCTION DATA SYNC (Clear old sample data & Insert accurate registered teams)
-- ========================================================

-- 1. Clear out sample test submissions
TRUNCATE TABLE public.submissions;

-- 2. Clear out sample fake teams (Neural Knights, etc.)
TRUNCATE TABLE public.teams;

-- 3. Insert the 2 accurate registered teams
INSERT INTO public.teams (
    team_id, 
    team_name, 
    leader_name, 
    leader_email, 
    leader_phone, 
    members, 
    member_emails, 
    track, 
    payment_status, 
    registered_at
)
VALUES 
  (
    'FM-101', 
    'Team Meet Amit Dharaiya', 
    'Meet Amit Dharaiya', 
    'meetadharaiya@gmail.com', 
    '86180 93307', 
    ARRAY['Meet Amit Dharaiya (Lead)', 'S.Anjali', 'R. Tanushree', 'Mohnish B Nair'], 
    ARRAY['meetadharaiya@gmail.com', 'yashaswinisriram578@gmail.com', 'rtanushree.609052@gmail.com', 'mohnishbnair235@gmail.com'],
    'General / Open Track (Selection at Check-in)', 
    'Verified', 
    NOW()
  ),
  (
    'FM-102', 
    'Team Thanishka Koppanathi', 
    'Thanishka Koppanathi', 
    'thanishka.k06@gmail.com', 
    '8088018007', 
    ARRAY['Thanishka Koppanathi (Lead)', 'M Kaushal', 'Koushik S'], 
    ARRAY['thanishka.k06@gmail.com', 'kaushal090807@gmail.com', 'koushik12567s@gmail.com'],
    'General / Open Track (Selection at Check-in)', 
    'Verified', 
    NOW()
  );


-- 4. Initial Live Announcements (Official Welcome broadcasts)
DELETE FROM public.announcements;
INSERT INTO public.announcements (tag, title, body, color, created_at)
VALUES 
  (
    'MILESTONE', 
    'Welcome to ForMa × Akshath 24-Hour Hackathon!', 
    'Registration verification is live. Teams registered via Google Form can look up their Team ID in the Check-in Portal.', 
    '#38bdf8', 
    NOW() - INTERVAL '30 minutes'
  ),
  (
    'IMPORTANT', 
    'Check-in & Team ID Lookup', 
    'Team Leaders and members can search by leader name, member email, phone number, or Team ID to verify their registration.', 
    '#ec4899', 
    NOW() - INTERVAL '15 minutes'
  );
