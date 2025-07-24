import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaSpinner, 
  FaPlus, 
  FaSave, 
  FaEdit, 
  FaTrash, 
  FaDownload,
  FaChevronRight,
  FaHeart
} from 'react-icons/fa';

/**
 * Componente Button optimizado para el sistema de diseño dental
 * Utiliza las clases CSS personalizadas y el sistema de colores semánticos
 */
const DentalButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  loadingText = 'Cargando...',
  fullWidth = false,
  rounded = 'md',
  shadow = true,
  type = 'button',
  ...props 
}) => {
  
  // Clases base utilizando nuestro sistema
  const baseClasses = `
    font-dental font-medium transition-theme
    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
    focus-visible:ring-offset-background dark:focus-visible:ring-offset-background-dark
    inline-flex items-center justify-center gap-dental-sm
    disabled:cursor-not-allowed disabled:opacity-60
    ${fullWidth ? 'w-full' : ''}
  `;

  // Variantes usando nuestro sistema de colores semánticos
  const variants = {
    primary: `
      bg-primary-900 text-white border border-primary-500
      hover:bg-primary-600 hover:border-primary-600 hover:shadow-dental-md
      active:bg-primary-700 active:transform active:scale-[0.98]
      disabled:bg-primary-300 disabled:border-primary-300
      dark:bg-primary-600 dark:border-primary-600
      dark:hover:bg-primary-500 dark:hover:border-primary-500
      dark:disabled:bg-primary-800 dark:disabled:border-primary-800
    `,
    
    secondary: `
      dental-button-secondary
      hover:shadow-dental-sm
      active:transform active:scale-[0.98]
    `,
    
    success: `
      bg-success text-white border border-success
      hover:bg-success-dark hover:shadow-dental-md
      active:transform active:scale-[0.98]
      disabled:opacity-50
      dark:bg-success dark:hover:bg-success-dark
    `,
    
    danger: `
      bg-error text-white border border-error
      hover:bg-error-dark hover:shadow-dental-md
      active:transform active:scale-[0.98]
      disabled:opacity-50
      dark:bg-error dark:hover:bg-error-dark
    `,
    
    warning: `
      bg-warning text-white border border-warning
      hover:bg-warning-dark hover:shadow-dental-md
      active:transform active:scale-[0.98]
      disabled:opacity-50
      dark:bg-warning dark:hover:bg-warning-dark
    `,
    
    info: `
      bg-info text-white border border-info
      hover:bg-info-dark hover:shadow-dental-md
      active:transform active:scale-[0.98]
      disabled:opacity-50
      dark:bg-info dark:hover:bg-info-dark
    `,
    
    outline: `
      bg-transparent dental-text-primary border border-primary-500
      hover:bg-primary-50 hover:dental-text-primary hover:shadow-dental-sm
      active:bg-primary-100 active:transform active:scale-[0.98]
      disabled:border-primary-200 disabled:dental-text-muted
      dark:border-primary-400 dark:hover:bg-primary-900/20 dark:hover:border-primary-300
      dark:active:bg-primary-900/30
    `,
    
    ghost: `
      dental-button-ghost
      hover:shadow-dental-sm
      active:transform active:scale-[0.98]
    `,
    
    link: `
      bg-transparent dental-text-primary border-none p-0 shadow-none
      hover:dental-text-secondary hover:underline
      disabled:dental-text-muted disabled:no-underline
      dark:hover:text-primary-400
    `
  };

  // Tamaños usando nuestro spacing system
  const sizes = {
    xs: {
      padding: 'px-dental-sm py-dental-xs',
      text: 'text-dental-xs',
      iconSize: 12,
      minHeight: 'min-h-[28px]'
    },
    sm: {
      padding: 'px-dental-md py-dental-sm',
      text: 'text-dental-sm',
      iconSize: 14,
      minHeight: 'min-h-[32px]'
    },
    md: {
      padding: 'px-dental-lg py-dental-md',
      text: 'text-dental-base',
      iconSize: 16,
      minHeight: 'min-h-[40px]'
    },
    lg: {
      padding: 'px-dental-xl py-dental-lg',
      text: 'text-dental-lg',
      iconSize: 18,
      minHeight: 'min-h-[44px]'
    },
    xl: {
      padding: 'px-dental-2xl py-dental-xl',
      text: 'text-dental-xl',
      iconSize: 20,
      minHeight: 'min-h-[52px]'
    }
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
    '3xl': 'rounded-dental-3xl',
    full: 'rounded-full'
  };

  const sizeStyle = sizes[size];
  const isDisabled = disabled || isLoading;

  // Animaciones de Framer Motion optimizadas
  const getMotionProps = () => {
    if (isDisabled || variant === 'link') {
      return {};
    }

    return {
      whileHover: { 
        y: -1,
        transition: { duration: 0.15, ease: "easeOut" }
      },
      whileTap: { 
        y: 0, 
        scale: 0.98,
        transition: { duration: 0.1, ease: "easeInOut" }
      },
      initial: { scale: 1 },
      animate: { scale: 1 }
    };
  };

  // Renderizado de iconos con spinner personalizado
  const renderIcon = (position) => {
    if (!icon && !isLoading) return null;
    
    if (isLoading && (position === iconPosition)) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="flex items-center justify-center"
        >
          <FaSpinner size={sizeStyle.iconSize} className="dental-text-current" />
        </motion.div>
      );
    }

    if (icon && position === iconPosition && !isLoading) {
      return React.cloneElement(icon, { 
        size: sizeStyle.iconSize,
        className: `dental-text-current ${icon.props?.className || ''}`
      });
    }

    return null;
  };

  const buttonContent = isLoading && loadingText ? loadingText : children;

  return (
    <motion.button
      {...getMotionProps()}
      type={type}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizeStyle.padding}
        ${sizeStyle.text}
        ${sizeStyle.minHeight}
        ${roundedStyles[rounded]}
        ${shadow && variant !== 'link' ? 'shadow-dental-sm hover:shadow-dental-md' : ''}
        ${isLoading ? 'cursor-wait' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {iconPosition === 'left' && renderIcon('left')}
      
      {buttonContent && (
        <span className="flex items-center">
          {buttonContent}
        </span>
      )}
      
      {iconPosition === 'right' && renderIcon('right')}
    </motion.button>
  );
};

