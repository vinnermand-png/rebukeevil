'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Link } from '@/lib/supabase/types';
import LinkEditor from './LinkEditor';

type SavedLink = { title: string; url: string; subtitle: string; is_active: boolean };
function displayUrl(url: string) { return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); }

export default function LinksManager() {
  const [links, setLinks] = useState<Link[]>([]);
  const [editing, setEditing] = useState<Link | null | undefined>();
  const [message, setMessage] = useState('');
  const client = createClient();
  async function load() { if (!client) return; const { data } = await client.from('links').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: true }); setLinks((data || []) as Link[]); }
  useEffect(() => { void load(); }, []);
  async function save(data: SavedLink) {
    if (!client) throw new Error('Supabase environment is not configured.');
    const existing = editing || undefined;
    const payload = { title: data.title, url: data.url, subtitle: data.subtitle || null, is_active: data.is_active, label: existing?.label || 'SOCIAL', cta_label: existing?.cta_label || 'VISIT', open_in_new_tab: existing?.open_in_new_tab ?? true, sort_order: existing?.sort_order ?? Math.max(-1, ...links.map(link => link.sort_order)) + 1, updated_at: new Date().toISOString() };
    const result = existing ? await client.from('links').update(payload).eq('id', existing.id) : await client.from('links').insert(payload);
    if (result.error) throw new Error(`COULD NOT SAVE LINK. ${result.error.message}`);
    setEditing(undefined); setMessage('LINK SAVED'); await load();
  }
  async function toggle(link: Link) { if (!client) return; const result = await client.from('links').update({ is_active: !link.is_active, updated_at: new Date().toISOString() }).eq('id', link.id); if (!result.error) { setMessage(link.is_active ? 'LINK DISABLED' : 'LINK ENABLED'); await load(); } }
  async function remove(link: Link) { if (!client || !window.confirm(`Delete "${link.title}"?\nThis cannot be undone.`)) return; const result = await client.from('links').delete().eq('id', link.id); if (!result.error) { setMessage('LINK DELETED'); await load(); } }
  async function move(index: number, direction: -1 | 1) { const other = index + direction; if (!client || other < 0 || other >= links.length) return; const a = links[index], b = links[other]; await Promise.all([client.from('links').update({ sort_order: b.sort_order, updated_at: new Date().toISOString() }).eq('id', a.id), client.from('links').update({ sort_order: a.sort_order, updated_at: new Date().toISOString() }).eq('id', b.id)]); setMessage('ORDER SAVED'); await load(); }
  return <div className="mx-auto max-w-4xl">{editing !== undefined ? <LinkEditor initial={editing || undefined} onSave={save} onCancel={() => setEditing(undefined)}/> : <><div className="mb-8 flex items-center justify-between"><h2 className="display text-4xl">LINKS</h2><button onClick={() => { setMessage(''); setEditing(null); }} className="mono border border-[#aaa9a1] px-4 py-3 text-[9px]">+ ADD LINK</button></div>{message && <p className="mb-5 text-[11px] mono text-[#a08b5c]">{message}</p>}<div className="space-y-3">{links.map((link, index) => <div key={link.id} className="border border-[#343532] p-5 md:flex md:items-center md:gap-6"><div className="min-w-0 flex-1"><p className="display text-3xl leading-none">{link.title}</p>{link.subtitle && <p className="serif mt-2 text-base text-[#aaa9a1]">{link.subtitle}</p>}<p className="mt-2 truncate text-sm text-[#85847d]">{displayUrl(link.url)}</p><button onClick={() => toggle(link)} className={`mono mt-4 text-[9px] ${link.is_active ? 'text-[#a08b5c]' : 'text-[#85847d]'}`}>{link.is_active ? 'ACTIVE' : 'DISABLED'}</button></div><div className="mt-5 flex flex-wrap items-center gap-4 md:mt-0"><button onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" className="mono text-lg text-[#85847d] disabled:opacity-30">↑</button><button onClick={() => move(index, 1)} disabled={index === links.length - 1} aria-label="Move down" className="mono text-lg text-[#85847d] disabled:opacity-30">↓</button><button onClick={() => setEditing(link)} className="mono text-[9px]">EDIT</button><button onClick={() => remove(link)} className="mono text-[9px] text-[#a87873]">DELETE</button></div></div>)}</div></>}</div>;
}
