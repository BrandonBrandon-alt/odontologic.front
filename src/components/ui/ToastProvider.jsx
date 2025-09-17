"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Alert from "./Alert";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children, max = 6, position = "top-right" }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(
    ({
      type = "info",
      title,
      message,
      autoCloseMs,
      persistent = false,
      size = "md",
    }) => {
      setToasts((prev) => {
        const next = [
          ...prev,
          {
            id: ++idCounter,
            type,
            title,
            message,
            autoClose: !persistent ? autoCloseMs : null,
            size,
          },
        ];
        return next.slice(-max);
      });
    },
    [max]
  );

  const api = { show, remove };

  const posClasses = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className={`pointer-events-none fixed z-[12000] flex flex-col gap-3 w-full max-w-sm ${
          posClasses[position] || posClasses["top-right"]
        }`}
        role="region"
        aria-live="polite"
        aria-label="Notificaciones"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="w-full"
            >
              <Alert
                type={t.type}
                title={t.title}
                message={t.message}
                autoClose={t.autoClose}
                dismissible={true}
                size={t.size}
                onClose={() => remove(t.id)}
                className="pointer-events-auto shadow-lg"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastProvider");
  return ctx;
}
