"use client";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TestimonialTexts = () => {
  const { t } = useTranslation();
  const testimonials = t("testimonialstext.list", { returnObjects: true });

  return (
    <div className="px-4 md:px-20 mt-10 mb-16">
      <h2 className="text-3xl font-semibold text-center mb-10">
        {t("testimonialstext.title")}
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {testimonial.text}
            </p>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialTexts;
