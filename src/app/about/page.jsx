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
  TrophyIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { FaCalendarPlus, FaStethoscope } from "react-icons/fa";
import { clinicData } from "@/lib/data";
import Image from "next/image";
import DentalButton from "@/components/ui/Button";
import Card, { StatCard } from "@/components/ui/Card";

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

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
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
          : "text-primary"
      }`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
    <motion.div
      className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"
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

// --- Hero Section Component ---
const HeroSection = () => (
  <motion.section
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="relative bg-gradient-primary dark:bg-gradient-primary-dark text-white py-24 w-screen left-1/2 -ml-[50vw] overflow-hidden"
  >
    {/* Background decorations */}
    <motion.div
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute top-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        rotate: [360, 0],
        scale: [1.1, 1, 1.1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"
    />

    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      {/* Floating elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-20 text-white/20"
      >
        <SparklesIcon className="w-12 h-12" />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-32 right-32 text-white/20"
      >
        <HeartIcon className="w-10 h-10" />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
      >
        <span>Cuidando Sonrisas,</span>
        <br />
        <span className="text-white">Transformando Vidas</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl opacity-90 mb-12 max-w-5xl mx-auto leading-relaxed"
      >
        Desde <span className="font-bold">{clinicData.founded}</span>, hemos
        combinado la
        <span className="font-semibold"> excelencia médica</span> con la
        <span className="font-semibold"> última tecnología</span> para ofrecer
        una experiencia dental inigualable en Colombia.
      </motion.p>

      {/* Enhanced Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        <EnhancedStatCard
          icon={CalendarDaysIcon}
          value={clinicData.experience}
          label="de Experiencia"
          delay={0.2}
        />
        <EnhancedStatCard
          icon={UserGroupIcon}
          value={clinicData.patients}
          label="Pacientes Felices"
          delay={0.4}
        />
        <EnhancedStatCard
          icon={AcademicCapIcon}
          value={`${clinicData.specialties}+`}
          label="Especialidades"
          delay={0.6}
        />
      </motion.div>
    </div>
  </motion.section>
);

// --- Enhanced Stat Card Component ---
const EnhancedStatCard = ({ icon: Icon, value, label, delay = 0 }) => (
  <motion.div
    variants={itemVariants}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={scaleOnHover.hover}
    className="w-full max-w-sm mx-auto"
  >
    <StatCard
      title={label}
      value={value}
      icon={<Icon className="w-8 h-8 text-white" />}
      className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center text-surface h-full min-h-[160px] "
    >
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"
      />
    </StatCard>
  </motion.div>
);

// --- History and Mission Section ---
const HistoryMissionSection = () => (
  <Section>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="grid lg:grid-cols-2 gap-16 items-center"
    >
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <TrophyIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-primary">Nuestra Historia</h2>
        </div>

        <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
          <p className="relative pl-6">
            <span className="absolute left-0 top-2 w-2 h-2 bg-primary rounded-full"></span>
            Fundada en{" "}
            <span className="font-bold text-primary">{clinicData.founded}</span>
            , {clinicData.name} nació con la visión de ser un referente en salud
            oral, donde cada paciente se sienta seguro, cómodo y valorado.
          </p>
          <p className="relative pl-6">
            <span className="absolute left-0 top-2 w-2 h-2 bg-accent rounded-full"></span>
            A lo largo de los años, hemos crecido hasta convertirnos en una de
            las clínicas más respetadas, gracias a nuestro compromiso
            inquebrantable con la calidad y la atención personalizada.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Card
          variant="default"
          className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] border-2 border-border dark:border-border-dark backdrop-blur-xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary">
              Misión y Visión
            </h3>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
              <p className="text-text-secondary">
                <strong className="text-primary text-lg">Misión:</strong>{" "}
                Proporcionar atención dental integral de la más alta calidad
                para mejorar la salud y la vida de nuestros pacientes.
              </p>
            </div>

            <div className="p-4 bg-accent/5 rounded-xl border-l-4 border-accent">
              <p className="text-text-secondary">
                <strong className="text-accent text-lg">Visión:</strong> Ser la
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

// --- Values Section ---
const ValuesSection = () => (
  <Section>
    <SectionTitle
      title="Nuestros Valores"
      subtitle="Los principios que guían cada una de nuestras acciones y decisiones."
      gradient={true}
    />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto"
    >
      {clinicData.values.map((value, index) => (
        <ValueCard key={index} {...value} index={index} />
      ))}
    </motion.div>
  </Section>
);

// --- Value Card Component ---
const ValueCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    variants={itemVariants}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    whileHover={scaleOnHover.hover}
    className="w-full max-w-md mx-auto"
  >
    <Card
      variant="default"
      className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] text-center h-full min-h-[250px] border-2 border-border dark:border-border-dark relative overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        className="inline-flex p-4 mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl"
      >
        <Icon className="w-10 h-10 text-primary" />
      </motion.div>
      <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>

      {/* Hover effect decoration */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Card>
  </motion.div>
);

// --- Team Section ---
const TeamSection = () => (
  <Section>
    <SectionTitle
      title="Un Equipo de Expertos a tu Servicio"
      subtitle="Conoce a los profesionales dedicados a cuidar de tu sonrisa con pasión y excelencia."
    />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto"
    >
      {clinicData.team.map((member, index) => (
        <TeamMemberCard key={index} member={member} index={index} />
      ))}
    </motion.div>
  </Section>
);

// --- Team Member Card Component ---
const TeamMemberCard = ({ member, index }) => (
  <motion.div
    variants={itemVariants}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: index * 0.15, duration: 0.6 }}
    whileHover={scaleOnHover.hover}
    className="w-full max-w-md mx-auto"
  >
    <Card
      variant="default"
      className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] h-full border-2 border-border dark:border-border-dark relative overflow-hidden"
    >
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
        <Image
          src={member.image}
          alt={`Foto de ${member.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2 + 0.5 }}
          className="absolute top-4 right-4 bg-white/90 dark:bg-surface-secondary/90 p-2 rounded-full shadow-lg"
        >
          <StarIcon className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {member.name}
          </h3>
          <p className="text-primary font-semibold mb-2">{member.specialty}</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {member.education}
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
        />
      </div>
    </Card>
  </motion.div>
);

