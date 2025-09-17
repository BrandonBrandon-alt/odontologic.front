import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaHome, FaTooth, FaInfoCircle, FaEnvelope } from "react-icons/fa";

// Definir los items de la navegación
const navItems = [
  { href: "/", icon: <FaHome className="text-sm sm:text-lg" />, text: "Home" },
  {
    href: "/services",
    icon: <FaTooth className="text-sm sm:text-lg" />,
    text: "Servicios",
  },
  {
    href: "/about",
    icon: <FaInfoCircle className="text-sm sm:text-lg" />,
    text: "Acerca de",
  },
  {
    href: "/contact",
    icon: <FaEnvelope className="text-sm sm:text-lg" />,
    text: "Contacto",
  },
];

// Definir los estilos de los botones cuando se pasa el ratón por encima
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

// Definir los estilos de los íconos cuando se pasa el ratón por encima
const iconVariants = {
  hover: {
    rotate: [0, -10, 10, 0],
    scale: [1, 1.1, 1.1, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// Componente de la barra de navegación
const NavLinks = () => {
  const pathname = usePathname(); // Obtener la ruta actual
  const reduceMotion = useReducedMotion(); // Comprobar si el sistema tiene reducción de movimiento activada

  return (
    <nav aria-label="Navegación principal" className="hidden md:block">
      <ul className="flex items-center space-x-1 rounded-2xl rounded-2xl p-1 shadow-inner border-2 border-border dark:border-border-dark">
        {/* Iterar sobre los items de la navegación */}
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href); // Comprobar si el item actual es el activo

          return (
            <li key={item.href} className="list-none">
              <motion.div
                variants={buttonHoverVariants} // Aplicar los estilos de botón cuando se pasa el ratón por encima
                whileHover={reduceMotion ? undefined : "hover"}
                whileTap={reduceMotion ? undefined : "tap"}
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined} // Agregar el atributo aria-current si el item es el activo
                  className={`
                    group relative flex items-center space-x-2 px-3 py-2.5 lg:px-4 rounded-xl 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60
                    font-medium text-xs lg:text-sm transition-all duration-300 overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
                        : "text-foreground dark:text-foreground-dark hover:bg-interactive dark:hover:bg-interactive-dark"
                    }
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  <motion.div
                    variants={iconVariants} // Aplicar los estilos de ícono cuando se pasa el ratón por encima
                    whileHover={reduceMotion ? undefined : "hover"}
                    className="flex-shrink-0"
                  >
                    {item.icon}
                  </motion.div>

                  <span className="relative z-10 hidden lg:inline whitespace-nowrap">
                    {item.text}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default React.memo(NavLinks);
