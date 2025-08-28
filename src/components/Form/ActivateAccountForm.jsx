"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { authService } from "../../services/auth.service";

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};
const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ActivateAccountForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", code: "" });
  const [emailLocked, setEmailLocked] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const emailParam = searchParams?.get("email");
    if (emailParam) {
      setFormData((p) => ({ ...p, email: emailParam.toLowerCase() }));
      setEmailLocked(true);
    }
  }, [searchParams]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Validación
  const validateField = (name, value) => {
    let msg = "";
    if (name === "email") {
      if (!value.trim()) msg = "El correo es obligatorio.";
      else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) msg = "Correo inválido.";
    }
    if (name === "code") {
      if (!value.trim()) msg = "El código es obligatorio.";
      else if (value.length !== 8) msg = "Debe tener 8 caracteres.";
    }
    setFieldErrors((p) => ({ ...p, [name]: msg }));
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processed =
      name === "email" ? value.toLowerCase() : value.toUpperCase();
    setFormData((p) => ({ ...p, [name]: processed }));
    validateField(name, processed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const errs = {};
    Object.entries(formData).forEach(([k, v]) => {
      const m = validateField(k, v);
      if (m) errs[k] = m;
    });
    if (Object.keys(errs).length) {
      setIsLoading(false);
      setError("Por favor corrige los errores del formulario.");
      return;
    }

    try {
      await authService.activateAccount({
        email: formData.email.trim(),
        code: formData.code.trim(),
      });
      setMessage("Cuenta activada correctamente. Redirigiendo al login...");
      setTimeout(() => router.push("/login"), 1300);
    } catch (err) {
      const status = err.response?.status;
      const apiMsg = err.response?.data?.message;
      let friendly = apiMsg || err.message || "No se pudo activar la cuenta.";
      if (status === 400) friendly = "Datos inválidos o código incorrecto.";
      if (status === 404) friendly = "Usuario no encontrado.";
      setError(friendly);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown || !formData.email || fieldErrors.email) return;
    setError(null);
    setMessage(null);
    try {
      await authService.resendActivationCode(formData.email.trim());
      setMessage("Nuevo código enviado a tu correo.");
      setResendCooldown(45); // 45 segundos de cooldown
      const interval = setInterval(() => {
        setResendCooldown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (err) {
      const apiMsg = err.response?.data?.message;
      setError(apiMsg || err.message || "No se pudo reenviar el código.");
    }
  };

  return (
    <div className="relative bg-[var(--color-primary)] dark:bg-[var(--color-surface)] rounded-xl shadow-[var(--shadow-dental-xl)] w-full max-w-6xl overflow-hidden md:flex md:min-h-[640px]">
      <motion.div
        className="hidden md:block md:w-1/2 relative overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src="/Register.png"
          alt="Activar cuenta"
          fill
          sizes="(max-width: 768px) 0, 50vw"
          quality={60}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-accent/70"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
              Activa tu Cuenta
            </h2>
            <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
              Ingresa el código que enviamos a tu correo para habilitar tu
              acceso.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center border-2 border-border dark:border-border-dark"
        variants={formVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] text-center mb-4"
          variants={textVariants}
        >
          Verifica tu Email
        </motion.h2>
        <motion.p
          className="text-base text-[var(--color-text-secondary)] text-center mb-8"
          variants={textVariants}
        >
          Revisa tu bandeja. Si no llega, solicita un nuevo código.
        </motion.p>

        <AnimatePresence>
          {message && (
            <Alert
              key="success"
              type="success"
              title="Éxito"
              message={message}
            />
          )}
          {error && (
            <Alert key="error" type="error" title="Error" message={error} />
          )}
        </AnimatePresence>

        <Form onSubmit={handleSubmit} className="space-y-6">
          <Form.Field>
            <div
              className="relative group"
              title={emailLocked ? "Correo de registro (bloqueado)" : ""}
            >
              <Input
                id="email"
                name="email"
                type="email"
                label="Correo"
                required
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors.email}
                disabled={isLoading || emailLocked}
                className={
                  emailLocked ? "pr-10 cursor-not-allowed opacity-90" : ""
                }
              />
              {emailLocked && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-400 text-sm flex items-center gap-1 pointer-events-none">
                  🔒
                </span>
              )}
              {emailLocked && (
                <div className="absolute -bottom-5 left-0 text-[10px] text-primary-600 dark:text-primary-400 opacity-90 select-none">
                  Bloqueado (correo de registro)
                </div>
              )}
            </div>
          </Form.Field>
          <Form.Field>
            <Input
              id="code"
              name="code"
              type="text"
              label="Código de Activación"
              required
              value={formData.code}
              onChange={handleChange}
              error={fieldErrors.code}
              maxLength={8}
              disabled={isLoading}
            />
          </Form.Field>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Activar Cuenta
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              disabled={
                !!resendCooldown || !formData.email || !!fieldErrors.email
              }
              onClick={handleResend}
            >
              {resendCooldown
                ? `Reenviar (${resendCooldown})`
                : "Reenviar Código"}
            </Button>
          </div>

          <p className="mt-2 text-center text-[var(--color-text-secondary)] text-sm">
            ¿Ya está activa?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-accent underline"
            >
              Inicia sesión
            </Link>
          </p>
        </Form>
      </motion.div>
    </div>
  );
}
