import type { CommunityPost, Profile } from '@/lib/community-types';

function timeAgo(date: string) {
  const minutes = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 60000));
  return minutes < 60 ? `${minutes} MIN AGO` : `${Math.floor(minutes / 60)} HR AGO`;
}

const typeTone: Record<string, string> = {
  PRAYER: 'bg-[#82231f] text-[#f0e8d8]',
  TESTIMONY: 'bg-[#a8894e] text-[#171714]',
  ACCOUNTABILITY: 'bg-[#373630] text-[#f0e8d8]',
};

const typeImage: Record<string, { src: string; position: string }> = {
  PRAYER: { src: '/garrison/garrison-post-1.jpg', position: '22% center' },
  TESTIMONY: { src: '/garrison/garrison-post-2.jpg', position: '72% center' },
  ACCOUNTABILITY: { src: '/garrison/garrison-post-3.jpg', position: '48% center' },
};

export default function CommunityPostRow({ post, profile, replyCount, prayerCount }: { post: CommunityPost; profile?: Profile; replyCount: number; prayerCount: number }) {
  const image = typeImage[post.type] || { src: '/garrison/garrison-post-4.jpg', position: 'center' };
  return (
    <a href={`/community/post/${post.id}`} className="group garrison-paper block border-b border-[#8d826d]/35 text-[#211f1a] transition-colors hover:bg-[#eadfc9]">
      <div className="grid gap-4 px-4 py-4 md:grid-cols-[132px_minmax(0,1fr)_145px] md:items-center md:px-5">
        <div className="relative hidden h-[86px] overflow-hidden border border-[#7e7566]/55 bg-[#27251f] md:block">
          <img src={image.src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" style={{ objectPosition: image.position }} />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 py-1 mono text-[8px] ${typeTone[post.type] || 'bg-[#373630] text-[#f0e8d8]'}`}>{post.type}</span>
            <span className="mono text-[8px] text-[#756e62]">@{profile?.username || 'UNKNOWN'}</span>
            <span className="mono text-[8px] text-[#8d826d]">· {timeAgo(post.created_at)}</span>
          </div>
          <h2 className="serif mt-2 text-[clamp(1.25rem,1.7vw,1.6rem)] font-bold leading-tight">{post.title}</h2>
          <p className="serif mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-[#3b372f]">{post.body}</p>
        </div>

        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center">
          <div className="flex gap-4 mono text-[8px] text-[#6f685d]"><span>† {prayerCount} PRAYED</span><span>▱ {replyCount} REPLIES</span></div>
          <span className="text-xl text-[#82231f] transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}
