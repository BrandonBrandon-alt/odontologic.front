import React, { createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

// Crear un contexto para el formulario
const FormContext = createContext();

/**
 * Componente principal del Formulario
 * Maneja el estado general, la sumisión y provee contexto a sus hijos.
 */
const Form = ({
  children,
  className = "",
  onSubmit,
  isLoading = false,
  isSuccess = false,
  error,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading && onSubmit) {
      onSubmit(e);
    }
  };

  const contextValue = { isLoading, isSuccess, error };

  return (
    <FormContext.Provider value={contextValue}>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative ${className}`} 
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        {children}
      </motion.form>
    </FormContext.Provider>
  );
};

// --- Sub-componentes del Formulario ---

/**
 * Encabezado del Formulario
 */
const FormHeader = ({ title, description, className = "" }) => (
  <div className={`mb-6 text-center ${className}`}>
    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{title}</h2>
    {description && (
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{description}</p>
    )}
  </div>
);

/**
 * Cuerpo del Formulario (agrupa los campos)
 */
const FormBody = ({ children, className = "" }) => (
  <fieldset className={`space-y-6 ${className}`}>
    {children}
  </fieldset>
);

/**
 * Campo individual del Formulario (agrupa Label, Input y Error/Helper)
 */
const FormField = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    {children}
  </div>
);

/**
 * Pie de página del Formulario (para botones de acción)
 */
const FormFooter = ({ children, className = "" }) => (
  <div className={`mt-8 flex flex-col items-center gap-4 ${className}`}>
    {children}
  </div>
);

/**
 * Mensaje de Éxito
 */
const FormSuccessMessage = ({ title, message, children }) => {
  const { isSuccess } = useContext(FormContext);
  return (
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="p-4 mb-6 text-sm text-center text-success-content bg-success/10 rounded-md border border-success/20"
        >
          <div className="flex items-center justify-center gap-2 font-semibold">
            <FaCheckCircle />
            <span>{title || '¡Éxito!'}</span>
          </div>
          {(message || children) && <p className="mt-1">{message || children}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Mensaje de Error
 */
const FormErrorMessage = ({ title, message, children }) => {
  const { error } = useContext(FormContext);
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="p-4 mb-6 text-sm text-center text-error-content bg-error/10 rounded-md border border-error/20"
        >
          <div className="flex items-center justify-center gap-2 font-semibold">
            <FaExclamationCircle />
            <span>{title || 'Ocurrió un error'}</span>
          </div>
          {(message || children) && <p className="mt-1">{message || error}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// Asignar sub-componentes al componente principal
Form.Header = FormHeader;
Form.Body = FormBody;
Form.Field = FormField;
Form.Footer = FormFooter;
Form.SuccessMessage = FormSuccessMessage;
Form.ErrorMessage = FormErrorMessage;

export default Form;
