import React, { useState, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AnimatePresence } from 'framer-motion';
import EnquiryModal from '@/components/shared/EnquiryModal';
import WhatsAppFloatingButton from '@/components/shared/WhatsAppFloatingButton';

export default function Layout() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const openEnquiry = () => setEnquiryOpen(true);
  const location = useLocation();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    root.scrollTop = 0;
    root.style.scrollBehavior = prev;
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {enquiryOpen && (
          <EnquiryModal
            title="Enquire Now"
            onClose={() => setEnquiryOpen(false)}
          />
        )}
      </AnimatePresence>

      <Header onEnquire={openEnquiry} />
      <main>
        <Outlet context={{ openEnquiry }} />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}