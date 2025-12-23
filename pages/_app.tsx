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

import CookieConsentBar from '@/components/CookieConsentBar';
import PrivacyPreferenceCenter from '@/components/PrivacyPreferenceCenter';

import {
  NewsletterModalContextProvider,
} from 'contexts/newsletter-modal.context';
import {
  PrivacyPolicyProvider,
} from 'contexts/privacy-policy.context';

import { loadConsent, saveConsent } from '@/lib/cookieConsent';
import { loadGA } from '@/lib/analytics';

const GA_ID = 'G-QBCDN5PJ94';

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
          <Modals />
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

function Modals() {
  const [showBar, setShowBar] = React.useState(false);
  const [showPrefs, setShowPrefs] = React.useState(false);

  // 🔒 Initial consent load
  useEffect(() => {
    const consent = loadConsent();

    if (!consent) {
      setShowBar(true);
    }

    if (consent?.performance) {
      loadGA(GA_ID);
    }
  }, []);

  // 🔁 React to preference updates
  useEffect(() => {
    const handler = () => {
      const consent = loadConsent();
      if (consent?.performance) {
        loadGA(GA_ID);
      }
    };

    window.addEventListener('cookie-consent-updated', handler);
    return () => window.removeEventListener('cookie-consent-updated', handler);
  }, []);

  return (
    <>
      {showBar && (
        <CookieConsentBar
          onCustomize={() => setShowPrefs(true)}
          onEssentialOnly={() => {
            saveConsent({
              necessary: true,
              performance: false,
              functional: false,
              targeting: false,
              timestamp: Date.now(),
            });
            window.dispatchEvent(new Event('cookie-consent-updated'));
            setShowBar(false);
          }}
          onAcceptAll={() => {
            saveConsent({
              necessary: true,
              performance: true,
              functional: true,
              targeting: true,
              timestamp: Date.now(),
            });
            window.dispatchEvent(new Event('cookie-consent-updated'));
            setShowBar(false);
            loadGA(GA_ID);
          }}
        />
      )}

      <PrivacyPreferenceCenter
        isOpen={showPrefs}
        onClose={() => {
          window.dispatchEvent(new Event('cookie-consent-updated'));
          setShowPrefs(false);
          setShowBar(false);
        }}
      />
    </>
  );
}

export default MyApp;
