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

const renderMobileLink = (href, icon, text, pathname) => {
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

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

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  panelId = "mobile-menu-panel",
}) => {
  const pathname = usePathname();
  const { isLoggedIn, user, logout: logoutContext } = useAuth();
  const panelRef = useRef(null);

  // Focus management & accessibility (trap focus, ESC close)
  useEffect(() => {
    if (!isMenuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

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

  const handleLogout = async () => {
    try {
      await logoutContext();
      setIsMenuOpen(false);
      // router.push("/login"); // If you need to redirect after logout
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

  return (
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
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="absolute right-0 top-0 h-full w-5/6 max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-y-auto focus:outline-none"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
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

              <nav className="space-y-2" aria-label="Navegación móvil">
                {[
                  { href: "/", icon: <FaHome />, text: "Home" },
                  { href: "/services", icon: <FaTooth />, text: "Servicios" },
                  { href: "/about", icon: <FaInfoCircle />, text: "Acerca de" },
                  { href: "/contact", icon: <FaEnvelope />, text: "Contacto" },
                ].map((item) =>
                  renderMobileLink(item.href, item.icon, item.text, pathname)
                )}

                <hr className="my-4 border-border dark:border-border-dark" />

                {isLoggedIn ? (
                  <div className="space-y-2">
                    {renderMobileLink(
                      getDashboardPath(user?.role),
                      <FaTachometerAlt />,
                      "Dashboard",
                      pathname
                    )}
                    {renderMobileLink(
                      getProfilePath(user?.role),
                      <FaUserEdit />,
                      "Mi Perfil",
                      pathname
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
                        className="group w-full flex items-center space-x-3 py-3 px-4 rounded-xl font-medium text-error-DEFAULT dark:text-error-foreground-dark hover:bg-error-light dark:hover:bg-error-dark/30 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-error-500/50"
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
                      "Iniciar Sesión",
                      pathname
                    )}
                    {renderMobileLink(
                      "/register",
                      <FaUserPlus />,
                      "Registrarse",
                      pathname
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
