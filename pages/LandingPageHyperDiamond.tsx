
import React, { useState, useEffect } from 'react';
import Accordion from '../components/shared/Accordion';
import { CartItem } from '../types';

// --- HELPER COMPONENTS ---
const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group">
    <div className="p-4 bg-white border border-gray-100 rounded-full text-amber-500 mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed text-justify hyphens-auto break-words">{desc}</p>
  </div>
);

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg text-gray-700 mb-3">
    <svg className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <span>{children}</span>
  </li>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

// --- PAGE SECTIONS ---

const LandingHero: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
  const product: CartItem = { id: 'prod-hyper-diamond', name: "Cera Hyper Diamond con Blindaje", price: 65000, quantity: 1 };
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
    <section id="oferta-blindaje" className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
       {/* Abstract Background */}
      <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(245,158,11,0.4)_0%,rgba(0,0,0,0)_70%)]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 z-10 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-sm font-bold tracking-wide mb-4">
            NUEVA TECNOLOGÍA DE BLINDAJE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-center md:text-center">
            Cera Hyper Diamond: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">Protección Total</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl text-justify hyphens-auto break-words mx-auto md:mx-0">
            La evolución del encerado. Recubre, sella y protege la pintura de tu vehículo con tecnología hidrofóbica de alto brillo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={() => onBuyNow(product)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xl py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 transition-all duration-300 animate-pulse-slow"
            >
              ¡BLINDA TU AUTO AHORA!
            </button>
            <div className="relative group">
                <button
                  onClick={handleShare}
                  className="p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white"
                  aria-label="Compartir"
                >
                  <ShareIcon />
                </button>
                 {copied && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-green-500 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Copiado!
                  </div>
                )}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg> Envío Gratis</span>
              <span className="flex items-center gap-1"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg> Pago Contra Entrega</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 z-10 flex justify-center">
            <div className="relative w-full max-w-md">
                 <div className="absolute inset-0 bg-amber-500 rounded-full blur-[80px] opacity-20 animate-pulse-slow"></div>
                 <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczN-zXHr14d1RfpvNWQ9Zn6Y1vdjBlCgnsiDyT57kpTfA81-h5eZtRvzJmEPvxDcbGw5IBYvDqMEhlwuq7W6VpM7E-z3xtq6QOjAZN0tYTtQtIoGklEpD9Iufe8YT9ajvLN7jX8LUHoewgAhTKf64xRX=w1040-h800-s-no-gm?authuser=0" 
                    alt="Cera Hyper Diamond con Blindaje" 
                    className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                />
            </div>
        </div>
      </div>
    </section>
  );
};

