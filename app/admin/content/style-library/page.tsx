import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StyleLibrary from '@/components/admin/content/StyleLibrary';
import { requireAdmin } from '@/lib/content-engine';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Style Library | REBUKEEVIL', robots: { index: false, follow: false } };
export default async function StyleLibraryPage() { const auth = await requireAdmin(); if (!auth.allowed) notFound(); return <StyleLibrary/>; }
