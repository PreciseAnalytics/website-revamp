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
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
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
      {
        source: '/resources',
        destination: '/capabilities-statement',
        permanent: true,
      },
      {
        source: '/resources/:path*',
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
    ];
  },
  
  // Return 410 Gone for old WordPress URLs
  async rewrites() {
    return {
      beforeFiles: [
        // Block WordPress admin paths with 410 Gone
        {
          source: '/wp-admin/:path*',
          destination: '/api/410',
        },
        {
          source: '/wp-includes/:path*',
          destination: '/api/410',
        },
        {
          source: '/wp-content/:path*',
          destination: '/api/410',
        },
      ],
    };
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
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://fonts.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
              "frame-src 'self' https://calendly.com https://calendar.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          },
        ],
      },
    ];
  },
  
  // Handle trailing slashes
  trailingSlash: false,
};

export default nextConfig;
