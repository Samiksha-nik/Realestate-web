import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import EnquiryModal from '@/components/shared/EnquiryModal';
import ComingSoonShowcase from '@/components/projects/ComingSoonShowcase';
import jayCelestialImg from '@/assets/jay_celestial.jpeg';
import hillRidgeImg from '@/assets/Hill_Ridge.jpeg';
import swaminarayanDhamImg from '@/assets/Swaminarayan_Dham.jpeg';
import nirmalaSadanImg from '@/assets/Nirmala_sadan.jpeg';
import west95Img from '@/assets/95west.jpg';
import siddhachalResidencyImg from '@/assets/sidhanchal_residency.png';
import zarLandmarkImg from '@/assets/Zar_Landmark.jpeg';

const HERO_IMG =
  'https://media.base44.com/images/public/69ec59b100bb0a337662905c/a52620973_generated_4b691570.png';

const TABS = {
  ongoing: 'Ongoing',
  soldOut: 'Successfully Sold Out',
};

const projects = [
  {
    title: 'Jay Celestial',
    status: 'soldOut',
    location: 'Andheri West, Mumbai',
    category: 'Residential',
    desc: 'A refined residential offering crafted for elevated everyday living, now fully subscribed.',
    image: jayCelestialImg,
  },
  {
    title: 'Hill Ridge',
    status: 'soldOut',
    location: 'Andheri East (Powai), Mumbai',
    category: 'Residential',
    desc: 'Elevated living with thoughtful layouts and green surrounds - a completed chapter for homeowners.',
    image: hillRidgeImg,
  },
  {
    title: 'Swaminarayan Dham',
    status: 'soldOut',
    location: 'Andheri East (Sakinaka), Mumbai',
    category: 'Residential',
    desc: 'Community-centric residences blending tradition with modern comfort; inventory fully realised.',
    image: swaminarayanDhamImg,
  },
  {
    title: 'Nirmala Sadan',
    status: 'soldOut',
    location: 'Borivali East, Carter Road No. 2, Mumbai',
    category: 'Residential',
    desc: 'Warm, well-planned homes designed for families - sold out upon completion.',
    image: nirmalaSadanImg,
  },
  {
    title: 'Siddhachal Residency',
    status: 'soldOut',
    location: 'Ghatkopar West, Mumbai',
    category: 'Residential',
    desc: 'Trusted mid-rise living with strong neighbourhood credentials - no units remaining.',
    image: siddhachalResidencyImg,
  },
  {
    title: '95 West',
    status: 'soldOut',
    location: 'Malad East, Malwani, Mumbai',
    category: 'Residential',
    desc: 'Contemporary west-side living with premium specifications; fully subscribed.',
    image: west95Img,
  },
  {
    title: 'Zar Landmark',
    status: 'soldOut',
    location: 'Vasai East, Valiv Naka, Maharashtra',
    category: 'Residential',
    desc: 'A landmark address for the city - delivery completed and inventory sold through.',
    image: zarLandmarkImg,
  },
];

export default function Projects() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [enquireProject, setEnquireProject] = useState(null);

  useEffect(() => {
    if (location.state?.activeTab === 'soldOut') {
      setActiveTab('soldOut');
    }
  }, [location.state?.activeTab]);

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

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {filtered.length === 0 ? (
                activeTab === 'ongoing' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-sm shadow-xl"
                  >
                    <ComingSoonShowcase compact onViewSoldOut={() => setActiveTab('soldOut')} />
                  </motion.div>
                ) : (
                  <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
                )
              ) : (
                filtered.map((project, i) => (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                    className={`mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border/40 bg-card/40 shadow-md shadow-black/20 flex flex-col md:flex-row md:min-h-[220px] ${
                      i % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="relative h-48 sm:h-52 md:h-auto md:w-[200px] lg:w-[220px] shrink-0 bg-obsidian/60 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full">
                          {activeTab === 'ongoing' ? TABS.ongoing : TABS.soldOut}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-medium text-foreground/80 bg-muted/40 border border-border/40 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        {project.location}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {project.desc}
                      </p>
                      <button
                        type="button"
                        onClick={() => setEnquireProject(project)}
                        className="inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 text-sm"
                      >
                        Get in touch
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.article>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
