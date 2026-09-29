// src/app/api/agent-lead/route.js
// Receives the Quote / Message / Free Guide forms from agent profile pages.
//
// Order of work, so a lead is never lost:
//   1. Check it's a real person (spam checks) and the data is valid
//   2. Save it to the AgentLeads tab
//   3. Email the agent (+ AGENT_LEADS_CC)
//   4. Write the result in the lead's "Notified" column
import { NextResponse } from "next/server";
import { getAgentLeadContact } from "@/lib/agents";
import {
  browserFrom,
  clientIp,
  deviceFrom,
  emailLead,
  markNotified,
  pagePathFrom,
  saveLead,
  validateLead,
} from "@/lib/agentLeads";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const MIN_FILL_TIME_MS = 2000; // humans take longer than 2s to fill a form

// ── Simple per-IP rate limit (in memory; fine for one server) ─────────
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((time) => now - time < RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

// Only accept form posts coming from this website.
function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // some privacy tools strip it; other checks still apply

  let host;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }

  const siteHost = new URL(SITE_URL).host;
  const allowed = new Set([
    siteHost,
    `www.${siteHost.replace(/^www\./, "")}`,
    request.headers.get("host"),
    request.headers.get("x-forwarded-host"),
  ]);

  if (process.env.NODE_ENV !== "production") return true;
  return allowed.has(host);
}

function reply(status, body) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) return reply(403, { ok: false, error: "invalid" });

  const ip = clientIp(request);
  if (isRateLimited(ip)) return reply(429, { ok: false, error: "rateLimited" });

  // Parse (with a size cap)
  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return reply(413, { ok: false, error: "invalid" });
    body = JSON.parse(raw);
  } catch {
    return reply(400, { ok: false, error: "invalid" });
  }

  const agent = await getAgentLeadContact(body?.agentSlug);
  if (!agent) return reply(400, { ok: false, error: "invalid" });

  const download = body?.source === "guide" ? agent.brochureFile || null : null;

  // Bot traps: a hidden field only bots fill in, and forms sent impossibly
  // fast. Bots get a normal-looking "success" so they don't adapt.
  // (elapsedMs is measured in the visitor's browser, so a wrong clock on
  // their phone can't cause a real lead to be dropped.)
  const elapsed = Number(body.elapsedMs);
  const tooFast = Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_TIME_MS;
  if (String(body.company || "").trim() || tooFast) {
    return reply(200, { ok: true, download });
  }

  const { lead, error } = validateLead(body, agent);
  if (error) return reply(400, { ok: false, error });

  const userAgent = request.headers.get("user-agent") || "";
  const meta = {
    ip,
    pagePath: pagePathFrom(request),
    device: deviceFrom(userAgent),
    browser: browserFrom(userAgent),
  };

  // 1. Save
  let saved = null;
  try {
    saved = await saveLead({ lead, agent, meta });
  } catch (err) {
    console.error("[agent-lead] Could not save lead to the sheet:", err?.message || err);
  }

  // 2. Email
  let emailed = null;
  try {
    emailed = await emailLead({
      lead,
      agent,
      meta,
      submittedAt: saved?.submittedAt || new Date().toISOString(),
      rowNumber: saved?.rowNumber,
    });
  } catch (err) {
    console.error("[agent-lead] Could not email lead:", err?.message || err);
  }

  if (!saved && !emailed?.sent) {
    // Nothing worked: tell the visitor so they can call instead.
    console.error("[agent-lead] LEAD LOST", agent.slug, lead.source, new Date().toISOString());
    return reply(500, { ok: false, error: "generic" });
  }

  // 3. Record the email result on the lead's row
  if (saved?.rowNumber) {
    const note = emailed?.sent
      ? `${emailed.note} (${new Date().toISOString()})`
      : `NOT emailed: ${emailed?.note || "email failed"}`;
    markNotified(saved.rowNumber, note).catch((err) =>
      console.error("[agent-lead] Could not update Notified column:", err?.message || err)
    );
  }

  return reply(200, { ok: true, download });
}

export function GET() {
  return reply(405, { ok: false, error: "invalid" });
}
