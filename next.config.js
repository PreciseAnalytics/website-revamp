/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async redirects() {
    return [
      // Consolidate duplicate team pages to single canonical URL
      {
        source: '/about-us/team',
        destination: '/team',
        permanent: true, // 301 redirect
      },
      {
        source: '/our-team',
        destination: '/team',
        permanent: true,
      },
      
      // Remove deprecated/non-existent pages
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/schedule-consult',
        permanent: true,
      },
      {
        source: '/certifications',
        destination: '/capabilities-statement',
        permanent: true,
      },
      
      // Fix case sensitivity issue
      {
        source: '/Industries',
        destination: '/sectors',
        permanent: true,
      },
      {
        source: '/industries',
        destination: '/sectors',
        permanent: true,
      },
      
      // Ensure consistent trailing slash handling (optional - choose one approach)
      // Uncomment if you want to enforce no trailing slashes:
      // {
      //   source: '/:path*/',
      //   destination: '/:path*',
      //   permanent: true,
      // },
    ];
  },
  
  // Add headers for better SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;