import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaHome, FaTooth, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const navItems = [
  { href: "/", icon: <FaHome className="text-lg" />, text: "Home" },
  {
    href: "/services",
    icon: <FaTooth className="text-lg" />,
    text: "Servicios",
  },
  {
    href: "/about",
    icon: <FaInfoCircle className="text-lg" />,
    text: "Acerca de",
  },
  {
    href: "/contact",
    icon: <FaEnvelope className="text-lg" />,
    text: "Contacto",
  },
];

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

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 shadow-inner">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <motion.div
            key={item.href}
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href={item.href}
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <motion.div variants={iconVariants} whileHover="hover">
                {item.icon}
              </motion.div>
              <span className="relative z-10">{item.text}</span>
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
      })}
    </div>
  );
};

export default React.memo(NavLinks);
