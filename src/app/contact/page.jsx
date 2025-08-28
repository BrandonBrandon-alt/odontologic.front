"use client";

import React, { useState } from "react";
import PageHero from "@/components/ui/PageHero"; // Hero reutilizable
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { FaCalendarPlus, FaWhatsapp } from "react-icons/fa";
import DentalButton from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

// Importar el servicio de contacto
import {
  sendContactMessage,
  contactSubjects,
  initialContactForm,
} from "@/services/contact.service";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const scaleOnHover = {
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// --- Shared Components ---
const Section = ({ children, className = "" }) => (
  <section className={`py-16 md:py-20 ${className}`}>
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ title, subtitle, gradient = false, icon }) => (
  <motion.div variants={itemVariants} className="text-center mb-16">
    {icon && (
      <motion.div
        className="text-6xl mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {icon}
      </motion.div>
    )}
    <motion.h2
      className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${
        gradient
          ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          : "text-primary-500"
      }`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
    <motion.div
      className="w-24 h-1 bg-accent-500 mx-auto rounded-full mb-6"
      initial={{ width: 0 }}
      animate={{ width: 96 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    />
    {subtitle && (
      <motion.p
        className="text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

// --- Hero Section reutilizando PageHero ---
const HeroSection = () => (
  <PageHero
    headingLines={["Contáctanos", "Estamos Aquí para Ayudarte"]}
    subtitle="¿Tienes alguna pregunta o necesitas agendar una cita? Nuestro equipo está listo para atenderte y brindarte la mejor atención dental."
    primaryAction={{
      label: "Enviar Mensaje",
      ariaLabel: "Ir al formulario de contacto",
      onClick: () => {
        const el = document.getElementById("contact-form");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      },
      variant: "primary",
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    }}
    secondaryActions={[
      {
        label: "WhatsApp",
        href: "https://wa.me/573123456789",
        ariaLabel: "Abrir chat de WhatsApp",
        variant: "secondary",
        icon: <FaWhatsapp className="w-5 h-5" />,
      },
    ]}
  />
);

// --- Contact Form Section ---
const ContactFormSection = () => {
  const [formData, setFormData] = useState(initialContactForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setAlertMessage("");

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setIsSuccess(true);
        setFormData(initialContactForm);
        setAlertMessage(
          "¡Mensaje enviado exitosamente! Te contactaremos pronto."
        );
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setAlertMessage(result.message);
      }
    } catch (error) {
      setAlertMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="contact-form">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="grid lg:grid-cols-2 gap-16 items-start"
      >
        {/* Información de contacto */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              Información de Contacto
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Puedes contactarnos a través de cualquiera de estos medios o
              llenar el formulario y te responderemos lo antes posible.
            </p>
          </div>

          <div className="space-y-6">
            <ContactInfoCard
              icon={MapPinIcon}
              title="Ubicación"
              content={["Calle Principal #123", "Centro, Ciudad", "Colombia"]}
              color="text-red-500"
            />
            <ContactInfoCard
              icon={PhoneIcon}
              title="Teléfono"
              content={["+57 123 456 7890", "+57 098 765 4321"]}
              color="text-blue-500"
            />
            <ContactInfoCard
              icon={EnvelopeIcon}
              title="Email"
              content={["info@clinicadental.com", "citas@clinicadental.com"]}
              color="text-green-500"
            />
            <ContactInfoCard
              icon={ClockIcon}
              title="Horarios"
              content={[
                "Lun - Vie: 8:00 AM - 6:00 PM",
                "Sáb: 8:00 AM - 2:00 PM",
              ]}
              color="text-purple-500"
            />
          </div>
        </motion.div>

        {/* Formulario de contacto */}
        <motion.div variants={itemVariants} className="relative">
          <Card
            variant="default"
            className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-2 border-border dark:border-border-dark shadow-2xl p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                Envíanos un Mensaje
              </h3>
              <p className="text-text-secondary">
                Completa el formulario y nos pondremos en contacto contigo.
              </p>
            </div>

            {/* Alert para mensajes de éxito/error */}
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
              error={alertMessage}
            >
              <Form.Body>
                {/* Nombre */}
                <Form.Field>
                  <Input
                    id="name"
                    label="Nombre Completo"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    required
                    icon={<UserIcon className="w-5 h-5" />}
                    placeholder="Ingresa tu nombre completo"
                  />
                </Form.Field>

                {/* Email */}
                <Form.Field>
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                    required
                    icon={<EnvelopeIcon className="w-5 h-5" />}
                    placeholder="tu@email.com"
                  />
                </Form.Field>

                {/* Teléfono */}
                <Form.Field>
                  <Input
                    id="phone"
                    label="Teléfono (Opcional)"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={errors.phone}
                    icon={<PhoneIcon className="w-5 h-5" />}
                    placeholder="+57 300 123 4567"
                  />
                </Form.Field>

                {/* Asunto */}
                <Form.Field>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Asunto *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errors.subject
                        ? "border-error focus:ring-error"
                        : "border-border dark:border-border-dark focus:ring-primary-500"
                    } bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-text-primary`}
                  >
                    <option value="">Selecciona un asunto</option>
                    {contactSubjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-error">{errors.subject}</p>
                  )}
                </Form.Field>

                {/* Mensaje */}
                <Form.Field>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
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
                </Form.Field>
              </Form.Body>

              <Form.Footer>
                <DentalButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Enviando..." : "Enviar Mensaje"}
                </DentalButton>
              </Form.Footer>
            </Form>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
};

