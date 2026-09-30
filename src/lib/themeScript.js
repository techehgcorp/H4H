// src/lib/themeScript.js
// Tiny script that runs in <head> BEFORE the page paints, so a visitor who
// picked dark mode never sees a white flash on the next page load.
//
// The visitor's choice is saved in localStorage under THEME_STORAGE_KEY by
// ThemeToggle.jsx. It sets two attributes on <html>:
//   data-theme     -> our own CSS (public/assets/css/dark-mode.css)
//   data-bs-theme  -> Bootstrap 5.3's built-in dark styles (forms, tables...)
//
// DEFAULT_THEME decides what first-time visitors get:
//   "light"  -> the site's normal look until they press the toggle
//   "system" -> follow the phone/computer setting (dark if their device is dark)

export const THEME_STORAGE_KEY = "h4h-theme";
export const DEFAULT_THEME = "light";

export const themeScript = `(function () {
  try {
    var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = saved === "dark" || saved === "light" ? saved : "${DEFAULT_THEME}";
    if (theme === "system") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-bs-theme", theme);
  } catch (e) {}
})();`;
