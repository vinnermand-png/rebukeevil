import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityProfile from '@/components/community/CommunityProfile';
import { getCommunityAccess } from '@/lib/community';
export const metadata: Metadata = { title: 'Garrison Profile | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityProfilePage({ params }: { params: Promise<{ username: string }> }) { const access = await getCommunityAccess(); if (!access.allowed) notFound(); const { username } = await params; return <main className="mx-auto min-h-screen max-w-[900px] px-6 pb-20 pt-16 md:px-10 md:pt-24"><CommunityProfile username={username}/></main>; }
