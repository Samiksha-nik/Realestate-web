import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Gem, Clock, Handshake, Star, Users, Award, MapPinned, Scale, Target } from 'lucide-react';

const advantageCards = [
  {
    icon: Award,
    title: 'Proven Results',
    desc: 'Our portfolio of 10+ successful projects demonstrates our ability to deliver exceptional outcomes consistently.',
  },
  {
    icon: MapPinned,
    title: 'Market Knowledge',
    desc: 'Deep understanding of Mumbai, Thane, and Navi Mumbai markets ensures informed strategies.',
  },
  {
    icon: Scale,
    title: 'Ethical Approach',
    desc: 'We build long-term relationships through transparency, integrity, and honest dealings.',
  },
  {
    icon: Target,
    title: 'Consistent Performance',
    desc: 'Demonstrated ability to deliver value and achieve sales targets, with a portfolio of 10+ successfully marketed projects spanning residential and commercial sectors.',
  },
];

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
            We don't just find properties - we craft personalized real estate experiences tailored to your aspirations.
          </p>
        </motion.div>

        {/* Two-column: orbit left, strategic advantages right */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* ── Left: Orbit diagram ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[55%] flex flex-col items-center shrink-0"
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

          {/* ── Right: horizontal cards stacked to match orbit height (CONTAINER) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[45%] flex flex-col min-w-0"
          >
            <div className="shrink-0 mb-4 lg:mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Our edge</p>
              <h3 className="mt-1 font-heading text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-tight">
                Our Strategic Advantages
              </h3>
            </div>

            <div className="flex flex-col gap-3 w-full lg:h-[420px] lg:max-h-[420px] min-h-0">
              {advantageCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group flex flex-1 min-h-0 flex-row items-center gap-3 sm:gap-4 rounded-xl border border-primary/25 bg-card/70 px-3 py-2.5 sm:px-4 sm:py-3 shadow-xl shadow-black/30 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:bg-card hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary sm:h-11 sm:w-11">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <h4 className="font-heading text-sm font-semibold text-foreground leading-tight">{item.title}</h4>
                    <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-3 sm:line-clamp-none">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}