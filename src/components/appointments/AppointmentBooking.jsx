'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaStickyNote,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';

import DentalButton from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import appointmentService from '@/services/appointment.service';

/**
 * Componente principal para la reserva de citas
 * Maneja tanto usuarios registrados como invitados
 */
const AppointmentBooking = ({ user = null, onSuccess = null }) => {
  const isGuest = !user;
  
  // Estados del formulario
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    specialty_id: '',
    service_type_id: '',
    availability_id: '',
    selected_date: '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notes: ''
  });
  
  // Estados de validación y errores
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  // Cargar especialidades al montar el componente (solo en el cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadSpecialties();
    }
  }, []);

  // Cargar tipos de servicio cuando cambia la especialidad
  useEffect(() => {
    if (formData.specialty_id) {
      loadServiceTypes(formData.specialty_id);
    }
  }, [formData.specialty_id]);

  // Cargar disponibilidades cuando cambia la fecha
  useEffect(() => {
    if (formData.specialty_id && formData.selected_date) {
      loadAvailabilities(formData.specialty_id, formData.selected_date);
    }
  }, [formData.specialty_id, formData.selected_date]);

  /**
   * Carga las especialidades disponibles
   */
  const loadSpecialties = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getSpecialties();
      setSpecialties(data);
    } catch (error) {
      console.error('Error loading specialties:', error);
      setSubmitError('Error loading specialties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carga los tipos de servicio para una especialidad
   */
  const loadServiceTypes = async (specialtyId) => {
    try {
      setLoading(true);
      const data = await appointmentService.getServiceTypes(specialtyId);
      setServiceTypes(data);
      
      // Reset service type selection when specialty changes
      setFormData(prev => ({ ...prev, service_type_id: '', availability_id: '' }));
    } catch (error) {
      console.error('Error loading service types:', error);
      setSubmitError('Error loading services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carga las disponibilidades para una fecha y especialidad
   */
  const loadAvailabilities = async (specialtyId, date) => {
    try {
      setLoading(true);
      const data = await appointmentService.getAvailabilities(specialtyId, date);
      setAvailabilities(data);
      
      // Reset availability selection when date changes
      setFormData(prev => ({ ...prev, availability_id: '' }));
    } catch (error) {
      console.error('Error loading availabilities:', error);
      setSubmitError('Error loading available times. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja los cambios en los campos del formulario
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setSubmitError('');
  };

  /**
   * Valida el paso actual del formulario
   */
  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Especialidad y servicio
        if (!formData.specialty_id) {
          newErrors.specialty_id = 'Please select a specialty';
        }
        if (!formData.service_type_id) {
          newErrors.service_type_id = 'Please select a service';
        }
        break;

      case 2: // Fecha y hora
        if (!formData.selected_date) {
          newErrors.selected_date = 'Please select a date';
        }
        if (!formData.availability_id) {
          newErrors.availability_id = 'Please select a time slot';
        }
        break;

      case 3: // Datos personales (solo para invitados)
        if (isGuest) {
          const validation = appointmentService.validateAppointmentData(formData, true);
          Object.assign(newErrors, validation.errors);
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Avanza al siguiente paso
   */
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * Retrocede al paso anterior
   */
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  /**
   * Envía el formulario para crear la cita
   */
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    try {
      setLoading(true);
      setSubmitError('');

      // Preparar datos para envío
      const appointmentData = {
        availability_id: parseInt(formData.availability_id),
        service_type_id: parseInt(formData.service_type_id),
        notes: formData.notes.trim() || null
      };

      // Agregar datos de invitado si es necesario
      if (isGuest) {
        appointmentData.name = formData.name.trim();
        appointmentData.email = formData.email.trim();
        appointmentData.phone = formData.phone.trim();
      }

      // Crear la cita
      const result = await appointmentService.createAppointment(appointmentData, isGuest);
      
      setSuccess(true);
      
      // Callback de éxito si se proporciona
      if (onSuccess) {
        onSuccess(result);
      }

    } catch (error) {
      console.error('Error creating appointment:', error);
      
      // Manejo específico de errores
      if (error.status === 409) {
        setSubmitError('This time slot is no longer available. Please select a different time.');
        setCurrentStep(2); // Volver al paso de selección de horario
      } else if (error.status === 429) {
        setSubmitError('You have too many pending appointments. Please wait for confirmation or cancel existing ones.');
      } else {
        setSubmitError(error.message || 'An error occurred while booking your appointment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reinicia el formulario para hacer otra reserva
   */
  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      specialty_id: '',
      service_type_id: '',
      availability_id: '',
      selected_date: '',
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      notes: ''
    });
    setErrors({});
    setSubmitError('');
    setSuccess(false);
  };

  // Obtener el número total de pasos
  const totalSteps = isGuest ? 4 : 3;

  // Si la cita se creó exitosamente, mostrar confirmación
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="text-center p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Appointment Booked Successfully!
          </h2>
          
          <p className="text-gray-600 mb-6">
            {isGuest 
              ? "We've sent a confirmation email with all the details. Please check your inbox."
              : "Your appointment has been scheduled. You can view it in your dashboard."
            }
          </p>
          
          <DentalButton
            variant="primary"
            onClick={resetForm}
            className="w-full"
          >
            Book Another Appointment
          </DentalButton>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex items-center ${i < totalSteps - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    i + 1 < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" />
              <span className="text-red-700">{submitError}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Steps */}
      <Card className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Specialty and Service Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Select Service</h2>
              
              {/* Specialty Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Specialty *
                </label>
                <select
                  value={formData.specialty_id}
                  onChange={(e) => handleInputChange('specialty_id', e.target.value)}
                  className={`w-full p-3 border rounded-lg ${
                    errors.specialty_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={loading}
                >
                  <option value="">Select a specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
                {errors.specialty_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialty_id}</p>
                )}
              </div>

              {/* Service Type Selection */}
              {formData.specialty_id && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Service Type *
                  </label>
                  <select
                    value={formData.service_type_id}
                    onChange={(e) => handleInputChange('service_type_id', e.target.value)}
                    className={`w-full p-3 border rounded-lg ${
                      errors.service_type_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading || !serviceTypes.length}
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.duration} min
                      </option>
                    ))}
                  </select>
                  {errors.service_type_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.service_type_id}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Date and Time Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.selected_date}
                  onChange={(e) => handleInputChange('selected_date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 border rounded-lg ${
                    errors.selected_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.selected_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.selected_date}</p>
                )}
              </div>

              {/* Time Slots */}
              {formData.selected_date && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    <FaClock className="inline mr-2" />
                    Available Times *
                  </label>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <FaSpinner className="animate-spin text-2xl text-primary-500" />
                    </div>
                  ) : availabilities.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availabilities.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleInputChange('availability_id', slot.id)}
                          className={`p-3 border rounded-lg text-center transition-all ${
                            formData.availability_id === slot.id
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-primary-300'
                          }`}
                        >
                          <div className="font-medium">
                            {slot.start_time} - {slot.end_time}
                          </div>
                          <div className="text-sm text-gray-500">
                            Dr. {slot.dentist.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No available times for this date. Please select another date.
                    </div>
                  )}
                  
                  {errors.availability_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.availability_id}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Personal Information (for guests) or Notes (for users) */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">
                {isGuest ? 'Your Information' : 'Additional Notes'}
              </h2>
              
              {isGuest ? (
                <>
                  {/* Guest Information Form */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FaUser className="inline mr-2" />
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        error={errors.name}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FaPhone className="inline mr-2" />
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        error={errors.phone}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      error={errors.email}
                    />
                  </div>
                </>
              ) : null}
              
              {/* Notes Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <FaStickyNote className="inline mr-2" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information or special requests..."
                  rows={4}
                  maxLength={500}
                  className={`w-full p-3 border rounded-lg resize-none ${
                    errors.notes ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.notes && (
                    <p className="text-red-500 text-sm">{errors.notes}</p>
                  )}
                  <p className="text-gray-500 text-sm ml-auto">
                    {formData.notes.length}/500
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation (for guests only) */}
          {currentStep === 4 && isGuest && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Confirm Your Appointment</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">Appointment Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">
                      {serviceTypes.find(s => s.id == formData.service_type_id)?.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(formData.selected_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {availabilities.find(a => a.id == formData.availability_id)?.start_time}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">
                      Dr. {availabilities.find(a => a.id == formData.availability_id)?.dentist.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> You will receive a confirmation email with all the details. 
                  Please arrive 15 minutes before your appointment time.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <DentalButton
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
          >
            Previous
          </DentalButton>
          
          {currentStep < totalSteps ? (
            <DentalButton
              variant="primary"
              onClick={nextStep}
              disabled={loading}
              isLoading={loading}
            >
              Next
            </DentalButton>
          ) : (
            <DentalButton
              variant="success"
              onClick={handleSubmit}
              disabled={loading}
              isLoading={loading}
              loadingText="Booking..."
            >
              Confirm Appointment
            </DentalButton>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppointmentBooking;
