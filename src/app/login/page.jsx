'use client'
import LoginForm from '@/components/Form/LoginForm';
import { motion } from 'framer-motion';

// --- Animaciones de Framer Motion ---
const pageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Página de Login
 * Esta página renderiza el componente del formulario de login, centrado en el
 * espacio disponible del layout principal.
 */
export default function LoginPage() {
  return(
        <motion.div
            className="min-h-screen flex items-center justify-center p-4 md:p-8"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
        >
           <LoginForm/>
        </motion.div>
    );
}
