"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
  FaUser,
  FaHeartbeat,
  FaCalendarPlus,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Card, { StatCard } from "@/components/ui/Card";
import DentalButton from "@/components/ui/Button";
import AppointmentList from "@/components/appointments/AppointmentList";
import useAppointments from "@/hooks/useAppointments";
import Link from "next/link";

export default function PatientDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { allowed } = useRequireAuth({ role: "user" });
  const { appointments, loading: appointmentsLoading } = useAppointments(user);
  const [activeTab, setActiveTab] = useState('overview');
  
  const displayName = user?.name || "Paciente";

  // Calcular estadísticas basadas en citas reales
  const activeAppointments = appointments.filter(apt => 
    apt.status === 'pending' || apt.status === 'confirmed'
  ).length;
  
  const completedAppointments = appointments.filter(apt => 
    apt.status === 'completed'
  ).length;

  const stats = [
    {
      title: "Citas activas",
      value: activeAppointments,
      icon: <FaCalendarPlus className="text-primary-500" />,
    },
    {
      title: "Citas completadas",
      value: completedAppointments,
      icon: <FaCheckCircle className="text-green-500" />,
    },
    {
      title: "Próxima cita",
      value: appointments.find(apt => apt.status === 'confirmed') ? "Programada" : "Ninguna",
      icon: <FaClock className="text-blue-500" />,
    },
  ];

  // Actividades recientes basadas en citas
  const activities = appointments
    .slice(0, 3)
    .map(apt => ({
      id: apt.id,
      label: `${apt.status === 'confirmed' ? 'Cita confirmada' : 'Cita pendiente'} - ${apt.serviceType?.name}`,
      time: new Date(apt.createdAt).toLocaleDateString(),
    }));

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
      aria-labelledby="patient-dashboard-heading"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1
            id="patient-dashboard-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
          >
            Panel del Paciente
          </h1>
          <p
            className="text-sm md:text-base text-text-secondary mt-2"
            aria-live="polite"
          >
            Bienvenido{isAuthenticated && `, ${displayName}`} – aquí encuentras
            tu estado general y acciones rápidas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/book-appointment">
            <DentalButton variant="primary" icon={<FaCalendarPlus />}>
              Agendar Cita
            </DentalButton>
          </Link>
          <DentalButton 
            variant="outline" 
            icon={<FaClipboardList />}
            onClick={() => setActiveTab('appointments')}
          >
            Ver Citas
          </DentalButton>
        </div>
      </header>

      <section aria-labelledby="patient-stats-heading" className="space-y-6">
        <h2 id="patient-stats-heading" className="sr-only">
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

      <section aria-labelledby="patient-activity-heading" className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2
            id="patient-activity-heading"
            className="text-xl font-bold tracking-tight"
          >
            Actividad reciente
          </h2>
          <DentalButton variant="ghost" size="sm">
            Ver todo
          </DentalButton>
        </div>
        <Card
          className="p-0"
          padding="none"
          shadow="sm"
          aria-describedby="patient-activity-heading"
        >
          <ul
            className="divide-y divide-border dark:divide-border-dark"
            role="list"
          >
            {activities.map((a) => (
              <li
                key={a.id}
                className="flex items-start gap-4 px-5 py-4 focus-within:bg-interactive/40"
              >
                <span
                  className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                >
                  <FaUser />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base">{a.label}</p>
                  <p className="text-xs text-text-muted mt-0.5">{a.time}</p>
                </div>
                <DentalButton variant="link" size="sm" className="text-xs">
                  Detalles
                </DentalButton>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'appointments'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mis Citas
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <section aria-labelledby="patient-profile-heading" className="space-y-4">
            <h2
              id="patient-profile-heading"
              className="text-xl font-bold tracking-tight"
            >
              Gestión de Perfil
            </h2>
            <Card className="p-6 flex flex-col gap-4" shadow="sm">
              <p className="text-sm text-text-secondary max-w-prose">
                Ahora la administración de tu perfil y seguridad se centraliza en
                una sola página. Accede para actualizar datos personales o cambiar
                tu contraseña.
              </p>
              <div>
                <Link href="/profile" className="inline-block">
                  <DentalButton variant="primary">Ir a Mi Perfil</DentalButton>
                </Link>
              </div>
            </Card>
          </section>
        )}

        {activeTab === 'appointments' && (
          <section aria-labelledby="appointments-heading">
            <AppointmentList user={user} />
          </section>
        )}
      </div>

    </motion.div>
  );
}
