import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Handshake, Megaphone, Users } from 'lucide-react';

const faqCategories = [
  { label: 'General Company', icon: HelpCircle },
  { label: 'Developer & Mandate', icon: Handshake },
  { label: 'Marketing & Advisory', icon: Megaphone },
  { label: 'Partnership & Process', icon: Users },
];

const faqs = {
  'General Company': [
    {
      q: 'What does Ananya Realty Advisory LLP specialize in?',
      a: 'We specialize in real estate sales mandates, strategic project marketing, and advisory services for developers across Mumbai, Thane, and Navi Mumbai.',
    },
    {
      q: 'Is Ananya Realty Advisory LLP a property brokerage firm?',
      a: 'No. We operate as a professional mandate and advisory firm focused on project marketing, sales strategy, and developer partnerships rather than traditional retail brokerage.',
    },
    {
      q: 'Which regions do you serve?',
      a: 'We currently serve Mumbai, Thane, and Navi Mumbai markets.',
    },
    {
      q: 'Who founded the company?',
      a: 'The company is founded and managed by Deepak Tripathi, bringing 16+ years of sales and marketing expertise in the real estate industry.',
    },
  ],
  'Developer & Mandate': [
    {
      q: 'What is an exclusive sales mandate?',
      a: 'An exclusive sales mandate means we partner directly with developers to manage and execute focused sales and marketing strategies for specific projects.',
    },
    {
      q: 'How does your mandate model benefit developers?',
      a: 'Our mandate model ensures dedicated marketing efforts, CRM support with payment collection, centralized lead management, stronger market positioning, and streamlined customer handling.',
    },
    {
      q: 'Do you work with both residential and commercial projects?',
      a: 'Yes, we work across residential and commercial real estate segments.',
    },
    {
      q: 'Can developers outsource complete project marketing to your team?',
      a: 'Yes. We provide end-to-end project marketing solutions including branding, digital campaigns, site activations, and customer management.',
    },
  ],
  'Marketing & Advisory': [
    {
      q: 'What marketing services do you provide?',
      a: 'We offer strategic project positioning, digital marketing campaigns, launch planning, lead generation, branding, and market advisory services.',
    },
    {
      q: 'Do you help with pricing and market strategy?',
      a: 'Yes. We provide strategic advisory services including market analysis, pricing strategy, and competitive positioning.',
    },
    {
      q: 'How do you generate project leads?',
      a: 'We use a combination of digital marketing, channel partner networks, strategic campaigns, and on-ground activations to drive qualified enquiries.',
    },
    {
      q: 'Do you assist in project launches?',
      a: 'Yes. We support developers with launch strategy, promotions, campaign execution, and customer outreach at highly competitive rates.',
    },
  ],
  'Partnership & Process': [
    {
      q: 'How can developers partner with Ananya Realty Advisory LLP?',
      a: 'Developers can connect with us directly to discuss project mandates, marketing requirements, and sales objectives.',
    },
    {
      q: 'What makes your approach different?',
      a: 'Our approach is built on transparency, strategic execution, ethical practices, and long-term developer relationships—with a one-stop solution for sales collection and CRM.',
    },
    {
      q: 'Do you manage the customer journey as well?',
      a: 'Yes. From enquiry generation to customer coordination and support, we manage the end-to-end customer process professionally.',
    },
    {
      q: 'Why should developers choose a mandate-based advisory partner?',
      a: 'A mandate-based model ensures focused attention, accountability, consistent branding, and dedicated sales execution for the project.',
    },
  ],
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General Company');
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl font-semibold text-foreground"
          >
            Frequently Asked
            <br />
            <span className="text-primary italic">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-lg mx-auto"
          >
            Can't find what you're looking for?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Reach out to our friendly team
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-4 sticky top-20 z-30 bg-background/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setActiveCategory(cat.label);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === cat.label
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                <cat.icon className="w-4 h-4 shrink-0" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {faqs[activeCategory].map((faq, i) => (
                <div key={`${activeCategory}-${i}`} className="border-b border-border/30">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className="font-medium text-foreground text-base pr-8 group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                        openIndex === i ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-muted-foreground leading-relaxed text-sm">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
