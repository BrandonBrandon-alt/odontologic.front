"use client"; // Directiva para indicar que este componente es un componente de cliente en Next.js

import React from "react"; // Importa la librería React
import { motion } from "framer-motion"; // Importa el componente 'motion' de Framer Motion para animaciones
import Link from "next/link"; // Importa el componente 'Link' de Next.js para la navegación entre páginas
import {
  FaClock, // Icono de reloj
  FaShieldAlt, // Icono de escudo
  FaHeart, // Icono de corazón
  FaTooth, // Icono de diente (usado como icono principal de odontología)
  FaMagic, // Icono de magia
  FaUserMd, // Icono de médico (no usado en este código, pero importado)
  FaCalendarPlus, // Icono de calendario con un signo de más (para agendar cita)
  FaMapMarkerAlt, // Icono de marcador de mapa (para ubicación)
  FaPhone, // Icono de teléfono
  FaClock as FaClockAlt, // Se importa FaClock de nuevo pero con un alias FaClockAlt para evitar conflicto de nombres si se necesitara usar el original FaClock también.
} from "react-icons/fa"; // Importa varios iconos de la librería Font Awesome a través de react-icons
import Card, { ActionCard, StatCard } from "../../components/ui/Card"; // Importa componentes de tarjeta (Card, ActionCard, StatCard) desde una ruta relativa
import DentalButton from "../../components/ui/Button"; // Importa un componente de botón personalizado (DentalButton) desde una ruta relativa
import PageHero from "@/components/ui/PageHero"; // Hero reutilizable alineado con Home

// --- Animation Variants (Variantes de Animación) ---
// Define variantes de animación para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0 }, // Estado inicial: oculto (opacidad 0)
  visible: {
    opacity: 1, // Estado final: visible (opacidad 1)
    transition: {
      staggerChildren: 0.1, // Retraso entre la animación de los elementos hijos
      delayChildren: 0.2, // Retraso antes de que los hijos comiencen a animarse
      duration: 0.6, // Duración total de la animación del contenedor
    },
  },
};

// Define variantes de animación para elementos individuales
const itemVariants = {
  hidden: { y: 30, opacity: 0 }, // Estado inicial: oculto (desplazado 30px hacia abajo y opacidad 0)
  visible: {
    y: 0, // Estado final: en su posición original
    opacity: 1, // Estado final: visible (opacidad 1)
    transition: {
      type: "spring", // Tipo de animación: muelle (spring) para un movimiento más natural
      stiffness: 100, // Rigidez del muelle
      damping: 15, // Amortiguación del muelle
    },
  },
};

// Define variantes de animación para un efecto de "escalar al pasar el ratón" (hover)
const scaleOnHover = {
  hover: {
    scale: 1.05, // Escala el elemento al 105% de su tamaño original
    y: -8, // Desplaza el elemento 8px hacia arriba
    transition: {
      type: "spring", // Animación de muelle para una transición suave
      stiffness: 300, // Rigidez del muelle
      damping: 20, // Amortiguación del muelle
    },
  },
};

// Define variantes de animación para un efecto de "flotación"
const floatingVariants = {
  animate: {
    y: [-10, 10, -10], // Anima la posición Y entre -10px, 10px y -10px para crear un efecto de flotación
    transition: {
      duration: 6, // Duración de un ciclo completo de la animación
      repeat: Infinity, // Repite la animación indefinidamente
      ease: "easeInOut", // Función de easing para una animación suave de entrada y salida
    },
  },
};

