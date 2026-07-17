/*
# Create Admin Authentication & Analytics Tables

## 1. New Tables

### admin_users
- Stores admin credentials (mobile + password hash).
- `id` (uuid, primary key)
- `mobile` (text, unique, not null) — admin login mobile number
- `password_hash` (text, not null) — bcrypt/argon2 hash
- `name` (text) — admin display name
- `created_at` (timestamptz)

### visitor_sessions
- Tracks each unique visitor session.
- `id` (uuid, primary key)
- `session_id` (text, unique) — client-generated session ID
- `ip_address` (text) — visitor IP (when permitted)
- `country` (text)
- `region` (text)
- `city` (text)
- `browser` (text)
- `os` (text)
- `device_type` (text) — desktop/mobile/tablet
- `screen_resolution` (text)
- `language` (text)
- `referrer_source` (text)
- `referrer_url` (text)
- `utm_source` (text)
- `utm_medium` (text)
- `utm_campaign` (text)
- `entry_page` (text)
- `exit_page` (text)
- `pages_viewed` (integer, default 1)
- `scroll_depth` (integer, default 0)
- `is_active` (boolean, default true)
- `is_returning` (boolean, default false)
- `session_start` (timestamptz, default now())
- `session_end` (timestamptz) — null while active
- `duration_seconds` (integer) — computed on session end
- `created_at` (timestamptz, default now())

### page_views
- Individual page view events within sessions.
- `id` (uuid, primary key)
- `session_id` (text, not null) — references visitor_sessions.session_id
- `page_path` (text, not null)
- `page_title` (text)
- `duration_seconds` (integer, default 0)
- `scroll_depth` (integer, default 0)
- `viewed_at` (timestamptz, default now())

### lead_status
- Tracks lead lifecycle status changes.
- `id` (uuid, primary key)
- `lead_type` (text, not null) — 'contact' | 'consultation'
- `lead_id` (uuid, not null) — references contact_submissions or consultation_requests
- `status` (text, default 'new') — 'new' | 'contacted' | 'closed'
- `updated_at` (timestamptz, default now())

## 2. Security

- RLS enabled on all tables.
- admin_users: No anon access (service-role only via edge function).
- visitor_sessions, page_views: anon can INSERT (tracking) but not SELECT.
- lead_status: No anon access (admin only via edge function).

## 3. Important Notes

- Admin authentication is handled via edge function using service-role key.
- Visitor tracking inserts are allowed from anon key (public website).
- All admin data reads go through edge functions with service-role key.
*/

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No policies on admin_users — only accessible via service role (edge functions)

-- Visitor sessions table
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  ip_address text,
  country text,
  region text,
  city text,
  browser text,
  os text,
  device_type text,
  screen_resolution text,
  language text,
  referrer_source text,
  referrer_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  entry_page text,
  exit_page text,
  pages_viewed integer DEFAULT 1,
  scroll_depth integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_returning boolean DEFAULT false,
  session_start timestamptz DEFAULT now(),
  session_end timestamptz,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visitor_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_sessions" ON visitor_sessions;
CREATE POLICY "anon_insert_sessions" ON visitor_sessions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_sessions" ON visitor_sessions;
CREATE POLICY "anon_update_sessions" ON visitor_sessions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page_path text NOT NULL,
  page_title text,
  duration_seconds integer DEFAULT 0,
  scroll_depth integer DEFAULT 0,
  viewed_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_page_views" ON page_views;
CREATE POLICY "anon_insert_page_views" ON page_views FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Lead status table
CREATE TABLE IF NOT EXISTS lead_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_type text NOT NULL,
  lead_id uuid NOT NULL,
  status text DEFAULT 'new',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lead_status ENABLE ROW LEVEL SECURITY;

-- No policies on lead_status — only accessible via service role (edge functions)

-- Add status column to contact_submissions and consultation_requests if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'status') THEN
    ALTER TABLE contact_submissions ADD COLUMN status text DEFAULT 'new';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'consultation_requests' AND column_name = 'status') THEN
    ALTER TABLE consultation_requests ADD COLUMN status text DEFAULT 'new';
  END IF;
END $$;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_created_at ON visitor_sessions (created_at);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_is_active ON visitor_sessions (is_active);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session_id ON visitor_sessions (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views (viewed_at);
CREATE INDEX IF NOT EXISTS idx_lead_status_lead_id ON lead_status (lead_id);
