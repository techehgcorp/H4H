import Image from 'next/image';
import React from 'react';

const blogPosts = [
  {
    image:
      'https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/doctor-filling-up-life-insurance-form.jpg',
    title: 'Homework invests in bronze nets for the residents of the beaches',
    date: 'July 25, 2022',
    author: 'sparkle',
    comments: 'no comment',
  },
  {
    image:
      'https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/banner3.jpeg',
    title: 'Pregnant women need to live on the beach',
    date: 'July 25, 2022',
    author: 'sparkle',
    comments: 'no comment',
  },
  {
    image:
      'https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/happy-parents-laughing-together-with-daughter-1.jpg',
    title:
      'The old man invests the bronze grid of the inhabitants of the shores',
    date: 'July 25, 2022',
    author: 'sparkle',
    comments: '1 Comment',
  },
];

const BlogSection = () => {
  return (
    <div className='max-w-7xl mx-auto py-16 px-4'>
      <h2 className='text-center text-3xl font-bold mb-4'>Blog Section</h2>
      <p className='text-center text-gray-500 mb-12'>
        Lorem ipsum dolor sit amet consectetur adipiscing, elit libero facilisis
        etiam ridiculus.
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {blogPosts.map((post, index) => (
          <div key={index} className='relative overflow-hidden shadow-lg'>
            <Image
              src={post.image}
              alt={post.title}
              className='w-full h-60 object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4'>
              <h3 className='text-white text-xl font-semibold leading-tight mb-2'>
                {post.title}
              </h3>
              <div className='flex items-center text-gray-300 text-sm'>
                <span>{post.date}</span>
                <span className='mx-2'>•</span>
                <span>{post.author}</span>
                <span className='mx-2'>•</span>
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
