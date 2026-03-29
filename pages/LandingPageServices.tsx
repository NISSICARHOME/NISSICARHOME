import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HashLink } from 'react-router-hash-link';
import Accordion from '../components/shared/Accordion';
import { CartItem, Review } from '../types';
import BuyNowButton from '../components/shared/BuyNowButton';
import ReviewSection from '../components/shared/ReviewSection';

// --- HELPER COMPONENTS ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg mb-3">
    <svg className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="text-gray-700">{children}</span>
  </li>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

// --- PAGE SECTIONS ---

const LandingHero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy link: ', err));
  };

  return (
    <section id="oferta-servicios" className="bg-white py-12 px-4 text-center">
      <div className="w-full max-w-2xl mx-auto mb-8">
          {/* NOTA: Usar foto de un auto de lujo brillando en la fábrica */}
          <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=01" 
              alt="Nissi Car Home Spa Automotriz" 
              className="w-full h-auto rounded-lg shadow-2xl" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Renace tu Vehículo: Spa Automotriz Profesional</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Más que un lavado, es una restauración. Desde corrección de pintura y cerámica, hasta limpieza interna profunda. 
        Devolvemos tu auto a su estado de fábrica con tecnología de punta.
      </p>
       <div className="bg-blue-50 p-4 rounded-lg inline-block mb-8">
            <p className="text-xl font-semibold text-blue-800">🌟 Especialidad: Servicio GOLD Full Vehículo</p>
       </div>

      <BuyNowButton 
        onClick={() => window.open('https://wa.me/573103754727', '_blank')} 
        text="AGENDAR CITA AHORA"
      />
      <div className="mt-4">
        <HashLink smooth to="/#contacto" className="text-blue-600 hover:text-blue-800 underline transition-colors text-sm font-medium">
          O contáctanos para agendar una cita
        </HashLink>
      </div>
      <p className="mt-2 text-sm text-gray-500">Servicio realizado en nuestra fábrica en Pereira. Garantía de satisfacción total.</p>
    </section>
  );
};

