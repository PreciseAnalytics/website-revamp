'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import PrivacyCookieBanner from '@/components/PrivacyCookieBanner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Precise Analytics',
  description: 'Advanced analytics and data solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeToggle />
          <PrivacyCookieBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
