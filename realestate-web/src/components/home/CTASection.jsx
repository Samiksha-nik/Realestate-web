import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const INTERIOR_IMG = 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/73a173d2e_generated_8e2ae378.png';

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={INTERIOR_IMG} alt="Luxury interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-obsidian/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Ready to Find Your
            <br />
            <span className="text-primary italic">Dream Property?</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
            Let our experts guide you to the perfect home that matches your lifestyle and aspirations.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}