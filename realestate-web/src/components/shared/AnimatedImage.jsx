import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedImage({ src, alt, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}