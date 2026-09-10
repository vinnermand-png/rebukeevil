import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ScriptureArsenal from '@/components/ScriptureArsenal';
import FieldGuides from '@/components/FieldGuides';
import LinksGateway from '@/components/LinksGateway';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'REBUKEEVIL | Christian Spiritual Warfare & Biblical Truth', description: 'RebukeEvil points people to Jesus Christ through Christian spiritual warfare, biblical truth, Scripture, and faith.', alternates: { canonical: 'https://rebukeevil.com/' } };
export default function Home() { return <><Header/><main><Hero/><About/><ScriptureArsenal/><FieldGuides/><LinksGateway/></main><Footer/></>; }
