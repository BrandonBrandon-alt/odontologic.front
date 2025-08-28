import React from "react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    ),
  },
  {
    href: "https://wa.me/573001234567",
    label: "WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.98L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.4 0 4.68.84 6.48 2.36A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.62-.48-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.44 0 1.44 1.03 2.84 1.18 3.04.15.2 2.03 3.1 4.92 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/services", label: "Servicios" },
  { href: "/contact", label: "Contacto" },
  { href: "/login", label: "Iniciar Sesión" },
  { href: "/register", label: "Registrarse" },
  { href: "/guest-appointment", label: "Agendar Cita (Invitado)" },
  { href: "/patient-appointment", label: "Agendar Cita (Paciente)" },
];

const serviceLinks = [
  { href: "/services", label: "Odontología General" },
  { href: "/services", label: "Ortodoncia" },
  { href: "/services", label: "Endodoncia" },
  { href: "/services", label: "Cirugía Oral" },
  { href: "/services", label: "Estética Dental" },
  { href: "/services", label: "Periodoncia" },
];

const Footer = ({ children }) => {
  return (
    <footer className="bg-gradient-primary dark:bg-gradient-primary-dark text-surface border-t-2 border-primary-500 pt-12 pb-8 shadow-inner mt-12 text-white">
      <div className="layout-container">
        {/* Grid principal adaptable */}
        <div className="grid gap-y-12 gap-x-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-accent-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.02 10.45 8.09 11.22.34.24.81.24 1.15 0C13.98 21.45 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.14 18.09 5 14.13 5 11c0-3.86 3.14-7 7-7s7 3.14 7 7c0 3.13-5.14 7.09-7 8.88z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
              <span id="footer-contact-heading">Contáctanos</span>
            </h3>
            <address className="not-italic space-y-2 text-sm opacity-90 text-center md:text-left">
              <p>
                Teléfono:{" "}
                <a
                  href="tel:+573001234567"
                  className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors"
                >
                  +57 300 123 4567
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@odontologic.com"
                  className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors"
                >
                  info@odontologic.com
                </a>
              </p>
              <p>Dirección: Calle 10 #15-20, Armenia, Quindío</p>
              <p className="pt-2 text-xs opacity-70 leading-relaxed max-w-xs">
                Atención personalizada con tecnología de vanguardia para tu
                salud bucal.
              </p>
            </address>
          </div>

          {/* Navegación rápida */}
          <nav
            aria-labelledby="footer-nav-heading"
            className="flex flex-col items-center md:items-start"
          >
            <h3
              id="footer-nav-heading"
              className="text-lg sm:text-xl font-bold mb-5"
            >
              Navegación
            </h3>
            <ul className="space-y-2 text-sm opacity-90 w-full max-w-[220px]">
              {quickLinks.map(({ href, label }) => (
                <li key={label} className="w-full">
                  <Link
                    href={href}
                    className="block w-full focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors px-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav
            aria-labelledby="footer-services-heading"
            className="flex flex-col items-center md:items-start"
          >
            <h3
              id="footer-services-heading"
              className="text-lg sm:text-xl font-bold mb-5"
            >
              Servicios
            </h3>
            <ul className="space-y-2 text-sm opacity-90 w-full max-w-[220px]">
              {serviceLinks.map(({ href, label }) => (
                <li key={label} className="w-full">
                  <Link
                    href={href}
                    className="block w-full focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors px-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes y horarios */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg sm:text-xl font-bold mb-5">Síguenos</h3>
            <ul
              className="flex flex-wrap gap-4 justify-center md:justify-start mb-5"
              aria-label="Redes sociales"
            >
              {socialLinks.map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-accent-500/20 hover:bg-accent-500 text-white rounded-full p-3 transition-colors duration-200 shadow-md focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70"
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
            <div className="text-sm opacity-90 text-center md:text-left space-y-0.5">
              <p className="font-semibold">Horarios:</p>
              <p>Lun - Vie: 8:00 - 18:00</p>
              <p>Sáb: 8:00 - 14:00</p>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-between items-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm opacity-90">
              <Link
                href="/privacy"
                className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terms"
                className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors"
              >
                Términos
              </Link>
              <Link
                href="/about"
                className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors"
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/contact"
                className="focus:outline-none focus-visible:ring-2 ring-offset-2 ring-accent-500/70 rounded hover:underline hover:text-accent-400 transition-colors"
              >
                Contacto
              </Link>
            </div>
            <div className="text-center text-[10px] sm:text-xs opacity-70 leading-relaxed max-w-md">
              &copy; {new Date().getFullYear()} Odontologic. Todos los derechos
              reservados.
            </div>
          </div>
        </div>
      </div>
      {children && (
        <div className="layout-container mt-4 w-full">{children}</div>
      )}
    </footer>
  );
};

export default Footer;
