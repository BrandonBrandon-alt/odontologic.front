/**
 * Servicio para gestión de citas en el frontend
 * Maneja la comunicación con la API del backend para crear, listar y gestionar citas
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Configuración de axios con interceptores
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejo de respuestas y errores
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    const errorDetails = error.response?.data?.details || null;
    
    return Promise.reject({
      status: error.response?.status || 500,
      message: errorMessage,
      details: errorDetails,
      originalError: error
    });
  }
);

/**
 * Servicio de citas
 */
export const appointmentService = {
  /**
   * Obtiene todas las especialidades disponibles
   * @returns {Promise<Array>} Lista de especialidades
   */
  async getSpecialties() {
    try {
      const response = await apiClient.get('/specialties');
      return response || [];
    } catch (error) {
      console.error('Error fetching specialties:', error);
      throw error;
    }
  },

  /**
   * Obtiene los tipos de servicio por especialidad
   * @param {number} specialtyId - ID de la especialidad
   * @returns {Promise<Array>} Lista de tipos de servicio
   */
  async getServiceTypes(specialtyId) {
    try {
      const response = await apiClient.get(`/service-types/specialty/${specialtyId}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching service types:', error);
      throw error;
    }
  },

  /**
   * Obtiene las disponibilidades para una especialidad y fecha específica
   * @param {number} specialtyId - ID de la especialidad
   * @param {string} date - Fecha en formato YYYY-MM-DD
   * @returns {Promise<Array>} Lista de horarios disponibles
   */
  async getAvailabilities(specialtyId, date) {
    try {
      const response = await apiClient.get(`/availabilities?specialty_id=${specialtyId}&date=${date}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva cita (para usuarios registrados o invitados)
   * @param {Object} appointmentData - Datos de la cita
   * @param {boolean} isGuest - Si es un invitado (no autenticado)
   * @returns {Promise<Object>} Cita creada
   */
  async createAppointment(appointmentData, isGuest = false) {
    try {
      const endpoint = isGuest ? '/appointments/guest' : '/appointments';
      const response = await apiClient.post(endpoint, appointmentData);
      return response;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  /**
   * Obtiene las citas del usuario autenticado
   * @param {Object} params - Parámetros de paginación
   * @returns {Promise<Object>} Lista paginada de citas
   */
  async getMyAppointments(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await apiClient.get(`/appointments/my?${queryString}`);
      return response;
    } catch (error) {
      console.error('Error fetching my appointments:', error);
      throw error;
    }
  },

  /**
   * Actualiza el estado de una cita
   * @param {number} appointmentId - ID de la cita
   * @param {string} status - Nuevo estado
   * @returns {Promise<Object>} Cita actualizada
   */
  async updateAppointmentStatus(appointmentId, status) {
    try {
      const response = await apiClient.patch(`/appointments/${appointmentId}/status`, { status });
      return response;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  },

  /**
   * Valida los datos del formulario antes de enviar
   * @param {Object} data - Datos del formulario
   * @param {boolean} isGuest - Si es un invitado
   * @returns {Object} Resultado de la validación
   */
  validateAppointmentData(data, isGuest = false) {
    const errors = {};

    // Validaciones comunes
    if (!data.availability_id) {
      errors.availability_id = 'Please select a date and time';
    }

    if (!data.service_type_id) {
      errors.service_type_id = 'Please select a service type';
    }

    // Validaciones específicas para invitados
    if (isGuest) {
      if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
      }

      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (!data.phone || data.phone.trim().length < 10) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Validar notas (opcional pero con límite)
    if (data.notes && data.notes.length > 500) {
      errors.notes = 'Notes cannot exceed 500 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export default appointmentService;
