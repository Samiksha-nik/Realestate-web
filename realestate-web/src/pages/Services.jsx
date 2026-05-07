import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, FileText, Handshake, Search, ShieldCheck, Wallet } from "lucide-react";

const HERO_IMG =
  "https://media.base44.com/images/public/69ec59b100bb0a337662905c/73a173d2e_generated_8e2ae378.png";

const services = [
  {
    title: "Property Discovery",
    desc: "Curated shortlists based on your budget, lifestyle, and location preferences—so you see only what fits.",
    icon: Search,
  },
  {
    title: "Site Visits & Comparisons",
    desc: "Assisted visits, side-by-side comparisons, and honest pros/cons to help you choose with clarity.",
    icon: BadgeCheck,
  },
  {
    title: "Negotiation & Closure",
    desc: "We negotiate for the best value and align timelines—then guide you through closing seamlessly.",
    icon: Handshake,
  },
  {
    title: "Legal Due Diligence",
    desc: "Title checks, document verification, and RERA compliance to ensure your purchase stays protected.",
    icon: ShieldCheck,
  },
  {
    title: "Documentation Support",
    desc: "From agreements to registrations—we coordinate the paperwork so you can move fast with confidence.",
    icon: FileText,
  },
  {
    title: "Investment Advisory",
    desc: "ROI-focused guidance on micro-markets, entry timing, and exit strategy for long-term wealth creation.",
    icon: Wallet,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-28 lg:pt-32 pb-14 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Our Services"
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/65 via-obsidian/75 to-background" />
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 border border-primary/20 text-xs font-semibold tracking-widest uppercase text-primary">
              Featured Services
            </span>
            <h1 className="mt-6 font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
              Our <span className="text-primary italic">Services</span>
            </h1>
            <p className="mt-5 text-foreground/70 text-sm md:text-base leading-relaxed">
              A premium, end-to-end advisory experience—from discovery to documentation—built to make every decision
              feel clear and confident.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Services</p>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-foreground">
              A wide range of <span className="text-primary italic">real estate</span> services
            </h2>
            <p className="mt-4 text-muted-foreground text-sm md:text-base">
              Everything you need—shortlisting, visits, negotiation, legal checks, and paperwork—under one roof.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.05 }}
                  className="group relative rounded-2xl bg-card border border-border/50 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />

                  <div className="relative p-7">
                    <div className="w-12 h-12 rounded-2xl bg-background border border-primary/25 shadow-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary border border-border/60 text-muted-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300"
                        aria-label="Learn more"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

