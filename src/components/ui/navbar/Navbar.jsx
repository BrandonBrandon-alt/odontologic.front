"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { useAuth } from "../../../context/AuthContext";
import useScrollDirection from "../../../hooks/useScrollDirection";

// Importa los nuevos subcomponentes
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserAuthSection from "./UserAuthSection";
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
import NotificationBanner from "./NotificationBanner";
import ThemeToggleButton from "../ThemeToggleButton"; // Mantenerlo aquí si es un componente global de la navbar

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loading, error, message, clearError, clearMessage } = useAuth();
  const { isVisible } = useScrollDirection();

  const navVariants = {
    hidden: { y: -120, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 20, mass: 0.8 },
    },
    hiddenScroll: {
      y: -120,
      opacity: 0,
      filter: "blur(8px)",
      transition: { type: "spring", stiffness: 150, damping: 25, duration: 0.3 },
    },
    visibleScroll: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 150, damping: 25, duration: 0.3 },
    },
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-surface/50 dark:bg-surface-dark/50 backdrop-blur-md animate-pulse">
        <div className="container mx-auto flex justify-between items-center h-full px-4">
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NotificationBanner error={error} message={message} clearError={clearError} clearMessage={clearMessage} />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b border-border dark:border-border-dark shadow-md"
        initial="hidden"
        animate={isVisible ? "visibleScroll" : "hiddenScroll"}
        variants={navVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none"></div>

        <div className="container mx-auto flex justify-between items-center py-3 px-4 relative">
          <Logo />

          {/* Menú de Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-border dark:via-border-dark to-transparent"></div>
            <UserAuthSection />
          </div>

          {/* Controles móviles */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggleButton />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg focus:outline-none text-foreground dark:text-foreground-dark"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </motion.nav>
    </>
  );
};

export default Navbar;
