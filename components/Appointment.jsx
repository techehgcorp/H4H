'use client';
import React from 'react';
import 'antd/dist/reset.css'; // Ant Design Reset CSS
import Header from '@/app/[locale]/components/Header';
import Footer from '@/app/[locale]/components/Footer';
import ServicesSection from '@/app/[locale]/components/ServicesSection';

const ScheduleAppointment = () => {
  return (
    <>
      <Header />
      <ServicesSection />
      <Footer />
    </>
  );
};

export default ScheduleAppointment;
