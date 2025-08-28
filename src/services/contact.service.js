/**
 * Servicio de contacto para el frontend.
 * Gestiona el envío de mensajes de contacto al backend Express.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Opciones de asunto disponibles
export const contactSubjects = [
  { value: 'consulta', label: 'Consulta General' },
  { value: 'cita', label: 'Agendar Cita' },
  { value: 'emergencia', label: 'Emergencia Dental' },
  { value: 'presupuesto', label: 'Solicitar Presupuesto' },
  { value: 'otro', label: 'Otro' }
];

// Estado inicial del formulario
export const initialContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

// Validación del lado del cliente (opcional, para mejor UX)
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.name.trim())) {
    errors.name = 'El nombre solo puede contener letras y espacios';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Ingresa un email válido';
  }
  
  if (!formData.subject) {
    errors.subject = 'El asunto es requerido';
  } else if (!contactSubjects.find(s => s.value === formData.subject)) {
    errors.subject = 'Selecciona un asunto válido';
  }
  
  if (!formData.message.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  } else if (formData.message.trim().length > 1000) {
    errors.message = 'El mensaje no puede exceder 1000 caracteres';
  }
  
  return errors;
};

// Función principal para enviar mensaje
export const sendContactMessage = async (formData) => {
  try {
    // Validación opcional del lado del cliente
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      return {
        success: false,
        message: 'Por favor corrige los errores en el formulario',
        errors: validationErrors
      };
    }

    // Preparar datos para el backend
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || '',
      subject: formData.subject,
      message: formData.message.trim()
    };

    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Error al enviar el mensaje',
        errors: result.errors || {}
      };
    }

    return {
      success: true,
      message: result.message || 'Mensaje enviado exitosamente',
      data: result.data
    };

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    return {
      success: false,
      message: 'Error de conexión. Inténtalo de nuevo.'
    };
  }
};