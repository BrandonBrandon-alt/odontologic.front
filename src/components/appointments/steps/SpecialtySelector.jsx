import React from 'react';
import { motion } from 'framer-motion';
import { FaStethoscope, FaCheck } from 'react-icons/fa';
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

const SpecialtySelector = ({ specialties, onSelect, selected }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Selecciona una Especialidad
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Elige el área médica que necesitas para tu consulta
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {specialties.map((specialty) => (
          <motion.div key={specialty.id} variants={itemVariants}>
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selected === specialty.id
                  ? 'ring-2 ring-primary bg-primary/5 border-primary'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onSelect(specialty.id)}
            >
              <div className="p-6 text-center min-h-[200px] flex flex-col justify-between">
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                    selected === specialty.id 
                      ? 'bg-primary text-white shadow-lg scale-110' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}>
                    {selected === specialty.id ? (
                      <FaCheck className="w-6 h-6" />
                    ) : (
                      <FaStethoscope className="w-6 h-6" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight">
                    {specialty.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
                
                {selected === specialty.id && (
                  <div className="mt-4 text-primary font-medium text-sm">
                    ✓ Seleccionado
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {specialties.length === 0 && (
        <div className="text-center py-12">
          <FaStethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay especialidades disponibles</p>
        </div>
      )}
    </div>
  );
};

export default SpecialtySelector;
