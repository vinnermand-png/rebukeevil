export type ScriptureEntry = {
  slug: string;
  number: string;
  title: string;
  primaryReference: string;
  primaryVerse: string;
  translation: string;
  description: string;
  opposingVirtue: string;
  relatedVerses: string[];
};

export const scriptureArsenal: ScriptureEntry[] = [
  { slug: 'pride', number: '01', title: 'PRIDE', primaryReference: 'PROVERBS 16:18', primaryVerse: 'Pride goeth before destruction, and an haughty spirit before a fall.', translation: 'KJV', description: 'Pride puts the self above God and refuses correction. Humility returns the heart to its proper place before the Lord.', opposingVirtue: 'HUMILITY', relatedVerses: ['Proverbs 11:2', 'Micah 6:8', 'Philippians 2:3–4', 'James 4:6'] },
  { slug: 'greed', number: '02', title: 'GREED', primaryReference: 'LUKE 12:15', primaryVerse: 'And he said unto them, Take heed, and beware of covetousness: for a man\'s life consisteth not in the abundance of the things which he possesseth.', translation: 'KJV', description: 'Greed measures life by possession. Christ calls us away from covetousness and toward a life rich in God.', opposingVirtue: 'GENEROSITY / CONTENTMENT', relatedVerses: ['Matthew 6:19–21', '1 Timothy 6:6–10', 'Hebrews 13:5', '2 Corinthians 9:7'] },
  { slug: 'lust', number: '03', title: 'LUST', primaryReference: 'MATTHEW 5:28', primaryVerse: 'But I say unto you, That whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart.', translation: 'KJV', description: 'Christ calls the battle inward before it becomes outward. Guard the heart, the eyes, and the imagination with truth.', opposingVirtue: 'PURITY', relatedVerses: ['Job 31:1', '1 Corinthians 6:18', '2 Timothy 2:22', 'Galatians 5:16'] },
  { slug: 'envy', number: '04', title: 'ENVY', primaryReference: 'JAMES 3:16', primaryVerse: 'For where envying and strife is, there is confusion and every evil work.', translation: 'KJV', description: 'Envy turns another person\'s blessing into a personal wound. Gratitude and love break its grip and restore clear vision.', opposingVirtue: 'GRATITUDE / LOVE', relatedVerses: ['Proverbs 14:30', 'Galatians 5:26', '1 Corinthians 13:4', 'Psalm 37:1–4'] },
  { slug: 'gluttony', number: '05', title: 'GLUTTONY', primaryReference: 'PROVERBS 23:20–21', primaryVerse: 'Be not among winebibbers; among riotous eaters of flesh: For the drunkard and the glutton shall come to poverty: and drowsiness shall clothe a man with rags.', translation: 'KJV', description: 'Gluttony makes appetite a master. Self-control receives good things without surrendering the rule of the heart to them.', opposingVirtue: 'SELF-CONTROL', relatedVerses: ['Proverbs 25:16', '1 Corinthians 6:12', 'Galatians 5:22–23', 'Titus 2:11–12'] },
  { slug: 'wrath', number: '06', title: 'WRATH', primaryReference: 'JAMES 1:19–20', primaryVerse: 'Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God.', translation: 'KJV', description: 'Wrath answers injury with destruction. Patience makes room for wisdom, and forgiveness refuses to be ruled by the wound.', opposingVirtue: 'PATIENCE / FORGIVENESS', relatedVerses: ['Proverbs 15:1', 'Proverbs 16:32', 'Ephesians 4:31–32', 'Colossians 3:8'] },
  { slug: 'sloth', number: '07', title: 'SLOTH', primaryReference: 'PROVERBS 6:6–11', primaryVerse: 'Go to the ant, thou sluggard; consider her ways, and be wise: Which having no guide, overseer, or ruler, Provideth her meat in the summer, and gathereth her food in the harvest.', translation: 'KJV', description: 'Sloth neglects the work and calling placed before us. Diligence gives faithful attention to what God has put in our hands.', opposingVirtue: 'DILIGENCE / DISCIPLINE', relatedVerses: ['Proverbs 10:4', 'Romans 12:11', 'Colossians 3:23', '2 Thessalonians 3:10–12'] },
];

export function getScriptureEntry(slug: string) { return scriptureArsenal.find(entry => entry.slug === slug); }
