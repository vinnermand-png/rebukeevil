'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminLogin from './AdminLogin';
import LinksManager from './LinksManager';

type AdminState = 'loading' | 'logged-out' | 'unauthorized' | 'authorized';

export default function AdminLayout({ initialState = 'loading' }: { initialState?: AdminState }) {
  const [state, setState] = useState<AdminState>(initialState);
  const client = createClient();
  async function checkUser() { if (!client) { setState('logged-out'); return; } const { data } = await client.auth.getUser(); setState(data.user?.app_metadata?.role === 'admin' ? 'authorized' : data.user ? 'unauthorized' : 'logged-out'); }
  useEffect(() => { if (initialState === 'loading') void checkUser(); if (!client) return; const { data } = client.auth.onAuthStateChange(() => { void checkUser(); }); return () => data.subscription.unsubscribe(); }, []);
  if (state === 'loading') return <main className="min-h-screen p-6"/>;
  if (state === 'logged-out') return <main className="flex min-h-screen items-center justify-center p-6"><AdminLogin onLogin={checkUser}/></main>;
  if (state === 'unauthorized') return <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-6 text-center"><h1 className="display text-4xl">ACCESS DENIED</h1><p className="serif text-[#85847d]">This account is not authorized to manage links.</p><button onClick={() => client?.auth.signOut()} className="mono border border-[#343532] px-5 py-3 text-[9px]">SIGN OUT</button></main>;
  return <main className="min-h-screen p-6 md:p-12"><header className="mb-16 flex flex-wrap items-center justify-between gap-5"><h1 className="display text-3xl">REBUKEEVIL ADMIN</h1><div className="flex items-center gap-6"><a href="/admin/content" className="mono text-[9px] text-[#a08b5c]">CONTENT ENGINE</a><button onClick={() => client?.auth.signOut()} className="mono text-[9px] text-[#85847d]">SIGN OUT</button></div></header><LinksManager/></main>;
}
