import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'REBUKEEVIL', description: 'Stand firm. Rebuke evil. Follow Christ.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
