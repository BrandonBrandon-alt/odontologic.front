import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUserMd, FaCheck } from 'react-icons/fa';
import Card from '@/components/ui/Card';
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

const DateTimeSelector = ({ 
  availabilities, 
  onSelect, 
  selected, 
  loading, 
  selectedDate, 
  onDateChange 
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Selecciona Fecha y Hora
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Elige el día y horario que mejor te convenga
        </p>
      </div>

      {/* Selector de fecha */}
      <div className="mb-8">
        <Input
          label="Fecha de la cita"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={today}
          size="lg"
          icon={<FaCalendarAlt />}
        />
      </div>

      {/* Horarios disponibles */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FaClock className="mr-2" />
            Horarios Disponibles
          </h3>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando horarios disponibles...</p>
            </div>
          ) : availabilities.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {availabilities.map((slot) => (
                <motion.div key={slot.id} variants={itemVariants}>
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selected === slot.id
                        ? 'ring-2 ring-primary bg-primary/5 border-primary'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => onSelect(slot.id)}
                  >
                    <div className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 ${
                        selected === slot.id 
                          ? 'bg-primary text-white' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {selected === slot.id ? (
                          <FaCheck className="w-4 h-4" />
                        ) : (
                          <FaClock className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {slot.start_time} - {slot.end_time}
                      </div>
                      
                      <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                        <FaUserMd className="w-3 h-3 mr-1" />
                        Dr. {slot.dentist?.name || 'Disponible'}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <FaClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No hay horarios disponibles para esta fecha.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Por favor, selecciona otra fecha.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
