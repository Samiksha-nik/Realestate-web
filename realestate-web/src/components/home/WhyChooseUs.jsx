import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Gem, Clock, Handshake, Star, Users, ArrowUpRight } from 'lucide-react';

const features = [
  { icon: Star,      title: 'Excellence',         desc: 'We set the gold standard in real estate advisory, delivering excellence in every interaction and transaction.' },
  { icon: Handshake, title: 'Client First',        desc: 'Your vision is our mission. Every recommendation is tailored to your unique lifestyle and investment goals.' },
  { icon: Users,     title: 'Expert Team',         desc: 'Our seasoned professionals bring decades of combined market knowledge and industry expertise to serve you.' },
  { icon: Gem,       title: 'Curated Selection',   desc: 'Handpicked properties meeting the highest standards of luxury, design, and investment potential.' },
  { icon: Clock,     title: 'End-to-End Support',  desc: 'From property search to final documentation, we guide you at every step of your real estate journey.' },
  { icon: Shield,    title: 'Trusted Expertise',   desc: 'Over a decade of premium real estate advisory with an impeccable track record clients rely on.' },
];

// 6 icon positions evenly around a circle
// Container = 420px, orbit radius = 210px (edge of container)
const CONTAINER = 420;
const ICON_SIZE = 60;
const ORBIT_R = CONTAINER / 2; // place icons on the border of the circle
const RING_BORDER = 1;
const DOT_SIZE = 8;
const iconAngles = [270, 330, 30, 90, 150, 210]; // degrees, top then clockwise

function polarToPx(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  const cx = CONTAINER / 2;
  const cy = CONTAINER / 2;
  return {
    left: cx + ORBIT_R * Math.cos(rad) - ICON_SIZE / 2,
    top:  cy + ORBIT_R * Math.sin(rad) - ICON_SIZE / 2,
  };
}

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const [dotRotation, setDotRotation] = useState(iconAngles[0] - 270);

  const handleSetActive = (index) => {
    const targetRotation = iconAngles[index] - 270;
    let nextRotation = targetRotation;

    // Keep motion in one direction by moving forward in full turns.
    while (nextRotation < dotRotation) {
      nextRotation += 360;
    }

    setDotRotation(nextRotation);
    setActive(index);
  };

  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-4">
            Why Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Why Choose Ananya Realty
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base">
            We don't just find properties — we craft personalized real estate experiences tailored to your aspirations.
          </p>
        </motion.div>

        {/* Two-column: orbit left, narrative + CTA right */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">

          {/* ── Left: Orbit diagram ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[55%] flex flex-col items-center"
          >
            {/* Orbit canvas — fixed 420×420 px so polar math is exact */}
            <div style={{ position: 'relative', width: CONTAINER, height: CONTAINER }}>

              {/* Orbit ring — sits exactly at the edge */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: `${RING_BORDER}px solid rgba(197,163,88,0.2)`,
              }} />

              {/* Center circle */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.35 }}
                    className="text-center"
                    style={{ width: 230 }}
                  >
                    <div className="px-4 text-center">
                      <p className="text-foreground font-heading text-lg font-semibold leading-tight">
                        {features[active].title}
                      </p>
                      <div className="mx-auto mt-3 h-[2px] w-14 rounded-full bg-primary/80" />
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {features[active].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Revolving indicator dot that stays on the orbit line */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                initial={false}
                animate={{ rotate: dotRotation }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '50% 50%' }}
              >
                <div
                  className="absolute rounded-full bg-primary shadow-lg shadow-primary/60"
                  style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    left: '50%',
                    // Keep dot center aligned to the ring's stroke center.
                    top: RING_BORDER / 2,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </motion.div>

              {/* Orbiting icons — placed exactly on the circle border */}
              {features.map((f, i) => {
                const pos = polarToPx(iconAngles[i]);
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSetActive(i)}
                    type="button"
                    style={{ position: 'absolute', left: pos.left, top: pos.top, width: ICON_SIZE, height: ICON_SIZE }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      style={{ width: ICON_SIZE, height: ICON_SIZE }}
                      className={`rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-md ${
                        isActive
                          ? 'bg-primary border-primary shadow-primary/30'
                          : 'bg-card border-border/60 hover:border-primary/60 hover:bg-primary/10'
                      }`}
                    >
                      <f.icon className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    </motion.div>
                  </button>
                );
              })}
            </div>

            {/* Spacer under orbit */}
            <div className="mt-8" />

            {/* Dot indicators */}
            <div className="flex items-center gap-2 mt-5">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSetActive(i)}
                  type="button"
                  className={`rounded-full transition-all duration-300 ${
                    active === i ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-border hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Right: narrative spotlight + services CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[45%] flex flex-col gap-5 lg:pt-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-card via-card to-obsidian p-8 shadow-2xl shadow-black/30"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/12 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/5 blur-2xl"
                aria-hidden
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-px w-8 bg-primary/60" aria-hidden />
                  Partner-led advisory
                </span>
                <h3 className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-foreground leading-snug">
                  Strategy, narrative, and transaction discipline—before the first site visit.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  We stitch together mandate thinking, marketing craft, and closure mechanics so developers and
                  investors see one coherent story—from positioning decks to possession-ready handovers.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {['Mandate & positioning', 'Sales-room enablement', 'Channel & CRM', 'Documentation clarity'].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-foreground/90"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <Link
                to="/services"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 px-5 py-4 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:from-primary/15"
              >
                <span>
                  See how we structure mandates, marketing, and advisory{' '}
                  <span className="text-primary">across the full journey</span>.
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform group-hover:translate-x-0.5">
                  Services
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}