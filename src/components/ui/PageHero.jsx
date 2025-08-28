"use client";
import React from "react";
import { motion } from "framer-motion";
import DentalButton from "./Button";

// Variantes compartidas (alineadas con el Hero de Home)
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

const buttonContainerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12, delay: 0.55 },
  },
};

/**
 * PageHero
 * Props:
 * - headingLines: string[]  (cada línea del título principal)
 * - subtitle?: string
 * - primaryAction?: { label: string; onClick?: () => void; href?: string; ariaLabel?: string; variant?: string; }
 * - secondaryActions?: Array<{ label: string; onClick?: () => void; href?: string; ariaLabel?: string; variant?: string; icon?: React.ReactNode }>
 * - minHeightClamp?: string  (permite override del clamp de altura)
 * - children?: ReactNode  (contenido extra debajo del subtitle / acciones: chips, badges, etc.)
 */
export default function PageHero({
  headingLines = [],
  subtitle,
  primaryAction,
  secondaryActions = [],
  minHeightClamp = "clamp(540px, 100vh - 72px, 880px)",
  children,
}) {
  return (
    <motion.section
      className="relative overflow-hidden"
      style={{ minHeight: minHeightClamp }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="full-bleed-bg bg-gradient-primary dark:bg-gradient-primary-dark absolute inset-0 -z-10" />
      <div className="hero-overlay" />

      <div className="relative z-10 layout-container text-center">
        {headingLines.length > 0 && (
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 sm:mb-8 tracking-tight"
            style={{ textShadow: "0px 4px 10px rgba(0,0,0,0.35)" }}
            variants={itemVariants}
          >
            {headingLines.map((line, i) => (
              <span key={i} className={i === 0 ? undefined : "block mt-1"}>
                {line}
              </span>
            ))}
          </motion.h1>
        )}

        {subtitle && (
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 mb-8 sm:mb-12 max-w-3xl md:max-w-4xl mx-auto font-light"
            style={{ textShadow: "0px 2px 6px rgba(0,0,0,0.35)" }}
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        )}

        {(primaryAction || secondaryActions.length > 0) && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6"
            variants={buttonContainerVariants}
          >
            {primaryAction && (
              <ActionButton key="primary" action={primaryAction} primary />
            )}
            {secondaryActions.map((act, idx) => (
              <ActionButton key={idx} action={act} />
            ))}
          </motion.div>
        )}

        {children && (
          <motion.div
            variants={itemVariants}
            className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

function ActionButton({ action, primary = false }) {
  const { label, onClick, href, ariaLabel, variant, icon } = action;
  const content = (
    <DentalButton
      variant={variant || (primary ? "primary" : "secondary")}
      size={primary ? "xl" : "lg"}
      rounded={primary ? "full" : undefined}
      aria-label={ariaLabel || label}
      onClick={onClick}
      className={
        primary
          ? "shadow-xl shadow-primary-900/20 hover:shadow-primary-900/30"
          : "border-2 border-white text-white font-medium backdrop-blur-sm hover:bg-white/10"
      }
      icon={icon}
    >
      {label}
    </DentalButton>
  );
  if (href) {
    // Usamos <a> simple; en páginas lo envolverán con Next <Link> si hace falta navegar internamente
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
  return content;
}
