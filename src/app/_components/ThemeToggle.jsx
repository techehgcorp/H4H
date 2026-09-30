// src/app/_components/ThemeToggle.jsx
"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/themeScript";

// Reads the theme straight from <html data-theme="...">, which the head
// script in layout.js sets before paint. Every toggle on the page (desktop
// header + mobile menu) watches the same attribute, so they stay in sync.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getIsDark() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

// The server doesn't know the visitor's choice; React swaps in the real
// value right after hydration without a mismatch warning.
function getServerIsDark() {
  return false;
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-bs-theme", theme);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or storage blocked: the switch still works for this visit.
  }
}

/**
 * variant="icon" -> round sun/moon button (desktop header)
 * variant="menu" -> full-width row with a switch (mobile menu)
 */
export default function ThemeToggle({ label = "Dark mode", variant = "icon", className = "" }) {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  function toggle() {
    applyTheme(isDark ? "light" : "dark");
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        className={`theme-toggle theme-toggle--menu ${className}`.trim()}
        onClick={toggle}
      >
        <span className="theme-toggle__label">
          <i className="bi bi-moon-stars" aria-hidden="true" />
          {label}
        </span>
        <span className="theme-toggle__switch" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      className={`theme-toggle theme-toggle--icon ${className}`.trim()}
      onClick={toggle}
    >
      <i className="bi bi-moon-stars theme-toggle__moon" aria-hidden="true" />
      <i className="bi bi-sun theme-toggle__sun" aria-hidden="true" />
    </button>
  );
}
