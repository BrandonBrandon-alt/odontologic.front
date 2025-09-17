"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailLocked, setEmailLocked] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const emailParam = searchParams?.get("email");
    if (emailParam) {
      setFormData((p) => ({ ...p, email: emailParam.toLowerCase() }));
      setEmailLocked(true);
    }
  }, [searchParams]);

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
    if (name === "newPassword") {
      const criteria = {
        lower: /[a-z]/.test(value),
        upper: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        symbol: /[^A-Za-z0-9]/.test(value),
      };
      const met = Object.values(criteria).filter(Boolean).length;
      if (value.length < 8) msg = "Mínimo 8 caracteres.";
      else if (value.length > 30) msg = "Máximo 30 caracteres.";
      else if (met < 4)
        msg =
          "Debe cumplir al menos 4 tipos: mayúscula, minúscula, número y símbolo.";
    }
    if (name === "confirmPassword") {
      if (value !== formData.newPassword) msg = "Las contraseñas no coinciden.";
    }
    setErrors((p) => ({ ...p, [name]: msg }));
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processed =
      name === "email"
        ? value.toLowerCase()
        : name === "code"
        ? value.toUpperCase()
        : value;
    setFormData((p) => ({ ...p, [name]: processed }));
    validateField(name, processed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setAlertMessage("");
    setLoading(true);
    const errs = {};
    Object.entries(formData).forEach(([k, v]) => {
      const m = validateField(k, v);
      if (m) errs[k] = m;
    });
    if (Object.keys(errs).length) {
      setLoading(false);
      setAlertMessage("Corrige los errores del formulario.");
      return;
    }
    try {
      await authService.resetPassword({
        resetCode: formData.code.trim(),
        newPassword: formData.newPassword,
      });
      setIsSuccess(true);
      setAlertMessage("Contraseña restablecida. Redirigiendo al login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      const apiMsg = err.response?.data?.message;
      setAlertMessage(
        apiMsg || err.message || "No se pudo restablecer la contraseña."
      );
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
        Restablecer Contraseña
      </motion.h2>
      <p className="text-sm text-center text-[var(--color-text-secondary)] mb-6">
        Ingresa el código enviado y tu nueva contraseña.
      </p>
      {alertMessage && (
        <Alert
          type={isSuccess ? "success" : "error"}
          title={isSuccess ? "Éxito" : "Error"}
          message={alertMessage}
          autoClose={isSuccess ? 5000 : null}
          onClose={() => setAlertMessage("")}
          className="mb-6"
        />
      )}
      <Form onSubmit={handleSubmit} className="space-y-5">
        <Form.Field>
          <div
            className="relative"
            title={emailLocked ? "Correo bloqueado (prefijado)" : ""}
          >
            <Input
              id="email"
              name="email"
              type="email"
              label="Correo"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
              disabled={loading || emailLocked}
              className={
                emailLocked ? "pr-10 cursor-not-allowed opacity-90" : ""
              }
            />
            {emailLocked && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-400 text-sm">
                🔒
              </span>
            )}
          </div>
        </Form.Field>
        <Form.Field>
          <Input
            id="code"
            name="code"
            type="text"
            label="Código"
            value={formData.code}
            onChange={handleChange}
            required
            maxLength={8}
            error={errors.code}
            disabled={loading}
          />
        </Form.Field>
        <Form.Field>
          <Input
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            label="Nueva Contraseña"
            value={formData.newPassword}
            onChange={handleChange}
            required
            error={errors.newPassword}
            disabled={loading}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 p-1"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            }
            helper="8-30, mayúsculas, minúsculas, números y símbolos."
          />
        </Form.Field>
        <Form.Field>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
            disabled={loading}
            endIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 p-1"
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            }
          />
        </Form.Field>
        <Button type="submit" fullWidth isLoading={loading} disabled={loading}>
          {loading ? "Procesando..." : "Restablecer"}
        </Button>
      </Form>
      <p className="mt-6 text-center text-[var(--color-text-secondary)] text-sm">
        ¿No recibiste el código?{" "}
        <Link
          href={`/solicitar-reset?email=${encodeURIComponent(formData.email)}`}
          className="font-semibold text-primary hover:text-accent underline"
        >
          Reenviar
        </Link>
      </p>
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
