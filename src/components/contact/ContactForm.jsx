"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import DentalButton from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import {
  sendContactMessage,
  contactSubjects,
  initialContactForm,
} from "@/services/contact.service";

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fieldVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

// Client-side mirror of backend Joi rules (keep in sync)
const validators = {
  name: (v) => {
    if (!v.trim()) return "El nombre es requerido";
    if (v.trim().length < 2)
      return "El nombre debe tener al menos 2 caracteres";
    if (v.trim().length > 100)
      return "El nombre no puede exceder 100 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v.trim()))
      return "El nombre solo puede contener letras y espacios";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "El email es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      return "Ingresa un email válido";
    return "";
  },
  phone: (v) => {
    if (!v) return ""; // optional
    if (v.length > 20) return "El teléfono no puede exceder 20 caracteres";
    if (!/^[\+]?[0-9\s\-\(\)]+$/.test(v.trim()))
      return "El teléfono contiene caracteres inválidos";
    return "";
  },
  subject: (v) => {
    if (!v) return "El asunto es requerido";
    const valid = ["consulta", "cita", "emergencia", "presupuesto", "otro"];
    if (!valid.includes(v)) return "Selecciona un asunto válido";
    return "";
  },
  message: (v) => {
    if (!v.trim()) return "El mensaje es requerido";
    if (v.trim().length < 10)
      return "El mensaje debe tener al menos 10 caracteres";
    if (v.trim().length > 1000)
      return "El mensaje no puede exceder 1000 caracteres";
    return "";
  },
};

const validateAll = (data) => {
  const errs = {};
  Object.entries(validators).forEach(([field, fn]) => {
    const msg = fn(data[field]);
    if (msg) errs[field] = msg;
  });
  return errs;
};

const ContactForm = ({ className = "" }) => {
  const [formData, setFormData] = useState(initialContactForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = useCallback(
    (field, value) => {
      setFormData((p) => ({ ...p, [field]: value }));
      if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
    },
    [errors]
  );

  const handleBlur = (field) => {
    const msg = validators[field](formData[field]);
    if (msg) setErrors((e) => ({ ...e, [field]: msg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setAlertMessage("");

    // full client validation
    const clientErrors = validateAll(formData);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setIsLoading(false);
      setAlertMessage("Por favor corrige los errores en el formulario");
      return;
    }

    const result = await sendContactMessage(formData);
    if (!result.success) {
      if (result.errors) setErrors(result.errors);
      setAlertMessage(result.message || "Error al enviar el mensaje");
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setAlertMessage(result.message || "Mensaje enviado exitosamente");
    setFormData(initialContactForm);
    setErrors({});
    setIsLoading(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      <Card
        variant="default"
        className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-2 border-border dark:border-border-dark shadow-2xl p-6 sm:p-8"
      >
        <div className="mb-6 sm:mb-8">
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Envíanos un Mensaje
          </h3>
          <p className="text-text-secondary">
            Completa el formulario y nos pondremos en contacto contigo.
          </p>
        </div>

        {alertMessage && (
          <Alert
            type={isSuccess ? "success" : "error"}
            message={alertMessage}
            autoClose={isSuccess ? 5000 : null}
            onClose={() => setAlertMessage("")}
            className="mb-6"
          />
        )}

        <Form
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isSuccess={isSuccess}
          error={!isSuccess && alertMessage ? alertMessage : undefined}
        >
          <Form.Body className="grid grid-cols-1 gap-6">
            <motion.div variants={fieldVariants}>
              <Input
                id="name"
                label="Nombre Completo"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                error={errors.name}
                required
                icon={<UserIcon className="w-5 h-5" />}
                placeholder="Ingresa tu nombre completo"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <Input
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                error={errors.email}
                required
                icon={<EnvelopeIcon className="w-5 h-5" />}
                placeholder="tu@email.com"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <Input
                id="phone"
                label="Teléfono (Opcional)"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                error={errors.phone}
                icon={<PhoneIcon className="w-5 h-5" />}
                placeholder="+57 300 123 4567"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Asunto *
              </label>
              <select
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                onBlur={() => handleBlur("subject")}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  errors.subject
                    ? "border-error focus:ring-error"
                    : "border-border dark:border-border-dark focus:ring-primary-500"
                } bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-text-primary`}
              >
                <option value="">Selecciona un asunto</option>
                {contactSubjects.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-error">{errors.subject}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Mensaje *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                rows={5}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none ${
                  errors.message
                    ? "border-error focus:ring-error"
                    : "border-border dark:border-border-dark focus:ring-primary-500"
                } bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-text-primary`}
                placeholder="Cuéntanos en qué podemos ayudarte..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-error">{errors.message}</p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                {formData.message.length}/1000 caracteres
              </p>
            </motion.div>
          </Form.Body>

          <Form.Footer>
            <DentalButton
              type="submit"
              variant="primary"
              size="lg"
              icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
              disabled={isLoading}
              className="w-full sm:w-auto"
              isLoading={isLoading}
              loadingText="Enviando..."
            >
              {isLoading ? "Enviando..." : "Enviar Mensaje"}
            </DentalButton>
          </Form.Footer>
        </Form>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
