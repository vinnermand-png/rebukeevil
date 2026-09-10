import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityRules from '@/components/community/CommunityRules';
import { getCommunityAccess } from '@/lib/community';
import GarrisonTopBar from '@/components/community/GarrisonTopBar';
export const metadata: Metadata = { title: 'Garrison Community Rules | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityRulesPage() { const access = await getCommunityAccess(); if (!access.allowed) notFound(); return <main className="mx-auto min-h-screen max-w-[1540px] px-5 pb-20 md:px-8"><GarrisonTopBar/><div className="mx-auto max-w-[900px] pt-10 md:pt-16"><CommunityRules/></div></main>; }
