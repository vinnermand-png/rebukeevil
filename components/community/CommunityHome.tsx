'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CommunityPost, Profile } from '@/lib/community-types';
import CommunityHeader from './CommunityHeader';
import CommunityFilters, { type CommunityType } from './CommunityFilters';
import CommunityPostEditor from './CommunityPostEditor';
import CommunityPostRow from './CommunityPostRow';
import ProfileSetup from './ProfileSetup';
import GarrisonTopBar from './GarrisonTopBar';
import GarrisonSidebar from './GarrisonSidebar';
import GarrisonIntel from './GarrisonIntel';

export default function CommunityHome() {
  const initialFilter = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('type') : null;
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [counts, setCounts] = useState<Record<string, { replies: number; prayers: number }>>({});
  const [filter, setFilter] = useState<CommunityType>(initialFilter === 'PRAYER' || initialFilter === 'ACCOUNTABILITY' || initialFilter === 'TESTIMONY' ? initialFilter : 'ALL');
  const [editing, setEditing] = useState(false);
  const [postsToday, setPostsToday] = useState(0);
  const [prayersToday, setPrayersToday] = useState(0);
  const [prayerRequests, setPrayerRequests] = useState(0);
  const client = createClient();

  async function load() {
    if (!client) return;
    const { data: auth } = await client.auth.getUser();
    if (!auth.user) return;
    setUserId(auth.user.id);

    const profileResult = await client.from('profiles').select('*').eq('id', auth.user.id).maybeSingle();
    setProfile(profileResult.data as Profile | null);

    const postResult = await client.from('community_posts').select('*').eq('is_deleted', false).order('created_at', { ascending: false });
    const nextPosts = (postResult.data || []) as CommunityPost[];
    setPosts(nextPosts);

    const ids = nextPosts.map(post => post.id);
    if (ids.length) {
      const [replyResult, prayerResult] = await Promise.all([
        client.from('community_replies').select('post_id').eq('is_deleted', false).in('post_id', ids),
        client.from('community_prayers').select('post_id').in('post_id', ids),
      ]);
      const nextCounts: Record<string, { replies: number; prayers: number }> = {};
      ids.forEach(id => { nextCounts[id] = { replies: 0, prayers: 0 }; });
      (replyResult.data || []).forEach(item => { nextCounts[item.post_id].replies += 1; });
      (prayerResult.data || []).forEach(item => { nextCounts[item.post_id].prayers += 1; });
      setCounts(nextCounts);
    }

    const profilesResult = await client.from('profiles').select('*');
    setProfiles((profilesResult.data || []) as Profile[]);

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const [todayPosts, todayPrayers, prayerPosts] = await Promise.all([
      client.from('community_posts').select('id', { count: 'exact', head: true }).gte('created_at', start.toISOString()),
      client.from('community_prayers').select('id', { count: 'exact', head: true }).gte('created_at', start.toISOString()),
      client.from('community_posts').select('id', { count: 'exact', head: true }).eq('type', 'PRAYER').eq('is_deleted', false),
    ]);
    setPostsToday(todayPosts.count || 0);
    setPrayersToday(todayPrayers.count || 0);
    setPrayerRequests(prayerPosts.count || 0);
  }

  useEffect(() => { void load(); }, []);

  if (!profile && userId) {
    return <main className="garrison-shell min-h-screen"><div className="mx-auto max-w-[1600px] px-3 pb-16 md:px-5"><GarrisonTopBar/><div className="pt-6"><ProfileSetup userId={userId} onCreated={load}/></div></div></main>;
  }

  const visible = filter === 'ALL' ? posts : posts.filter(post => post.type === filter);
  const profileMap = new Map(profiles.map(item => [item.id, item]));
  async function posted() { setEditing(false); await load(); }

  return (
    <main className="garrison-shell min-h-screen pb-10">
      <div className="mx-auto max-w-[1600px] px-3 md:px-5">
        <GarrisonTopBar profile={profile}/>
        <div className="grid gap-3 pt-3 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_300px]">
          <GarrisonSidebar active={filter} username={profile?.username} onChange={setFilter}/>

          <section className="min-w-0">
            {editing ? (
              <div className="garrison-frame p-2"><CommunityPostEditor userId={userId} onDone={posted} onCancel={() => setEditing(false)}/></div>
            ) : (
              <>
                <CommunityHeader/>
                <div className="garrison-commandbar flex flex-wrap items-center justify-between gap-4 px-5 py-3 text-[#f0e8d8]">
                  <div>
                    <p className="display text-2xl leading-none">FIELD REPORTS</p>
                    <p className="mono mt-1 text-[8px] text-[#9f9788]">REAL PEOPLE. REAL STRUGGLES. A HIGHER CALL.</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="mono text-[9px] text-[#b69a5a]">LATEST</span>
                    <button onClick={() => setEditing(true)} className="min-h-11 border border-[#a8894e]/55 bg-[#82231f] px-5 mono text-[10px] text-[#f0e8d8] transition-colors hover:bg-[#932b25]">+ NEW POST</button>
                  </div>
                </div>

                <div className="lg:hidden"><CommunityFilters active={filter} onChange={setFilter}/></div>

                <div className="border-x border-[#524d42]">
                  {visible.map(post => (
                    <CommunityPostRow key={post.id} post={post} profile={profileMap.get(post.user_id)} replyCount={counts[post.id]?.replies || 0} prayerCount={counts[post.id]?.prayers || 0}/>
                  ))}
                  {!visible.length && (
                    <div className="garrison-paper border-b border-[#524d42] px-5 py-10 text-center">
                      <p className="display text-2xl">NO FIELD REPORTS YET.</p>
                      <p className="serif mt-2 text-base">Be the first to strengthen the Garrison.</p>
                      <button onClick={() => setEditing(true)} className="mt-5 bg-[#82231f] px-4 py-3 mono text-[10px] text-[#f0e8d8]">+ CREATE FIELD REPORT</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>

          <div className="hidden xl:block"><GarrisonIntel postsToday={postsToday} prayersToday={prayersToday} prayerRequests={prayerRequests}/></div>
          <div className="lg:col-span-2 xl:hidden"><GarrisonIntel postsToday={postsToday} prayersToday={prayersToday} prayerRequests={prayerRequests}/></div>
        </div>
      </div>
    </main>
  );
}
