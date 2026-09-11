import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContentEngine from '@/components/admin/content/ContentEngine';
import { requireAdmin } from '@/lib/content-engine';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Content Engine | REBUKEEVIL', robots: { index: false, follow: false } };
export default async function ContentEnginePage() { const access = await requireAdmin(); if (!access.allowed) notFound(); return <ContentEngine/>; }
