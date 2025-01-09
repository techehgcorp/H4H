'use client';
import React from 'react';

const ContactFormWithMap = () => {
  // Array of form fields
  const formFields = [
    { label: 'Your name', type: 'text', placeholder: 'Your name' },
    { label: 'Your email', type: 'email', placeholder: 'Your email' },
    { label: 'Subject', type: 'text', placeholder: 'Subject' },
    {
      label: 'Your message (optional)',
      type: 'textarea',
      placeholder: 'Your message',
    },
  ];

  return (
    <div className='max-w-6xl mx-auto p-6 flex flex-col lg:flex-row shadow-md bg-white rounded-lg'>
      {/* Contact Form */}
      <div className='lg:w-1/2 p-4'>
        <form className='space-y-4'>
          {formFields.map((field, index) => (
            <div key={index}>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder}
                  className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  rows='6'
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              )}
            </div>
          ))}
          <button
            type='submit'
            className='mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors'
          >
            SUBMIT
          </button>
        </form>
      </div>

      {/* Map */}
      <div className='lg:w-1/2 p-4 lg:ml-6'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5428347855853!2d85.34176967446052!3d27.684488029976038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190b9c9b7a4b%3A0xe5c8f8b8c43a4b35!2sKoteshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1692090987598!5m2!1sen!2snp'
          width='100%'
          height='400'
          allowFullScreen=''
          loading='lazy'
          className='rounded-lg border border-gray-300'
        ></iframe>
      </div>
    </div>
  );
};

export default ContactFormWithMap;
