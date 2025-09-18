import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaStickyNote } from 'react-icons/fa';
import Input from '@/components/ui/Input';

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

const PatientForm = ({ data, onChange, errors = {}, isGuest = true }) => {
  const handleInputChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {isGuest ? 'Información Personal' : 'Notas Adicionales'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {isGuest 
            ? 'Completa tus datos para confirmar la cita' 
            : 'Agrega cualquier información adicional sobre tu consulta'
          }
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {isGuest && (
          <>
            {/* Nombre completo */}
            <motion.div variants={itemVariants}>
              <Input
                label="Nombre Completo"
                type="text"
                value={data.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ingresa tu nombre completo"
                icon={<FaUser />}
                error={errors.name}
                required
                size="lg"
              />
            </motion.div>

            {/* Email y teléfono en grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Correo Electrónico"
                type="email"
                value={data.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="ejemplo@correo.com"
                icon={<FaEnvelope />}
                error={errors.email}
                size="lg"
              />

              <Input
                label="Número de Teléfono"
                type="tel"
                value={data.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+57 300 123 4567"
                icon={<FaPhone />}
                error={errors.phone}
                required
                size="lg"
              />
            </motion.div>
          </>
        )}

        {/* Notas adicionales */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FaStickyNote className="inline mr-2" />
            Notas Adicionales (Opcional)
          </label>
          <textarea
            value={data.notes || ''}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Describe cualquier síntoma, alergia o información relevante para tu consulta..."
            rows={4}
            maxLength={500}
            className={`w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-primary focus:border-primary 
              dark:bg-gray-700 dark:text-white resize-none transition-colors
              ${errors.notes ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            `}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.notes && (
              <p className="text-red-500 text-sm">{errors.notes}</p>
            )}
            <p className="text-gray-500 text-sm ml-auto">
              {(data.notes || '').length}/500
            </p>
          </div>
        </motion.div>

        {isGuest && (
          <motion.div variants={itemVariants}>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Importante:</strong> Recibirás un email de confirmación con todos los detalles de tu cita. 
                Por favor, llega 15 minutos antes de tu cita programada.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PatientForm;
