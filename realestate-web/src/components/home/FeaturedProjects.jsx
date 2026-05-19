import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ComingSoonShowcase from '@/components/projects/ComingSoonShowcase';

export default function FeaturedProjects() {
  const navigate = useNavigate();

  return (
    <section className="py-14 lg:py-16 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="text-center mb-8 lg:mb-9">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full">
              Our Portfolio
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Featured <span className="text-primary italic">Project</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base">
            Our next mandate is on the way-stay tuned for what&apos;s behind the curtain.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-sm shadow-xl"
        >
          <ComingSoonShowcase
            compact
            onViewSoldOut={() => navigate('/projects', { state: { activeTab: 'soldOut' } })}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
