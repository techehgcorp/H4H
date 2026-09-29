// src/lib/site.js
// Small, dependency-free helpers shared by server and client code.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://h4hinsurance.com").replace(/\/+$/, "");
export const BRAND_NAME = "Health 4 Haitians";
export const OFFICE_PHONE = "7863977167";

// Language names shown in their own language, so every visitor recognizes theirs.
export const LANGUAGE_NAMES = {
  en: "English",
  ht: "Kreyòl",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

// fill("Call {name}", { name: "Gaina" }) -> "Call Gaina"
export function fill(template, values) {
  return String(template ?? "").replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}

export function firstName(fullName) {
  return String(fullName ?? "").trim().split(/\s+/)[0] || "";
}

// "754-238-4221", "(754) 238 4221", "+17542384221" -> "7542384221"
export function phoneDigits(value) {
  let digits = String(value ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits;
}

// -> "(754) 238-4221"
export function formatPhone(value) {
  const digits = phoneDigits(value);
  if (digits.length !== 10) return String(value ?? "");
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// -> "tel:+17542384221" (empty string if the number isn't a valid US number)
export function telHref(value) {
  const digits = phoneDigits(value);
  return digits.length === 10 ? `tel:+1${digits}` : "";
}
