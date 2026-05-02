import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, subtitle, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      {label && (
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-4">
          {label}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${light ? 'text-foreground' : 'text-foreground'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}