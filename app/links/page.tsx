import LinksHeader from '@/components/links/LinksHeader';
import LinkRow from '@/components/links/LinkRow';
import LinksFooter from '@/components/links/LinksFooter';
import { createClient } from '@/lib/supabase/server';
import type { Link } from '@/lib/supabase/types';
import type { Metadata } from 'next';

export const revalidate = 0;
export const metadata: Metadata = { title: 'REBUKEEVIL Links', description: 'Find RebukeEvil across the web.', robots: { index: false, follow: true } };
export default async function LinksPage() { let links: Link[] = []; const client = await createClient(); if (client) { const result = await client.from('links').select('*').eq('is_active', true).order('sort_order', { ascending: true }).order('created_at', { ascending: true }); links = (result.data || []) as Link[]; } return <main className="mx-auto min-h-screen max-w-[680px] px-5 pb-14 pt-16 sm:px-8 md:pt-24"><LinksHeader/><div className="my-12 border-t border-white/[.14]"/><div className="space-y-4">{links.length ? links.map((link, index) => <LinkRow key={link.id} link={link} index={index}/>) : <p className="border border-[#343532] px-5 py-8 text-center text-[11px] mono text-[#85847d]">NO ACTIVE LINKS YET.</p>}</div><LinksFooter/></main>; }
