'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from './EmblaCarouselDotButton';

const review = [
  {
    name: 'Francene Mitial',
    // role: 'Cliente',
    rating: 5,
    review:
      "Everything was beautifully done and the enrollment process ended well. Formidable experience, it was a very nice exchange between the agent and I to achieve this, this help was so needed; I must say necessary. Anyway, we're waiting for the follow‑up so I can have the chance to go see the doctor. Thank you very much for sharing the information with me. Hats off!",
  },
  {
    name: 'Christele Saint Jean',
    // role: 'Cliente',
    rating: 5,
    review:
      "I’m thrilled I chose H4H to assist with my health insurance process. It was a joy to see how warmly the team welcomed and guided me. Everything was resolved quickly, and I especially value that even if you only speak Creole, they understand and guide you throughout. They never left me alone, always checking to ensure everything goes smoothly, confirming I received my card, and explained every detail I didn’t understand. I have no complaints, only gratitude for the amazing initiative to help every Haitian in our community access these services fully. More people should know about this exceptional service. Thank you, H4H team, for supporting our community!",
  },
];

const Testimonials = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-16"
      style={{
        backgroundImage:
          "url('http://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/landscape-grass-architecture-wood-farm-lawn-792610-pxhere.com-1.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80" />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="text-white px-8 w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-bold">
            Testimonials of our clients
          </h2>
          <p className="mt-2 mb-4 text-sm md:text-base">
            Click below to see what our customers said about our services.
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
              {review.map((testimonial, index) => (
                <div
                  className="embla__slide flex-[0_0_100%] p-4 flex justify-center"
                  key={index}
                >
                  <div
                    className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-start w-full max-w-xl"
                    /* se quiser um mínimo:  min-h-[200px] */
                  >
                    {/* Nome */}
                    <h3 className="text-xl font-bold text-center mb-2">
                      {testimonial.name}
                    </h3>

                    {/* Texto */}
                    <p className="text-gray-700 text-center flex-grow">
                      {testimonial.review}
                    </p>

                    {/* Estrelas */}
                    <div className="mt-6 flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-5xl transition-transform duration-300 ${
                            star <= testimonial.rating
                              ? 'text-yellow-400 animate-pulse scale-110'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Role comentado */}
                    {/* <p className="text-blue-500 text-center mt-2">{testimonial.role}</p> */}
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
