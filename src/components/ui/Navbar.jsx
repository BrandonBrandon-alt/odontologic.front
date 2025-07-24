"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHome,
  FaTooth,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaUserEdit,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaUserShield,
  FaUserMd,
  FaUser,
  FaBell,
  FaSearch,
} from "react-icons/fa";

import { useAuth } from "../../../src/context/AuthContext";
import useScrollDirection from "../../../src/hooks/useScrollDirection";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    isLoggedIn,
    user,
    logout: logoutContext,
    loading,
    error,
    message,
    clearError,
    clearMessage,
    refreshUser,
  } = useAuth();

  const dropdownRef = useRef(null);
  const { isVisible } = useScrollDirection();
  const { scrollY } = useScroll();

  // Transformaciones suaves basadas en scroll
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [8, 16]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => clearMessage(), 4000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  const roleConfig = {
    admin: {
      label: "Administrador",
      color: "text-yellow-400",
      bgColor: "bg-gradient-to-r from-yellow-400/20 to-orange-400/20",
      icon: <FaUserShield className="mr-1.5" />,
      gradient: "from-yellow-400 to-orange-400",
    },
    dentist: {
      label: "Dentista",
      color: "text-blue-400",
      bgColor: "bg-gradient-to-r from-blue-400/20 to-cyan-400/20",
      icon: <FaUserMd className="mr-1.5" />,
      gradient: "from-blue-400 to-cyan-400",
    },
    user: {
      label: "Paciente",
      color: "text-green-400",
      bgColor: "bg-gradient-to-r from-green-400/20 to-emerald-400/20",
      icon: <FaUser className="mr-1.5" />,
      gradient: "from-green-400 to-emerald-400",
    },
  };

  const getRoleInfo = useCallback(
    (role) => {
      return (
        roleConfig[role] || {
          label: "Usuario",
          color: "text-gray-400",
          bgColor: "bg-gradient-to-r from-gray-400/20 to-slate-400/20",
          icon: <FaUser className="mr-1.5" />,
          gradient: "from-gray-400 to-slate-400",
        }
      );
    },
    [] // dependency array was missing roleConfig
  );

  // Animaciones mejoradas
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

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      x: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      filter: "blur(5px)",
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.6,
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, 0],
      scale: [1, 1.1, 1.1, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutContext();
      setIsDropdownOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getDashboardPath = useCallback(
    (role) =>
      ({
        admin: "/admin-dashboard",
        dentist: "/dentist-dashboard",
        user: "/patient-dashboard",
      }[role] || "/patient-dashboard"),
    []
  );

  const getProfilePath = useCallback(
    (role) =>
      ({
        admin: "/admin-profile",
        dentist: "/dentist-profile",
        user: "/patient-profile",
      }[role] || "/patient-profile"),
    []
  );

  const handleRefreshUser = useCallback(() => {
    if (isLoggedIn) refreshUser();
  }, [isLoggedIn, refreshUser]);

  const NotificationBanner = () => {
    if (!error && !message) return null;

    return (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-[60] px-4 py-3 text-center text-sm font-medium backdrop-blur-md ${
          error ? "bg-red-500/90 text-white" : "bg-green-500/90 text-white"
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          {error ? <FaExclamationTriangle /> : <FaCheckCircle />}
          <span>{error || message}</span>
        </div>
      </motion.div>
    );
  };

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

  const renderLink = (href, icon, text) => {
    const isActive =
      href === "/" ? pathname === href : pathname.startsWith(href);

    return (
      <motion.div
        variants={buttonHoverVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          href={href}
          className={`
            group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl 
            font-medium text-sm transition-all duration-300 overflow-hidden
            ${
              isActive
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
                : "text-foreground dark:text-foreground-dark hover:bg-interactive dark:hover:bg-interactive-dark"
            }
          `}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <motion.div variants={iconVariants} whileHover="hover">
            {icon}
          </motion.div>
          <span className="relative z-10">{text}</span>

          {/* Indicador activo */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      </motion.div>
    );
  };

  const renderMobileLink = (href, icon, text) => {
    const isActive =
      href === "/" ? pathname === href : pathname.startsWith(href);

    return (
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        whileHover={{ x: 5, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={href}
          className={`
            group relative flex items-center space-x-3 py-3 px-4 rounded-xl
            font-medium transition-all duration-300 overflow-hidden
            ${
              isActive
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                : "text-foreground dark:text-foreground-dark hover:bg-interactive dark:hover:bg-interactive-dark"
            }
          `}
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <span>{text}</span>

          {isActive && (
            <motion.div
              className="absolute right-3 w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {(error || message) && <NotificationBanner />}
      </AnimatePresence>

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b border-border dark:border-border-dark shadow-md"
        initial="hidden"
        animate={isVisible ? "visibleScroll" : "hiddenScroll"}
        variants={navVariants}
      >
        {/* Gradient overlay para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none"></div>

        <div className="container mx-auto flex justify-between items-center py-3 px-4 relative">
          {/* Logo con animación mejorada */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/"
              className="group relative flex items-center space-x-3 text-2xl font-bold transition-all duration-300"
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FaTooth className="text-white text-lg" />
                </div>
                {/* Efecto de pulso */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl opacity-30 group-hover:animate-ping"></div>
              </motion.div>

              <span className="hidden sm:inline bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent font-extrabold tracking-tight">
                Odontologic
              </span>
            </Link>
          </motion.div>

          {/* Menú de Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navegación principal */}
            <div className="flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 shadow-inner">
              {renderLink("/", <FaHome className="text-lg" />, "Home")}
              {renderLink(
                "/services",
                <FaTooth className="text-lg" />,
                "Servicios"
              )}
              {renderLink(
                "/about",
                <FaInfoCircle className="text-lg" />,
                "Acerca de"
              )}
              {renderLink(
                "/contact",
                <FaEnvelope className="text-lg" />,
                "Contacto"
              )}
            </div>

            {/* Separador con gradiente */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-border dark:via-border-dark to-transparent"></div>

            {/* Acciones de usuario */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Botón de búsqueda */}
                  <motion.button
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-foreground dark:text-foreground-dark"
                  >
                    <FaSearch className="text-lg" />
                  </motion.button>

                  {/* Notificaciones */}
                  <motion.button
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="relative p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-foreground dark:text-foreground-dark"
                  >
                    <FaBell className="text-lg" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>

                  {/* Dropdown de usuario */}
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      variants={buttonHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onMouseEnter={handleRefreshUser}
                      className="group flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center border-2 border-white/30 overflow-hidden backdrop-blur-sm">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUserCircle className="text-lg" />
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>

                      <div className="hidden lg:block text-left">
                        <p className="font-semibold text-sm">
                          {user?.name || "Mi Perfil"}
                        </p>
                        <p className="text-xs opacity-80">
                          {getRoleInfo(user?.role).label}
                        </p>
                      </div>

                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="text-sm" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          className="absolute right-0 mt-3 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {user && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="px-6 py-4 border-b border-border dark:border-border-dark"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                                <div>
                                  <p className="font-bold text-foreground dark:text-foreground-dark">
                                    {user.name}
                                  </p>
                                  <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
                                    {user.email}
                                  </p>
                                </div>
                              </div>

                              <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className={`inline-flex items-center px-3 py-1.5 mt-3 rounded-xl text-xs font-bold ${
                                  getRoleInfo(user.role).bgColor
                                } ${getRoleInfo(user.role).color} shadow-sm`}
                              >
                                {getRoleInfo(user.role).icon}
                                {getRoleInfo(user.role).label}
                              </motion.div>
                            </motion.div>
                          )}

                          <div className="py-2">
                            {[
                              {
                                href: getDashboardPath(user?.role),
                                icon: <FaTachometerAlt />,
                                text: "Dashboard",
                              },
                              {
                                href: getProfilePath(user?.role),
                                icon: <FaUserEdit />,
                                text: "Mi Perfil",
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Link
                                  href={item.href}
                                  className="group flex items-center space-x-3 px-6 py-3 text-sm font-medium text-foreground dark:text-foreground-dark hover:bg-interactive dark:hover:bg-interactive-dark transition-all duration-200"
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="text-primary-500 dark:text-primary-400"
                                  >
                                    {item.icon}
                                  </motion.div>
                                  <span>{item.text}</span>
                                </Link>
                              </motion.div>
                            ))}

                            <hr className="my-2 border-border dark:border-border-dark" />

                            <motion.button
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              onClick={handleLogout}
                              disabled={isLoggingOut}
                              className="group flex items-center space-x-3 w-full text-left px-6 py-3 text-sm font-medium text-error-DEFAULT dark:text-error-foreground-dark hover:bg-error-light dark:hover:bg-error-dark/30 disabled:opacity-50 transition-all duration-200"
                            >
                              <motion.div
                                animate={isLoggingOut ? { rotate: 360 } : {}}
                                transition={{
                                  duration: 1,
                                  repeat: isLoggingOut ? Infinity : 0,
                                }}
                              >
                                <FaSignOutAlt />
                              </motion.div>
                              <span>
                                {isLoggingOut
                                  ? "Cerrando sesión..."
                                  : "Cerrar Sesión"}
                              </span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.div
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href="/login"
                      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-foreground dark:text-foreground-dark"
                    >
                      <FaSignInAlt />
                      <span>Iniciar Sesión</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href="/register"
                      className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <FaUserPlus />
                      <span>Registrarse</span>
                    </Link>
                  </motion.div>
                </div>
              )}

              <ThemeToggleButton />
            </div>
          </div>

          {/* Controles móviles */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggleButton />

            <motion.button
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg focus:outline-none text-foreground dark:text-foreground-dark"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Menú desplegable móvil mejorado */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                className="absolute right-0 top-0 h-full w-5/6 max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-y-auto"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  {/* Header móvil */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                        <FaTooth className="text-white text-lg" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                        Odontologic
                      </span>
                    </div>
                  </motion.div>

                  <nav className="space-y-2">
                    {[
                      { href: "/", icon: <FaHome />, text: "Home" },
                      {
                        href: "/services",
                        icon: <FaTooth />,
                        text: "Servicios",
                      },
                      {
                        href: "/about",
                        icon: <FaInfoCircle />,
                        text: "Acerca de",
                      },
                      {
                        href: "/contact",
                        icon: <FaEnvelope />,
                        text: "Contacto",
                      },
                    ].map((item) =>
                      renderMobileLink(item.href, item.icon, item.text)
                    )}

                    <hr className="my-4 border-border dark:border-border-dark" />

                    {isLoggedIn ? (
                      <div className="space-y-2">
                        {renderMobileLink(
                          getDashboardPath(user?.role),
                          <FaTachometerAlt />,
                          "Dashboard"
                        )}
                        {renderMobileLink(
                          getProfilePath(user?.role),
                          <FaUserEdit />,
                          "Mi Perfil"
                        )}
                        <motion.div
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 20,
                          }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={handleLogout}
                            className="group w-full flex items-center space-x-3 py-3 px-4 rounded-xl font-medium text-error-DEFAULT dark:text-error-foreground-dark hover:bg-error-light dark:hover:bg-error-dark/30 transition-colors duration-300"
                          >
                            <FaSignOutAlt />
                            <span>Cerrar Sesión</span>
                          </button>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {renderMobileLink(
                          "/login",
                          <FaSignInAlt />,
                          "Iniciar Sesión"
                        )}
                        {renderMobileLink(
                          "/register",
                          <FaUserPlus />,
                          "Registrarse"
                        )}
                      </div>
                    )}
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
