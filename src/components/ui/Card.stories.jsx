import React from 'react';
import { FaChartLine, FaUsers, FaRegCreditCard } from 'react-icons/fa';
// CORRECCIÓN: Se importa DentalCard como default y el resto como nombrados.
import DentalCard, { StatCard, ActionCard, AlertCard } from './Card';
import Button from './Button'; // Importamos el botón para las acciones

export default {
  title: 'UI/Card',
  component: DentalCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'gradient', 'glass', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'auto'] },
    padding: { control: 'select', options: ['none', 'xs', 'sm', 'default', 'md', 'lg', 'xl'] },
    rounded: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    shadow: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    hover: { control: 'boolean' },
    animate: { control: 'boolean' },
    bordered: { control: 'boolean' },
    interactive: { control: 'boolean' },
    clickable: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

// --- PLANTILLA BASE ---
const Template = (args) => (
  <DentalCard {...args}>
    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Card Interactiva</h3>
    <p className="mt-2 text-neutral-600 dark:text-neutral-400">
      Pasa el cursor sobre mí o haz clic para ver las animaciones.
    </p>
  </DentalCard>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  children: 'Contenido básico de la card.',
};

export const Elevated = Template.bind({});
Elevated.args = {
  variant: 'elevated',
  shadow: 'lg',
  children: 'Esta card parece estar "elevada".',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: 'Esta card solo tiene un borde.',
};

export const Glassmorphism = Template.bind({});
Glassmorphism.args = {
  variant: 'glass',
  children: (
    <div className="p-4">
      <h3 className="text-lg font-bold">Efecto Cristal</h3>
      <p>Esta card tiene un fondo translúcido y desenfocado.</p>
    </div>
  ),
  // Nota: Para ver el efecto, el fondo de la página debe tener una imagen o un gradiente.
};
Glassmorphism.parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0f172a' },
      { name: 'light', value: '#f1f5f9' },
    ],
  },
};


export const LoadingState = Template.bind({});
LoadingState.args = {
  loading: true,
  children: 'El contenido está oculto mientras carga.',
};

export const DisabledState = Template.bind({});
DisabledState.args = {
  disabled: true,
  children: 'Esta card está deshabilitada y no es interactiva.',
};


// --- HISTORIAS PARA COMPONENTES ESPECIALIZADOS ---

export const StatisticsCard = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Ingresos Totales"
        value="$45,231.89"
        icon={<FaChartLine />}
        trend="+20.1% desde el mes pasado"
        trendDirection="up"
      />
      <StatCard
        title="Nuevos Pacientes"
        value="+2,350"
        icon={<FaUsers />}
        trend="+180.1% desde el mes pasado"
        trendDirection="up"
      />
      <StatCard
        title="Tasa de Cancelación"
        value="5.2%"
        icon={<FaRegCreditCard />}
        trend="-2% desde el mes pasado"
        trendDirection="down"
      />
    </div>
  ),
};

export const CallToActionCard = {
  render: () => (
    <ActionCard
      title="Actualiza tu Plan"
      description="Obtén acceso a reportes avanzados, soporte prioritario y más herramientas para hacer crecer tu clínica."
      image="https://placehold.co/600x400/009688/ffffff?text=DentalApp"
      actions={
        <>
          <Button variant="primary">Actualizar</Button>
          <Button variant="ghost">Saber más</Button>
        </>
      }
    />
  ),
};

export const AlertCards = {
  render: () => (
    <div className="space-y-4">
      <AlertCard type="info" title="Recordatorio">
        No olvides completar tu perfil para una mejor experiencia.
      </AlertCard>
      <AlertCard type="success" title="¡Cita Confirmada!">
        Tu cita con el Dr. Smith ha sido agendada para el 25 de Julio a las 10:00 AM.
      </AlertCard>
      <AlertCard type="warning" title="Pago Pendiente">
        Hay una factura pendiente de pago. Por favor, revísala para evitar interrupciones.
      </AlertCard>
      <AlertCard type="error" title="Error de Conexión" dismissible>
        No se pudo guardar la información. Por favor, revisa tu conexión a internet.
      </AlertCard>
    </div>
  ),
};
