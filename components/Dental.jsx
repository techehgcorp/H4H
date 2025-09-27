"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaBusinessTime, FaChartBar, FaTrophy, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { IoIosCheckbox } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import BreadcrumbComp from "@/app/components/BreadcrumbComp";
import Header from "@/app/[locale]/components/Header";
import CTA from "@/app/[locale]/components/CTA";
import Footer from "@/app/[locale]/components/Footer";
import Accordion from "@/app/components/Accordion";

const Dental = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className="">
        <BreadcrumbComp
          img={
            "/images/dental/new/dental_hero.png"
          }
          video={false}
          pos={"center"}
          route={t("dental_vision.title")}
        />

        <div className="flex flex-col mt-8 md:flex-row justify-between items-center ">
          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/dental/new/dental1.png"
              alt={t("dental_vision.description")}
              className="w-full h-auto rounded-md"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8">
              {t("dental_vision.description")}
            </h2>
            <p className="text-lg">
              {t("dental_vision.main_sections.first_section.description")}
            </p>
            <div className="flex justify-center items-center">
              <Link href="/quote">
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-10 h-10 mr-2 mt-4"
                    src="/images/product/Glass Eye Symbol.png"
                    alt="Eye Icon"
                  />
                  <button className="bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md ">
                    {t("dental_vision.cta_button")}
                  </button>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-14">
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-5xl text-primary-darkAqua mt-4 font-semibold mb-6">
            {t("dental_vision.main_sections.benefits_section.title")}
          </h2>

          <Accordion
            items={Object.values(
              t("dental_vision.main_sections.benefits_section.benefits", {
                returnObjects: true,
              })
            ).map((benefit, index) => ({
              title: benefit.title || `Benefício ${index + 1}`,
              description: benefit.description || "",
            }))}
          />
        </motion.div>


          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/dental/new/dental2.png"
              alt={t("dental_vision.title")}
              className="w-full h-full rounded-md"
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
              src="/images/dental/new/dental3.png"
              alt={t("dental_vision.title")}
              className="w-full h-auto rounded-md"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8">
              {t("dental_vision.main_sections.need_insurance_section.title")}
            </h2>
            <p className="text-lg">
              {t(
                "dental_vision.main_sections.need_insurance_section.description"
              )}
              <a href="/" className="underline text-blue-600 pr-1">
                {t(
                  "dental_vision.main_sections.need_insurance_section.call_to_action"
                )}
              </a>
            </p>
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

export default Dental;
