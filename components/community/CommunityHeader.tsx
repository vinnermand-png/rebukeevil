export default function CommunityHeader() {
  return (
    <header className="garrison-hero relative overflow-hidden border px-5 py-6 text-[#f0e8d8] md:px-8 md:py-7">
      <div className="relative z-[1] grid h-full gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-end">
        <div>
          <p className="mono text-[9px] text-[#b69a5a]">REBUKEEVIL PRIVATE COMMUNITY</p>
          <h1 className="display mt-4 text-[clamp(3.5rem,6vw,6.2rem)] leading-[.8] text-[#f0e8d8]">THE GARRISON</h1>
          <p className="display mt-4 text-[clamp(2rem,3.3vw,3.25rem)] leading-none text-[#b69a5a]">DON&apos;T FIGHT ALONE.</p>
          <div className="mt-5 flex items-center gap-3 text-[#cfc0a2]">
            <span className="h-px w-8 bg-[#82231f]" />
            <span className="text-lg text-[#8c2822]">✝</span>
            <p className="serif text-[15px] md:text-[17px]">Pray · Encourage · Equip · Stand</p>
          </div>
        </div>
        <div className="hidden md:flex md:h-full md:flex-col md:items-end md:justify-between md:text-right">
          <div className="border border-[#b69a5a]/35 bg-[#11110f]/55 px-3 py-2 mono text-[8px] leading-4 text-[#cdbd9e]">
            HERO IMAGE SLOT<br />READY FOR ASSET
          </div>
          <div className="space-y-4">
            <p className="mono text-[8px] leading-5 text-[#aaa18f]">FAITH<br />BROTHERHOOD<br />DISCIPLINE<br />VICTORY</p>
            <p className="mono text-[8px] leading-4 text-[#b69a5a]">DIFFERENT MEN.<br />A HOLY MISSION.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
