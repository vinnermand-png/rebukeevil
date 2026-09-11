alter table public.content_drafts add column if not exists asset_paths jsonb not null default '[]'::jsonb;

insert into storage.buckets (id, name, public)
values ('content-assets', 'content-assets', false)
on conflict (id) do nothing;

drop policy if exists "Content admins manage generated assets" on storage.objects;
create policy "Content admins manage generated assets" on storage.objects
for all to authenticated
using (bucket_id = 'content-assets' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check (bucket_id = 'content-assets' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
