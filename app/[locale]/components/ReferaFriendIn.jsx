'use client'
import React from 'react';
import { FaBusinessTime, FaChartBar, FaTrophy, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Image from 'next/image';
import { IoIosCheckbox } from 'react-icons/io';
import CTA from '../components/CTA';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BreadcrumbComp from '@/app/components/BreadcrumbComp';
import { useTranslation } from 'react-i18next';

const ReferaFriend = () => {
  const { t } = useTranslation();
  return (
    <div className=''>
      <BreadcrumbComp
        img={t('referafriend.breadcrumb.image')}
        pos={'end'}
        route={t('referafriend.breadcrumb.title')}
      />

      <div className='flex flex-col mt-8 md:flex-row justify-between items-center'>
        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {t('referafriend.make_difference.title')}
          </h2>
          <p className='text-lg'>
            {t('referafriend.make_difference.description')}
          </p>
          <div className='flex justify-center items-center'>
            <Link href='/appointment'>
              <button className='bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md mt-8'>
                {t('referafriend.make_difference.button')}
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
            src={t('referafriend.make_difference.image')}
            alt='Refer a Friend'
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
            src={t('referafriend.stronger_haiti.image')}
            alt='Stronger Haiti'
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
            {t('referafriend.stronger_haiti.title')}
          </h2>
          <p className='text-lg'>
            {t('referafriend.stronger_haiti.description')}
          </p>
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
            {t('referafriend.breaking_barriers.title')}
          </h2>
          <p className='text-lg'>
            {t('referafriend.breaking_barriers.description')}
          </p>
        </motion.div>

        <motion.div
          className='w-full md:w-1/2 p-4'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={t('referafriend.breaking_barriers.image')}
            alt='Breaking Barriers'
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
            src={t('referafriend.unlocking_potential.image')}
            alt='Unlocking Potential'
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
            {t('referafriend.unlocking_potential.title')}
          </h2>
          <p className='text-lg'>
            {t('referafriend.unlocking_potential.description')}
          </p>
        </motion.div>
      </div>

      <div className='mt-5'>
        <CTA />
      </div>
    </div>
  );
};

export default ReferaFriend;
