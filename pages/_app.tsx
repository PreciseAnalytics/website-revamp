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

// Cookie consent
import CookieConsent from '@/components/CookieConsent';

import { NewsletterModalContextProvider } from 'contexts/newsletter-modal.context';
import { PrivacyPolicyProvider } from 'contexts/privacy-policy.context';

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
