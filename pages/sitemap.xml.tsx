import { GetServerSideProps } from 'next';

const SITE_URL = 'https://preciseanalytics.io';

// Define page priorities and change frequencies
interface PageConfig {
  path: string;
  priority: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

const STATIC_PAGES: PageConfig[] = [
  // Main pages - High priority
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/capabilities-statement', priority: '0.9', changefreq: 'monthly' },
  
  // About & Team - Medium-high priority
  { path: '/about-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/team', priority: '0.7', changefreq: 'monthly' },
  
  // Sectors - Medium-high priority
  { path: '/sectors', priority: '0.8', changefreq: 'monthly' },
  { path: '/sectors/healthcare', priority: '0.7', changefreq: 'monthly' },
  { path: '/sectors/finance', priority: '0.7', changefreq: 'monthly' },
  { path: '/sectors/manufacturing', priority: '0.7', changefreq: 'monthly' },
  { path: '/sectors/retail', priority: '0.7', changefreq: 'monthly' },
  
  // Conversion pages
  { path: '/schedule-consult', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  
  // Legal pages - Low priority
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookies-policy', priority: '0.3', changefreq: 'yearly' },
];

function generateSitemapXml() {
  const lastmod = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(
  (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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