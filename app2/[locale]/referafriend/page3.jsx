'use client';

import { useState } from 'react';

export default function ReferAFriend() {
  const [referrerName, setReferrerName] = useState('');
  const [referrerEmail, setReferrerEmail] = useState('');
  const [referredName, setReferredName] = useState('');
  const [referredEmail, setReferredEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submitReferral = async () => {
    if (!referrerName || !referrerEmail || !referredName || !referredEmail || !consent) {
      alert('Please fill out all fields and confirm consent.');
      return;
    }

    setLoading(true);
    setMessage('');

    const payload = {
      yourName: referrerName,
      yourEmail: referrerEmail,
      friendName: referredName,
      friendEmail: referredEmail,
    };

    try {
      const response = await fetch('/api/saveToReferalSheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage(`✅ Thank you! Your referral has been submitted. We’ll contact ${referredName} soon.`);
        setReferrerName('');
        setReferrerEmail('');
        setReferredName('');
        setReferredEmail('');
        setConsent(false);
      } else {
        setMessage('❌ Failed to submit referral. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ An unexpected error occurred.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-thirdy text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">H4H Insurance</h1>
          <nav>
            <a href="/" className="text-white hover:text-gray-200 mx-4">Home</a>
            <a href="/#services" className="text-white hover:text-gray-200 mx-4">Services</a>
            <a href="/#contact" className="text-white hover:text-gray-200 mx-4">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-thirdy mb-4">Refer a Loved One for Quality Coverage</h2>
          <p className="text-lg text-gray-700 mb-8">
            Invite friends and family to explore trusted health, life, or dental insurance with H4H Insurance...
          </p>
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold text-thirdy mb-6">Submit a Referral</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={referrerName}
                onChange={(e) => setReferrerName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                value={referrerEmail}
                onChange={(e) => setReferrerEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                value={referredName}
                onChange={(e) => setReferredName(e.target.value)}
                placeholder="Referred Person's Name"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                value={referredEmail}
                onChange={(e) => setReferredEmail(e.target.value)}
                placeholder="Referred Person's Email"
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
                <label className="text-sm text-gray-600">
                  I confirm the referred person has agreed to be contacted.
                </label>
              </div>
              <button
                onClick={submitReferral}
                disabled={loading}
                className="w-full bg-thirdy text-white p-3 rounded-md hover:bg-blue-900 transition"
              >
                {loading ? 'Submitting...' : 'Refer Now'}
              </button>
              {message && <p className="text-sm text-center mt-4">{message}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fourth py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">H4H Insurance | Your Trusted Insurance Partner</p>
          <p className="text-gray-700 mt-2">
            Contact us: (786) 397-7167 <br/>
                        (844) 544-0663   |{' '}
            <a href="mailto:info@h4hinsurance.com" className="underline text-primary">
              info@h4hinsurance.com
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-4">
            H4H Insurance collaborates with multiple carriers to offer ACA Marketplace, commercial health, life, and dental plans. For Marketplace questions, visit http://HealthCare.gov. Your information is used only for enrollment purposes with your consent, per federal guidelines.
          </p>
        </div>
      </footer>
    </div>
  );
}
