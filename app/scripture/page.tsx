import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScriptureRow from '@/components/ScriptureRow';
import { scriptureArsenal } from '@/data/scriptureArsenal';

export default function ScripturePage() { return <><Header/><main><section className="border-b border-white/[.14] px-6 pb-16 pt-32 md:px-12 md:pb-24"><div className="mx-auto max-w-[1540px]"><p className="mono mb-8 text-[11px] text-[#85847d]">SCRIPTURE ARSENAL <span className="text-[#4d4d48]">────────────────</span></p><h1 className="display text-[clamp(4rem,9vw,9rem)] leading-[.82]">KNOW THY<br/><span className="text-[#a08b5c]">ENEMY.</span></h1><p className="serif mt-8 max-w-md text-[18px] leading-relaxed text-[#aaa9a1]">Know the enemy. Know the Word.</p></div></section><section className="px-6 py-16 md:px-12 md:py-24"><div className="mx-auto max-w-[1540px]">{scriptureArsenal.map(entry => <ScriptureRow key={entry.slug} entry={entry}/>)}</div></section></main><Footer/></>; }
