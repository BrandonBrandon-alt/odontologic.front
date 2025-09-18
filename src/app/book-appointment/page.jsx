'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

import ImprovedAppointmentBooking from '@/components/appointments/ImprovedAppointmentBooking';
import DentalButton from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

/**
 * Página principal para la reserva de citas
 * Maneja tanto usuarios autenticados como invitados
 */
const BookAppointmentPage = () => {
  // Obtener información del usuario del contexto de autenticación
  const { user, isAuthenticated } = useAuth();

  /**
   * Callback cuando se crea exitosamente una cita
   */
  const handleAppointmentSuccess = (appointmentData) => {
    console.log('Appointment created successfully:', appointmentData);
    
    // Aquí podrías agregar lógica adicional como:
    // - Redirigir al dashboard del usuario
    // - Mostrar una notificación toast
    // - Actualizar el estado global de la aplicación
    
    if (isAuthenticated && user) {
      // Para usuarios autenticados, podrías redirigir al dashboard
      // router.push('/patient-dashboard');
    }
  };

  return (
    <div className=" dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bshadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="layout-container py-6">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link href="/services">
              <DentalButton variant="ghost" icon={<FaArrowLeft />}>
                Back to Services
              </DentalButton>
            </Link>

            {/* Page Title */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <FaCalendarPlus className="text-3xl text-primary-500 mr-3" />
                  <h1 className="text-3xl font-bold dental-text-primary">
                    Book an Appointment
                  </h1>
                </div>
                <p className="dental-text-secondary max-w-2xl mx-auto">
                  {isAuthenticated 
                    ? `Welcome back, ${user?.name || 'User'}! Schedule your next appointment with ease.`
                    : 'Schedule your appointment quickly and easily. No account required.'
                  }
                </p>
              </motion.div>
            </div>

            {/* User Status Indicator */}
            <div className="w-32 flex justify-end">
              {isAuthenticated ? (
                <div className="text-right">
                  <div className="text-sm font-medium dental-text-primary">
                    {user?.name}
                  </div>
                  <div className="text-xs dental-text-secondary">
                    Registered User
                  </div>
                </div>
              ) : (
                <div className="text-right">
                  <div className="text-sm dental-text-secondary">
                    Booking as Guest
                  </div>
                  <Link href="/login" className="text-xs text-primary-500 hover:text-primary-600">
                    Sign in for faster booking
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="layout-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Information Cards for Guests */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    📧 Email Confirmation
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You'll receive a confirmation email with all appointment details.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    ⏰ Arrive Early
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Please arrive 15 minutes before your scheduled appointment.
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                    🆔 Bring ID
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Don't forget to bring a valid ID and insurance card if applicable.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appointment Booking Component */}
          <ImprovedAppointmentBooking 
            user={isAuthenticated ? user : null}
            onSuccess={handleAppointmentSuccess}
          />
        </motion.div>
      </div>

      {/* Footer Information */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="layout-container py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-semibold dental-text-primary mb-4">
                Need Help?
              </h3>
              <div className="space-y-2 dental-text-secondary">
                <p>📞 Call us: (555) 123-4567</p>
                <p>📧 Email: appointments@dentalclinic.com</p>
                <p>🕒 Office Hours: Mon-Fri 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div>
              <h3 className="font-semibold dental-text-primary mb-4">
                Cancellation Policy
              </h3>
              <div className="space-y-2 dental-text-secondary text-sm">
                <p>• Please provide at least 24 hours notice for cancellations</p>
                <p>• Same-day cancellations may incur a fee</p>
                <p>• Emergency situations are always accommodated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
