import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import LayoutClient from './layout-client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://preciseanalytics.io'),
  
  title: {
    default: 'Precise Analytics - Data Analytics Solutions',
    template: '%s | Precise Analytics',
  },
  
  description: 'Veteran-owned data analytics company providing comprehensive solutions for government and commercial clients. VOSB and SWaM certified.',
  
  alternates: {
    canonical: 'https://preciseanalytics.io',
  },
  
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
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://preciseanalytics.io',
    siteName: 'Precise Analytics',
    title: 'Precise Analytics - Data Analytics Solutions',
    description: 'Veteran-owned data analytics company providing comprehensive solutions for government and commercial clients. VOSB and SWaM certified.',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Precise Analytics - Data Analytics Solutions',
    description: 'Veteran-owned data analytics company providing comprehensive solutions for government and commercial clients.',
  },
  
  icons: {
    icon: '/favicon.ico',
  },
  
  keywords: [
    'data analytics',
    'data engineering',
    'business intelligence',
    'AI ML solutions',
    'government contracting',
    'VOSB',
    'SWaM certified',
    'veteran owned business',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Precise Analytics',
    url: 'https://preciseanalytics.io',
    logo: 'https://preciseanalytics.io/logo.png',
    description: 'Veteran-owned data analytics company specializing in comprehensive solutions for government and commercial clients.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Richmond',
      addressRegion: 'VA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-804-396-4148',
      contactType: 'customer service',
      email: 'contact@preciseanalytics.io',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}