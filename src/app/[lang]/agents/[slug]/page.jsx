// src/app/[lang]/agents/[slug]/page.jsx
// One agent's profile, e.g. /en/agents/gaina-mortel
// Everything here renders on the server: fast on phones, fully readable by
// Google, and no agent data beyond what's shown ever reaches the browser.
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentBySlug, getAgentSlugs } from "@/lib/agents";
import { getAgentCarriers } from "@/lib/carriers";
import {
  getAgentsDictionary,
  getShellDictionary,
  hasLocale,
  localizePath,
  locales,
} from "@/lib/i18n";
import {
  BRAND_NAME,
  LANGUAGE_NAMES,
  SITE_URL,
  fill,
  firstName,
  formatPhone,
  telHref,
} from "@/lib/site";
import "../agents.css";

// Rebuild in the background at most every 5 minutes (Google Sheet edits).
export const revalidate = 300;

const OPEN_GRAPH_LOCALES = { en: "en_US", es: "es_US", fr: "fr_FR", ht: "ht_HT" };

// Font Awesome icons (already loaded by the site) for each coverage type.
const PRODUCT_ICONS = {
  life: "fa-solid fa-heart",
  health: "fa-solid fa-heart-pulse",
  medicare: "fa-solid fa-hand-holding-medical",
  dental: "fa-solid fa-tooth",
  vision: "fa-solid fa-eye",
  "final-expense": "fa-solid fa-dove",
};

const SOCIAL_LINKS = [
  { key: "facebook", icon: "bi-facebook", label: "Facebook" },
  { key: "instagram", icon: "bi-instagram", label: "Instagram" },
  { key: "tiktok", icon: "bi-tiktok", label: "TikTok" },
  { key: "youtube", icon: "bi-youtube", label: "YouTube" },
  { key: "linkedin", icon: "bi-linkedin", label: "LinkedIn" },
];

// Pre-build every agent's page at deploy time (for each language).
// If the sheet can't be reached during the build, pages are simply built on
// the first visit instead.
export async function generateStaticParams() {
  const slugs = await getAgentSlugs();
  return slugs.map((slug) => ({ slug }));
}

function truncate(text, max) {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function agentUrl(lang, slug) {
  return `${SITE_URL}/${lang}/agents/${slug}`;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const agent = await getAgentBySlug(slug, lang);
  if (!agent) return {};

  const t = getAgentsDictionary(lang).profile;
  const title = agent.metaTitle || fill(t.metaTitle, { name: agent.name });
  const description = truncate(
    agent.metaDescription || agent.tagline || agent.bio || fill(t.metaDescription, { name: agent.name }),
    160
  );
  const url = agentUrl(lang, agent.slug);
  const images = agent.photo
    ? [{ url: `${SITE_URL}${agent.photo}`, alt: fill(t.photoAlt, { name: agent.name }) }]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, agentUrl(locale, agent.slug)])),
        "x-default": agentUrl("en", agent.slug),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME,
      locale: OPEN_GRAPH_LOCALES[lang],
      type: "profile",
      images,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: images?.map((image) => image.url),
    },
  };
}

function buildJsonLd({ agent, lang, dictionary, shell }) {
  const url = agentUrl(lang, agent.slug);
  const sameAs = Object.values(agent.social).filter(Boolean);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#agent`,
    name: agent.name,
    jobTitle: agent.title || undefined,
    description: truncate(agent.bio || agent.tagline, 300) || undefined,
    url,
    image: agent.photo ? `${SITE_URL}${agent.photo}` : undefined,
    telephone: agent.phone ? `+1${agent.phone}` : undefined,
    email: agent.email || undefined,
    address:
      agent.city || agent.state
        ? {
            "@type": "PostalAddress",
            addressLocality: agent.city || undefined,
            addressRegion: agent.state || undefined,
            addressCountry: "US",
          }
        : undefined,
    knowsLanguage: agent.languages.map((item) => item.code || item.label),
    areaServed: agent.licenses.map((state) => ({ "@type": "State", name: state })),
    worksFor: {
      "@type": "InsuranceAgency",
      name: BRAND_NAME,
      url: SITE_URL,
      telephone: "+17863977167",
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: shell.nav.home, item: `${SITE_URL}/${lang}` },
      {
        "@type": "ListItem",
        position: 2,
        name: dictionary.directory.breadcrumb,
        item: `${SITE_URL}/${lang}/agents`,
      },
      { "@type": "ListItem", position: 3, name: agent.name, item: url },
    ],
  };

  // Escape "<" so sheet text can never close the <script> tag early.
  return JSON.stringify([person, breadcrumbs]).replace(/</g, "\\u003c");
}

