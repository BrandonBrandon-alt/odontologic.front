import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente Card mejorado para el sistema de diseño dental
 * Contenedor estilizado con múltiples variantes, animaciones y estados
 */
const Card = ({ 
  children, 
  className = "",
  variant = "default",
  size = "md",
  padding = "default",
  rounded = "lg",
  shadow = "md",
  hover = true,
  animate = true,
  bordered = true,
  interactive = false,
  clickable = false,
  onClick,
  loading = false,
  disabled = false,
  ...props 
}) => {

  // Clases base usando nuestro sistema
  const baseClasses = `
    dental-bg-surface transition-theme relative overflow-hidden
    ${clickable || onClick ? 'cursor-pointer' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
  `;

  // Variantes de card
  const variants = {
    default: `
      dental-bg-surface dental-border
      ${bordered ? 'border' : 'border-0'}
    `,
    elevated: `
      dental-bg-surface-elevated dental-border
      ${bordered ? 'border' : 'border-0'}
    `,
    outline: `
      bg-transparent dental-text-primary border-2 dental-border
    `,
    gradient: `
      bg-gradient-surface dental-border
      ${bordered ? 'border' : 'border-0'}
    `,
    glass: `
      dental-bg-surface/80 backdrop-blur-dental dental-border
      ${bordered ? 'border' : 'border-0'}
    `,
    success: `
      bg-success-light border border-success
      dark:bg-success-dark dark:border-success-dark
    `,
    warning: `
      bg-warning-light border border-warning
      dark:bg-warning-dark dark:border-warning-dark
    `,
    error: `
      bg-error-light border border-error
      dark:bg-error-dark dark:border-error-dark
    `,
    info: `
      bg-info-light border border-info
      dark:bg-info-dark dark:border-info-dark
    `
  };

  // Tamaños de padding
  const paddingStyles = {
    none: 'p-0',
    xs: 'p-dental-xs',
    sm: 'p-dental-sm',
    default: 'p-dental-lg',
    md: 'p-dental-lg',
    lg: 'p-dental-xl',
    xl: 'p-dental-2xl'
  };

  // Tamaños generales
  const sizeStyles = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'w-full',
    auto: 'w-auto'
  };

  // Border radius usando nuestro sistema
  const roundedStyles = {
    none: 'rounded-none',
    xs: 'rounded-dental-xs',
    sm: 'rounded-dental-sm',
    md: 'rounded-dental-md',
    lg: 'rounded-dental-lg',
    xl: 'rounded-dental-xl',
    '2xl': 'rounded-dental-2xl',
    '3xl': 'rounded-dental-3xl'
  };

  // Sombras usando nuestro sistema
  const shadowStyles = {
    none: '',
    xs: 'shadow-dental-xs',
    sm: 'shadow-dental-sm',
    md: 'shadow-dental-md',
    lg: 'shadow-dental-lg',
    xl: 'shadow-dental-xl',
    '2xl': 'shadow-dental-2xl'
  };

  // Configuración de animaciones
  const getAnimationProps = () => {
    if (!animate) return {};

    const baseAnimation = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1]
      }
    };

    if (!hover || disabled) return baseAnimation;

    return {
      ...baseAnimation,
      whileHover: interactive ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      } : {
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      },
      whileTap: clickable || onClick ? {
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1 }
      } : {}
    };
  };

  // Manejador de click
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  // Loading overlay
  const LoadingOverlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 dental-bg-surface/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-inherit"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
      />
    </motion.div>
  );

  return (
    <motion.div
      {...getAnimationProps()}
      onClick={handleClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${paddingStyles[padding]}
        ${sizeStyles[size] || ''}
        ${roundedStyles[rounded]}
        ${shadowStyles[shadow]}
        ${hover && !disabled ? `hover:${shadowStyles[shadow === 'md' ? 'lg' : 'xl']}` : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {loading && <LoadingOverlay />}
      {children}
    </motion.div>
  );
};

// Componentes especializados
export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendDirection = "up",
  className = "",
  ...props 
}) => (
  <DentalCard 
    variant="elevated" 
    hover={false}
    className={`min-h-[120px] ${className}`}
    {...props}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="dental-text-muted text-dental-sm font-medium uppercase tracking-wide">
          {title}
        </p>
        <p className="dental-text-primary text-dental-3xl font-bold mt-dental-xs">
          {value}
        </p>
        {subtitle && (
          <p className="dental-text-secondary text-dental-sm mt-dental-xs">
            {subtitle}
          </p>
        )}
        {trend && (
          <div className={`flex items-center mt-dental-sm text-dental-xs font-medium ${
            trendDirection === 'up' ? 'text-success' : 
            trendDirection === 'down' ? 'text-error' : 'dental-text-muted'
          }`}>
            <span className="mr-1">
              {trendDirection === 'up' ? '↗' : trendDirection === 'down' ? '↘' : '→'}
            </span>
            {trend}
          </div>
        )}
      </div>
      {icon && (
        <div className="dental-text-muted text-2xl opacity-70">
          {icon}
        </div>
      )}
    </div>
  </DentalCard>
);

export const ActionCard = ({ 
  title, 
  description, 
  actions, 
  image, 
  className = "",
  ...props 
}) => (
  <DentalCard 
    variant="default" 
    interactive={true}
    className={className}
    {...props}
  >
    {image && (
      <div className="mb-dental-md -mx-dental-lg -mt-dental-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-t-dental-lg"
        />
      </div>
    )}
    
    <div className="space-y-dental-md">
      {title && (
        <h3 className="dental-text-primary text-dental-xl font-semibold">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="dental-text-secondary text-dental-base">
          {description}
        </p>
      )}
      
      {actions && (
        <div className="flex gap-dental-sm pt-dental-sm">
          {actions}
        </div>
      )}
    </div>
  </DentalCard>
);

export const AlertCard = ({ 
  type = "info", 
  title, 
  children, 
  dismissible = false, 
  onDismiss,
  className = "",
  ...props 
}) => {
  const alertVariants = {
    success: 'success',
    warning: 'warning', 
    error: 'error',
    info: 'info'
  };

  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✕',
    info: 'ℹ'
  };

  return (
    <DentalCard 
      variant={alertVariants[type]}
      hover={false}
      rounded="md"
      className={className}
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-lg mr-dental-sm">
          {icons[type]}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-dental-base mb-dental-xs">
              {title}
            </h4>
          )}
          <div className="text-dental-sm">
            {children}
          </div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-dental-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
    </DentalCard>
  );
};

export const LoadingCard = ({ 
  title = "Cargando...", 
  className = "",
  ...props 
}) => (
  <DentalCard 
    loading={true}
    hover={false}
    className={`min-h-[200px] ${className}`}
    {...props}
  >
    <div className="space-y-dental-md">
      <div className="h-6 dental-bg-interactive-hover rounded animate-pulse" />
      <div className="space-y-dental-sm">
        <div className="h-4 dental-bg-interactive-hover rounded animate-pulse" />
        <div className="h-4 dental-bg-interactive-hover rounded w-3/4 animate-pulse" />
      </div>
    </div>
  </DentalCard>
);

export default Card;