import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityPostDetail from '@/components/community/CommunityPostDetail';
import { getCommunityAccess } from '@/lib/community';
export const metadata: Metadata = { title: 'Garrison Post | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) { const access = await getCommunityAccess(); if (!access.allowed) notFound(); const { id } = await params; return <main className="mx-auto min-h-screen max-w-[900px] px-6 pb-20 pt-16 md:px-10 md:pt-24"><CommunityPostDetail id={id}/></main>; }
