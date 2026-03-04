import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';

const ServiceItem: React.FC<{ name: string; description: string; }> = ({ name, description }) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-amber-500/80 text-white border border-amber-400/50 backdrop-blur-sm shadow-lg">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div className="ml-4">
      <dt className="text-base sm:text-lg leading-6 font-medium text-gray-800">{name}</dt>
      <dd className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">{description}</dd>
    </div>
  </div>
);

const Services: React.FC = () => {
  const { services } = siteContent;

  return (
    <section id="servicios" className="py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter italic">
              {services.title.split(' ').map((word, i) => 
                word === 'ESTÉTICA' || word === 'AUTOMOTRIZ' ? <span key={i} className="text-amber-500">{word} </span> : word + ' '
              )}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
              {services.subtitle}
            </p>
          </div>

          {/* Multimedia Space */}
          <div className="mt-10 w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white ring-1 ring-gray-200 bg-white aspect-video relative group transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50">
                  <iframe 
                      src={services.multimediaUrl} 
                      width="100%" 
                      height="100%" 
                      allow="autoplay"
                      className="border-0 w-full h-full"
                  ></iframe>
              </div>
          </div>

          <div className="mt-12 md:mt-16">
            <dl className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {services.items.map(service => (
                <ServiceItem key={service.name} name={service.name} description={service.description} />
              ))}
            </dl>
          </div>


          <div className="mt-16 text-center">
            <HashLink
              to="/servicios-adicionales-y-soporte"
              className="inline-block bg-amber-500/80 text-white hover:bg-amber-500/100 border border-amber-400/50 backdrop-blur-sm font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 duration-300 shadow-lg"
            >
              Conoce Nuestro Spa Automotriz Profesional
            </HashLink>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;