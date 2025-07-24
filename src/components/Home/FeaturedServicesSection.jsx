"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // FIX: Added this import

import Card from "../ui/Card";
import { FaUsers, FaStar, FaHeart } from "react-icons/fa";

const FeaturedServicesSection = () => {
  const services = [
    {
      icon: <FaUsers />,
      iconColor: "text-primary-500",
      title: "Odontología General",
      description:
        "Revisiones completas, limpiezas profesionales y tratamientos para mantener tu salud bucal.",
      borderColor: "border-primary-500",
      link: "/services#general",
    },
    {
      icon: <FaStar />,
      iconColor: "text-secondary-500",
      title: "Estética Dental",
      description:
        "Blanqueamientos, carillas y tratamientos para lograr la sonrisa que siempre has deseado.",
      borderColor: "border-primary-500",
      link: "/services#esthetic",
    },
    {
      icon: <FaHeart />,
      iconColor: "text-accent-500",
      title: "Ortodoncia",
      description:
        "Alineación dental con brackets tradicionales o invisibles para una sonrisa perfecta.",
      borderColor: "border-primary-500",
      link: "/services#orthodontics",
    },
  ];

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold dental-text-primary mb-6">
            Nuestros Servicios Destacados
          </h2>
          <p className="text-lg md:text-xl dental-text-secondary max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de servicios odontológicos con la más alta
            calidad y tecnología avanzada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Link href={service.link} className="h-full block">
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
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-block bg-gradient-primary dark:bg-gradient-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out text-lg transform hover:scale-105"
          >
            Ver Todos los Servicios
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
