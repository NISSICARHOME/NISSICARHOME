import React from 'react';

const servicesData = [
  { name: 'Detailing Automotriz', description: 'Limpieza profunda y restauración interna de vehículos.' },
  { name: 'Spa para Vehículos', description: 'Tratamientos completos para el cuidado interior y exterior de tu automóvil.' },
  { name: 'Aplicación de Recubrimiento Cerámico y Porcelanizado', description: 'Revestimientos de protección avanzados para la carrocería y pintura.' },
  { name: 'Desmanchado de Vidrios', description: 'Servicio especializado para hoteles, unidades residenciales, casas campestres y piscinas.' },
  { name: 'Asesoría personalizada', description: 'Brindamos soporte uno a uno con cada cliente para garantizar los mejores resultados.' },
  { name: 'Garantía de 365 días', description: 'Respaldamos nuestros productos con una política de garantía en el resultado final.' },
];

const ServiceItem: React.FC<{ name: string; description: string; }> = ({ name, description }) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div className="ml-4">
      <dt className="text-lg leading-6 font-medium text-white">{name}</dt>
      <dd className="mt-2 text-base text-gray-400">{description}</dd>
    </div>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Servicios Adicionales y Soporte</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            No solo ofrecemos productos, sino también servicios especializados y el mejor soporte para ti.
          </p>
        </div>

        <div className="mt-16">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {servicesData.map(service => (
              <ServiceItem key={service.name} name={service.name} description={service.description} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Services;
