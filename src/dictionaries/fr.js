// src/dictionaries/fr.js
// French. Anything not translated below falls back to the English text
// automatically, so a French page never shows a blank label while the rest
// of the site's French translation is being written.
//
// To translate more of the site: copy the matching section from en.js into
// `overrides` below (same keys), and change only the text.
import en from "./en";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep(base, overrides) {
  const result = { ...base };

  for (const [key, value] of Object.entries(overrides)) {
    result[key] =
      isPlainObject(value) && isPlainObject(base?.[key])
        ? mergeDeep(base[key], value)
        : value;
  }

  return result;
}

const overrides = {
  shell: {
    nav: {
      home: "Accueil",
      about: "À propos",
      coverageOptions: "Nos couvertures",
      resources: "Ressources",
      serviceDetails: "Nos services",
      testimonials: "Témoignages",
      referFriend: "Recommander un proche",
      faq: "FAQ",
      terms: "Conditions d'utilisation",
      privacy: "Confidentialité",
      contact: "Contact",
      appointment: "Rendez-vous",
    },
    ui: {
      darkMode: "Mode sombre",
      emailUs: "Écrivez-nous",
      callTollFree: "Appel gratuit",
      openMenu: "Ouvrir le menu de navigation",
      closeMenu: "Fermer le menu de navigation",
      language: "Langue",
    },
  },
};

const fr = mergeDeep(en, overrides);

export default fr;
