"use client"; // Marcar como Componente de Cliente para usar hooks

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir al usuario
import Link from "next/link"; // Added for navigation links
import { motion, AnimatePresence } from "framer-motion"; // Added for animations

import Form from "../ui/Form"; // Asegúrate que la ruta sea correcta
import Input from "../ui/Input"; // Asegúrate que la ruta sea correcta
import Button from "../ui/Button"; // Asegúrate que la ruta sea correcta
import Alert from "../ui/Alert"; // Importamos el componente Alert

/**
 * Componente LoginForm
 * Contiene toda la lógica y estructura para el formulario de inicio de sesión.
 */
const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Animaciones de Framer Motion ---
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.3 },
    },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Cambiado a -50 para que venga de la izquierda
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Manejador de la sumisión del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      // --- Llamada real al servicio de autenticación ---
      // const user = await authService.login({ email, password });

      // Simulación de login
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (email === "test@example.com" && password === "password") {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError(
          "Credenciales inválidas. Intenta con test@example.com / password"
        );
      }
    } catch (err) {
      // Manejo de errores desde la API
      const errorMessage =
        err.response?.data?.message ||
        "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-[var(--color-primary)] dark:bg-[var(--color-surface)]  rounded-xl shadow-[var(--shadow-dental-xl)] w-full max-w-6xl overflow-hidden md:flex md:min-h-[700px]">
      <motion.div
        className="hidden md:block md:w-1/2 relative overflow-hidden "
        variants={imageVariants}
      >
        <img
          src="/Login.png"
          alt="Fondo de inicio de sesión"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-accent/70"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
              ¡Bienvenido de Nuevo!
            </h2>
            <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
              Accede a tu perfil y gestiona tus citas y tratamientos.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-2 border-border dark:border-border-dark"
        variants={formVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] text-center mb-4"
          variants={textVariants}
        >
          Inicia Sesión
        </motion.h2>
        <motion.p
          className="text-base text-[var(--color-text-secondary)] text-center mb-8"
          variants={textVariants}
          transition={{ delay: 0.1 }}
        >
          Ingresa tus credenciales para continuar.
        </motion.p>

        <AnimatePresence>
          {isSuccess && (
            <Alert
              key="success-alert"
              type="success"
              title="¡Bienvenido!"
              message="Has iniciado sesión correctamente. Redirigiendo..."
            />
          )}
          {error && (
            <Alert
              key="error-alert"
              type="error"
              title="Error de autenticación"
              message={error}
            />
          )}
        </AnimatePresence>

        <Form onSubmit={handleSubmit} className="space-y-6">
          <Form.Field>
            <Input
              id="email"
              name="email"
              type="email"
              label="Correo Electrónico"
              required
              disabled={isLoading || isSuccess}
            />
          </Form.Field>
          <Form.Field>
            <Input
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              required
              showPasswordToggle
              disabled={isLoading || isSuccess}
            />
          </Form.Field>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isSuccess}
          >
            {isSuccess ? "Redirigiendo..." : "Ingresar"}
          </Button>

          <p className="mt-2 text-center text-[var(--color-text-secondary)] text-sm">
            <Link
              href="/solicitar-reset"
              className="font-semibold text-primary hover:text-accent underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
          <p className="mt-2 text-center text-[var(--color-text-secondary)] text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-accent underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
