import type { CommunityType } from './CommunityFilters';

export default function GarrisonSidebar({ active, username, onChange }: { active: CommunityType; username?: string; onChange: (type: CommunityType) => void }) {
  const items: [CommunityType, string, string][] = [
    ['ALL', '01', 'FEED'],
    ['PRAYER', '02', 'PRAYER WATCH'],
    ['ACCOUNTABILITY', '03', 'ACCOUNTABILITY'],
    ['TESTIMONY', '04', 'TESTIMONIES'],
  ];

  return (
    <aside className="garrison-frame garrison-sidebar hidden overflow-hidden lg:block">
      <div className="sticky top-0">
        <div className="garrison-sidebar-paper border-b border-[#524d42] p-5 text-[#211f1a]">
          <p className="mono text-[10px]">FIELD DIRECTORY</p>
          <p className="serif mt-2 text-sm italic text-[#641a18]">SOLDIERS. NOT SPECTATORS.</p>
        </div>

        <nav className="garrison-sidebar-paper p-3 text-[#211f1a]">
          {items.map(([type, number, label]) => (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={`flex min-h-11 w-full items-center gap-3 border-b border-[#8d826d]/20 px-3 py-2 text-left mono text-[10px] transition-colors ${active === type ? 'bg-[#82231f] text-[#f0e8d8]' : 'hover:bg-[#cdbd9e]'}`}
            >
              <span className={`w-6 text-[9px] ${active === type ? 'text-[#d6b771]' : 'text-[#a8894e]'}`}>{number}</span>
              {label}
            </button>
          ))}

          <div className="my-4 border-t border-[#524d42]/45" />
          <a href="/#scripture-arsenal" className="flex min-h-11 items-center gap-3 border-b border-[#8d826d]/20 px-3 py-2 mono text-[10px] hover:bg-[#cdbd9e]"><span className="w-6 text-[9px] text-[#a8894e]">05</span>SCRIPTURE ARSENAL</a>
          <a href="/#field-guides" className="flex min-h-11 items-center gap-3 border-b border-[#8d826d]/20 px-3 py-2 mono text-[10px] hover:bg-[#cdbd9e]"><span className="w-6 text-[9px] text-[#a8894e]">06</span>FIELD GUIDES</a>
          <button disabled className="flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left mono text-[10px] text-[#777064] opacity-55"><span className="w-6 text-[9px] text-[#a8894e]">07</span>ALLIES</button>

          <div className="my-4 border-t border-[#524d42]/45" />
          <a href="/community/rules" className="block min-h-11 px-3 py-2 mono text-[10px] hover:bg-[#cdbd9e]">RULES</a>
          {username && <a href={`/community/profile/${username}`} className="block min-h-11 px-3 py-2 mono text-[10px] hover:bg-[#cdbd9e]">MY PROFILE</a>}
        </nav>

        <div className="border-t border-[#524d42] bg-[#181815] p-5">
          <div className="garrison-thumb mb-5 h-28 border border-[#524d42]" />
          <p className="display text-xl leading-[1.05] text-[#8c2822]">SAME KING.<br />SAME FIGHT.<br />HIGHER CALLING.</p>
          <p className="serif mt-4 text-sm italic text-[#cdbd9e]">“Iron sharpeneth iron...”</p>
          <p className="mono mt-2 text-[9px] text-[#8d826d]">PROVERBS 27:17</p>
        </div>
      </div>
    </aside>
  );
}
