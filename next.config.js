const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  trailingSlash: false,

  swcMinify: true,

  compiler: {
    styledComponents: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.blog',
      },
    ],
    deviceSizes: [320, 640, 1080, 1200],
    imageSizes: [64, 128],
  },

  async redirects() {
    return [
      /**
       * ---------------------------------------
       * CANONICAL HOST (www → non-www)
       * ---------------------------------------
       */
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.preciseanalytics.io' }],
        destination: 'https://preciseanalytics.io/:path*',
        permanent: true,
      },

      /**
       * ---------------------------------------
       * PRIMARY LEGACY URL FIXES (GSC 404s)
       * ---------------------------------------
       */
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/request-quote',
        destination: '/schedule-consult',
        permanent: true,
      },
      {
        source: '/data-visualization',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/predictive-analysis',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/technology',
        destination: '/services',
        permanent: true,
      },

      {
        source: '/manufacturing',
        destination: '/sectors/manufacturing',
        permanent: true,
      },

      /**
       * ---------------------------------------
       * TRAILING SLASH NORMALIZATION
       * ---------------------------------------
       */
      {
        source: '/about-us/',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/careers/',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/capabilities-statement/',
        destination: '/capabilities-statement',
        permanent: true,
      },
      {
        source: '/services/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/sectors/',
        destination: '/sectors',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/privacy-policy/',
        destination: '/privacy-policy',
        permanent: true,
      },

      /**
       * ---------------------------------------
       * WORDPRESS GHOST URL ELIMINATION
       * ---------------------------------------
       */
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },

      /**
       * ---------------------------------------
       * QUERY STRING CANONICALIZATION (WP JOBS)
       * ---------------------------------------
       */
      {
        source: '/',
        has: [{ type: 'query', key: 'post_type' }],
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'p' }],
        destination: '/careers',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: [
        { loader: '@svgr/webpack' },
        { loader: 'url-loader' },
      ],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