// --- Contact Info Card Component ---
const ContactInfoCard = ({ icon: Icon, title, content, color }) => (
  <motion.div
    variants={itemVariants}
    whileHover={scaleOnHover.hover}
    className="flex items-start space-x-4"
  >
    <div className={`flex-shrink-0 p-3 bg-primary/10 rounded-xl ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>
      <div className="space-y-1">
        {content.map((line, index) => (
          <p key={index} className="text-text-secondary">
            {line}
          </p>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- CTA Section ---
const CTASection = () => (
  <Section className="bg-gradient-primary dark:bg-gradient-primary-dark text-white w-screen left-1/2 -ml-[50vw] relative">
    {/* Background decorations */}
    <motion.div
      // Rotación eliminada
      // animate={{ rotate: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full"
    />
    <motion.div
      // animate={{ rotate: [360, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-20 -left-20 w-32 h-32 border border-white/10 rounded-full"
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="text-center relative z-10"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex p-4 mb-8 bg-white/10 rounded-2xl backdrop-blur-sm"
      >
        <ChatBubbleLeftRightIcon className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8 tracking-tight"
      >
        ¿Listo para Cuidar tu Sonrisa?
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed"
      >
        Agenda tu cita hoy y recibe una consulta de evaluación gratuita. Tu
        sonrisa es nuestra prioridad.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Link href="/login" passHref>
          <DentalButton
            variant="primary"
            size="lg"
            icon={<FaCalendarPlus />}
            className="bg-white text-primary font-bold shadow-lg hover:shadow-xl"
          >
            Agendar Cita
          </DentalButton>
        </Link>

        <Link href="https://wa.me/573123456789" target="_blank" passHref>
          <DentalButton
            variant="secondary"
            size="lg"
            icon={<FaWhatsapp />}
            className="border-2 border-white text-white font-bold backdrop-blur-sm hover:bg-white/10"
          >
            WhatsApp
          </DentalButton>
        </Link>
      </motion.div>
    </motion.div>
  </Section>
);

// --- Main Contact Page Component ---
function ContactPage() {
  return (
    <div className="min-h-screen dental-bg-background relative">
      {/* Fixed Background decorations */}
      {/* Fixed background blurred circles removed for cleaner design */}

      {/* Page Sections */}
      <HeroSection />
      <ContactFormSection />
      <CTASection />
    </div>
  );
}

export default ContactPage;
