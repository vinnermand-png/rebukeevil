import type { MetadataRoute } from 'next';
import { fieldGuides } from '@/data/fieldGuides';
import { scriptureArsenal } from '@/data/scriptureArsenal';
export default function sitemap(): MetadataRoute.Sitemap { const base = 'https://www.rebukeevil.com'; return [{ url: base, lastModified: new Date() }, { url: `${base}/links`, lastModified: new Date() }, { url: `${base}/scripture`, lastModified: new Date() }, { url: `${base}/field-guides`, lastModified: new Date() }, ...fieldGuides.map(guide => ({ url: `${base}/field-guides/${guide.slug}`, lastModified: new Date() })), ...scriptureArsenal.map(entry => ({ url: `${base}/scripture/${entry.slug}`, lastModified: new Date() }))]; }
