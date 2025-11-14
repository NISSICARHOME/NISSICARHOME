import React, { useState, useEffect, useRef, useCallback } from 'react';
import Accordion from '../components/shared/Accordion';
import { CartItem } from '../types';

// --- HELPER COMPONENTS ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg">
    <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{children}</span>
  </li>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);


// --- PAGE SECTIONS ---

const LandingHero: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
  const beautyKit: CartItem = {id: 'kit-2', name: "Kit de Embellecimiento Profesional 6 en 1", price: 125000, quantity: 1};
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
    <section id="oferta-embellecimiento" className="bg-white py-12 px-4 text-center">
      <div className="w-full max-w-2xl mx-auto mb-8">
          <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczPOSFnFflE6hcsTtHPybBLPUfECVYU5rzmbCHYRlWK8KomBZvI4N_SVy_knMkpVVRf7lUQ7jdtf3I1thYkuVCyIlqyy1n1Ws34eahtILybAJVbqxTBWECpEFzjcbt8co6QbWA-7F9lKGZmXw26CK57k=w777-h798-s-no-gm?authuser=0"
              alt="Kit de Embellecimiento Profesional 6 en 1" 
              className="w-full h-auto" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">Kit de Embellecimiento Profesional 6 en 1</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">Todo lo que necesitas para restaurar, proteger y brillar tu vehículo como un profesional. ¡Resultados garantizados que deslumbran y duran!</p>

      <div className="max-w-md mx-auto flex items-center justify-center gap-4">
        <button
          onClick={() => onBuyNow(beautyKit)}
          className="flex-grow bg-amber-500 text-white font-bold text-xl md:text-2xl py-4 px-6 rounded-lg shadow-lg hover:bg-amber-600 transition-all transform hover:scale-105 animate-pulse"
        >
          ¡LO QUIERO AHORA!
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
      <p className="mt-4 text-sm text-gray-500">Paga al recibir en la puerta de tu casa. ¡Envío gratis a toda Colombia!</p>
    </section>
  );
};

const LandingShowcase: React.FC = () => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setOffsetY(window.scrollY * 0.2);
      }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative h-[60vh] md:h-[80vh] flex flex-col items-center justify-center text-white text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://lh3.googleusercontent.com/pw/AP1GczMRCg5IJKtk0Nsk4b0AmCpXgVJpOVau_j0unuT34A-ERi-VlNEM3dlql6qUOX1pO5XmmetvFX4K-iDa856iwZ758OQknG71I8TYGVqtMFeksWj6FGuoQNLwejhN_-aa3K9oC74pvfb3pbibxZfKvAz1=w991-h991-s-no-gm?authuser=0"
                    alt="Vehículo detallado profesionalmente"
                    className="absolute top-0 left-0 w-full min-h-[120vh] object-cover"
                    style={{ transform: `translateY(${offsetY}px)` }}
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="relative z-10 p-8 max-w-4xl mx-auto bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Un Acabado Que Habla Por Sí Mismo</h2>
                <p className="text-lg md:text-xl">Observa la transformación y el nivel de detalle que puedes lograr.</p>
            </div>
        </section>
    );
}


