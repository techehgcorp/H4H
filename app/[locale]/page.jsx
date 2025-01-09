import React from "react";
import Header from "./components/Header";
import ServicesSection from "./components/ServicesSection";
import MovingIcons from "./components/MovingIcons";
import ContactSection from "./components/ContactSection";
import InsuranceService from "./components/InsuranceService";
import InsurancePolicy from "./components/InsurancePolicy";
import GrowBusiness from "./components/GrowBusiness";
import ContactFormWithMap from "./components/ContactFormWithMap";
import Achievements from "./components/Achievements";
import BlogSection from "./components/BlogSection";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import initTranslations from "./i18n";
import TranslationsProvider from "@/lib/TranslationProvider";
import GetQuoteRibbon from "@/components/GetQuoteRibbon";
import ResponsiveFooter from "@/components/MobileFooter";

const i18nNamespaces = ["translation"];

async function page({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  // console.log({ locale });
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div>
        <Header />
        <section id="products">
          <InsuranceService />
        </section>
        <MovingIcons />
        {/* <section id='mission'>
        <InsurancePolicy />
      </section> */}
        <GrowBusiness />
        <section id="contact">
          <ContactSection />
        </section>
        <ResponsiveFooter>
          <Footer />
        </ResponsiveFooter>
        <GetQuoteRibbon />
      </div>
    </TranslationsProvider>
  );
}

export default page;
