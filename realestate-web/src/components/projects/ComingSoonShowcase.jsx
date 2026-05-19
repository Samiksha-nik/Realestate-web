import React from 'react';
import { motion } from 'framer-motion';
import previewBuilding from '@/assets/image.png';

export default function ComingSoonShowcase({ onViewSoldOut, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full overflow-hidden shadow-black/50 ${
        compact
          ? 'h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl'
          : 'rounded-3xl border border-primary/20 shadow-2xl'
      }`}
    >
      {/* City skyline atmosphere */}
      <motion.div
        className="absolute inset-0 bg-[#05070d]"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(30, 58, 120, 0.35) 0%, transparent 55%),
              radial-gradient(ellipse 60% 40% at 80% 20%, rgba(197, 163, 88, 0.08) 0%, transparent 50%),
              linear-gradient(180deg, #0a0e18 0%, #05070d 45%, #020308 100%)
            `,
          }}
        />
        {/* City light streaks */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 48px,
              rgba(100, 180, 255, 0.03) 48px,
              rgba(100, 180, 255, 0.06) 49px
            )`,
          }}
          aria-hidden
        />
        {[12, 28, 45, 62, 78, 88].map((left) => (
          <div
            key={left}
            className="absolute bottom-0 w-px bg-gradient-to-t from-blue-400/30 via-cyan-300/15 to-transparent"
            style={{ left: `${left}%`, height: `${35 + (left % 3) * 12}%` }}
            aria-hidden
          />
        ))}
      </motion.div>

      {/* Building reveal — right */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[58%] sm:w-[52%] lg:w-[48%] z-[1]"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#05070d]/20 to-[#05070d]/80 z-10 pointer-events-none" />
        <img
          src={previewBuilding}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          aria-hidden
        />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#05070d] to-transparent z-10 ${
            compact ? 'h-16' : 'h-32'
          }`}
          aria-hidden
        />
      </motion.div>

      {/* Velvet curtain — left */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[52%] sm:w-[48%] z-[2] pointer-events-none"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.1 }}
      >
        {/* Main drape */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(105deg,
                #4a0812 0%,
                #7a1220 18%,
                #9e1a2e 38%,
                #b81e35 52%,
                #8f1528 68%,
                #5c0d18 85%,
                #3a0810 100%
              )`,
            clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)',
            boxShadow: 'inset -24px 0 48px rgba(0,0,0,0.45), 12px 0 40px rgba(0,0,0,0.35)',
          }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Fold highlights */}
        {[18, 32, 48, 64].map((left, i) => (
          <motion.div
            key={left}
            className="absolute top-0 bottom-0 w-[14%] opacity-60"
            style={{
              left: `${left}%`,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,120,140,0.12), rgba(0,0,0,0.25))',
            }}
            animate={{ opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        ))}
        {/* Sheen */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(165deg, rgba(255,200,210,0.15) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 78% 100%, 0 100%)',
          }}
          aria-hidden
        />
      </motion.div>

      {/* Top vignette + content */}
      <div
        className={`relative z-[3] flex flex-col items-center text-center px-4 sm:px-6 ${
          compact ? 'pt-8 sm:pt-10 pb-16 sm:pb-20' : 'px-6 pt-12 sm:pt-14 pb-[min(42vw,320px)] sm:pb-56 lg:pb-64'
        }`}
      >
        <motion.h2
          className={`font-heading font-semibold tracking-wide ${
            compact ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
          }`}
          style={{
            background: 'linear-gradient(180deg, #f0ddb0 0%, #c5a358 45%, #8b7340 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 12px rgba(197, 163, 88, 0.35))',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          COMING SOON
        </motion.h2>

        <motion.p
          className={`text-foreground/75 leading-relaxed ${
            compact
              ? 'mt-2 sm:mt-3 max-w-sm text-[11px] sm:text-xs line-clamp-2'
              : 'mt-5 max-w-md text-sm sm:text-base'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Our next mandate is on the way. A new experience is being unveiled-stay tuned for what&apos;s behind the curtain.
        </motion.p>

        {typeof onViewSoldOut === 'function' && (
          <motion.button
            type="button"
            onClick={onViewSoldOut}
            className={`font-medium rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors ${
              compact ? 'mt-3 sm:mt-4 px-4 py-1.5 text-[11px] sm:text-xs' : 'mt-8 px-6 py-2.5 text-sm'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            View successfully sold out projects
          </motion.button>
        )}
      </div>

      {/* Bottom fade into page */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent z-[4] pointer-events-none ${
          compact ? 'h-8' : 'h-16'
        }`}
        aria-hidden
      />
    </motion.div>
  );
}
