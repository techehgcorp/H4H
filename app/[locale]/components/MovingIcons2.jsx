'use client';
import React from 'react';
import { useTimer } from 'react-timer-hook';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Use Next.js Image component
import { useTranslation } from 'react-i18next';

const MovingIcons = () => {
  const { t } = useTranslation();
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Set the target date to November 1st of the current year
  // const targetTime = new Date(currentYear, 10, 1);
  // Month is 0-indexed, so 10 is November
  const targetTime = new Date(2026, 1, 15);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: targetTime,
  });

  const slideAnimation = {
    x: ['100%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15,
        ease: 'linear',
      },
    },
  };

  return (
    <div className='relative flex justify-center items-center bg-primary-darkAqua rounded-lg w-[100%] mx-auto my-10 overflow-hidden'>
      <div className='flex flex-col w-[100%] justify-between items-center'>
        {/* Counter Section */}
        <div className='flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 w-full mt-[20px]'>
          <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold text-center'>
            {t('home.enrollment_section.title')}
             Open Enrollment Begins November 1st.
          </p>
          <div className='flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10'>
            <div className='flex flex-col text-white font-semibold items-center'>
              <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                {days}
              </p>
              <p className='text-xs sm:text-sm md:text-base'>
                {t('home.enrollment_section.time_labels.days')}
              </p>
            </div>
            <div className='flex flex-col text-white font-semibold items-center'>
              <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                {hours}
              </p>
              <p className='text-xs sm:text-sm md:text-base'>
                {t('home.enrollment_section.time_labels.hours')}
              </p>
            </div>
            <div className='flex flex-col text-white font-semibold items-center'>
              <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                {minutes}
              </p>
              <p className='text-xs sm:text-sm md:text-base'>
                {t('home.enrollment_section.time_labels.minutes')}
              </p>
            </div>
            <div className='flex flex-col text-white font-semibold items-center'>
              <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                {seconds}
              </p>
              <p className='text-xs sm:text-sm md:text-base'>
                {t('home.enrollment_section.time_labels.seconds')}
              </p>
            </div>
          </div>
        </div>
        {/* Logo Section */}
        <div
          className='flex flex-col justify-end h-full items-center w-[100%] my-5'
          animate={slideAnimation}
        >
          <p className='text-base italic text-white'>
            {t('home.partner_section.text')}
          </p>
          <Image
            src='/images/floridaBlue.png'
            width='300'
            height='400'
            alt='Company Logo'
            // className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40'
          />
        </div>
      </div>
    </div>
  );
};

export default MovingIcons;
