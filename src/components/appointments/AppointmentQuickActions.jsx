'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarPlus, 
  FaCalendarCheck, 
  FaClock, 
  FaUser 
} from 'react-icons/fa';
import Link from 'next/link';

import DentalButton from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import useAppointments from '@/hooks/useAppointments';

/**
 * Componente de acciones rápidas para citas
 * Muestra información resumida y acciones principales
 */
const AppointmentQuickActions = ({ user, className = '' }) => {
  const { appointments, loading } = useAppointments(user);
  
  // Calcular estadísticas rápidas
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
  const nextAppointment = appointments
    .filter(apt => apt.status === 'confirmed')
    .sort((a, b) => new Date(a.availability?.date) - new Date(b.availability?.date))[0];

  const quickStats = [
    {
      label: 'Pendientes',
      value: pendingAppointments,
      icon: FaClock,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Confirmadas',
      value: confirmedAppointments,
      icon: FaCalendarCheck,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 text-center">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${stat.color} mb-2`}>
                  <IconComponent className="text-sm" />
                </div>
                <div className="text-2xl font-bold dental-text-primary">
                  {loading ? '...' : stat.value}
                </div>
                <div className="text-sm dental-text-secondary">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Next Appointment */}
      {nextAppointment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-primary-50 border-primary-200">
            <div className="flex items-center mb-2">
              <FaCalendarCheck className="text-primary-500 mr-2" />
              <span className="font-semibold dental-text-primary">Próxima Cita</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="font-medium">{nextAppointment.serviceType?.name}</div>
              <div className="dental-text-secondary">
                {new Date(nextAppointment.availability?.date).toLocaleDateString()} - 
                {nextAppointment.availability?.start_time}
              </div>
              <div className="dental-text-secondary">
                Dr. {nextAppointment.availability?.dentist?.name}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <Link href="/book-appointment">
          <DentalButton
            variant="primary"
            size="sm"
            icon={<FaCalendarPlus />}
            className="w-full"
          >
            Nueva Cita
          </DentalButton>
        </Link>
        
        {user && (
          <Link href="/patient-dashboard">
            <DentalButton
              variant="outline"
              size="sm"
              icon={<FaUser />}
              className="w-full"
            >
              Ver Todas las Citas
            </DentalButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppointmentQuickActions;
