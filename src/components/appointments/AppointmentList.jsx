'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaMapMarkerAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

import DentalButton from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import useAppointments from '@/hooks/useAppointments';

/**
 * Componente para mostrar la lista de citas del usuario
 */
const AppointmentList = ({ user }) => {
  const {
    appointments,
    loading,
    error,
    pagination,
    loadMyAppointments,
    updateAppointmentStatus,
    clearMessages
  } = useAppointments(user);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  /**
   * Obtiene el color y el icono según el estado de la cita
   */
  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        color: 'text-yellow-600 bg-yellow-100',
        icon: FaHourglassHalf,
        label: 'Pending'
      },
      confirmed: {
        color: 'text-green-600 bg-green-100',
        icon: FaCheckCircle,
        label: 'Confirmed'
      },
      cancelled: {
        color: 'text-red-600 bg-red-100',
        icon: FaTimesCircle,
        label: 'Cancelled'
      },
      completed: {
        color: 'text-blue-600 bg-blue-100',
        icon: FaCheckCircle,
        label: 'Completed'
      }
    };

    return statusMap[status] || statusMap.pending;
  };

  /**
   * Formatea la fecha para mostrar
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Formatea la hora para mostrar
   */
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  /**
   * Maneja la cancelación de una cita
   */
  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      await updateAppointmentStatus(selectedAppointment.id, 'cancelled');
      setShowCancelModal(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  /**
   * Maneja el cambio de página
   */
  const handlePageChange = (newPage) => {
    loadMyAppointments(newPage, pagination.limit);
  };

  if (loading && appointments.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="dental-text-secondary">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <FaTimesCircle className="text-red-500 text-3xl mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Appointments</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <DentalButton
          variant="outline"
          onClick={() => {
            clearMessages();
            loadMyAppointments();
          }}
        >
          Try Again
        </DentalButton>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold dental-text-primary mb-2">
          No Appointments Yet
        </h3>
        <p className="dental-text-secondary mb-6">
          You haven't booked any appointments. Schedule your first appointment today!
        </p>
        <DentalButton
          variant="primary"
          href="/book-appointment"
        >
          Book Your First Appointment
        </DentalButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold dental-text-primary">My Appointments</h2>
          <p className="dental-text-secondary">
            Manage and track your dental appointments
          </p>
        </div>
        <DentalButton
          variant="primary"
          href="/book-appointment"
          icon={<FaCalendarAlt />}
        >
          Book New Appointment
        </DentalButton>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {appointments.map((appointment, index) => {
            const statusInfo = getStatusInfo(appointment.status);
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} mr-3`}>
                          <StatusIcon className="mr-1" />
                          {statusInfo.label}
                        </span>
                        
                        {/* Service Type */}
                        <h3 className="text-lg font-semibold dental-text-primary">
                          {appointment.serviceType?.name}
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Date & Time */}
                        <div className="space-y-2">
                          <div className="flex items-center dental-text-secondary">
                            <FaCalendarAlt className="mr-2 text-primary-500" />
                            <span>{formatDate(appointment.availability?.date)}</span>
                          </div>
                          <div className="flex items-center dental-text-secondary">
                            <FaClock className="mr-2 text-primary-500" />
                            <span>
                              {formatTime(appointment.availability?.start_time)} - 
                              {formatTime(appointment.availability?.end_time)}
                            </span>
                          </div>
                        </div>

                        {/* Doctor & Location */}
                        <div className="space-y-2">
                          <div className="flex items-center dental-text-secondary">
                            <FaUser className="mr-2 text-primary-500" />
                            <span>Dr. {appointment.availability?.dentist?.name}</span>
                          </div>
                          <div className="flex items-center dental-text-secondary">
                            <FaMapMarkerAlt className="mr-2 text-primary-500" />
                            <span>{appointment.serviceType?.specialty?.name} Department</span>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm dental-text-secondary">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}

                      {/* Duration */}
                      <div className="mt-3 text-sm dental-text-secondary">
                        Duration: {appointment.serviceType?.duration} minutes
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="ml-4">
                      <div className="relative">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() => setSelectedAppointment(
                            selectedAppointment?.id === appointment.id ? null : appointment
                          )}
                        >
                          <FaEllipsisV className="text-gray-500" />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {selectedAppointment?.id === appointment.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                            >
                              <div className="py-1">
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <FaEye className="mr-2" />
                                  View Details
                                </button>
                                
                                {appointment.status === 'pending' && (
                                  <>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                      <FaEdit className="mr-2" />
                                      Reschedule
                                    </button>
                                    <button 
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                      onClick={() => {
                                        setShowCancelModal(true);
                                        setSelectedAppointment(appointment);
                                      }}
                                    >
                                      <FaTrash className="mr-2" />
                                      Cancel
                                    </button>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <DentalButton
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </DentalButton>
          
          <span className="px-4 py-2 dental-text-secondary">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <DentalButton
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </DentalButton>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold dental-text-primary mb-4">
                Cancel Appointment
              </h3>
              <p className="dental-text-secondary mb-6">
                Are you sure you want to cancel this appointment? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <DentalButton
                  variant="ghost"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Appointment
                </DentalButton>
                <DentalButton
                  variant="danger"
                  onClick={handleCancelAppointment}
                  isLoading={loading}
                >
                  Cancel Appointment
                </DentalButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentList;
