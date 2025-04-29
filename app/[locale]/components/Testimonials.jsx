'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from './EmblaCarouselDotButton';

const review = [
  {
    name: 'MaxWell',
    role: 'Developer',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus nostrum itaque maxime sit fugiat gravida tempus...',
  },
  {
    name: 'Sarah Lee',
    role: 'Designer',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus nostrum itaque maxime sit fugiat gravida tempus...',
  },
  {
    name: 'John Doe',
    role: 'Product Manager',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus nostrum itaque maxime sit fugiat gravida tempus...',
  },
];

const Testimonials = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section
      className='relative w-full bg-cover bg-center bg-no-repeat py-16'
      style={{
        backgroundImage:
          "url('http://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/landscape-grass-architecture-wood-farm-lawn-792610-pxhere.com-1.jpg')",
      }}
    >
      <div className='absolute inset-0 bg-black opacity-80'></div>
      <div className='relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between'>
        {/* Left Section with Heading and Arrows */}
        <div className='text-white px-8 w-full md:w-1/2 mb-8 md:mb-0'>
          <h2 className='text-2xl md:text-4xl font-bold'>
            Testimonials of our clients
          </h2>
          <p className='mt-2 mb-4 text-sm md:text-base'>
            Click below to See What Our Customers Sayied about our services.
          </p>
          <div className='flex space-x-4'>
            <button
              onClick={scrollPrev}
              className='bg-primary-gradient hover:bg-blue-700 text-white p-2 w-10 h-10 '
            >
              &lt;
            </button>
            <button
              onClick={scrollNext}
              className='bg-primary-gradient hover:bg-blue-700 text-white p-2 w-10 h-10 '
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Right Section with Carousel */}
        <div className='embla w-full md:w-1/2'>
          <div className='embla__viewport overflow-hidden' ref={emblaRef}>
            <div className='embla__container flex'>
              {review.map((testimonial, index) => (
                <div className='embla__slide flex-[0_0_100%] p-4' key={index}>
                  <div className='bg-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-between h-full'>
                    <div className='relative w-[90px] h-[90px] mb-4'>
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className='w-full h-full rounded-full border-4 border-blue-500 object-cover'
                      />
                      {/* <div className='absolute top-0 left-0 w-[40px] h-[40px] bg-blue-500 rounded-br-full rounded-tl-lg transform -translate-x-5 -translate-y-5'></div> */}
                    </div>
                    <p className='text-gray-700 text-center mb-6 flex-grow'>
                      {testimonial.review}
                    </p>
                    <div className='text-center'>
                      <h3 className='text-xl font-bold'>{testimonial.name}</h3>
                      <p className='text-blue-500'>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='embla__dots mt-4 flex justify-center space-x-2'>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`w-4 h-4 bg-white rounded-full cursor-pointer ${
                  index === selectedIndex ? 'bg-blue-500' : ''
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
