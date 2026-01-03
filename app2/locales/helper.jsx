import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

export async function loadTranslation(locale = 'en') {
  if (!i18next.isInitialized) {
    await i18next.use(Backend).init({
      lng: locale,
      fallbackLng: 'en',
      backend: {
        loadPath: path.resolve('./public/locales/{{lng}}.json')
      }
    });
  } else {
    await i18next.changeLanguage(locale);
  }
  return i18next;
}
