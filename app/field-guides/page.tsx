import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FieldGuideRow from '@/components/FieldGuideRow';
import { fieldGuides } from '@/data/fieldGuides';

export const metadata: Metadata = { title: 'Field Guides | RebukeEvil', description: 'Scripture and practical guidance for standing firm in truth.', alternates: { canonical: 'https://www.rebukeevil.com/field-guides' } };
export default function FieldGuidesPage() { return <><Header/><main><section className="border-b border-white/[.14] px-6 pb-16 pt-32 md:px-12 md:pb-24"><div className="mx-auto max-w-[1540px]"><p className="mono mb-8 text-[11px] text-[#85847d]">FIELD GUIDES <span className="text-[#4d4d48]">────────────────</span></p><h1 className="display text-[clamp(4rem,9vw,9rem)] leading-[.82]">BIBLICAL GUIDANCE<br/><span className="text-[#a08b5c]">FOR THE BATTLE.</span></h1><p className="serif mt-8 max-w-md text-[18px] leading-relaxed text-[#aaa9a1]">Scripture and practical guidance for standing firm in truth.</p></div></section><section className="px-6 py-16 md:px-12 md:py-24"><div className="mx-auto max-w-[1540px]">{fieldGuides.map(guide => <FieldGuideRow key={guide.slug} guide={guide}/>)}</div></section></main><Footer/></>; }
