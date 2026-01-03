'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';

const GrowBusiness = () => {
  const { t } = useTranslation();
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.getElementById('parallax-bg');
      const offset = window.scrollY;
      parallax.style.backgroundPositionY = `${offset * 0.7}px`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id='parallax-bg'
      className='relative h-72 flex flex-col justify-center items-center bg-cover bg-center '
      style={{
        backgroundImage: 'url(/images/help.jpeg)',
      }}
    >
      <div className='absolute inset-0 bg-black opacity-40'></div>
      {/* <div className=' z-50'>
        <button className='w-24 flex justify-center items-center h-24 rounded-full bg-blue-500 focus:outline-none'>
          <FaPlay className='h-10 w-10 text-white' />
        </button>
      </div> */}
      <div className='flex flex-col justify-center items-center text-center mt-8 text-white z-10'>
        <h1 className='text-4xl md:text-4xl font-bold'>
          {t('growBusiness.title')}
        </h1>
        <Button
          size='lg'
          className='bg-primary-darkAqua hover:bg-[#0A4958] mt-2 '
        >
          <Link href='/appointment'> {t('growBusiness.button')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default GrowBusiness;
