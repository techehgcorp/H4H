// src/app/[lang]/agents/page.jsx
// "Find an Agent" directory: /en/agents, /es/agents, /ht/agents, /fr/agents
import Link from "next/link";
import { notFound } from "next/navigation";
import AgentDirectory from "./AgentDirectory";
import { getAgents } from "@/lib/agents";
import {
  getAgentsDictionary,
  getShellDictionary,
  hasLocale,
  localizePath,
  locales,
} from "@/lib/i18n";
import { BRAND_NAME, OFFICE_PHONE, SITE_URL, formatPhone, telHref } from "@/lib/site";
import "./agents.css";

// Rebuild this page in the background at most every 5 minutes,
// so Google Sheet edits show up without a deploy.
export const revalidate = 300;

const OPEN_GRAPH_LOCALES = { en: "en_US", es: "es_US", fr: "fr_FR", ht: "ht_HT" };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const t = getAgentsDictionary(lang);
  const url = `${SITE_URL}/${lang}/agents`;

  return {
    title: t.meta.directoryTitle,
    description: t.meta.directoryDescription,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `${SITE_URL}/${locale}/agents`])),
        "x-default": `${SITE_URL}/en/agents`,
      },
    },
    openGraph: {
      title: t.meta.directoryTitle,
      description: t.meta.directoryDescription,
      url,
      siteName: BRAND_NAME,
      locale: OPEN_GRAPH_LOCALES[lang],
      type: "website",
    },
  };
}

export default async function AgentsPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getAgentsDictionary(lang);
  const shell = getShellDictionary(lang);
  const agents = await getAgents(lang);

  // Only what the cards need goes to the browser.
  const cards = agents.map((agent) => ({
    slug: agent.slug,
    name: agent.name,
    title: agent.title,
    photo: agent.photo,
    phone: agent.phone,
    city: agent.city,
    state: agent.state,
    languages: agent.languages,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.directory.title,
    itemListElement: agents.map((agent, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/${lang}/agents/${agent.slug}`,
      name: agent.name,
    })),
  };

  return (
    <main className="main h4h-agents">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{t.directory.title}</h1>
                <p className="mb-0">{t.directory.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <div className="container">
            <ol>
              <li>
                <Link href={localizePath("/", lang)}>{shell.nav.home}</Link>
              </li>
              <li className="current" aria-current="page">
                {t.directory.breadcrumb}
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="section h4h-agents-list" aria-labelledby="h4h-agents-heading">
        <div className="container">
          <h2 id="h4h-agents-heading" className="visually-hidden">
            {t.directory.title}
          </h2>

          {cards.length > 0 ? (
            <AgentDirectory agents={cards} lang={lang} t={t.directory} />
          ) : (
            <div className="h4h-agents-empty">
              <i className="bi bi-people" aria-hidden="true" />
              <p>{t.directory.unavailable}</p>
              <a className="btn h4h-btn-primary" href={telHref(OFFICE_PHONE)}>
                <i className="bi bi-telephone" aria-hidden="true" /> {formatPhone(OFFICE_PHONE)}
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section h4h-agents-cta">
        <div className="container">
          <div className="h4h-cta-box">
            <div>
              <h2>{t.directory.ctaTitle}</h2>
              <p>{t.directory.ctaText}</p>
            </div>
            <div className="h4h-cta-actions">
              <a className="btn h4h-btn-outline" href={telHref(OFFICE_PHONE)}>
                <i className="bi bi-telephone" aria-hidden="true" /> {formatPhone(OFFICE_PHONE)}
              </a>
              <Link className="btn h4h-btn-primary" href={localizePath("/appointment", lang)}>
                {t.directory.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {agents.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </main>
  );
}
