import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fotos15.apinmo.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  transpilePackages: ['@react-pdf/renderer', 'react-map-gl', 'mapbox-gl'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  async redirects() {
    return [
      {
        source: '/:locale/guide/kopa-salja-spanien-2025',
        destination: '/:locale/guide/kopa-bostad-spanien',
        permanent: true,
      },
      {
        source: '/guide/kopa-salja-spanien-2025',
        destination: '/guide/kopa-bostad-spanien',
        permanent: true,
      },
      {
        source: '/:locale/omraden/costa-de-almeria',
        destination: '/:locale/omraden/costa-almeria',
        permanent: true,
      },
      {
        source: '/omraden/costa-de-almeria',
        destination: '/omraden/costa-almeria',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
