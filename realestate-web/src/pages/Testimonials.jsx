import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import payalAvatar from '@/assets/Payal yashwanth jadhav.jpeg';
import smitaAvatar from '@/assets/Smita  sachin Gujar.jpeg';
import niteshAvatar from '@/assets/Nitesh shivkumar pandey.jpeg';
import sarfarazAvatar from '@/assets/Sarfaraz Abrar Shaikh.jpeg';
import ashishAvatar from '@/assets/Aasish Katariya.jpg';
import dishaAvatar from '@/assets/Disha Bhagat.jpg';

const galleryImages = [
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/65bb22552_generated_45c4d000.png', class: 'row-span-2' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/c6c581b8b_generated_864ca56a.png', class: '' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/cfcb23023_generated_fa6dcbcc.png', class: 'row-span-2' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/f4f74c667_generated_59d107ca.png', class: 'col-span-1 row-span-3' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/73a173d2e_generated_8e2ae378.png', class: '' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/e9f08b53c_generated_ada4b49c.png', class: 'row-span-2' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/1f849f377_generated_7e85046c.png', class: '' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/b473f0af0_generated_becc8a9a.png', class: '' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/6dcb35df0_generated_87819236.png', class: 'row-span-2' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/093be1170_generated_201ec9c0.png', class: '' },
  { src: 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/fcc06acc9_generated_7c14c89e.png', class: '' },
];

const testimonials = [
  {
    name: 'Payal Yashwanth Jadhav',
    role: 'Client',
    avatar: payalAvatar,
    text: '"Ananya Realty Advisory is the mandate firm that truly cares about their clients. They attend to you professionally and help you take the right decision."',
    rating: 5,
  },
  {
    name: 'Smita Sachin Gujar',
    role: 'Client',
    avatar: smitaAvatar,
    text: '"Ananya Realty Advisory employees are very helpful. They gave us proper details about the projects and deal with complete transparency."',
    rating: 5,
  },
  {
    name: 'Nitesh Shivkumar Pandey',
    role: 'Employee',
    avatar: niteshAvatar,
    text: '"Ananya Realty works with transparency with channel partners and clients. They deal with things professionally and also care for their employees."',
    rating: 5,
  },
  {
    name: 'Sarfaraz Abrar Shaikh',
    role: 'Client',
    avatar: sarfarazAvatar,
    text: '"Excellent experience with Ananya Realty Advisory LLP! They have an outstanding understanding of local real estate trends and offer highly credible advisory services. The team is incredibly supportive, responsive, and trustworthy. A five-star service all the way!"',
    rating: 5,
  },
  {
    name: 'Ashish Katariya',
    role: 'Mandate Partner',
    avatar: ashishAvatar,
    text: '"As a mandate partner, Ananya Realty Advisory has been outstanding. Their team guides clients with clarity, handles every interaction professionally, and helps people make confident property decisions with full transparency."',
    rating: 5,
  },
  {
    name: 'Disha Bhagat',
    role: 'Client',
    avatar: dishaAvatar,
    text: '"Ananya Realty Advisory is a mandate firm that genuinely puts clients first. From project insights to follow-ups, their professional and transparent approach made our entire property journey smooth and stress-free."',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* ── Hero Mosaic Section ── */}
      <section className="relative px-6 lg:px-8 pt-4 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">

          {/* Scattered image grid */}
          <div className="relative h-[480px] md:h-[520px]">

            {/* Left Column */}
            <div className="absolute left-0 top-0 flex flex-col gap-3 w-[13%]">
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                className="rounded-2xl overflow-hidden h-[200px]"
              >
                <img src={galleryImages[0].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="rounded-2xl overflow-hidden h-[130px]"
              >
                <img src={galleryImages[1].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="rounded-2xl overflow-hidden h-[130px]"
              >
                <img src={galleryImages[7].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Left-Center Column */}
            <div className="absolute left-[15%] top-0 flex flex-col gap-3 w-[13%]">
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl overflow-hidden h-[130px]"
              >
                <img src={galleryImages[4].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="rounded-2xl overflow-hidden h-[200px]"
              >
                <img src={galleryImages[2].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="rounded-2xl overflow-hidden h-[120px]"
              >
                <img src={galleryImages[9].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Center Column – tall */}
            <div className="absolute left-[30%] right-[30%] top-0 flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-2xl overflow-hidden h-[320px]"
              >
                <img src={galleryImages[3].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="rounded-2xl overflow-hidden h-[150px]"
              >
                <img src={galleryImages[10].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Right-Center Column */}
            <div className="absolute right-[15%] top-0 flex flex-col gap-3 w-[13%]">
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="rounded-2xl overflow-hidden h-[200px]"
              >
                <img src={galleryImages[5].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden h-[130px]"
              >
                <img src={galleryImages[6].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="rounded-2xl overflow-hidden h-[120px]"
              >
                <img src={galleryImages[8].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="absolute right-0 top-0 flex flex-col gap-3 w-[13%]">
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.04 }}
                className="rounded-2xl overflow-hidden h-[130px]"
              >
                <img src={galleryImages[1].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="rounded-2xl overflow-hidden h-[200px]"
              >
                <img src={galleryImages[9].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden h-[130px]"
              >
                <img src={galleryImages[7].src} alt="" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            {/* Center Overlay Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none"
            >
              {/* Pill badge */}
              <span className="inline-block px-5 py-2 text-xs font-semibold tracking-widest uppercase text-foreground bg-background border border-border rounded-full mb-5 shadow-lg pointer-events-auto">
                Testimonials
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight drop-shadow-2xl">
                Trusted by Real Estate Developers
                <br />
                <span className="text-primary italic">& Investors</span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Rating Badge ── */}
      <div className="px-6 lg:px-8 -mt-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto flex justify-center"
        >
          <div className="inline-flex items-center gap-4 bg-card border border-primary/30 rounded-full px-6 py-3 shadow-xl">
            <span className="text-foreground font-heading text-lg font-semibold">5.0</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <div className="h-6 w-px bg-primary/30" />
            <span className="text-muted-foreground text-sm tracking-wide uppercase">
              Reviewed by{' '}
              <span className="font-semibold normal-case text-foreground">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Testimonial Cards – Auto-scrolling Marquee ── */}
      <section className="pb-24 overflow-hidden">
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          {/* Marquee track */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              width: 'max-content',
              animation: 'marquee 40s linear infinite',
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                style={{ width: '360px', flexShrink: 0 }}
                className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-primary/30" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}