# Supabase Setup Guide for Cricket Core 2026

Follow these steps to properly connect your application to your Supabase backend. This will enable cross-device login and data persistence.

## 1. Get Your Credentials
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **Settings** (Gear icon) -> **API**.
3. Find the **Project URL** and **anon public** key.

## 2. Update Environment Variables
Open the `.env` file in your project root and replace the values:

```env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG... (Your long Anon Public Key)
```

> **Note:** The key MUST start with `eyJ...`.

## 3. Initialize the Database
1. In Supabase Dashboard, go to **SQL Editor**.
2. Click **New Query**.
3. Copy and paste the script below:

```sql
-- Create User Profiles Table
-- NOTE: We use text for id to support the app's handle-based system
create table if not exists public.user_profiles (
  id text primary key, 
  name text,
  handle text unique,
  password text,
  email text,
  role text,
  avatar_url text,
  settings jsonb default '{}'::jsonb,
  following jsonb default '{"teams": [], "players": [], "orgs": []}'::jsonb,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- --- NORMALIZED RELATIONAL TABLES ---

-- 1. Organizations
create table if not exists public.organizations (
  id text primary key,
  name text,
  type text, -- 'GOVERNING_BODY', 'CLUB'
  country text,
  logo_url text,
  is_public boolean default true,
  details jsonb default '{}'::jsonb, -- description, address, groundLocation
  created_at timestamptz default now()
);

-- 2. Teams
create table if not exists public.teams (
  id text primary key,
  org_id text references public.organizations(id),
  name text,
  logo_url text,
  location text,
  created_at timestamptz default now()
);

-- 3. Roster Players (For Team Squads)
-- Note: These are distinct from user_profiles. They belong to a team.
create table if not exists public.roster_players (
  id text primary key,
  team_id text references public.teams(id),
  name text,
  role text,
  photo_url text,
  stats jsonb default '{}'::jsonb,
  details jsonb default '{}'::jsonb -- battingStyle, bowlingStyle, etc.
);

-- 4. Tournaments
create table if not exists public.tournaments (
  id text primary key,
  org_id text references public.organizations(id),
  name text,
  format text,
  status text, -- 'Upcoming', 'Ongoing', 'Completed'
  config jsonb default '{}'::jsonb -- pointsConfig, overs
);

-- 5. Match Fixtures
create table if not exists public.fixtures (
  id text primary key,
  tournament_id text references public.tournaments(id),
  team_a_id text references public.teams(id),
  team_b_id text references public.teams(id),
  date timestamptz,
  venue text,
  status text, -- 'Scheduled', 'Live', 'Completed'
  result text,
  winner_id text,
  scores jsonb default '{}'::jsonb, -- teamAScore, teamBScore, inningsScores
  saved_state jsonb, -- The full MatchState object for the engine
  details jsonb default '{}'::jsonb -- umpires, toss, etc.
);

-- 6. Media Posts
create table if not exists public.media_posts (
  id text primary key,
  type text,
  title text,
  caption text,
  author_name text,
  content_url text,
  likes int default 0,
  timestamp timestamptz default now()
);

-- --- POLICIES ---

-- Enable RLS on all
alter table public.organizations enable row level security;
alter table public.teams enable row level security;
alter table public.roster_players enable row level security;
alter table public.tournaments enable row level security;
alter table public.fixtures enable row level security;
alter table public.media_posts enable row level security;

-- Public Read Policies
create policy "Public read orgs" on public.organizations for select using (true);
create policy "Public read teams" on public.teams for select using (true);
create policy "Public read players" on public.roster_players for select using (true);
create policy "Public read tournaments" on public.tournaments for select using (true);
create policy "Public read fixtures" on public.fixtures for select using (true);
create policy "Public read media" on public.media_posts for select using (true);

-- Authenticated Write Policies (Simplified for now - Allow All Upserts)
create policy "Allow upsert orgs" on public.organizations for all using (true);
create policy "Allow upsert teams" on public.teams for all using (true);
create policy "Allow upsert players" on public.roster_players for all using (true);
create policy "Allow upsert tournaments" on public.tournaments for all using (true);
create policy "Allow upsert fixtures" on public.fixtures for all using (true);
create policy "Allow upsert media" on public.media_posts for all using (true);

-- (Legacy app_state for fallback)
create table if not exists public.app_state (
  id text primary key,
  payload jsonb,
  updated_at timestamptz default now()
);
alter table public.app_state enable row level security;
create policy "Global state viewable" on public.app_state for select using ( true );
create policy "Global state editable" on public.app_state for all using ( true );

-- Create Storage (Optional)
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict (id) do nothing;
create policy "Public Avatar Access" on storage.objects for select using ( bucket_id = 'avatars' );
create policy "Public Avatar Upload" on storage.objects for insert with check ( bucket_id = 'avatars' );
```

## 4. Restart Application
Restart your local server:
```bash
npm run dev
```