// --- Data (Datos) ---
// Objeto que contiene los datos para las diferentes categorías de servicios dentales
const servicesData = {
  general: {
    title: "Odontología General y Preventiva", // Título de la categoría
    color: "primary", // Color asociado a la categoría (probablemente usado para estilos)
    icon: "🦷", // Icono emoji para la categoría
    services: [
      // Array de servicios individuales dentro de esta categoría
      {
        name: "Limpieza Dental Profesional",
        description:
          "Eliminación de placa y sarro para mantener una boca saludable",
        duration: "45 min",
        price: "Desde $50.000",
      },
      {
        name: "Chequeo y Diagnóstico",
        description:
          "Evaluación completa de la salud bucal con tecnología avanzada",
        duration: "30 min",
        price: "Desde $30.000",
      },
      {
        name: "Tratamiento de Caries",
        description:
          "Restauración de dientes afectados con materiales de alta calidad",
        duration: "60 min",
        price: "Desde $80.000",
      },
      {
        name: "Extracciones Simples",
        description: "Extracción segura de dientes dañados o problemáticos",
        duration: "45 min",
        price: "Desde $100.000",
      },
    ],
  },
  estetica: {
    title: "Estética Dental y Blanqueamiento",
    color: "secondary",
    icon: "✨",
    services: [
      {
        name: "Blanqueamiento Dental",
        description:
          "Sonrisa más brillante y blanca con tecnología profesional",
        duration: "90 min",
        price: "Desde $150.000",
      },
      {
        name: "Carillas de Porcelana",
        description:
          "Transformación completa de la sonrisa con carillas personalizadas",
        duration: "2 sesiones",
        price: "Desde $800.000",
      },
      {
        name: "Diseño de Sonrisa",
        description: "Planificación integral para la sonrisa de tus sueños",
        duration: "Consulta",
        price: "Desde $200.000",
      },
      {
        name: "Bonding Dental",
        description: "Corrección de imperfecciones menores de forma rápida",
        duration: "60 min",
        price: "Desde $120.000",
      },
    ],
  },
  ortodoncia: {
    title: "Ortodoncia y Rehabilitación",
    color: "accent",
    icon: "🪥",
    services: [
      {
        name: "Brackets Metálicos",
        description:
          "Ortodoncia tradicional para alinear perfectamente tus dientes",
        duration: "18-24 meses",
        price: "Desde $2.500.000",
      },
      {
        name: "Brackets Estéticos",
        description: "Ortodoncia discreta con brackets transparentes",
        duration: "18-24 meses",
        price: "Desde $3.200.000",
      },
      {
        name: "Invisalign",
        description: "Alineadores transparentes removibles para adultos",
        duration: "12-18 meses",
        price: "Desde $4.500.000",
      },
      {
        name: "Retenedores",
        description: "Mantenimiento de resultados después del tratamiento",
        duration: "Permanente",
        price: "Desde $150.000",
      },
    ],
  },
  especializada: {
    title: "Especialidades Avanzadas",
    color: "primary",
    icon: "🔬",
    services: [
      {
        name: "Endodoncia",
        description: "Tratamiento de conductos para salvar dientes dañados",
        duration: "90 min",
        price: "Desde $300.000",
      },
      {
        name: "Periodoncia",
        description: "Tratamiento de encías y enfermedades periodontales",
        duration: "60 min",
        price: "Desde $200.000",
      },
      {
        name: "Cirugía Oral",
        description: "Extracciones complejas y cirugías bucales",
        duration: "Varía",
        price: "Desde $400.000",
      },
      {
        name: "Implantes Dentales",
        description: "Reemplazo permanente de dientes perdidos",
        duration: "3-6 meses",
        price: "Desde $2.800.000",
      },
    ],
  },
};

// Array de información de contacto
const contactInfo = [
  {
    icon: FaMapMarkerAlt, // Icono de ubicación
    title: "Ubicación", // Título
    content: ["Calle Principal #123", "Centro, Ciudad"], // Contenido de la ubicación
    iconColor: "text-red-500",
  },
  {
    icon: FaPhone, // Icono de teléfono
    title: "Teléfono", // Título
    content: ["+57 123 456 7890", "+57 098 765 4321"], // Números de teléfono
    iconColor: "text-blue-500",
  },
  {
    icon: FaClockAlt, // Icono de reloj (alias para FaClock)
    title: "Horarios", // Título
    content: ["Lun - Vie: 8:00 AM - 6:00 PM", "Sáb: 8:00 AM - 2:00 PM"], // Horarios de atención
    iconColor: "text--500",
  },
];

// --- Components (Componentes) ---
// Componente genérico para una sección de la página
const Section = ({ children, className = "" }) => (
  <section className={`py-16 md:py-20 ${className}`}>
    {" "}
    {/* Contenedor de sección con padding vertical responsivo y clase CSS opcional */}
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Contenedor interno con ancho máximo, centrado y padding horizontal responsivo */}
      {children} {/* Renderiza los componentes hijos */}
    </div>
  </section>
);

