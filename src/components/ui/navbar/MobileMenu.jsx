import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaTooth,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaUserEdit,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

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

const linkVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

const renderMobileLink = (href, icon, text, pathname, index = 0) => {
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <motion.div
      variants={linkVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.08 }}
      whileHover={{ x: 4, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href={href}
        className={`group relative flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/55
          ${
            isActive
              ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
              : "text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)]/90 bg-white/60 dark:bg-gray-800/40 hover:bg-white/80 dark:hover:bg-gray-700/60 border border-transparent hover:border-border dark:hover:border-border-dark backdrop-blur-sm"
          }
        `}
        tabIndex={0}
      >
        <motion.div
          whileHover={{ rotate: 360, scale: 1.08 }}
          transition={{ duration: 0.35 }}
          className="flex-shrink-0 relative"
        >
          {icon}
          {isActive && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/90 shadow" />
          )}
        </motion.div>
        <span className="flex-1 tracking-wide relative z-10">{text}</span>
        {isActive && (
          <motion.div
            layoutId="mobileActiveIndicator"
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  panelId = "mobile-menu-panel",
}) => {
  const pathname = usePathname();
  const { isLoggedIn, user, logout: logoutContext } = useAuth();
  const panelRef = useRef(null);
  const overlayRef = useRef(null);

  // Focus management & accessibility
  useEffect(() => {
    if (!isMenuOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Focus first element
    setTimeout(() => first?.focus(), 100);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      } else if (e.key === "Tab") {
        if (focusable.length === 0) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("mobile-menu-open");
    } else {
      // Restaurar el scroll
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("mobile-menu-open");
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // Cleanup en caso de desmontaje del componente
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await logoutContext();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getDashboardPath = (role) =>
    ({
      admin: "/admin-dashboard",
      dentist: "/dentist-dashboard",
      user: "/patient-dashboard",
    }[role] || "/patient-dashboard");

  const getProfilePath = (role) =>
    ({
      admin: "/admin-profile",
      dentist: "/dentist-profile",
      user: "/patient-profile",
    }[role] || "/patient-profile");

  const navigationItems = [
    { href: "/", icon: <FaHome />, text: "Home" },
    { href: "/services", icon: <FaTooth />, text: "Servicios" },
    { href: "/about", icon: <FaInfoCircle />, text: "Acerca de" },
    { href: "/contact", icon: <FaEnvelope />, text: "Contacto" },
  ];

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-800/60 to-neutral-900/70 dark:from-neutral-950/80 dark:via-neutral-900/70 dark:to-neutral-950/80 backdrop-blur-md md:hidden z-[11000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
            className="absolute right-0 top-0 h-full w-5/6 max-w-sm bg-[var(--color-background)] dark:bg-[var(--color-surface)]/95 backdrop-blur-xl shadow-2xl overflow-y-auto focus:outline-none border-l border-border dark:border-border-dark z-[11010] flex flex-col"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient / aura */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.12] bg-[radial-gradient(circle_at_30%_20%,rgba(0,150,136,0.6),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(0,188,212,0.5),transparent_65%)]" />

            <div className="p-6 pb-10 relative flex-1 flex flex-col min-h-0">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30 ring-4 ring-primary-500/10">
                    <FaTooth className="text-white text-lg" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/40 to-accent-500/40 animate-ping opacity-30" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                    Odontologic
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-primary-600/80 dark:text-accent-400/80">
                    Cuidado dental integral
                  </span>
                </div>
              </motion.div>

              {/* Navigation */}
              <nav className="space-y-2 relative" aria-label="Navegación móvil">
                {navigationItems.map((item, index) =>
                  renderMobileLink(
                    item.href,
                    item.icon,
                    item.text,
                    pathname,
                    index
                  )
                )}

                <motion.div
                  className="my-6 h-px bg-gradient-to-r from-transparent via-border dark:via-border-dark to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35 }}
                />

                {/* Auth Section */}
                {isLoggedIn ? (
                  <div className="space-y-2">
                    {renderMobileLink(
                      getDashboardPath(user?.role),
                      <FaTachometerAlt />,
                      "Dashboard",
                      pathname,
                      4
                    )}
                    {renderMobileLink(
                      getProfilePath(user?.role),
                      <FaUserEdit />,
                      "Mi Perfil",
                      pathname,
                      5
                    )}
                    <motion.div
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.6 }}
                      whileHover={{ x: 4, transition: { duration: 0.18 } }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <button
                        onClick={handleLogout}
                        className="group relative w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-error-DEFAULT dark:text-error-foreground-dark bg-white/60 dark:bg-gray-800/40 hover:bg-error-light/60 dark:hover:bg-error-dark/40 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-error-500/50 border border-transparent hover:border-error-light/60 dark:hover:border-error-dark/40 backdrop-blur-sm"
                        tabIndex={0}
                      >
                        <FaSignOutAlt className="flex-shrink-0" />
                        <span className="flex-1 text-left tracking-wide">
                          Cerrar Sesión
                        </span>
                        <span className="absolute inset-y-0 right-0 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-l from-error-light/40 to-transparent dark:from-error-dark/30" />
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {renderMobileLink(
                      "/login",
                      <FaSignInAlt />,
                      "Iniciar Sesión",
                      pathname,
                      4
                    )}
                    {renderMobileLink(
                      "/register",
                      <FaUserPlus />,
                      "Registrarse",
                      pathname,
                      5
                    )}
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(MobileMenu);
