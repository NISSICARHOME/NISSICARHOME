import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';
import { motion } from 'motion/react';

const ServiceCard: React.FC<{ name: string; description: string; index: number }> = ({ name, description, index }) => {
  const isSpecial = name.includes('Asesoría');
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
        isSpecial 
          ? "bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-white shadow-amber-200 shadow-2xl" 
          : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
      }`}
    >
      <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 rounded-full blur-3xl transition-colors duration-500 ${
        isSpecial ? "bg-white/20" : "bg-amber-500/5 group-hover:bg-amber-500/10"
      }`}></div>
      <div className="relative z-10">
        <div className={`flex items-center justify-center h-14 w-14 rounded-2xl border mb-6 transition-all duration-500 ${
          isSpecial 
            ? "bg-white/20 text-white border-white/30" 
            : "bg-amber-50/80 text-amber-600 border-amber-100 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white"
        }`}>
          <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSpecial ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" : "M5 13l4 4L19 7"} />
          </svg>
        </div>
        <h3 className={`text-2xl font-black mb-3 italic uppercase tracking-tight ${isSpecial ? "text-white" : "text-gray-900 group-hover:text-amber-600"}`}>{name}</h3>
        <p className={`text-lg leading-relaxed ${isSpecial ? "text-amber-50" : "text-gray-600"}`}>{description}</p>
      </div>
    </motion.div>
  );
};

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
              En NISSI CAR-HOME, cada vehículo es tratado como una obra de arte. Utilizamos los mejores productos del mercado y técnicas avanzadas para garantizar un acabado de exhibición.
            </p>
            <HashLink
              to="/spa-automotriz"
              className="inline-flex items-center justify-center bg-white text-nissi-orange font-black uppercase tracking-widest py-5 px-10 rounded-2xl text-sm hover:bg-white/90 transition-all transform hover:scale-105 duration-300 shadow-[0_20px_40px_rgba(255,102,0,0.2)] group"
            >
              Ver servicios
              <svg className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </HashLink>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service, index) => (
            <div key={service.name} className={service.name.includes('Asesoría') ? "md:col-span-2 lg:col-span-3" : ""}>
              <ServiceCard name={service.name} description={service.description} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
