import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const projects = [
  {
    title: 'The Grand Horizon',
    location: 'Bandra West, Mumbai',
    type: 'Luxury Apartments',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
  {
    title: 'Emerald Heights',
    location: 'Powai, Mumbai',
    type: 'Premium Villas',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80',
  },
  {
    title: 'Azure Skyline',
    location: 'Worli, Mumbai',
    type: 'Sea-facing Penthouses',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  },
  {
    title: 'Celestial Gardens',
    location: 'Thane, Mumbai',
    type: 'Townships',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    title: 'The Crest Residences',
    location: 'Juhu, Mumbai',
    type: 'Luxury Apartments',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
  },
  {
    title: 'Sapphire Villas',
    location: 'Lonavala, Maharashtra',
    type: 'Hillside Villas',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80',
  },
];

// Duplicate for seamless infinite scroll
const allCards = [...projects, ...projects];

export default function FeaturedProjects() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId;
    let pos = 0;
    const speed = 0.5; // px per frame
    const halfWidth = track.scrollWidth / 2;

    const step = () => {
      pos += speed;
      if (pos >= halfWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-4">
            Our Portfolio
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            Discover Our
            <br />
            <span className="text-primary italic">Featured Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base">
            Explore our finest developments that combine architectural excellence with luxurious living.
          </p>
        </motion.div>
      </div>

      {/* Scrolling Cards Strip */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-4"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {allCards.map((p, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
              style={{ width: '260px', height: '360px' }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />

              {/* Type badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 text-[10px] font-semibold bg-primary/90 text-primary-foreground rounded-full">
                  {p.type}
                </span>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-base font-semibold text-foreground leading-tight">{p.title}</h3>
                <div className="flex items-center gap-1 mt-1 text-foreground/60 text-xs">
                  <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                  {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 border border-primary/40 text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}