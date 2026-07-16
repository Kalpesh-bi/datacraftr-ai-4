/*
# Datacraftr.ai core tables

1. New Tables
- `contact_submissions`: stores contact form submissions from the Contact page.
  - id (uuid pk), name, email, company, phone, message, service_interest, status, created_at.
- `consultation_requests`: stores "Get Free Consultation" requests from across the site.
  - id (uuid pk), name, email, company, phone, service_interest, preferred_date, message, status, created_at.
- `demo_requests`: stores "Book Demo" requests for Preemption Algo Software.
  - id (uuid pk), name, email, company, phone, team_size, message, status, created_at.
- `newsletter_subscribers`: stores email subscriptions from the footer.
  - id (uuid pk), email (unique), source, created_at.

2. Security
- Enable RLS on every table.
- All tables are single-tenant (no sign-in) — the public site writes to them.
- Use TO anon, authenticated on all policies so the anon-key frontend can insert/read.
- SELECT is intentionally public for contact/consultation/demo so an admin view could list them; writes are open to anon.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  message text NOT NULL,
  service_interest text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_contact" ON contact_submissions;
CREATE POLICY "anon_select_contact" ON contact_submissions FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_contact" ON contact_submissions;
CREATE POLICY "anon_update_contact" ON contact_submissions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  service_interest text,
  preferred_date date,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_consultation" ON consultation_requests;
CREATE POLICY "anon_select_consultation" ON consultation_requests FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_consultation" ON consultation_requests;
CREATE POLICY "anon_insert_consultation" ON consultation_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_consultation" ON consultation_requests;
CREATE POLICY "anon_update_consultation" ON consultation_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  team_size text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_demo" ON demo_requests;
CREATE POLICY "anon_select_demo" ON demo_requests FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_demo" ON demo_requests;
CREATE POLICY "anon_insert_demo" ON demo_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_demo" ON demo_requests;
CREATE POLICY "anon_update_demo" ON demo_requests FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_select_newsletter" ON newsletter_subscribers FOR SELECT
  TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_delete_newsletter" ON newsletter_subscribers FOR DELETE
  TO anon, authenticated USING (true);
