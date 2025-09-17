import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserMd,
  FaUserShield,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import ThemeToggleButton from "../ThemeToggleButton";

const UserAuthSection = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = isAuthenticated; // alias para consistencia con componentes existentes

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

  const roleIconMap = {
    admin: <FaUserShield className="text-primary-500" aria-hidden="true" />,
    dentist: <FaUserMd className="text-accent-500" aria-hidden="true" />,
    user: <FaUser className="text-primary-500" aria-hidden="true" />,
  };

  const roleLabelMap = {
    admin: "Administrador",
    dentist: "Doctor",
    user: "Paciente",
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.warn("Logout error", e);
    } finally {
      const target = `/login?from=${encodeURIComponent(pathname || "/")}`;
      router.replace(target);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-3">
        <ThemeToggleButton />

        {/* Chip de rol y usuario */}
        <div
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 border border-border dark:border-border-dark backdrop-blur-sm shadow-sm max-w-xs"
          aria-label={`Usuario autenticado: ${user?.name || "Usuario"}, rol ${
            roleLabelMap[user?.role] || "Paciente"
          }`}
        >
          {roleIconMap[user?.role]}
          <span className="text-xs font-semibold tracking-wide text-text-secondary truncate max-w-[6rem]">
            {user?.name || "Usuario"}
          </span>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-600 dark:text-primary-400 tracking-wider">
            {roleLabelMap[user?.role] || "Paciente"}
          </span>
        </div>

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

        {/* User Profile Link (unified /profile) */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            href="/profile"
            className="flex items-center space-x-2 px-3 py-2 border border-border dark:border-border-dark hover:bg-interactive dark:hover:bg-interactive-dark rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            {roleIconMap[user?.role] || <FaUser className="text-sm" />}
            <span className="hidden lg:inline">Perfil</span>
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
