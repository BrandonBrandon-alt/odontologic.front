import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Input, { PasswordInput, SearchInput, EmailInput, PhoneInput, NumberInput } from './Input'; // Asegúrate de que la ruta sea correcta

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'search'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'text' },
    helper: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    required: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
    icon: { control: false },
  },
  // Decorador para centrar y limitar el ancho de las historias
  decorators: [(Story) => <div className="w-full max-w-sm p-4"><Story /></div>],
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'default-input',
  label: 'Nombre Completo',
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  id: 'placeholder-input',
  label: 'Nombre de Usuario',
  placeholder: 'ej: john_doe',
};

export const WithError = Template.bind({});
WithError.args = {
  id: 'error-input',
  label: 'Correo Electrónico',
  type: 'email',
  defaultValue: 'email-invalido',
  error: 'Por favor, introduce un correo válido.',
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  id: 'success-input',
  label: 'Nombre de Usuario',
  defaultValue: 'juan_perez',
  success: '¡Nombre de usuario disponible!',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  id: 'helper-input',
  label: 'Contraseña',
  type: 'password',
  helper: 'Debe tener al menos 8 caracteres.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'disabled-input',
  label: 'Campo Deshabilitado',
  defaultValue: 'No puedes editar esto',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  id: 'loading-input',
  label: 'Buscando...',
  loading: true,
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  id: 'icon-left',
  label: 'Nombre de Usuario',
  icon: <FaUser />,
  iconPosition: 'left',
};

export const ClearableInput = Template.bind({});
ClearableInput.args = {
  id: 'clearable-input',
  label: 'Buscar',
  defaultValue: 'Escribe algo para poder borrar...',
  clearable: true,
};

// --- HISTORIAS PARA VARIANTES ---

export const AllVariants = {
  render: () => (
    <div className="space-y-8 max-w-sm">
      <Input id="v-default" variant="default" label="Variante Default" placeholder="Estilo por defecto" />
      <Input id="v-outline" variant="outline" label="Variante Outline" placeholder="Con borde completo" />
      <Input id="v-filled" variant="filled" label="Variante Filled" placeholder="Con fondo" />
      <Input id="v-underline" variant="underline" label="Variante Underline" placeholder="Solo línea inferior" />
    </div>
  ),
};

// --- HISTORIAS PARA COMPONENTES ESPECIALIZADOS ---

export const PasswordComponent = {
  render: () => (
    <PasswordInput 
      id="password-component"
      label="Contraseña"
      helper="Usa el ícono para mostrar/ocultar."
    />
  ),
};

export const SearchComponent = {
  render: () => (
    <SearchInput 
      id="search-component"
      label="Buscar Paciente"
    />
  ),
};

export const SpecializedInputs = {
    render: () => (
      <div className="space-y-8 max-w-sm">
        <EmailInput id="email-specialized" label="Correo Electrónico" />
        <PhoneInput id="phone-specialized" label="Teléfono" />
        <NumberInput id="number-specialized" label="Edad" />
      </div>
    ),
  };

