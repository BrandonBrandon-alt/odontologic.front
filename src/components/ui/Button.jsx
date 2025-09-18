import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import {
  FaSpinner,
  FaPlus,
  FaSave,
  FaEdit,
  FaTrash,
  FaDownload,
  FaChevronRight,
  FaHeart,
  FaStar,
} from "react-icons/fa";

/**
 * Componente Button mejorado con diseño premium y animaciones espectaculares
 * Sistema de colores semánticos con efectos visuales avanzados
 */

const buttonVariants = cva(
  `
    relative overflow-hidden
    font-dental font-semibold transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-offset-background dark:focus-visible:ring-offset-background-dark
    inline-flex items-center justify-center gap-dental-sm
    disabled:cursor-not-allowed
    transform-gpu will-change-transform
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-primary dark:bg-gradient-primary-dark
          hover:from-accent-500 hover:via-accent-500 hover:to-accent-500
          active:from-primary-600 active:via-primary-700 active:to-primary-800
          text-white font-bold
          border border-primary-600/20
          shadow-lg shadow-primary-500/25
          hover:shadow-xl hover:shadow-primary-500/40
          focus-visible:ring-primary-500
          disabled:from-primary-300 disabled:via-primary-300 disabled:to-primary-300
          disabled:shadow-none disabled:opacity-60
          dark:from-primary-600 dark:via-primary-700 dark:to-primary-800
          dark:hover:from-primary-500 dark:hover:via-primary-600 dark:hover:to-primary-700
        `,
        secondary: `
          bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
          hover:from-primary-50 hover:via-accent-50 hover:to-primary-100
          active:from-gray-300 active:via-gray-400 active:to-gray-500
          dental-text-primary border-2 border-gray-300/60
          hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/15
          focus-visible:ring-primary-500
          disabled:from-gray-200 disabled:via-gray-200 disabled:to-gray-200
          disabled:dental-text-muted disabled:opacity-50 disabled:shadow-none
          dark:from-gray-800 dark:via-gray-700 dark:to-gray-600
          dark:hover:from-primary-900/40 dark:hover:via-accent-900/30 dark:hover:to-primary-800/40
          dark:border-gray-600/60 dark:hover:border-primary-400/50
          transition-all duration-300
        `,
        success: `
          bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700
          hover:from-emerald-400 hover:via-emerald-500 hover:to-green-600
          active:from-emerald-600 active:via-emerald-700 active:to-green-800
          text-white font-bold
          border border-emerald-600/20
          shadow-lg shadow-emerald-500/25
          hover:shadow-xl hover:shadow-emerald-500/40
          focus-visible:ring-emerald-500
          disabled:from-emerald-300 disabled:via-emerald-300 disabled:to-emerald-300
          disabled:shadow-none disabled:opacity-60
        `,
        danger: `
          bg-gradient-to-br from-red-500 via-red-600 to-rose-700
          hover:from-red-400 hover:via-red-500 hover:to-rose-600
          active:from-red-600 active:via-red-700 active:to-rose-800
          text-white font-bold
          border border-red-600/20
          shadow-lg shadow-red-500/25
          hover:shadow-xl hover:shadow-red-500/40
          focus-visible:ring-red-500
          disabled:from-red-300 disabled:via-red-300 disabled:to-red-300
          disabled:shadow-none disabled:opacity-60
        `,
        warning: `
          bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-600
          hover:from-amber-400 hover:via-orange-400 hover:to-yellow-500
          active:from-amber-600 active:via-orange-600 active:to-yellow-700
          text-white font-bold
          border border-amber-600/20
          shadow-lg shadow-amber-500/25
          hover:shadow-xl hover:shadow-amber-500/40
          focus-visible:ring-amber-500
          disabled:from-amber-300 disabled:via-amber-300 disabled:to-amber-300
          disabled:shadow-none disabled:opacity-60
        `,
        info: `
          bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-600
          hover:from-blue-400 hover:via-cyan-400 hover:to-sky-500
          active:from-blue-600 active:via-cyan-600 active:to-sky-700
          text-white font-bold
          border border-blue-600/20
          shadow-lg shadow-blue-500/25
          hover:shadow-xl hover:shadow-blue-500/40
          focus-visible:ring-blue-500
          disabled:from-blue-300 disabled:via-blue-300 disabled:to-blue-300
          disabled:shadow-none disabled:opacity-60
        `,
        outline: `
          bg-gradient-to-br from-transparent via-primary-50/30 to-primary-100/50
          hover:from-primary-50 hover:via-primary-100 hover:to-primary-200
          active:from-primary-100 active:via-primary-200 active:to-primary-300
          dental-text-primary border-2 border-primary-500/60
          hover:border-primary-500 shadow-md shadow-primary-500/10
          hover:shadow-lg hover:shadow-primary-500/20
          focus-visible:ring-primary-500
          disabled:border-primary-200 disabled:dental-text-muted disabled:opacity-50
          dark:from-transparent dark:via-primary-900/20 dark:to-primary-800/30
          dark:hover:from-primary-900/30 dark:hover:via-primary-800/40 dark:hover:to-primary-700/50
          dark:border-primary-400/60 dark:hover:border-primary-400
        `,
        ghost: `
          bg-transparent hover:bg-gradient-to-br hover:from-gray-100/80 hover:via-gray-200/60 hover:to-gray-300/40
          active:from-gray-200/80 active:via-gray-300/60 active:to-gray-400/40
          dental-text-primary border border-transparent
          hover:border-gray-300/30 hover:shadow-md hover:shadow-gray-400/20
          focus-visible:ring-gray-500
          disabled:opacity-50
          dark:hover:from-gray-800/80 dark:hover:via-gray-700/60 dark:hover:to-gray-600/40
          dark:hover:border-gray-600/30
        `,
        link: `
          bg-transparent dental-text-primary border-none p-0 shadow-none
          hover:dental-text-secondary hover:underline
          disabled:dental-text-muted disabled:no-underline
          dark:hover:text-primary-400
          transition-colors duration-200
        `,
        premium: `
          bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700
          hover:from-purple-500 hover:via-pink-500 hover:to-indigo-600
          active:from-purple-700 active:via-pink-700 active:to-indigo-800
          text-white font-bold
          border border-purple-600/20
          shadow-lg shadow-purple-500/25
          hover:shadow-2xl hover:shadow-purple-500/50
          focus-visible:ring-purple-500
          disabled:from-purple-300 disabled:via-purple-300 disabled:to-purple-300
          disabled:shadow-none disabled:opacity-60
          animate-gradient-x bg-[length:200%_200%]
        `,
      },
      size: {
        xs: "px-3 py-1.5 text-xs min-h-[28px]",
        sm: "px-4 py-2 text-sm min-h-[36px]",
        md: "px-6 py-3 text-base min-h-[44px]",
        lg: "px-8 py-4 text-lg min-h-[52px]",
        xl: "px-10 py-5 text-xl min-h-[60px]",
      },
      rounded: {
        none: "rounded-none",
        xs: "rounded",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
        "2xl": "rounded-3xl",
        "3xl": "rounded-[2rem]",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      {
        variant: ["primary", "success", "danger", "warning", "info", "premium"],
        glowEffect: true,
        className: "animate-pulse",
      },
      {
        variant: "primary",
        glowEffect: true,
        className: "shadow-2xl shadow-primary-500/50",
      },
      {
        variant: "success",
        glowEffect: true,
        className: "shadow-2xl shadow-emerald-500/50",
      },
      {
        variant: "danger",
        glowEffect: true,
        className: "shadow-2xl shadow-red-500/50",
      },
      {
        variant: "warning",
        glowEffect: true,
        className: "shadow-2xl shadow-amber-500/50",
      },
      {
        variant: "info",
        glowEffect: true,
        className: "shadow-2xl shadow-blue-500/50",
      },
      {
        variant: "premium",
        glowEffect: true,
        className: "shadow-2xl shadow-purple-500/60",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
    },
  }
);
const DentalButton = ({
  children,
  onClick,
  variant,
  size,
  className,
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  loadingText = "Cargando...",
  fullWidth,
  rounded,
  shadow = true,
  type = "button",
  glowEffect,
  rippleEffect = true,
  ...props
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [ripples, setRipples] = React.useState([]);

  // Crear efecto ripple
  const createRipple = (event) => {
    if (!rippleEffect || disabled || isLoading) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event) => {
    createRipple(event);
    if (onClick && !disabled && !isLoading) {
      onClick(event);
    }
  };

  const iconSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };

  const iconSize = iconSizes[size] || iconSizes.md;
  const isDisabled = disabled || isLoading;

  // Animaciones mejoradas de Framer Motion
  const motionVariants = {
    initial: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: variant === "link" ? 1 : 1.02,
      y: variant === "link" ? 0 : -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: variant === "link" ? 1 : 0.95,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 30,
      },
    },
  };

  const iconMotionVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: variant === "primary" ? 5 : 0,
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Renderizado de iconos mejorado
  const renderIcon = (position) => {
    if (!icon && !isLoading) return null;

    if (isLoading && position === iconPosition) {
      return (
        <motion.div
          variants={loadingVariants}
          animate="animate"
          className="flex items-center justify-center"
        >
          <FaSpinner size={iconSize} className="dental-text-current" />
        </motion.div>
      );
    }

    if (icon && position === iconPosition && !isLoading) {
      return (
        <motion.div
          variants={iconMotionVariants}
          className="flex items-center justify-center"
        >
          {React.cloneElement(icon, {
            size: iconSize,
            className: `dental-text-current ${icon.props?.className || ""}`,
          })}
        </motion.div>
      );
    }

    return null;
  };

  const buttonContent = isLoading && loadingText ? loadingText : children;

  return (
    <motion.button
      variants={motionVariants}
      initial="initial"
      whileHover={!isDisabled ? "hover" : "initial"}
      whileTap={!isDisabled ? "tap" : "initial"}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      type={type}
      className={buttonVariants({
        variant,
        size,
        rounded,
        fullWidth,
        glowEffect,
        className,
      })}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {/* Efecto ripple */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Contenido del botón */}
      <div className="relative z-10 flex items-center justify-center gap-dental-sm">
        {iconPosition === "left" && renderIcon("left")}

        {buttonContent && (
          <motion.span
            className="flex items-center"
            animate={{
              opacity: isLoading && loadingText !== buttonContent ? 0.7 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {buttonContent}
          </motion.span>
        )}

        {iconPosition === "right" && renderIcon("right")}
      </div>

      {/* Efecto de brillo premium */}
      {(variant === "primary" || variant === "premium") && !isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
};

// Componentes preconfigurados mejorados
export const SaveButton = (props) => (
  <DentalButton
    variant="success"
    icon={<FaSave />}
    glowEffect={props.glowEffect}
    {...props}
  >
    {props.children || "Guardar"}
  </DentalButton>
);

export const EditButton = (props) => (
  <DentalButton variant="secondary" icon={<FaEdit />} size="sm" {...props}>
    {props.children || "Editar"}
  </DentalButton>
);

export const DeleteButton = (props) => (
  <DentalButton
    variant="danger"
    icon={<FaTrash />}
    size="sm"
    glowEffect={props.confirm}
    {...props}
  >
    {props.children || "Eliminar"}
  </DentalButton>
);

export const AddButton = (props) => (
  <DentalButton variant="primary" icon={<FaPlus />} {...props}>
    {props.children || "Agregar"}
  </DentalButton>
);

export const DownloadButton = (props) => (
  <DentalButton variant="outline" icon={<FaDownload />} {...props}>
    {props.children || "Descargar"}
  </DentalButton>
);

export const NextButton = (props) => (
  <DentalButton
    variant="primary"
    icon={<FaChevronRight />}
    iconPosition="right"
    {...props}
  >
    {props.children || "Siguiente"}
  </DentalButton>
);

export const FavoriteButton = ({ isFavorite = false, ...props }) => (
  <DentalButton
    variant="ghost"
    icon={<FaHeart />}
    size="sm"
    className={`${
      isFavorite
        ? "text-red-500 hover:text-red-600 shadow-lg shadow-red-500/20"
        : "hover:text-red-400"
    } ${props.className || ""}`}
    {...props}
  >
    {props.children}
  </DentalButton>
);

export const PremiumButton = (props) => (
  <DentalButton variant="premium" icon={<FaStar />} glowEffect {...props}>
    {props.children || "Premium"}
  </DentalButton>
);

export default DentalButton;
