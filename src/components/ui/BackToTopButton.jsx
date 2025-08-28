"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Botón flotante que aparece al hacer scroll y permite volver al top suavemente.
 */
export default function BackToTopButton({
  threshold = 220,
  bottomOffset = 96,
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 1

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      setVisible(scrollTop > threshold && docHeight > 400); // evita mostrar si página muy corta
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Configuración del círculo (SVG)
  const size = 48; // botón base
  const radius = 18; // radio del círculo de progreso
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          onClick={handleClick}
          aria-label={`Volver arriba (${Math.round(progress * 100)}% scroll)`}
          title="Volver arriba"
          className="fixed right-6 z-50 rounded-full text-white shadow-[0_6px_18px_-4px_rgba(0,150,136,0.45),0_2px_6px_-1px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_22px_-4px_rgba(0,150,136,0.55),0_3px_10px_-1px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/40 dark:focus-visible:ring-accent-400/40 flex items-center justify-center group backdrop-blur-md border border-white/70 dark:border-border-dark bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 dark:from-primary-600 dark:via-primary-700 dark:to-accent-600 ring-2 ring-white/60 dark:ring-0"
          style={{ bottom: bottomOffset }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            {/* Inner translucent plate for extra contrast on busy backgrounds (light mode) */}
            <div className="absolute inset-0 rounded-full bg-white/10 dark:bg-black/10" />
            {/* Círculo de fondo */}
            <svg
              width={size}
              height={size}
              className="absolute inset-0 rotate-[-90deg]"
              role="presentation"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={stroke}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="text-primary-500 dark:text-primary-400 transition-[stroke-dashoffset] duration-200 ease-linear"
              />
            </svg>
            {/* Flecha */}
            <span className="text-lg font-semibold relative z-10 select-none transition-transform group-hover:-translate-y-0.5 text-primary-50 dark:text-primary-100 drop-shadow">
              ↑
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
