import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import companyLogo from '@/assets/ananya_logo_enhanced 4x.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Our Services', path: '/services' },
  { label: 'Careers', path: '/careers' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Header({ onEnquire }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isNavActive = (path) => {
    if (path === '/careers') {
      return location.pathname === '/careers' || location.pathname.startsWith('/careers/');
    }
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/90 backdrop-blur-xl border-b border-gold/10 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 lg:py-2.5">
            {/* Logo — clip extra transparent padding in asset; keeps visual size, shorter bar */}
            <Link to="/" className="inline-flex h-14 lg:h-16 shrink-0 items-center overflow-hidden leading-none">
              <img
                src={companyLogo}
                alt="Ananya Realty Advisory LLP"
                className="h-24 lg:h-28 w-auto max-w-none object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isNavActive(link.path)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isNavActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => (typeof onEnquire === 'function' ? onEnquire() : null)}
                className="hidden lg:flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <Phone className="w-4 h-4" />
                Enquire Now
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-foreground"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl pt-[5.5rem] px-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-4 text-2xl font-heading border-b border-border/30 transition-colors ${
                      isNavActive(link.path)
                        ? 'text-primary'
                        : 'text-foreground/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (typeof onEnquire === 'function') onEnquire();
                }}
                className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full"
              >
                <Phone className="w-4 h-4" />
                Enquire Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}