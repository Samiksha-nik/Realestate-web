import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AnimatePresence } from 'framer-motion';
import EnquiryModal from '@/components/shared/EnquiryModal';
import WhatsAppFloatingButton from '@/components/shared/WhatsAppFloatingButton';

export default function Layout() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const openEnquiry = () => setEnquiryOpen(true);

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