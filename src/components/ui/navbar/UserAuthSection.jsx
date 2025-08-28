import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import ThemeToggleButton from "../ThemeToggleButton";

const UserAuthSection = () => {
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
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

  const buttonVariants = {
    hover: { scale: 1.05, y: -1 },
    tap: { scale: 0.98 },
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-3">
        <ThemeToggleButton />

        {/* Dashboard Link */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            href={getDashboardPath(user?.role)}
            className="flex items-center space-x-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            <FaTachometerAlt className="text-sm" />
            <span className="hidden lg:inline">Dashboard</span>
          </Link>
        </motion.div>

        {/* User Menu */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            href={`/${
              user?.role === "admin"
                ? "admin"
                : user?.role === "dentist"
                ? "dentist"
                : "patient"
            }-profile`}
            className="flex items-center space-x-2 px-3 py-2 border border-border dark:border-border-dark hover:bg-interactive dark:hover:bg-interactive-dark rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            <FaUser className="text-sm" />
            <span className="hidden lg:inline">{user?.name || "Perfil"}</span>
          </Link>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3 py-2 text-error-DEFAULT dark:text-error-foreground-dark hover:bg-error-light dark:hover:bg-error-dark/30 rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-error-500/50"
        >
          <FaSignOutAlt className="text-sm" />
          <span className="hidden xl:inline">Salir</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <ThemeToggleButton />

      {/* Login Button */}
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Link
          href="/login"
          className="flex items-center space-x-2 px-3 py-2 border border-border dark:border-border-dark hover:bg-interactive dark:hover:bg-interactive-dark rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
        >
          <FaSignInAlt className="text-sm" />
          <span className="hidden lg:inline">Iniciar Sesión</span>
        </Link>
      </motion.div>

      {/* Register Button */}
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Link
          href="/register"
          className="flex items-center space-x-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
        >
          <FaUserPlus className="text-sm" />
          <span className="hidden lg:inline">Registrarse</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default React.memo(UserAuthSection);
