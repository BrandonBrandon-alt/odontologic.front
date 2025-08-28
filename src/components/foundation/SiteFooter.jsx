"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navSections = [
  {
    heading: "Navegación",
    links: [
      ["/", "Inicio"],
      ["/about", "Nosotros"],
      ["/services", "Servicios"],
      ["/contact", "Contacto"],
      ["/login", "Iniciar Sesión"],
      ["/register", "Registrarse"],
    ],
  },
  {
    heading: "Servicios",
    links: [
      ["/services", "Odontología General"],
      ["/services", "Ortodoncia"],
      ["/services", "Endodoncia"],
      ["/services", "Cirugía Oral"],
      ["/services", "Estética Dental"],
      ["/services", "Periodoncia"],
    ],
  },
];

const socials = [
  [
    "https://facebook.com",
    "Facebook",
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>,
  ],
  [
    "https://instagram.com",
    "Instagram",
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.017 0C8.396 0 7.989.013 6.77.072 5.55.132 4.757.281 4.063.563c-.74.306-1.37.717-1.996 1.343C1.441 2.532 1.03 3.162.724 3.902.441 4.596.293 5.389.233 6.609.173 7.828.16 8.235.16 11.855c0 3.621.013 4.028.072 5.248.061 1.22.21 2.013.492 2.707.306.74.717 1.37 1.343 1.996.626.626 1.256 1.037 1.996 1.343.694.283 1.487.431 2.707.492 1.22.06 1.627.072 5.248.072 3.62 0 4.027-.012 5.247-.072 1.22-.061 2.013-.209 2.707-.492.74-.306 1.37-.717 1.996-1.343.626-.626 1.037-1.256 1.343-1.996.283-.694.431-1.487.492-2.707.06-1.22.072-1.627.072-5.248 0-3.62-.012-4.027-.072-5.247-.061-1.22-.209-2.013-.492-2.707-.306-.74-.717-1.37-1.343-1.996C19.99 1.441 19.36 1.03 18.62.724 17.926.441 17.133.293 15.913.233 14.694.173 14.287.16 10.667.16h1.35zm0 2.161c3.549 0 3.97.014 5.378.072 1.298.059 2.003.275 2.472.458.622.242 1.066.532 1.533.999.467.467.757.911.999 1.533.183.469.399 1.174.458 2.472.058 1.408.072 1.829.072 5.378 0 3.549-.014 3.97-.072 5.378-.059 1.298-.275 2.003-.458 2.472-.242.622-.532 1.066-.999 1.533-.467.467-.911.757-1.533.999-.469.183-1.174.399-2.472.458-1.408.058-1.829.072-5.378.072-3.549 0-3.97-.014-5.378-.072-1.298-.059-2.003-.275-2.472-.458-.622-.242-1.066-.532-1.533-.999-.467-.467-.757-.911-.999-1.533-.183-.469-.399-1.174-.458-2.472-.058-1.408-.072-1.829-.072-5.378 0-3.549.014-3.97.072-5.378.059-1.298.275-2.003.458-2.472.242-.622.532-1.066.999-1.533.467-.467.911-.757 1.533-.999.469-.183 1.174-.399 2.472-.458 1.408-.058 1.829-.072 5.378-.072z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M12.017 7.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zM12.017 16a4 4 0 110-8 4 4 0 010 8z"
        clipRule="evenodd"
      />
      <path d="M18.406 6.594a.972.972 0 11-1.944 0 .972.972 0 011.944 0z" />
    </svg>,
  ],
  [
    "https://wa.me/573001234567",
    "WhatsApp",
    <svg
      className="w-5 h-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>,
  ],
];

