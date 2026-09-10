import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityRules from '@/components/community/CommunityRules';
import { getCommunityAccess } from '@/lib/community';
export const metadata: Metadata = { title: 'Garrison Community Rules | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityRulesPage() { const access = await getCommunityAccess(); if (!access.allowed) notFound(); return <main className="mx-auto min-h-screen max-w-[900px] px-6 pb-20 pt-16 md:px-10 md:pt-24"><CommunityRules/></main>; }
