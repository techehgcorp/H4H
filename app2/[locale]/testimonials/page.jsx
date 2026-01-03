import TranslationsProvider from '@/lib/TranslationProvider';
import initTranslations from '../i18n';
import TestimonialsPage from '../components/TestimonialsPage';

const i18nNamespaces = ['translation'];

async function community({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  console.log({ locale });

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <main>
        <TestimonialsPage />
      </main>
    </TranslationsProvider>
  );
}

export default community;