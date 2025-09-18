"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, 
  FaTimes,
  FaClock,
  FaChevronDown
} from 'react-icons/fa';
import DentalButton from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input, { SearchInput } from '@/components/ui/Input';
import Link from 'next/link';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

// Componente para una tarjeta de servicio
const ServiceCard = ({ service, index }) => (
  <motion.div
    variants={itemVariants}
    className="w-full"
  >
    <Card className="bg-white dark:bg-gray-800 h-full border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
            {service.name}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium ml-2 flex-shrink-0">
            {service.specialtyName}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
          {service.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <FaClock className="mr-1" />
            {service.duration} min
          </div>
          <DentalButton variant="primary" size="sm">
            <Link href="/book-appointment">Agendar</Link>
          </DentalButton>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Card>
  </motion.div>
);

// Componente principal
function AllServicesPage() {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Cargar datos
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar especialidades
      const specialtiesResponse = await fetch(`${API_BASE_URL}/specialties`);
      if (!specialtiesResponse.ok) throw new Error('Error al cargar especialidades');
      const specialtiesData = await specialtiesResponse.json();
      
      // Cargar todos los servicios
      const servicesResponse = await fetch(`${API_BASE_URL}/service-types`);
      if (!servicesResponse.ok) throw new Error('Error al cargar servicios');
      const servicesData = await servicesResponse.json();
      
      // Crear un mapa de especialidades para fácil acceso
      const specialtyMap = {};
      specialtiesData.forEach(specialty => {
        specialtyMap[specialty.id] = specialty.name;
      });
      
      // Enriquecer servicios con nombre de especialidad
      const enrichedServices = servicesData.map(service => ({
        ...service,
        specialtyName: specialtyMap[service.specialty_id] || 'Sin especialidad'
      }));
      
      setSpecialties(specialtiesData);
      setAllServices(enrichedServices);
      setFilteredServices(enrichedServices);
      
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...allServices];
    
    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtro por especialidad
    if (selectedSpecialty) {
      filtered = filtered.filter(service => 
        service.specialty_id === parseInt(selectedSpecialty)
      );
    }
    
    // Filtro por duración
    if (durationFilter) {
      switch (durationFilter) {
        case 'short':
          filtered = filtered.filter(service => service.duration <= 30);
          break;
        case 'medium':
          filtered = filtered.filter(service => service.duration > 30 && service.duration <= 90);
          break;
        case 'long':
          filtered = filtered.filter(service => service.duration > 90);
          break;
      }
    }
    
    setFilteredServices(filtered);
  };

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setDurationFilter('');
    setFilteredServices(allServices);
  };

  // Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadData();
    }
  }, [mounted]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedSpecialty, durationFilter, allServices]);

  // No renderizar hasta que esté montado
  if (!mounted) {
    return (
      <div className="min-h-screen dental-bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Inicializando...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen dental-bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-screen dental-bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <DentalButton onClick={loadData}>
            Reintentar
          </DentalButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dental-bg-background relative pt-6 sm:pt-4">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">
            Todos Nuestros Servicios
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Explora nuestra completa gama de servicios dentales especializados. 
            Utiliza los filtros para encontrar exactamente lo que necesitas.
          </p>
        </motion.div>

        {/* Barra de búsqueda y filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          {/* Búsqueda principal */}
          <div className="mb-4">
            <SearchInput
              placeholder="Buscar servicios por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={setSearchTerm}
              size="lg"
              clearable={true}
            />
          </div>

          {/* Toggle filtros */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <FaFilter className="mr-2" />
              Filtros Avanzados
              <FaChevronDown className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredServices.length} de {allServices.length} servicios
              </span>
              {(searchTerm || selectedSpecialty || durationFilter) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-red-600 hover:text-red-700 text-sm"
                >
                  <FaTimes className="mr-1" />
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Filtros expandibles */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  {/* Filtro por especialidad */}
                  <div>
                    <label className="block dental-text-primary font-medium mb-2 text-sm">
                      Especialidad
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full dental-input border-2 border-border dark:border-border-dark rounded-dental-md px-dental-md py-dental-md dental-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-theme"
                    >
                      <option value="">Todas las especialidades</option>
                      {specialties.map(specialty => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtro por duración */}
                  <div>
                    <label className="block dental-text-primary font-medium mb-2 text-sm">
                      Duración
                    </label>
                    <select
                      value={durationFilter}
                      onChange={(e) => setDurationFilter(e.target.value)}
                      className="w-full dental-input border-2 border-border dark:border-border-dark rounded-dental-md px-dental-md py-dental-md dental-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-theme"
                    >
                      <option value="">Cualquier duración</option>
                      <option value="short">Corta (≤ 30 min)</option>
                      <option value="medium">Media (31-90 min)</option>
                      <option value="long">Larga (&gt; 90 min)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grid de servicios */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 text-lg mb-4">
                No se encontraron servicios con los filtros aplicados
              </p>
              <DentalButton onClick={clearFilters}>
                Limpiar Filtros
              </DentalButton>
            </div>
          ) : (
            filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))
          )}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿No encuentras lo que buscas?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está aquí para ayudarte. Agenda una consulta y te orientaremos 
            sobre el mejor tratamiento para tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DentalButton variant="primary" size="lg">
              <Link href="/book-appointment">Agendar Consulta</Link>
            </DentalButton>
            <DentalButton variant="secondary" size="lg">
              <Link href="/contact">Contactar Especialista</Link>
            </DentalButton>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default AllServicesPage;
