export type FieldGuide = { slug: string; number: string; title: string; summary: string; reference: string };
export const fieldGuides: FieldGuide[] = [{ slug: 'spiritual-warfare', number: '01', title: 'SPIRITUAL WARFARE', summary: 'Understand the battle. Stand firm in truth.', reference: 'EPHESIANS 6:12' }];
export function getFieldGuide(slug: string) { return fieldGuides.find(guide => guide.slug === slug); }
