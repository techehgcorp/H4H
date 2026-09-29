// src/app/[lang]/agents/AgentDirectory.jsx
// The searchable agent grid. Rendered on the server first (so Google sees
// every agent), then the search box and language buttons work in the browser.
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LANGUAGE_NAMES, fill, formatPhone, telHref } from "@/lib/site";

const LANGUAGE_ORDER = ["ht", "en", "fr", "es", "pt"];

// "Réne" and "rene" should match each other.
function normalize(text) {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function AgentDirectory({ agents, lang, t }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");

  const languageOptions = useMemo(() => {
    const codes = new Set(agents.flatMap((agent) => agent.languages.map((item) => item.code)));
    return LANGUAGE_ORDER.filter((code) => codes.has(code));
  }, [agents]);

  const visibleAgents = useMemo(() => {
    const search = normalize(query);
    return agents.filter((agent) => {
      const matchesName = !search || normalize(agent.name).includes(search);
      const matchesLanguage =
        language === "all" || agent.languages.some((item) => item.code === language);
      return matchesName && matchesLanguage;
    });
  }, [agents, query, language]);

  const isFiltered = query !== "" || language !== "all";
  const resultsText =
    visibleAgents.length === 1
      ? t.resultsOne
      : fill(t.resultsMany, { count: visibleAgents.length });

  return (
    <>
      <div className="h4h-agents-toolbar">
        <label htmlFor="h4h-agent-search" className="form-label">
          {t.searchLabel}
        </label>
        <div className="h4h-search">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            id="h4h-agent-search"
            type="search"
            className="form-control"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
            maxLength={60}
          />
        </div>

        {languageOptions.length > 1 && (
          <div className="h4h-lang-filter" role="group" aria-label={t.languageLabel}>
            <button
              type="button"
              className="h4h-chip"
              aria-pressed={language === "all"}
              onClick={() => setLanguage("all")}
            >
              {t.allLanguages}
            </button>
            {languageOptions.map((code) => (
              <button
                key={code}
                type="button"
                className="h4h-chip"
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
                lang={code}
              >
                {LANGUAGE_NAMES[code]}
              </button>
            ))}
          </div>
        )}

        <p className="h4h-results" aria-live="polite">
          {resultsText}
        </p>
      </div>

      {visibleAgents.length === 0 ? (
        <div className="h4h-agents-empty">
          <i className="bi bi-search" aria-hidden="true" />
          <p>{t.noResults}</p>
          <button
            type="button"
            className="btn h4h-btn-outline"
            onClick={() => {
              setQuery("");
              setLanguage("all");
            }}
          >
            {t.clearFilters}
          </button>
        </div>
      ) : (
        <ul className="row g-4 list-unstyled h4h-agents-grid">
          {visibleAgents.map((agent, index) => {
            const profileHref = `/${lang}/agents/${agent.slug}`;
            const tel = telHref(agent.phone);

            return (
              <li className="col-12 col-sm-6 col-lg-4 col-xl-3" key={agent.slug}>
                <article className="h4h-agent-card">
                  <Link href={profileHref} className="h4h-agent-photo" tabIndex={-1} aria-hidden="true">
                    {agent.photo ? (
                      <Image
                        src={agent.photo}
                        alt={fill(t.photoAlt, { name: agent.name })}
                        fill
                        sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, (max-width: 1199px) 33vw, 25vw"
                        priority={!isFiltered && index < 4}
                      />
                    ) : (
                      <span className="h4h-agent-initials">{initials(agent.name)}</span>
                    )}
                  </Link>

                  <div className="h4h-agent-body">
                    <h3 className="h4h-agent-name">
                      <Link href={profileHref}>{agent.name}</Link>
                    </h3>
                    {agent.title && <p className="h4h-agent-title">{agent.title}</p>}
                    {agent.city && (
                      <p className="h4h-agent-meta">
                        <i className="bi bi-geo-alt" aria-hidden="true" /> {agent.city}
                        {agent.state ? `, ${agent.state}` : ""}
                      </p>
                    )}

                    {agent.languages.length > 0 && (
                      <ul className="h4h-lang-badges" aria-label={t.languageLabel}>
                        {agent.languages.map((item) => (
                          <li key={item.code || item.label} className="h4h-lang-badge" lang={item.code || undefined}>
                            {LANGUAGE_NAMES[item.code] || item.label}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="h4h-agent-actions">
                      <Link href={profileHref} className="btn h4h-btn-primary">
                        {t.viewProfile}
                      </Link>
                      {tel && (
                        <a
                          href={tel}
                          className="btn h4h-btn-outline"
                          aria-label={`${fill(t.callAria, { name: agent.name })}, ${formatPhone(agent.phone)}`}
                        >
                          <i className="bi bi-telephone" aria-hidden="true" /> {t.call}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
