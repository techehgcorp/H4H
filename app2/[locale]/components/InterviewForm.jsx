import React, { useState } from 'react';
import { Radio, Button, Input, message, Form } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const InterviewForm = ({ selectedDate, selectedTime, setShowInterview }) => {
  const { t, i18n } = useTranslation();
  const [appointmentMethod, setAppointmentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: 'zoom',
    suggestions: '',
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !appointmentMethod) {
      message.error('Please add name, email, phone and appointment method.');
      return;
    }

    const username = `${formData.firstName} ${formData.lastName}`;

    const appointmentDetails = {
      date: selectedDate.format('YYYY-MM-DD'),
      time: selectedTime.format('HH:mm'),
      method: appointmentMethod,
      email: formData.email,
      phone: formData.phone,
      username,
      contactMethod: formData.contactMethod,
      suggestions: formData.suggestions,
      locale: i18n.language || 'en',
    };

    try {
      const response = await fetch('/api/submit-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentDetails),
      });
      if (!response.ok) {
        message.error('Failed to schedule appointment.');
        return;
      }

      const saveResponse = await fetch('/api/saveToAppointmentSheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentDetails),
      });
      if (!saveResponse.ok) {
        message.warning('Appointment created, but failed to save to spreadsheet.');
      }

      message.success('Appointment scheduled successfully! Please check your email.');
      router.push('/');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      message.error('An error occurred while scheduling the appointment.');
    }
  };

  return (
    <div className='flex w-full flex-col md:flex-row md:justify-center p-8 min-h-screen'>
      {/* Left */}
      <div className='flex flex-col items-start w-full md:w-1/3 h-[35rem] bg-white border-r-4 p-12 rounded-lg mb-8 shadow-lg'>
        <Button onClick={() => setShowInterview(false)} className='mb-4'>
          {t('calendar.back')}
        </Button>
        <div className='flex justify-center items-center w-full'>
          <Image src='/images/H4HLogo.svg' width={100} height={50} alt='H4H Logo' />
        </div>
        <p className='text-black mt-4 font-bold text-2xl'>{t('schedulestep2.title')}</p>
        <div className='text-gray-600 mt-4'>
          <p>{t('schedulestep2.date')}: {selectedDate ? selectedDate.format('MMMM Do, YYYY') : 'Not selected'}</p>
          <p>{t('schedulestep2.time')}: {selectedTime ? selectedTime.format('HH:mm') : 'Not selected'}</p>
          <p className='text-gray-600 mt-6'>{t('schedulestep2.description')}</p>
          <a href='/' className='text-blue-600 mt-10'>{t('schedulestep2.link_text')}</a>
        </div>
      </div>

      {/* Right */}
      <div className='flex flex-col w-full md:w-1/3 h-[35rem] bg-white p-6 rounded-lg shadow-lg'>
        <Form onFinish={handleSubmit}>
          <h1 className='text-xl mb-6'>{t('schedulestep2right.title')}</h1>

          <div className='mb-4'>
            <Input name='firstName' value={formData.firstName} onChange={handleInputChange}
              placeholder={t('schedulestep2right.firstname')}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]' />
          </div>

          <div className='mb-4'>
            <Input name='lastName' value={formData.lastName} onChange={handleInputChange}
              placeholder={t('schedulestep2right.lastname')}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]' />
          </div>

          <div className='mb-4'>
            <Form.Item name='email' rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}>
              <Input type='email' name='email' value={formData.email} onChange={handleInputChange}
                placeholder={t('schedulestep2right.email')}
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]' />
            </Form.Item>
          </div>

          {/* PHONE */}
          <div className='mb-4'>
            <Form.Item name='phone' rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^\+?[0-9\s\-().]{7,20}$/, message: 'Please enter a valid phone number!' },
            ]}>
              <Input type='tel' name='phone' value={formData.phone} onChange={handleInputChange}
                placeholder={t('schedulestep2right.phone')}
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]' />
            </Form.Item>
          </div>

          <div className='mb-4'>
            <p className='mb-2 text-gray-600'>{t('schedulestep2right.preferred_contact')}:</p>
            <Radio.Group onChange={(e) => setAppointmentMethod(e.target.value)} value={appointmentMethod}>
              <Radio value='face-to-face'>{t('schedulestep2right.face_to_face')}</Radio>
              <Radio value='phone'>{t('schedulestep2right.phone_appointment')}</Radio>
              <Radio value='virtual'>{t('schedulestep2right.virtual_meeting')}</Radio>
            </Radio.Group>
          </div>

          <div className='mb-4'>
            <Input.TextArea name='suggestions' value={formData.suggestions} onChange={handleInputChange}
              placeholder={t('schedulestep2right.suggestion')}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]' />
          </div>

          <div className='flex justify-end'>
            <Button type='primary' htmlType='submit' className='bg-primary-darkAqua'>
              {t('schedulestep2right.submit_button')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InterviewForm;
