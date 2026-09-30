// src/app/_components/LanguageSelector.jsx
"use client";

import { startTransition, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localizePath } from "@/lib/i18n";

// Each language is shown in its own language, so every visitor recognizes theirs.
const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "ht", label: "Kreyòl" },
  { value: "fr", label: "Français" },
];

const STORAGE_KEY = "h4h-language";

export default function LanguageSelector({ locale = "en", label = "Language" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguage] = useState(locale);

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;

    setLanguage(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.cookie = `${STORAGE_KEY}=${nextLanguage}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLanguage;
    document.documentElement.dataset.language = nextLanguage;

    startTransition(() => {
      router.replace(localizePath(pathname || "/", nextLanguage));
    });
  };

  return (
    <div className="language-selector">
      <label className="language-selector__label" htmlFor="site-language">
        {label}
      </label>
      <div className="language-selector__control">
        <i className="bi bi-globe2" aria-hidden="true" />
        <select
          id="site-language"
          name="site-language"
          value={language}
          onChange={handleLanguageChange}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} lang={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}