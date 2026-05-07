import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight, Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';
import houseImage from '../../assets/home-removebg-preview.png';
import companyLogo from '@/assets/ananya_logo_enhanced 4x.png';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Footer() {
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
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 sm:gap-3 max-w-2xl"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="w-full h-11 rounded-md bg-background border border-border/70 px-4 text-sm text-foreground outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="h-11 w-11 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer */}
        <div className="-mt-12 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-border/30">
            {/* Brand + Follow us */}
            <div className="lg:col-span-3 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/30">
              <img
                src={companyLogo}
                alt="Ananya Realty Advisory LLP"
                className="h-20 w-auto"
              />
              <p className="mt-1 text-sm text-muted-foreground">Your trusted property partner</p>

              <p className="mt-7 text-foreground font-semibold">Follow Us</p>
              <div className="mt-4 flex items-center gap-2">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-border/50 bg-background hover:border-primary hover:text-primary transition-all flex items-center justify-center" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links + About */}
            <div className="lg:col-span-6 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/30">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm font-semibold text-foreground">
                {quickLinks.slice(0, 6).map((link) => (
                  <Link key={link.path} to={link.path} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
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
                  <span>20-G, Malad Industrial Estates, C wing, Kanchpada Lane, Mumbai 400064.</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>Phone: (+91) 77189 25572</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>info@ananyarealty.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}