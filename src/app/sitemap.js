// src/app/sitemap.js
// Served at /sitemap.xml. Tells Google every real page on the site, in all
// four languages, and which pages are translations of each other.
// Agent pages come from the Agents sheet, so new agents appear automatically.
import { getAgentSlugs } from "@/lib/agents";
import { getServiceDetailSlugs, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

// Rebuild at most once an hour.
export const revalidate = 3600;

// Real content pages only (template/demo pages like /gallery are left out).
const STATIC_PATHS = [
  "",
  "/about",
  "/departments",
  "/services",
  "/service-details",
  "/agents",
  "/appointment",
  "/contact",
  "/faq",
  "/testimonials",
  "/refer-a-friend",
  "/privacy",
  "/terms",
];

function entry(path, priority) {
  return {
    url: `${SITE_URL}/en${path}`,
    changeFrequency: "weekly",
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])),
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
  };
}

export default async function sitemap() {
  const agentSlugs = await getAgentSlugs();
  const serviceSlugs = getServiceDetailSlugs("en");

  const paths = [
    ...STATIC_PATHS.map((path) => [path, path === "" ? 1 : path === "/agents" ? 0.9 : 0.7]),
    ...serviceSlugs.map((slug) => [`/service-details/${slug}`, 0.7]),
    ...agentSlugs.map((slug) => [`/agents/${slug}`, 0.8]),
  ];

  // One entry per page per language, each listing its translations.
  return paths.flatMap(([path, priority]) =>
    locales.map((locale) => {
      const item = entry(path, priority);
      return { ...item, url: `${SITE_URL}/${locale}${path}` };
    })
  );
}
