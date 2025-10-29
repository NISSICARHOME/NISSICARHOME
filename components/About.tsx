import React from 'react';

const SectionWrapper: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
    <div id={id} className="py-16 sm:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base font-semibold text-amber-400 tracking-wide uppercase">Nissi Car Home</h2>
                <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    {title}
                </p>
                <div className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-amber-500/10 hover:scale-105 transition-all duration-300">
        <h3 className="text-2xl font-bold text-amber-400 mb-4">{title}</h3>
        <p className="text-gray-300">{children}</p>
    </div>
);


const About: React.FC = () => {
    return (
        <section id="nosotros" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                       ¿Quiénes Somos?
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
                       Somos una empresa colombiana, con casa matriz en Pereira y sedes en Ibagué y El Espinal, apasionada por la innovación en el cuidado estético. Nuestro equipo se especializa en la formulación de recubrimientos y productos de limpieza basados en materias primas de vanguardia, garantizando protección, brillo y una vida útil prolongada para las superficies de su vehículo y hogar.
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

                <div className="mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
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
