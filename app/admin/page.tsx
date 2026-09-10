import AdminLayout from '@/components/admin/AdminLayout';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'REBUKEEVIL Admin', robots: { index: false, follow: false } };
export default async function AdminPage() { const client = await createClient(); let initialState: 'loading' | 'logged-out' | 'unauthorized' | 'authorized' = 'logged-out'; if (client) { const { data } = await client.auth.getUser(); initialState = data.user ? data.user.app_metadata?.role === 'admin' ? 'authorized' : 'unauthorized' : 'logged-out'; } return <AdminLayout initialState={initialState}/>; }
