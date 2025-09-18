'use client';

import React, { useReducer, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStethoscope,
  FaTooth, 
  FaCalendarAlt, 
  FaUser, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

import DentalButton from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import appointmentService from '@/services/appointment.service';

// Importar componentes de pasos
import SpecialtySelector from './steps/SpecialtySelector';
import ServiceSelector from './steps/ServiceSelector';
import DateTimeSelector from './steps/DateTimeSelector';
import PatientForm from './steps/PatientForm';
import ConfirmationStep from './steps/ConfirmationStep';

// Estado inicial
const initialState = {
  currentStep: 1,
  loading: false,
  error: '',
  message: '',
  
  // Datos cargados
  specialties: [],
  services: [],
  availabilities: [],
  
  // Selecciones del usuario
  selections: {
    specialtyId: null,
    serviceId: null,
    availabilityId: null,
  },
  
  // Datos del paciente
  patientData: {},
  
  // Fecha seleccionada
  selectedDate: '',
  
  // Validaciones
  validationErrors: {},
};

// Reducer para manejar el estado
function appointmentReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, message: '' };
    
    case 'SET_MESSAGE':
      return { ...state, message: action.payload, error: '' };
    
    case 'CLEAR_MESSAGES':
      return { ...state, error: '', message: '' };
    
    case 'SET_SPECIALTIES':
      return { ...state, specialties: action.payload };
    
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    
    case 'SET_AVAILABILITIES':
      return { ...state, availabilities: action.payload };
    
    case 'SET_SELECTION':
      return { 
        ...state, 
        selections: { 
          ...state.selections, 
          ...action.payload 
        } 
      };
    
    case 'SET_PATIENT_DATA':
      return { ...state, patientData: action.payload };
    
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    
    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };
    
    case 'RESET_FORM':
      return { ...initialState, specialties: state.specialties };
    
    default:
      return state;
  }
}

/**
 * Componente mejorado para reserva de citas con mejor UX
 */
