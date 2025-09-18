import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaTooth,
  FaStethoscope,
  FaStickyNote,
  FaCheckCircle
} from 'react-icons/fa';
import Card from '@/components/ui/Card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const ConfirmationStep = ({ 
  selections, 
  patientData, 
  specialties, 
  services, 
  availabilities,
  selectedDate 
}) => {
  // Encontrar los datos seleccionados
  const selectedSpecialty = specialties.find(s => s.id === selections.specialtyId);
  const selectedService = services.find(s => s.id === selections.serviceId);
  const selectedAvailability = availabilities.find(a => a.id === selections.availabilityId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
          <FaCheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Confirmar Cita
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Revisa los detalles de tu cita antes de confirmar
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Resumen de la cita */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-primary" />
                Detalles de la Cita
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaStethoscope className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Especialidad</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedSpecialty?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaTooth className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Servicio</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedService?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duración: {selectedService?.duration} minutos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {formatDate(selectedDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaClock className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Hora</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedAvailability?.start_time} - {selectedAvailability?.end_time}
                      </p>
                    </div>
                  </div>

                  {selectedAvailability?.dentist && (
                    <div className="flex items-center">
                      <FaUserMd className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Doctor</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Dr. {selectedAvailability.dentist.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Información del paciente */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaUser className="mr-2 text-primary" />
                Información del Paciente
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUser className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {patientData.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaPhone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {patientData.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {patientData.email && (
                    <div className="flex items-center">
                      <FaEnvelope className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {patientData.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {patientData.notes && (
                    <div className="flex items-start">
                      <FaStickyNote className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Notas</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {patientData.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Aviso importante */}
        <motion.div variants={itemVariants}>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <FaCheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Importante
                </h4>
                <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                  <li>• Recibirás un email de confirmación con todos los detalles</li>
                  <li>• Por favor, llega 15 minutos antes de tu cita</li>
                  <li>• Trae tu documento de identidad</li>
                  <li>• Si necesitas cancelar, hazlo con al menos 24 horas de anticipación</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConfirmationStep;
