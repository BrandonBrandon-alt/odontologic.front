"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  FaUserMd,
  FaUsers,
  FaChartLine,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Card, { StatCard } from "@/components/ui/Card";
import DentalButton from "@/components/ui/Button";

const stats = [
  {
    title: "Pacientes hoy",
    value: 8,
    icon: <FaUsers className="text-primary-500" />,
  },
  {
    title: "Citas confirmadas",
    value: 12,
    icon: <FaCalendarCheck className="text-accent-500" />,
  },
  {
    title: "Tratamientos activos",
    value: 5,
    icon: <FaClipboardList className="text-success-500" />,
  },
];

const schedule = [
  { id: 1, patient: "Carlos Pérez", time: "09:00", type: "Control" },
  { id: 2, patient: "Ana Gómez", time: "10:00", type: "Limpieza" },
  { id: 3, patient: "Luis Ramírez", time: "11:30", type: "Endodoncia" },
  { id: 4, patient: "Marta Díaz", time: "15:00", type: "Brackets" },
];

export default function DentistDashboardPage() {
  const { user } = useAuth();
  const { allowed } = useRequireAuth({ role: "dentist" });
  const displayName = user?.name || "Doctor";

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
      aria-labelledby="dentist-dashboard-heading"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1
            id="dentist-dashboard-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
          >
            Panel del Doctor
          </h1>
          <p
            className="text-sm md:text-base text-text-secondary mt-2"
            aria-live="polite"
          >
            Hola {displayName}, aquí está tu agenda y estado general.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <DentalButton variant="primary" icon={<FaCalendarCheck />}>
            Nueva Cita
          </DentalButton>
          <DentalButton variant="outline" icon={<FaChartLine />}>
            Reportes
          </DentalButton>
        </div>
      </header>

      <section aria-labelledby="dentist-stats-heading" className="space-y-6">
        <h2 id="dentist-stats-heading" className="sr-only">
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

      <section aria-labelledby="schedule-heading" className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2
            id="schedule-heading"
            className="text-xl font-bold tracking-tight"
          >
            Agenda de hoy
          </h2>
          <DentalButton variant="ghost" size="sm">
            Ver completa
          </DentalButton>
        </div>
        <Card
          className="p-0"
          padding="none"
          shadow="sm"
          aria-describedby="schedule-heading"
        >
          <ul
            className="divide-y divide-border dark:divide-border-dark"
            role="list"
          >
            {schedule.map((a) => (
              <li
                key={a.id}
                className="grid grid-cols-12 gap-4 px-5 py-4 items-center text-sm md:text-base focus-within:bg-interactive/40"
              >
                <div className="col-span-4 md:col-span-3 font-medium flex items-center gap-2">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400"
                    aria-hidden="true"
                  >
                    <FaUserMd />
                  </span>
                  {a.patient}
                </div>
                <div className="col-span-3 md:col-span-2 text-text-muted">
                  {a.time}
                </div>
                <div className="col-span-5 md:col-span-3">{a.type}</div>
                <div className="col-span-12 md:col-span-4 flex gap-2 justify-end md:justify-start">
                  <DentalButton variant="outline" size="sm">
                    Detalles
                  </DentalButton>
                  <DentalButton variant="primary" size="sm">
                    Iniciar
                  </DentalButton>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </motion.div>
  );
}
