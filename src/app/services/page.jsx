"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaClock
} from 'react-icons/fa';
import DentalButton from '@/components/ui/Button';
import Card from '@/components/ui/Card';


import Link from 'next/link';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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
// Los datos de servicios ahora se cargan dinámicamente desde la API

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
    icon: FaClock, // Icono de reloj
    title: "Horarios", // Título
    content: ["Lun - Vie: 8:00 AM - 6:00 PM", "Sáb: 8:00 AM - 2:00 PM"], // Horarios de atención
    iconColor: "text-green-500",
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

// Componente para una tarjeta de servicio
const ServiceCard = ({ service, index }) => (
  <motion.div
    variants={itemVariants}
    className="w-full max-w-md"
  >
    <Card
      className="bg-white dark:bg-gray-800 h-full w-full min-h-[200px] border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {service.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {service.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium">
            {service.duration}
          </span>
          <DentalButton variant="primary" size="sm">
            <Link href="/book-appointment">Agendar</Link>
          </DentalButton>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Card>
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
  const [servicesData, setServicesData] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Función para cargar especialidades y servicios desde la API
  const loadServicesData = async () => {
    try {
      setLoading(true);
      
      // Cargar especialidades
      const specialtiesResponse = await fetch(`${API_BASE_URL}/specialties`);
      if (!specialtiesResponse.ok) throw new Error('Error al cargar especialidades');
      const specialtiesData = await specialtiesResponse.json();
      
      console.log('Especialidades response:', specialtiesData);
      
      // Cargar solo servicios destacados (limitamos a los más populares)
      const servicesResponse = await fetch(`${API_BASE_URL}/service-types`);
      if (!servicesResponse.ok) throw new Error('Error al cargar servicios');
      const allServices = await servicesResponse.json();
      
      // Filtrar solo servicios destacados por especialidad (máximo 3 por especialidad)
      const featuredServices = [];
      const servicesPerSpecialty = {};
      
      // Agrupar por especialidad
      allServices.forEach(service => {
        if (!servicesPerSpecialty[service.specialty_id]) {
          servicesPerSpecialty[service.specialty_id] = [];
        }
        servicesPerSpecialty[service.specialty_id].push(service);
      });
      
      // Tomar solo los primeros 3 servicios por especialidad
      Object.values(servicesPerSpecialty).forEach(services => {
        featuredServices.push(...services.slice(0, 3));
      });
      
      const servicesDataResponse = featuredServices;
      
      console.log('Servicios response:', servicesDataResponse);
      console.log('Primer servicio completo:', servicesDataResponse[0]);
      console.log('Campos del primer servicio:', Object.keys(servicesDataResponse[0]));
      
      // Validar que tenemos los datos necesarios
      if (!specialtiesData || !Array.isArray(specialtiesData)) {
        throw new Error('Formato de especialidades inválido');
      }
      
      if (!servicesDataResponse || !Array.isArray(servicesDataResponse)) {
        throw new Error('Formato de servicios inválido');
      }
      
      // Organizar servicios por especialidad
      const organizedData = {};
      
      specialtiesData.forEach((specialty, index) => {
        // Filtrar servicios por especialidad
        const specialtyServices = servicesDataResponse.filter(
          service => service.specialty_id === specialty.id
        );
        
        console.log(`Especialidad: ${specialty.name} (ID: ${specialty.id})`);
        console.log(`Servicios encontrados: ${specialtyServices.length}`);
        
        // Solo crear la categoría si tiene servicios
        if (specialtyServices.length > 0) {
          // Mapear a formato esperado por el componente
          const mappedServices = specialtyServices.map(service => ({
            name: service.name,
            description: service.description,
            duration: `${service.duration} min`
          }));
          
          // Crear clave única para la especialidad
          const categoryKey = specialty.name.toLowerCase().replace(/\s+/g, '_').replace(/ñ/g, 'n');
          
          organizedData[categoryKey] = {
            title: specialty.name,
            color: getColorForIndex(index),
            icon: getIconForSpecialty(specialty.name),
            services: mappedServices,
            totalServices: specialtyServices.length // Para mostrar cuántos servicios hay en total
          };
        }
      });
      
      console.log('Datos organizados:', organizedData);
      console.log('Número de categorías:', Object.keys(organizedData).length);
      
      setSpecialties(specialtiesData);
      setServicesData(organizedData);
      
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para asignar colores
  const getColorForIndex = (index) => {
    const colors = ['primary', 'secondary', 'accent', 'primary'];
    return colors[index % colors.length];
  };

  // Función auxiliar para asignar iconos
  const getIconForSpecialty = (specialtyName) => {
    const iconMap = {
      'Odontología General': '🦷',
      'Ortodoncia': '🪥',
      'Endodoncia': '🔬',
      'Periodoncia': '🦷',
      'Cirugía Oral': '⚕️',
      'Odontopediatría': '👶',
      'Prostodoncia': '🦷',
      'Estética Dental': '✨',
      'Implantología': '🔬',
      'Radiología Oral': '📷'
    };
    return iconMap[specialtyName] || '🦷';
  };

  // Manejar el montaje del componente para evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    if (mounted) {
      loadServicesData();
    }
  }, [mounted]);

  // No renderizar hasta que esté montado (evita problemas de hidratación)
  if (!mounted) {
    return (
      <div className="min-h-screen dental-bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Inicializando...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen dental-bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-screen dental-bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <DentalButton onClick={loadServicesData}>
            Reintentar
          </DentalButton>
        </div>
      </div>
    );
  }

  console.log('Renderizando con servicesData:', servicesData);
  console.log('Número de categorías a renderizar:', Object.keys(servicesData).length);

  return (
    <div className="min-h-screen dental-bg-background relative pt-6 sm:pt-4">
      {/* Categorías de Servicios */}
      <Section>
        {Object.keys(servicesData).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay servicios disponibles</p>
          </div>
        ) : (
          Object.entries(servicesData).map(([category, categoryData], index) => {
            console.log(`Renderizando categoría: ${category}`, categoryData);
            return (
              <ServiceCategory
                key={category}
                category={category}
                categoryData={categoryData}
                index={index}
              />
            );
          })
        )}
      </Section>
      
      {/* Sección "Ver Todos los Servicios" */}
      <Section>
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Buscas un servicio específico?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Estos son solo algunos de nuestros servicios más populares. 
            Ofrecemos una amplia gama de tratamientos dentales especializados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/all">
              <DentalButton variant="primary" size="lg">
                Ver Todos los Servicios
              </DentalButton>
            </Link>
            <DentalButton variant="secondary" size="lg">
              <Link href="/book-appointment">Agendar Consulta</Link>
            </DentalButton>
          </div>
        </div>
      </Section>
      
      {/* Sección de Contacto */}
      <ContactSection />
    </div>
  );
}

export default ServicesPage; // Exporta el componente principal para que pueda ser usado en otras partes de la aplicación
