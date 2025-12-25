import { GetServerSideProps } from 'next';

const SITE_URL = 'https://preciseanalytics.io';

const STATIC_PAGES = [
  // Main pages
  '/',
  '/about-us',
  '/services',
  '/solutions',
  '/contact',
  '/careers',
  '/certifications',
  
  // About section
  '/about-us/team',
  '/our-team',
  '/team',
  
  // Capabilities
  '/capabilities-statement',
  
  // Sectors - main index
  '/sectors',
  '/sectors/finance',
  '/sectors/healthcare',
  '/sectors/manufacturing',
  '/sectors/retail',
  
  // Industries (if different from sectors)
  '/Industries',
  
  // Features & Solutions
  '/features',
  '/pricing',
  '/schedule-consult',
  
  // Blog
  '/blog',
  
  // Legal pages
  '/privacy-policy',
  '/terms-of-service',
  '/cookies-policy',
];

function generateSitemapXml() {
  const lastmod = new Date().toISOString().split('T')[0]; // Dynamic current date

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(
  (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
).join('\n')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = generateSitemapXml();

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}
