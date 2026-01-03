'use client'
import React from 'react';
import { FaBusinessTime, FaChartBar, FaTrophy, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from './Header';
import Image from 'next/image';
import { IoIosCheckbox } from 'react-icons/io';
import CTA from '../components/CTA';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BreadcrumbComp from '@/app/components/BreadcrumbComporiginal';
import Accordion from '@/app/components/Accordion';  // <-- import Accordion
import { useTranslation } from 'react-i18next';

const data = [
  {
    icon: <FaBusinessTime className='text-blue-600 w-8 h-8' />,
    title: 'Business Service',
    description: 'Quickly productive just in time strategic theme.',
  },
  {
    icon: <FaChartBar className='text-blue-600 w-8 h-8' />,
    title: 'Marketing Plan',
    description: 'Quickly productive just in time strategic theme.',
  },
  {
    icon: <FaUsers className='text-blue-600 w-8 h-8' />,
    title: 'Team Management',
    description: 'Quickly productive just in time strategic theme.',
  },
  {
    icon: <FaTrophy className='text-blue-600 w-8 h-8' />,
    title: 'Award Won',
    description: 'Quickly productive just in time strategic theme.',
  },
];

const InsurancePolicy = () => {
  const { t } = useTranslation();

  // Monta os itens do accordion com tradução
  const accordionItems = [
    {
      title: t('accordion.title1'),
      description: t('accordion.description1'),
    },
    {
      title: t('accordion.title2'),
      description: t('accordion.description2'),
    },
    {
      title: t('accordion.title3'),
      description: t('accordion.description3'),
    },
  ];

  return (
    <div className=''>
      <BreadcrumbComp
        img={t('mission.breadcrumb.image')}
        pos={'end'}
        horizontalAlign="center" // horizontal: direita da imagem
        route={t('mission.breadcrumb.title')}
      />

      <div className='flex flex-col mt-8 md:flex-row justify-between items-center'>
        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {t('mission.make_difference.title')}
          </h2>
          <p className='text-lg'>
            {t('mission.make_difference.description')}
          </p>
          <div className='flex justify-center items-center'>
            <Link href='/appointment'>
              <button className='bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md mt-8'>
                {t('mission.make_difference.button')}
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={t('mission.make_difference.image')}
            alt='Health Plans'
            className='w-full h-auto rounded-md'
          />
        </motion.div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={t('mission.stronger_haiti.image')}
            alt='Health Plans'
            className='w-full h-auto rounded-md'
          />
        </motion.div>

        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {/* {t('mission.stronger_haiti.title')} */}
          </h2>
          <p className='text-lg mb-8'>
            {/* {t('mission.stronger_haiti.description')} */}
          </p>

          {/* Aqui entra o Accordion */}
          <Accordion items={accordionItems} />
        </motion.div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {t('mission.breaking_barriers.title')}
          </h2>
          <p className='text-lg'>
            {t('mission.breaking_barriers.description')}
          </p>
        </motion.div>

        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={t('mission.breaking_barriers.image')}
            alt='Health Plans'
            className='w-full h-auto rounded-md'
          />
        </motion.div>
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={t('mission.unlocking_potential.image')}
            alt='Health Plans'
            className='w-full h-auto rounded-md'
          />
        </motion.div>

        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {t('mission.unlocking_potential.title')}
          </h2>
          <p className='text-lg'>
            {t('mission.unlocking_potential.description')}
          </p>
        </motion.div>
      </div>

      <div className='mt-5'>
        <CTA />
      </div>
    </div>
  );
};

export default InsurancePolicy;
