"use client";

import React from "react";

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
// Reusable contact form component
import ContactForm from "@/components/contact/ContactForm";

// (Servicio se usa internamente en ContactForm)

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

// --- Contact Form Section ---
const ContactFormSection = () => (
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
            Puedes contactarnos a través de cualquiera de estos medios o llenar
            el formulario y te responderemos lo antes posible.
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
            content={["Lun - Vie: 8:00 AM - 6:00 PM", "Sáb: 8:00 AM - 2:00 PM"]}
            color="text-purple-500"
          />
        </div>
      </motion.div>

      {/* Formulario de contacto (reusable component) */}
      <motion.div variants={itemVariants} className="relative">
        <ContactForm />
      </motion.div>
    </motion.div>
  </Section>
);

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
  <Section className="relative text-white">
    <div className="full-bleed-bg bg-gradient-primary dark:bg-gradient-primary-dark absolute inset-0 -z-10" />
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

      <ContactFormSection />
    </div>
  );
}

export default ContactPage;
