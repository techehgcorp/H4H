'use client';

import React from 'react';
import CountUp from 'react-countup';
import { FaMoneyBillWave, FaUserAltSlash, FaHandHoldingUsd, FaClock } from 'react-icons/fa';

const stats = [
  {
    label: 'Avg Annual Healthcare Costs per person',
    value: 11526,
    prefix: '$',
    suffix: '+',
    icon: <FaMoneyBillWave className="text-4xl text-blue-500" />,
  },
  {
    label: 'Uninsured Florida Residents',
    value: 2500000,
    suffix: '+',
    icon: <FaUserAltSlash className="text-4xl text-red-500" />,
  },
  {
    label: 'Avg ACA Plan Subsidy per Month',
    value: 550,
    prefix: '$',
    icon: <FaHandHoldingUsd className="text-4xl text-green-500" />,
  },
  {
    label: 'Avg Time to Enroll in a Plan',
    value: 20,
    suffix: ' mins',
    icon: <FaClock className="text-4xl text-yellow-500" />,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-blue-600">Our Commitment in Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              {stat.icon}
              <div className="text-4xl font-extrabold text-blue-500 mt-4">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                  separator=","
                />
              </div>
              <p className="mt-2 text-gray-700 font-medium text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
