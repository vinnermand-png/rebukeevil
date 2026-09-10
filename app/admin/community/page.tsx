import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CommunityModeration from '@/components/admin/community/CommunityModeration';
import { getCommunityAccess } from '@/lib/community';
export const metadata: Metadata = { title: 'Garrison Moderation | RebukeEvil', robots: { index: false, follow: false } };
export default async function CommunityAdminPage() { const access = await getCommunityAccess(); if (!access.admin) notFound(); return <main className="min-h-screen px-6 pb-20 pt-16 md:px-12 md:pt-24"><CommunityModeration/></main>; }
