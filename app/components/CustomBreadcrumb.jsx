'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const CustomBreadcrumbTestimonials = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-12 bg-white">
      {/* Imagem maior à esquerda */}
      <div className="w-full md:w-2/3">
        <Image
          src={t('testimonials.image')}
          alt="Testimonial"
          width={1000}
          height={600}
          className="rounded-xl object-cover w-full h-auto shadow-lg"
        />
      </div>

      {/* Texto à direita */}
      <div className="w-full md:w-1/3 text-right">
        <h1 className="text-4xl font-bold leading-snug text-gray-800">
          {t('testimonials.title')}
        </h1>
      </div>
    </div>
  );
};

export default CustomBreadcrumbTestimonials;
