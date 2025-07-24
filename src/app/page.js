import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ClinicCarouselSection from "../components/Home/ClinicCarouselSection";
import FeaturedServicesSection from "@/components/Home/FeaturedServicesSection";

function Home() {
  return (
    <div className="min-h-screen text-[var(--color-text-dark)] font-inter">
      <HeroSection />
      <ClinicCarouselSection />
      <FeaturedServicesSection />
      {/* Puedes agregar más secciones aquí si es necesario */}
    </div>
  );
}

export default Home;
