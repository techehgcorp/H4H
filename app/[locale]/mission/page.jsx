import TranslationsProvider from '@/lib/TranslationProvider';
import initTranslations from '../i18n';
import LanguageChanger from '@/components/LanguageChanger';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';

const i18nNamespaces = ['translation'];

async function mission({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  console.log({ locale });

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <main>
        {/* <h1>{t('header')}</h1> */}
        {/* <ExampleClientComponent /> */}
        {/* <h1>{t('name')}</h1> */}

        <Mission />
      </main>
    </TranslationsProvider>
  );
}

export default mission;
