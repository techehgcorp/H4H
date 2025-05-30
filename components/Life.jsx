// pages/life.js
'use client';
import React from 'react';
import Image from 'next/image';
import { IoIosCheckbox } from 'react-icons/io';
// import CTA from '../components/CTA';
import { motion } from 'framer-motion';
import Link from 'next/link';

// import Footer from '../components/Footer';
// import Header from '../components/Header';
import BreadcrumbComp from '@/app/components/BreadcrumbComp';
import Header from '@/app/[locale]/components/Header';
import CTA from '@/app/[locale]/components/CTA';
import Footer from '@/app/[locale]/components/Footer';
import { useTranslation } from 'react-i18next';

const Life = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="">
        <BreadcrumbComp
            img={'/images/product/lifeinsuranceHERO.jpg'}
          pos={'start'} 
          horizontalAlign="left" // horizontal: direita da imagem
          route={t('life_insurance.breadcrumb.title')}
        />

        <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
          <motion.div className='w-full md:w-1/2 p-4'>
            <img
              src='/images/product/lifeH1.jpg'
              alt={t('life_insurance.breadcrumb.title')}
              className='w-full h-auto rounded-md'
            />
          </motion.div>

          <motion.div className='w-full md:w-1/2 p-4'>
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
              {t('life_insurance.main_section.title')}
            </h2>
            <p className='text-lg'>
              {t('life_insurance.main_section.description')}
            </p>
            <ul className='list-none list-inside mb-6 text-lg'>
              {t('life_insurance.main_section.key_points', { returnObjects: true }).map((point, index) => (
                <li key={index} className='mb-1'>{point}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mt-14'>
          <motion.div className='w-full md:w-1/2 p-4'>
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua mt-4 font-semibold mb-4'>
              {t('life_insurance.types_section.title')}
            </h2>
            <ul className='list-none list-inside mb-6 text-lg'>
              {t('life_insurance.types_section.types', { returnObjects: true }).map((type, index) => (
                <li key={index} className='mb-1'>
                  <strong className='text-lg pr-1'>• {type.title}: </strong>
                  {type.description}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className='w-full md:w-1/2 p-4 flex justify-center'>
            <Image
              priority={true}
              width={600}
              height={500}
                src='/images/product/LifeH2.jpg'
              alt={t('life_insurance.breadcrumb.title')}
              className='rounded-md'
            />
          </motion.div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
          <motion.div className='w-full md:w-1/2 p-4 flex justify-start'>
            <Image
              priority={true}
              width={750}
              height={500}
              src='/images/product/lifeH3.jpg'
              alt={t('life_insurance.breadcrumb.title')}
              className='rounded-md'
            />
          </motion.div>
          
          <motion.div className='w-full md:w-1/2 p-4'>
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
              {t('life_insurance.quote_section.title')}
            </h2>
            <p className='text-lg'>
              {t('life_insurance.quote_section.description')}
            </p>
            <div className='flex justify-center items-center'>
              <Link href='/quote'>
                <button className='bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md mt-8'>
                  {t('life_insurance.quote_section.button_text')}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className='mt-5'>
          <CTA />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Life;
