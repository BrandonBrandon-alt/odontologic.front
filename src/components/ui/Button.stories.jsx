import React from 'react';
import { FaSave, FaEdit, FaTrash, FaChevronRight, FaHeart } from 'react-icons/fa';
import Button from './Button'; // Asegúrate de que la ruta sea correcta

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'outline', 'ghost', 'link'],
      description: 'Estilo visual del botón',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamaño del botón',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'normal', 'lg', 'xl', 'full'],
      description: 'Nivel de redondeo de las esquinas',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posición del ícono respecto al texto',
    },
    isLoading: { control: 'boolean', description: 'Muestra el estado de carga' },
    disabled: { control: 'boolean', description: 'Deshabilita el botón' },
    fullWidth: { control: 'boolean', description: 'Hace que el botón ocupe todo el ancho' },
    shadow: { control: 'boolean', description: 'Aplica sombra al botón' },
    children: { control: 'text', description: 'Contenido de texto del botón' },
    loadingText: { control: 'text', description: 'Texto a mostrar cuando isLoading es true' },
    onClick: { action: 'clicked', description: 'Función a ejecutar al hacer clic' },
    icon: {
      control: false, // El ícono se pasa como un componente, no se controla aquí
      description: 'Componente de React para usar como ícono',
    },
  },
};

// --- PLANTILLA BASE ---
const Template = (args) => <Button {...args} />;

// --- HISTORIAS ---
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Botón Primario',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Botón Secundario',
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  variant: 'primary',
  children: 'Guardar Cambios',
  icon: <FaSave />,
  iconPosition: 'left',
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  variant: 'secondary',
  children: 'Siguiente',
  icon: <FaChevronRight />,
  iconPosition: 'right',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  variant: 'ghost',
  size: 'lg',
  rounded: 'full',
  children: null, // Sin texto
  icon: <FaHeart />,
  'aria-label': 'Favorito', // importante para accesibilidad
};

export const Loading = Template.bind({});
Loading.args = {
  variant: 'primary',
  children: 'Esto no se verá',
  loadingText: 'Procesando...',
  isLoading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  children: 'Botón Deshabilitado',
  disabled: true,
};

// Historia especial para mostrar todas las variantes a la vez
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// Historia especial para mostrar todos los tamaños
export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};