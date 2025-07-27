import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

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

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-[60] px-4 py-3 text-center text-sm font-medium backdrop-blur-md ${
        error ? "bg-red-500/90 text-white" : "bg-green-500/90 text-white"
      }`}
    >
      <div className="flex items-center justify-center space-x-2">
        {error ? <FaExclamationTriangle /> : <FaCheckCircle />}
        <span>{error || message}</span>
      </div>
    </motion.div>
  );
};

export default React.memo(NotificationBanner);
