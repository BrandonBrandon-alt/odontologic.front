"use client";

import React from "react";
import Link from "next/link";

// 1. Reemplazar íconos de Heroicons con react-icons
import {
  FaClock,
  FaShieldAlt,
  FaHeart,
  FaTooth,
  FaMagic,
  FaUserMd,
} from "react-icons/fa";

// 2. Importar tus componentes personalizados Card y Button
import Card, { ActionCard } from "../../components/ui/Card";
import DentalButton from "../../components/ui/Button";

// Datos de servicios (sin cambios en la estructura)
const servicesData = {
  general: {
    title: "Odontología General y Preventiva",
    color: "primary",
    icon: "🦷",
    services: [
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

function ServicesPage() {
  return (
    <div className="min-h-screen dental-bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-primary dark:bg-gradient-primary-dark text-white py-24 animate-fade-in relative w-screen left-1/2 -ml-[50vw]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 animate-slide-up">
            Nuestros Servicios Odontológicos
          </h1>
          <p
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Cuidamos tu sonrisa con tecnología de vanguardia y atención
            personalizada
          </p>
          <div
            className="flex flex-wrap justify-center gap-4 text-sm animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* 3. Íconos reemplazados */}
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <FaClock className="h-5 w-5" />
              <span>Horarios Flexibles</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <FaShieldAlt className="h-5 w-5" />
              <span>Garantía de Calidad</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <FaHeart className="h-5 w-5" />
              <span>Atención Personalizada</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios por Categorías */}
      <section className="py-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(servicesData).map(
            ([category, categoryData], categoryIndex) => (
              <div
                key={category}
                className="mb-20 animate-fade-in-up"
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <div className="text-center mb-12">
                  <div className="text-6xl mb-4">{categoryData.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4">
                    {categoryData.title}
                  </h2>
                  <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
                </div>

                {/* 4. Uso de ActionCard con DentalButton - Centrado y responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto">
                  {categoryData.services.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="w-full max-w-md animate-slide-up"
                      style={{
                        animationDelay: `${
                          categoryIndex * 0.2 + serviceIndex * 0.1
                        }s`,
                      }}
                    >
                      <ActionCard
                        className=" bg-[var(--color-primary)] dark:bg-[var(--color-surface)] h-full w-full  min-h-[200px] border-2 border-border dark:border-border-dark "
                        title={service.name}
                        description={service.description}
                        actions={
                          <div className="flex justify-between items-center w-full mt-6">
                            <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                              {service.duration}
                            </span>
                            <DentalButton variant="primary" size="sm">
                              Agendar
                            </DentalButton>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary dark:bg-gradient-primary-dark text-white py-24 animate-fade-in relative w-screen left-1/2 -ml-[50vw]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            ¿Listo para Transformar tu Sonrisa?
          </h2>
          <p
            className="text-xl mb-8 opacity-90 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Agenda tu cita hoy y recibe una consulta de evaluación gratuita
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* 5. Botones reemplazados por DentalButton */}
            <DentalButton variant="primary">Agendar Cita</DentalButton>
            <Link href="/contact">
              {/* Se usa la variante 'outline' y se ajustan colores para fondo oscuro */}
              <DentalButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-500"
              >
                Contactar
              </DentalButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 animate-fade-in">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-500 mb-4">
              Información de Contacto
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center max-w-4xl mx-auto">
            <div className="w-full max-w-sm">
              <Card className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center h-full min-h-[200px] border-2 border-border dark:border-border-dark">
                <div className=" text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
                <p className="text-gray-100">
                  Calle Principal #123
                  <br />
                  Centro, Ciudad
                </p>
              </Card>
            </div>

            <div className="w-full max-w-sm">
              <Card className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center h-full min-h-[200px] border-2 border-border dark:border-border-dark">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
                <p className="text-gray-100">
                  +57 123 456 7890
                  <br />
                  +57 098 765 4321
                </p>
              </Card>
            </div>

            <div className="w-full max-w-sm">
              <Card className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center h-full min-h-[200px] border-2 border-border dark:border-border-dark">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-semibold mb-2">Horarios</h3>
                <p className="text-gray-100">
                  Lun - Vie: 8:00 AM - 6:00 PM
                  <br />
                  Sáb: 8:00 AM - 2:00 PM
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default ServicesPage;
