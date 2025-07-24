/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Paleta de colores optimizada para light/dark
      colors: {
        // Paleta principal - Verde azulado
        primary: {
          50: "#e0f2f1",
          100: "#b2dfdb",
          200: "#80cbc4",
          300: "#4db6ac",
          400: "#26a69a",
          500: "#009688", // Color base
          600: "#00897b",
          700: "#00796b",
          800: "#00695c",
          900: "#004d40",
          950: "#003d35", // Agregado para mayor contraste en dark
        },

        // Paleta de acento - Celeste
        accent: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00bcd4", // Color base de acento
          600: "#00acc1",
          700: "#0097a7",
          800: "#00838f",
          900: "#006064",
          950: "#004d52", // Agregado para mayor contraste
        },

        // Sistema de colores semánticos mejorado
        background: {
          DEFAULT: "#ffffff", // Light mode
          dark: "#252825", // Dark mode
          secondary: "#f8fafc", // Light secondary
          "secondary-dark": "#1e293b", // Dark secondary
        },

        foreground: {
          DEFAULT: "#0f172a", // Light mode text
          dark: "#f8fafc", // Dark mode text
          muted: "#64748b", // Muted text light
          "muted-dark": "#94a3b8", // Muted text dark
        },

        // Superficies y contenedores
        surface: {
          DEFAULT: "#ffffff", // Light cards/containers
          dark: "#00bcd4", // Dark cards/containers
          elevated: "#f8fafc", // Light elevated surfaces
          "elevated-dark": "#334155", // Dark elevated surfaces
        },

        // Bordes optimizados
        border: {
          DEFAULT: "#e7e7e7fa", // Light borders
          dark: "#009688", // Dark borders
          focus: "#009688", // Focus state
          "focus-dark": "#26a69a", // Focus state dark
        },

        // Estados semánticos con mejor contraste
        success: {
          DEFAULT: "#10b981",
          light: "#dcfce7",
          dark: "#065f46",
          foreground: "#064e3b",
          "foreground-dark": "#a7f3d0",
        },

        warning: {
          DEFAULT: "#f59e0b",
          light: "#fef3c7",
          dark: "#92400e",
          foreground: "#78350f",
          "foreground-dark": "#fde68a",
        },

        error: {
          DEFAULT: "#ef4444",
          light: "#fecaca",
          dark: "#dc2626",
          foreground: "#991b1b",
          "foreground-dark": "#fca5a5",
        },

        info: {
          DEFAULT: "#0ea5e9",
          light: "#dbeafe",
          dark: "#0284c7",
          foreground: "#075985",
          "foreground-dark": "#7dd3fc",
        },

        // Colores de interacción
        interactive: {
          hover: "#f1f5f9", // Light hover
          "hover-dark": "#475569", // Dark hover
          active: "#e2e8f0", // Light active
          "active-dark": "#64748b", // Dark active
        },
      },

      // Variables CSS personalizadas para transiciones suaves
      backgroundColor: {
        theme: "rgb(var(--bg-primary) / <alpha-value>)",
        "theme-secondary": "rgb(var(--bg-secondary) / <alpha-value>)",
        "theme-elevated": "rgb(var(--bg-elevated) / <alpha-value>)",
      },

      textColor: {
        theme: "rgb(var(--text-primary) / <alpha-value>)",
        "theme-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "theme-muted": "rgb(var(--text-muted) / <alpha-value>)",
      },

      borderColor: {
        theme: "rgb(var(--border-primary) / <alpha-value>)",
        "theme-secondary": "rgb(var(--border-secondary) / <alpha-value>)",
      },

      // Espaciado mantenido
      spacing: {
        "dental-xs": "0.25rem",
        "dental-sm": "0.5rem",
        "dental-md": "1rem",
        "dental-lg": "1.5rem",
        "dental-xl": "2rem",
        "dental-2xl": "3rem",
        "dental-3xl": "4rem",
      },

      // Border radius expandido
      borderRadius: {
        "dental-xs": "0.125rem",
        "dental-sm": "0.25rem",
        "dental-md": "0.375rem",
        "dental-lg": "0.5rem",
        "dental-xl": "0.75rem",
        "dental-2xl": "1rem",
        "dental-3xl": "1.5rem",
      },

      // Typography mejorada
      fontSize: {
        "dental-xs": ["0.75rem", { lineHeight: "1rem" }],
        "dental-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "dental-base": ["1rem", { lineHeight: "1.5rem" }],
        "dental-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "dental-xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "dental-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "dental-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "dental-4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },

      // Font family mejorada
      fontFamily: {
        dental: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },

      // Sombras optimizadas para ambos modos
      boxShadow: {
        "dental-xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dental-sm":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dental-md":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "dental-lg":
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "dental-xl":
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "dental-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",

        // Sombras para dark mode
        "dental-dark-sm":
          "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
        "dental-dark-md":
          "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)",
        "dental-dark-lg":
          "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)",
        "dental-dark-xl":
          "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)",
      },

      // Animaciones y transiciones
      transitionProperty: {
        theme: "background-color, border-color, color, box-shadow",
      },

      transitionDuration: {
        theme: "200ms",
      },

      transitionTimingFunction: {
        theme: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // Gradientes para efectos visuales
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #009688 0%, #00bcd4 100%)",
        "gradient-primary-dark":
          "linear-gradient(135deg, #00897b 0%, #009688 100%)",
        "gradient-surface": "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        "gradient-surface-dark":
          "linear-gradient(145deg, #1e293b 0%, #334155 100%)",
      },

      // Backdrop blur para efectos modernos
      backdropBlur: {
        dental: "8px",
        "dental-md": "12px",
        "dental-lg": "16px",
      },

      // Z-index sistemático
      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
        toast: "1080",
      },
    },
  },
  plugins: [],
};
