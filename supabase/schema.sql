create extension if not exists pgcrypto;

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  label text,
  subtitle text,
  url text not null,
  cta_label text not null default 'VISIT',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  open_in_new_tab boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.links add column if not exists cta_label text;
update public.links set cta_label = 'VISIT' where cta_label is null;
alter table public.links alter column cta_label set default 'VISIT';
alter table public.links alter column cta_label set not null;
alter table public.links alter column sort_order set default 0;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'links_url_protocol_check') then
    alter table public.links add constraint links_url_protocol_check check (lower(split_part(url, ':', 1)) in ('http', 'https'));
  end if;
end $$;

alter table public.links enable row level security;

drop policy if exists "Anyone can read active links" on public.links;
drop policy if exists "Admins can read all links" on public.links;
drop policy if exists "Admins can insert links" on public.links;
drop policy if exists "Admins can update links" on public.links;
drop policy if exists "Admins can delete links" on public.links;

create policy "Anyone can read active links" on public.links for select using (is_active = true);
create policy "Admins can read all links" on public.links for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Admins can insert links" on public.links for insert to authenticated with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Admins can update links" on public.links for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Admins can delete links" on public.links for delete to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists links_updated_at on public.links;
create trigger links_updated_at before update on public.links for each row execute procedure public.set_updated_at();
