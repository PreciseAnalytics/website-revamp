import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CanonicalTag() {
  const router = useRouter();
  const baseUrl = 'https://preciseanalytics.io';
  
  // Use asPath for actual URL (handles dynamic routes), strip query params
  const canonicalUrl = `${baseUrl}${router.asPath.split('?')[0]}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}