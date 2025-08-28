"use client";
import LoginForm from "@/components/Form/LoginForm";
import { motion } from "framer-motion";

// --- Animaciones de Framer Motion ---
const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Página de Login
 * Esta página renderiza el componente del formulario de login, centrado en el
 * espacio disponible del layout principal.
 */
export default function LoginPage() {
  return (
    <motion.div
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <LoginForm />
    </motion.div>
  );
}
