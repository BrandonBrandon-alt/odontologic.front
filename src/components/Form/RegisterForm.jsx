"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
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
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(value))
          errorMsg = "Solo letras y espacios.";
        break;
      case "idNumber":
        if (!value.trim()) errorMsg = "La identificación es obligatoria.";
        else if (!/^[0-9]+$/.test(value)) errorMsg = "Solo números.";
        else if (value.length < 6) errorMsg = "Mínimo 6 dígitos.";
        break;
      case "email":
        if (!value.trim()) errorMsg = "El correo es obligatorio.";
        else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value))
          errorMsg = "Correo inválido.";
        break;
      case "password":
        if (value.length < 8) errorMsg = "Mínimo 8 caracteres.";
        else if (!/[A-Z]/.test(value))
          errorMsg = "Debe contener al menos una mayúscula.";
        else if (!/[a-z]/.test(value))
          errorMsg = "Debe contener al menos una minúscula.";
        else if (!/[0-9]/.test(value))
          errorMsg = "Debe contener al menos un número.";
        else if (!/[^A-Za-z0-9]/.test(value))
          errorMsg = "Debe contener al menos un símbolo.";
        break;
      case "confirmPassword":
        if (value !== formData.password)
          errorMsg = "Las contraseñas no coinciden.";
        break;
      case "phone":
        if (!value.trim()) errorMsg = "El teléfono es obligatorio.";
        else if (!/^[0-9]+$/.test(value)) errorMsg = "Solo números.";
        else if (value.length < 7) errorMsg = "Mínimo 7 dígitos.";
        break;
      case "address":
        if (!value.trim()) errorMsg = "La dirección es obligatoria.";
        break;
      case "birth_date":
        if (!value) errorMsg = "La fecha de nacimiento es obligatoria.";
        break;
      default:
        break;
    }
    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Validar todos los campos antes de enviar
    let formIsValid = true;
    const newFieldErrors = {};
    Object.keys(formData).forEach((name) => {
      validateField(name, formData[name]);
      if (fieldErrors[name]) {
        // Check if there's an error after validation
        formIsValid = false;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = "Las contraseñas no coinciden.";
      formIsValid = false;
    }
    setFieldErrors(newFieldErrors);

    if (!formIsValid) {
      setLoading(false);
      setError("Por favor, corrige los errores en el formulario.");
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

      // --- INICIO DEL CAMBIO ---

      // 1. Descomenta la siguiente línea para hacer la llamada real al servicio
      await authService.register(userData);

      // 2. Esta lógica se ejecutará si el registro es exitoso
      setMessage(
        "¡Registro Exitoso! Hemos enviado un correo de activación a tu email."
      );
      setTimeout(() => {
        router.push("/login");
      }, 1000);

      // 3. Elimina todo el bloque de simulación que tenías antes

      // --- FIN DEL CAMBIO ---
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "No se pudo completar el registro.";
      setError(errorMessage);
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
        <img
          src="/Register.png"
          alt="Fondo de registro"
          className="absolute inset-0 w-full h-full object-cover"
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

        <AnimatePresence>
          {message && (
            <Alert
              key="success-alert"
              type="success"
              title="¡Registro Exitoso!"
              message={message}
            />
          )}
          {error && (
            <Alert
              key="error-alert"
              type="error"
              title="Error en el Registro"
              message={error}
            />
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            startIcon={<FaEnvelope className="h-5 w-5 text-foreground-muted" />}
            error={fieldErrors.email}
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
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            startIcon={
              <FaMapMarkerAlt className="h-5 w-5 text-foreground-muted" />
            }
            error={fieldErrors.address}
          />
          <Input
            label="Fecha de Nacimiento"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            required
            startIcon={
              <FaCalendarAlt className="h-5 w-5 text-foreground-muted" />
            }
            error={fieldErrors.birth_date}
          />

          <Button
            type="submit"
            loading={loading}
            disabled={!isScriptLoaded}
            className="w-full py-3 mt-6"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>

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
