'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
// import i18nConfig from '@/i18nConfig';
import { ChangeEvent } from 'react';
import i18nConfig from '@/i18nConfig';

export default function r() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;

    console.log('here');

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    // if (
    //   currentLocale === i18nConfig.defaultLocale &&
    //   !i18nConfig.prefixDefault &&
    // ) {
    //   console.log({ newLocale123: newLocale });
    //   router.push('/' + newLocale + currentPathname);
    // } else {
    console.log({ newLocaleqweqweqwe: newLocale });
    router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    // }

    console.log({ currentLocale });

    router.refresh();
  };

  return (
    <div className='flex items-center justify-center mt-1'>
      <select onChange={handleChange} value={currentLocale}>
        <option value='en'>English</option>
        <option value='ht'>Creole</option>
        <option value='es'>Spanish</option>
      </select>
    </div>
  );
}
