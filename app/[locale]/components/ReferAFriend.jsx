'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ReferAFriend() {
  const { t } = useTranslation();

  const [referrerName, setReferrerName] = useState('');
  const [referrerEmail, setReferrerEmail] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');     // NEW
  const [referredName, setReferredName] = useState('');
  const [referredEmail, setReferredEmail] = useState('');
  const [referredPhone, setReferredPhone] = useState('');     // NEW
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submitReferral = async () => {
    if (
      !referrerName || !referrerEmail || !referrerPhone ||
      !referredName || !referredEmail || !referredPhone ||
      !consent
    ) {
      alert(t('referpage.form.fillAllFields'));
      return;
    }

    setLoading(true);
    setMessage('');

    const payload = {
      yourName: referrerName,
      yourEmail: referrerEmail,
      yourPhone: referrerPhone,        // NEW
      friendName: referredName,
      friendEmail: referredEmail,
      friendPhone: referredPhone,      // NEW
    };

    try {
      const response = await fetch('/api/saveToReferalSheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage(t('referpage.form.successMessage', { name: referredName }));
        setReferrerName('');
        setReferrerEmail('');
        setReferrerPhone('');          // clear
        setReferredName('');
        setReferredEmail('');
        setReferredPhone('');          // clear
        setConsent(false);
      } else {
        setMessage(t('referpage.form.errorMessage'));
      }
    } catch (error) {
      console.error(error);
      setMessage(t('referpage.form.unexpectedError'));
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-primary-darkAqua  text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href='/'><h1 className="text-2xl font-bold">H4H Insurance</h1></Link>
          <nav>
            <a href="/" className="text-white hover:text-gray-200 mx-4">{t('referpage.nav.home')}</a>
            <a href="/#services" className="text-white hover:text-gray-200 mx-4">{t('referpage.nav.services')}</a>
            <a href="/#contact" className="text-white hover:text-gray-200 mx-4">{t('referpage.nav.contact')}</a>
          </nav>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-darkAqua  mb-4">{t('referpage.refer.title')}</h2>

          <div className="mb-6 max-w-3xl mx-auto">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/QyjxGdw_LjM"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-8">{t('referpage.refer.description')}</p>

          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold text-primary-darkAqua  mb-6">{t('referpage.form.title')}</h3>

            <div className="space-y-4">
              {/* Your Name */}
              <input
                type="text"
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                placeholder={t('referpage.form.namePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {/* Your Email */}
              <input
                type="email"
                value={referrerEmail}
                onChange={(e) => setReferrerEmail(e.target.value)}
                placeholder={t('referpage.form.emailPlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {/* Your Phone */}
              <input
                type="tel"
                value={referrerPhone}
                onChange={(e) => setReferrerPhone(e.target.value)}
                placeholder={t('referpage.form.phonePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />

              {/* Referred Name */}
              <input
                type="text"
                value={referredName}
                onChange={(e) => setReferredName(e.target.value)}
                placeholder={t('referpage.form.referredNamePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {/* Referred Email */}
              <input
                type="email"
                value={referredEmail}
                onChange={(e) => setReferredEmail(e.target.value)}
                placeholder={t('referpage.form.referredEmailPlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {/* Referred Phone */}
              <input
                type="tel"
                value={referredPhone}
                onChange={(e) => setReferredPhone(e.target.value)}
                placeholder={t('referpage.form.referredPhonePlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mr-2"
                  required
                />
                <label className="text-sm text-gray-600">{t('referpage.form.consent')}</label>
              </div>

              <button
                onClick={submitReferral}
                disabled={loading}
                className="w-full bg-primary-darkAqua  text-white p-3 rounded-md hover:bg-blue-900 transition"
              >
                {loading ? t('referpage.form.loading') : t('referpage.form.button')}
              </button>

              {message && <p className="text-sm text-center mt-4">{message}</p>}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-fourth py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">{t('referpage.footer.tagline')}</p>
          <p className="text-gray-700 mt-2">
            {t('referpage.footer.phone')} <br />
            {t('referpage.footer.altPhone')} |{' '}
            <a href="mailto:info@h4hinsurance.com" className="underline text-primary">
              info@h4hinsurance.com
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-4">
            {t('referpage.footer.disclaimer')}
          </p>
        </div>
      </footer>
    </div>
  );
}
