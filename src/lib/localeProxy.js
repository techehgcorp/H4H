// src/lib/localeProxy.js
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "./locales";

const localeCookie = "h4h-language";

function hasLocale(pathname) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const cookieLocale = request.cookies.get(localeCookie)?.value;
  const preferredLocale = locales.includes(cookieLocale)
    ? cookieLocale
    : defaultLocale;

  if (hasLocale(pathname)) {
    return NextResponse.next();
  }

  request.nextUrl.pathname =
    pathname === "/" ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|.*\\..*).*)"],
};
