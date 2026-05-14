import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { careerJobs } from '@/data/careers';

const categories = ['All Job Category', 'Manager'];
const types = ['All Job Type', 'Full Time'];
const locations = ['All Job Location', 'Maharashtra, Mumbai'];

export default function Careers() {
  const [cat, setCat] = useState(categories[0]);
  const [typ, setTyp] = useState(types[0]);
  const [loc, setLoc] = useState(locations[0]);

  const filtered = careerJobs.filter((j) => {
    if (cat !== 'All Job Category' && j.category !== cat) return false;
    if (typ !== 'All Job Type' && j.type !== typ) return false;
    if (loc !== 'All Job Location' && j.location !== loc) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-wide uppercase">
            Current Openings
          </h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto">
            Join our mandate and advisory team. Explore open roles below and apply with your details.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-3">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-11 min-w-[180px] rounded-md border border-border/60 bg-card px-3 text-sm text-foreground outline-none focus:border-primary"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={typ}
            onChange={(e) => setTyp(e.target.value)}
            className="h-11 min-w-[160px] rounded-md border border-border/60 bg-card px-3 text-sm text-foreground outline-none focus:border-primary"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="h-11 min-w-[200px] rounded-md border border-border/60 bg-card px-3 text-sm text-foreground outline-none focus:border-primary"
          >
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 rounded-2xl border border-border/40 bg-card/30 overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground text-sm">No openings match your filters.</p>
          ) : (
            filtered.map((job, i) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-6 md:px-8 ${
                  i < filtered.length - 1 ? 'border-b border-border/30' : ''
                }`}
              >
                <div className="min-w-0">
                  <p className="font-heading text-lg font-semibold text-foreground">{job.title}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 shrink-0">
                  <div className="text-right sm:text-right">
                    <p className="text-xs font-medium text-foreground/90">{job.category}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.location}</p>
                  </div>
                  <Link
                    to={`/careers/${job.slug}`}
                    className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    More Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
