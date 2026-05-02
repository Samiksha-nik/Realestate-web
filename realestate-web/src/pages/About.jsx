import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Gem, HeartHandshake, ShieldCheck } from 'lucide-react';

const HERO_BG = 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/c256a5ab2_generated_74effe14.png';
const DIRECTOR_IMG = 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/51ba3eeee_generated_cbc6156c.png';

const journeyCards = [
  {
    year: 'Our Vision',
    title: 'A premium property experience, made simple',
    desc: 'To be India’s most trusted real estate advisory—helping families and investors discover homes and opportunities that truly match their lifestyle, goals, and values.',
    icon: Eye,
  },
  {
    year: 'Our Mission',
    title: 'Expert guidance. Transparent process. Real value.',
    desc: 'We deliver curated listings, honest advice, and end-to-end support—so every decision feels confident, clear, and genuinely premium.',
    icon: HeartHandshake,
  },
  {
    year: 'Our Values',
    title: 'Integrity, care, and craftsmanship',
    desc: 'We put clients first, communicate transparently, and hold ourselves to high standards—because trust is the foundation of every home journey.',
    icon: Gem,
  },
];

const whyChoose = [
  {
    title: 'Local Expertise',
    desc: 'Deep Mumbai market knowledge to help you pick the right property at the right time.',
    icon: ShieldCheck,
  },
  {
    title: 'Tailored Shortlists',
    desc: 'Curated options based on your budget, location, lifestyle, and long‑term goals.',
    icon: Gem,
  },
  {
    title: 'White‑glove Support',
    desc: 'From site visits to paperwork, we stay with you—every step, every detail.',
    icon: HeartHandshake,
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Section 1: Hero ── */}
      <section className="pt-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-muted-foreground py-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">About Us</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-border/40 bg-card"
          >
            <div className="absolute inset-0">
              <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/70 to-obsidian/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 px-8 md:px-12 py-16 md:py-20 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 border border-primary/20 text-xs font-semibold tracking-widest uppercase text-primary">
                About Ananya Realty
              </span>
              <h1 className="mt-6 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
                Your Trusted Partner in{' '}
                <span className="text-primary italic">Premium Real Estate</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-foreground/70 leading-relaxed">
                For over a decade, we’ve helped clients buy, sell, and invest with confidence—through curated listings,
                honest advice, and a truly premium end‑to‑end experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Vision / Mission / Values (timeline cards) ── */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Our Purpose
            </p>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-foreground">
              Mission, Vision & <span className="text-primary italic">Values</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/25 hidden md:block" />

            <div className="space-y-10">
              {journeyCards.map((item, idx) => {
                const Icon = item.icon;
                const isRight = idx % 2 === 1;

                const Card = (
                  <div
                    className={`relative w-full bg-card border ${
                      idx === 1 ? 'border-primary/25' : 'border-border/50'
                    } rounded-2xl p-6 md:p-7 shadow-xl`}
                  >
                    {/* Top-left icon like reference */}
                    <div className="absolute -top-4 left-6 w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-xl flex items-center justify-center border border-primary/30">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="pt-4">
                      <p className="text-xs text-primary font-semibold tracking-widest uppercase">{item.year}</p>
                      <p className="mt-2 text-foreground font-semibold">{item.title}</p>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center"
                  >
                    {/* Left */}
                    <div className={`${isRight ? 'md:opacity-0 md:pointer-events-none' : ''}`}>
                      {!isRight ? Card : <div className="hidden md:block" />}
                    </div>

                    {/* Center timeline marker */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-card border border-primary/30 shadow-2xl flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      </div>
                    </div>

                    {/* Right */}
                    <div className={`${!isRight ? 'md:opacity-0 md:pointer-events-none' : ''}`}>
                      {isRight ? Card : <div className="hidden md:block" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Leadership message (text left, director image right) ── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Leadership Message</p>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-foreground">
              About the <span className="text-primary italic">Director</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-card border border-border/50 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="lg:col-span-3 p-8 lg:p-10">
              <div className="w-10 h-0.5 bg-primary mb-6" />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                A note from leadership
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Ananya Realty Advisory LLP was built on one simple belief: property decisions should feel confident,
                  transparent, and truly premium. We focus on clarity, due diligence, and a client-first process.
                </p>
                <p>
                  Our team curates opportunities, validates details, and stays close to you from the first conversation
                  to the final paperwork—so you can move forward with peace of mind.
                </p>
                <p>
                  Thank you for trusting us with one of life’s biggest decisions. We’re honored to be part of your
                  journey.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/30">
                <p className="text-foreground font-semibold">Ananya Gupta</p>
                <p className="text-xs text-muted-foreground">Managing Director, Ananya Realty Advisory LLP</p>
              </div>
            </div>

            <div className="lg:col-span-2 relative bg-obsidian-light border-t lg:border-t-0 lg:border-l border-border/40">
              <img
                src={DIRECTOR_IMG}
                alt="Director"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-md border border-primary/20 rounded-2xl p-4">
                <p className="text-sm font-semibold text-foreground">Client-first. Detail-driven. Always transparent.</p>
                <p className="text-xs text-muted-foreground mt-1">That’s the standard we hold ourselves to.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Why Choose Ananya (3 cards) ── */}
      <section className="py-20 px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Why Choose Ananya
            </p>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-foreground">
              Built for a <span className="text-primary italic">Premium</span> Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyChoose.map((c, i) => {
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative rounded-2xl bg-card border border-primary/25 px-7 pt-10 pb-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Number badge (top-center) */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-xl shadow-primary/20 border border-primary/30">
                    {i + 1}
                  </div>

                  <h3 className="text-center font-heading text-lg font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-center text-sm text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}