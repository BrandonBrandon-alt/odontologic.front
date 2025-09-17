"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  AcademicCapIcon,
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  TrophyIcon as OutlineTrophyIcon,
  StarIcon,
  LightBulbIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

// Forzar el icono Trophy a color amarillo
const TrophyIcon = ({ className = "", ...props }) => (
  <OutlineTrophyIcon {...props} className={`${className} text-yellow-400`} />
);
import {
  FaCalendarPlus,
  FaStethoscope,
  FaAward,
  FaUsers,
  FaSmile,
} from "react-icons/fa";
import { clinicData } from "@/lib/data";
import Image from "next/image";
import DentalButton from "@/components/ui/Button";
import Card, { StatCard } from "@/components/ui/Card";

// --- Enhanced Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const scaleOnHover = {
  hover: {
    scale: 1.08,
    y: -12,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-15, 15, -15],
    rotate: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// --- Enhanced Shared Components ---
const Section = ({ children, className = "", background = "" }) => (
  <section className={`py-20 md:py-28 ${background} ${className}`}>
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const SectionTitle = ({
  title,
  subtitle,
  gradient = false,
  icon,
  size = "large",
}) => (
  <motion.div variants={itemVariants} className="text-center mb-20">
    {icon && (
      <motion.div
        className="text-7xl mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        {icon}
      </motion.div>
    )}
    <motion.h2
      className={`${
        size === "large"
          ? "text-4xl md:text-5xl lg:text-6xl"
          : "text-3xl md:text-4xl lg:text-5xl"
      } font-black mb-6 leading-tight ${
        gradient
          ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          : "text-primary-500"
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      {title}
    </motion.h2>
    <motion.div
      className="w-32 h-1.5 bg-accent-500 mx-auto rounded-full mb-8"
      initial={{ width: 0 }}
      animate={{ width: 128 }}
      transition={{ delay: 0.5, duration: 1 }}
    />
    {subtitle && (
      <motion.p
        className="text-xl md:text-2xl text-text-secondary max-w-5xl mx-auto leading-relaxed font-medium"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

// --- Redesigned History and Mission Section ---
const HistoryMissionSection = () => (
  <Section>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="grid lg:grid-cols-2 gap-20 items-center"
    >
      <motion.div variants={slideInFromLeft} className="space-y-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-2 border-border dark:border-border-dark  rounded-2xl flex items-center justify-center shadow-xl">
            <TrophyIcon className="w-8 h-8 text-yellow" />
          </div>
          <h2 className="text-5xl font-black text-primary">Nuestra Historia</h2>
        </div>

        <div className="space-y-8 text-text-secondary text-xl leading-relaxed">
          <div className="relative pl-8">
            <span className="absolute left-0 top-3 w-3 h-3 bg-primary rounded-full shadow-lg"></span>
            <p>
              Fundada en{" "}
              <span className="font-bold text-primary text-2xl">
                {clinicData.founded}
              </span>
              , {clinicData.name} nació con la bg-[var(--color-primary)]
              dark:bg-[var(--color-surface)] visión de ser un referente en salud
              oral, donde cada paciente se sienta seguro, cómodo y valorado.
            </p>
            from-primary to-accent rounded-xl
          </div>
          <div className="relative pl-8">
            <span className="absolute left-0 top-3 w-3 h-3 bg-accent rounded-full shadow-lg"></span>
            <p>
              A lo largo de los años, hemos crecido hasta convertirnos en una de
              las clínicas más respetadas, gracias a nuestro compromiso
              inquebrantable con la calidad y la atención personalizada.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={slideInFromRight} className="relative">
        <Card
          variant="default"
          className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-2 border-border dark:border-border-dark shadow-2xl backdrop-blur-xl p-8"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-text-primary">
              Misión y Visión
            </h3>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-primary/10 rounded-2xl border-l-4 border-primary shadow-lg">
              <p className="text-text-secondary text-lg">
                <strong className="text-primary text-xl">Misión:</strong>{" "}
                Proporcionar atención dental integral de la más alta calidad
                para mejorar la salud y la vida de nuestros pacientes.
              </p>
            </div>

            <div className="p-6 bg-accent/10 rounded-2xl border-l-4 border-accent shadow-lg">
              <p className="text-text-secondary text-lg">
                <strong className="text-accent text-xl">Visión:</strong> Ser la
                clínica dental líder en innovación, excelencia médica y
                satisfacción del paciente en Colombia.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  </Section>
);

// --- Redesigned Values Section ---
const ValuesSection = () => (
  <Section>
    <SectionTitle
      title="Nuestros Valores Fundamentales"
      subtitle="Los principios que guían cada una de nuestras acciones y decisiones, creando la base de nuestra excelencia."
      gradient={true}
      icon="💎"
    />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10 justify-items-center max-w-7xl mx-auto"
    >
      {clinicData.values.map((value, index) => (
        <ValueCard key={index} {...value} index={index} />
      ))}
    </motion.div>
  </Section>
);

// --- Enhanced Value Card Component ---
const ValueCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    variants={itemVariants}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.15, duration: 0.8 }}
    whileHover={scaleOnHover.hover}
    className="w-full max-w-sm mx-auto"
  >
    <Card
      variant="default"
      className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center h-full min-h-[300px] border-2 border-border dark:border-border-dark shadow-2xl relative overflow-hidden group"
    >
      <motion.div
        whileHover={{ scale: 1.3, rotate: 15 }}
        className="inline-flex p-6 mb-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl shadow-lg"
      >
        <Icon className="w-12 h-12 text-primary" />
      </motion.div>
      <h3 className="text-2xl font-bold text-text-primary mb-4">{title}</h3>
      <p className="text-text-secondary leading-relaxed text-lg">
        {description}
      </p>

      {/* Enhanced hover effect decoration */}
      <motion.div
        className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary to-accent rounded-t-full"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />

      {/* Background decoration */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
      />
    </Card>
  </motion.div>
);

// --- Redesigned Team Section ---
const TeamSection = () => (
  <Section>
    <SectionTitle
      title="Nuestro Equipo de Expertos"
      subtitle="Conoce a los profesionales dedicados a cuidar de tu sonrisa con pasión, experiencia y excelencia médica."
      icon="👨‍⚕️"
    />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10 justify-items-center max-w-7xl mx-auto"
    >
      {clinicData.team.map((member, index) => (
        <TeamMemberCard key={index} member={member} index={index} />
      ))}
    </motion.div>
  </Section>
);

// --- Enhanced Team Member Card Component ---
const TeamMemberCard = ({ member, index }) => (
  <motion.div
    variants={itemVariants}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.2, duration: 0.8 }}
    whileHover={scaleOnHover.hover}
    className="w-full max-w-sm mx-auto"
  >
    <Card
      variant="default"
      className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] h-full border-2 border-border dark:border-border-dark shadow-2xl relative overflow-hidden group"
    >
      {/* Enhanced Image container */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={member.image}
          alt={`Foto de ${member.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.3 + 0.5 }}
          className="absolute top-4 right-4 bg-white/95 dark:bg-surface-secondary/95 p-3 rounded-full shadow-xl"
        >
          <StarIcon className="w-6 h-6 text-primary" />
        </motion.div>
      </div>

      {/* Enhanced Content */}
      <div className="p-8 text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.3 + 0.3 }}
        >
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            {member.name}
          </h3>
          <p className="text-primary font-semibold text-lg mb-3">
            {member.specialty}
          </p>
          <p className="text-text-secondary leading-relaxed">
            {member.education}
          </p>
        </motion.div>

        {/* Enhanced decorative line */}
        <motion.div
          className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.3 + 0.8, duration: 1 }}
        />
      </div>
    </Card>
  </motion.div>
);

