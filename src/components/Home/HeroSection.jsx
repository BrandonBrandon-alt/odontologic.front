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
      className="relative w-screen left-1/2 -ml-[50vw] bg-gradient-primary dark:bg-gradient-primary-dark to-accent-500 text-white py-36 md:py-56 flex items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 80px)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative z-10 container mx-auto text-center px-6">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8 tracking-tight"
          style={{ textShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}
          variants={itemVariants}
        >
          Sonrisas que Inspiran, Cuidados que Transforman
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl opacity-90 mb-16 max-w-4xl mx-auto font-light"
          style={{ textShadow: "0px 2px 6px rgba(255, 255, 255, 0.95)" }}
          variants={itemVariants}
        >
          En Odontologic, combinamos la última tecnología con un toque humano
          para ofrecerte una experiencia dental excepcional en el corazón de
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
            variant="primary" // Usa la variante principal para un CTA destacado
            size="xl" // Un tamaño grande para mayor impacto
            rounded="full" // Totalmente redondeado como el diseño original// Activa el efecto de brillo para llamar la atención
            onClick={() => alert("Redirigiendo a la agenda de citas...")} // Acción de ejemplo
          >
            ¡Agenda tu cita gratis!
          </DentalButton>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
