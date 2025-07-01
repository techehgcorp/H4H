import TranslationsProvider from '@/lib/TranslationProvider';
import initTranslations from '../i18n';
import ScheduleAppointment from '@/components/Appointment';

const i18nNamespaces = ['translation'];

async function appointment({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  console.log({ locale });

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <main>
        <ScheduleAppointment />
      </main>
    </TranslationsProvider>
  );
}

export default appointment;
