import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';
import { motion } from 'motion/react';

const ServiceCard: React.FC<{ name: string; description: string; index: number }> = ({ name, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-amber-50/80 text-amber-600 border border-amber-100 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">{name}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const Services: React.FC = () => {
  const { services } = siteContent;

  return (
    <section id="servicios" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase tracking-tighter italic"
          >
            {services.title.split(' ').map((word, i) => 
              word === 'ESTÉTICA' || word === 'AUTOMOTRIZ' ? <span key={i} className="text-amber-500">{word} </span> : word + ' '
            )}
          </motion.h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Multimedia Space - Featured Bento Item */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-100 bg-black aspect-video relative group"
          >
            <iframe 
              src={services.multimediaUrl} 
              width="100%" 
              height="100%" 
              allow="autoplay; encrypted-media"
              loading="lazy"
              title="Nissi Car Home Services"
              className="border-0 w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            ></iframe>
          </motion.div>

          {/* Featured Service Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-center p-10 bg-amber-500 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <h3 className="text-3xl font-black mb-6 italic uppercase tracking-tight">Compromiso de Excelencia</h3>
            <p className="text-lg text-amber-50/90 mb-8 leading-relaxed">
              En Nissi Car Home, cada vehículo es tratado como una obra de arte. Utilizamos los mejores productos del mercado y técnicas avanzadas para garantizar un acabado de exhibición.
            </p>
            <HashLink
              to="/servicios-adicionales-y-soporte"
              className="inline-flex items-center justify-center bg-white text-amber-600 font-bold py-4 px-8 rounded-2xl text-lg hover:bg-amber-50 transition-all transform hover:scale-105 duration-300 shadow-lg group"
            >
              Ver Catálogo Completo
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </HashLink>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service, index) => (
            <ServiceCard key={service.name} name={service.name} description={service.description} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

export default Services;