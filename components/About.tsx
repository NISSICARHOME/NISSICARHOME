import React from 'react';
import { siteContent } from '../data/siteContent';
import { motion } from 'motion/react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; index: number }> = ({ title, children, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>
        <div className="relative z-10">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-sm">
                <span className="text-2xl font-black italic">{index + 1}</span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter leading-none">{title}</h3>
            <p className="text-gray-500 text-lg leading-relaxed">{children}</p>
        </div>
    </motion.div>
);

const About: React.FC = () => {
    const { about } = siteContent;
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <section id="nosotros" className="py-24 bg-white overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Story Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block mb-6 px-4 py-1.5 bg-amber-50 rounded-full">
                            <span className="text-amber-600 text-xs font-black uppercase tracking-widest">Nuestra Historia</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 uppercase italic tracking-tighter leading-none">
                            SOBRE <span className="text-amber-500">NISSI CAR-HOME</span>
                        </h2>
                        <p className="text-xl text-gray-500 leading-relaxed mb-12">
                            {about.description}
                        </p>
                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
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

                    {/* Identity Toggle Section (Payment Methods Style) */}
                    <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-white">
                        <div 
                            className="text-center cursor-pointer group"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <div className="flex flex-col items-center">
                                <h2 className="text-xl font-extrabold text-gray-800 sm:text-4xl flex items-center gap-3 uppercase italic tracking-tighter">
                                    Nuestra <span className="text-amber-500">Identidad</span>
                                    <svg 
                                        className={`w-6 h-6 sm:w-8 sm:h-8 text-amber-500 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </h2>
                                <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
                                    {isExpanded 
                                        ? "Misión • Visión • Valores"
                                        : "Conoce los pilares que definen nuestra excelencia. Haz clic para ver los detalles."
                                    }
                                </p>
                            </div>
                        </div>

                        <div className={`grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