const LandingFeatures: React.FC = () => {
    const features = [
      { 
          name: 'Blindaje Cerámico', 
          content: "Crea una barrera resistente contra los rayos UV, la lluvia ácida y el polvo, evitando que la pintura se queme o desgaste.", 
          icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      },
      { 
          name: 'Efecto Hidrofóbico', 
          content: "Repelencia inmediata al agua. Observa cómo las gotas resbalan sin tocar la superficie, manteniendo el carro limpio por más tiempo.", 
          icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
      },
      { 
          name: 'Brillo Espejo 3D', 
          content: "Gracias a la Carnauba T1 y polímeros sintéticos, otorga una profundidad de color y un brillo que parece mojado.", 
          icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
      },
      { 
          name: 'Sellado de Poros', 
          content: "Rellena las micro-imperfecciones de la laca, dejando la superficie suave al tacto como la seda.", 
          icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
      },
      { 
          name: 'Durabilidad Extendida', 
          content: "A diferencia de las ceras tradicionales, la protección de Hyper Diamond resiste múltiples lavados (3 a 6 meses).", 
          icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      },
      { 
          name: 'Fácil Aplicación', 
          content: "Fórmula diseñada para no dejar residuos blancos ni manchas. Se aplica y retira con extrema facilidad.", 
          icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
      }
    ];

    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Los 6 Beneficios del Poder Diamond</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Cada característica ha sido diseñada para brindarte la máxima protección y un acabado inigualable.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((item, index) => (
                        <FeatureCard key={index} title={item.name} desc={item.content} icon={item.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const LandingVideo: React.FC = () => {
    return (
        <section className="bg-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8">Míralo en Acción</h2>
                 <div className="aspect-video w-full rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-500/50">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/vk3W73Pnan0?si=A6kWy7eGKIG4yxHa" 
                        title="Hyper Diamond en Acción"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
                <p className="text-gray-400 mt-6 italic">Descubre cómo aplicarlo y el resultado final en segundos.</p>
            </div>
        </section>
    );
};


const LandingSocialProofFAQ: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const faqData = [
        { question: "¿Qué significa que tiene blindaje?", answer: "Significa que crea una capa de sacrificio sobre la laca original, recibiendo el impacto del sol y la contaminación para que tu pintura permanezca intacta." },
        { question: "¿Cuánto dura el efecto?", answer: "En condiciones normales de lavado y exposición, la protección y repelencia duran entre 3 y 6 meses." },
        { question: "¿Sirve para cualquier color?", answer: "Sí, la tecnología Hyper Diamond resalta y protege cualquier color, desde negros profundos hasta blancos perlados y colores metalizados." },
    ];

    return (
    <section className="py-16 px-4 bg-gray-50">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">Clientes Felices, Autos Impecables</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                 {[
                     {name: "Carlos M.", city: "Bogotá", quote: "Nunca había visto el agua correr así sobre el capó. El efecto de blindaje es real."},
                     {name: "Jorge L.", city: "Pereira", quote: "El brillo es impresionante, parece recién salido del concesionario. Muy fácil de aplicar."},
                     {name: "Andrea R.", city: "Medellín", quote: "Llevo 2 meses con la cera aplicada y sigue repeliendo el polvo. Excelente producto de Nissi."},
                 ].map((testimonial, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex text-amber-400 mb-3 text-lg justify-center">★★★★★</div>
                        <p className="text-gray-700 italic mb-4 text-sm text-justify hyphens-auto break-words">"{testimonial.quote}"</p>
                        <p className="font-bold text-gray-900 text-right text-sm">- {testimonial.name}, {testimonial.city}</p>
                    </div>
                 ))}
            </div>
            
            <div className="max-w-3xl mx-auto p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-white">
                <div 
                    className="text-center cursor-pointer group"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl flex items-center gap-3">
                            Resolvemos tus Dudas
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
                                ? "Resolvemos tus dudas sobre la Cera Hyper Diamond y su tecnología de blindaje."
                                : "Haz clic aquí para ver las preguntas frecuentes sobre Hyper Diamond."
                            }
                        </p>
                    </div>
                </div>

                <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="space-y-4">
                            {faqData.map((item, index) => (
                            <Accordion key={index} title={item.question}>
                                <p className="text-gray-700 text-justify hyphens-auto break-words">{item.answer}</p>
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

interface LandingPageProps {
  onBuyNow: (item: CartItem) => void;
}

const LandingPageHyperDiamond: React.FC<LandingPageProps> = ({ onBuyNow }) => {
    
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "Cera Hyper Diamond con Blindaje - Nissi Car Home";
        window.scrollTo(0, 0);
        return () => { document.title = originalTitle; };
    }, []);

    return (
        <div className="bg-white font-sans min-h-screen">
            <LandingHero onBuyNow={onBuyNow} />
            <LandingFeatures />
            <LandingVideo />
            <LandingSocialProofFAQ />
            
            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 p-4 md:hidden z-50 flex justify-between items-center shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
                <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Precio Especial</p>
                    <p className="text-xl font-extrabold text-gray-900">$65.000</p>
                </div>
                <button
                    onClick={() => onBuyNow({ id: 'prod-hyper-diamond', name: "Cera Hyper Diamond con Blindaje", price: 65000, quantity: 1 })}
                    className="bg-amber-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-amber-600 transition-colors animate-pulse-slow"
                >
                    COMPRAR AHORA
                </button>
            </div>

             <style>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default LandingPageHyperDiamond;
