import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Facebook, Instagram, Linkedin } from 'lucide-react';

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
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-12 items-center">
            <div className="lg:col-span-2">
              <img
                src="https://media.base44.com/images/public/user_69eb92ed8599861a01a632b2/f64fdb319_image.png"
                alt="Ananya Realty Advisory LLP"
                className="h-16 w-auto"
              />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">
                Subscribe to receive curated property updates, new launches, and premium opportunities.
              </p>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
                Get updates on our latest <span className="text-primary italic">listings</span>
              </h3>
              <p className="mt-2 text-sm text-foreground/60">
                No spam. Only relevant updates. Unsubscribe anytime.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full h-11 rounded-full bg-background border border-border/50 px-5 text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-3 text-xs text-muted-foreground">
                By subscribing, you agree to our privacy policy.
              </p>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand + socials */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-lg text-foreground mb-4">Ananya Realty Advisory LLP</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Guiding your property journey with expertise, integrity, and a commitment to finding your perfect space.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-lg text-foreground mb-5">Company</h4>
            <ul className="space-y-3">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-lg text-foreground mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Schedule a Call</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">All Projects</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-foreground mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@ananyarealty.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Ananya Realty Advisory LLP. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Use</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Legal</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
}