"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { useAuth } from "../../../context/AuthContext";
import useScrollDirection from "../../../hooks/useScrollDirection";

// Importa los subcomponentes
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserAuthSection from "./UserAuthSection";
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
import NotificationBanner from "./NotificationBanner";
import ThemeToggleButton from "../ThemeToggleButton";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const { loading, error, message, clearError, clearMessage } = useAuth();
  const { isVisible } = useScrollDirection(pathname, {
    topOffset: 80,
    hideDeltaThreshold: 18, // un poco más tolerante
    showOnRouteChangeDelay: 450,
    minAccumulatedScrollToHide: 180, // exige desplazamiento real antes de poder ocultar
  });

  const navVariants = {
    hidden: {
      y: -120,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      },
    },
    hiddenScroll: {
      y: -120,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        duration: 0.3,
      },
    },
    visibleScroll: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Manejo del focus al abrir/cerrar menú móvil
  useEffect(() => {
    if (isMenuOpen) {
      lastFocusedElementRef.current = document.activeElement;
    } else if (lastFocusedElementRef.current && !isMenuOpen) {
      // Pequeño delay para que la animación termine
      setTimeout(() => {
        menuButtonRef.current?.focus();
      }, 300);
    }
  }, [isMenuOpen]);

  // Manejo de la tecla Escape para cerrar el menú
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Loading state
  if (loading) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-primary-500/20">
          <div className="h-full bg-primary-500 animate-pulse"></div>
        </div>
        <div className="fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border dark:border-border-dark">
          <div className="container mx-auto flex justify-between items-center h-full px-4">
            {/* Logo skeleton */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse"></div>
              <div className="h-6 w-24 sm:w-32 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            </div>

            {/* Desktop skeleton */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Mobile skeleton */}
            <div className="md:hidden flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Notification Banner */}
      <NotificationBanner
        error={error}
        message={message}
        clearError={clearError}
        clearMessage={clearMessage}
      />

      {/* Main Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-border dark:border-border-dark shadow-sm"
        initial="hidden"
        // Mantener visible si el menú móvil está abierto para evitar 'salto' o desplazamiento visual
        animate={
          isMenuOpen
            ? "visibleScroll"
            : isVisible
            ? "visibleScroll"
            : "hiddenScroll"
        }
        variants={navVariants}
        data-menu-open={isMenuOpen ? "true" : "false"}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/3 via-transparent to-accent-500/3 pointer-events-none"></div>

        <div className="container mx-auto flex justify-between items-center py-3 sm:py-4 px-4 relative">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavLinks />

            {/* Separator */}
            <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-transparent via-border dark:via-border-dark to-transparent opacity-50"></div>

            <UserAuthSection />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggleButton />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                relative p-2.5 rounded-xl backdrop-blur-sm shadow-md
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50
                transition-all duration-200
                ${
                  isMenuOpen
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-white/60 dark:bg-gray-800/60 text-foreground dark:text-foreground-dark hover:bg-white/80 dark:hover:bg-gray-800/80"
                }
              `}
              aria-label={
                isMenuOpen
                  ? "Cerrar menú de navegación"
                  : "Abrir menú de navegación"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu-panel"
              ref={menuButtonRef}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </motion.div>

              {/* Active indicator */}
              {isMenuOpen && (
                <motion.div
                  className="absolute inset-0 bg-primary-600 rounded-xl -z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu fuera del <nav> para evitar stacking context por transforms */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        panelId="mobile-menu-panel"
      />

      {/* Spacer para evitar que el contenido se superponga */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;
