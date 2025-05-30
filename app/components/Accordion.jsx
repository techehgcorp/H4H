'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
    {items.map(({ title, description }, index) => {
        const isOpen = openIndex === index;
        return (
        <div
            key={index}
            className="border rounded-lg bg-white p-6 cursor-pointer"
        >
            <div
            onClick={() => toggleIndex(index)}
            className="flex justify-between items-center font-semibold text-lg text-gray-800 select-none"
            >
            {title}
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl"
            >
                ▼
            </motion.span>
            </div>

            <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden text-gray-800 text-lg leading-relaxed"
                >
                <p>{description}</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        );
    })}
    </div>
  );
};

export default Accordion;
