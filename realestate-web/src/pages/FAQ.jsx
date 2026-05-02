import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Home, IndianRupee, FileText, Shield } from 'lucide-react';

const faqCategories = [
  { label: 'General', icon: HelpCircle },
  { label: 'Buying', icon: Home },
  { label: 'Investment', icon: IndianRupee },
  { label: 'Legal', icon: FileText },
];

const faqs = {
  General: [
    { q: 'What services does Ananya Realty Advisory LLP offer?', a: 'We offer comprehensive real estate advisory services including property search, investment consulting, documentation support, legal verification, and end-to-end transaction management for residential and commercial properties.' },
    { q: 'How long has Ananya Realty been in the industry?', a: 'Ananya Realty Advisory LLP has been serving clients for over 12 years, helping thousands of families and investors find their ideal properties across Mumbai and Maharashtra.' },
    { q: 'Do you charge any consultation fees?', a: 'Initial consultations are completely free. We believe in building relationships first. Our fees are transparent and only applicable upon successful property transactions.' },
    { q: 'Which areas do you operate in?', a: 'We primarily operate across Mumbai Metropolitan Region including Bandra, Worli, Powai, Thane, Navi Mumbai, and extend our services to Pune and Lonavala for premium properties.' },
    { q: 'How do I schedule a site visit?', a: 'You can schedule a site visit by calling us, emailing us, or filling out the contact form on our website. Our team will coordinate and confirm a convenient time for you, and we also offer virtual tours for select properties.' },
    { q: 'Do you deal in both residential and commercial properties?', a: 'Yes, we deal in a wide range of properties including luxury apartments, villas, penthouses, townships, and select commercial spaces across Mumbai and Maharashtra.' },
    { q: 'Can NRIs invest in Indian real estate through Ananya Realty?', a: 'Absolutely. We have dedicated NRI advisory services to help Non-Resident Indians invest in Indian real estate. We guide you through the RBI guidelines, FEMA regulations, and ensure a smooth investment process from anywhere in the world.' },
    { q: 'What makes Ananya Realty different from other agencies?', a: 'Our differentiator is a deeply personalized advisory approach. We don\'t just list properties — we understand your lifestyle, goals, and budget to curate the best options. Our after-sales support and legal assistance also set us apart.' },
  ],
  Buying: [
    { q: 'How do I start the property buying process?', a: 'Simply reach out to us through our contact page or call us. We\'ll schedule a consultation to understand your requirements, budget, and preferences, then curate a selection of matching properties for you.' },
    { q: 'Can you help with home loans?', a: 'Yes, we have tie-ups with leading banks and financial institutions. Our team assists you in getting the best interest rates and guides you through the entire loan application process.' },
    { q: 'What documents do I need to buy a property?', a: 'Typically you\'ll need identity proof (Aadhaar, PAN), address proof, income documents, bank statements, and passport-size photographs. We provide a detailed checklist based on your specific transaction.' },
    { q: 'How long does the entire buying process take?', a: 'The timeline depends on the type of property and financing. A ready-to-move-in property with a cash purchase can close in 4-6 weeks. With a home loan, it typically takes 8-12 weeks. Under-construction properties follow the builder\'s possession timeline.' },
    { q: 'Can I negotiate the price with the builder or seller?', a: 'Yes, and our experienced negotiation team works on your behalf to secure the best possible price and terms. We have established relationships with leading builders that often result in exclusive pricing and added benefits for our clients.' },
    { q: 'What is the difference between a ready-to-move and under-construction property?', a: 'Ready-to-move properties allow immediate possession and you can see exactly what you\'re buying. Under-construction properties are generally priced lower, offer more customization options, but involve a waiting period. We help you evaluate both based on your needs.' },
    { q: 'Are there any hidden charges I should be aware of?', a: 'Beyond the base price, buyers should budget for stamp duty (5-6%), registration charges (1%), GST on under-construction properties, maintenance deposits, and society charges. We provide a full cost breakdown upfront so there are no surprises.' },
    { q: 'What is carpet area vs. built-up area vs. super built-up area?', a: 'Carpet area is the actual usable floor space. Built-up area includes walls and ducts. Super built-up area includes common areas like lobbies, staircases, and amenities. RERA mandates transactions to be based on carpet area, which we strictly follow.' },
  ],
  Investment: [
    { q: 'Is real estate a good investment option?', a: 'Real estate has historically been one of the most stable investment options in India, offering both capital appreciation and rental income. Our advisors help you identify properties with the best ROI potential.' },
    { q: 'What kind of returns can I expect?', a: 'Returns vary by location and property type. Premium Mumbai properties have shown 8-15% annual appreciation. We provide detailed market analysis and projections for every investment opportunity.' },
    { q: 'Do you manage rental properties?', a: 'While our primary focus is advisory, we connect you with trusted property management partners who can handle tenant sourcing, rent collection, and maintenance.' },
    { q: 'Which locations in Mumbai offer the best investment potential right now?', a: 'Areas like Bandra-Kurla Complex, Lower Parel, Powai, and the upcoming infrastructure corridors in Thane and Navi Mumbai currently offer strong investment potential. We provide location-specific research reports to help you decide.' },
    { q: 'What is the minimum investment required for a premium property?', a: 'Premium properties in Mumbai typically start from ₹1.5 Cr and above depending on the location. We have options across a wide range of budgets and can help identify the best entry point for your investment goals.' },
    { q: 'How does real estate compare to stocks and mutual funds?', a: 'Real estate offers tangible assets, regular rental income, leverage through loans, and tax benefits — making it a complementary investment to equities. For long-term wealth creation and stability, a diversified portfolio including real estate is widely recommended.' },
    { q: 'Are there tax benefits to investing in real estate?', a: 'Yes, homebuyers benefit from deductions under Section 80C (principal repayment up to ₹1.5L), Section 24(b) (interest up to ₹2L), and Section 80EEA for first-time buyers. We work with tax advisors to maximize your benefits.' },
    { q: 'What is the expected rental yield in Mumbai?', a: 'Mumbai\'s rental yields typically range from 2% to 4% annually depending on the locality and property type. Premium localities like Bandra and Worli tend to command higher rents, and furnished properties can achieve even better yields.' },
  ],
  Legal: [
    { q: 'Do you verify property documents?', a: 'Absolutely. Our legal team conducts thorough due diligence including title verification, encumbrance checks, RERA compliance verification, and builder background checks.' },
    { q: 'What is RERA and why is it important?', a: 'RERA (Real Estate Regulatory Authority) is a government body that protects homebuyers\' interests. We only recommend RERA-registered projects, ensuring your investment is legally protected.' },
    { q: 'How long does the property registration process take?', a: 'Typically 2-4 weeks from agreement to registration. Our documentation team handles the entire process, including stamp duty payment and registration at the Sub-Registrar office.' },
    { q: 'What is an Agreement for Sale and why is it important?', a: 'An Agreement for Sale is a legally binding document between buyer and seller outlining property details, payment terms, possession date, and penalties. It must be registered and protects both parties\' interests throughout the transaction.' },
    { q: 'What is an Occupancy Certificate (OC) and why do I need it?', a: 'An OC is issued by the municipal authority confirming the building was constructed as per approved plans and is safe for occupation. Without an OC, the property is technically illegal to occupy and can affect home loan eligibility.' },
    { q: 'What checks should I do before buying a resale property?', a: 'For resale properties, you should verify the title chain (minimum 30 years), encumbrance certificate, property tax receipts, society NOC, original purchase documents, and ensure no pending litigation. Our legal team handles all of this for you.' },
    { q: 'What is stamp duty and how is it calculated?', a: 'Stamp duty is a state government tax paid on property transactions. In Maharashtra, it is 5-6% of the property\'s market value or agreement value (whichever is higher). Women buyers get a 1% concession on stamp duty.' },
    { q: 'Can I cancel a property purchase after signing the agreement?', a: 'Under RERA, buyers can cancel a purchase for developer defaults or delays, with a right to full refund plus interest. For buyer-initiated cancellations, the terms depend on the agreement. We help you understand your rights before signing.' },
  ],
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">FAQ</span>
          </div>
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
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => { setActiveCategory(cat.label); setOpenIndex(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === cat.label
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground border border-border/50'
                }`}
              >
                <cat.icon className="w-4 h-4" />
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
                <div key={i} className="border-b border-border/30">
                  <button
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