import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FORM_TYPES } from '@/lib/emailService';
import { useWebsiteFormSubmit } from '@/hooks/useWebsiteFormSubmit';
import heroImage from '@/assets/herosection.png';

const HERO_IMG = heroImage;

export default function HeroSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const { submit, sending } = useWebsiteFormSubmit({
    formType: FORM_TYPES.HERO_ENQUIRY,
    successMessage: "Enquiry sent! We've also emailed you a confirmation.",
    onSuccess: () => setForm({ name: '', email: '', phone: '' }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit({
      fields: {
        Name: form.name,
        Email: form.email,
        Phone: form.phone ? `+91 ${form.phone}` : '',
      },
      userEmail: form.email,
      userName: form.name,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Luxury real estate"
          className="w-full h-full object-cover object-[50%_38%] lg:object-center brightness-[1.28]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_0%_0%,rgba(255,255,255,0.32),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-[5.5rem] pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:mt-10"
          >
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              Your Trusted Partner for
              <br />
              Exclusive Project
              <br />
              <span className="text-primary italic">Mandates</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-base text-foreground/70 max-w-sm leading-relaxed"
            >
              Connecting developers with strategic sales, premium marketing, and qualified buyers through exclusive real estate mandate partnerships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

          </motion.div>

          {/* ── Right: Enquiry Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-sm ml-auto lg:mt-10"
          >
            <div className="bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-border/40">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Enquire Now</h3>
              <p className="text-muted-foreground text-xs mb-6">Get in touch with our property experts</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
                  <Input
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-background border-border/50 focus:border-primary h-10 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="bg-background border-border/50 focus:border-primary h-10 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Contact No.</label>
                  <div className="flex items-center h-10 rounded-md bg-background border border-border/50 focus-within:border-primary transition-colors overflow-hidden">
                    <div className="flex items-center gap-2 px-3 text-muted-foreground text-sm select-none">
                      <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="shrink-0 rounded-sm overflow-hidden">
                        <rect width="18" height="12" fill="#FF9933" />
                        <rect y="4" width="18" height="4" fill="#FFFFFF" />
                        <rect y="8" width="18" height="4" fill="#128807" />
                        <circle cx="9" cy="6" r="1.3" fill="none" stroke="#000080" strokeWidth="0.7" />
                      </svg>
                      <span className="text-foreground/80 font-medium">+91</span>
                    </div>
                    <div className="h-7 w-px bg-border/40" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="XXXXXXXXXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                      className="flex-1 h-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 text-sm mt-2"
                >
                  {sending
                    ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    : <><Send className="w-4 h-4" /> Submit Enquiry</>
                  }
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}