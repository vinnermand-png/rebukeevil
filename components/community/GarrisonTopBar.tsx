'use client';

import HelmetLogo from '@/components/HelmetLogo';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/community-types';

export default function GarrisonTopBar({ profile }: { profile?: Profile | null }) {
  return (
    <header className="garrison-topbar relative flex min-h-[58px] items-center justify-between border-b border-[#524d42] px-4 text-[#f0e8d8] md:px-6">
      <div className="flex items-center gap-4">
        <HelmetLogo/>
        <span className="hidden h-5 w-px bg-[#524d42] sm:block" />
        <span className="hidden mono text-[8px] text-[#9f9788] md:inline">STAND FIRM. FOLLOW CHRIST.</span>
      </div>

      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex">
        <span className="h-1.5 w-1.5 bg-[#82231f]" />
        <span className="mono text-[9px] tracking-[.2em]">THE GARRISON</span>
        <span className="h-1.5 w-1.5 bg-[#b69a5a]" />
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <span className="hidden mono text-[8px] text-[#b69a5a] sm:inline">NETWORK / LIVE</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#b69a5a]" />
        <a href={profile ? `/community/profile/${profile.username}` : '/community'} className="mono text-[9px] text-[#cfc0a2] hover:text-[#f0e8d8]">{profile ? `@${profile.username}` : 'FIELD MEMBER'}</a>
        <button onClick={() => createClient()?.auth.signOut()} className="hidden border-l border-[#524d42] pl-4 mono text-[8px] text-[#8d826d] hover:text-[#f0e8d8] sm:block">EXIT</button>
        <span className="hidden text-[#a8894e] md:inline">✝</span>
      </div>
    </header>
  );
}
