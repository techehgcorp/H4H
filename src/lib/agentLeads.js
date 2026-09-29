// src/lib/agentLeads.js
// Everything the /api/agent-lead route needs: checking a submission, saving
// it to the AgentLeads tab, and emailing the agent. Server-only.
import nodemailer from "nodemailer";
import { AGENT_PRODUCTS } from "./agents";
import { appendSheetRow, getSpreadsheetId, updateSheetRange } from "./googleSheets";
import { locales } from "./locales";

export const LEAD_SOURCES = ["quote", "contact", "guide"];

// Must match the column order of the AgentLeads tab (agents.gs creates it).
export const AGENT_LEADS_COLUMNS = [
  "Timestamp",
  "Agent Slug",
  "Agent Name",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Message",
  "Products",
  "Zip Code",
  "Source",
  "Consent",
  "Language",
  "Page URL",
  "IP Address",
  "Device",
  "Browser",
  "Status",
  "Notified",
];
const LAST_COLUMN = String.fromCharCode(64 + AGENT_LEADS_COLUMNS.length); // "S"
const NOTIFIED_COLUMN = String.fromCharCode(65 + AGENT_LEADS_COLUMNS.indexOf("Notified"));

const SOURCE_LABELS = { quote: "Quote request", contact: "Message", guide: "Free guide download" };

// ── Validation ────────────────────────────────────────────────────────
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[a-z]{2,}$/i;

function text(value, max) {
  const v = String(value ?? "").trim();
  if (v.length > max || CONTROL_CHARS.test(v)) return null;
  return v;
}

function singleLine(value, max) {
  const v = text(value, max);
  return v === null || /[\r\n]/.test(v) ? null : v;
}

function phoneDigits(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits;
}

// Returns { lead } when the submission is valid, or { error } with a short
// code the form turns into a message in the visitor's language.
export function validateLead(body, agent) {
  if (!body || typeof body !== "object") return { error: "invalid" };

  const source = LEAD_SOURCES.includes(body.source) ? body.source : null;
  if (!source) return { error: "invalid" };

  const firstName = singleLine(body.firstName, 50);
  const lastName = singleLine(body.lastName, 50);
  if (!firstName || !lastName) return { error: "required" };

  const email = singleLine(body.email, 254)?.toLowerCase() || "";
  if (!EMAIL_PATTERN.test(email)) return { error: "email" };

  const phone = phoneDigits(body.phone);
  if (phone.length !== 10) return { error: "phone" };

  if (body.consent !== true) return { error: "consent" };

  let products = [];
  let zip = "";
  if (source === "quote") {
    const wanted = Array.isArray(body.products) ? body.products : [];
    const allowed = agent.products.length ? agent.products : AGENT_PRODUCTS;
    products = allowed.filter((product) => wanted.includes(product));
    if (!products.length) return { error: "products" };

    zip = String(body.zip ?? "").trim();
    if (!/^\d{5}$/.test(zip)) return { error: "zip" };
  }

  let message = "";
  if (source === "contact") {
    message = text(body.message, 1000);
    if (message === null) return { error: "invalid" };
  }

  const lang = locales.includes(body.lang) ? body.lang : "en";

  return { lead: { source, firstName, lastName, email, phone, products, zip, message, lang } };
}

// ── Request details ───────────────────────────────────────────────────
export function clientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function deviceFrom(userAgent) {
  if (/ipad|tablet/i.test(userAgent)) return "Tablet";
  if (/mobi|android|iphone/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

export function browserFrom(userAgent) {
  if (/edg\//i.test(userAgent)) return "Edge";
  if (/opr\//i.test(userAgent)) return "Opera";
  if (/samsungbrowser/i.test(userAgent)) return "Samsung Internet";
  if (/chrome|crios/i.test(userAgent)) return "Chrome";
  if (/firefox|fxios/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent)) return "Safari";
  return "Other";
}

// Only the path of the page the form was sent from, e.g. "/ht/agents/gaina-mortel".
export function pagePathFrom(request) {
  try {
    const referer = new URL(request.headers.get("referer") || "");
    return referer.pathname.slice(0, 200);
  } catch {
    return "";
  }
}

function easternTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function formatPhone(digits) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ── Save to the AgentLeads tab ────────────────────────────────────────
export async function saveLead({ lead, agent, meta }) {
  const submittedAt = easternTime();
  const row = {
    Timestamp: submittedAt,
    "Agent Slug": agent.slug,
    "Agent Name": agent.name,
    "First Name": lead.firstName,
    "Last Name": lead.lastName,
    Email: lead.email,
    Phone: formatPhone(lead.phone),
    Message: lead.message,
    Products: lead.products.join(", "),
    "Zip Code": lead.zip,
    Source: lead.source,
    Consent: `Yes (${submittedAt} ET)`,
    Language: lead.lang,
    "Page URL": meta.pagePath,
    "IP Address": meta.ip,
    Device: meta.device,
    Browser: meta.browser,
    Status: "New",
    Notified: "",
  };

  const updatedRange = await appendSheetRow(
    `AgentLeads!A:${LAST_COLUMN}`,
    AGENT_LEADS_COLUMNS.map((column) => row[column] ?? "")
  );

  // "AgentLeads!A12:S12" -> 12
  const rowNumber = Number(updatedRange.match(/![A-Z]+(\d+)/)?.[1]) || null;
  return { rowNumber, submittedAt };
}

export async function markNotified(rowNumber, note) {
  if (!rowNumber) return;
  await updateSheetRange(`AgentLeads!${NOTIFIED_COLUMN}${rowNumber}`, [[note]]);
}

// ── Email the agent ───────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

function emailList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => EMAIL_PATTERN.test(item));
}

let transporter = null;
function getTransporter() {
  if (!transporter) {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) throw new Error("EMAIL_USER / EMAIL_PASS are not configured.");

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }
  return transporter;
}

