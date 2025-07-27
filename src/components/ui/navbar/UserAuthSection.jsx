import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaTachometerAlt,
  FaUserEdit,
  FaSignOutAlt,
  FaUserShield,
  FaUserMd,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";
import ThemeToggleButton from "../ThemeToggleButton";

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

const getRoleInfo = (role) => {
  return (
    roleConfig[role] || {
      label: "Usuario",
      color: "text-gray-400",
      bgColor: "bg-gradient-to-r from-gray-400/20 to-slate-400/20",
      icon: <FaUser className="mr-1.5" />,
      gradient: "from-gray-400 to-slate-400",
    }
  );
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

const UserAuthSection = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Consider moving this state up if search is a global overlay

  const { isLoggedIn, user, logout: logoutContext, refreshUser } = useAuth();
  const dropdownRef = useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <div className="flex items-center space-x-3">
      {isLoggedIn ? (
        <>
          <motion.button
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-foreground dark:text-foreground-dark"
          >
            <FaSearch className="text-lg" />
          </motion.button>

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
                        {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
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
  );
};

export default React.memo(UserAuthSection);
