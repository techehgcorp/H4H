"use client"
import React from 'react';
import CountUp from 'react-countup';
import { FaUsers, FaDollarSign, FaSyncAlt, FaMapMarkedAlt } from 'react-icons/fa';

const stats = [
  { label: "Families Protected", value: 8200, icon: <FaUsers className="text-4xl text-blue-500" /> },
  { label: "Average Savings", value: 320, prefix: "$", icon: <FaDollarSign className="text-4xl text-green-500" /> },
  { label: "Policy Renewal Rate", value: 93, suffix: "%", icon: <FaSyncAlt className="text-4xl text-yellow-500" /> },
  { label: "States Covered", value: 36, icon: <FaMapMarkedAlt className="text-4xl text-purple-500" /> },
];

export default function StatsSection() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-blue-600">Our Commitment in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              {stat.icon}
              <div className="text-4xl font-extrabold text-blue-500 mt-4">
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  prefix={stat.prefix || ""} 
                  suffix={stat.suffix || ""} 
                />
                +
              </div>
              <p className="mt-2 text-gray-700 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
