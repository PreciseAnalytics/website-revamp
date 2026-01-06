import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CanonicalTag() {
  const router = useRouter();
  const baseUrl = 'https://preciseanalytics.io';
  
  // Remove all query parameters for canonical URL
  // This ensures ?webfcid=1, ?fbclid=, ?post_type=, etc. all point to clean URL
  const canonicalUrl = `${baseUrl}${router.pathname}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}