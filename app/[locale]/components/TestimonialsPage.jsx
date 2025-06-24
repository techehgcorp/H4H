import CustomBreadcrumbTestimonials from "@/app/components/CustomBreadcrumb";
import CTA from "./CTA";
import Footer from "./Footer";
import Header from "./Header";
import CustomBreadcomp from "@/app/components/CustomBreadComp";
import TestimonialTexts from "@/app/components/TestimonialTexts";

const TestimonialsPage = () => {
  return (
    <>
      <Header />
        {/* <CustomBreadcrumbTestimonials />  */}
        <CustomBreadcomp />
        <TestimonialTexts/>
      <div className="mt-5">
        <CTA />
      </div>

      <Footer />
    </>
  );
};

export default TestimonialsPage
