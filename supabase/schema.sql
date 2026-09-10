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

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,24}$' and lower(username) not in ('rebukeevil', 'admin', 'moderator', 'support', 'official')),
  display_name text,
  bio text,
  created_at timestamptz not null default now(),
  is_banned boolean not null default false
);

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_reserved_username_check') then
    alter table public.profiles add constraint profiles_reserved_username_check check (lower(username) not in ('rebukeevil', 'admin', 'moderator', 'support', 'official'));
  end if;
end $$;

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('PRAYER', 'ACCOUNTABILITY', 'TESTIMONY')),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 3000),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.community_prayers (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create table if not exists public.community_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid references public.community_posts(id) on delete cascade,
  reply_id uuid references public.community_replies(id) on delete cascade,
  reason text not null check (reason in ('SPAM', 'HARASSMENT', 'HATE', 'SEXUAL CONTENT', 'VIOLENCE', 'DANGEROUS ADVICE', 'OTHER')),
  details text,
  status text not null default 'OPEN' check (status in ('OPEN', 'DISMISSED', 'RESOLVED')),
  created_at timestamptz not null default now(),
  check ((post_id is not null) or (reply_id is not null))
);

create table if not exists public.community_moderation_actions (
  id uuid primary key default gen_random_uuid(),
  moderator_user_id uuid not null references auth.users(id),
  target_user_id uuid references public.profiles(id),
  post_id uuid references public.community_posts(id) on delete cascade,
  reply_id uuid references public.community_replies(id) on delete cascade,
  action text not null check (action in ('WARN', 'REMOVE', 'RESTORE', 'SUSPEND', 'BAN', 'UNBAN')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_replies enable row level security;
alter table public.community_prayers enable row level security;
alter table public.community_reports enable row level security;
alter table public.community_moderation_actions enable row level security;

drop policy if exists "Garrison admins manage profiles" on public.profiles;
drop policy if exists "Garrison admins manage posts" on public.community_posts;
drop policy if exists "Garrison admins manage replies" on public.community_replies;
drop policy if exists "Garrison admins manage prayers" on public.community_prayers;
drop policy if exists "Garrison admins manage reports" on public.community_reports;
drop policy if exists "Garrison admins manage moderation" on public.community_moderation_actions;

create policy "Garrison admins manage profiles" on public.profiles for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Garrison admins manage posts" on public.community_posts for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Garrison admins manage replies" on public.community_replies for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Garrison admins manage prayers" on public.community_prayers for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Garrison admins manage reports" on public.community_reports for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Garrison admins manage moderation" on public.community_moderation_actions for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop trigger if exists community_posts_updated_at on public.community_posts;
create trigger community_posts_updated_at before update on public.community_posts for each row execute procedure public.set_updated_at();

create or replace function public.enforce_garrison_rate_limit() returns trigger language plpgsql security definer set search_path = public as $$
declare window_count integer; max_count integer;
begin
  if tg_table_name = 'community_posts' then max_count := 5;
  elsif tg_table_name = 'community_replies' then max_count := 20;
  elsif tg_table_name = 'community_reports' then max_count := 10;
  elsif tg_table_name = 'community_prayers' then max_count := 60;
  else return new; end if;
  if tg_table_name = 'community_reports' then
    execute format('select count(*) from public.%I where reporter_user_id = $1 and created_at > now() - interval ''1 hour''', tg_table_name) into window_count using new.reporter_user_id;
  else
    execute format('select count(*) from public.%I where user_id = $1 and created_at > now() - interval ''1 hour''', tg_table_name) into window_count using new.user_id;
  end if;
  if window_count >= max_count then raise exception 'rate limit exceeded'; end if;
  return new;
end; $$;
drop trigger if exists community_posts_rate_limit on public.community_posts;
create trigger community_posts_rate_limit before insert on public.community_posts for each row execute procedure public.enforce_garrison_rate_limit();
drop trigger if exists community_replies_rate_limit on public.community_replies;
create trigger community_replies_rate_limit before insert on public.community_replies for each row execute procedure public.enforce_garrison_rate_limit();
drop trigger if exists community_reports_rate_limit on public.community_reports;
create trigger community_reports_rate_limit before insert on public.community_reports for each row execute procedure public.enforce_garrison_rate_limit();
drop trigger if exists community_prayers_rate_limit on public.community_prayers;
create trigger community_prayers_rate_limit before insert on public.community_prayers for each row execute procedure public.enforce_garrison_rate_limit();
