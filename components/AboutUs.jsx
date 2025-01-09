'use client';
import React from 'react';
// import Footer from '../components/Footer';
// import Header from '../components/Header';
import Image from 'next/image';
import { IoIosCheckbox } from 'react-icons/io';
// import CTA from '../components/CTA';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BreadcrumbComp from '@/app/components/BreadcrumbComp';
import { Breadcrumb } from 'antd';
import Footer from '@/app/[locale]/components/Footer';
import Header from '@/app/[locale]/components/Header';
import CTA from '@/app/[locale]/components/CTA';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  const sections = t('about_us.sections', { returnObjects: true });
  return (
    <>
      <Header />
      <div className="">
        <BreadcrumbComp
          videoSrc={
            "/images/product/4k-3d-haiti-fla.mp4"
          }
          video={true}
          pos={"center"}
          route={t("About Us")}
        />
        {/* <div className='text-center text-6xl mb-10 font-bold'>
          Health Insurance
        </div> */}

        {/* <div className=''>
          <h1 className='text-2xl font-bold mb-4 mt-8 '>
            Explore the Best Health
          </h1>
        </div> */}

        {/* <div className='relative w-full mt-10 p-10 rounded-md'>
          <img
            src='/images/about/about5.jpg'
            alt='Health Image'
            className='w-full h-full md:h-[40rem] rounded-md object-cover'
          />
        </div> */}
        {/* <BreadcrumbComp
        img={'/images/about/about5.jpg'} 
        pos={'start'} 
        route={'About Us'}
      /> */}
      <div className="relative w-full mt-10 p-10 rounded-md">
          {/* <Image
            priority={true}
            width={1000}
            height={1000}
            src={'/images/product/aboutusheroimage.jpg'}
            alt="img"
            className="w-full h-full md:h-[34rem] rounded-md object-cover"
          />
        
        <div className={`flex absolute inset-0 flex-colp-4 sm:p-10`}>
          <div className="text-center ml-7 md:mr-[10rem]">
            <h1 className="text-sm text-primary-darkAqua md:text-4xl lg:text-6xl font-bold mb-4">
            {t('about_us.title')}
            </h1>
            <Breadcrumb
              className="text-xs md:text-xl text-white font-semibold py-2 px-4"
              items={[
                {
                  title: <Link href="/">{t("navigation.menu_items.home")}</Link>,
                },
                {
                  title: <h1>{t("navigation.menu_items.about_us")}</h1>,
                },
              ]}
            />
          </div>
        </div> */}
      </div>
        {/* <div className="relative w-full mt-10 p-10 rounded-md h-screen bg-gray-200 flex items-center justify-center">
          <img
            src="/images/about/about5.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full md:h-[40rem] rounded-md object-cover opacity-50" // adjust opacity as needed
          />

          <img
            src="/images/about/about.jpg"
            alt="Foreground"
            className="relative z-10 w-32 h-32 object-contain" // customize size and positioning
          />
        </div> */}

        <div className='flex flex-col mt-8 md:flex-row justify-between items-center '>
          {/* Left Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {sections[0].heading}
            </h2>
            <p className=' text-lg'>
            {sections[0].paragraph}
            </p>
            <div className='flex justify-center items-center'>
              <Link href='/quote'>
                <button className='bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md mt-8'>
                {sections[0].button}
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src='/images/about/about1.jpg'
              alt='Health Plans'
              className='w-full h-auto rounded-md'
            />
          </motion.div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
          {/* Left Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src='/images/about/about2.jpg'
              alt='Health Plans'
              className='w-full h-auto rounded-md'
            />
          </motion.div>

          {/* Right Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {sections[1].heading}
            </h2>
            <p className=' text-lg'>
            {sections[1].paragraph}
            </p>
          </motion.div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mt-14'>
          {/* Left Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua mt-4 font-semibold mb-4'>
            {sections[2].heading}
            </h2>
            <p className=' text-lg'>
            {sections[2].paragraph}
            </p>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src='/images/about/about3.jpg'
              alt='Health Image'
              className='w-full h-full rounded-md'
            />
          </motion.div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100'>
          {/* Left Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src='/images/about/about4.jpg'
              alt='Health Plans'
              className='w-full h-auto rounded-md'
            />
          </motion.div>

          {/* Right Side */}
          <motion.div
            className='w-full md:w-1/2 p-4'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8'>
            {sections[3].heading}
            </h2>
            <p className=' text-lg'>
            {sections[3].paragraph}
            </p>
          </motion.div>
        </div>

        {/* <div className='w-full md:w-1/2 mt-20'>
          <img
            src='/images/health/Health.jpg'
            alt='Health Image'
            className='w-full h-full '
          />
        </div>
        <h2 className='text-2xl mt-4 font-semibold mb-4'>
          Understanding Health Insurance
        </h2>
        <h2 className='text-lg font-semibold mb-4'>
          What are Out-of-Pocket Expenses?
        </h2>
        <p className='mb-6'>
          Out-of-pocket expenses are the costs you pay directly for healthcare
          services that aren&apos;t covered by your health insurance plan.
          Understanding these costs is crucial to budgeting for your healthcare
          needs and preventing unexpected financial strain.
        </p>

        <h2 className='text-lg font-semibold mb-2'>
          Out-of-Pocket Costs includes:
        </h2>
        <ul className='list-none list-inside mb-6'>
          <li className='mb-1'>
            <strong className='text-sm'>Premium:</strong>
            The fixed monthly payment you make to keep your health insurance
            active.
          </li>
          <li className='mb-1'>
            <strong className='text-sm'>Deductibles:</strong>
            The amount you must pay for covered healthcare services before your
            insurance starts to pay.
          </li>
          <li className='mb-1'>
            <strong className='text-sm'>Copayments:</strong>A fixed amount you
            pay for specific services like doctor visits or prescriptions.
          </li>
          <li className='mb-1'>
            <strong className='text-sm'>Coinsurance:</strong>A percentage of the
            costs you share with your insurance company after meeting your
            deductible.
          </li>
          <li className='mb-1'>
            <strong className='text-sm'>Out-of-Pocket Maximum:</strong>
            The total amount you&apos;ll pay for covered services in a policy
            period. Once you reach this limit, the insurance company covers all
            further expenses.
          </li>
        </ul> */}
        {/* <div className='mt-8'>
          <p className='text-center'>
            When comparing insurance plans, it&apos;s crucial to review all
            costs. This understanding will help you make smarter decisions. Let
            us help you{' '}
            <a href='/' className='underline text-blue-600 pr-1'>
              explore the best plan
            </a>
            to fit your healthcare needs and budget. Connect with our licensed
            agent today!
          </p>
        </div> */}
        <div className='mt-5'>
          <CTA />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
