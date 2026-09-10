import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityHome from '@/components/community/CommunityHome';
import { getCommunityAccess } from '@/lib/community';
export const metadata: Metadata = { title: 'The Garrison | RebukeEvil', description: 'The private RebukeEvil prayer, accountability, and testimony community.', robots: { index: false, follow: false } };
export default async function CommunityPage() { const access = await getCommunityAccess(); if (!access.allowed) notFound(); return <div className="min-h-screen bg-[#171714]"><CommunityHome/></div>; }