// Componente para el título de una sección
const SectionTitle = ({ title, subtitle, gradient = false, icon }) => (
  <motion.div variants={itemVariants} className="text-center mb-16">
    {" "}
    {/* Contenedor animado con variantes de item, centrado y margen inferior */}
    {icon && ( // Si se proporciona un icono, lo renderiza
      <motion.div
        className="text-6xl mb-6" // Estilo para el icono
        initial={{ scale: 0 }} // Estado inicial de animación: escala 0
        animate={{ scale: 1 }} // Estado final: escala 1
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }} // Transición de animación
      >
        {icon} {/* Renderiza el icono */}
      </motion.div>
    )}
    <motion.h2
      className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${
        // Estilo del título con tamaño de fuente responsivo y negrita
        gradient
          ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" // Si es gradiente, aplica estilos de gradiente de texto
          : "text-primary-500" // Si no es gradiente, aplica color primario
      }`}
      initial={{ scale: 0.9, opacity: 0 }} // Estado inicial de animación
      animate={{ scale: 1, opacity: 1 }} // Estado final
      transition={{ duration: 0.6 }} // Duración de la transición
    >
      {title} {/* Renderiza el título */}
    </motion.h2>
    <motion.div
      className="w-24 h-1 bg-accent-500 mx-auto rounded-full mb-6" // Línea decorativa debajo del título
      initial={{ width: 0 }} // Estado inicial de animación: ancho 0
      animate={{ width: 96 }} // Estado final: ancho 96px
      transition={{ delay: 0.3, duration: 0.8 }} // Transición de animación
    />
    {subtitle && ( // Si se proporciona un subtítulo, lo renderiza
      <motion.p
        className="text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed" // Estilo del subtítulo
        initial={{ y: 20, opacity: 0 }} // Estado inicial de animación
        animate={{ y: 0, opacity: 1 }} // Estado final
        transition={{ delay: 0.4, duration: 0.6 }} // Transición de animación
      >
        {subtitle} {/* Renderiza el subtítulo */}
      </motion.p>
    )}
  </motion.div>
);

// Componente para una tarjeta de servicio individual
const ServiceCard = ({ service, index }) => (
  <motion.div
    variants={itemVariants} // Aplica variantes de animación de item
    initial={{ scale: 0.8, opacity: 0 }} // Estado inicial de animación
    animate={{ scale: 1, opacity: 1 }} // Estado final
    transition={{ delay: index * 0.1, duration: 0.6 }} // Retraso de animación basado en el índice
    whileHover={scaleOnHover.hover} // Animación al pasar el ratón
    className="w-full max-w-md mx-auto" // Estilos de ancho y centrado
  >
    <ActionCard
      className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] h-full w-full min-h-[200px] border-2 border-border dark:border-border-dark relative overflow-hidden" // Estilos de la tarjeta, incluyendo colores de fondo y bordes para temas claro/oscuro
      title={service.name} // Título de la tarjeta (nombre del servicio)
      description={service.description} // Descripción del servicio
      actions={
        // Contenido de la sección de acciones de la tarjeta
        <div className="flex justify-between items-center w-full mt-6">
          <span className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium">
            {service.duration} {/* Duración del servicio */}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-primary mb-2">
              {service.price} {/* Precio del servicio */}
            </span>
            <DentalButton variant="primary" size="sm">
              Agendar {/* Botón para agendar */}
            </DentalButton>
          </div>
        </div>
      }
    >
      {/* Decoración de efecto hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent" // Línea de gradiente en la parte inferior
        initial={{ width: "0%" }} // Estado inicial: ancho 0
        whileHover={{ width: "100%" }} // Al pasar el ratón: ancho 100%
        transition={{ duration: 0.3 }} // Duración de la transición
      />
    </ActionCard>
  </motion.div>
);

// Componente para una categoría de servicios
const ServiceCategory = ({ category, categoryData, index }) => (
  <motion.div
    variants={containerVariants} // Aplica variantes de animación de contenedor
    initial="hidden" // Estado inicial: oculto
    whileInView="visible" // Anima a "visible" cuando el componente está en la vista
    viewport={{ once: true, amount: 0.2 }} // Configuración del viewport para la animación (solo una vez, 20% visible)
    className="mb-20" // Margen inferior
  >
    <SectionTitle title={categoryData.title} icon={categoryData.icon} />{" "}
    {/* Título de la sección de categoría */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto">
      {" "}
      {/* Grid responsivo para las tarjetas de servicio */}
      {categoryData.services.map((service, serviceIndex) => (
        <ServiceCard
          key={serviceIndex} // Clave única para cada tarjeta
          service={service} // Datos del servicio
          index={serviceIndex} // Índice del servicio para retrasos de animación
        />
      ))}
    </div>
  </motion.div>
);

// Componente para una tarjeta de información de contacto
const ContactCard = ({ info, index }) => (
  <motion.div
    variants={itemVariants} // Aplica variantes de animación de item
    initial={{ scale: 0.8, opacity: 0 }} // Estado inicial de animación
    animate={{ scale: 1, opacity: 1 }} // Estado final
    transition={{ delay: index * 0.1, duration: 0.6 }} // Retraso de animación basado en el índice
    whileHover={scaleOnHover.hover} // Animación al pasar el ratón
    className="w-full max-w-sm mx-auto" // Estilos de ancho y centrado
  >
    <Card className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center h-full min-h-[200px] border-2 border-border dark:border-border-dark relative overflow-hidden">
      {" "}
      {/* Estilos de la tarjeta de contacto */}
      <motion.div
        className={`text-4xl mb-4 ${info.iconColor || "text-primary"}`} // Estilo del icono
        whileHover={{ scale: 1.2, rotate: 10 }} // Animación al pasar el ratón
        transition={{ duration: 0.3 }} // Duración de la transición
      >
        <info.icon className="w-12 h-12 text-primary mx-auto" />{" "}
        {/* Renderiza el icono con estilos */}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-text-primary">
        {info.title} {/* Título de la información de contacto */}
      </h3>
      <div className="text-text-secondary">
        {info.content.map((line, i) => (
          <p key={i} className="mb-1">
            {line} {/* Contenido de la información de contacto */}
          </p>
        ))}
      </div>
      {/* Decoración de fondo flotante */}
      <motion.div
        variants={floatingVariants} // Aplica variantes de animación de flotación
        animate="animate" // Inicia la animación de flotación
        className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" // Estilos de la decoración
      />
    </Card>
  </motion.div>
);

// Hero reutilizando PageHero para consistencia visual
const HeroSection = () => (
  <PageHero
    headingLines={["Nuestros Servicios Odontológicos"]}
    subtitle="Cuidamos tu sonrisa con tecnología de vanguardia y atención personalizada"
    primaryAction={{
      label: "Agendar Cita",
      onClick: () => alert("Redirigiendo al agendamiento..."),
      ariaLabel: "Agendar una cita",
      variant: "primary",
      icon: <FaCalendarPlus className="w-5 h-5" />,
    }}
    secondaryActions={[
      {
        label: "Contactar",
        href: "/contact",
        ariaLabel: "Ir a la página de contacto",
        variant: "secondary",
      },
    ]}
  >
    <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium backdrop-blur-sm flex items-center gap-2">
      <FaClock className="w-4 h-4" /> Horarios Flexibles
    </span>
    <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium backdrop-blur-sm flex items-center gap-2">
      <FaShieldAlt className="w-4 h-4" /> Garantía de Calidad
    </span>
    <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium backdrop-blur-sm flex items-center gap-2">
      <FaHeart className="w-4 h-4" /> Atención Personalizada
    </span>
  </PageHero>
);

// Componente para la sección de Llamada a la Acción (CTA)
const CTASection = () => (
  <Section className="bg-gradient-primary dark:bg-gradient-primary-dark text-white w-screen left-1/2 -ml-[50vw] relative">
    {" "}
    {/* Estilos de la sección CTA */}
    {/* Decoraciones de fondo */}
    <motion.div
      // Eliminada rotación para mejorar rendimiento y simplicidad visual
      // animate={{ rotate: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }} // Transición
      className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full" // Estilos de la decoración
    />
    <motion.div
      // animate={{ rotate: [360, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }} // Transición
      className="absolute -bottom-20 -left-20 w-32 h-32 border border-white/10 rounded-full" // Estilos de la decoración
    />
    <motion.div
      initial="hidden" // Estado inicial: oculto
      whileInView="visible" // Anima a visible cuando está en la vista
      viewport={{ once: true, amount: 0.5 }} // Configuración del viewport
      variants={containerVariants} // Aplica variantes de animación de contenedor
      className="text-center relative z-10" // Estilos del contenido
    >
      <motion.div
        variants={itemVariants} // Aplica variantes de animación de item
        className="inline-flex p-4 mb-8 bg-white/10 rounded-2xl backdrop-blur-sm" // Estilos del contenedor del icono
      >
        <FaMagic className="w-12 h-12 text-white" /> {/* Icono de magia */}
      </motion.div>
      <motion.h2
        variants={itemVariants} // Aplica variantes de animación de item
        className="text-3xl md:text-4xl font-bold mb-6" // Estilos del título
      >
        ¿Listo para Transformar tu Sonrisa? {/* Título */}
      </motion.h2>
      <motion.p
        variants={itemVariants} // Aplica variantes de animación de item
        className="text-xl mb-8 opacity-90 max-w-3xl mx-auto" // Estilos del subtítulo
      >
        Agenda tu cita hoy y recibe una consulta de evaluación gratuita{" "}
        {/* Descripción */}
      </motion.p>
      <motion.div
        variants={itemVariants} // Aplica variantes de animación de item
        className="flex flex-col sm:flex-row gap-4 justify-center" // Contenedor de botones
      >
        <DentalButton
          variant="primary" // Variante del botón
          size="lg" // Tamaño del botón
          icon={<FaCalendarPlus />} // Icono del botón
          className="bg-white text-primary font-bold shadow-dental-xl hover:shadow-dental-2xl border " // Estilos adicionales
        >
          Agendar Cita {/* Texto del botón */}
        </DentalButton>
        <Link href="/contact">
          {" "}
          {/* Enlace a la página de contacto */}
          <DentalButton
            variant="secondary" // Variante del botón
            size="lg" // Tamaño del botón
            className="border-2 border-white text-white hover:bg-white hover:text-primary-500 backdrop-blur-sm" // Estilos adicionales
          >
            Contactar {/* Texto del botón */}
          </DentalButton>
        </Link>
      </motion.div>
    </motion.div>
  </Section>
);

// Componente para la sección de Contacto
const ContactSection = () => (
  <Section>
    <motion.div
      initial="hidden" // Estado inicial: oculto
      whileInView="visible" // Anima a visible cuando está en la vista
      viewport={{ once: true, amount: 0.3 }} // Configuración del viewport
      variants={containerVariants} // Aplica variantes de animación de contenedor
    >
      <SectionTitle
        title="Información de Contacto" // Título de la sección
        subtitle="Estamos aquí para ayudarte. Contáctanos por cualquiera de estos medios." // Subtítulo
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center max-w-4xl mx-auto">
        {" "}
        {/* Grid responsivo para las tarjetas de contacto */}
        {contactInfo.map((info, index) => (
          <ContactCard key={index} info={info} index={index} /> // Renderiza las tarjetas de contacto
        ))}
      </div>
    </motion.div>
  </Section>
);

// --- Main Services Page Component (Componente Principal de la Página de Servicios) ---
// Este es el componente principal que compone toda la página de servicios
function ServicesPage() {
  return (
    <div className="min-h-screen dental-bg-background relative pt-6 sm:pt-4">
      {" "}
      {/* Contenedor principal de la página con altura mínima de pantalla y fondo temático */}
      {/* Decoraciones de fondo fijas */}
      {/* Fondo decorativo fijo removido (dos círculos blur animados) para reducir distracción y repaints */}
      {/* Sección Hero */}
      <HeroSection />
      {/* Categorías de Servicios */}
      <Section>
        {Object.entries(servicesData).map(([category, categoryData], index) => (
          <ServiceCategory
            key={category} // Clave única para cada categoría
            category={category} // Nombre de la categoría
            categoryData={categoryData} // Datos de la categoría
            index={index} // Índice de la categoría para posibles retrasos de animación
          />
        ))}
      </Section>
      {/* Sección CTA */}
      <CTASection />
      {/* Sección de Contacto */}
      <ContactSection />
    </div>
  );
}

export default ServicesPage; // Exporta el componente principal para que pueda ser usado en otras partes de la aplicación
