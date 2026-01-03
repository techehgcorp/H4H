// components/Careers.js
import Footer from '@/app/[locale]/components/Footer';
import Header from '@/app/[locale]/components/Header';
import CareersContentClient from '@/components/careers/CareersContentClient';

export default function Careers() {
  return (
    <>
      <Header />
      <CareersContentClient />
      <Footer />
    </>
  );
}
