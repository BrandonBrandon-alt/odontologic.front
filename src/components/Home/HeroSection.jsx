"use client";

import React from "react";
import { motion } from "framer-motion";
// 1. Importa tu componente DentalButton
//    Asegúrate de que la ruta del archivo sea la correcta en tu proyecto.
import DentalButton from "../ui/Button";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// Se mantienen las variantes para la animación de entrada del botón
const buttonContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.6 },
  },
};

function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(540px, 100vh - 72px, 880px)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="full-bleed-bg bg-gradient-primary dark:bg-gradient-primary-dark absolute inset-0 -z-10" />
      <div className="hero-overlay" />

      <div className="relative z-10 layout-container text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 sm:mb-8 tracking-tight"
          style={{ textShadow: "0px 4px 10px rgba(0,0,0,0.35)" }}
          variants={itemVariants}
        >
          Sonrisas que Inspiran,
          <span className="block mt-1">Cuidados que Transforman</span>
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 mb-10 sm:mb-14 max-w-3xl md:max-w-4xl mx-auto font-light"
          style={{ textShadow: "0px 2px 6px rgba(0,0,0,0.35)" }}
          variants={itemVariants}
        >
          En Odontologic combinamos tecnología de vanguardia y calidez humana
          para brindarte una experiencia dental excepcional en el corazón de
          Armenia, Quindío.
        </motion.p>

        {/* 2. Reemplaza el botón anterior por DentalButton */}
        {/*
                  - El motion.div se conserva para la animación de entrada.
                  - Se eliminan las props `whileHover` y `whileTap` del div, ya que DentalButton
                    maneja sus propias animaciones de interacción gracias a Framer Motion.
                */}
        <motion.div variants={buttonContainerVariants}>
          <DentalButton
            variant="primary"
            size="xl"
            rounded="full"
            aria-label="Agendar una cita gratis"
            onClick={() => alert("Redirigiendo a la agenda de citas...")}
            className="shadow-xl shadow-primary-900/20 hover:shadow-primary-900/30"
          >
            ¡Agenda tu cita gratis!
          </DentalButton>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
