import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FieldGuideArticle from '@/components/FieldGuideArticle';
import { getFieldGuide } from '@/data/fieldGuides';

export const metadata: Metadata = { title: 'Spiritual Warfare: A Biblical Guide | RebukeEvil', description: 'A biblical guide to spiritual warfare, the Bible, Ephesians 6, the armor of God, resisting temptation, and standing firm in Christ.' };
export default function SpiritualWarfarePage() { const guide = getFieldGuide('spiritual-warfare'); if (!guide) return null; return <><Header/><main><FieldGuideArticle guide={guide}/></main><Footer/></>; }
