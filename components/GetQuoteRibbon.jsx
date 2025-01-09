'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';
const GetQuoteRibbon = () => {
    const { t } = useTranslation();
  return (
    <div className="hidden sm:block fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <div className="relative bg-primary-darkAqua hover:bg-[#F44336] text-white px-4 py-3 shadow-lg rounded-l-lg">
        {/* <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-red-600"></div> */}
        <a href="/quote" className="font-bold text-lg">
        {t("misc.free_quote")}
        </a>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-red-600"></div>
      </div>
    </div>
  );
};
export default GetQuoteRibbon;