import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
    localeDetection: false,
  },
};

export default nextConfig;
