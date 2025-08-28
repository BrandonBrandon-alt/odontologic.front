"use client";
import ActivateAccountForm from "@/components/Form/ActivateAccountForm";
import React, { Suspense } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ActivateAccountPage() {
  return (
    <motion.div
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Suspense necesario para usar useSearchParams (Next.js 15 requerimiento) */}
      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 rounded-xl border border-border dark:border-border-dark bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm animate-pulse text-center">
            <p className="text-sm text-foreground-muted dark:text-foreground-muted-dark">
              Cargando formulario de activación...
            </p>
          </div>
        }
      >
        <ActivateAccountForm />
      </Suspense>
    </motion.div>
  );
}
