'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from './EmblaCarouselDotButton';
import { useTranslation } from 'react-i18next';

const Testimonials = ({ options }) => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const testimonials = t('testimonialstext.list', { returnObjects: true });
  const title = t('testimonialstext.title');

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-16 pt-28 md:pt-16"
      style={{
        backgroundImage:
          "url('https://deedoftrust.co.uk/wp-content/uploads/2017/09/client-testimonials.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-blue-200/60" />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="text-black px-8 w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
          <p className="mt-2 mb-4 text-sm md:text-base">
            {t('testimonialstext.subtitle')}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={scrollPrev}
              className="bg-primary-gradient hover:bg-blue-700 text-white p-2 w-10 h-10"
            >
              &lt;
            </button>
            <button
              onClick={scrollNext}
              className="bg-primary-gradient hover:bg-blue-700 text-white p-2 w-10 h-10"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="embla w-full md:w-1/2">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  className="embla__slide flex-[0_0_100%] p-4 flex justify-center"
                  key={index}
                >
                  <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-start w-full max-w-xl">
                    <h3 className="text-xl font-bold text-center mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-700 text-center flex-grow">
                      {testimonial.text}
                    </p>
                    <div className="mt-6 flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="text-5xl transition-transform duration-300 text-yellow-400 animate-pulse scale-110"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="embla__dots mt-4 flex justify-center space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`w-4 h-4 bg-white rounded-full cursor-pointer ${
                  index === selectedIndex ? 'bg-blue-500' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
