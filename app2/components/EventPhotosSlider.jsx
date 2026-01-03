"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventPhotosSlider = ({ photos, onSelect }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Autoplay: troca a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // limpa o timer ao desmontar
  }, [photos.length]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={photos[current].src}
          src={photos[current].src}
          alt={photos[current].title}
          className="w-full h-full object-cover cursor-pointer"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          onClick={() => onSelect(photos[current])}
        />
      </AnimatePresence>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventPhotosSlider;
