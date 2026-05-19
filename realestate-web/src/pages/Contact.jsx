import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Linkedin, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FORM_TYPES } from '@/lib/emailService';
import { useWebsiteFormSubmit } from '@/hooks/useWebsiteFormSubmit';
import { SOCIAL_LINKS, WHATSAPP_NUMBER, getWhatsAppUrl } from '@/constants/social';

const HERO_IMG = 'https://media.base44.com/images/public/69ec59b100bb0a337662905c/c256a5ab2_generated_74effe14.png';

const CONTACT = {
  addressLines: [
    'B wing, F-133, 1st Floor',
    'Express Zone Mall, Off Western Express Highway',
    'Goregaon East, Mumbai 400097',
  ],
  phone: '+91 98675 35431',
  phoneTel: '+919867535431',
  emails: ['info@ananyarealty.com', 'ananyarealtyadvisoryllp@gmail.com'],
  website: 'https://www.ananyarealty.com',
  websiteUrl: 'https://www.ananyarealty.com',
  whatsapp: WHATSAPP_NUMBER,
  /** Same address as Contact Information — pins Goregaon office, not other Express Zone locations */
  mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(
    'B wing, F-133, 1st Floor, Express Zone Mall, Off Western Express Highway, Goregaon East, Mumbai 400097'
  )}&hl=en&z=17&output=embed`,
};

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const { submit, sending } = useWebsiteFormSubmit({
    formType: FORM_TYPES.CONTACT,
    successMessage: "Message sent! We've also emailed you a confirmation.",
    onSuccess: () => setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = `${form.firstName} ${form.lastName}`.trim();
    await submit({
      fields: {
        'First Name': form.firstName,
        'Last Name': form.lastName,
        Email: form.email,
        Phone: form.phone ? `+91 ${form.phone}` : '',
        Message: form.message,
      },
      userEmail: form.email,
      userName,
    });
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero Banner ── */}
      <section className="relative h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Contact Us" className="w-full h-full object-cover brightness-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/45 to-obsidian/55" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">Contact Us</h1>
        </motion.div>
      </section>

      {/* ── Get In Touch ── */}
      <section className="py-16 text-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">Get In Touch</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed px-6">
            We're always here to chat! Reach out to us with any questions or concerns you may have, and our expert team will be happy to guide your property journey towards the perfect outcome.
          </p>
        </motion.div>
      </section>

      {/* ── Full-width Map ── */}
      <div className="w-full h-[380px] overflow-hidden">
        <iframe
          title="Ananya Realty Location"
          src={CONTACT.mapEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── Form + Contact Info Card ── */}
      <section className="py-0 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-16 relative z-10 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden shadow-2xl"
          >

            {/* Left – Form */}
            <div className="lg:col-span-3 bg-card p-8 lg:p-10 border border-border/50 lg:border-r-0 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
              <div className="w-8 h-0.5 bg-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">Drop us a Line</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">First Name</label>
                    <Input
                      placeholder="David"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required
                      className="bg-background border-border/40 focus:border-primary h-10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Last Name</label>
                    <Input
                      placeholder="Miller"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      required
                      className="bg-background border-border/40 focus:border-primary h-10 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      placeholder="davidmiller@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="bg-background border-border/40 focus:border-primary h-10 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Contact No.</label>
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
                        placeholder="XXXXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="flex-1 h-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
                  <Textarea
                    placeholder="Tell us about your requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-background border-border/40 focus:border-primary resize-none text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right – Contact Info */}
            <div className="lg:col-span-2 bg-obsidian-lighter p-8 lg:p-10 border border-border/50 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl flex flex-col">
              <div className="w-8 h-0.5 bg-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-8">Contact Information</h3>

              <div className="space-y-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Address</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      {CONTACT.addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Phone</p>
                    <a
                      href={`tel:${CONTACT.phoneTel}`}
                      className="text-foreground text-sm hover:text-primary transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Email</p>
                    <div className="flex flex-col gap-1.5">
                      {CONTACT.emails.map((addr) => (
                        <a
                          key={addr}
                          href={`mailto:${addr}`}
                          className="text-foreground text-sm hover:text-primary transition-colors break-all"
                        >
                          {addr}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Website</p>
                    <a
                      href={CONTACT.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground text-sm hover:text-primary transition-colors"
                    >
                      {CONTACT.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-10 pt-6 border-t border-border/30">
                <div className="flex items-center gap-3">
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300">
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground text-muted-foreground transition-all duration-300">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}