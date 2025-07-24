import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaTimes 
} from 'react-icons/fa';

/**
 * Componente Alert mejorado
 * Muestra mensajes con diferentes estados, tamaños y opciones avanzadas.
 * Animado para aparecer y desaparecer suavemente.
 */
const Alert = ({ 
  type = "info", 
  title, 
  message, 
  onClose,
  customIcon,
  size = "md",
  dismissible = true,
  autoClose = null,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-close functionality
  useEffect(() => {
    if (autoClose && autoClose > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      // Delay to allow exit animation
      setTimeout(() => onClose(), 300);
    }
  };

  const alertStyles = {
    success: {
        bg: "bg-success/10 dark:bg-success/20",
        border: "border-success/50",
        iconColor: "text-success",
        focusRing: "focus:ring-success",
        icon: <FaCheckCircle />,
    },
    error: {
        bg: "bg-error/10 dark:bg-error/20",
        border: "border-error/50",
        iconColor: "text-error",
        focusRing: "focus:ring-error",
        icon: <FaExclamationTriangle />,
    },
    warning: {
        bg: "bg-warning/10 dark:bg-warning/20",
        border: "border-warning/50",
        iconColor: "text-warning",
        focusRing: "focus:ring-warning",
        icon: <FaExclamationTriangle />,
    },
    info: { // Usando tu color "primary" en lugar de "blue"
      bg: "bg-primary-50 dark:bg-primary-900/30",
      border: "border-primary-500/50",
      iconColor: "text-primary-500 dark:text-primary-400",
      focusRing: "focus:ring-primary-600",
      icon: <FaInfoCircle />,
    },
};

  const sizeStyles = {
    sm: {
      padding: "p-3",
      iconSize: "text-sm",
      titleSize: "text-sm font-semibold",
      messageSize: "text-xs",
      buttonSize: "p-1",
      iconButtonSize: 16,
    },
    md: {
      padding: "p-4",
      iconSize: "text-base",
      titleSize: "text-base font-bold",
      messageSize: "text-sm",
      buttonSize: "p-1.5",
      iconButtonSize: 20,
    },
    lg: {
      padding: "p-5",
      iconSize: "text-lg",
      titleSize: "text-lg font-bold",
      messageSize: "text-base",
      buttonSize: "p-2",
      iconButtonSize: 24,
    },
  };

  const style = alertStyles[type];
  const sizeStyle = sizeStyles[size];
  const displayIcon = customIcon || style.icon;

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
      layout
      className={`
        w-full border-l-4 rounded-lg shadow-sm
        ${style.bg} 
        ${style.border} 
        ${sizeStyle.padding}
        ${className}
      `}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start">
        {/* Icon */}
        <div className={`flex-shrink-0 ${style.iconColor} ${sizeStyle.iconSize}`}>
          {displayIcon}
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          {title && (
            <p className={`${sizeStyle.titleSize} text-gray-900 dark:text-gray-100`}>
              {title}
            </p>
          )}
          {message && (
            <p className={`${sizeStyle.messageSize} text-gray-700 dark:text-gray-300 ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          )}
        </div>

        {/* Close button */}
        {dismissible && (
          <div className="ml-auto pl-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              type="button"
              className={`
                inline-flex rounded-md transition-colors duration-200
                ${sizeStyle.buttonSize}
                ${style.iconColor}
                hover:bg-black/5 dark:hover:bg-white/5
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${style.focusRing}
              `}
              aria-label="Cerrar alerta"
            >
              <FaTimes size={sizeStyle.iconButtonSize} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Progress bar for auto-close */}
      {autoClose && autoClose > 0 && (
        <motion.div
          className="mt-3 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className={`h-full ${style.iconColor.replace('text-', 'bg-')}`}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: autoClose / 1000, ease: 'linear' }}
          />
        </motion.div>
      )}
    </motion.div>
  );
  
};
export default Alert;