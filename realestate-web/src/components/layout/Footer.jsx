import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';
import { FORM_TYPES } from '@/lib/emailService';
import { useWebsiteFormSubmit } from '@/hooks/useWebsiteFormSubmit';
import { SOCIAL_LINKS, WHATSAPP_NUMBER, getWhatsAppUrl } from '@/constants/social';
import houseImage from '../../assets/home-removebg-preview.png';
import companyLogo from '@/assets/ananya_logo_enhanced 4x.png';

const primaryLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Our Services', path: '/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'Testimonials', path: '/testimonials' },
];

const secondaryLinks = [
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

const FOOTER_CONTACT = {
  addressLines: [
    'B wing, F-133, 1st Floor',
    'Express Zone Mall, Off Western Express Highway',
    'Goregaon East, Mumbai 400097',
  ],
  phone: '+91 98675 35431',
  phoneTel: '+919867535431',
  emails: ['info@ananyarealty.com', 'ananyarealtyadvisoryllp@gmail.com'],
  whatsapp: WHATSAPP_NUMBER,
};

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { submit, sending } = useWebsiteFormSubmit({
    formType: FORM_TYPES.NEWSLETTER,
    successMessage: "You're subscribed! Check your inbox for a confirmation.",
    onSuccess: () => setNewsletterEmail(''),
  });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    await submit({
      fields: { Email: newsletterEmail },
      userEmail: newsletterEmail,
    });
  };

  return (
    <footer className="bg-obsidian-light border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10 lg:pt-20 lg:pb-12">
        {/* Newsletter card */}
        <div className="relative z-30 overflow-visible rounded-[12px] border border-primary/25 bg-gradient-to-r from-[#141414] via-[#191919] to-[#141414] shadow-2xl">

          {/* House image: 80% inside card, 20% outside */}
          <img
            src={houseImage}
            alt="House"
            className="pointer-events-none hidden sm:block absolute left-10 lg:left-14 top-0 h-[180px] lg:h-[208px] w-auto object-contain drop-shadow-[0_26px_36px_rgba(0,0,0,0.45)] -translate-y-[23%] z-22"
          />

          <div className="relative z-10 px-6 py-8 md:px-10 lg:px-12 lg:py-10 lg:pl-[315px] flex min-h-[176px] flex-col justify-center">
            <h3 className="font-heading text-2xl md:text-[44px] leading-[1.05] font-semibold text-foreground">
              Subscribe our newsletter
            </h3>
            <p className="mt-1 text-sm text-foreground/80 max-w-xl">
              Receive regular updates about new projects and premium property launches.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-4 flex items-center gap-2 sm:gap-3 max-w-2xl"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full h-11 rounded-md bg-background border border-border/70 px-4 text-sm text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={sending}
                className="h-11 w-11 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-70"
                aria-label="Subscribe"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main footer */}
        <div className="-mt-12 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-border/30">
            {/* Brand + Follow us */}
            <div className="lg:col-span-3 pt-8 pb-8 pr-8 pl-0 lg:pt-10 lg:pb-10 lg:pr-10 lg:pl-0 border-b lg:border-b-0 lg:border-r border-border/30">
              <div className="inline-flex h-14 lg:h-16 shrink-0 items-center overflow-hidden leading-none">
                <img
                  src={companyLogo}
                  alt="Ananya Realty Advisory LLP"
                  className="h-24 lg:h-28 w-auto max-w-none object-contain object-left"
                />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Where Exclusive Mandates Meet Strategic Excellence</p>

              <p className="mt-7 text-foreground font-semibold">Follow Us</p>
              <div className="mt-4 flex items-center gap-2">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links + About */}
            <div className="lg:col-span-6 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/30">
              <nav
                className="flex justify-center w-full text-sm font-semibold text-foreground"
                aria-label="Footer navigation"
              >
                {/* Mobile: two straight rows */}
                <div className="flex flex-col items-center gap-3 sm:hidden w-full">
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {primaryLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-x-5">
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="hover:text-primary transition-colors whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* sm+: 6-column grid — row 1 all links, row 2 FAQ + Contact under Projects & Services */}
                <div
                  className="hidden sm:grid gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-3 justify-items-center"
                  style={{ gridTemplateColumns: 'repeat(6, max-content)' }}
                >
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="hover:text-primary transition-colors whitespace-nowrap row-start-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to={secondaryLinks[0].path}
                    className="hover:text-primary transition-colors whitespace-nowrap col-start-3 row-start-2"
                  >
                    {secondaryLinks[0].label}
                  </Link>
                  <Link
                    to={secondaryLinks[1].path}
                    className="hover:text-primary transition-colors whitespace-nowrap col-start-4 row-start-2"
                  >
                    {secondaryLinks[1].label}
                  </Link>
                </div>
              </nav>
              <div className="mt-8">
                <h5 className="font-heading text-3xl text-foreground">About Us</h5>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-xl">
                  Guiding your property journey with expertise and integrity, we help you discover spaces that match your lifestyle and long-term goals.
                </p>
              </div>
            </div>

            {/* Contact + mini form */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <div className="space-y-5 text-sm text-muted-foreground">
                <p className="flex items-start gap-3 leading-relaxed">
                  <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>
                    {FOOTER_CONTACT.addressLines.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < FOOTER_CONTACT.addressLines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href={`tel:${FOOTER_CONTACT.phoneTel}`} className="hover:text-primary transition-colors">
                    {FOOTER_CONTACT.phone}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="flex flex-col gap-1">
                    {FOOTER_CONTACT.emails.map((addr) => (
                      <a key={addr} href={`mailto:${addr}`} className="hover:text-primary transition-colors break-all">
                        {addr}
                      </a>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}