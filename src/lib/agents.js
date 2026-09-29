// src/lib/agents.js
// Reads agent profiles from the "Agents" tab of the H4H_Form spreadsheet.
//
// - Cached in memory for 5 minutes, so sheet edits go live without a deploy
//   and Google isn't called on every page view.
// - If Google can't be reached, the last good copy keeps being served.
// - Every value is cleaned and checked here, so a typo in the sheet (or a
//   malicious link pasted into it) can never break or hijack a page.
//
// Server-only: import this from pages and API routes, never from a
// "use client" component.
import { readSheetRange } from "./googleSheets";
import { defaultLocale, locales } from "./locales";

const AGENTS_RANGE = "Agents!A:BZ";
const CACHE_TTL_MS = 5 * 60 * 1000;
const RETRY_AFTER_ERROR_MS = 60 * 1000;
const PHOTO_DIR = "/assets/img/agents/";

export const AGENT_PRODUCTS = ["life", "health", "medicare", "dental", "vision", "final-expense"];

// English columns that have _es / _fr / _ht copies in the sheet.
const TRANSLATED_FIELDS = [
  "title",
  "tagline",
  "bio",
  "professionalBackground",
  "honorsAndAwards",
  "mission",
  "metaTitle",
  "metaDescription",
];

// Values found in the sheet's "languages" column -> language code.
const LANGUAGE_CODES = {
  english: "en",
  anglais: "en",
  "haitian creole": "ht",
  creole: "ht",
  kreyol: "ht",
  "kreyòl": "ht",
  "kreyòl ayisyen": "ht",
  french: "fr",
  "français": "fr",
  francais: "fr",
  spanish: "es",
  "español": "es",
  espanol: "es",
  portuguese: "pt",
};

// ── Cleaning helpers ──────────────────────────────────────────────────
function clean(value) {
  return String(value ?? "").trim();
}

function isTrue(value) {
  return value === true || clean(value).toUpperCase() === "TRUE";
}

function splitList(value) {
  return clean(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_PATTERN = /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i;

export function isValidSlug(value) {
  return SLUG_PATTERN.test(clean(value));
}

function email(value) {
  const v = clean(value).toLowerCase();
  return EMAIL_PATTERN.test(v) ? v : "";
}

// Only real https:// links make it onto the page (blocks "javascript:" etc.).
function httpsUrl(value) {
  const v = clean(value);
  if (!v) return "";
  try {
    const url = new URL(v);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

// A path on this site, like "/brochures/h4h-insurance-guide.pdf".
function sitePath(value) {
  const v = clean(value);
  return /^\/(?!\/)[A-Za-z0-9/_.-]+$/.test(v) && !v.includes("..") ? v : "";
}

// "frantz-saintval.png" -> "/assets/img/agents/frantz-saintval.png"
function photoPath(value) {
  const v = clean(value);
  if (!v) return "";
  if (/^[A-Za-z0-9_.-]+\.(png|jpe?g|webp|avif)$/i.test(v)) return PHOTO_DIR + v;
  return sitePath(v);
}

function phone(value) {
  let digits = clean(value).replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.length === 10 ? digits : "";
}

function languagesFrom(value) {
  const seen = new Set();
  const result = [];

  for (const label of splitList(value)) {
    const code = LANGUAGE_CODES[label.toLowerCase()] || "";
    const key = code || label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ code, label });
  }

  return result;
}

function productsFrom(value) {
  const wanted = splitList(value).map((item) => item.toLowerCase());
  return AGENT_PRODUCTS.filter((product) => wanted.includes(product));
}

// ── Sheet rows -> agent records ───────────────────────────────────────
function rowsToObjects(values) {
  if (!values.length) return [];
  const headers = values[0].map(clean);

  return values.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      if (header) record[header] = row[index];
    });
    return record;
  });
}

