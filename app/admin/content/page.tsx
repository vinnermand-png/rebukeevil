import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentEngine from '@/components/admin/content/ContentEngine';
import { requireAdmin } from '@/lib/content-engine';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Content Engine | REBUKEEVIL', robots: { index: false, follow: false } };
export default async function ContentEnginePage() { const access = await requireAdmin(); if (!access.allowed) notFound(); return <div><div className="fixed right-6 top-6 z-20"><a href="/admin/content/style-library" className="border border-[#a08b50] bg-[#050505] px-4 py-3 mono text-[9px] text-[#a08b50]">STYLE LIBRARY</a></div><ContentEngine/></div>; }
