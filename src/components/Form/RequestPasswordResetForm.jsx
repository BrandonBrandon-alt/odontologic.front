"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir tras enviar código
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import Form from "../ui/Form";
import { authService } from "../../services/auth.service";

const variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 110, damping: 14, delay: 0.2 },
  },
};

export default function RequestPasswordResetForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const validateEmail = (value) => {
    if (!value.trim()) return "El correo es obligatorio.";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) return "Correo inválido.";
    return "";
  };

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    setEmail(val);
    setFieldError(validateEmail(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setAlertMessage("");
    const fe = validateEmail(email);
    setFieldError(fe);
    if (fe) return;
    setLoading(true);
    try {
      await authService.requestPasswordReset(email.trim().toLowerCase());
      const target = `/reset-password?email=${encodeURIComponent(
        email.trim().toLowerCase()
      )}`;
      setIsSuccess(true);
      setAlertMessage("Código enviado (si el correo existe). Redirigiendo...");
      setRedirecting(true);
      // Pequeña pausa para que el usuario vea el mensaje
      setTimeout(() => router.push(target), 900);
    } catch (err) {
      const apiMsg = err.response?.data?.message;
      setAlertMessage(apiMsg || err.message || "No se pudo procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[var(--color-primary)] dark:bg-[var(--color-surface)] rounded-xl shadow-[var(--shadow-dental-lg)] border border-border dark:border-border-dark">
      <motion.h2
        className="text-2xl font-bold text-center mb-2 text-[var(--color-text-primary)]"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        Recuperar Contraseña
      </motion.h2>
      <p className="text-sm text-center text-[var(--color-text-secondary)] mb-6">
        Ingresa tu correo para enviarte un código de restablecimiento.
      </p>
      {alertMessage && (
        <Alert
          type={isSuccess ? "success" : "error"}
          title={isSuccess ? "Solicitud enviada" : "Error"}
          message={alertMessage}
          autoClose={isSuccess ? 5000 : null}
          onClose={() => setAlertMessage("")}
          className="mb-6"
        />
      )}
      <Form onSubmit={handleSubmit} className="space-y-5">
        <Form.Field>
          <Input
            id="email"
            name="email"
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={handleChange}
            required
            error={fieldError}
            disabled={loading}
          />
        </Form.Field>
        <Button
          type="submit"
          fullWidth
          isLoading={loading || redirecting}
          disabled={!!fieldError || loading || redirecting}
        >
          {redirecting
            ? "Redirigiendo..."
            : loading
            ? "Enviando..."
            : "Enviar Código"}
        </Button>
      </Form>
      {!redirecting && (
        <p className="mt-6 text-center text-[var(--color-text-secondary)] text-sm">
          ¿Ya tienes el código?{" "}
          <Link
            href={`/reset-password?email=${encodeURIComponent(email)}`}
            className="font-semibold text-primary hover:text-accent underline"
          >
            Restablecer contraseña
          </Link>
        </p>
      )}
      <p className="mt-2 text-center text-[var(--color-text-secondary)] text-sm">
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-accent underline"
        >
          Volver al login
        </Link>
      </p>
    </div>
  );
}