// Componentes de botón preconfigurados para casos comunes
export const SaveButton = (props) => (
  <DentalButton 
    variant="success" 
    icon={<FaSave />} 
    {...props}
  >
    {props.children || 'Guardar'}
  </DentalButton>
);

export const EditButton = (props) => (
  <DentalButton 
    variant="secondary" 
    icon={<FaEdit />} 
    size="sm"
    {...props}
  >
    {props.children || 'Editar'}
  </DentalButton>
);

export const DeleteButton = (props) => (
  <DentalButton 
    variant="danger" 
    icon={<FaTrash />} 
    size="sm"
    {...props}
  >
    {props.children || 'Eliminar'}
  </DentalButton>
);

export const AddButton = (props) => (
  <DentalButton 
    variant="primary" 
    icon={<FaPlus />} 
    {...props}
  >
    {props.children || 'Agregar'}
  </DentalButton>
);

export const DownloadButton = (props) => (
  <DentalButton 
    variant="outline" 
    icon={<FaDownload />} 
    {...props}
  >
    {props.children || 'Descargar'}
  </DentalButton>
);

export const NextButton = (props) => (
  <DentalButton 
    variant="primary" 
    icon={<FaChevronRight />} 
    iconPosition="right"
    {...props}
  >
    {props.children || 'Siguiente'}
  </DentalButton>
);

export const FavoriteButton = ({ isFavorite = false, ...props }) => (
  <DentalButton 
    variant="ghost" 
    icon={<FaHeart />} 
    size="sm"
    className={`${isFavorite ? 'text-red-500 hover:text-red-600' : 'hover:text-red-400'} ${props.className || ''}`}
    {...props}
  >
    {props.children}
  </DentalButton>
);

export default DentalButton;