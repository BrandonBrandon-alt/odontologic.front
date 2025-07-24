import React, { useState } from 'react';
import Form from './Form';
import Input from './Input';
import Button from './Button';
import Alert from './Alert'; // Importamos el componente Alert

export default {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    isSuccess: { control: 'boolean' },
    error: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <div className="w-full max-w-md"><Story /></div>],
};

const Template = (args) => (
  <Form {...args}>
    <Form.Header 
      title="Formulario de Contacto"
      description="Envíanos tus dudas y te responderemos a la brevedad."
    />
    
    {/* En la historia base, podemos mostrar las alertas condicionalmente */}
    {args.error && <Alert type="error" title="Error" message={args.error} className="mb-6" />}
    {args.isSuccess && <Alert type="success" title="¡Éxito!" message="Tu mensaje ha sido enviado." className="mb-6" />}
    
    <Form.Body>
      <Form.Field>
        <Input id="name" label="Nombre Completo" required />
      </Form.Field>
      <Form.Field>
        <Input id="email" type="email" label="Correo Electrónico" required />
      </Form.Field>
      <Form.Field>
        <Input id="message" label="Tu Mensaje" required />
      </Form.Field>
    </Form.Body>
    
    <Form.Footer>
      <Button type="submit" fullWidth isLoading={args.isLoading}>
        Enviar Mensaje
      </Button>
    </Form.Footer>
  </Form>
);

export const Default = Template.bind({});
Default.args = {};

export const LoadingState = Template.bind({});
LoadingState.args = {
  isLoading: true,
};

export const SuccessState = Template.bind({});
SuccessState.args = {
  isSuccess: true,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  error: 'El correo electrónico ya está en uso. Por favor, intenta con otro.',
};

// Historia para un formulario de inicio de sesión que usa el componente Alert
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    // Simular una llamada a la API
    setTimeout(() => {
      const email = e.target.elements.email.value;
      if (email === 'error@test.com') {
        setError('Las credenciales son incorrectas.');
      } else if (email) {
        setIsSuccess(true);
      } else {
        setError('Por favor, ingresa tu correo electrónico.');
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Header title="Iniciar Sesión" />
      
      <div className="my-6">
        {error && <Alert type="error" title="Error de autenticación" message={error} />}
        {isSuccess && <Alert type="success" title="¡Bienvenido de nuevo!" message="Has iniciado sesión correctamente." />}
      </div>

      <Form.Body>
        <Form.Field>
          <Input id="email" type="email" label="Correo Electrónico" required disabled={isLoading || isSuccess} />
        </Form.Field>
        <Form.Field>
          <Input id="password" type="password" label="Contraseña" required showPasswordToggle disabled={isLoading || isSuccess} />
        </Form.Field>
      </Form.Body>
      <Form.Footer>
        <Button type="submit" fullWidth isLoading={isLoading} disabled={isSuccess}>
          {isSuccess ? 'Iniciando Sesión...' : 'Ingresar'}
        </Button>
        <Button variant="link" disabled={isLoading || isSuccess}>
          ¿Olvidaste tu contraseña?
        </Button>
      </Form.Footer>
    </Form>
  );
};