const LandingVideo: React.FC = () => {
    return (
        <section className="bg-gray-900 py-16 px-4 text-white">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Así Trabajamos en Nissi Car Home</h2>
                 <p className="mb-8 text-gray-300">Observa el proceso detallado de restauración y el nivel de perfección que aplicamos.</p>
                 <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden border-4 border-[#F77F00]">
                    {/* NOTA: Reemplazar con video de servicios si existe, si no, mantener el actual */}
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/oAgP4klzRAM"
                        title="Proceso de Detailing"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </section>
    );
};

const LandingServicesList: React.FC = () => {
    // Aquí transformamos los "KitItems" en "Servicios"
    const services = [
        { 
            name: '1. Restauración de Farolas & Personalización', 
            content: "Recuperamos la transparencia eliminando opacidad y rayones. También personalizamos el estilo de tus luces al gusto (modificaciones visuales).",
            image: 'https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=02' 
        },
        { 
            name: '2. Detailing Exterior (Cerámico)', 
            content: "Proceso de 4 fases: Lavado pH neutro (2 cubetas), Descontaminación (Clay Bar & Iron Remover), Corrección de pintura (eliminación de rayones y hologramas) y Protección Cerámica (escudo hidrofóbico).",
            image: 'https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=03' 
        },
        { 
            name: '3. Detailing Interno Profundo', 
            content: "Desmontamos sillas y alfombras. Limpiamos ductos de aire, eliminamos olores, bacterias y manchas orgánicas. Tu interior queda desinfectado y como nuevo.",
            image: 'https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=04' 
        },
        { 
            name: '4. Tratamiento de Vidrios (Lluvia Ácida)', 
            content: "Eliminación de sarro, minerales incrustados y gotas secas con Clarity Wash & Vidrex. Restauramos la visibilidad cristalina.",
            image: 'https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=05' 
        },
        { 
            name: '🌟 5. Servicio GOLD Full Vehículo', 
            content: "La experiencia definitiva. Incluye TODOS los servicios anteriores en un solo paquete premium para una transformación total de tu automóvil.",
            image: 'https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=06' 
        }
    ];

    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">Nuestros Servicios Especializados</h2>
                <p className="text-center text-xl text-gray-600 mb-12">Utilizamos insumos profesionales y técnicas avanzadas para garantizar resultados de exhibición.</p>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.map((item, index) => (
                        <div key={index} className={`flex flex-col p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl ${index === 4 ? 'bg-gray-900 text-white lg:col-span-2 border-2 border-[#F77F00]' : 'bg-white text-gray-800'}`}>
                            <div className="flex flex-col md:flex-row items-start gap-4">
                                {/* Placeholder para imagen del servicio */}
                                <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="w-full md:w-2/3">
                                    <h3 className={`text-2xl font-bold mb-2 ${index === 4 ? 'text-[#F77F00]' : 'text-blue-700'}`}>{item.name}</h3>
                                    <p className={`${index === 4 ? 'text-gray-300' : 'text-gray-600'}`}>{item.content}</p>
                                    {index === 1 && (
                                        <div className="mt-3 text-sm italic opacity-80">
                                            *Incluye: Corte, Abrillantado y Sellador Sintético o Cerámico.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const faqServicesData = [
    { question: "¿En qué consiste el Detailing Exterior?", answer: "Es un proceso minucioso de 4 fases. 1) Lavado con técnica de dos cubetas y pH neutro. 2) Descontaminación física (Clay Bar) y química. 3) Corrección de pintura (pulido) para eliminar rayones y 'piel de naranja'. 4) Protección final con sellador cerámico o sintético que cura por 12-24 horas." },
    { question: "¿Qué incluye el lavado interno?", answer: "No es solo una aspirada. Desmontamos sillas, carteras y consolas para llegar a cada rincón. Eliminamos manchas de sudor, malos olores, insectos y desinfectamos ductos de ventilación. Tu auto queda higienizado y con olor a nuevo." },
    { question: "¿Pueden reparar mis farolas si están amarillas?", answer: "Sí. Realizamos una restauración completa lijando y puliendo el policarbonato para eliminar la capa quemada, y aplicamos protección UV. También hacemos personalizaciones (modding) si deseas cambiar la estética de tus luces." },
    { question: "¿Cuánto tiempo toma el Servicio GOLD?", answer: "Debido al nivel de detalle y los tiempos de curado de los recubrimientos (el vehículo no debe tocar agua por 12-24h), este servicio suele requerir que el vehículo permanezca en nuestras instalaciones de 1 a 2 días para garantizar la perfección." },
    { question: "¿Dónde están ubicados?", answer: "Nuestra fábrica principal está en Pereira, con sedes en Ibagué y Espinal, Tolima. Todos los trabajos pesados se realizan bajo ambiente controlado en nuestras instalaciones." },
];

const LandingSocialProofFAQ: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 px-4 bg-white">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Lo Que Dicen Nuestros Clientes</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                     {[
                         {name: "Carlos M.", city: "Pereira", quote: "Llevé mi camioneta para el Servicio Gold y no podía creerlo. Los rayones desaparecieron y el interior quedó impecable, como sacado del concesionario."},
                         {name: "Juliana R.", city: "Ibagué", quote: "Mis farolas estaban tan opacas que no alumbraban nada. En Nissi las dejaron transparentes y con un estilo personalizado increíble. ¡Recomendados!"},
                     ].map(testimonial => (
                        <div key={testimonial.name} className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100">
                            <div className="flex text-yellow-400 mb-2">{"★★★★★".split("").map((s,i) => <span key={i}>{s}</span>)}</div>
                            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-bold text-gray-800 text-right">- {testimonial.name} ({testimonial.city})</p>
                        </div>
                     ))}
                </div>
                
                <div className="p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-gray-50">
                    <div 
                        className="text-center cursor-pointer group"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl flex items-center gap-3">
                                Preguntas Frecuentes sobre Servicios
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
                                    ? "Resolvemos tus dudas sobre nuestros procesos de detallado y restauración."
                                    : "Haz clic aquí para ver las preguntas frecuentes sobre nuestros servicios especializados."
                                }
                            </p>
                        </div>
                    </div>

                    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="space-y-4">
                                {faqServicesData.map((item, index) => (
                                    <Accordion key={index} title={item.question}>
                                        <p className="text-gray-700 text-left leading-relaxed">{item.answer}</p>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};


// --- MAIN LANDING PAGE COMPONENT ---
const LandingPageServices: React.FC<{
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview: (id: string) => void;
  isAdmin: boolean;
}> = ({ reviews, onAddReview, onDeleteReview, isAdmin }) => {
    
    useEffect(() => {
        const originalTitle = document.title;
        const newTitle = "Spa Automotriz y Detailing Profesional - Nissi Car Home";
        document.title = newTitle;
        
        // Meta tags updates omitted for brevity but should be included by studio
        return () => { document.title = originalTitle; };
    }, []);

    return (
        <div className="bg-white font-sans">
            <LandingHero />
            <LandingVideo />
            {/* Renamed Component to reflect Services */}
            <LandingServicesList />
            <LandingSocialProofFAQ />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ReviewSection 
                    targetId="services" 
                    reviews={reviews} 
                    onAddReview={onAddReview} 
                    onDeleteReview={onDeleteReview} 
                    isAdmin={isAdmin} 
                />
            </div>
             <style>{`
                @keyframes fade-out {
                    0% { opacity: 1; transform: translateY(0) translateX(-50%); }
                    80% { opacity: 1; transform: translateY(0) translateX(-50%); }
                    100% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
                }
                .animate-fade-out {
                    animation: fade-out 2s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LandingPageServices;