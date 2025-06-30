import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '@fontsource/inter';

import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

import { GlobalStyle } from 'components/GlobalStyles';
import NewsletterModal from 'components/NewsletterModal';
import CookieConsentModal from 'components/CookieConsentModal';
import { NewsletterModalContextProvider, useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { PrivacyPolicyProvider, usePrivacyPolicyContext } from 'contexts/privacy-policy.context';
import PrivacyPolicyModal from 'components/PrivacyPolicyModal';

function MyApp({ Component, pageProps }: AppProps) {
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
          <Modals />
          <Component {...pageProps} />
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
  const { isModalOpened, setIsModalOpened } = useNewsletterModalContext();
  const { isPrivacyPolicyOpen, closePrivacyPolicy } = usePrivacyPolicyContext();

  return (
    <>
      {isModalOpened && <NewsletterModal onClose={() => setIsModalOpened(false)} />}
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={closePrivacyPolicy} />
      <CookieConsentModal />
    </>
  );
}

export default MyApp;
