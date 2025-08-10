"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

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
            <motion.div className="absolute inset-0 scale-110" style={{ y: currentIndex === index ? y : 0 }}>
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority={index === 0}
                quality={60}
              />
            </motion.div>

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
                      className="text-lg md:text-2xl text-white/95 max-w-3xl mx-auto"
                    >
                      {slideTexts[index]?.desc}
                    </motion.p>

                    {/* CTA */}
                    <div className="mt-6">
                      <DentalButton variant="primary">{slideTexts[index]?.cta}</DentalButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controles */}
            <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-6">
              <button
                aria-label="Anterior"
                onClick={prevSlide}
                className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
              >
                <ChevronLeft />
              </button>
              <div className="flex items-center gap-3">
                <button
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  onClick={() => setIsPlaying((v) => !v)}
                  className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
                >
                  {isPlaying ? <Pause /> : <Play />}
                </button>
              </div>
              <button
                aria-label="Siguiente"
                onClick={nextSlide}
                className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Carousel;
