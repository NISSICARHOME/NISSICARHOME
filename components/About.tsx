import React from 'react';
import { siteContent } from '../data/siteContent';
import { motion } from 'motion/react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; index: number }> = ({ title, children, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full group"
    >
        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
            <span className="text-xl font-black">{index + 1}</span>
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase italic tracking-tight">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{children}</p>
    </motion.div>
);

const About: React.FC = () => {
    const { about } = siteContent;

    return (
        <section id="nosotros" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block mb-6 px-4 py-1.5 bg-amber-50 rounded-full">
                            <span className="text-amber-600 text-xs font-black uppercase tracking-widest">Nuestra Historia</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 uppercase italic tracking-tighter leading-none">
                            {about.title.split(' ').map((word, i) => (
                                <span key={i} className={i >= 1 ? "text-amber-500" : ""}>{word} </span>
                            ))}
                        </h2>
                        <p className="text-xl text-gray-500 leading-relaxed mb-8">
                            {about.description}
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-4xl font-black text-gray-900 mb-1">10+</p>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Años de Experiencia</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-gray-900 mb-1">5k+</p>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Clientes Felices</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-amber-500 rounded-[3rem] rotate-3 scale-105 opacity-10"></div>
                        <img 
                            src={about.image} 
                            alt="Nissi Car Home Team" 
                            loading="lazy"
                            className="relative z-10 w-full rounded-[3rem] shadow-2xl object-cover aspect-[4/3]"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <InfoCard title="Misión" index={0}>
                        Desarrollar, fabricar y comercializar productos de la más alta calidad para el embellecimiento y cuidado estético de vehículos y hogares, garantizando resultados excepcionales.
                    </InfoCard>
                    <InfoCard title="Visión" index={1}>
                        Ser la empresa líder a nivel nacional en el mercado de la estética automotriz y del hogar, reconocida por la innovación y la excelencia en nuestros servicios.
                    </InfoCard>
                    <InfoCard title="Valores" index={2}>
                        Excelencia, compromiso, transparencia y responsabilidad. Nuestra base es la investigación constante y el uso de materias primas de primera calidad.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
};

export default About;

export default About;
