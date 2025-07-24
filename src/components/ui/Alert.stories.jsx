// src/components/Alert.stories.jsx

import React from 'react';
import { FaBell } from 'react-icons/fa';
import Alert from './Alert'; // Asegúrate de que la ruta a tu componente sea correcta

// El objeto "meta" describe la documentación de tu componente
export default {
  title: 'UI/Alert', // Cómo aparecerá en la barra lateral de Storybook
  component: Alert,
  tags: ['autodocs'], // Habilita la generación automática de la pestaña "Docs"
  argTypes: {
    // Aquí definimos cómo se controlan las props en la UI de Storybook
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'El tipo de alerta, que cambia el color y el ícono.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'El tamaño de la alerta (padding, tamaño de fuente).',
    },
    title: { 
      control: 'text',
      description: 'El título principal de la alerta.'
    },
    message: {
      control: 'text',
      description: 'El mensaje descriptivo de la alerta.'
    },
    dismissible: {
      control: 'boolean',
      description: 'Si la alerta puede ser cerrada por el usuario.'
    },
    autoClose: {
      control: { type: 'number', min: 0, step: 1000 },
      description: 'Milisegundos para que la alerta se cierre sola (0 o null para desactivar).'
    },
    onClose: {
      action: 'closed', // Crea un "espía" que muestra en la pestaña "Actions" cuando se llama a onClose
      description: 'Función que se ejecuta al cerrar la alerta.'
    },
    customIcon: {
      control: false, // Deshabilitamos el control para el ícono, lo mostraremos en una historia específica
      description: 'Permite pasar un componente de React como ícono personalizado.'
    }
  },
};

// --- PLANTILLA BASE ---
const Template = (args) => <Alert {...args} />;

// --- HISTORIAS ---
// Cada "export const" es una historia (una variante) que aparecerá en Storybook

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  title: 'Información Importante',
  message: 'Esta es una notificación estándar para mantenerte al día.',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  title: '¡Éxito!',
  message: 'La operación se ha completado correctamente.',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  title: 'Advertencia',
  message: 'Ten cuidado, esta acción podría tener consecuencias no deseadas.',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  title: 'Error Inesperado',
  message: 'No se pudo completar la solicitud. Por favor, inténtalo de nuevo.',
  dismissible: false,
};

export const LargeWithAutoClose = Template.bind({});
LargeWithAutoClose.args = {
  ...Success.args, // Reutilizamos los argumentos de la historia "Success"
  size: 'lg',
  title: 'Actualización Grande con Autocierre',
  message: 'Esta notificación grande desaparecerá en 5 segundos.',
  autoClose: 5000,
};

export const SmallWithMessageOnly = Template.bind({});
SmallWithMessageOnly.args = {
  type: 'info',
  size: 'sm',
  message: 'Solo un mensaje pequeño, sin título.',
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  ...Info.args,
  title: 'Alerta Personalizada',
  message: 'Esta alerta usa un ícono diferente.',
  customIcon: <FaBell />,
};