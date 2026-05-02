import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}