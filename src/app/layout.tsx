
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { inter, playfair, jetbrains } from './fonts';
import Navigation from '@/components/Navigation';
import { PersonSchema, WebSiteSchema } from '@/components/JsonLd';

const BASE_URL = 'https://aakashsanghvi.com';

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // Basic Meta
  title: {
    default: 'Aakash Sanghvi | Product Manager & UX Strategist',
    template: '%s | Aakash Sanghvi',
  },
  description: 'Building scalable digital products that people actually use. MBA-trained in business and marketing with deep UX, product strategy, and web systems expertise.',
  keywords: [
    'Product Manager',
    'UX Strategist',
    'Product Design',
    'UX Designer',
    'Full Stack Developer',
    'MBA',
    'Digital Products',
    'Web Development',
    'Next.js',
    'Vancouver',
    'Canada',
  ],
  authors: [{ name: 'Aakash Sanghvi', url: BASE_URL }],
  creator: 'Aakash Sanghvi',
  publisher: 'Aakash Sanghvi',

  // Canonical & Alternate
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Aakash Sanghvi Portfolio',
    title: 'Aakash Sanghvi | Product Manager & UX Strategist',
    description: 'Building scalable digital products that people actually use. MBA-trained with deep UX and product strategy expertise.',
    images: [
      {
        url: '/aakash-profile.jpg',
        width: 400,
        height: 400,
        alt: 'Aakash Sanghvi - Product Manager & UX Strategist',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Aakash Sanghvi | Product Manager & UX Strategist',
    description: 'Building scalable digital products that people actually use. MBA-trained with deep UX and product strategy expertise.',
    images: ['/aakash-profile.jpg'],
    creator: '@aakashsanghvi',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  // Additional
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="antialiased font-sans">
        {/* Global JSON-LD Structured Data */}
        <PersonSchema />
        <WebSiteSchema />

        <Navigation />
        {children}
      </body>
    </html>
  );
}

