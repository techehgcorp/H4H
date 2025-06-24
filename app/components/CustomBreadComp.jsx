'use client';

import BreadcrumbComp from '@/app/components/BreadcrumbComp';
import { useTranslation } from 'react-i18next';

const CustomBreadcomp = () => {
  const { t } = useTranslation();

  return (
<div className="w-full h-auto max-h-[900px] object-cover m-0 p-0">
            <BreadcrumbComp
            img={t('testimonials.image')}
            pos="left" // imagem à esquerda
            horizontalAlign="right" // texto à direita
            route={t('testimonials.title')}
            />

    </div>

  );
};

export default CustomBreadcomp;