// --- Why Choose Us Section ---
const WhyChooseUsSection = () => (
  <Section>
    <SectionTitle
      title="¿Por Qué Elegirnos?"
      subtitle="Descubre las razones por las que miles de pacientes confían en nosotros día a día."
      gradient={true}
      icon="🌟"
    />
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center max-w-6xl mx-auto"
    >
      {clinicData.whyChooseUs.map((reason, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={scaleOnHover.hover}
          className="w-full max-w-md mx-auto"
        >
          <Card
            variant="default"
            className="bg-[var(--color-primary)] dark:bg-[var(--color-surface)] h-full min-h-[200px] border-2 border-border dark:border-border-dark relative overflow-hidden flex items-start space-x-6"
          >
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-4 rounded-2xl">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {reason.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {reason.description}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

// --- CTA Section ---
const CTASection = () => (
  <Section className="bg-gradient-primary dark:bg-gradient-primary-dark text-white w-screen left-1/2 -ml-[50vw] relative">
    {/* Background decorations */}
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full"
    />
    <motion.div
      animate={{ rotate: [360, 0] }}
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
        <SparklesIcon className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8 tracking-tight"
      >
        ¿Listo para Empezar tu Tratamiento?
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed"
      >
        Únete a nuestra familia de pacientes satisfechos. Tu sonrisa es nuestra
        mayor recompensa y el testimonio de nuestro compromiso contigo.
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

        <Link href="/services" passHref>
          <DentalButton
            variant="secondary"
            size="lg"
            icon={<FaStethoscope />}
            className="border-2 border-white text-white font-bold backdrop-blur-sm hover:bg-white/10"
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
      {/* Fixed Background decorations */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      {/* Page Sections */}
      <HeroSection />
      <HistoryMissionSection />
      <ValuesSection />
      <TeamSection />
      <WhyChooseUsSection />
      <CTASection />
    </div>
  );
}

export default AboutPage;
