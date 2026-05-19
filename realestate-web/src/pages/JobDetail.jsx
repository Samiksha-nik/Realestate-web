import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { FORM_TYPES } from '@/lib/emailService';
import { useWebsiteFormSubmit } from '@/hooks/useWebsiteFormSubmit';
import { getJobBySlug } from '@/data/careers';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function JobDetail() {
  const { jobSlug } = useParams();
  const job = getJobBySlug(jobSlug);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    consent: false,
  });
  const [fileName, setFileName] = useState('');
  const [fileKey, setFileKey] = useState(0);
  const [thanksOpen, setThanksOpen] = useState(false);
  const thanksTimerRef = useRef(null);
  const formRef = useRef(null);

  const { submit, sending } = useWebsiteFormSubmit({
    formType: FORM_TYPES.CAREER,
    showSuccessToast: false,
    onSuccess: () => {
      setForm({ fullName: '', email: '', phone: '', coverLetter: '', consent: false });
      setFileName('');
      setFileKey((k) => k + 1);
      setThanksOpen(true);
      thanksTimerRef.current = setTimeout(() => {
        setThanksOpen(false);
        thanksTimerRef.current = null;
      }, 5500);
    },
  });

  const closeThanks = () => {
    setThanksOpen(false);
    if (thanksTimerRef.current) {
      clearTimeout(thanksTimerRef.current);
      thanksTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (thanksTimerRef.current) clearTimeout(thanksTimerRef.current);
    };
  }, []);

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      toast.error('Please accept the data handling consent to continue.');
      return;
    }
    await submit({
      fields: {
        Position: job.title,
        'Full Name': form.fullName,
        Email: form.email,
        Phone: form.phone ? `+91 ${form.phone}` : '',
        'Cover Letter': form.coverLetter,
        'Resume File': fileName || 'Attached',
      },
      userEmail: form.email,
      userName: form.fullName,
      resumeFile: formRef.current?.querySelector('input[type="file"]')?.files?.[0] ?? null,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to openings
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-border/40 bg-card/40 p-8 md:p-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">{job.title}</h1>
          <p className="mt-2 text-sm text-primary">
            Ananya Realty Advisory LLP · {job.posted}
          </p>

          <div className="mt-6 space-y-2 text-sm text-foreground/90">
            {job.highlights.map((line) => (
              <p key={line} className="font-semibold">
                {line}
              </p>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="font-semibold text-foreground">Company Description</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{job.companyDescription}</p>
          </section>

          {job.roleDescription && (
            <section className="mt-8">
              <h2 className="font-semibold text-foreground">Role Description</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{job.roleDescription}</p>
            </section>
          )}

          <section className="mt-8">
            <h2 className="font-semibold text-foreground">Key Responsibilities</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm border border-primary bg-transparent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-semibold text-foreground">Requirements</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm border border-primary bg-transparent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-semibold text-foreground">Preferred Skills</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {job.preferredSkills.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm border border-primary bg-transparent" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 grid gap-2 text-sm border-t border-border/30 pt-8">
            <p>
              <span className="font-semibold text-foreground">Job Category:</span>{' '}
              <span className="text-muted-foreground">{job.category}</span>
            </p>
            <p>
              <span className="font-semibold text-foreground">Job Type:</span>{' '}
              <span className="text-muted-foreground">{job.type}</span>
            </p>
            <p>
              <span className="font-semibold text-foreground">Job Location:</span>{' '}
              <span className="text-muted-foreground">{job.location}</span>
            </p>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-10 rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8"
        >
          <h2 className="font-heading text-lg font-semibold text-foreground">Apply for this position</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Full Name <span className="text-primary">*</span>
              </label>
              <Input
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="bg-background border-border/50"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Email <span className="text-primary">*</span>
              </label>
              <Input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-background border-border/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Phone <span className="text-primary">*</span>
              </label>
              <div className="flex items-center h-10 rounded-md bg-background border border-border/40 focus-within:border-primary transition-colors overflow-hidden">
                <div className="flex items-center gap-2 px-3 text-muted-foreground text-sm select-none">
                  <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" className="shrink-0 rounded-sm overflow-hidden">
                    <rect width="18" height="12" fill="#FF9933" />
                    <rect y="4" width="18" height="4" fill="#FFFFFF" />
                    <rect y="8" width="18" height="4" fill="#128807" />
                    <circle cx="9" cy="6" r="1.3" fill="none" stroke="#000080" strokeWidth="0.7" />
                  </svg>
                  <span className="text-foreground/80 font-medium">+91</span>
                </div>
                <div className="h-6 w-px bg-border/40" />
                <input
                  type="tel"
                  inputMode="numeric"
                  required
                  placeholder="XXXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="flex-1 h-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Cover Letter <span className="text-primary">*</span>
              </label>
              <Textarea
                required
                rows={5}
                value={form.coverLetter}
                onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                className="bg-background border-border/50 resize-none"
                placeholder="Tell us why you are a fit for this role…"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Upload CV / Resume <span className="text-primary">*</span>
              </label>
              <input
                key={fileKey}
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="mt-1 text-xs text-muted-foreground">Allowed types: .pdf, .doc, .docx</p>
              {fileName ? <p className="mt-1 text-xs text-foreground/80">Selected: {fileName}</p> : null}
            </div>
            <label className="flex items-start gap-3 cursor-pointer text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-1 rounded border-border"
              />
              <span>
                By using this form you agree with the storage and handling of your data by this website.{' '}
                <span className="text-primary">*</span>
              </span>
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {sending ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {thanksOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Dismiss"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-obsidian/50 backdrop-blur-[2px]"
              onClick={closeThanks}
            />
            <div className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                role="dialog"
                aria-labelledby="job-thanks-title"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="pointer-events-auto relative w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl shadow-black/40"
              >
              <button
                type="button"
                onClick={closeThanks}
                className="absolute top-3 right-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex gap-4 pr-8">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 id="job-thanks-title" className="font-heading text-lg font-semibold text-foreground">
                    Thank you
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Thanks for sharing your details. We have received your application and will get back to you soon.
                  </p>
                </div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
