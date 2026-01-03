import MultiStepForm from "@/components/MultiStepForm";
import React from "react";



import TranslationsProvider from '@/lib/TranslationProvider';
import initTranslations from '../i18n';
import LanguageChanger from '@/components/LanguageChanger';
import AboutUs from '@/components/AboutUs';
import Mission from '@/components/Mission';

const i18nNamespaces = ['translation'];

async function QuotePage({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  console.log({ locale });

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
    {/* <div className="flex items-center justify-center h-screen">
        <div className="w-full"> */}
        <main>

          <MultiStepForm />
        </main>
        {/* </div>
      </div> */}
        {/* <h1>{t('header')}</h1> */}
        {/* <ExampleClientComponent /> */}
        {/* <h1>{t('name')}</h1> */}

        {/* <MultiStepForm />
      </main> */}
    </TranslationsProvider>
  );
}

export default QuotePage;
