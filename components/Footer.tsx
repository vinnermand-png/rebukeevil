import HelmetLogo from './HelmetLogo';

export default function Footer() {
  return <footer className="border-t border-white/[.14] px-6 py-10 md:px-12 md:py-12"><div className="mx-auto grid min-h-[100px] max-w-[1540px] gap-10 md:grid-cols-[1fr_1.4fr_1fr] md:items-center"><div><HelmetLogo/></div><p className="mono text-[10px] leading-6 text-[#85847d] md:text-center">STAND FIRM.<br/>REBUKE EVIL.<br/>FOLLOW CHRIST.</p><a href="https://www.rebukeevil.com/links" className="mono text-[10px] text-[#aaa9a1] transition-colors hover:text-[#dedbd0] md:justify-self-end">MY SOCIALS <span className="ml-2 text-[#a08b5c]">↗</span></a></div><div className="mx-auto mt-10 flex max-w-[1540px] justify-between border-t border-white/[.1] pt-5 mono text-[10px] text-[#85847d]"><span>© 2026 REBUKEEVIL</span><span>ALL GLORY TO GOD.</span></div></footer>;
}
