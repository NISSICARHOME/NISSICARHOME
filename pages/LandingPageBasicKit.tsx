import React, { useState, useEffect, useRef, useCallback } from 'react';
import Accordion from '../components/shared/Accordion';
import { CartItem } from '../types';

// --- HELPER COMPONENTS ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg mb-3">
    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

const LandingHero: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
  const basicKit: CartItem = {id: 'kit-1', name: "Kit Básico de Cuidado", price: 95000, quantity: 1};
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
    <section id="oferta-basico" className="bg-white py-12 px-4 text-center">
      <div className="w-full max-w-2xl mx-auto mb-8">
          <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczOzc5XobmAERtALiliyk1JbpWK9TtlNYR-Gq8ho_9NrxGyhRPsDqNM-pw--dmicYoJ0_81bX_O_lzOKpZgscWtppJojH71Pg6PkQH4o-KcNy9eQKQ5Tb0jyUd6yAN_E_fQAB2JsWaoh-N5LdH_xss1_=w801-h584-s-no-gm?authuser=0"
              alt="Kit Básico de Cuidado Nissi Car Home" 
              className="w-full h-auto" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">Kit Básico de Cuidado: El Comienzo Perfecto</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-justify hyphens-auto break-words">Te damos las herramientas esenciales para una limpieza profunda y una protección brillante. ¡Fácil de usar, con resultados que enamoran!</p>
       <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Precio Especial: $95.000 COP</p>

      <div className="max-w-md mx-auto flex items-center justify-center gap-4">
        <button
          onClick={() => onBuyNow(basicKit)}
          className="flex-grow bg-[#FFC107] text-gray-800 font-bold text-xl md:text-2xl py-4 px-6 rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:scale-105 animate-pulse"
        >
          ¡COMPRAR KIT BÁSICO!
        </button>
        <div className="relative">
             <button
              onClick={handleShare}
              title="Compartir enlace"
              className="p-4 bg-gray-200/50 rounded-full hover:bg-gray-200/80 transition-colors"
            >
              <ShareIcon />
            </button>
            {copied && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap animate-fade-out">
                ¡Enlace copiado!
              </div>
            )}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">Paga al recibir en la puerta de tu casa. ¡Envío rápido y seguro!</p>
    </section>
  );
};

const LandingVideo: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">Simple, Rápido y Eficaz: Mira Cómo Funciona</h2>
                 <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden border-4 border-gray-200">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/vk3W73Pnan0?si=A6kWy7eGKIG4yxHa"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </section>
    );
};

