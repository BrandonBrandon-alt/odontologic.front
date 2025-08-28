"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("../ui/Carousel"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "clamp(260px, 55vh, 560px)" }}
      className="w-full animate-pulse bg-gray-200 dark:bg-neutral-800 rounded-2xl"
      aria-label="Cargando carrusel de imágenes de la clínica"
    />
  ),
});

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

function ClinicCarouselSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] mb-8 sm:mb-12 drop-shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          Conoce Nuestra Clínica
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <Carousel aria-label="Galería de imágenes de la clínica" />
        </motion.div>
      </div>
    </section>
  );
}

export default ClinicCarouselSection;
