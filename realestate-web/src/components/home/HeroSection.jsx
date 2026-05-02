import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const HERO_IMG = 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/f4f74c667_generated_59d107ca.png';

export default function HeroSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    toast.success("We'll get back to you shortly!");
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Luxury real estate" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/60 to-obsidian/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              Your Gateway
              <br />
              to Premium
              <br />
              <span className="text-primary italic">Properties</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 text-base text-foreground/70 max-w-sm leading-relaxed"
            >
              Discover carefully curated luxury properties and landmark developments that inspire modern living.
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-12 flex items-center gap-8"
            >
              {[
                { value: '2,500+', label: 'Happy Families' },
                { value: '150+', label: 'Projects' },
                { value: '12+', label: 'Years' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-foreground/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Enquiry Form Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-md ml-auto"
          >
            <div className="bg-card/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-border/40">
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
                    className="bg-background border-border/50 focus:border-primary h-11 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Contact No.</label>
                  <div className="flex items-center h-11 rounded-md bg-background border border-border/50 focus-within:border-primary transition-colors overflow-hidden">
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

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
                  <Textarea
                    placeholder="Tell us about your property requirements..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="bg-background border-border/50 focus:border-primary resize-none text-sm"
                  />
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