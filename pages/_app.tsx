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

// ✅ Professional OneTrust-style cookie consent
import CookieConsent from '@/components/CookieConsent';

import {
  NewsletterModalContextProvider,
} from 'contexts/newsletter-modal.context';
import {
  PrivacyPolicyProvider,
} from 'contexts/privacy-policy.context';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 📊 Track SPA page navigation
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0F172A" />
      </Head>

      <GlobalStyle />

      <LazyMotion features={domAnimation}>
        <Providers>
          <Component {...pageProps} />
          <AnimatedFooter />
          {/* ✅ Professional OneTrust-style cookie consent */}
          <CookieConsent />
        </Providers>
      </LazyMotion>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <NewsletterModalContextProvider>
      <PrivacyPolicyProvider>
        {children}
      </PrivacyPolicyProvider>
    </NewsletterModalContextProvider>
  );
}

export default MyApp;