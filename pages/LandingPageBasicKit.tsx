import React, { useState, useEffect } from 'react';
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
  const basicKit: CartItem = {id: 'kit-1', name: "Kit Básico de Cuidado", price: 75000, quantity: 1};
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
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">Kit Básico de Cuidado: El Comienzo Perfecto</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">Te damos las herramientas esenciales para una limpieza profunda y una protección brillante. ¡Fácil de usar, con resultados que enamoran!</p>
       <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Precio Especial: $75.000 COP</p>

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
        { name: '1. Shampoo pH Neutro', content: "Lava tu auto de forma segura, eliminando la suciedad sin dañar la pintura ni los tratamientos de cera previos.", image: 'https://lh3.googleusercontent.com/pw/AP1GczOoQ2FzQzw_XT_wjt3OwSHwF7eKa7UU9JvuVHye01TYVTOIoC5souIqz7GOZ685LZ5qEnFVdveH7TvsX6erA6EkdHQex7x08fe1RCkUnVsRtQiMpv09PT3_TBP1aPYyV9K1FHhg54gjSjUFQUbdkB0i=w207-h560-s-no-gm?authuser=0' },
        { name: '2. Cera Hyper Diamond', content: "Aplica una capa de brillo intenso y protección duradera. Su efecto hidrofóbico repele el agua y mantiene tu auto limpio por más tiempo.", image: 'https://lh3.googleusercontent.com/pw/AP1GczN-zXHr14d1RfpvNWQ9Zn6Y1vdjBlCgnsiDyT57kpTfA81-h5eZtRvzJmEPvxDcbGw5IBYvDqMEhlwuq7W6VpM7E-z3xtq6QOjAZN0tYTtQtIoGklEpD9Iufe8YT9ajvLN7jX8LUHoewgAhTKf64xRX=w1040-h800-s-no-gm?authuser=0' },
        { name: '3. Aplicador Media Luna', content: "La herramienta ergonómica y segura para aplicar la cera de manera uniforme, logrando una cobertura perfecta sin esfuerzo.", image: 'https://lh3.googleusercontent.com/pw/AP1GczMQ4EUxiH3Ndfgs385HG6O8xSn6tRe-hKzmI2RX2bfziUZzV8TqTzEF66DO7c7FINzqGNj2Wx3_0o6NghBXnC8Dad4V81LJDDqU3n5vrv01KuPR8Lyn4jgayBDxS21B9l28P6ozJt6UZ2skGHKMhLkZ=w500-h717-s-no-gm?authuser=0' },
        { name: '4. Toalla de Microfibra', content: "Ultra suave y súper absorbente, es el complemento ideal para secar y pulir, garantizando un acabado final brillante y sin rayones.", image: 'https://lh3.googleusercontent.com/pw/AP1GczPn8Nx3WgdMKOguR8-_ISl7lyhdrJoWEWxaFuy3-po0uM7NAQAT4vSdBSj2LZkpNQ52hEvJ-Kgd3TG1WPCaaGklZSukEoquViMAuPeEImOPVd39drDoagydRag8yKyCAPh63Er63riRmEKFJLwZ_nv2=w354-h372-s-no-gm?authuser=0' },
    ];

    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">Todo lo Esencial en un Solo Paquete</h2>
                <p className="text-center text-xl text-gray-600 mb-12">Seleccionamos nuestros mejores productos para que empieces a cuidar tu auto como se merece.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {kitItems.map(item => (
                        <div key={item.name} className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
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

const faqBasicKitData = [
    { question: "¿Este kit es adecuado para principiantes?", answer: "¡Absolutamente! El Kit Básico está diseñado para ser el punto de partida perfecto. Incluye todo lo necesario con instrucciones claras para que cualquier persona pueda obtener resultados profesionales fácilmente." },
    { question: "¿Con qué frecuencia debo usar los productos del kit?", answer: "El Shampoo pH Neutro puedes usarlo para tus lavados regulares (cada 1 o 2 semanas). La Cera Hyper Diamond ofrece una protección que dura de 3 a 6 meses, por lo que solo necesitas aplicarla unas pocas veces al año para mantener tu auto protegido y brillante." },
    { question: "¿La cera es difícil de aplicar o puede dañar la pintura?", answer: "Para nada. Nuestros productos son seguros y muy fáciles de usar. La Cera Hyper Diamond se aplica y se retira de forma sencilla sin dejar residuos. Además, si tienes dudas, nuestro equipo de soporte está disponible por WhatsApp para guiarte." },
    { question: "¿Qué resultados puedo esperar de este kit?", answer: "Puedes esperar un vehículo notablemente más limpio, con una pintura suave al tacto, un brillo profundo y una protección que repele el agua y la suciedad, facilitando los futuros lavados." },
];

const LandingSocialProofFAQ: React.FC = () => (
    <section className="py-16 px-4 bg-gray-50">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Resultados que Hablan por Sí Mismos</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                 {[
                     {name: "Andrea P.", city: "Bogotá", quote: "Ideal para empezar en el mundo del detailing. No sabía nada y con este kit mi carro quedó espectacular. ¡Muy fácil de usar y los resultados son increíbles!"},
                     {name: "Felipe M.", city: "Pereira", quote: "La cera es de otro nivel. Deja un brillo muy profundo y el agua simplemente se desliza por la pintura. Una excelente compra, vale cada peso."},
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
                {faqBasicKitData.map((item, index) => (
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