// --- Redesigned Why Choose Us Section ---
const WhyChooseUsSection = () => (
  <Section>
    <SectionTitle
      title="¿Por Qué Elegirnos?"
      subtitle="Descubre las razones por las que miles de pacientes confían en nosotros día a día para el cuidado de su salud dental."
      gradient={true}
      icon="🏆"
    />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 justify-items-center max-w-7xl mx-auto"
    >
      {clinicData.whyChooseUs.map((reason, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.15, duration: 0.8 }}
          whileHover={scaleOnHover.hover}
          className="w-full max-w-sm mx-auto"
        >
          <Card
            variant="default"
            className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] h-full min-h-[250px] border-2 border-border dark:border-border-dark shadow-2xl relative overflow-hidden flex items-start space-x-6 p-8"
          >
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-5 rounded-2xl shadow-lg">
                <reason.icon className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {reason.title}
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                {reason.description}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

// --- Enhanced CTA Section ---
const CTASection = () => (
  <Section className="relative text-white">
    <div className="full-bleed-bg bg-gradient-primary dark:bg-gradient-primary-dark absolute inset-0 -z-10" />
    {/* Enhanced Background decorations */}
    <motion.div
      // Rotación eliminada
      // animate={{ rotate: [0, 360] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute -top-32 -right-32 w-64 h-64 border border-white/10 rounded-full"
    />
    <motion.div
      // animate={{ rotate: [360, 0] }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-32 -left-32 w-48 h-48 border border-white/10 rounded-full"
    />
    <motion.div
      // animate={{ rotate: [0, 180, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full"
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
        className="inline-flex p-6 mb-10 bg-white/15 rounded-3xl backdrop-blur-xl shadow-2xl"
      >
        <SparklesIcon className="w-16 h-16 text-white" />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-10 tracking-tight"
      >
        ¿Listo para Transformar tu Sonrisa?
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-2xl md:text-3xl mb-16 max-w-4xl mx-auto opacity-95 leading-relaxed font-medium"
      >
        Únete a nuestra familia de pacientes satisfechos. Tu sonrisa es nuestra
        mayor recompensa y el testimonio de nuestro compromiso contigo.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-8 justify-center items-center"
      >
        <Link href="/login" passHref>
          <DentalButton
            variant="primary"
            size="lg"
            icon={<FaCalendarPlus />}
            className="bg-white text-primary font-bold shadow-2xl hover:shadow-3xl text-lg px-8 py-4"
          >
            Agendar Cita
          </DentalButton>
        </Link>

        <Link href="/services" passHref>
          <DentalButton
            variant="secondary"
            size="lg"
            icon={<FaStethoscope />}
            className="border-2 border-white text-white font-bold backdrop-blur-sm hover:bg-white hover:text-primary-500 text-lg px-8 py-4 shadow-2xl"
          >
            Ver Servicios
          </DentalButton>
        </Link>
      </motion.div>
    </motion.div>
  </Section>
);

// --- Main About Page Component ---
function AboutPage() {
  return (
    <div className="min-h-screen dental-bg-background relative">
      {/* Enhanced Fixed Background decorations */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          // className removed: blurred gradient circle eliminated
          // className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          // className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-accent/8 to-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
        />
      </div>

      {/* Page Sections */}
      <HistoryMissionSection />
      <ValuesSection />
      <TeamSection />
      <WhyChooseUsSection />
    </div>
  );
}

export default AboutPage;
