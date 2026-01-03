import TranslationsProvider from '@/lib/TranslationProvider';
import initTranslations from '@/app/[locale]/i18n';
import ReferAFriend from '@/app/[locale]/components/ReferAFriend';

const i18nNamespaces = ['translation'];

export default async function ReferAFriendPage({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <main>
        <ReferAFriend />
      </main>
    </TranslationsProvider>
  );
}
