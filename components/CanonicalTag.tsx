import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CanonicalTag() {
  const router = useRouter();
  // Keep production canonicals pinned to the primary domain, but allow localhost
  // during local crawls to avoid false-positive canonicalization warnings.
  const configuredBaseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://preciseanalytics.io'
  ).replace(/\/+$/, '');
  const origin =
    typeof window !== 'undefined' ? window.location.origin : configuredBaseUrl;
  const baseUrl =
    /localhost|127\.0\.0\.1/i.test(origin) ? origin : configuredBaseUrl;
  
  // Use asPath for actual URL (handles dynamic routes), strip query params.
  const canonicalUrl = `${baseUrl}${router.asPath.split('?')[0]}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
