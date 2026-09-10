import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityPostDetail from '@/components/community/CommunityPostDetail';
import { getCommunityAccess } from '@/lib/community';
import GarrisonTopBar from '@/components/community/GarrisonTopBar';
export const metadata: Metadata = { title: 'Garrison Post | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) { const access = await getCommunityAccess(); if (!access.allowed) notFound(); const { id } = await params; return <main className="mx-auto min-h-screen max-w-[1540px] bg-[#171714] px-5 pb-20 text-[#f0e8d8] md:px-8"><GarrisonTopBar/><div className="mx-auto max-w-[900px] pt-10 md:pt-16"><CommunityPostDetail id={id}/></div></main>; }
