import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import EnquiryModal from '@/components/shared/EnquiryModal';

const HERO_IMG = 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/a52620973_generated_4b691570.png';

const categories = ['All', 'Luxury Apartments', 'Villas', 'Penthouses', 'Townships'];

const projects = [
  {
    title: 'The Grand Horizon',
    location: 'Bandra West, Mumbai',
    category: 'Luxury Apartments',
    desc: 'An iconic 40-storey tower offering panoramic sea views, world-class amenities, and bespoke interiors for the discerning homeowner.',
    image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/65bb22552_generated_45c4d000.png',
  },
  {
    title: 'Emerald Heights',
    location: 'Powai, Mumbai',
    category: 'Villas',
    desc: 'A gated community of 50 premium villas surrounded by lush greenery, private gardens, and a lifestyle of unparalleled serenity.',
    image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/cfcb23023_generated_fa6dcbcc.png',
  },
  {
    title: 'Azure Skyline',
    location: 'Worli, Mumbai',
    category: 'Penthouses',
    desc: 'Ultra-luxury penthouses with infinity pools, private elevators, and breathtaking views of the Arabian Sea.',
    image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/1f849f377_generated_7e85046c.png',
  },
  {
    title: 'Celestial Gardens',
    location: 'Thane, Mumbai',
    category: 'Townships',
    desc: 'A sprawling 100-acre integrated township featuring residences, retail, schools, and recreational facilities.',
    image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/e9f08b53c_generated_ada4b49c.png',
  },
  {
    title: 'The Crest Residences',
    location: 'Juhu, Mumbai',
    category: 'Luxury Apartments',
    desc: 'Premium apartments designed by award-winning architects, featuring smart home technology and concierge services.',
    image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/fcc06acc9_generated_7c14c89e.png',
  },
  {
    title: 'Sapphire Villas',
    location: 'Lonavala, Maharashtra',
    category: 'Villas',
    desc: 'Hillside luxury villas with private pools, panoramic valley views, and modern minimalist architecture.',
    image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/7f32e5eba_generated_77225cc8.png',
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [enquireProject, setEnquireProject] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <AnimatePresence>
        {enquireProject && (
          <EnquiryModal
            title="Enquire About"
            subtitle={enquireProject.title}
            onClose={() => setEnquireProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Our Projects" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-12 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Our <span className="text-primary">Projects</span>
            </h1>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">Projects</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border/30 sticky top-20 z-30 bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    i % 2 === 1 ? 'lg:direction-rtl' : ''
                  }`}
                >
                  <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/10 transition-colors duration-500" />
                    </div>
                  </div>

                  <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
                      {project.category}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4 text-primary" />
                      {project.location}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.desc}
                    </p>
                    <button
                      onClick={() => setEnquireProject(project)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 text-sm"
                    >
                      Enquire Now
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}