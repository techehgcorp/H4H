import en from "@/dictionaries/en";
import es from "@/dictionaries/es";
import ht from "@/dictionaries/ht";

export const locales = ["en", "es", "ht"];
export const defaultLocale = "en";

const dictionaries = {
  en,
  es,
  ht,
};

export function hasLocale(locale) {
  return locales.includes(locale);
}

export function getDictionary(locale = defaultLocale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function getShellDictionary(locale = defaultLocale) {
  return getDictionary(locale).shell;
}

export function getFaqDictionary(locale = defaultLocale) {
  return getDictionary(locale).faq;
}

export function getHomeDictionary(locale = defaultLocale) {
  return getDictionary(locale).home;
}

export function getSelfEnrollmentDictionary(locale = defaultLocale) {
  return getDictionary(locale).selfEnrollment;
}

export function getAboutDictionary(locale = defaultLocale) {
  return getDictionary(locale).about;
}

export function getServicesDictionary(locale = defaultLocale) {
  return getDictionary(locale).services;
}

export function getContactDictionary(locale = defaultLocale) {
  return getDictionary(locale).contact;
}

export function getAppointmentDictionary(locale = defaultLocale) {
  return getDictionary(locale).appointment;
}

export function getReferFriendDictionary(locale = defaultLocale) {
  return getDictionary(locale).referFriend;
}

export function getDepartmentsDictionary(locale = defaultLocale) {
  return getDictionary(locale).departments;
}

export function getDepartmentDetailsDictionary(locale = defaultLocale) {
  return getDictionary(locale).departmentDetails;
}

export function getServiceDetailsDictionary(locale = defaultLocale, slug) {
  const serviceDetails = getDictionary(locale).serviceDetails;

  if (!serviceDetails?.items) {
    return serviceDetails;
  }

  return serviceDetails.items[slug] || serviceDetails.items[serviceDetails.defaultSlug];
}

export function getServiceDetailSlugs(locale = defaultLocale) {
  const serviceDetails = getDictionary(locale).serviceDetails;
  return serviceDetails?.items ? Object.keys(serviceDetails.items) : [];
}

export function getTestimonialsDictionary(locale = defaultLocale) {
  return getDictionary(locale).testimonials;
}

export function getError404Dictionary(locale = defaultLocale) {
  return getDictionary(locale).error404;
}

export function getDoctorsDictionary(locale = defaultLocale) {
  return getDictionary(locale).doctors;
}

export function getGalleryDictionary(locale = defaultLocale) {
  return getDictionary(locale).gallery;
}

export function getTermsDictionary(locale = defaultLocale) {
  return getDictionary(locale).terms;
}

export function getPrivacyDictionary(locale = defaultLocale) {
  return getDictionary(locale).privacy;
}

export function getTcpaDictionary(locale = defaultLocale) {
  return getDictionary(locale).tcpa;
}

export function getStarterPageDictionary(locale = defaultLocale) {
  return getDictionary(locale).starterPage;
}

export function removeLocaleFromPathname(pathname = "/") {
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }

  return pathname || "/";
}

export function localizePath(pathname = "/", locale = defaultLocale) {
  const normalizedPath = removeLocaleFromPathname(pathname);
  const trimmedPath =
    normalizedPath !== "/" && normalizedPath.endsWith("/")
      ? normalizedPath.slice(0, -1)
      : normalizedPath;

  return trimmedPath === "/" ? `/${locale}` : `/${locale}${trimmedPath}`;
}
