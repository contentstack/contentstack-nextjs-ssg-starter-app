const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true,
  siteUrl: process.env.SITE_URL || "https://localhost:3000",
  generateRobotsTxt: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
    CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || "main",
    CONTENTSTACK_REGION: process.env.CONTENTSTACK_REGION || "us",
    CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    CONTENTSTACK_API_HOST:
      process.env.CONTENTSTACK_API_HOST || "api.contentstack.io",
    CONTENTSTACK_APP_HOST:
      process.env.CONTENTSTACK_APP_HOST || "app.contentstack.com",
    CONTENTSTACK_PREVIEW_HOST:
      process.env.CONTENTSTACK_PREVIEW_HOST || "rest-preview.contentstack.com",
    NEXT_PUBLIC_CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_LIVE_PREVIEW: process.env.CONTENTSTACK_LIVE_PREVIEW || "true",
    CONTENTSTACK_LIVE_EDIT_TAGS:
      process.env.CONTENTSTACK_LIVE_EDIT_TAGS || "true",
  },
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: "public",
  },
  experimental: { largePageDataBytes: 128 * 100000 },
};

module.exports =
  process.env.NODE_ENV === "development" ? nextConfig : withPWA(nextConfig);
