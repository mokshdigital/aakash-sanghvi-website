
import type { Metadata } from 'next';
import './globals.css';
import { inter, playfair, jetbrains } from './fonts';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Aakash Sanghvi | Product Manager & UX Strategist',
  description: 'Building scalable digital products. MBA-trained in business and marketing. Deep UX and web systems expertise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="antialiased font-sans">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
