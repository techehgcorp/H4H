import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Alica Bendor',
    role: 'Engineer',
    imageUrl:
      'https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/team01.jpeg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    name: 'Thomas Mark',
    role: 'Expert',
    imageUrl:
      'https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/team02.jpeg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    name: 'Robert Brown',
    role: 'Marketing',
    imageUrl:
      'https://demo.sparklewpthemes.com/constructionlight/insurance-lite/wp-content/uploads/sites/48/2022/07/team03.jpeg',
    social: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
];

const Team = () => {
  return (
    <div className='max-w-6xl mx-auto py-10'>
      <h2 className='text-3xl font-bold text-center mb-10'>
        Meet Our Expert Team Members
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-lg overflow-hidden relative group'
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className='w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-4 transition-all duration-500 transform group-hover:translate-y-0 translate-y-full'>
              <h3 className='text-xl font-semibold'>{member.name}</h3>
              <p className='text-blue-500 mb-4'>{member.role}</p>
              <div className='flex justify-center space-x-4'>
                {member.social.facebook && (
                  <a
                    href={member.social.facebook}
                    className='text-blue-700 hover:text-blue-900'
                  >
                    <FaFacebook size={30} />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className='text-blue-400 hover:text-blue-600'
                  >
                    <FaTwitter size={30} />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FaLinkedin size={30} />
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    className='text-pink-500 hover:text-pink-700'
                  >
                    <FaInstagram size={30} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
