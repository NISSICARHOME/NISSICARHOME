import React, { useState, useEffect } from 'react';
import Accordion from '../components/shared/Accordion';
import { CartItem } from '../types';

// --- HELPER COMPONENTS ---
const BenefitItem: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300">
    <div className="p-3 bg-amber-500 rounded-full text-black mb-4 shadow-glow">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{desc}</p>
  </div>
);

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center text-lg text-gray-800 mb-2">
    <svg className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <span>{children}</span>
  </li>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

// --- SECTIONS ---

const LandingHero: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
  const product: CartItem = { id: 'prod-hyper-diamond', name: "Cera Hyper Diamond con Carnauba", price: 65000, quantity: 1 };
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
    <section className="relative bg-black text-white py-16 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(245,158,11,0.3)_0%,rgba(0,0,0,1)_70%)] animate-spin-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 z-10">
           <div className="relative">
               <img 
                  src="https://lh3.googleusercontent.com/pw/AP1GczN-zXHr14d1RfpvNWQ9Zn6Y1vdjBlCgnsiDyT57kpTfA81-h5eZtRvzJmEPvxDcbGw5IBYvDqMEhlwuq7W6VpM7E-z3xtq6QOjAZN0tYTtQtIoGklEpD9Iufe8YT9ajvLN7jX8LUHoewgAhTKf64xRX=w1040-h800-s-no-gm?authuser=0" 
                  alt="Cera Hyper Diamond" 
                  className="w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -top-4 -right-4 bg-red-600 text-white font-bold py-2 px-4 rounded-full animate-bounce shadow-lg">
                    ¡NUEVA FÓRMULA!
                </div>
           </div>
        </div>
        
        <div className="w-full md:w-1/2 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">HYPER DIAMOND</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-200">
            Nanotecnología + Carnauba: El Blindaje Definitivo para tu Auto
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            No es solo cera, es un tratamiento de belleza. Obtén un brillo espejo profundo, repelencia al agua extrema y protección UV duradera en una sola aplicación.
          </p>
          
          <div className="flex flex-col items-center md:items-start mb-8">
            <span className="text-sm text-amber-400 uppercase font-bold tracking-widest mb-1">Precio de Lanzamiento</span>
            <span className="text-5xl font-bold text-white">$65.000 COP</span>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
             <button
              onClick={() => onBuyNow(product)}
              className="bg-amber-500 text-black font-bold text-lg py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] transition-all transform hover:-translate-y-1 active:scale-95"
            >
              COMPRAR AHORA ⚡
            </button>
             <button
              onClick={handleShare}
              className="p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              title="Compartir enlace"
            >
              <ShareIcon />
            </button>
            {copied && <span className="text-green-400 text-sm self-center animate-fade-in">¡Link Copiado!</span>}
          </div>
          <p className="mt-4 text-xs text-gray-500 flex items-center justify-center md:justify-start gap-2">
             <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
             Envío seguro a todo Colombia
          </p>
        </div>
      </div>
    </section>
  );
};

const LandingBenefits: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-black to-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-12">¿Por Qué Elegir Hyper Diamond?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <BenefitItem 
                        title="Nanotecnología" 
                        desc="Partículas microscópicas que rellenan los poros de la pintura, creando una superficie ultra lisa."
                        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>}
                    />
                    <BenefitItem 
                        title="Efecto Hidrofóbico" 
                        desc="Repele el agua y la suciedad al instante. Observa cómo las gotas resbalan sin dejar rastro."
                        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>}
                    />
                    <BenefitItem 
                        title="Brillo Profundo" 
                        desc="La Carnauba T1 de grado premium realza el color y otorga un acabado 'mojado' espectacular."
                        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>}
                    />
                    <BenefitItem 
                        title="Protección UV" 
                        desc="Actúa como un escudo solar, evitando que la pintura se queme, decolore o oxide."
                        icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
                    />
                </div>
            </div>
        </section>
    );
};

const LandingApplication: React.FC = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-5xl mx-auto">
                 <div className="flex flex-col md:flex-row items-center gap-12">
                     <div className="w-full md:w-1/2">
                         <img src="https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=0" alt="Aplicación Cera" className="rounded-xl shadow-2xl w-full" />
                     </div>
                     <div className="w-full md:w-1/2">
                         <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Aplicación Fácil, Resultados Profesionales</h2>
                         <p className="text-gray-600 mb-6">No necesitas máquinas costosas para lograr un acabado de exhibición. Nuestra fórmula está diseñada para ser fácil de aplicar y retirar.</p>
                         
                         <ul className="space-y-4">
                             <CheckListItem>Lava y seca muy bien el vehículo.</CheckListItem>
                             <CheckListItem>Aplica una capa fina de Hyper Diamond con un aplicador de espuma, panel por panel.</CheckListItem>
                             <CheckListItem>Espera 2-3 minutos a que cure (se ponga opaca).</CheckListItem>
                             <CheckListItem>Retira y brilla con una toalla de microfibra limpia y seca.</CheckListItem>
                         </ul>
                     </div>
                 </div>
            </div>
        </section>
    );
};

const faqData = [
    { question: "¿Cuánto dura el efecto?", answer: "Dependiendo de las condiciones climáticas y el cuidado en el lavado (usando Shampoo pH Neutro), la protección dura entre 3 y 6 meses." },
    { question: "¿Puedo usarla en cualquier color?", answer: "Sí, la Hyper Diamond es segura y efectiva en todos los colores de pintura, realzando tanto tonos claros como oscuros." },
    { question: "¿Necesito máquina pulidora?", answer: "No es necesario. Puedes aplicarla a mano y obtener resultados increíbles. Sin embargo, si tienes máquina, también es compatible para un acabado aún más rápido." },
    { question: "¿Qué incluye la compra?", answer: "Recibes 1 tarro de Cera Hyper Diamond de 220g, suficiente para más de 20 aplicaciones en un vehículo promedio." },
];

const LandingPageHyperDiamond: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
    const product: CartItem = { id: 'prod-hyper-diamond', name: "Cera Hyper Diamond", price: 65000, quantity: 1 };

    useEffect(() => {
        const originalTitle = document.title;
        document.title = "Cera Hyper Diamond - Brillo Extremo | Nissi Car Home";
        return () => { document.title = originalTitle; };
    }, []);

    return (
        <div className="bg-white font-sans">
            <LandingHero onBuyNow={onBuyNow} />
            <LandingBenefits />
            <LandingApplication />
            
            <section className="bg-gray-50 py-16 px-4">
                 <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <Accordion key={index} title={item.question}>
                                <p className="text-gray-700">{item.answer}</p>
                            </Accordion>
                        ))}
                    </div>
                 </div>
            </section>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 flex justify-between items-center shadow-[0_-5px_10px_rgba(0,0,0,0.1)]">
                <div>
                    <p className="text-xs text-gray-500">Solo por hoy</p>
                    <p className="text-xl font-bold text-gray-900">$65.000</p>
                </div>
                <button
                    onClick={() => onBuyNow(product)}
                    className="bg-amber-500 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-amber-400 transition-colors"
                >
                    COMPRAR
                </button>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-in-out;
                }
                .shadow-glow {
                    box-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
                }
            `}</style>
        </div>
    );
};

export default LandingPageHyperDiamond;