const LandingWhatYouGet: React.FC = () => {
    const kitItems = [
        { name: '1. Hyper Diamond', content: "Cera con Carnauba y polímeros para brillar, proteger y 'diamantizar' la pintura. Crea una capa hidrofóbica que dura de 3 a 6 meses.", image: 'https://lh3.googleusercontent.com/pw/AP1GczP57aUodBhc7K7ZflHRVRKqTB9ExPi8JVngHqqJThksSH8zT7LTQD8k80pq435B6J5MRwOVBbN-ASnyjIuIrPzH8aDo2E2I4IRVI-EETt1Annaav3xd5c2Meneiq7_NR7oJSfqjTqTXWOuMzcfEQ0Xz=w193-h702-s-no-gm?authuser=0' },
        { name: '2. Ultra Restorer', content: "Restaura plásticos, caucho y cuero de cualquier color. Hidrata, devuelve el color y protege contra el sol y la lluvia con un potente efecto hidrofóbico.", image: 'https://lh3.googleusercontent.com/pw/AP1GczNzWe3SNPTGDhI1ITWJrY9XcI0YEzB5ibmX0yBwQZ5VGA_IE70mUL8Up595CNMsW5W4sB88HP8NdhYSB6yiFEJBJHD_EnmFC9xa6SNvRaS8LOD7loiX8V4W4uRZ8PfVY-opmLWTv6Gbn8nNjreGDGOK=w167-h659-s-no-gm?authuser=0' },
        { name: '3. Perfect Llantix', content: "Hidrata profundamente las llantas, dándoles una apariencia nueva y brillante. Evita el desgaste y cuarteamiento. Duración de 15 a 20 días. (250ml)", image: 'https://lh3.googleusercontent.com/pw/AP1GczOjiJJeZc6HIutbfWKJGXISSyYp6uFOXne3E4Bxw8mZijJQzpOBRpjiyvtjQi4tw0SZ2Bg6aT5bjQ559BIZ4UO1DXvcZMjqXGHDQaAsGvyDdphGMwjNdb8QM0AKlue18DUnkhu6IjMw6Z9q3H5BVFW0=w1080-h800-s-no-gm?authuser=0' },
        { name: '4. Shampoo pH Neutro', content: "Lava la carrocería sin dañar la pintura. Su fórmula multiusos también quita manchas de la cojinería y el techo, y deja una capa que repele el polvo.", image: 'https://lh3.googleusercontent.com/pw/AP1GczOoQ2FzQzw_XT_wjt3OwSHwF7eKa7UU9JvuVHye01TYVTOIoC5souIqz7GOZ685LZ5qEnFVdveH7TvsX6erA6EkdHQex7x08fe1RCkUnVsRtQiMpv09PT3_TBP1aPYyV9K1FHhg54gjSjUFQUbdkB0i=w207-h560-s-no-gm?authuser=0' },
        { name: '5. Aplicadores de Espuma (x2)', content: "GRATIS. Espuma blanda diseñada para esparcir los productos de manera uniforme y segura, sin rayar ninguna superficie.", image: 'https://lh3.googleusercontent.com/pw/AP1GczPnlvdqEOaMSPmluNpiZJ6bire1z001a4V6bNTg-wbKKZXj2BcDJrB5f5lkJ9P_ra2V8xL8NMzxMkV6ag09MMTv29CtAQoLoG3DtutAXc1u8HtnRzXrtEOAZH963OstZ-5lrSuTj2GkCVmFwyaX61sw=w466-h366-s-no-gm?authuser=0' },
        { name: '6. Toalla de Microfibra Profesional', content: "GRATIS. Toalla (80% algodón, 20% poliéster) ultra suave para dar el acabado final y lograr un brillo deslumbrante.", image: 'https://lh3.googleusercontent.com/pw/AP1GczPFl5r7A_X0sLUaQeHpmlYuOMSd699hRkGR1yjovzriJaTjm0ioFvft9aa_vEFi4lDLbddyEXrtF9Fab_X1c_pu0tvLBgD-oSHnmQXGYv3fLSNPBpxgDZ1mNPliGakCFXNFbuC0D1gtqrLnYxsShp2T=w748-h404-s-no-gm?authuser=0' }
    ];

    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">Un Arsenal Completo Para un Detallado de Lujo</h2>
                <p className="text-center text-xl text-gray-600 mb-12">Cada fórmula ha sido diseñada para un propósito específico, garantizando resultados superiores.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {kitItems.map(item => (
                        <div key={item.name} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <img src={item.image} alt={item.name} className="h-40 object-contain mb-4" />
                            <h3 className="text-xl font-bold text-amber-600 flex-grow">{item.name}</h3>
                            <p className="text-gray-700">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LandingVideo: React.FC = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">Míralo en Acción</h2>
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


const faqBeautyKitData = [
    { question: "¿Qué productos incluye el nuevo Kit de Embellecimiento Profesional?", answer: "El kit incluye 6 componentes: Cera Hyper Diamond, Ultra Restorer de plásticos, Perfect Llantix, Shampoo pH Neutro, y como obsequio, dos aplicadores de espuma y una toalla de microfibra profesional." },
    { question: "¿Cuánto dura la protección de la cera Hyper Diamond?", answer: "Gracias a su fórmula con Carnauba y polímeros, la protección hidrofóbica (que repele el agua) y el brillo pueden durar entre 3 y 6 meses, dependiendo de las condiciones de uso y clima." },
    { question: "El Ultra Restorer, ¿sirve para plásticos de colores o solo negros?", answer: "Sirve para cualquier color de plástico, caucho, cuero o cuero sintético. Su función es hidratar y devolver el color original, por lo que es efectivo en una amplia gama de superficies." },
    { question: "¿El Shampoo es solo para la carrocería?", answer: "No, es un producto multiusos. Su principal función es lavar la carrocería de forma segura gracias a su pH neutro, pero también es muy eficaz para quitar manchas en la cojinería y el techo del vehículo." },
    { question: "Los aplicadores y la toalla, ¿son de buena calidad?", answer: "Absolutamente. Son herramientas de grado profesional. Las espumas están diseñadas para no rayar y aplicar el producto de forma uniforme, y la toalla de microfibra tiene la suavidad y composición ideal (80% algodón, 20% poliéster) para un acabado perfecto." },
];

const LandingSocialProofFAQ: React.FC = () => (
    <section className="py-16 px-4 bg-gray-50">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Clientes Felices, Autos Impecables</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                 {[
                     {name: "Juan David G.", city: "Pereira", quote: "¡Mi carro parece otro! La cera le dio un brillo increíble y el restaurador de plásticos es simplemente mágico. Volvió negras unas partes que llevaban años grises."},
                     {name: "Sofia L.", city: "Cali", quote: "Excelente relación calidad-precio. Con este kit tengo todo lo que necesito para dejar mi camioneta como nueva el fin de semana. ¡Y el envío fue rapidísimo!"},
                     {name: "Miguel Ángel R.", city: "Medellín", quote: "Compré el kit sin muchas expectativas y me sorprendió. Los productos son muy fáciles de usar y los resultados son de nivel profesional. Lo recomiendo totalmente."},
                     {name: "Carolina V.", city: "Bogotá", quote: "Me encantó el detalle de los aplicadores y la toalla. Se nota que piensan en todo. El shampoo quita las manchas de la cojinería súper fácil."},
                 ].map(testimonial => (
                    <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex text-yellow-400 mb-2">{"★★★★★".split("").map((s,i) => <span key={i}>{s}</span>)}</div>
                        <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                        <p className="font-bold text-gray-800 text-right">- {testimonial.name} ({testimonial.city})</p>
                    </div>
                 ))}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Resolvemos tus Dudas</h2>
             <div className="space-y-4">
                {faqBeautyKitData.map((item, index) => (
                  <Accordion key={index} title={item.question}>
                    <p className="text-gray-700">{item.answer}</p>
                  </Accordion>
                ))}
             </div>
         </div>
    </section>
);


// --- MAIN LANDING PAGE COMPONENT ---
interface LandingPageProps {
  onBuyNow: (item: CartItem) => void;
}

const LandingPageBeautyKit: React.FC<LandingPageProps> = ({ onBuyNow }) => {
    
    useEffect(() => {
        const originalTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

        const newTitle = "Kit de Embellecimiento Profesional 6 en 1 - Nissi Car Home";
        const newDescription = "Todo lo que necesitas para restaurar, proteger y brillar tu vehículo como un profesional. ¡Resultados garantizados que deslumbran y duran!";
        const imageUrl = "https://lh3.googleusercontent.com/pw/AP1GczNSs4K4z7Muf8CJ8r97YPPxwdEt8v18SCeNjavCHFsFjRv4GxDJPB88me-dpcdn41MVMQm6AfXaKDAwyuJc5CMvz9IRl4FPDycp4k-zhkGv3CRm_W3SneIByCt3P07khKMOipuWliIdl-GXeovuPKxm=w991-h991-s-no-gm?authuser=0";

        document.title = newTitle;
        if (metaDescription) {
            metaDescription.setAttribute('content', newDescription);
        }

        const tagsToSet = {
            'og:title': newTitle,
            'og:description': newDescription,
            'og:image': imageUrl,
            'og:url': window.location.href,
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
            <LandingShowcase />
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
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default LandingPageBeautyKit;