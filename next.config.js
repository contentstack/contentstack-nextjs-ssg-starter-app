const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  siteUrl: process.env.SITE_URL || 'https://localhost:3000',
  generateRobotsTxt: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    CONTENTSTACK_API_HOST:
      process.env.CONTENTSTACK_API_HOST || 'api.contentstack.io',
    CONTENTSTACK_APP_HOST:
      process.env.CONTENTSTACK_APP_HOST || 'app.contentstack.com',
    NEXT_PUBLIC_CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_LIVE_PREVIEW:
      process.env.CONTENTSTACK_LIVE_PREVIEW || 'true',
    CONTENTSTACK_LIVE_EDIT_TAGS:
      process.env.CONTENTSTACK_LIVE_EDIT_TAGS || 'true',
  },
  devIndicators: {
    autoPrerender: false, 
  },
  pwa: {
    dest: 'public'
  }
};

module.exports =process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);;
