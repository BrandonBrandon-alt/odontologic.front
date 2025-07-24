"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

import DentalButton from "../ui/Button";

// Imágenes del carousel
const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];

const slideTexts = [
  {
    title: "Bienvenido a Odontologic",
    desc: "Tecnología, calidez y excelencia para tu sonrisa.",
    cta: "Conoce más",
  },
  {
    title: "Cuidamos tu Salud Bucal",
    desc: "Tratamientos modernos y personalizados para cada paciente.",
    cta: "Ver servicios",
  },
  {
    title: "Equipo Profesional",
    desc: "Dentistas expertos comprometidos con tu bienestar y confort.",
    cta: "Nuestro equipo",
  },
  {
    title: "Agenda tu Cita Hoy",
    desc: "¡Da el primer paso hacia una sonrisa saludable y radiante!",
    cta: "Agendar cita",
  },
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const x = useMotionValue(0);

  // Efecto de paralaje
  const y = useTransform(x, [-width, 0], [-50, 50]);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        );
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goToSlide = (index, dir = 0) => {
    setDirection(dir);
    setCurrentIndex(index);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      x.set(-index * slideWidth);
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % images.length;
    goToSlide(next, 1);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    goToSlide(prev, -1);
  };

  const handleDragEnd = (event, info) => {
    const slideWidth = carouselRef.current.offsetWidth;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > slideWidth / 3) {
      const direction = offset < 0 ? 1 : -1;
      const newIndex = Math.max(
        0,
        Math.min(currentIndex + direction, images.length - 1)
      );
      goToSlide(newIndex, direction);
    } else {
      goToSlide(currentIndex, 0);
    }
  };

  // Auto-play mejorado
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  // Animaciones de entrada del texto
  const textVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-dental-2xl shadow-dental-xl bg-gradient-to-br from-surface to-surface-secondary dark:from-surface-dark dark:to-neutral-800"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      }}
    >
      {/* Contenedor principal del carousel */}
      <motion.div
        ref={carouselRef}
        className="flex cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        style={{ x }}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileDrag={{ scale: 0.98 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative flex-shrink-0 w-full h-[600px] flex items-center justify-center overflow-hidden"
          >
            {/* Imagen de fondo con efecto parallax */}
            <motion.div
              className="absolute inset-0 scale-110"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                y: currentIndex === index ? y : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            />

            {/* Overlay con gradiente dinámico */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80"
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: currentIndex === index ? 0.8 : 0.6,
                background:
                  currentIndex === index
                    ? "linear-gradient(135deg, rgba(1, 87, 92, 0.9) 0%, rgba(0, 173, 181, 0.7) 50%, rgba(52, 211, 153, 0.46) 100%)"
                    : "linear-gradient(135deg, rgba(0, 173, 181, 0.6) 0%, rgba(0, 173, 181, 0.4) 50%, rgba(52, 211, 153, 0.32) 100%)",
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Efectos de luz */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10" />

            {/* Contenido de texto mejorado */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl">
              <AnimatePresence mode="wait" custom={direction}>
                {currentIndex === index && (
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                    }}
                    className="space-y-6"
                  >
                    {/* Título principal */}
                    <motion.h2
                      className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-white leading-tight"
                      style={{
                        textShadow:
                          "0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {slideTexts[index]?.title}
                    </motion.h2>

                    {/* Descripción */}
                    <motion.p
                      className="text-xl md:text-2xl lg:text-3xl text-white/95 font-light max-w-3xl leading-relaxed"
                      style={{
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {slideTexts[index]?.desc}
                    </motion.p>

                    {/* Botón CTA mejorado */}
                    {/* Botón reemplazado por tu componente reutilizable */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <DentalButton
                        variant="primary"
                        size="lg"
                        rounded="xl"
                        className="mt-8"
                      >
                        {slideTexts[index]?.cta}
                      </DentalButton>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Controles de navegación mejorados */}
      <motion.button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 group focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Anterior"
      >
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-full shadow-dental-lg hover:bg-accent hover:border-accent/50 transition-all duration-300 group-hover:shadow-dental-xl group-focus:bg-accent">
          <ChevronLeft
            size={32}
            className="text-white group-hover:text-white drop-shadow-sm transition-colors duration-300"
          />
        </div>
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 group focus:outline-none focus:ring-2 focus:ring-accent-600  focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
        whileHover={{ scale: 1.1, x: 4 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Siguiente"
      >
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-full shadow-dental-lg hover:bg-accent hover:border-accent/50 transition-all duration-300 group-hover:shadow-dental-xl group-focus:bg-accent">
          <ChevronRight
            size={32}
            className="text-white group-hover:text-white drop-shadow-sm transition-colors duration-300"
          />
        </div>
      </motion.button>

      {/* Control de play/pause */}
      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-6 right-6 group focus:outline-none focus:ring-2 focus:ring-accent-600  focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-3 rounded-full shadow-dental-md hover:bg-accent hover:border-accent/50 transition-all duration-300 group-focus:bg-accent">
          {isPlaying ? (
            <Pause
              size={20}
              className="text-white group-hover:text-white transition-colors duration-300"
            />
          ) : (
            <Play
              size={20}
              className="text-white group-hover:text-white transition-colors duration-300"
            />
          )}
        </div>
      </motion.button>

      {/* Indicadores modernos */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-3 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
            className="relative group focus:outline-none"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Ir al slide ${index + 1}`}
          >
            {/* Indicador base */}
            <div
              className={`w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />

            {/* Barra de progreso para el slide activo */}
            {index === currentIndex && isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                style={{
                  background: `conic-gradient(from 0deg, transparent 0deg, white ${360}deg, transparent ${360}deg)`,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Información del slide actual */}
      <div className="absolute bottom-8 left-8 text-white/80 text-sm font-medium backdrop-blur-sm bg-black/20 px-3 py-1 rounded-dental-md">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

export default Carousel;
