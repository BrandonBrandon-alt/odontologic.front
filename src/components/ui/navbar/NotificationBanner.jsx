import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaCheckCircle, FaTimes } from "react-icons/fa";

const NotificationBanner = ({ error, message, clearError, clearMessage }) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => clearMessage(), 4000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!error && !message) return null;

  const isError = !!error;
  const content = error || message;

  const handleClose = () => {
    if (isError) {
      clearError();
    } else {
      clearMessage();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`
          fixed top-0 left-0 right-0 z-[60] px-4 py-3 text-center text-sm font-medium backdrop-blur-md
          ${isError ? "bg-red-500/90 text-white" : "bg-green-500/90 text-white"}
        `}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="container mx-auto flex items-center justify-between max-w-4xl">
          <div className="flex items-center justify-center space-x-2 flex-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {isError ? (
                <FaExclamationTriangle className="text-base flex-shrink-0" />
              ) : (
                <FaCheckCircle className="text-base flex-shrink-0" />
              )}
            </motion.div>
            <span className="text-sm sm:text-base font-medium">{content}</span>
          </div>

          <button
            onClick={handleClose}
            className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Cerrar notificación"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(NotificationBanner);
