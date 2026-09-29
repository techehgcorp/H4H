/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev only: lets your phone load the site from your laptop
  // (http://192.168.1.65:3000). Ignored in production.
  allowedDevOrigins: ["192.168.1.65"],

  // Permanent (308) redirects: old links and Google results keep their value.
  async redirects() {
    return [
      // The template's "doctors" page became the real "Find an Agent" page
      {
        source: "/:lang(en|es|ht|fr)/doctors",
        destination: "/:lang/agents",
        permanent: true,
      },
      {
        source: "/doctors",
        destination: "/agents",
        permanent: true,
      },
    ];
  },

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
