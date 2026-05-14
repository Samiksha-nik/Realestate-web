import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import EnquiryModal from '@/components/shared/EnquiryModal';

const HERO_IMG =
  'https://media.base44.com/images/public/69ec59b100bb0a337662905c/a52620973_generated_4b691570.png';

const TABS = {
  ongoing: 'Ongoing',
  soldOut: 'Successfully Sold Out',
};

/** Placeholder imagery — replace with project-specific assets when available */
const img = (unsplashId) =>
  `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=1200&q=80`;

const projects = [
  {
    title: 'Pam Infra & More',
    status: 'ongoing',
    location: 'Mumbai MMR',
    category: 'Infrastructure',
    desc: 'Infrastructure and development mandates delivered with structured execution, compliance focus, and long-term asset value in mind.',
    image: img('1486406146926-c627a92ad1ab'),
  },
  {
    title: 'Jay Celestial',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'A refined residential offering crafted for elevated everyday living, now fully subscribed.',
    image: img('1512917774080-9991f1c4c750'),
  },
  {
    title: 'Hill Ridge',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'Elevated living with thoughtful layouts and green surrounds — a completed chapter for homeowners.',
    image: img('1600596542815-ffad4c1539a9'),
  },
  {
    title: 'Swaminarayan Dham',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'Community-centric residences blending tradition with modern comfort; inventory fully realised.',
    image: img('1600585154340-be6161a56a0c'),
  },
  {
    title: 'Nirmala Sadan',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'Warm, well-planned homes designed for families — sold out upon completion.',
    image: img('1600047509801-baecb956888b'),
  },
  {
    title: 'Siddhachal Residency',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'Trusted mid-rise living with strong neighbourhood credentials — no units remaining.',
    image: img('1600566752355-35742a38b655'),
  },
  {
    title: '95 West',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'Contemporary west-side living with premium specifications; fully subscribed.',
    image: img('1600604898840-6e2f21f6981c'),
  },
  {
    title: 'Zar Landmark',
    status: 'soldOut',
    location: 'Mumbai MMR',
    category: 'Residential',
    desc: 'A landmark address for the city — delivery completed and inventory sold through.',
    image: img('1600585154526-990dceabd57'),
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [enquireProject, setEnquireProject] = useState(null);

  const filtered = projects.filter((p) => p.status === activeTab);

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
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border/30 sticky top-20 z-30 bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(TABS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              {filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
              ) : (
                filtered.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: Math.min(i * 0.08, 0.4) }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                  >
                    <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-primary/15">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/10 transition-colors duration-500" />
                      </div>
                    </div>

                    <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                          {activeTab === 'ongoing' ? TABS.ongoing : TABS.soldOut}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-medium text-foreground/80 bg-muted/40 border border-border/40 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        {project.location}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">{project.desc}</p>
                      <button
                        type="button"
                        onClick={() => setEnquireProject(project)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 text-sm"
                      >
                        Get in touch
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
