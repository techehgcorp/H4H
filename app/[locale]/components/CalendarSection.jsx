import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { TimePicker, Button, message } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

const CalendarSection = ({
  showInterview,
  setShowInterview,
  setSelectedDate,
  selectedDate,
  setSelectedTime,
  selectedTime,
  goBack,
}) => {
    const { t } = useTranslation();

  const handleDateSelect = (date) => {
    setSelectedDate(moment(date));
    setSelectedTime(null);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      message.error(t('calendar.errors.selectDate'));
      return;
    }

    if (!selectedTime) {
      message.error(t('calendar.errors.selectTime'));
      return;
    }

    setShowInterview(true);
    message.success(t('calendar.success'));
  };

  return (
    <div className='flex w-full flex-col md:flex-row md:items-center md:justify-center p-8'>
      {/* Left Side */}
      <div className='flex flex-col items-start max-w-lg bg-white p-6 rounded-lg mb-8'>
        <Button onClick={goBack} className='mb-4'>
          {t('calendar.back')}
        </Button>
        <div className='flex justify-center items-center w-full'>
          <Image src='/images/H4HLogo.svg' width={100} height={50} alt='H4H Logo' />
        </div>
        <p className='text-black mt-4 font-bold text-2xl'>
          {t('calendar.title')}
        </p>
        <div className='flex items-center mt-2'>
          <FaPhone className='text-gray-600' />
          <span className='text-gray-600 ml-2'>{t('calendar.duration')}</span>
        </div>
        <p className='text-gray-600 mt-4'>
          {t('calendar.description')}
        </p>
        <a href='/' className='text-blue-600 mt-4'>
          {t('calendar.homeLink')}
        </a>
      </div>

      {/* Right Side */}
      <div className='bg-white p-6 rounded-lg'>
        <h1 className='text-xl mb-6'>{t('calendar.select')}</h1>
        <Calendar
          mode='single'
          selected={selectedDate ? selectedDate.toDate() : null}
          onSelect={handleDateSelect}
          disabled={(date) => date < new Date()}
          className='rounded-md border mt-2 mb-4 shadow'
        />
        <div className='mb-4'>
          <TimePicker
            className='w-full focus:ring-2 focus:ring-[#01B6AD]'
            format='h:mm a'
            minuteStep={15}
            onChange={(time) => setSelectedTime(time)}
            placeholder={t('calendar.timePlaceholder')}
            disabled={!selectedDate}
          />
        </div>
        <Button
          type='primary'
          className='bg-primary-darkAqua w-full mt-4'
          onClick={handleSubmit}
        >
          {t('calendar.submit')}
        </Button>
      </div>
    </div>
  );
};

export default CalendarSection;
