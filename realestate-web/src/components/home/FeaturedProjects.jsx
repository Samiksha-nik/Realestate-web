import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, MapPin, Ruler, Waves } from 'lucide-react';

const featured = {
  badge: 'Luxury Apartments',
  title: 'The Grand Horizon',
  location: 'Bandra West, Mumbai',
  desc: 'A masterpiece of modern architecture, The Grand Horizon redefines luxury living with seamless design, premium amenities, and a prime location.',
  image: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/65bb22552_generated_45c4d000.png',
  highlights: [
    { label: '5 Bedrooms', sub: 'Spacious & Elegant', icon: BedDouble },
    { label: '8,500 sq. ft.', sub: 'Built-up Area', icon: Ruler },
    { label: 'Private Infinity Pool', sub: 'Premium Lifestyle', icon: Waves },
    { label: 'Prime Location', sub: 'Bandra West, Mumbai', icon: MapPin },
  ],
};

export default function FeaturedProjects() {
  return (
    <section className="py-14 lg:py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 lg:mb-9"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full">
              Our Portfolio
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">Featured <span className="text-primary italic">Project</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base">
            Explore our finest developments that combine architectural excellence with luxurious living.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative max-w-5xl mx-auto overflow-hidden rounded-2xl border border-primary/30 bg-card/60 backdrop-blur-sm shadow-xl"
        >
          <div className="pointer-events-none absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_55%)]" />

          {/* One card: image + copy. items-start + self-stretch on image avoids a tall empty panel under the button. */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-start">
            <div className="relative w-full min-h-[220px] h-[220px] shrink-0 overflow-hidden sm:h-[260px] lg:h-auto lg:min-h-0 lg:w-[46%] lg:self-stretch">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2.5 py-1 text-[10px] font-semibold bg-primary/90 text-primary-foreground rounded-full shadow-md shadow-primary/20">
                  {featured.badge}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-card/90 border border-border/40 text-[10px] text-foreground shadow-lg">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {featured.location}
                </span>
              </div>
            </div>

            <div className="relative flex w-full min-w-0 flex-col gap-3 p-5 sm:p-6 lg:flex-1 lg:gap-4 lg:self-start lg:p-6 lg:pl-5">
              <div className="min-w-0">
                <p className="text-[10px] text-primary font-semibold tracking-widest uppercase">
                  - Featured Project
                </p>
                <h3 className="mt-1.5 font-heading text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                  {featured.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {featured.desc}
                </p>
                <div className="mt-3 h-px w-full bg-border/50" />

                <div className="mt-3 flex flex-col gap-2">
                  {featured.highlights.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div key={h.label} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary border border-primary/25 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{h.label}</p>
                          <p className="text-[11px] text-muted-foreground">{h.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="shrink-0 pt-0.5">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}