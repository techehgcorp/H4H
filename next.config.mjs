/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev only: lets your phone load the site from your laptop
  // (http://192.168.1.65:3000). Ignored in production.
  allowedDevOrigins: ["192.168.1.65"],

  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;