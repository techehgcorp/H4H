'use client';
import React, { useState } from 'react';
import { FaBuilding, FaPhone, FaHandshake, FaLaptop } from 'react-icons/fa';
import { Select, Button, message } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/components/ui/calendar';
import CalendarSection from './CalendarSection';
import InterviewForm from './InterviewForm';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: t('appointment.services.0.title'),
      description: t('appointment.services.0.description'),
      icon: FaPhone,
    },
    {
      id: 2,
      title: t('appointment.services.1.title'),
      description: t('appointment.services.1.description'),
      icon: FaHandshake,
    },
    {
      id: 3,
      title: t('appointment.services.2.title'),
      description: t('appointment.services.2.description'),
      icon: FaBuilding,
    },
    {
      id: 4,
      title: t('appointment.services.3.title'),
      description: t('appointment.services.3.description'),
      icon: FaLaptop,
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className='bg-gray-100 py-16'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>
          {t('appointment.title')}
        </h2>
        <p className='text-gray-600 mt-2 text-lg'>
          {t('appointment.subtitle')}
        </p>
      </div>
      {selectedService ? (
        <ScheduleForm
          service={selectedService}
          goBack={() => setSelectedService(null)}
        />
      ) : (
        <div className='container max-w-full flex flex-col md:flex-row gap-8'>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className='bg-white p-8 shadow-lg rounded-lg cursor-pointer'
                onClick={() => handleServiceClick(service)}
              >
                <div className='flex flex-col items-center w-full mb-4'>
                  <Icon className='h-14 w-14 text-blue-600' />
                </div>
                <h3 className='text-xl text-center font-bold text-gray-800'>
                  {service.title}
                </h3>
                <p className='text-gray-600 mt-2'>{service.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ScheduleForm = ({ service, goBack }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showInterview, setShowInterview] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (value) => {
    setSelectedTime(value);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      message.success(
        t('appointment.form.success_message', {
          date: moment(selectedDate).format('MMMM Do YYYY'),
          time: selectedTime
        })
      );
    } else {
      message.error(t('appointment.form.date_select'));
    }
  };

  return (
    <div className='bg-white p-8 shadow-lg rounded-lg'>
      {showInterview ? (
        <InterviewForm
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setShowInterview={setShowInterview}
        />
      ) : (
        <CalendarSection
          setShowInterview={setShowInterview}
          showInterview={showInterview}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          goBack={goBack}
        />
      )}
    </div>
  );
};

export default ServicesSection;