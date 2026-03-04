import React from 'react';
import { siteContent } from '../data/siteContent';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <h3 className="text-xl sm:text-2xl font-bold text-amber-600 mb-4">{title}</h3>
        <p className="text-gray-700 text-sm sm:text-base">{children}</p>
    </div>
);


const About: React.FC = () => {
    const { about } = siteContent;

    return (
        <section id="nosotros" className="py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16 p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset">
                    <h2 className="text-2xl font-extrabold text-gray-800 sm:text-4xl">
                       {about.title}
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-base text-gray-600 sm:text-lg">
                       {about.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <InfoCard title="Misión">
                        Desarrollar, fabricar y comercializar productos de la más alta calidad para el embellecimiento y cuidado estético de vehículos y hogares. A través de la investigación continua y el uso de materias primas superiores, ofrecemos soluciones innovadoras y servicios de detallado especializados que garantizan resultados excepcionales.
                    </InfoCard>
                    <InfoCard title="Visión">
                        Ser la empresa líder a nivel nacional en el mercado de la estética automotriz y del hogar, reconocida por la innovación, la eficacia de nuestros productos y la excelencia en nuestros servicios. Aspiramos a expandir nuestra presencia y consolidarnos como la marca de mayor confianza.
                    </InfoCard>
                    <InfoCard title="Fundamentos">
                        Nuestra base es la investigación constante y el uso de materias primas de primera para crear formulaciones únicas y efectivas. Construimos relaciones basadas en la confianza a través de asesoría personalizada y respaldamos la eficacia de nuestros productos con una garantía de 365 días.
                    </InfoCard>
                </div>

                <div className="mt-12 md:mt-20 p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
                           Principios y Valores
                        </h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <InfoCard title="Excelencia y Compromiso">
                            Buscamos la perfección en cada producto y servicio, comprometiéndonos a entregar resultados visibles y duraderos.
                        </InfoCard>
                         <InfoCard title="Transparencia y Responsabilidad">
                            Operamos con honestidad, brindando información clara y asumiendo la responsabilidad por el rendimiento de nuestros productos.
                        </InfoCard>
                         <InfoCard title="Calidad, Confianza e Innovación">
                            Estos son los pilares de todo lo que hacemos, fomentando relaciones a largo plazo y buscando constantemente nuevas soluciones.
                        </InfoCard>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;