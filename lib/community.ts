import { createClient } from '@/lib/supabase/server';

export async function getCommunityAccess() {
  const client = await createClient();
  if (!client) return { client: null, user: null, allowed: false, admin: false };
  const { data: { user } } = await client.auth.getUser();
  const admin = user?.app_metadata?.role === 'admin';
  const enabled = process.env.GARRISON_ENABLED === 'true';
  return { client, user, admin, allowed: !!user && (enabled || admin) };
}
