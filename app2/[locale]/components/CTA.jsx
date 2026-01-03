'use client';
import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { MdOutlineChat, MdOutlineMailOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  const rawPhones = t('contact.phone_number'); // string com \n
  const phoneNumbers = rawPhones.split('\n');  // quebra nos \n

  const services = [
    {
      id: 1,
      title: t('contact.call'),
      phoneList: phoneNumbers,
      icon: FaPhone,
    },
    {
      id: 2,
      title: t('contact.email'),
      description: t('contact.email_address'),
      icon: MdOutlineMailOutline,
      link: `mailto:${t('contact.email_address')}`,
    },
    {
      id: 3,
      title: t('contact.chat'),
      description: t('contact.chat_hours'),
      icon: MdOutlineChat,
    },
  ];

  return (
    <div className='mb-12'>
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

        <div className='max-w-6xl px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div key={service.id} className='bg-white p-6 shadow-lg'>
                <div className='flex justify-center items-center mb-4 py-2'>
                  <Icon className='h-12 w-12 text-[#B92031]' />
                </div>
                <h3 className='text-xl text-center font-bold text-gray-800'>
                  {service.title}
                </h3>

                {/* Description / Phone links */}
                <div className='text-center mt-2 text-black font-normal'>
                  {service.phoneList ? (
                    // Render multiple phone numbers
                    <div className='flex flex-col gap-1'>
                      {service.phoneList.map((num, i) => (
                        <a
                          key={i}
                          href={`tel:${num.replace(/\D/g, '')}`}
                          className='hover:underline'
                        >
                          {num}
                        </a>
                      ))}
                    </div>
                  ) : service.link ? (
                    // Render email with link
                    <a
                      href={service.link}
                      className='hover:underline text-black font-normal'
                    >
                      {service.description}
                    </a>
                  ) : (
                    // Render plain text for chat hours
                    <div className='text-black font-normal'>
                      {service.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CTA;
