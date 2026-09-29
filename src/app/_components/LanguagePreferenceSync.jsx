// src/app/components/LanguagePreferenceSync.jsx
"use client";

import { useEffect } from "react";

const STORAGE_KEY = "h4h-language";

export default function LanguagePreferenceSync({ locale }) {
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale;
    document.documentElement.dataset.language = locale;
  }, [locale]);

  return null;
}
