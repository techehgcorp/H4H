'use client';
import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineChat, MdOutlineMailOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      title: t('contact.call'),
      description: t('contact.phone_number'),
      icon: FaPhone,
      link: `tel:${t('contact.phone_number')}`
    },
    {
      id: 2,
      title: t('contact.email'),
      description: t('contact.email_address'),
      icon: MdOutlineMailOutline,
      link: `mailto:${t('contact.email_address')}`
    },
    {
      id: 3,
      title: t('contact.chat'),
      description: t('contact.chat_hours'),
      icon: MdOutlineChat
    }
  ];

  return (
    <div className='mb-12'>
      {/* Contact Cards */}
      <div
        className='bg-map py-16'
        style={{
          backgroundImage:
            "url('https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/themes/insurance-lite/assets/map-bg.png')",
          backgroundSize: 'cover',
        }}
      >
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-500'>
            {t('navigation.menu_items.contact_us')}!
          </h2>
        </div>

        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          {services.map((service) => {
            const Icon = service.icon;

            const content = (
              <div className='bg-white p-8 shadow-lg h-full'>
                <div className='flex justify-center items-center mb-4 py-2'>
                  <Icon className='h-14 w-14 text-[#B92031]' />
                </div>
                <h3 className='text-xl text-center font-bold text-gray-800'>
                  {service.title}
                </h3>
                <p className='text-gray-600 text-center mt-2'>
                  {service.description.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            );

            return service.link ? (
              <a
                key={service.id}
                href={service.link}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:shadow-xl transition-shadow duration-300'
              >
                {content}
              </a>
            ) : (
              <div key={service.id}>{content}</div>
            );
          })}
        </div>
      </div>

      {/* Google Map */}
      <div
        className='bg-map'
        style={{
          backgroundImage:
            "url('https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/themes/insurance-lite/assets/map-bg.png')",
          backgroundSize: 'cover',
        }}
      >
        <div className='max-w-6xl mx-auto shadow-lg rounded-lg'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6965285964066!2d-80.16006712390586!3d26.206548477075174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d903bbc80c6051%3A0xd716d64cc168483e!2s1000%20NW%2065th%20St%2C%20Fort%20Lauderdale%2C%20FL%2033309%2C%20USA!5e0!3m2!1sen!2s!4v1728073940467!5m2!1sen!2s'
            width='100%'
            height='100%'
            className='rounded-lg border border-gray-300 min-h-96'
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
