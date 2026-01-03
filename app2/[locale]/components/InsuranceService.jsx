'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

// const services = [
//   {
//     title: 'Health Insurance',
//     description:
//       'The Affordable Care Act offers resources to help reduce obstacles and provide healthcare access for those in need.',
//     imageUrl: '/images/health.jpeg',
//     url: '/health',
//     icon: '💉',
//   },
//   {
//     title: 'Life Insurance',
//     description: 'Let us help you navigate the key to financial security.',
//     imageUrl: '/images/life.jpeg',
//     url: '/life',
//     icon: '👨‍👩‍👧',
//   },
//   {
//     title: 'Dental & Vision ',
//     description:
//       'We provide affordable dental and vision policies for your overall health.',
//     imageUrl: '/images/dental.jpeg',
//     url: '/dental',
//     icon: '🦷',
//   },
//   {
//     title: 'Medicare ',
//     description:
//       'Finding the right medicare supplement can be challenging, we are here to help.',
//     imageUrl: '/images/medicare.jpeg',
//     url: '/medicare',
//     icon: '⚕️',
//   },
// ];

const InsuranceService = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const services = t('home.services', { returnObjects: true });
  return (
    <div className='bg-gray-100 py-16'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>
          {t('home.main_section.title')}
        </h2>
        <Button
          size='lg'
          className='bg-primary-darkAqua hover:bg-[#0A4958] mt-2 '
        >
          <Link href='/appointment'>   {t("misc.book")} </Link>
        </Button>
        <p className='text-gray-600 text-center mt-2 text-lg'>
          {t('home.main_section.description')}
        </p>
      </div>
      <div className='max-w-4xl mx-auto flex flex-wrap flex-col md:flex-row items-center justify-center gap-8'>
        {services && services.length > 0 && (
          <>
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => router.push(service.url)}
                className='relative group w-96 h-80 overflow-hidden rounded-lg shadow-lg cursor-pointer'
              >
                <div
                  className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                  style={{
                    backgroundImage: `url(${service.imageUrl})`,
                    backgroundSize: 'cover',
                  }}
                ></div>
                <div className='absolute inset-x-0 top-10 left-10 w-80 h-64 bg-white bg-opacity-90 p-6 flex flex-col justify-center items-center text-center transition-opacity duration-300 group-hover:opacity-0'>
                  <div className='text-blue-600 text-5xl mb-4'>
                    {service.icon}
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>
                    {service.title}
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default InsuranceService;
