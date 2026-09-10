import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'REBUKEEVIL', description: 'Stand firm. Rebuke evil. Follow Christ.', icons: { icon: '/helmet-logo.png', shortcut: '/helmet-logo.png', apple: '/helmet-logo.png' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
