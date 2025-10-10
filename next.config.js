const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  // Images optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rusden.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.rusden.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Redirects
  async redirects() {
    return [
      // Legacy URLs
      {
        source: '/estate/:path*',
        destination: '/nedvizhimost/:path*',
        permanent: true,
      },
      {
        source: '/jobs/:path*',
        destination: '/rabota/:path*',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/uslugi/:path*',
        permanent: true,
      },
      // Remove trailing slashes
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },

  // Rewrites for API
  async rewrites() {
    return [
      // API versioning
      {
        source: '/api/v1/:path*',
        destination: '/api/:path*',
      },
      // SEO friendly URLs
      {
        source: '/nedvizhimost/:category/:city/:id',
        destination: '/listing/:id',
      },
      {
        source: '/rabota/:city/:id',
        destination: '/job/:id',
      },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Generate source maps for production
  productionBrowserSourceMaps: false,

  // Enable compression
  compress: true,

  // Power by header
  poweredByHeader: false,

  // Generate etags
  generateEtags: true,

  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withNextIntl(nextConfig);
