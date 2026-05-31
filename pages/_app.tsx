import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '@fontsource/inter';

import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { PropsWithChildren, useEffect } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useRouter } from 'next/router';

import { GlobalStyle } from '@/components/GlobalStyles';
import AnimatedFooter from 'components/AnimatedFooter';
import CanonicalTag from '@/components/CanonicalTag';
import ExitIntentPopup from 'components/ExitIntentPopup';

// Cookie consent
import CookieConsent from '@/components/CookieConsent';

import { NewsletterModalContextProvider } from 'contexts/newsletter-modal.context';
import { PrivacyPolicyProvider } from 'contexts/privacy-policy.context';
import { AuthProvider } from 'contexts/auth.context';

const GA_ID = 'G-QBCDN5PJ94';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // SPA route tracking
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!(window as any).gtag) return;

      (window as any).gtag('event', 'page_view', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* GA4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/Favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0F172A" />
      </Head>

      <CanonicalTag />
      <GlobalStyle />

      <LazyMotion features={domAnimation}>
        <Providers>
          <Component {...pageProps} />
          <AnimatedFooter />
          <CookieConsent />
          <ExitIntentPopup />
        </Providers>
      </LazyMotion>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <AuthProvider>
      <NewsletterModalContextProvider>
        <PrivacyPolicyProvider>
          {children}
        </PrivacyPolicyProvider>
      </NewsletterModalContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
