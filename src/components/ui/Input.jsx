import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

/**
 * Componente Input mejorado para el sistema de diseño dental
 * Campo de texto con etiqueta flotante, validación y múltiples variantes
 */
const Input = ({ 
  id,
  label,
  type = "text",
  variant = "default",
  size = "md",
  error,
  success,
  helper,
  required = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  clearable = false,
  showPasswordToggle = false,
  placeholder,
  className = "",
  labelClassName = "",
  containerClassName = "",
  onChange,
  onFocus,
  onBlur,
  onClear,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(props.value || props.defaultValue || '');
  const inputRef = useRef(null);

  // Determinar el tipo actual del input
  const currentType = type === 'password' && showPassword ? 'text' : type;
  const shouldShowPasswordToggle = type === 'password' && showPasswordToggle;

  // Estados derivados
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  const hasFloatingLabel = Boolean(label) && !placeholder;
  const shouldFloat = isFocused || hasValue || (props.value && props.value !== '');

  // Clases base usando nuestro sistema
  const baseClasses = `
    w-full transition-theme
    dental-text-primary placeholder:dental-text-muted
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    ${loading ? 'cursor-wait' : ''}
  `;

  // Variantes de estilo
  const variants = {
    default: `
      dental-input
      ${hasError ? 'border-error focus-visible:ring-error' : ''}
      ${hasSuccess ? 'border-success focus-visible:ring-success' : ''}
      ${isFocused && !hasError && !hasSuccess ? 'border-primary-500 focus-visible:ring-primary-500' : ''}
    `,
    outline: `
      bg-transparent border-2 dental-border rounded-dental-md
      px-dental-md py-dental-md
      ${hasError ? 'border-error focus:border-error focus-visible:ring-error' : ''}
      ${hasSuccess ? 'border-success focus:border-success focus-visible:ring-success' : ''}
      ${isFocused && !hasError && !hasSuccess ? 'border-primary-500 focus-visible:ring-primary-500' : ''}
    `,
    filled: `
      dental-bg-interactive-hover border border-transparent rounded-dental-md
      px-dental-md py-dental-md
      focus:dental-bg-surface focus:border-primary-500 focus-visible:ring-primary-500
      ${hasError ? 'border-error focus:border-error focus-visible:ring-error' : ''}
      ${hasSuccess ? 'border-success focus:border-success focus-visible:ring-success' : ''}
    `,
    underline: `
      bg-transparent border-0 border-b-2 dental-border rounded-none
      px-0 py-dental-sm
      focus:border-primary-500 focus-visible:ring-0
      ${hasError ? 'border-error focus:border-error' : ''}
      ${hasSuccess ? 'border-success focus:border-success' : ''}
    `
  };

  // Tamaños
  const sizes = {
    sm: {
      input: 'text-dental-sm min-h-[32px]',
      padding: hasFloatingLabel ? 'pt-dental-lg pb-dental-xs px-dental-sm' : 'py-dental-sm px-dental-sm',
      label: 'text-dental-sm',
      icon: 'text-sm'
    },
    md: {
      input: 'text-dental-base min-h-[40px]',
      padding: hasFloatingLabel ? 'pt-dental-xl pb-dental-sm px-dental-md' : 'py-dental-md px-dental-md',
      label: 'text-dental-base',
      icon: 'text-base'
    },
    lg: {
      input: 'text-dental-lg min-h-[48px]',
      padding: hasFloatingLabel ? 'pt-dental-2xl pb-dental-md px-dental-lg' : 'py-dental-lg px-dental-lg',
      label: 'text-dental-lg',
      icon: 'text-lg'
    }
  };

  const sizeStyle = sizes[size];

  // Manejadores de eventos
  const handleInputChange = (e) => {
    const value = e.target.value;
    setHasValue(value !== "");
    setInternalValue(value);
    
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleClear = () => {
    if (inputRef.current) {
      const event = {
        target: { value: '' }
      };
      inputRef.current.value = '';
      setHasValue(false);
      setInternalValue('');
      if (onClear) onClear(event);
      if (onChange) onChange(event);
      inputRef.current.focus();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Efectos
  useEffect(() => {
    if (props.value !== undefined) {
      setHasValue(props.value !== '');
      setInternalValue(props.value);
    }
  }, [props.value]);

  // Animaciones de label flotante
  const getLabelAnimation = () => {
    if (!hasFloatingLabel) return {};

    return {
      y: shouldFloat ? -22 : 0,
      scale: shouldFloat ? 0.85 : 1,
      color: isFocused 
        ? hasError ? 'rgb(239, 68, 68)' : hasSuccess ? 'rgb(16, 185, 129)' : 'rgb(0, 150, 136)'
        : 'var(--color-text-muted)'
    };
  };

  // Renderizado de iconos
  const renderIcon = (position) => {
    if (position === 'left' && icon && iconPosition === 'left') {
      return (
        <div className={`absolute left-dental-sm top-1/2 transform -translate-y-1/2 dental-text-muted ${sizeStyle.icon}`}>
          {icon}
        </div>
      );
    }

    if (position === 'right') {
      const rightIcons = [];
      
      if (loading) {
        rightIcons.push(
          <motion.div
            key="loading"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={`dental-text-muted ${sizeStyle.icon}`}
          >
            ⟳
          </motion.div>
        );
      }
      
      if (hasSuccess && !loading) {
        rightIcons.push(
          <FaCheckCircle key="success" className={`text-success ${sizeStyle.icon}`} />
        );
      } else if (hasError && !loading) {
        rightIcons.push(
          <FaExclamationCircle key="error" className={`text-error ${sizeStyle.icon}`} />
        );
      }
      
      if (clearable && hasValue && !disabled && !loading) {
        rightIcons.push(
          <button
            key="clear"
            type="button"
            onClick={handleClear}
            className={`dental-text-muted hover:dental-text-primary transition-theme ${sizeStyle.icon}`}
          >
            ✕
          </button>
        );
      }
      
      if (shouldShowPasswordToggle && !loading) {
        rightIcons.push(
          <button
            key="password-toggle"
            type="button"a
            onClick={togglePasswordVisibility}
            className={`dental-text-muted hover:dental-text-primary transition-theme ${sizeStyle.icon}`}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        );
      }
      
      if (icon && iconPosition === 'right' && !loading && !hasSuccess && !hasError) {
        rightIcons.push(
          <div key="icon" className={`dental-text-muted ${sizeStyle.icon}`}>
            {icon}
          </div>
        );
      }

      if (rightIcons.length > 0) {
        return (
          <div className="absolute right-dental-sm top-1/2 transform -translate-y-1/2 flex items-center gap-dental-xs">
            {rightIcons}
          </div>
        );
      }
    }

    return null;
  };

  // Cálculo de padding considerando iconos
  const getInputPadding = () => {
    let padding = sizeStyle.padding;
    
    if (icon && iconPosition === 'left') {
      padding = padding.replace('px-dental-sm', 'pl-dental-xl pr-dental-sm')
                      .replace('px-dental-md', 'pl-dental-2xl pr-dental-md')
                      .replace('px-dental-lg', 'pl-dental-3xl pr-dental-lg');
    }
    
    const hasRightElements = loading || hasSuccess || hasError || clearable || shouldShowPasswordToggle || (icon && iconPosition === 'right');
    if (hasRightElements) {
      padding = padding.replace('px-dental-sm', 'pl-dental-sm pr-dental-xl')
                      .replace('px-dental-md', 'pl-dental-md pr-dental-2xl')
                      .replace('px-dental-lg', 'pl-dental-lg pr-dental-3xl');
    }
    
    return padding;
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {hasFloatingLabel && (
        <motion.label
          htmlFor={id}
          className={`
            absolute left-dental-md dental-text-muted transition-theme pointer-events-none z-10
            ${sizeStyle.label} ${labelClassName}
            ${required ? "after:content-['*'] after:text-error after:ml-1" : ''}
          `}
          animate={getLabelAnimation()}
          style={{
            top: variant === 'underline' ? '0.5rem' : '1rem',
            transformOrigin: "left",
          }}
        >
          {label}
        </motion.label>
      )}

      {label && placeholder && (
        <label
          htmlFor={id}
          className={`
            block dental-text-primary font-medium mb-dental-xs
            ${sizeStyle.label} ${labelClassName}
            ${required ? "after:content-['*'] after:text-error after:ml-1" : ''}
          `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {renderIcon('left')}
        
        <input
          ref={inputRef}
          id={id}
          type={currentType}
          className={`
            ${baseClasses}
            ${variants[variant]}
            ${sizeStyle.input}
            ${getInputPadding()}
            ${className}
          `.replace(/\s+/g, ' ').trim()}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          disabled={disabled}
          {...props}
        />
        
        {renderIcon('right')}

        {variant === 'underline' && (
          <motion.div
            className={`absolute bottom-0 left-0 h-0.5 ${
              hasError ? 'bg-error' : hasSuccess ? 'bg-success' : 'bg-primary-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: isFocused ? "100%" : 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
          />
        )}
      </div>

      {(helper || error || success) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-dental-xs text-dental-sm flex items-start gap-dental-xs"
        >
          {error && (
            <>
              <FaExclamationCircle className="text-error mt-0.5 flex-shrink-0" />
              <span className="text-error">{error}</span>
            </>
          )}
          {success && !error && (
            <>
              <FaCheckCircle className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-success">{success}</span>
            </>
          )}
          {helper && !error && !success && (
            <span className="dental-text-muted">{helper}</span>
          )}
        </motion.div>
      )}
    </div>
  );
};

// --- Componentes especializados (CORREGIDOS) ---
export const PasswordInput = (props) => (
  <Input 
    type="password" 
    showPasswordToggle={true}
    {...props} 
  />
);

export const SearchInput = ({ onSearch, ...props }) => (
  <Input 
    type="search"
    icon={<span>🔍</span>}
    clearable={true}
    placeholder="Buscar..."
    {...props}
    onChange={(e) => {
      if (props.onChange) props.onChange(e);
      if (onSearch) onSearch(e.target.value);
    }}
  />
);

export const EmailInput = (props) => (
  <Input 
    type="email"
    icon={<span>@</span>}
    placeholder="ejemplo@correo.com"
    {...props}
  />
);

export const PhoneInput = (props) => (
  <Input 
    type="tel"
    icon={<span>📞</span>}
    placeholder="+57 300 123 4567"
    {...props}
  />
);

export const NumberInput = (props) => (
  <Input 
    type="number"
    icon={<span>#</span>}
    {...props}
  />
);

export default Input;
