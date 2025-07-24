"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";

const ThemeToggleButton = ({
  className = "",
  size = "default",
  variant = "default",
}) => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  // Configuraciones de tamaño
  const sizeConfig = {
    sm: {
      button: "p-2",
      icon: 16,
      container: "w-8 h-8",
    },
    default: {
      button: "p-2.5",
      icon: 20,
      container: "w-10 h-10",
    },
    lg: {
      button: "p-3",
      icon: 24,
      container: "w-12 h-12",
    },
  };

  // Configuraciones de variante
  const variantConfig = {
    default: {
      base: "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30",
      hover: "hover:bg-white/70 dark:hover:bg-gray-700/70 hover:shadow-lg",
      active: "active:scale-95",
    },
    glass: {
      base: "bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/20",
      hover:
        "hover:bg-white/20 dark:hover:bg-gray-800/30 hover:shadow-xl hover:border-white/30 dark:hover:border-gray-600/40",
      active: "active:scale-98",
    },
    solid: {
      base: "bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-dental-md",
      hover:
        "hover:bg-interactive dark:hover:bg-interactive-dark hover:shadow-lg",
      active: "active:scale-95",
    },
    gradient: {
      base: "bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm border border-primary-500/30",
      hover:
        "hover:from-primary-500/30 hover:to-accent-500/30 hover:shadow-lg hover:shadow-primary-500/20",
      active: "active:scale-95",
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  // Animaciones mejoradas
  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: isDarkMode ? -5 : 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.95,
      rotate: isDarkMode ? 5 : -5,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };

  const iconVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      filter: "brightness(1)",
    },
    hover: {
      scale: 1.1,
      rotate: isDarkMode ? -15 : 15,
      filter: "brightness(1.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.9,
      rotate: isDarkMode ? 360 : -360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const glowVariants = {
    light: {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: [0, 0.6, 0],
        scale: [0.8, 1.2, 0.8],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    dark: {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: [0, 0.4, 0],
        scale: [0.8, 1.1, 0.8],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  const backgroundGlowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect background */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${currentSize.container} ${
          isDarkMode
            ? "bg-gradient-to-br from-orange-400/20 to-yellow-400/20"
            : "bg-gradient-to-br from-blue-400/20 to-purple-400/20"
        } blur-sm`}
        variants={backgroundGlowVariants}
        initial="initial"
        whileHover="hover"
      />

      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`
          relative ${currentSize.button} ${currentSize.container} rounded-xl 
          ${currentVariant.base} ${currentVariant.hover} ${currentVariant.active}
          text-foreground dark:text-foreground-dark
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-transparent
          group overflow-hidden
        `}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        aria-label={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}
        title={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}
      >
        {/* Efecto de brillo al hacer hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        {/* Glow effect para el icono */}
        <motion.div
          className={`absolute inset-0 rounded-xl ${
            isDarkMode
              ? "bg-gradient-to-br from-orange-400/30 to-yellow-400/30"
              : "bg-gradient-to-br from-blue-400/30 to-purple-400/30"
          } blur-md`}
          variants={glowVariants[isDarkMode ? "light" : "dark"]}
          initial="initial"
          animate="animate"
        />

        {/* Contenedor del icono */}
        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDarkMode ? "sun" : "moon"}
              initial={{
                y: -30,
                opacity: 0,
                rotate: -180,
                scale: 0.5,
              }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                y: 30,
                opacity: 0,
                rotate: 180,
                scale: 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.4,
              }}
              className="flex items-center justify-center"
            >
              <motion.div
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                {isDarkMode ? (
                  <Sun
                    size={currentSize.icon}
                    className="text-orange-400 dark:text-yellow-400 drop-shadow-sm"
                    strokeWidth={2.5}
                  />
                ) : (
                  <Moon
                    size={currentSize.icon}
                    className="text-slate-600 dark:text-blue-300 drop-shadow-sm"
                    strokeWidth={2.5}
                  />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicador de estado */}
        <motion.div
          className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
            isDarkMode ? "bg-orange-400" : "bg-blue-400"
          } shadow-sm`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
};

export default ThemeToggleButton;
