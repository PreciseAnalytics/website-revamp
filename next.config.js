const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

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

  swcMinify: true,

  compiler: {
    styledComponents: true,
  },

  // ✅ SEO FIX: 301 redirect for legacy request-quote page
  async redirects() {
    return [
      {
        source: '/request-quote',
        destination: '/contact',
        permanent: true, // 301
      },
    ];
  },

  webpack: (config, { isServer }) => {
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
