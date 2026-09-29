// src/app/robots.js
// Served at /robots.txt. Lets search engines crawl the site (except the
// form endpoints under /api) and points them to the sitemap.
import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