function toAgentRecord(row) {
  const slug = clean(row.slug).toLowerCase();
  const name = clean(row.name);

  if (!isValidSlug(slug) || !name || !isTrue(row.isActive)) return null;

  const text = {};
  for (const field of TRANSLATED_FIELDS) {
    text[field] = { en: clean(row[field]) };
    for (const locale of locales) {
      if (locale !== "en") text[field][locale] = clean(row[`${field}_${locale}`]);
    }
  }

  const leadEmail = email(row.leadEmail);
  const sortOrder = Number(clean(row.sortOrder));

  return {
    slug,
    name,
    sortOrder: clean(row.sortOrder) !== "" && Number.isFinite(sortOrder) ? sortOrder : 999,
    photo: photoPath(row.photo),
    phone: phone(row.phone),
    email: email(row.email),
    // Private: where lead notifications go. Never sent to the browser.
    leadEmail: leadEmail.startsWith("todo") ? "" : leadEmail,
    city: clean(row.city),
    state: clean(row.state).toUpperCase(),
    licenses: splitList(row.licenses).map((item) => item.toUpperCase()),
    languages: languagesFrom(row.languages),
    products: productsFrom(row.products),
    social: {
      facebook: httpsUrl(row.facebook),
      instagram: httpsUrl(row.instagram),
      youtube: httpsUrl(row.youtube),
      tiktok: httpsUrl(row.tiktok),
      linkedin: httpsUrl(row.linkedin),
    },
    carriers: {
      ameritasDental: httpsUrl(row.ameritasDentalUrl),
      oneShare: httpsUrl(row.oneShareUrl),
      healthSherpa: httpsUrl(row.healthSherpaUrl),
    },
    brochureFile: sitePath(row.brochureFile),
    text,
  };
}

export function parseAgentRows(values) {
  const seen = new Set();

  return rowsToObjects(values)
    .map(toAgentRecord)
    .filter((record) => {
      if (!record || seen.has(record.slug)) return false;
      seen.add(record.slug);
      return true;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

// The public version of an agent, in one language. This is the only shape
// pages and components ever see (no leadEmail).
export function localizeAgent(record, locale = defaultLocale) {
  const pick = (field) => record.text[field][locale] || record.text[field].en;

  return {
    slug: record.slug,
    name: record.name,
    photo: record.photo,
    phone: record.phone,
    email: record.email,
    city: record.city,
    state: record.state,
    licenses: record.licenses,
    languages: record.languages,
    products: record.products,
    social: record.social,
    carriers: record.carriers,
    brochureFile: record.brochureFile,
    title: pick("title"),
    tagline: pick("tagline"),
    bio: pick("bio"),
    professionalBackground: pick("professionalBackground"),
    honorsAndAwards: pick("honorsAndAwards"),
    mission: pick("mission"),
    metaTitle: pick("metaTitle"),
    metaDescription: pick("metaDescription"),
  };
}

// ── Cache ─────────────────────────────────────────────────────────────
let cache = { records: null, expiresAt: 0 };
let lastFailureAt = 0;
let inflight = null;

async function loadRecords() {
  const now = Date.now();

  if (cache.records && now < cache.expiresAt) return cache.records;
  if (!cache.records && now - lastFailureAt < RETRY_AFTER_ERROR_MS) return [];

  if (!inflight) {
    inflight = readSheetRange(AGENTS_RANGE)
      .then((values) => {
        const records = parseAgentRows(values);
        cache = { records, expiresAt: Date.now() + CACHE_TTL_MS };
        return records;
      })
      .catch((error) => {
        console.error("[agents] Could not load the Agents sheet:", error?.message || error);
        lastFailureAt = Date.now();

        if (cache.records) {
          // Keep serving the last good copy; try Google again in a minute.
          cache = { records: cache.records, expiresAt: Date.now() + RETRY_AFTER_ERROR_MS };
          return cache.records;
        }

        return [];
      })
      .finally(() => {
        inflight = null;
      });
  }

  return inflight;
}

// ── Public API ────────────────────────────────────────────────────────
export async function getAgents(locale = defaultLocale) {
  const records = await loadRecords();
  return records.map((record) => localizeAgent(record, locale));
}

export async function getAgentBySlug(slug, locale = defaultLocale) {
  if (!isValidSlug(slug)) return null;
  const records = await loadRecords();
  const record = records.find((item) => item.slug === slug);
  return record ? localizeAgent(record, locale) : null;
}

export async function getAgentSlugs() {
  const records = await loadRecords();
  return records.map((record) => record.slug);
}

// For the lead API route only: who should be emailed about this agent's leads.
export async function getAgentLeadContact(slug) {
  if (!isValidSlug(slug)) return null;
  const records = await loadRecords();
  const record = records.find((item) => item.slug === slug);
  return record ? { slug: record.slug, name: record.name, leadEmail: record.leadEmail } : null;
}
