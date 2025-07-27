import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ClinicCarouselSection from "../components/Home/ClinicCarouselSection";
import FeaturedServicesSection from "@/components/Home/FeaturedServicesSection";
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";

function Home() {
  return (
    <div className="min-h-screen text-[var(--color-text-dark)] font-inter">
      <HeroSection />
      <ClinicCarouselSection />
      <FeaturedServicesSection />
      <WhyChooseUsSection />
    </div>
  );
}

export default Home;
