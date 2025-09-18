import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCheck, FaTooth } from 'react-icons/fa';
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

const ServiceSelector = ({ services, onSelect, selected, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando servicios...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Selecciona un Servicio
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Elige el tipo de tratamiento que necesitas
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selected === service.id
                  ? 'ring-2 ring-primary bg-primary/5 border-primary'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onSelect(service.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                    selected === service.id 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {selected === service.id ? (
                      <FaCheck className="w-5 h-5" />
                    ) : (
                      <FaTooth className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <FaClock className="w-3 h-3 mr-1" />
                    {service.duration} min
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {service.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {services.length === 0 && !loading && (
        <div className="text-center py-12">
          <FaTooth className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay servicios disponibles para esta especialidad</p>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
