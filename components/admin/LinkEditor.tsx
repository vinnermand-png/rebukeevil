'use client';
import { useState } from 'react';
import type { Link } from '@/lib/supabase/types';

type FormData = { platform: string; url: string; displayText: string; active: boolean };
type SavedLink = { title: string; url: string; subtitle: string; is_active: boolean };

export default function LinkEditor({ initial, onSave, onCancel }: { initial?: Link; onSave: (data: SavedLink) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState<FormData>({ platform: initial?.title || '', url: initial?.url || '', displayText: initial?.subtitle || '', active: initial?.is_active ?? true });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const update = (key: keyof FormData, value: string | boolean) => setForm(current => ({ ...current, [key]: value }));
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    setError('');
    if (!form.platform.trim()) { setError('Please enter a platform.'); return; }
    if (!form.url.trim()) { setError('Please enter a URL.'); return; }
    try { const parsed = new URL(form.url.trim()); if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(); } catch { setError('Please enter a valid http:// or https:// URL.'); return; }
    setSaving(true);
    try { await onSave({ title: form.platform.trim(), url: form.url.trim(), subtitle: form.displayText.trim(), is_active: form.active }); }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : 'COULD NOT SAVE LINK. PLEASE TRY AGAIN.'); setSaving(false); }
  }
  const inputClass = 'mt-2 h-[50px] w-full border border-[#343532] bg-[#050505] px-4 font-sans text-base normal-case tracking-normal text-[#dedbd0] outline-none transition-colors focus:border-[#a08b5c]';
  return <form onSubmit={submit} className="w-full max-w-[720px] border border-[#343532] p-6 md:p-8"><div className="mb-9 flex items-start justify-between"><h2 className="display text-4xl">{initial ? 'EDIT LINK' : 'ADD LINK'}</h2><span className="mono pt-2 text-[9px] text-[#85847d]">{initial ? 'EDIT RECORD' : 'NEW RECORD'}</span></div><div className="space-y-6"><label className="mono block text-[10px]">PLATFORM *<input autoFocus required value={form.platform} onChange={event => update('platform', event.target.value)} placeholder="Instagram" className={inputClass}/></label><label className="mono block text-[10px]">URL *<input required type="url" value={form.url} onChange={event => update('url', event.target.value)} placeholder="https://instagram.com/rebukeevil" className={inputClass}/></label><label className="mono block text-[10px]">DISPLAY TEXT<input value={form.displayText} onChange={event => update('displayText', event.target.value)} placeholder="@rebukeevil" className={inputClass}/></label><label className="flex cursor-pointer items-center gap-3 pt-1"><input type="checkbox" checked={form.active} onChange={event => update('active', event.target.checked)} className="h-4 w-4 accent-[#a08b5c]"/><span className="mono text-[10px]">ACTIVE</span></label></div>{error && <p className="mt-6 text-sm text-[#a87873]">{error}</p>}<div className="mt-9 flex items-center gap-5"><button disabled={saving} className="mono border border-[#aaa9a1] px-6 py-4 text-[10px] transition-colors hover:bg-white/[.04] disabled:cursor-wait disabled:opacity-50">{saving ? 'SAVING...' : initial ? 'SAVE CHANGES' : 'ADD LINK'}</button><button type="button" disabled={saving} onClick={onCancel} className="mono px-2 py-4 text-[10px] text-[#85847d]">CANCEL</button></div></form>;
}
