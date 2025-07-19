import Head from 'next/head';

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Precise Analytics",
    "url": "https://preciseanalytics.io",
    "logo": "https://preciseanalytics.io/PA-logo.png",
    "email": "contact@preciseanalytics.io",
    "telephone": "+1-804-396-4148",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[PO BOX 452]",
      "addressLocality": "Ashland",
      "addressRegion": "VA",
      "postalCode": "23005",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/precise-analytics-llc/",
      "https://github.com/preciseanalytics",
      "https://www.facebook.com/PreciseAnalyticsLLC/"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
