import { GetServerSideProps } from 'next';

/**
 * Sitemap for Pages Router
 * This file creates a dynamic sitemap at /sitemap.xml
 */

function generateSiteMap() {
  const baseURL = 'https://preciseanalytics.io';
  const currentDate = new Date().toISOString();

  const pages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/about-us', priority: '0.9', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/solutions', priority: '0.8', changefreq: 'weekly' },
    { url: '/sectors', priority: '0.8', changefreq: 'weekly' },
    { url: '/capabilities-statement', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/careers', priority: '0.7', changefreq: 'weekly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies-policy', priority: '0.3', changefreq: 'yearly' },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `
  <url>
    <loc>${baseURL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join('')}
</urlset>`;
}

function SiteMap() {
  // This component doesn't render anything
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;