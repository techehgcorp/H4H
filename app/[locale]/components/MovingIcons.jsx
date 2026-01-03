'use client';
import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const MovingIcons = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentYear = new Date().getFullYear();
  const targetTime = new Date(2026, 0, 15);
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: targetTime,
  });

  if (!isClient) {
    // Evita renderizar números no SSR
    return null;
  }

  return (
    <div className='relative flex justify-center items-center bg-primary-darkAqua rounded-lg w-[100%] mx-auto my-10 overflow-hidden'>
      <div className='flex flex-col w-[100%] justify-between items-center'>
        <div className='flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 w-full mt-[20px]'>
          <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold text-center'>
            {t('home.enrollment_section.title')}
            Open Enrollment Begins November 1st...
          </p>
          <div className='flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10'>
            <TimerValue value={days} label={t('home.enrollment_section.time_labels.days')} />
            <TimerValue value={hours} label={t('home.enrollment_section.time_labels.hours')} />
            <TimerValue value={minutes} label={t('home.enrollment_section.time_labels.minutes')} />
            <TimerValue value={seconds} label={t('home.enrollment_section.time_labels.seconds')} />
          </div>
        </div>
        <div
          className='flex flex-col justify-end h-full items-center w-[100%] my-5'
        >
          <p className='text-base italic text-white'>
            {t('home.partner_section.text')}
          </p>
          <Image
            src='/images/floridaBlue.png'
            width={300}
            height={400}
            alt='Company Logo'
          />
        </div>
      </div>
    </div>
  );
};

const TimerValue = ({ value, label }) => (
  <div className='flex flex-col text-white font-semibold items-center'>
    <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>{value}</p>
    <p className='text-xs sm:text-sm md:text-base'>{label}</p>
  </div>
);

export default MovingIcons;
