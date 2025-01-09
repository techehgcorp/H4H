import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker, TimePicker, Radio, Button, message, Input } from 'antd';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const CalendarSection = ({
  showInterview,
  setShowInterview,
  setSelectedDate,
  selectedDate,
  setSelectedTime,
  selectedTime,
  goBack,
}) => {
  //   const [selectedDate, setSelectedDate] = useState(null);
  //   const [selectedTime, setSelectedTime] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(moment(date));
    setSelectedTime(null); // Reset time when date changes
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      message.error('Please select a date.');
      return;
    }

    if (!selectedTime) {
      message.error('Please select a time.');
      return;
    }

    setShowInterview(true);
    message.success('Date&Time Added successfully!');
  };

  return (
    <div className='flex w-full flex-col md:flex-row md:items-center md:justify-center p-8'>
      {/* Left Side */}
      <div className='flex flex-col items-start max-w-lg bg-white p-6 rounded-lg mb-8'>
        <Button onClick={goBack} className='mb-4'>
          Back
        </Button>
        <div className='flex justify-center items-center w-full'>
          <Image
            src='/images/H4HLogo.svg'
            width={100}
            height={50}
            alt='H4H Logo'
          />
        </div>
        <p className='text-black mt-4 font-bold text-2xl'>Interview Schedule</p>
        <div className='flex items-center mt-2'>
          <FaPhone className='text-gray-600' />
          <span className='text-gray-600 ml-2'>30 min</span>
        </div>
        <p className='text-gray-600 mt-4'>
          Please select a time slot for your initial interview with our
          recruiting team. This meeting can be conducted via phone, video call,
          or in person, based on your preference.
        </p>
        <a href='/' className='text-blue-600 mt-4'>
          You can review more details about working at H4H by visiting our Home
          Page Here
        </a>
      </div>

      {/* Right Side */}
      <div className='bg-white p-6 rounded-lg'>
        <h1 className='text-xl mb-6'>Select a Date & Time</h1>
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
            format='h:mm a' // 12-hour format with AM/PM
            // use12Hours={true}
            minuteStep={15}
            onChange={(time) => setSelectedTime(time)}
            placeholder='Select Time'
            disabled={!selectedDate} // Disable time picker until a date is selected
          />
        </div>
        <Button
          type='primary'
          className='bg-primary-darkAqua w-full mt-4'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CalendarSection;
