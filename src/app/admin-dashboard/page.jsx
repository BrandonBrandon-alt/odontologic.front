"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  FaUserShield,
  FaUsersCog,
  FaServer,
  FaChartPie,
  FaTools,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Card, { StatCard } from "@/components/ui/Card";
import DentalButton from "@/components/ui/Button";

const stats = [
  {
    title: "Usuarios activos",
    value: 128,
    icon: <FaUsersCog className="text-primary-500" />,
  },
  {
    title: "Servidores OK",
    value: "100%",
    icon: <FaServer className="text-success-500" />,
  },
  {
    title: "Tickets abiertos",
    value: 3,
    icon: <FaTools className="text-warning-500" />,
  },
];

const systemLogs = [
  { id: 1, message: "Backup completado", level: "info", time: "08:32" },
  { id: 2, message: "Nuevo usuario registrado", level: "info", time: "09:10" },
  {
    id: 3,
    message: "Intento de acceso inválido",
    level: "warning",
    time: "10:05",
  },
  {
    id: 4,
    message: "Job de sincronización finalizado",
    level: "info",
    time: "11:47",
  },
];

const levelClasses = {
  info: "text-info-500",
  warning: "text-warning-500",
  error: "text-error-500",
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { allowed } = useRequireAuth({ role: "admin" });
  const displayName = user?.name || "Administrador";

  if (!allowed) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div
          className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"
          aria-label="Cargando"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-[calc(100vh-5rem)] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
      aria-labelledby="admin-dashboard-heading"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1
            id="admin-dashboard-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
          >
            Panel Administrador
          </h1>
          <p
            className="text-sm md:text-base text-text-secondary mt-2"
            aria-live="polite"
          >
            Hola {displayName}, estado general del sistema y operaciones claves.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <DentalButton variant="primary" icon={<FaUserShield />}>
            Gestión
          </DentalButton>
          <DentalButton variant="outline" icon={<FaChartPie />}>
            Reportes
          </DentalButton>
        </div>
      </header>

      <section aria-labelledby="admin-stats-heading" className="space-y-6">
        <h2 id="admin-stats-heading" className="sr-only">
          Estadísticas principales
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              icon={s.icon}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="system-logs-heading" className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2
            id="system-logs-heading"
            className="text-xl font-bold tracking-tight"
          >
            Logs recientes
          </h2>
          <DentalButton variant="ghost" size="sm">
            Ver todo
          </DentalButton>
        </div>
        <Card
          className="p-0"
          padding="none"
          shadow="sm"
          aria-describedby="system-logs-heading"
        >
          <ul
            className="divide-y divide-border dark:divide-border-dark"
            role="list"
          >
            {systemLogs.map((l) => (
              <li
                key={l.id}
                className="flex items-start gap-4 px-5 py-4 focus-within:bg-interactive/40"
              >
                <span
                  className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                >
                  <FaServer />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base">
                    {l.message}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      levelClasses[l.level] || "text-text-muted"
                    }`}
                  >
                    {l.level.toUpperCase()} • {l.time}
                  </p>
                </div>
                <DentalButton variant="link" size="sm" className="text-xs">
                  Detalles
                </DentalButton>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </motion.div>
  );
}
