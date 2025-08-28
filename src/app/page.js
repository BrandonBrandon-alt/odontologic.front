import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ClinicCarouselSection from "../components/Home/ClinicCarouselSection";
import FeaturedServicesSection from "@/components/Home/FeaturedServicesSection";
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";

function Home() {
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          <ClinicCarouselSection />
          <FeaturedServicesSection />
          <WhyChooseUsSection />
        </div>
      </div>
    </div>
  );
}

export default Home;
