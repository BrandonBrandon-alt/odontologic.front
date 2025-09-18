"use client";
import React from "react";
import { motion } from "framer-motion";
import DentalButton from "../ui/Button";

/**
 * Animation variant for the main container
 * Controls the overall fade-in and stagger timing for child elements
 */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Animation variant for fade-in-up effect with scale
 * Used for title and main content elements
 */
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

/**
 * Animation variant for fade-in with scale effect
 * Used for buttons and interactive elements with a delay
 */
const fadeInScale = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      delay: 0.3,
      mass: 0.8,
    },
  },
};

/**
 * Professional Hero Component
 *
 * @param {Object} props
 * @param {string[]} props.titleLines - Array of title lines
 * @param {string} props.subtitle - Subtitle text
 * @param {Object} props.primary - Primary CTA button config
 * @param {Array} props.secondary - Secondary action buttons
 * @param {Array} props.chips - Feature chips/badges
 * @param {string} props.minHeight - Minimum height (default: 100vh)
 * @param {'center'|'left'} props.align - Text alignment
 * @param {'gradient'|'solid'|'image'} props.variant - Background variant
 * @param {string} props.backgroundImage - Background image URL (for image variant)
 * @param {string} props.customBg - Custom background classes
 * @param {boolean} props.fullHeight - Use full viewport height
 * @param {React.ReactNode} props.decorativeElements - Additional decorative elements
 */
export default function ProfessionalHero({
  titleLines = [],
  subtitle,
  primary,
  secondary = [],
  chips = [],
  minHeight,
  align = "center",
  variant = "gradient", // 'gradient' | 'solid' | 'image'
  backgroundImage,
  customBg,
  fullHeight = true,
  decorativeElements,
}) {
  /**
   * Determines alignment classes based on the align prop
   */
  const alignClasses =
    align === "left"
      ? "text-left items-start justify-start"
      : "text-center items-center justify-center";

  /**
   * Determines height classes based on fullHeight and minHeight props
   */
  const heightClass = fullHeight
    ? "min-h-screen"
    : minHeight
    ? `min-h-[${minHeight}]`
    : "min-h-[80vh]";

  /**
   * Returns appropriate background classes based on variant and customBg
   * @returns {string} Background CSS classes
   */
  const getBackgroundClasses = () => {
    if (customBg) return customBg;

    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-primary-500 via-accent-500 to-primary-500 dark:from-primary-500 dark:via-accent-500 dark:to-slate-900";
      case "solid":
        return "bg-primary-700 dark:bg-slate-900";
      case "image":
        return backgroundImage ? "" : "bg-slate-900";
      default:
        return "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-slate-900";
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className={`
        relative overflow-hidden w-full ${heightClass}
        flex flex-col ${alignClasses}
        ${getBackgroundClasses()}
      `}
    >
      {/* Background Image (if variant is 'image') */}
      {variant === "image" && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Background Overlay - Professional gradients and textures */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Decorative geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating geometric shapes */}
        {/* First floating circle with subtle animation */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-white/5 dark:bg-white/3 blur-sm"
        />

        {/* Second floating square with opposite animation */}
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 right-[15%] w-24 h-24 rounded-lg bg-white/4 dark:bg-white/2 blur-sm rotate-45"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex flex-col ${alignClasses} space-y-8 lg:space-y-12`}
          >
            {/* Main Title */}
            {titleLines.length > 0 && (
              <motion.div variants={fadeInUp} className="space-y-2">
                <h1 className="font-black tracking-tight leading-[0.9] text-white drop-shadow-2xl">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                    {titleLines.map((line, index) => (
                      <motion.span
                        key={index}
                        variants={fadeInUp}
                        className={`
                          block
                          ${index > 0 ? "mt-2 lg:mt-4" : ""}
                          ${
                            index === titleLines.length - 1
                              ? "bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent"
                              : ""
                          }
                        `}
                      >
                        {line}
                      </motion.span>
                    ))}
                  </span>
                </h1>
              </motion.div>
            )}

            {/* Subtitle */}
            {subtitle && (
              <motion.div
                variants={fadeInUp}
                className={`max-w-4xl ${align === "center" ? "mx-auto" : ""}`}
              >
                <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-white/90 drop-shadow-lg">
                  {subtitle}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            {(primary || secondary.length > 0) && (
              <motion.div
                variants={fadeInScale}
                className={`
                  flex flex-col sm:flex-row gap-4 sm:gap-6 
                  ${align === "center" ? "justify-center" : "justify-start"}
                `}
              >
                {/* Primary CTA Button */}
                {primary && (
                  <HeroAction
                    {...primary}
                    primary
                    className="transform hover:scale-105 transition-all duration-200 shadow-2xl shadow-black/25 hover:shadow-black/40"
                  />
                )}
                {/* Secondary Action Buttons */}
                {secondary.map((action, index) => (
                  <HeroAction
                    key={index}
                    {...action}
                    className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-200"
                  />
                ))}
              </motion.div>
            )}

            {/* Feature Chips */}
            {chips.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className={`
                  flex flex-wrap gap-3 sm:gap-4
                  ${align === "center" ? "justify-center" : "justify-start"}
                `}
                aria-label="Características destacadas"
              >
                {chips.map((chip, index) => (
                  <motion.span
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="
                      px-4 py-2 rounded-full text-sm font-medium
                      bg-white/15 backdrop-blur-sm border border-white/30
                      text-white/95 shadow-lg
                      hover:bg-white/20 hover:border-white/40 
                      transition-all duration-200
                      flex items-center gap-2
                    "
                  >
                    {chip}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Custom Decorative Elements */}
            {decorativeElements && (
              <motion.div variants={fadeInUp} className="mt-8">
                {decorativeElements}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </motion.section>
  );
}

/**
 * Hero Action Button Component
 * 
 * @param {Object} props
 * @param {string} props.label - Button text
 * @param {string} props.href - Link URL (optional)
 * @param {Function} props.onClick - Click handler (optional)
 * @param {React.ReactNode} props.icon - Button icon (optional)
 * @param {string} props.ariaLabel - Accessibility label (optional)
 * @param {boolean} props.primary - Whether this is the primary button
 * @param {string} props.className - Additional CSS classes
 */
function HeroAction({
  label,
  href,
  onClick,
  icon,
  ariaLabel,
  primary,
  className = "",
}) {
  /**
   * Base CSS classes for the button based on primary/secondary variant
   */
  const baseClasses = primary
    ? "bg-white text-primary-400 hover:bg-white/95 font-semibold px-8 py-4 rounded-full text-lg shadow-xl"
    : `bg-transparent text-white border-2 border-white/40 hover:bg-white/10 font-medium px-6 py-3 rounded-lg ${className}`;

  /**
   * Button element with DentalButton component
   */
  const button = (
    <DentalButton
      variant={primary ? "primary" : "outline"}
      size={primary ? "xl" : "lg"}
      onClick={onClick}
      aria-label={ariaLabel || label}
      icon={icon}
      className={`${baseClasses} transition-all duration-300 ease-out`}
    >
      {label}
    </DentalButton>
  );

  // If href is provided, wrap button in anchor tag
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="inline-block"
      >
        {button}
      </a>
    );
  }

  // Return standalone button
  return button;
}