const ImprovedAppointmentBooking = ({ user = null, onSuccess = null }) => {
  const isGuest = !user;
  const [state, dispatch] = useReducer(appointmentReducer, {
    ...initialState,
    patientData: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      notes: ''
    }
  });

  const {
    currentStep,
    loading,
    error,
    message,
    specialties,
    services,
    availabilities,
    selections,
    patientData,
    selectedDate,
    validationErrors
  } = state;

  // Cargar especialidades al montar
  useEffect(() => {
    loadSpecialties();
  }, []);

  // Cargar servicios cuando cambia la especialidad
  useEffect(() => {
    if (selections.specialtyId) {
      loadServices(selections.specialtyId);
    }
  }, [selections.specialtyId]);

  // Cargar disponibilidades cuando cambia la especialidad o fecha
  useEffect(() => {
    if (selections.specialtyId && selectedDate) {
      loadAvailabilities(selections.specialtyId, selectedDate);
    }
  }, [selections.specialtyId, selectedDate]);

  /**
   * Manejo de errores genérico
   */
  const handleError = (error, defaultMessage) => {
    console.error('Error:', error);
    const errorMessage = error?.message || defaultMessage;
    dispatch({ type: 'SET_ERROR', payload: errorMessage });
  };

  /**
   * Cargar especialidades
   */
  const loadSpecialties = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await appointmentService.getSpecialties();
      dispatch({ type: 'SET_SPECIALTIES', payload: data });
    } catch (error) {
      handleError(error, 'Error al cargar especialidades');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * Cargar servicios por especialidad
   */
  const loadServices = async (specialtyId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await appointmentService.getServiceTypes(specialtyId);
      dispatch({ type: 'SET_SERVICES', payload: data });
      
      // Limpiar selección de servicio si ya había una
      dispatch({ 
        type: 'SET_SELECTION', 
        payload: { serviceId: null, availabilityId: null } 
      });
    } catch (error) {
      handleError(error, 'Error al cargar servicios');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * Cargar disponibilidades
   */
  const loadAvailabilities = async (specialtyId, date) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await appointmentService.getAvailabilities(specialtyId, date);
      dispatch({ type: 'SET_AVAILABILITIES', payload: data });
      
      // Limpiar selección de disponibilidad
      dispatch({ 
        type: 'SET_SELECTION', 
        payload: { availabilityId: null } 
      });
    } catch (error) {
      handleError(error, 'Error al cargar horarios disponibles');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  /**
   * Validar paso actual
   */
  const validateCurrentStep = () => {
    const errors = {};
    
    switch (currentStep) {
      case 1:
        if (!selections.specialtyId) {
          errors.specialty = 'Por favor selecciona una especialidad';
        }
        break;
      
      case 2:
        if (!selections.serviceId) {
          errors.service = 'Por favor selecciona un servicio';
        }
        break;
      
      case 3:
        if (!selectedDate) {
          errors.date = 'Por favor selecciona una fecha';
        }
        if (!selections.availabilityId) {
          errors.availability = 'Por favor selecciona un horario';
        }
        break;
      
      case 4:
        if (isGuest) {
          if (!patientData.name || patientData.name.trim().length < 2) {
            errors.name = 'El nombre debe tener al menos 2 caracteres';
          }
          if (!patientData.phone || patientData.phone.trim().length < 10) {
            errors.phone = 'Por favor ingresa un teléfono válido';
          }
          if (patientData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientData.email)) {
            errors.email = 'Por favor ingresa un email válido';
          }
        }
        if (patientData.notes && patientData.notes.length > 500) {
          errors.notes = 'Las notas no pueden exceder 500 caracteres';
        }
        break;
    }
    
    dispatch({ type: 'SET_VALIDATION_ERRORS', payload: errors });
    
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors)[0];
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return false;
    }
    
    return true;
  };

  /**
   * Avanzar al siguiente paso
   */
  const handleNext = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    
    if (!validateCurrentStep()) {
      return;
    }
    
    dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
  };

  /**
   * Retroceder al paso anterior
   */
  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch({ type: 'CLEAR_MESSAGES' });
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
    }
  };

  /**
   * Confirmar y crear la cita
   */
  const handleConfirm = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_MESSAGES' });

      // Preparar datos de la cita
      const appointmentData = {
        availability_id: parseInt(selections.availabilityId),
        service_type_id: parseInt(selections.serviceId),
        notes: patientData.notes?.trim() || null
      };

      // Agregar datos de invitado si es necesario
      if (isGuest) {
        appointmentData.name = patientData.name.trim();
        appointmentData.email = patientData.email?.trim() || null;
        appointmentData.phone = patientData.phone.trim();
      }

      // Crear la cita
      const result = await appointmentService.createAppointment(appointmentData, isGuest);
      
      dispatch({ type: 'SET_MESSAGE', payload: '¡Cita creada exitosamente!' });
      
      // Callback de éxito
      if (onSuccess) {
        onSuccess(result);
      }

      // Resetear formulario después de un tiempo
      setTimeout(() => {
        dispatch({ type: 'RESET_FORM' });
      }, 3000);

    } catch (error) {
      handleError(error, 'Error al crear la cita. Por favor intenta nuevamente.');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Configuración de pasos
  const steps = [
    { number: 1, title: 'Especialidad', icon: FaStethoscope },
    { number: 2, title: 'Servicio', icon: FaTooth },
    { number: 3, title: 'Fecha y Hora', icon: FaCalendarAlt },
    { number: 4, title: isGuest ? 'Datos' : 'Notas', icon: FaUser },
    { number: 5, title: 'Confirmar', icon: FaCheckCircle },
  ];

  const totalSteps = steps.length;

  // Si la cita se creó exitosamente
  if (message && message.includes('exitosamente')) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <Card className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            ¡Cita Agendada!
          </h2>
          
          <p className="text-gray-600 mb-6">
            {isGuest 
              ? "Hemos enviado un email de confirmación con todos los detalles."
              : "Tu cita ha sido programada. Puedes verla en tu dashboard."
            }
          </p>
          
          <DentalButton
            variant="primary"
            onClick={() => dispatch({ type: 'RESET_FORM' })}
            className="w-full"
          >
            Agendar Otra Cita
          </DentalButton>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Indicador de progreso */}
      <div className="mb-10">
        {/* Versión desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex items-center ${index < totalSteps - 1 ? 'flex-1' : ''}`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      step.number < currentStep
                        ? 'bg-primary border-primary text-white'
                        : step.number === currentStep
                        ? 'bg-primary border-primary text-white ring-4 ring-primary/20 scale-110'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.number < currentStep ? (
                      <FaCheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <span className={`ml-3 text-sm font-medium ${
                    step.number <= currentStep ? 'text-primary' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                
                {index < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-6 rounded-full transition-all duration-300 ${
                      step.number < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Versión mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                  step.number < currentStep
                    ? 'bg-primary text-white'
                    : step.number === currentStep
                    ? 'bg-primary text-white ring-2 ring-primary/30'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.number < currentStep ? (
                  <FaCheckCircle className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {steps[currentStep - 1].title}
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-2">
          Paso {currentStep} de {totalSteps}
        </div>
      </div>

      {/* Mensaje de error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" />
              <span className="text-red-700">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido del paso actual */}
      <Card className="p-8 mb-8 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <SpecialtySelector
                specialties={specialties}
                onSelect={(id) => dispatch({ type: 'SET_SELECTION', payload: { specialtyId: id } })}
                selected={selections.specialtyId}
              />
            )}

            {currentStep === 2 && (
              <ServiceSelector
                services={services}
                onSelect={(id) => dispatch({ type: 'SET_SELECTION', payload: { serviceId: id } })}
                selected={selections.serviceId}
                loading={loading}
              />
            )}

            {currentStep === 3 && (
              <DateTimeSelector
                availabilities={availabilities}
                onSelect={(id) => dispatch({ type: 'SET_SELECTION', payload: { availabilityId: id } })}
                selected={selections.availabilityId}
                loading={loading}
                selectedDate={selectedDate}
                onDateChange={(date) => dispatch({ type: 'SET_SELECTED_DATE', payload: date })}
              />
            )}

            {currentStep === 4 && (
              <PatientForm
                data={patientData}
                onChange={(data) => dispatch({ type: 'SET_PATIENT_DATA', payload: data })}
                errors={validationErrors}
                isGuest={isGuest}
              />
            )}

            {currentStep === 5 && (
              <ConfirmationStep
                selections={selections}
                patientData={patientData}
                specialties={specialties}
                services={services}
                availabilities={availabilities}
                selectedDate={selectedDate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Botones de navegación */}
      <div className="flex justify-between items-center pt-4">
        <DentalButton
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 1 || loading}
          icon={<FaArrowLeft />}
        >
          Anterior
        </DentalButton>
        
        {currentStep < totalSteps ? (
          <DentalButton
            variant="primary"
            onClick={handleNext}
            disabled={loading}
            isLoading={loading}
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            Siguiente
          </DentalButton>
        ) : (
          <DentalButton
            variant="success"
            onClick={handleConfirm}
            disabled={loading}
            isLoading={loading}
            loadingText="Creando cita..."
            icon={loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
          >
            Confirmar Cita
          </DentalButton>
        )}
      </div>
    </div>
  );
};

export default ImprovedAppointmentBooking;