const LandingWhatYouGet: React.FC = () => {
    const kitItems = [
        "1 Cera Hyper Diamond",
        "1 Ultra Restorer",
        "1 Perfect Llantix",
        "¡GRATIS! 2 Aplicadores de Espuma",
        "¡GRATIS! 1 Toalla de Microfibra Profesional",
    ];

    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">¿Qué Contiene tu Kit Básico de Cuidado?</h2>
                <p className="text-center text-xl text-gray-600 mb-12 text-justify hyphens-auto break-words">Un arsenal completo con nuestros productos estrella para que obtengas resultados de nivel profesional.</p>
                <div className="bg-gray-50 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <ul className="space-y-4">
                        {kitItems.map((item, index) => (
                             <CheckListItem key={index}>
                                <strong>{item}</strong>
                            </CheckListItem>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const faqBasicKitData = [
    { question: "¿Este kit es adecuado para principiantes?", answer: "¡Absolutamente! El Kit Básico está diseñado para ser el punto de partida perfecto. Incluye todo lo necesario con instrucciones claras para que cualquier persona pueda obtener resultados profesionales fácilmente." },
    { question: "¿Con qué frecuencia debo usar los productos del kit?", answer: "El Shampoo pH Neutro puedes usarlo para tus lavados regulares (cada 1 o 2 semanas). La Cera Hyper Diamond ofrece una protección que dura de 3 a 6 meses, por lo que solo necesitas aplicarla unas pocas veces al año para mantener tu auto protegido y brillante." },
    { question: "¿La cera es difícil de aplicar o puede dañar la pintura?", answer: "Para nada. Nuestros productos son seguros y muy fáciles de usar. La Cera Hyper Diamond se aplica y se retira de forma sencilla sin dejar residuos. Además, si tienes dudas, nuestro equipo de soporte está disponible por WhatsApp para guiarte." },
    { question: "¿Qué resultados puedo esperar de este kit?", answer: "Puedes esperar un vehículo notablemente más limpio, con una pintura suave al tacto, un brillo profundo y una protección que repele el agua y la suciedad, facilitando los futuros lavados." },
];

const LandingSocialProofFAQ: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 px-4 bg-gray-50">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Resultados que Hablan por Sí Mismos</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                     {[
                         {name: "Andrea P.", city: "Bogotá", quote: "Ideal para empezar en el mundo del detailing. No sabía nada y con este kit mi carro quedó espectacular. ¡Muy fácil de usar y los resultados son increíbles!"},
                         {name: "Felipe M.", city: "Pereira", quote: "La cera es de otro nivel. Deja un brillo muy profundo y el agua simplemente se desliza por la pintura. Una excelente compra, vale cada peso."},
                     ].map(testimonial => (
                        <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex text-yellow-400 mb-2 justify-center">{"★★★★★".split("").map((s,i) => <span key={i}>{s}</span>)}</div>
                            <p className="text-gray-600 italic mb-4 text-justify hyphens-auto break-words">"{testimonial.quote}"</p>
                            <p className="font-bold text-gray-800 text-right">- {testimonial.name} ({testimonial.city})</p>
                        </div>
                     ))}
                </div>
                
                <div className="p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-white">
                    <div 
                        className="text-center cursor-pointer group"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl flex items-center gap-3">
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
                                    ? "Resolvemos tus dudas sobre el Kit Básico y su aplicación."
                                    : "Haz clic aquí para ver las preguntas frecuentes sobre el Kit Básico de Cuidado."
                                }
                            </p>
                        </div>
                    </div>

                    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="space-y-4">
                                {faqBasicKitData.map((item, index) => (
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

const LandingPageBasicKit: React.FC<LandingPageProps> = ({ onBuyNow }) => {
    
    useEffect(() => {
        const originalTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

        const newTitle = "Kit Básico de Cuidado - Nissi Car Home";
        const newDescription = "El kit esencial para lavar, proteger y brillar tu vehículo. Incluye shampoo, cera profesional, y accesorios. ¡Resultados garantizados!";
        const imageUrl = "https://lh3.googleusercontent.com/pw/AP1GczOzc5XobmAERtALiliyk1JbpWK9TtlNYR-Gq8ho_9NrxGyhRPsDqNM-pw--dmicYoJ0_81bX_O_lzOKpZgscWtppJojH71Pg6PkQH4o-KcNy9eQKQ5Tb0jyUd6yAN_E_fQAB2JsWaoh-N5LdH_xss1_=w801-h584-s-no-gm?authuser=0";

        document.title = newTitle;
        if (metaDescription) {
            metaDescription.setAttribute('content', newDescription);
        }

        const tagsToSet = {
            'og:title': newTitle,
            'og:description': newDescription,
            'og:image': imageUrl,
            'og:url': 'https://nissicarhome.netlify.app/#/kit-basico-cuidado',
            'twitter:card': 'summary_large_image',
        };

        const addedTags: HTMLElement[] = [];

        Object.entries(tagsToSet).forEach(([property, content]) => {
            const tag = document.createElement('meta');
            tag.setAttribute('property', property);
            tag.setAttribute('content', content);
            document.head.appendChild(tag);
            addedTags.push(tag);
        });

        return () => {
            document.title = originalTitle;
            if (metaDescription && originalDescription) {
                metaDescription.setAttribute('content', originalDescription);
            }
            addedTags.forEach(tag => document.head.removeChild(tag));
        };
    }, []);

    return (
        <div className="bg-white">
            <LandingHero onBuyNow={onBuyNow} />
            <LandingVideo />
            <LandingWhatYouGet />
            <LandingSocialProofFAQ />
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

export default LandingPageBasicKit;
