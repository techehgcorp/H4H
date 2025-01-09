import React from 'react';
import { FaCar, FaBalanceScale, FaAward, FaUsers } from 'react-icons/fa';

const achievementsData = [
  {
    icon: <FaCar className='text-blue-600 text-3xl mb-2' />,
    count: '15,000',
    label: 'Projects Succeed',
  },
  {
    icon: <FaBalanceScale className='text-blue-600 text-3xl mb-2' />,
    count: '78,000',
    label: 'People’s Likes',
  },
  {
    icon: <FaAward className='text-blue-600 text-3xl mb-2' />,
    count: '1,390',
    label: 'Awards Achieved',
  },
  {
    icon: <FaUsers className='text-blue-600 text-3xl mb-2' />,
    count: '8,000',
    label: 'Team Members',
  },
];

const Achievements = () => {
  return (
    <div
      className='relative bg-cover bg-center py-16'
      style={{
        backgroundImage:
          "url('https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/banner3.jpeg')",
        backgroundAttachment: 'fixed', // This creates the parallax effect
      }}
    >
      <div className='absolute inset-0 bg-black opacity-80'></div>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white'>
          {achievementsData.map((item, index) => (
            <div
              key={index}
              className='relative bg-opacity-60 z-50 h-40 p-6  border-t-0 shadow-lg border border-blue-500 before:content-[""] before:absolute before:top-0 before:left-0 before:h-[1px] before:w-[30%] before:bg-blue-500 after:content-[""] after:absolute after:top-0 after:right-0 after:h-[1px] after:w-[30%] after:bg-blue-500'
            >
              {/* Centered Logo */}
              <div className='absolute inset-x-0 top-0 -translate-y-1/2 transform mx-auto w-max'>
                <div className=' p-2 l border-blue-500'>{item.icon}</div>
              </div>
              <h3 className='text-4xl font-bold mt-5'>{item.count}</h3>
              <p className='text-lg font-semibold mt-8'>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
