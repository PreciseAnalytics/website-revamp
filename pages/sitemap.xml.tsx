import { GetServerSideProps } from 'next';

/**
 * Dynamic sitemap for Pages Router
 * Served at /sitemap.xml
 *
 * IMPORTANT:
 * - Only include canonical, indexable (200 OK) URLs
 * - Never include redirected, query-string, or legacy URLs
 */

function generateSiteMap() {
  const baseURL = 'https://preciseanalytics.io';
  const lastModified = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const pages = [
    {
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
    },
    {
      path: '/about-us',
      priority: '0.9',
      changefreq: 'monthly',
    },
    {
      path: '/services',
      priority: '0.9',
      changefreq: 'weekly',
    },
    {
      path: '/solutions',
      priority: '0.8',
      changefreq: 'weekly',
    },
    {
      path: '/sectors',
      priority: '0.8',
      changefreq: 'weekly',
    },
    {
      path: '/capabilities-statement',
      priority: '0.7',
      changefreq: 'monthly',
    },
    {
      path: '/careers',
      priority: '0.7',
      changefreq: 'weekly',
    },
    {
      path: '/contact',
      priority: '0.8',
      changefreq: 'monthly',
    },
    {
      path: '/privacy-policy',
      priority: '0.3',
      changefreq: 'yearly',
    },
    {
      path: '/terms-of-service',
      priority: '0.3',
      changefreq: 'yearly',
    },
    {
      path: '/cookies-policy',
      priority: '0.3',
      changefreq: 'yearly',
    },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseURL}${page.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;
}

function SiteMap() {
  // This page intentionally renders nothing
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
