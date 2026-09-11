create table if not exists public.content_drafts (
  id uuid primary key default gen_random_uuid(),
  format text not null,
  category text not null,
  subcategory text,
  angle text,
  audience text,
  title text,
  hook text,
  content jsonb not null default '{}'::jsonb,
  caption text,
  hashtags text[] not null default '{}',
  scripture jsonb not null default '[]'::jsonb,
  visual_direction text,
  image_prompts jsonb not null default '[]'::jsonb,
  status text not null default 'DRAFT' check (status in ('IDEA', 'DRAFT', 'READY', 'POSTED', 'ARCHIVED')),
  series_id uuid,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  posted_at timestamptz
);

create table if not exists public.content_ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  subcategory text,
  angle text,
  format text not null,
  concept text not null,
  status text not null default 'IDEA' check (status in ('IDEA', 'SAVED', 'DISMISSED', 'BUILT')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.content_series (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null,
  default_format text not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'content_drafts_series_id_fkey') then
    alter table public.content_drafts add constraint content_drafts_series_id_fkey foreign key (series_id) references public.content_series(id) on delete set null;
  end if;
end $$;

create table if not exists public.content_generation_logs (
  id uuid primary key default gen_random_uuid(),
  generation_type text not null,
  model text not null,
  input_summary text,
  output_id uuid,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.content_settings (
  id uuid primary key default gen_random_uuid(),
  brand_prompt text not null,
  default_hashtag_count integer not null default 5,
  default_cta text,
  updated_at timestamptz not null default now()
);

alter table public.content_drafts enable row level security;
alter table public.content_ideas enable row level security;
alter table public.content_series enable row level security;
alter table public.content_generation_logs enable row level security;
alter table public.content_settings enable row level security;

drop policy if exists "Content admins manage drafts" on public.content_drafts;
drop policy if exists "Content admins manage ideas" on public.content_ideas;
drop policy if exists "Content admins manage series" on public.content_series;
drop policy if exists "Content admins manage logs" on public.content_generation_logs;
drop policy if exists "Content admins manage settings" on public.content_settings;

create policy "Content admins manage drafts" on public.content_drafts for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Content admins manage ideas" on public.content_ideas for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Content admins manage series" on public.content_series for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Content admins manage logs" on public.content_generation_logs for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Content admins manage settings" on public.content_settings for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create or replace function public.set_content_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists content_drafts_updated_at on public.content_drafts;
create trigger content_drafts_updated_at before update on public.content_drafts for each row execute procedure public.set_content_updated_at();
