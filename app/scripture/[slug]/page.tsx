import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SinDossier from '@/components/SinDossier';
import { getScriptureEntry, scriptureArsenal } from '@/data/scriptureArsenal';
import { getSinDossier } from '@/data/sinDossiers';
import { notFound } from 'next/navigation';

export function generateStaticParams() { return scriptureArsenal.map(entry => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const entry = getScriptureEntry(slug); if (!entry) return {}; const title = `${entry.title.replace('?', '')}: Biblical Meaning and Guidance | RebukeEvil`; return { title, description: `${entry.title.toLowerCase()} in the Bible: understand the sin, its damage, its biblical counter, and practical guidance for repentance and transformation.`, alternates: { canonical: `https://www.rebukeevil.com/scripture/${slug}` } }; }
export default async function ScriptureCategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = getScriptureEntry(slug); const dossier = getSinDossier(slug); if (!entry || !dossier) notFound(); const index = scriptureArsenal.findIndex(item => item.slug === slug); return <><Header/><main><SinDossier entry={entry} dossier={dossier} previous={scriptureArsenal[index - 1]} next={scriptureArsenal[index + 1]}/></main><Footer/></>; }
