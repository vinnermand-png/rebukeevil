export default function CommunityHeader() {
  return (
    <header className="garrison-hero relative min-h-[280px] overflow-hidden border border-[#5a554b] text-[#f0e8d8]">
      <img
        src="/garrison/garrison-hero.jpg"
        alt="Crusader overlooking the Garrison"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,15,.72)_0%,rgba(18,18,15,.28)_42%,rgba(18,18,15,.12)_72%,rgba(18,18,15,.36)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,.45)]" />
      <div className="relative z-[1] flex min-h-[280px] flex-col justify-between px-7 py-6 md:px-10 md:py-7">
        <div>
          <p className="mono text-[9px] text-[#d4bc7d]">REBUKEEVIL PRIVATE COMMUNITY</p>
          <div className="mt-3 max-w-[760px]">
            <h1 className="display text-[clamp(3.3rem,6.5vw,6.8rem)] leading-[.78] text-[#f0e8d8] drop-shadow-[0_2px_2px_rgba(0,0,0,.65)]">THE GARRISON</h1>
            <p className="display mt-4 text-[clamp(2rem,3.4vw,3.6rem)] leading-none text-[#d8bd72] drop-shadow-[0_2px_2px_rgba(0,0,0,.6)]">DON&apos;T FIGHT ALONE.</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-6">
          <p className="serif text-[17px] text-[#efe3ca] drop-shadow-[0_1px_2px_rgba(0,0,0,.7)]"><span className="mr-3 text-[#9b2b24]">†</span>Pray · Encourage · Equip · Stand</p>
          <p className="hidden mono text-right text-[8px] leading-4 text-[#e6d9bf] md:block">DIFFERENT MEN.<br/>A HOLY MISSION.</p>
        </div>
      </div>
    </header>
  );
}