export default async function AgentProfilePage({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const agent = await getAgentBySlug(slug, lang);
  if (!agent) notFound();

  const dictionary = getAgentsDictionary(lang);
  const t = dictionary.profile;
  const shell = getShellDictionary(lang);
  const values = { name: agent.name, firstName: firstName(agent.name) };
  const tel = telHref(agent.phone);
  const carriers = getAgentCarriers(agent);
  const socials = SOCIAL_LINKS.filter((item) => agent.social[item.key]);
  const location = [agent.city, agent.state].filter(Boolean).join(", ");

  return (
    <main className="main h4h-agents h4h-agent-profile">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="page-title h4h-profile-title">
        <div className="heading">
          <div className="container">
            <div className="row align-items-center g-4 h4h-profile-hero">
              <div className="col-md-4 col-lg-3">
                <div className="h4h-profile-photo">
                  {agent.photo ? (
                    <Image
                      src={agent.photo}
                      alt={fill(t.photoAlt, values)}
                      fill
                      priority
                      sizes="(max-width: 767px) 220px, 260px"
                    />
                  ) : (
                    <span className="h4h-agent-initials" aria-hidden="true">
                      {agent.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-8 col-lg-9 text-center text-md-start">
                <h1 className="heading-title">{agent.name}</h1>
                {agent.title && <p className="h4h-profile-role">{agent.title}</p>}
                {location && (
                  <p className="h4h-profile-meta">
                    <i className="bi bi-geo-alt" aria-hidden="true" /> {location}
                  </p>
                )}
                {agent.tagline && <p className="h4h-profile-tagline">{agent.tagline}</p>}

                {agent.languages.length > 0 && (
                  <ul className="h4h-lang-badges" aria-label={t.languages}>
                    {agent.languages.map((item) => (
                      <li key={item.code || item.label} className="h4h-lang-badge" lang={item.code || undefined}>
                        {LANGUAGE_NAMES[item.code] || item.label}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="h4h-profile-actions">
                  {tel && (
                    <a className="btn h4h-btn-primary" href={tel}>
                      <i className="bi bi-telephone" aria-hidden="true" /> {fill(t.call, values)}
                      <span className="h4h-btn-sub">{formatPhone(agent.phone)}</span>
                    </a>
                  )}
                  {agent.email && (
                    <a
                      className="btn h4h-btn-outline"
                      href={`mailto:${agent.email}`}
                      aria-label={fill(t.emailAria, values)}
                    >
                      <i className="bi bi-envelope" aria-hidden="true" /> {t.email}
                    </a>
                  )}
                </div>
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
              <li>
                <Link href={localizePath("/agents", lang)}>{dictionary.directory.breadcrumb}</Link>
              </li>
              <li className="current" aria-current="page">
                {agent.name}
              </li>
            </ol>
          </div>
        </nav>
      </div>

      {/* ── Coverage options ─────────────────────────────────────────── */}
      {agent.products.length > 0 && (
        <section id="coverage" className="section h4h-coverage" aria-labelledby="h4h-coverage-title">
          <div className="container">
            <div className="h4h-section-head">
              <span className="h4h-eyebrow">{t.coverageEyebrow}</span>
              <h2 id="h4h-coverage-title">{fill(t.coverageTitle, values)}</h2>
              <p>{fill(t.coverageIntro, values)}</p>
            </div>

            <ul className="row g-4 list-unstyled">
              {agent.products.map((product) => {
                const info = dictionary.productInfo[product];
                return (
                  <li className="col-12 col-sm-6 col-lg-4" key={product}>
                    <article className="h4h-product-card">
                      <span className="h4h-product-icon" aria-hidden="true">
                        <i className={PRODUCT_ICONS[product]} />
                      </span>
                      <h3>{info.name}</h3>
                      <p>{info.text}</p>
                      <p className="h4h-product-best">
                        <strong>{t.bestFor}</strong> {info.bestFor}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ── Self-enrollment links ────────────────────────────────────── */}
      {carriers.length > 0 && (
        <section id="enroll" className="section light-background h4h-enroll" aria-labelledby="h4h-enroll-title">
          <div className="container">
            <div className="h4h-section-head">
              <span className="h4h-eyebrow">{t.enrollEyebrow}</span>
              <h2 id="h4h-enroll-title">{t.enrollTitle}</h2>
              <p>{fill(t.enrollIntro, values)}</p>
            </div>

            <ul className="row g-4 justify-content-center list-unstyled">
              {carriers.map((carrier) => (
                <li className="col-12 col-sm-6 col-lg-4" key={carrier.id}>
                  <a
                    className="h4h-carrier-card"
                    href={carrier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={carrier.logo} alt="" loading="lazy" decoding="async" />
                    <span className="h4h-carrier-name">{carrier.name}</span>
                    <span className="h4h-carrier-note">{dictionary.carriers[carrier.id]}</span>
                    <span className="h4h-carrier-go">
                      <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                      <span className="visually-hidden"> {t.opensNewTab}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── About ────────────────────────────────────────────────────── */}
      <section id="about" className="section h4h-about" aria-labelledby="h4h-about-title">
        <div className="container">
          <div className="h4h-section-head">
            <span className="h4h-eyebrow">{t.aboutEyebrow}</span>
            <h2 id="h4h-about-title">{fill(t.aboutTitle, values)}</h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              {agent.bio && <p className="h4h-about-lead">{agent.bio}</p>}

              {agent.professionalBackground && (
                <div className="h4h-about-block">
                  <h3>
                    <i className="bi bi-briefcase" aria-hidden="true" /> {t.background}
                  </h3>
                  <p>{agent.professionalBackground}</p>
                </div>
              )}

              {agent.mission && (
                <div className="h4h-about-block">
                  <h3>
                    <i className="bi bi-compass" aria-hidden="true" /> {t.mission}
                  </h3>
                  <p>{agent.mission}</p>
                </div>
              )}

              {agent.honorsAndAwards && (
                <div className="h4h-about-block">
                  <h3>
                    <i className="bi bi-award" aria-hidden="true" /> {t.awards}
                  </h3>
                  <p>{agent.honorsAndAwards}</p>
                </div>
              )}
            </div>

            <div className="col-lg-5">
              <aside className="h4h-glance" aria-labelledby="h4h-glance-title">
                <h3 id="h4h-glance-title">{t.atAGlance}</h3>
                <dl>
                  {location && (
                    <div>
                      <dt>{t.location}</dt>
                      <dd>{location}</dd>
                    </div>
                  )}
                  {agent.licenses.length > 0 && (
                    <div>
                      <dt>{t.licensedIn}</dt>
                      <dd>{agent.licenses.join(", ")}</dd>
                    </div>
                  )}
                  {agent.languages.length > 0 && (
                    <div>
                      <dt>{t.languages}</dt>
                      <dd>
                        {agent.languages
                          .map((item) => LANGUAGE_NAMES[item.code] || item.label)
                          .join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>

                {socials.length > 0 && (
                  <>
                    <p className="h4h-glance-follow">{fill(t.follow, values)}</p>
                    <ul className="h4h-socials">
                      {socials.map((item) => (
                        <li key={item.key}>
                          <a
                            href={agent.social[item.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.label} ${t.opensNewTab}`}
                          >
                            <i className={`bi ${item.icon}`} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      {agent.products.length > 0 && (
        <section id="faq" className="section light-background h4h-faq" aria-labelledby="h4h-faq-title">
          <div className="container">
            <div className="h4h-section-head">
              <span className="h4h-eyebrow">{t.faqEyebrow}</span>
              <h2 id="h4h-faq-title">{t.faqTitle}</h2>
            </div>

            <div className="h4h-faq-list">
              {agent.products.map((product, index) => {
                const item = dictionary.faq[product];
                return (
                  <details key={product} open={index === 0}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact band ─────────────────────────────────────────────── */}
      <section id="contact" className="section h4h-agents-cta">
        <div className="container">
          <div className="h4h-cta-box">
            <div>
              <h2>{fill(t.contactTitle, values)}</h2>
              <p>{t.contactText}</p>
            </div>
            <div className="h4h-cta-actions">
              {tel && (
                <a className="btn h4h-btn-primary" href={tel}>
                  <i className="bi bi-telephone" aria-hidden="true" /> {formatPhone(agent.phone)}
                </a>
              )}
              {agent.email && (
                <a className="btn h4h-btn-outline" href={`mailto:${agent.email}`} aria-label={fill(t.emailAria, values)}>
                  <i className="bi bi-envelope" aria-hidden="true" /> {t.email}
                </a>
              )}
            </div>
          </div>

          <p className="h4h-back-link">
            <Link href={localizePath("/agents", lang)}>
              <i className="bi bi-arrow-left" aria-hidden="true" /> {t.allAgents}
            </Link>
          </p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({ agent, lang, dictionary, shell }),
        }}
      />
    </main>
  );
}
