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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
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
    setError(null);
    setMessage(null);
    const fe = validateEmail(email);
    setFieldError(fe);
    if (fe) return;
    setLoading(true);
    try {
      await authService.requestPasswordReset(email.trim().toLowerCase());
      const target = `/reset-password?email=${encodeURIComponent(
        email.trim().toLowerCase()
      )}`;
      setMessage("Código enviado (si el correo existe). Redirigiendo...");
      setRedirecting(true);
      // Pequeña pausa para que el usuario vea el mensaje
      setTimeout(() => router.push(target), 900);
    } catch (err) {
      const apiMsg = err.response?.data?.message;
      setError(apiMsg || err.message || "No se pudo procesar la solicitud.");
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
      <AnimatePresence>
        {message && (
          <Alert type="success" title="Solicitud enviada" message={message} />
        )}
        {error && <Alert type="error" title="Error" message={error} />}
      </AnimatePresence>
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
