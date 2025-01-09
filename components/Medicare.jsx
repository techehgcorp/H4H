"use client";
import React from "react";
// import Footer from '../components/Footer';
// import Header from '../components/Header';
import Image from "next/image";
import { IoIosCheckbox } from "react-icons/io";
// import CTA from '../components/CTA';
import { motion } from "framer-motion";
import Link from "next/link";
import BreadcrumbComp from "@/app/components/BreadcrumbComp";
import { Breadcrumb } from "antd";
import Header from "@/app/[locale]/components/Header";
import CTA from "@/app/[locale]/components/CTA";
import Footer from "@/app/[locale]/components/Footer";
import { useTranslation } from "react-i18next";

const Medicare = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="">
        <div className="relative w-full mt-10 p-10 rounded-md">
          <Image
            priority={true}
            width={1000}
            height={1000}
            src="/images/product/medicareheroimage.jpg"
            alt="img"
            className="w-full h-full md:h-[34rem] rounded-md object-cover"
          />

          <div className="flex absolute inset-0 flex-col items-end justify-center p-4 sm:p-10">
            <div className="text-center ml-7 md:mr-[1rem]">
              <h1 className="text-sm text-white md:text-4xl lg:text-6xl font-bold mb-4">
                {t("medicare.hero_section.title")}
              </h1>
              <Breadcrumb
                className="text-xs md:text-xl text-white font-semibold py-2 px-4"
                items={[
                  {
                    title: (
                      <Link href="/">{t("medicare.hero_section.home")}</Link>
                    ),
                  },
                  {
                    title: t("medicare.breadcrumb.title"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8 md:flex-row justify-between items-center">
          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8">
              {t("medicare.main_section.title")}
            </h2>
            <p className="text-lg">{t("medicare.main_section.description")}</p>
            <div className="flex justify-center items-center">
              <Link href="/quote">
                <button className="bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md mt-8">
                  {t("medicare.main_section.button")}
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/product/medicareH1.jpg"
              alt="Health Plans"
              className="w-full h-auto rounded-md"
            />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100">
          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/product/medicareH3.jpeg"
              alt="Health Plans"
              className="w-full h-auto rounded-md"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-primary-darkAqua mt-4 font-semibold mb-4">
              {t("medicare.plans_section.title")}
            </h2>
            <ul className="list-none list-inside mb-6 text-lg">
              {t("medicare.plans_section.plans", { returnObjects: true }).map(
                (plan, index) => (
                  <li key={index} className="mb-1">
                    <strong className="text-lg pr-1">{plan.title}:</strong>
                    {plan.description}
                  </li>
                )
              )}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-14">
          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8">
              {t("medicare.compare_section.title")}
            </h2>
            <p className="text-lg">
              {t("medicare.compare_section.description")}{" "}
              <a
                href="/quote"
                className="underline text-blue-600 pr-1 px-1"
              >
                {t("medicare.compare_section.call_text")}
              </a>
              {t("medicare.compare_section.expert_text")}
            </p>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/product/medicareh4.jpg"
              alt="Health Image"
              className="w-full h-full rounded-md"
            />
          </motion.div>
        </div>

        <div className="mt-5">
          <CTA />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Medicare;
