"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_ID = "G-LS0G00BZFS";

// opcional: se quiser extrair o locale do pathname
function getLocaleFromPath(path) {
  const LOCALES = ["pt", "en", "fr", "es"]; // ajuste conforme seus idiomas
  const seg = path.split("/").filter(Boolean)[0];
  return LOCALES.includes(seg) ? seg : null;
}

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") return;

    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    const locale = getLocaleFromPath(pathname);

    window.gtag("config", GA_ID, {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      ...(locale ? { language: locale } : {}),
    });
  }, [pathname, searchParams]);

  return null;
}
