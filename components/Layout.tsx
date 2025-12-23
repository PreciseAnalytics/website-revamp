'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // ✅ Add this
import './globals.css';
import PrivacyCookieBanner from '@/components/PrivacyCookieBanner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

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
          {/* Your existing layout content */}
          <ThemeToggle />
          <PrivacyCookieBanner />
          {children}
        </ThemeProvider>

        {/* GA4 scripts */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QBCDN5PJ94"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QBCDN5PJ94');
          `}
        </Script>
      </body>
    </html>
  );
}
