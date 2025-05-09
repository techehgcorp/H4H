'use client';
import { Breadcrumb } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const BreadcrumbComp = ({ img, video, videoSrc, pos = 'center', route }) => {
  const { t } = useTranslation();

  // Mapeamento de posições válidas
  const justifyPosition = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end'
  };

  return (
    <div className="relative w-full mt-10 rounded-md">
      {/* Background: video ou imagem */}
      {video ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          className="w-full h-full md:h-[34rem] rounded-md object-cover opacity-50"
        />
      ) : (
        <Image
          priority
          width={1000}
          height={1000}
          src={img}
          alt="img"
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover rounded-md"
        />
      )}

      {/* Conteúdo sobreposto */}
      <div
        className={`absolute inset-0 flex flex-col items-center ${
          justifyPosition[pos] || 'justify-center'
        } p-4 sm:p-20`}
      >
        <div className="text-center">
          <h1 className="text-sm text-primary-darkAqua md:text-4xl lg:text-6xl font-bold mb-2">
            {route}
          </h1>
          <Breadcrumb
            className="text-xs md:text-xl text-white font-semibold"
            items={[
              {
                title: <Link href="/">{t('navigation.menu_items.home')}</Link>
              },
              {
                title: route
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbComp;
