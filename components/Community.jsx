"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Header from "@/app/[locale]/components/Header";
import Footer from "@/app/[locale]/components/Footer";
import CTA from "@/app/[locale]/components/CTA";
import BreadcrumbComp from "@/app/components/BreadcrumbComp";
import Accordion from "@/app/components/Accordion";
import EventPhotosSlider from "@/app/components/EventPhotosSlider";

const Community = () => {
  const { t } = useTranslation();
  const [modalImage, setModalImage] = useState(null);

  // Lista de fotos dos eventos
  const eventPhotos = Array.from({ length: 18 }, (_, i) => ({
    src: `/images/community/image${i + 10}.jpg`,
    title: `Event ${i + 10}`,
  }));

  return (
    <>
      <Header />

      <BreadcrumbComp
        img="/images/community/image15.jpg"
        video={false}
        pos="right"
        route={t("community.title")}
      />

      {/* Seção com slide de imagens à esquerda */}
      <div className="flex flex-col mt-5 md:flex-row justify-between items-center ml-8">
        {/* Slide à esquerda */}
        <motion.div
          className="w-full md:w-1/2 relative h-[600px] p-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Círculo de fundo decorativo */}
          <div
            className="absolute top-10 -mr-50 w-[450px] h-[450px] bg-blue-100/80 square-full z-0"
            style={{ filter: "blur(4px)" }}
          ></div>

          {/* Slide de fotos */}
          <EventPhotosSlider photos={eventPhotos} onSelect={setModalImage} />
        </motion.div>

        {/* Texto à direita */}
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-8">
            {t("community.events_section.title")}
          </h2>
          <p className="text-lg mb-6">
            {t("community.events_section.description")}
          </p>
        </motion.div>
      </div>

      {/* Modal para imagem clicada */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
            <img
              src={modalImage.src}
              alt={modalImage.title}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-4">{modalImage.title}</p>
          </div>
        </div>
      )}

      {/* Seção Recursos */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-14">
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-5xl text-primary-darkAqua mt-4 font-semibold mb-6">
            {t("community.main_sections.resources_section.title")}
          </h2>
          <Accordion
            items={Object.values(
              t("community.main_sections.resources_section.resources", {
                returnObjects: true,
              })
            ).map((item, index) => ({
              title: item.title || `Item ${index + 1}`,
              description: item.description || "",
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
            src="/images/community/image17.jpg"
            alt={t("community.title")}
            className="w-full h-full rounded-md"
          />
        </motion.div>
      </div>

      {/* Seção de Suporte */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-14 bg-gray-100">
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/images/community/image22.png"
            alt={t("community.title")}
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
            {t("community.main_sections.support_section.title")}
          </h2>
          <p className="text-lg">
            {t("community.main_sections.support_section.description")}
          </p>
        </motion.div>
      </div>

      <div className="mt-5">
        <CTA />
      </div>

      <Footer />
    </>
  );
};

export default Community;
