'use client';
import React from 'react';

const HomeVideo = () => {
  return (
    <div className="w-full px-4 my-12 flex justify-center">
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ozWJ13I3pec"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default HomeVideo;