// Who gets the email:
// - the agent's leadEmail (from the Agents tab), when it's filled in
// - everyone in AGENT_LEADS_CC (from .env)
// While testing on your computer (npm run dev) the agent is NOT emailed:
// only AGENT_LEADS_CC gets it, marked [TEST].
export function recipientsFor(agent) {
  const cc = emailList(process.env.AGENT_LEADS_CC);
  const isProduction = process.env.NODE_ENV === "production";
  const agentEmail = isProduction && agent.leadEmail ? [agent.leadEmail] : [];

  const to = agentEmail.length ? agentEmail : cc;
  const copy = agentEmail.length ? cc.filter((item) => item !== agent.leadEmail) : [];

  return { to, cc: copy, isTest: !isProduction, agentMissing: !agent.leadEmail };
}

export async function emailLead({ lead, agent, meta, submittedAt, rowNumber }) {
  const { to, cc, isTest, agentMissing } = recipientsFor(agent);
  if (!to.length) return { sent: false, note: "No recipients configured" };

  const name = `${lead.firstName} ${lead.lastName}`;
  const flags = [isTest && "[TEST]", !isTest && agentMissing && "[No agent email on file]"]
    .filter(Boolean)
    .join(" ");
  const subject = `${flags ? `${flags} ` : ""}New ${SOURCE_LABELS[lead.source].toLowerCase()} for ${agent.name}: ${name}`;

  const sheetLink = `https://docs.google.com/spreadsheets/d/${getSpreadsheetId()}/edit${
    rowNumber ? `#range=A${rowNumber}` : ""
  }`;

  const rows = [
    ["Type", SOURCE_LABELS[lead.source]],
    ["Name", name],
    ["Phone", formatPhone(lead.phone)],
    ["Email", lead.email],
    lead.products.length && ["Interested in", lead.products.join(", ")],
    lead.zip && ["ZIP code", lead.zip],
    lead.message && ["Message", lead.message],
    ["Language", lead.lang],
    ["Page", meta.pagePath],
    ["Submitted", `${submittedAt} ET`],
    ["Consent to contact", "Yes"],
  ].filter(Boolean);

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1e293b;max-width:600px;margin:0 auto;padding:16px">
<h2 style="margin:0 0 4px">New lead for ${escapeHtml(agent.name)}</h2>
<p style="margin:0 0 16px;color:#64748b">${escapeHtml(SOURCE_LABELS[lead.source])} from h4hinsurance.com</p>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="background:#f1f5f9;font-weight:bold;width:150px;border:1px solid #e2e8f0;vertical-align:top">${escapeHtml(label)}</td><td style="border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>
<p style="margin:20px 0"><a href="tel:+1${lead.phone}" style="background:#1977cc;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold">Call ${escapeHtml(lead.firstName)}</a></p>
<p style="font-size:13px;color:#64748b">Reply to this email to answer ${escapeHtml(lead.firstName)} directly. <a href="${sheetLink}">Open the AgentLeads sheet</a></p>
</body></html>`;

  const textBody = [
    `New lead for ${agent.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Sheet: ${sheetLink}`,
  ].join("\n");

  await getTransporter().sendMail({
    from: `"H4H Website" <${process.env.EMAIL_USER}>`,
    to,
    cc: cc.length ? cc : undefined,
    replyTo: `"${name.replace(/"/g, "")}" <${lead.email}>`,
    subject,
    text: textBody,
    html,
  });

  return { sent: true, note: `Emailed ${[...to, ...cc].join(", ")}` };
}
