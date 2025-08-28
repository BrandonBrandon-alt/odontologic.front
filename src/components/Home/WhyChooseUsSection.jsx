"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // FIX: Added this import

import Card from "../ui/Card";
import { FaShieldVirus, FaClock } from "react-icons/fa";
import { MdOutlineGroups3 } from "react-icons/md";
import { GiSparkles } from "react-icons/gi";

const WhyChooseUsSection = () => {
  const services = [
    {
      icon: <FaShieldVirus />,
      iconColor: "text-primary-500",
      title: "Seguridad Garantizada",
      description:
        "Información personal y médica protegida con estándares de seguridad y confidencialidad.",
      link: "/services#general",
    },
    {
      icon: <FaClock />,
      iconColor: "text-accent-700",
      title: "Atención Rápida",
      description:
        "Agenda tu cita en minutos y recibe atención oportuna sin largas esperas.",
      link: "/services#esthetic",
    },
    {
      icon: <MdOutlineGroups3 />,
      iconColor: "text-accent-500",
      title: "Equipo Profesional",
      description:
        "Contamos con dentistas certificados y personal capacitado para brindarte la mejor atención.",
      link: "/services#orthodontics",
    },
    {
      icon: <GiSparkles />,
      iconColor: "text-yellow-500",
      title: "Tecnología Avanzada",
      description:
        "Utilizamos equipos de última generación para diagnósticos precisos y tratamientos efectivos.",
      link: "/services#orthodontics",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold dental-text-primary mb-6">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-lg md:text-xl dental-text-secondary max-w-3xl mx-auto leading-relaxed">
            Beneficios clave que nos diferencian y mejoran tu experiencia dental
            integral.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link
                href={service.link}
                aria-label={service.title}
                className="h-full block focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/40 rounded-2xl"
              >
                <Card
                  variant="elevated"
                  interactive={true}
                  className={`bg-[var(--color-primary)] dark:bg-[var(--color-surface)] p-8 text-center h-full flex flex-col items-center justify-start border-2 border-border dark:border-border-dark`}
                >
                  <div className={`mb-5 ${service.iconColor}`}>
                    {React.cloneElement(service.icon, { size: 48 })}
                  </div>
                  <h3 className="text-xl font-bold dental-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="dental-text-primary leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        />
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
