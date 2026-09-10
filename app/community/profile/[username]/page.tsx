import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityProfile from '@/components/community/CommunityProfile';
import { getCommunityAccess } from '@/lib/community';
import GarrisonTopBar from '@/components/community/GarrisonTopBar';
export const metadata: Metadata = { title: 'Garrison Profile | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityProfilePage({ params }: { params: Promise<{ username: string }> }) { const access = await getCommunityAccess(); if (!access.allowed) notFound(); const { username } = await params; return <main className="garrison-shell mx-auto min-h-screen max-w-[1540px] px-5 pb-20 text-[#f0e8d8] md:px-8"><GarrisonTopBar/><div className="mx-auto max-w-[900px] pt-10 md:pt-16"><CommunityProfile username={username}/></div></main>; }
