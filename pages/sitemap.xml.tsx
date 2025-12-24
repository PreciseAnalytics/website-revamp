import { GetServerSideProps } from 'next';

const SITE_URL = 'https://preciseanalytics.io';

const STATIC_PAGES = [
  '/',
  '/about-us',
  '/services',
  '/solutions',
  '/sectors',
  '/capabilities-statement',
  '/careers',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/cookies-policy',
];

function generateSitemapXml() {
  const lastmod = '2025-12-24'; // STATIC — critical for Google

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(
  (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
).join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = generateSitemapXml();

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}
