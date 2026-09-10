import type { CommunityType } from './CommunityFilters';

export default function GarrisonSidebar({ active, username, onChange }: { active: CommunityType; username?: string; onChange: (type: CommunityType) => void }) {
  const items: [CommunityType, string, string][] = [['ALL', '01', 'FEED'], ['PRAYER', '02', 'PRAYER WATCH'], ['ACCOUNTABILITY', '03', 'ACCOUNTABILITY'], ['TESTIMONY', '04', 'TESTIMONIES']];
  return (
    <aside className="garrison-frame hidden bg-[#1d1d1a] p-2 text-[#1e1c18] lg:block">
      <div className="sticky top-0">
        <div className="garrison-paper border-b border-[#66645d]/50 p-5"><p className="mono text-[10px]">FIELD DIRECTORY</p><p className="serif mt-2 text-sm italic text-[#5e1717]">SOLDIERS. NOT SPECTATORS.</p></div>
        <nav className="garrison-paper p-3">{items.map(([type, number, label]) => <button key={type} onClick={() => onChange(type)} className={`flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left mono text-[10px] ${active === type ? 'bg-[#7a1f1c] text-[#f0e8d8]' : 'text-[#2b2924] hover:bg-[#c7b798]'}`}><span className="w-5 text-[9px] text-[#a98c50]">{number}</span>{label}</button>)}<div className="my-5 border-t border-[#66645d]/40"/><a href="/#scripture-arsenal" className="flex min-h-11 items-center gap-3 px-3 py-2 mono text-[10px] text-[#2b2924] hover:bg-[#c7b798]"><span className="w-5 text-[9px] text-[#a98c50]">05</span>SCRIPTURE ARSENAL</a><a href="/#field-guides" className="flex min-h-11 items-center gap-3 px-3 py-2 mono text-[10px] text-[#2b2924] hover:bg-[#c7b798]"><span className="w-5 text-[9px] text-[#a98c50]">06</span>FIELD GUIDES</a><button disabled className="flex min-h-11 w-full items-center gap-3 px-3 py-2 text-left mono text-[10px] text-[#66645d] opacity-60"><span className="w-5 text-[9px] text-[#a98c50]">07</span>ALLIES</button><div className="my-5 border-t border-[#66645d]/40"/><a href="/community/rules" className="block min-h-11 px-3 py-2 mono text-[10px] text-[#2b2924] hover:bg-[#c7b798]">RULES</a>{username && <a href={`/community/profile/${username}`} className="block min-h-11 px-3 py-2 mono text-[10px] text-[#2b2924] hover:bg-[#c7b798]">MY PROFILE</a>}</nav>
        <div className="relative m-3 h-[210px] overflow-hidden border border-[#66645d]/50">
          <img src="/garrison/garrison-sidebar.jpg" alt="Garrison fortress" className="h-full w-full object-cover object-left" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(14,14,12,.88)_100%)]" />
          <div className="absolute bottom-4 left-4 right-4"><p className="display text-xl text-[#a12720]">SAME KING.<br/>SAME FIGHT.<br/>HIGHER CALLING.</p><p className="serif mt-3 text-sm italic text-[#e5d9c2]">“Iron sharpeneth iron...”</p><p className="mono mt-2 text-[8px] text-[#b79c62]">PROVERBS 27:17</p></div>
        </div>
      </div>
    </aside>
  );
}
