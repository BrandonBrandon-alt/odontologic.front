"use client";
import RegisterForm from "@/components/Form/RegisterForm"; // Usando alias de importación, ajusta si es necesario
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
 * Página de Registro
 * Renderiza el componente del formulario de registro en un layout centrado.
 */
export default function RegisterPage() {
  return (
    <motion.div
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <RegisterForm />
    </motion.div>
  );
}
