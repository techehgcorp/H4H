// src/lib/locales.js
// Single source of truth for the site's languages.
// i18n.js, localeProxy.js and agents.js all read from here, so adding or
// removing a language only ever happens in this one file.

export const locales = ["en", "es", "ht", "fr"];
export const defaultLocale = "en";

export function hasLocale(locale) {
  return locales.includes(locale);
}
