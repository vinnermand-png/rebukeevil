create table if not exists public.content_style_references (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('BRAND CORE', 'STYLE INSPIRATION')),
  style_family text not null,
  image_path text not null,
  analysis jsonb not null default '{}'::jsonb,
  learn_from text[] not null default '{}',
  quality_rating integer not null default 3 check (quality_rating between 1 and 5),
  notes text,
  approved boolean not null default false,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.content_style_references enable row level security;
drop policy if exists "Content admins manage style references" on public.content_style_references;
create policy "Content admins manage style references" on public.content_style_references for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
insert into storage.buckets (id, name, public) values ('content-style-library', 'content-style-library', false) on conflict (id) do nothing;
drop policy if exists "Content admins manage style library" on storage.objects;
create policy "Content admins manage style library" on storage.objects for all to authenticated using (bucket_id = 'content-style-library' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check (bucket_id = 'content-style-library' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
