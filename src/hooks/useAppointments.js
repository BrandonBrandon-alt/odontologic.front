/**
 * Hook personalizado para gestión de citas
 * Proporciona funcionalidades para crear, listar y gestionar citas
 */

import { useState, useEffect, useCallback } from 'react';
import appointmentService from '@/services/appointment.service';

/**
 * Hook para gestionar el estado y operaciones de citas
 * @param {Object} user - Usuario autenticado (opcional)
 * @returns {Object} Estado y funciones para gestionar citas
 */
export const useAppointments = (user = null) => {
  // Estados principales
  const [appointments, setAppointments] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  
  // Estados de carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Estados de paginación
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });

  /**
   * Maneja errores de forma consistente
   */
  const handleError = useCallback((error, defaultMessage = 'An error occurred') => {
    console.error('Appointment hook error:', error);
    const errorMessage = error?.message || defaultMessage;
    setError(errorMessage);
    return errorMessage;
  }, []);

  /**
   * Limpia mensajes de error y éxito
   */
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  /**
   * Carga las especialidades disponibles
   */
  const loadSpecialties = useCallback(async () => {
    try {
      setLoading(true);
      clearMessages();
      
      const data = await appointmentService.getSpecialties();
      setSpecialties(data);
      
      return data;
    } catch (error) {
      handleError(error, 'Failed to load specialties');
      return [];
    } finally {
      setLoading(false);
    }
  }, [handleError, clearMessages]);

  /**
   * Carga los tipos de servicio para una especialidad
   */
  const loadServiceTypes = useCallback(async (specialtyId) => {
    if (!specialtyId) {
      setServiceTypes([]);
      return [];
    }

    try {
      setLoading(true);
      clearMessages();
      
      const data = await appointmentService.getServiceTypes(specialtyId);
      setServiceTypes(data);
      
      return data;
    } catch (error) {
      handleError(error, 'Failed to load service types');
      return [];
    } finally {
      setLoading(false);
    }
  }, [handleError, clearMessages]);

  /**
   * Carga las disponibilidades para una especialidad y fecha
   */
  const loadAvailabilities = useCallback(async (specialtyId, date) => {
    if (!specialtyId || !date) {
      setAvailabilities([]);
      return [];
    }

    try {
      setLoading(true);
      clearMessages();
      
      const data = await appointmentService.getAvailabilities(specialtyId, date);
      setAvailabilities(data);
      
      return data;
    } catch (error) {
      handleError(error, 'Failed to load available times');
      return [];
    } finally {
      setLoading(false);
    }
  }, [handleError, clearMessages]);

  /**
   * Crea una nueva cita
   */
  const createAppointment = useCallback(async (appointmentData, isGuest = false) => {
    try {
      setLoading(true);
      clearMessages();
      
      const result = await appointmentService.createAppointment(appointmentData, isGuest);
      
      setSuccess('Appointment booked successfully!');
      
      // Si es un usuario autenticado, actualizar la lista de citas
      if (user && !isGuest) {
        loadMyAppointments();
      }
      
      return result;
    } catch (error) {
      const errorMessage = handleError(error, 'Failed to book appointment');
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user, handleError, clearMessages]);

  /**
   * Carga las citas del usuario autenticado
   */
  const loadMyAppointments = useCallback(async (page = 1, limit = 10) => {
    if (!user) {
      return { appointments: [], pagination: {} };
    }

    try {
      setLoading(true);
      clearMessages();
      
      const params = { page, limit };
      const result = await appointmentService.getMyAppointments(params);
      
      setAppointments(result.appointments || []);
      setPagination(result.pagination || {});
      
      return result;
    } catch (error) {
      handleError(error, 'Failed to load your appointments');
      return { appointments: [], pagination: {} };
    } finally {
      setLoading(false);
    }
  }, [user, handleError, clearMessages]);

  /**
   * Actualiza el estado de una cita
   */
  const updateAppointmentStatus = useCallback(async (appointmentId, status) => {
    try {
      setLoading(true);
      clearMessages();
      
      const result = await appointmentService.updateAppointmentStatus(appointmentId, status);
      
      // Actualizar la cita en el estado local
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: result.status }
            : apt
        )
      );
      
      setSuccess(`Appointment ${status} successfully!`);
      
      return result;
    } catch (error) {
      handleError(error, 'Failed to update appointment status');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [handleError, clearMessages]);

  /**
   * Valida los datos del formulario
   */
  const validateAppointmentData = useCallback((data, isGuest = false) => {
    return appointmentService.validateAppointmentData(data, isGuest);
  }, []);

  /**
   * Reinicia todos los estados
   */
  const resetState = useCallback(() => {
    setAppointments([]);
    setSpecialties([]);
    setServiceTypes([]);
    setAvailabilities([]);
    setPagination({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 10
    });
    clearMessages();
  }, [clearMessages]);

  // Cargar especialidades al montar el hook
  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  // Cargar citas del usuario si está autenticado
  useEffect(() => {
    if (user) {
      loadMyAppointments();
    }
  }, [user, loadMyAppointments]);

  return {
    // Estados
    appointments,
    specialties,
    serviceTypes,
    availabilities,
    loading,
    error,
    success,
    pagination,
    
    // Funciones
    loadSpecialties,
    loadServiceTypes,
    loadAvailabilities,
    createAppointment,
    loadMyAppointments,
    updateAppointmentStatus,
    validateAppointmentData,
    clearMessages,
    resetState,
    
    // Utilidades
    isLoading: loading,
    hasError: !!error,
    hasSuccess: !!success,
  };
};

export default useAppointments;
