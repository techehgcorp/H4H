'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BreadcrumbComp from '@/app/components/BreadcrumbComp';
import Footer from '@/app/[locale]/components/Footer';
import Header from '@/app/[locale]/components/Header';
import CTA from '@/app/[locale]/components/CTA';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  const sections = t('about_us.sections', { returnObjects: true });

  const renderBullets = (bullets) => {
    return (
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '1rem' }}>
        {bullets.map((bullet, index) => (
          <li
            key={index}
            style={{
              marginBottom: '0.75rem',
              fontSize: '1.2rem', // Aumenta o tamanho do texto dos bullets principais
              lineHeight: '1.7',
            }}
          >
            <span style={{ display: 'block', marginBottom: '0.25rem' }}>
              {bullet.text}
            </span>
            {bullet.subBullets && (
              <ul style={{ listStyleType: 'none', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                {bullet.subBullets.map((subBullet, subIndex) => (
                  <li
                    key={subIndex}
                    style={{
                      position: 'relative',
                      paddingLeft: '1.25rem',
                      marginBottom: '0.5rem',
                      fontSize: '1.2rem', // Sub-bullets um pouco menores
                      lineHeight: '1.6',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        color: 'black',
                        fontSize: '1.2rem',
                      }}
                    >
                      ◦
                    </span>
                    {subBullet}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div>
      <BreadcrumbComp
          video={true} // <-- Ativa a renderização do vídeo
          videoSrc={"/images/about/new/haitiAB.mp4"} // <-- Fornece o caminho do vídeo
          pos={"center"}
          route={t("dental_vision.title")}
        />

        <div className="relative w-full mt-0 p-0 rounded-md" />

        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            } justify-between items-center mt-14 ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
          >
            <motion.div
              className="w-full md:w-1/2 p-4"
              initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl lg:text-5xl text-primary-darkAqua font-bold mb-6">
                {section.heading}
              </h2>
              {section.paragraph && (
                <p
                  style={{
                    marginTop: '1rem',
                    textIndent: '2em',
                    lineHeight: '1.7',
                    fontSize: '1.125rem', // Parágrafo maior

                  }}
                >
                  {section.paragraph}
                </p>
              )}
              {section.bullets && renderBullets(section.bullets)}

              {section.button && (
                <div className="flex justify-center items-center">
                  <Link href="/quote">
                    <button className="bg-primary-darkAqua text-white font-semibold py-2 px-4 rounded-md mt-8">
                      {section.button}
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 p-4"
              initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >

            <img
              src={`/images/about/new/about${index + 1}.png`} // <-- ALTERAÇÃO AQUI
              alt={`Section ${index + 1}`}
              className="w-full h-auto rounded-md"
            />
            </motion.div>
          </div>
        ))}

        <div className="mt-5">
          <CTA />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
