import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker, TimePicker, Radio, Button, Input, message } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';

const InterviewForm = ({
  selectedDate,
  selectedTime,
  goBackToCalendar,
  setShowInterview,
}) => {
  const [appointmentMethod, setAppointmentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactMethod: 'zoom',
    suggestions: '',
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !appointmentMethod
    ) {
      message.error('Please add an email, name and appointment method.');
      return;
    }

    const appointmentDetails = {
      date: selectedDate.format('YYYY-MM-DD'),
      time: selectedTime.format('HH:mm'),
      method: appointmentMethod,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactMethod: formData.contactMethod,
      suggestions: formData.suggestions,
    };

    try {
      const response = await fetch('/api/submit-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentDetails),
      });

      if (response.ok) {
        message.success(
          'Appointment scheduled successfully! Please check your email.'
        );
        router.push('/'); // Optional: Redirect to a thank you page
      } else {
        message.error('Failed to schedule appointment.');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      message.error('An error occurred while scheduling the appointment.');
    }
  };

  const back = () => {
    setShowInterview(false);
  };

  return (
    <div className='flex w-full flex-col md:flex-row  md:justify-center p-8 min-h-screen'>
      {/* Left Side */}
      <div className='flex flex-col items-start w-full md:w-1/3 h-[35rem] bg-white border-r-4 p-12 rounded-lg mb-8 shadow-lg'>
        <Button onClick={back} className='mb-4'>
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
        <p className='text-black mt-4 font-bold text-2xl'>Personal Details</p>
        <div className='text-gray-600 mt-4'>
          <p>
            Date:{' '}
            {selectedDate
              ? selectedDate.format('MMMM Do, YYYY')
              : 'Not selected'}
          </p>
          <p>
            Time: {selectedTime ? selectedTime.format('HH:mm') : 'Not selected'}
          </p>
          <p className='text-gray-600 mt-6'>
            Please provide your details and preferred contact method for the
            interview. This information will help us ensure a smooth and
            efficient interview process.
          </p>
          <a href='/' className='text-blue-600 mt-10'>
            You can review more details about working at H4H by visiting our
            Home Page Here
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex flex-col w-full md:w-1/3 h-[35rem] bg-white p-6 rounded-lg shadow-lg'>
        <Form onFinish={handleSubmit}>
          <h1 className='text-xl mb-6'>Interview Details</h1>
          <div className='mb-4'>
            <Input
              placeholder='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]'
            />
          </div>
          <div className='mb-4'>
            <Input
              placeholder='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]'
            />
          </div>
          <div className='mb-4'>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]'
              />
            </Form.Item>
          </div>
          <div className='mb-4'>
            <p className='mb-2 text-gray-600'>Preferred Contact Method:</p>
            <Radio.Group
              onChange={(e) => setAppointmentMethod(e.target.value)}
              value={appointmentMethod}
            >
              <Radio value='face-to-face'>Face to Face Office Meeting</Radio>
              <Radio value='phone'>Appointment by Phone</Radio>
              <Radio value='virtual'>Virtual Meeting via Google Meet</Radio>
            </Radio.Group>
          </div>
          <div className='mb-4'>
            <Input.TextArea
              placeholder='Any suggestions?'
              name='suggestions'
              value={formData.suggestions}
              onChange={handleInputChange}
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#01B6AD]'
            />
          </div>
          <div className='flex justify-end'>
            <Button
              type='primary'
              onClick={handleSubmit}
              className='bg-primary-darkAqua'
            >
              Schedule
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InterviewForm;
