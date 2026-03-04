import React, { useState, useEffect } from 'react';
import { siteContent } from '../data/siteContent';

// --- Accordion Component (scoped for this page) ---
const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-item bg-gray-50 border border-gray-200 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="accordion-toggle flex justify-between items-center w-full p-5 font-semibold text-left text-gray-800"
            >
                <span>{title}</span>
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="p-5 pt-0">
                        <p className="text-gray-700 leading-relaxed">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const LandingPageAdditionalServices: React.FC = () => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "Spa Automotriz y Detailing Profesional - Nissi Car Home";
        return () => { document.title = originalTitle; };
    }, []);

    const faqData = [
        { question: "¿En qué consiste el Detailing Exterior?", answer: "Es un proceso minucioso de 4 fases. 1) Lavado con técnica de dos cubetas y pH neutro. 2) Descontaminación física (Clay Bar) y química. 3) Corrección de pintura (pulido) para eliminar rayones. 4) Protección final con sellador cerámico." },
        { question: "¿Qué incluye el lavado interno?", answer: "No es solo una aspirada. Desmontamos sillas, carteras y consolas para llegar a cada rincón. Eliminamos manchas de sudor, malos olores, y desinfectamos ductos de ventilación. Tu auto queda higienizado y con olor a nuevo." },
        { question: "¿Cuánto tiempo toma el Servicio GOLD?", answer: "Debido al nivel de detalle y los tiempos de curado de los recubrimientos (el vehículo no debe tocar agua por 12-24h), este servicio suele requerir que el vehículo permanezca en nuestras instalaciones de 1 a 2 días para garantizar la perfección." },
    ];

    return (
        <div className="bg-white font-sans">
             <style>{`
                @keyframes pulse-strong {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(247, 127, 0, 0.7);
                    }
                    70% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(247, 127, 0, 0);
                    }
                }
                .animate-pulse-strong {
                    animation: pulse-strong 2s infinite;
                }
            `}</style>
            
            <section id="oferta-servicios" className="bg-white py-12 px-4 text-center">
                <div className="w-full max-w-3xl mx-auto mb-8">
                    <img
                        src="https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=01"
                        alt="Nissi Car Home Spa Automotriz"
                        className="w-full h-auto rounded-lg shadow-2xl"
                        onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src='https://placehold.co/1000x800/333/FFF?text=Nissi+Car+Home'; }}
                    />
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Renace tu Vehículo: Spa Automotriz Profesional</h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-justify hyphens-auto break-words">
                    Más que un lavado, es una restauración. Desde corrección de pintura y cerámica, hasta limpieza interna profunda.
                    Devolvemos tu auto a su estado de fábrica con tecnología de punta.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg inline-block mb-8 border border-blue-200">
                    <p className="text-xl font-semibold text-blue-800">🌟 Especialidad: Servicio GOLD Full Vehículo</p>
                </div>

                <div className="max-w-md mx-auto flex items-center justify-center gap-4">
                    <a
                        href="https://wa.me/573103754727"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow bg-[#F77F00] text-white font-bold text-xl md:text-2xl py-4 px-6 rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:scale-105 animate-pulse-strong"
                    >
                        AGENDAR CITA AHORA
                    </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">Servicio realizado en nuestra fábrica en Pereira. Garantía de satisfacción total.</p>
            </section>

            
            <section className="bg-gray-900 py-16 px-4 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Así Trabajamos en Nissi Car Home</h2>
                    <p className="mb-8 text-gray-300">Observa el proceso detallado de restauración y el nivel de perfección que aplicamos.</p>
                    <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden border-4 border-[#F77F00]">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/vk3W73Pnan0?si=A6kWy7eGKIG4yxHa"
                            title="Proceso de Detailing"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </section>

            
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">Nuestros Servicios Especializados</h2>
                    <p className="text-center text-xl text-gray-600 mb-12 text-justify hyphens-auto break-words max-w-3xl mx-auto">Utilizamos insumos profesionales y técnicas avanzadas para garantizar resultados de exhibición.</p>
                    
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <div className="flex flex-col md:flex-row items-start gap-5 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white text-gray-800">
                            <img src="https://placehold.co/400x300/60a5fa/FFF?text=Farolas" alt="Restauración de Farolas" className="w-full md:w-1/3 h-40 object-cover rounded-md flex-shrink-0" />
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-2 text-blue-700">1. Restauración de Farolas & Personalización</h3>
                                <p className="text-gray-600 text-justify hyphens-auto break-words">Recuperamos la transparencia eliminando opacidad y rayones. También personalizamos el estilo de tus luces al gusto (modificaciones visuales).</p>
                            </div>
                        </div>
                       
                        <div className="flex flex-col md:flex-row items-start gap-5 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white text-gray-800">
                            <img src="https://placehold.co/400x300/f87171/FFF?text=Exterior" alt="Detailing Exterior" className="w-full md:w-1/3 h-40 object-cover rounded-md flex-shrink-0" />
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-2 text-blue-700">2. Detailing Exterior (Cerámico)</h3>
                                <p className="text-gray-600 text-justify hyphens-auto break-words">Proceso de 4 fases: Lavado pH neutro, Descontaminación, Corrección de pintura y Protección Cerámica (escudo hidrofóbico).</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start gap-5 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white text-gray-800">
                            <img src="https://placehold.co/400x300/34d399/FFF?text=Interior" alt="Detailing Interno" className="w-full md:w-1/3 h-40 object-cover rounded-md flex-shrink-0" />
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-2 text-blue-700">3. Detailing Interno Profundo</h3>
                                <p className="text-gray-600 text-justify hyphens-auto break-words">Desmontamos sillas y alfombras. Limpiamos ductos de aire, eliminamos olores, bacterias y manchas orgánicas. Tu interior queda desinfectado.</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start gap-5 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white text-gray-800">
                            <img src="https://placehold.co/400x300/c084fc/FFF?text=Vidrios" alt="Tratamiento de Vidrios" className="w-full md:w-1/3 h-40 object-cover rounded-md flex-shrink-0" />
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-2 text-blue-700">4. Tratamiento de Vidrios (Lluvia Ácida)</h3>
                                <p className="text-gray-600 text-justify hyphens-auto break-words">Eliminación de sarro, minerales incrustados y gotas secas. Restauramos la visibilidad cristalina.</p>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-2 flex flex-col md:flex-row items-start gap-5 p-8 rounded-lg shadow-xl transition-all duration-300 bg-gray-900 text-white border-2 border-[#F77F00]">
                            <img src="https://placehold.co/400x300/F77F00/FFF?text=GOLD" alt="Servicio GOLD" className="w-full md:w-1/3 h-40 object-cover rounded-md flex-shrink-0" />
                            <div className="w-full">
                                <h3 className="text-3xl font-bold mb-2 text-[#F77F00]">🌟 5. Servicio GOLD Full Vehículo</h3>
                                <p className="text-gray-300 text-lg text-justify hyphens-auto break-words">La experiencia definitiva. Incluye TODOS los servicios anteriores en un solo paquete premium para una transformación total de tu automóvil.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Lo Que Dicen Nuestros Clientes</h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex text-yellow-400 mb-2 text-xl">★★★★★</div>
                            <p className="text-gray-600 italic mb-4 text-justify hyphens-auto break-words">"Llevé mi camioneta para el Servicio Gold y no podía creerlo. Los rayones desaparecieron y el interior quedó impecable, como sacado del concesionario."</p>
                            <p className="font-bold text-gray-800 text-right">- Carlos M. (Pereira)</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex text-yellow-400 mb-2 text-xl">★★★★★</div>
                            <p className="text-gray-600 italic mb-4 text-justify hyphens-auto break-words">"Mis farolas estaban tan opacas que no alumbraban nada. En Nissi las dejaron transparentes y con un estilo personalizado increíble. ¡Recomendados!"</p>
                            <p className="font-bold text-gray-800 text-right">- Juliana R. (Ibagué)</p>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <AccordionItem key={index} title={item.question}>
                                {item.answer}
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            </section>

             
            <footer className="bg-gray-900 text-center py-12 px-4">
                <h2 className="text-3xl font-bold text-white mb-4">¿Listo para que tu auto renazca?</h2>
                <p className="text-gray-300 text-lg mb-8">No esperes más. Dale a tu vehículo el tratamiento que merece.</p>
                <a
                    href={`https://wa.me/${siteContent.footer.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#F77F00] text-white font-bold text-xl py-4 px-8 rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:scale-105"
                >
                    ¡AGENDAR MI CITA AHORA!
                </a>
            </footer>
        </div>
    );
};

export default LandingPageAdditionalServices;