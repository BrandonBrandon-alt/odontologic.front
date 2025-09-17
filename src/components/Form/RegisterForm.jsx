"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Importa el servicio de autenticación
import { authService } from "../../services/auth.service";

// Importa componentes de UI e iconos
import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

/**
 * Carga dinámicamente el script de reCAPTCHA v3 de Google.
 * @param {string} siteKey - Tu clave de sitio de reCAPTCHA v3.
 */
const loadRecaptchaScript = (siteKey) => {
  const scriptId = "recaptcha-script"; // Changed scriptId for clarity
  // Evita añadir el script si ya existe
  if (document.getElementById(scriptId)) return;

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

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
  hidden: { opacity: 0, x: -50 }, // Para que venga de la izquierda
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

function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    birth_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Usa useEffect para cargar el script de reCAPTCHA cuando el componente se monte.
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
    if (siteKey) {
      loadRecaptchaScript(siteKey);
      // Simular que el script se carga después de un tiempo
      setTimeout(() => setIsScriptLoaded(true), 1000);
    } else {
      console.error(
        "La clave de sitio de reCAPTCHA (siteKey) no está configurada en las variables de entorno."
      );
      setIsScriptLoaded(true); // Permitir el envío del formulario si reCAPTCHA no está configurado
    }
  }, []);

  // Validación en vivo por campo
  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "name":
        if (!value.trim()) errorMsg = "El nombre es obligatorio.";
        else if (value.trim().length < 2) errorMsg = "Mínimo 2 caracteres.";
        else if (value.trim().length > 100) errorMsg = "Máximo 100 caracteres.";
        break;
      case "idNumber":
        if (!value.trim()) errorMsg = "La identificación es obligatoria.";
        else if (value.trim().length < 5) errorMsg = "Mínimo 5 caracteres.";
        else if (value.trim().length > 20) errorMsg = "Máximo 20 caracteres.";
        break;
      case "email":
        if (!value.trim()) errorMsg = "El correo es obligatorio.";
        else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value))
          errorMsg = "Correo inválido.";
        break;
      case "password":
        // Backend: min 8, max 30, at least 4 of: lowercase, uppercase, numeric, symbol
        const criteria = {
          lower: /[a-z]/.test(value),
          upper: /[A-Z]/.test(value),
          number: /[0-9]/.test(value),
          symbol: /[^A-Za-z0-9]/.test(value),
        };
        const metCount = Object.values(criteria).filter(Boolean).length;
        if (value.length < 8) errorMsg = "Mínimo 8 caracteres.";
        else if (value.length > 30) errorMsg = "Máximo 30 caracteres.";
        else if (metCount < 4)
          errorMsg =
            "Debe cumplir al menos 4 tipos: mayúscula, minúscula, número y símbolo.";
        break;
      case "confirmPassword":
        if (value !== formData.password)
          errorMsg = "Las contraseñas no coinciden.";
        break;
      case "phone":
        if (!value.trim()) errorMsg = "El teléfono es obligatorio.";
        else if (!/^[0-9]+$/.test(value)) errorMsg = "Solo números.";
        else if (value.length < 7) errorMsg = "Mínimo 7 dígitos.";
        else if (value.length > 20) errorMsg = "Máximo 20 dígitos.";
        break;
      case "address":
        // Optional (backend allows null/empty) but enforce max length
        if (value && value.length > 255) errorMsg = "Máximo 255 caracteres.";
        break;
      case "birth_date":
        // Optional; validate only if present and not future
        if (value) {
          const selected = new Date(value);
          const today = new Date();
          // Normalize times
          if (selected > today)
            errorMsg = "La fecha no puede estar en el futuro.";
        }
        break;
      default:
        break;
    }
    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processed = name === "email" ? value.toLowerCase() : value;
    setFormData((prev) => ({
      ...prev,
      [name]: processed,
    }));
    validateField(name, processed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(false);
    setAlertMessage("");
    // Full validation snapshot
    const newErrors = {};
    Object.entries(formData).forEach(([k, v]) => {
      validateField(k, v);
      // validateField sets asynchronously; we'll also reproduce logic here for submission reliability
      let msg = "";
      switch (k) {
        case "name":
          if (!v.trim()) msg = "El nombre es obligatorio.";
          else if (v.trim().length < 2) msg = "Mínimo 2 caracteres.";
          else if (v.trim().length > 100) msg = "Máximo 100 caracteres.";
          break;
        case "idNumber":
          if (!v.trim()) msg = "La identificación es obligatoria.";
          else if (v.trim().length < 5) msg = "Mínimo 5 caracteres.";
          else if (v.trim().length > 20) msg = "Máximo 20 caracteres.";
          break;
        case "email":
          if (!v.trim()) msg = "El correo es obligatorio.";
          else if (!/^[^@]+@[^@]+\.[^@]+$/.test(v)) msg = "Correo inválido.";
          break;
        case "password": {
          const criteria = {
            lower: /[a-z]/.test(v),
            upper: /[A-Z]/.test(v),
            number: /[0-9]/.test(v),
            symbol: /[^A-Za-z0-9]/.test(v),
          };
          const met = Object.values(criteria).filter(Boolean).length;
          if (v.length < 8) msg = "Mínimo 8 caracteres.";
          else if (v.length > 30) msg = "Máximo 30 caracteres.";
          else if (met < 4)
            msg =
              "Debe cumplir al menos 4 tipos: mayúscula, minúscula, número y símbolo.";
          break;
        }
        case "confirmPassword":
          if (v !== formData.password) msg = "Las contraseñas no coinciden.";
          break;
        case "phone":
          if (!v.trim()) msg = "El teléfono es obligatorio.";
          else if (!/^[0-9]+$/.test(v)) msg = "Solo números.";
          else if (v.length < 7) msg = "Mínimo 7 dígitos.";
          else if (v.length > 20) msg = "Máximo 20 dígitos.";
          break;
        case "address":
          if (v && v.length > 255) msg = "Máximo 255 caracteres.";
          break;
        case "birth_date":
          if (v) {
            const selected = new Date(v);
            const today = new Date();
            if (selected > today) msg = "La fecha no puede estar en el futuro.";
          }
          break;
        default:
          break;
      }
      if (msg) newErrors[k] = msg;
    });

    if (Object.keys(newErrors).length) {
      setFieldErrors((prev) => ({ ...prev, ...newErrors }));
      setLoading(false);
      setAlertMessage("Por favor, corrige los errores en el formulario.");
      return;
    }

    try {
      let recaptchaToken = null;
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

      if (siteKey && window.grecaptcha) {
        recaptchaToken = await window.grecaptcha.execute(siteKey, {
          action: "register",
        });
      } else if (siteKey) {
        console.warn(
          "reCAPTCHA script not fully loaded, proceeding without token."
        );
      }

      const userData = { ...formData, recaptchaToken };
      delete userData.confirmPassword;

      const registeredUser = await authService.register(userData);
      const emailForRedirect = formData.email; // snapshot
      setIsSuccess(true);
      setAlertMessage("¡Registro Exitoso! Te redirigimos para activar tu cuenta.");
      // Debug (puedes quitar luego)
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[Register] Redirecting to activate with email:",
          emailForRedirect
        );
      }
      setTimeout(() => {
        router.replace(
          `/activate?email=${encodeURIComponent(emailForRedirect)}`
        );
      }, 600);
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data || {};
      let errorMessage =
        data.message || err.message || "No se pudo completar el registro.";
      if (status === 409) {
        // Mensaje más amigable en español
        errorMessage =
          "Ya existe un usuario con este correo o número de identificación.";
      }
      setAlertMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-[var(--shadow-dental-xl)] w-full max-w-6xl overflow-hidden md:flex md:min-h-[600px]">
      <motion.div
        className="hidden md:block md:w-1/2 relative overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src="/Register.png"
          alt="Fondo de registro"
          fill
          sizes="(max-width: 768px) 0, 50vw"
          quality={60}
          priority={false}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-accent/70"></div>

        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
              ¡Únete a Nuestra Comunidad!
            </h2>
            <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
              Regístrate para gestionar tus citas y acceder a servicios
              exclusivos.
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
          Crea tu Cuenta
        </motion.h2>
        <motion.p
          className="text-base text-[var(--color-text-secondary)] text-center mb-8"
          variants={textVariants}
          transition={{ delay: 0.1 }}
        >
          Regístrate en pocos pasos y accede a tu perfil de paciente.
        </motion.p>

        {alertMessage && (
          <Alert
            type={isSuccess ? "success" : "error"}
            title={isSuccess ? "¡Registro Exitoso!" : "Error en el Registro"}
            message={alertMessage}
            autoClose={isSuccess ? 5000 : null}
            onClose={() => setAlertMessage("")}
            className="mb-6"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid responsive: 1 columna en mobile, 2 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre Completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              startIcon={<FaUser className="h-5 w-5 text-foreground-muted" />}
              error={fieldErrors.name}
            />
            <Input
              label="Número de Identificación"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              startIcon={<FaIdCard className="h-5 w-5 text-foreground-muted" />}
              error={fieldErrors.idNumber}
            />
            <Input
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              startIcon={
                <FaEnvelope className="h-5 w-5 text-foreground-muted" />
              }
              error={fieldErrors.email}
            />
            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              startIcon={<FaPhone className="h-5 w-5 text-foreground-muted" />}
              error={fieldErrors.phone}
            />
            <Input
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              startIcon={<FaLock className="h-5 w-5 text-foreground-muted" />}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 p-1"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              }
              error={fieldErrors.password}
              helper="Mínimo 8 caracteres, con mayúsculas, minúsculas, números y símbolos."
            />
            <Input
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              startIcon={<FaLock className="h-5 w-5 text-foreground-muted" />}
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
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              }
              error={fieldErrors.confirmPassword}
            />
            <Input
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              startIcon={
                <FaMapMarkerAlt className="h-5 w-5 text-foreground-muted" />
              }
              error={fieldErrors.address}
              className="md:col-span-2"
            />
            <Input
              label="Fecha de Nacimiento"
              name="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={handleChange}
              startIcon={
                <FaCalendarAlt className="h-5 w-5 text-foreground-muted" />
              }
              error={fieldErrors.birth_date}
            />
          </div>

          <div>
            <Button
              type="submit"
              loading={loading}
              disabled={!isScriptLoaded}
              className="w-full py-3"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </div>

          <p className="text-xs text-left text-[var(--color-text-muted)] mt-4">
            This site is protected by reCAPTCHA and the Google&nbsp;
            <a
              href="https://policies.google.com/privacy"
              className="underline hover:text-primary"
            >
              Privacy Policy
            </a>{" "}
            and&nbsp;
            <a
              href="https://policies.google.com/terms"
              className="underline hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>

        <p className="mt-6 text-center text-[var(--color-text-secondary)] text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-accent underline"
          >
            Inicia Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
