import React from 'react';
import { useOutletContext } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTASection from '../components/home/CTASection';

export default function Home() {
  const { openEnquiry } = useOutletContext() || {};

  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <WhyChooseUs />
      <CTASection onConsultation={openEnquiry} />
    </>
  );
}