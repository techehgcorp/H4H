'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;

    // Define o cookie do idioma para persistência
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // Garante que o prefixo do idioma seja tratado corretamente
    let newPath = currentPathname;
    if (i18nConfig.locales.includes(currentLocale)) {
      newPath = currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${currentPathname}`;
    }

    router.push(newPath);
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
