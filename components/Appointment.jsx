'use client';
import React, { useState } from 'react';
import { DatePicker, TimePicker, Radio, Button, message, Input } from 'antd';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import 'antd/dist/reset.css'; // Ant Design Reset CSS
import Header from '@/app/[locale]/components/Header';
import Footer from '@/app/[locale]/components/Footer';
import ServicesSection from '@/app/[locale]/components/ServicesSection';

const ScheduleAppointment = () => {
  return (
    <>
      <Header />
      <div>
        <ServicesSection />
      </div>
      <Footer />
    </>
  );
};

export default ScheduleAppointment;
