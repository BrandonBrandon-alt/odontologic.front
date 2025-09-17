"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * ProfilePageLayout
 * Reutilizable para páginas de perfil (paciente, doctor, admin) con estética similar a LoginForm.
 * Props:
 *  - role: string ("user" | "dentist" | "admin") para textos contextuales.
 *  - title: string principal.
 *  - subtitle: string secundario.
 *  - children: contenido (formularios) renderizado en panel derecho.
 */
export default function ProfilePageLayout({ role, title, subtitle, children }) {
  const roleLabel =
    role === "admin"
      ? "Administrador"
      : role === "dentist"
      ? "Doctor"
      : "Paciente";

  // Variantes de animación reutilizables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const panelVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100vh-5rem)] w-full flex items-center justify-center px-4 sm:px-6 py-10"
    >
      <div className="relative bg-[var(--color-primary)] dark:bg-[var(--color-surface)] rounded-xl shadow-[var(--shadow-dental-xl)] w-full max-w-7xl overflow-hidden md:flex md:min-h-[640px]">
        {/* Panel Izquierdo Imagen / Mensaje */}
        <motion.div
          variants={imageVariants}
          className="hidden md:block md:w-5/12 relative overflow-hidden"
        >
          <Image
            src="/Register.png"
            alt={`Perfil ${roleLabel}`}
            fill
            sizes="(max-width: 768px) 0, 40vw"
            quality={60}
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-accent/70" />
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white z-10">
            <div className="max-w-sm">
              <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                Gestiona tu Perfil
              </h2>
              <p className="text-lg font-light opacity-90 leading-relaxed">
                Mantén tu información actualizada y protege la seguridad de tu
                cuenta.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Panel Derecho Contenido */}
        <motion.div
          variants={panelVariants}
          className="w-full md:w-7/12 flex flex-col justify-start bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-l md:border-l-2 border-border dark:border-border-dark px-5 py-10 sm:px-8 md:py-12 lg:px-14 xl:px-16 space-y-8"
        >
          <header className="space-y-3 text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {title} <span className="font-light">({roleLabel})</span>
            </h1>
            {subtitle && (
              <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
                {subtitle}
              </p>
            )}
          </header>
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-8 grid-cols-1 lg:grid-cols-3"
            >
              {/* children se espera contenga 2 bloques (perfil y contraseña) */}
              <div className="lg:col-span-2 space-y-8">
                {children?.[0] || children}
              </div>
              <div className="lg:col-span-1 space-y-8">{children?.[1]}</div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
