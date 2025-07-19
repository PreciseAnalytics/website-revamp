'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PrivacyCookieBanner from '@/components/PrivacyCookieBanner';
import { ThemeProvider } from '@/contexts/ThemeContext'; // ✅ Theme context
import ThemeToggle from '@/components/ThemeToggle';       // ✅ Toggle button

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Website',
  description: 'Website description',
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
          {/* Optional toggle button for dark/light mode */}
          <ThemeToggle />

          <div id="page-content" style={{ minHeight: '100vh', position: 'relative' }}>
            {children}
          </div>

          {/* Cookie Banner - fixed and animated */}
          <PrivacyCookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