// Componente para sección de navegación colapsible
const CollapsibleNavSection = ({ section, isLast = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-labelledby={`ft-${section.heading}`}
      className={`${isLast ? "md:col-span-1" : ""}`}
    >
      {/* Header con botón colapsible en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left md:pointer-events-none md:cursor-default group"
        aria-expanded={isOpen}
        aria-controls={`nav-${section.heading}`}
      >
        <h3
          id={`ft-${section.heading}`}
          className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-accent md:group-hover:text-[var(--color-text-primary)] transition-colors"
        >
          {section.heading}
        </h3>
        {/* Icono chevron solo visible en móvil */}
        <motion.svg
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-[var(--color-text-secondary)] md:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      {/* Lista de enlaces - colapsible en móvil, siempre visible en desktop */}
      <div className="md:block" style={{ marginTop: "1.25rem" }}>
        <AnimatePresence initial={false}>
          {(isOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 768)) && (
            <motion.ul
              id={`nav-${section.heading}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              className="space-y-2 text-sm overflow-hidden md:!block md:!opacity-100 md:!h-auto"
            >
              {section.links.map(([href, label]) => (
                <motion.li
                  key={label}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.2 },
                  }}
                  exit={{ x: -10, opacity: 0 }}
                >
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 px-1 py-0.5 rounded text-[var(--color-text-secondary)] hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 transition-colors"
                  >
                    <span className="relative">
                      {label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default function SiteFooter() {
  return (
    <footer className="mt-12 sm:mt-16 lg:mt-20 pt-12 sm:pt-16 pb-8 sm:pb-10 border-t-2 border-border dark:border-border-dark bg-[var(--color-primary)]/60 dark:bg-[var(--color-surface)]/60 backdrop-blur-[4px] relative overflow-hidden">
      {/* Decorative subtle gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-30 mix-blend-overlay">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/25 via-primary/20 to-transparent blur-3xl" />
      </div>

      <div className="layout-container relative z-10">
        {/* Main Content Grid - Responsive */}
        <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-12 lg:mb-14">
          {/* Brand / Intro - Full width on mobile, spans 2 cols on tablet */}
          <div className="sm:col-span-2 lg:col-span-1 order-1">
            <div className="flex flex-col gap-4 sm:gap-5 max-w-sm mx-auto sm:mx-0 bg-white/40 dark:bg-white/5 border border-border dark:border-border-dark/70 rounded-xl p-4 sm:p-5 backdrop-blur-sm shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center sm:justify-start gap-2 text-[var(--color-text-primary)]">
                <svg
                  className="w-6 h-6 text-accent flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.02 10.45 8.09 11.22.34.24.81.24 1.15 0C13.98 21.45 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.14 18.09 5 14.13 5 11c0-3.86 3.14-7 7-7s7 3.14 7 7c0 3.13-5.14 7.09-7 8.88z" />
                  <circle cx="12" cy="11" r="3" />
                </svg>
                <span>Odontologic</span>
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] text-center sm:text-left">
                Cuidamos tu sonrisa con tecnología de vanguardia y un trato
                humano excepcional en Armenia, Quindío.
              </p>
              <ul className="text-sm space-y-1 text-[var(--color-text-secondary)] text-center sm:text-left">
                <li>
                  <a
                    href="tel:+573001234567"
                    className="hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 rounded transition-colors inline-block"
                  >
                    +57 300 123 4567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@odontologic.com"
                    className="hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 rounded transition-colors inline-block"
                  >
                    info@odontologic.com
                  </a>
                </li>
                <li>Calle 10 #15-20, Armenia</li>
              </ul>
            </div>
          </div>

          {/* Navigation Sections - Collapsible */}
          <div className="order-2 sm:order-2 lg:order-2">
            <CollapsibleNavSection section={navSections[0]} />
          </div>

          <div className="order-3 sm:order-3 lg:order-3">
            <CollapsibleNavSection section={navSections[1]} />
          </div>

          {/* Social & Hours - Always visible, responsive layout */}
          <div className="order-4 sm:col-span-2 lg:col-span-1 lg:order-4">
            <div className="flex flex-col gap-4 sm:gap-6 max-w-sm mx-auto sm:max-w-none">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] text-center sm:text-left">
                Síguenos
              </h3>

              {/* Social Icons */}
              <ul
                className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4"
                aria-label="Redes sociales"
              >
                {socials.map(([href, label, icon]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full p-2.5 sm:p-3 bg-white/40 dark:bg-white/5 border border-border dark:border-border-dark/60 text-[var(--color-text-primary)] hover:bg-accent hover:text-white dark:hover:bg-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 group"
                    >
                      <span className="flex items-center justify-center w-full h-full">
                        {icon}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Hours */}
              <div className="text-sm space-y-1 text-[var(--color-text-secondary)] text-center sm:text-left">
                <p className="font-semibold text-[var(--color-text-primary)]">
                  Horarios
                </p>
                <p>Lun - Vie: 8:00 - 18:00</p>
                <p>Sáb: 8:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Legal Links & Copyright */}
        <div className="border-t-2 border-border dark:border-border-dark pt-6 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:gap-4 lg:justify-between lg:items-center">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-[var(--color-text-secondary)] order-2 lg:order-1">
            <Link
              href="/privacy"
              className="hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 rounded px-1 transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terms"
              className="hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 rounded px-1 transition-colors"
            >
              Términos
            </Link>
            <Link
              href="/about"
              className="hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 rounded px-1 transition-colors"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/contact"
              className="hover:text-accent focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent/60 rounded px-1 transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-right text-[10px] sm:text-xs leading-relaxed text-[var(--color-text-secondary)] order-1 lg:order-2 max-w-md mx-auto lg:mx-0">
            &copy; {new Date().getFullYear()} Odontologic. Todos los derechos
            reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
