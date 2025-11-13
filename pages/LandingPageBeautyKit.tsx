import React, { useState } from 'react';
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
  const beautyKit: CartItem = {id: 'kit-2', name: "Kit de Embellecimiento para tu Vehículo", price: 125000, quantity: 1};
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
              src="https://lh3.googleusercontent.com/pw/AP1GczMY47G5C1QfpxseWKtafJTKBxtMW7FzwcLr1hkzefpVRIWH9g45SMv9L9gc1bfIlS0JR4k2Jd7wBEX03hN7BmRHjFjjwreFEr0CHDpxV62-Fbd84Hth8LkrXy_gdHHSx3fo88RnFQDficvQM5jnsNEz=w620-h424-s-no-gm?authuser=0"
              alt="Kit de Embellecimiento para tu Vehículo" 
              className="w-full h-auto rounded-lg shadow-xl" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">El Secreto de un Auto que Deslumbra</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">Brillo, Protección y Renovación en un solo Kit. Dale a tu vehículo el tratamiento profesional que merece y haz que luzca como nuevo, ¡fácilmente y en casa!</p>

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

const LandingWhatYouGet: React.FC = () => {
    const kitItems = [
        { name: '1 Cera Hyper Diamond', content: '(220 gr) Con Carnauba y nanotecnología para un brillo profundo y protección duradera contra el sol y la lluvia.', image: 'https://lh3.googleusercontent.com/pw/AP1GczN-zXHr14d1RfpvNWQ9Zn6Y1vdjBlCgnsiDyT57kpTfA81-h5eZtRvzJmEPvxDcbGw5IBYvDqMEhlwuq7W6VpM7E-z3xtq6QOjAZN0tYTtQtIoGklEpD9Iufe8YT9ajvLN7jX8LUHoewgAhTKf64xRX=w1040-h800-s-no-gm?authuser=0' },
        { name: '1 Brillo Protector Perfect Llantix', content: '(250 ml) No solo da un acabado negro intenso y brillante a tus llantas, sino que las hidrata y protege del agrietamiento.', image: 'https://lh3.googleusercontent.com/pw/AP1GczOjiJJeZc6HIutbfWKJGXISSyYp6uFOXne3E4Bxw8mZijJQzpOBRpjiyvtjQi4tw0SZ2Bg6aT5bjQ559BIZ4UO1DXvcZMjqXGHDQaAsGvyDdphGMwjNdb8QM0AKlue18DUnkhu6IjMw6Z9q3H5BVFW0=w1080-h800-s-no-gm?authuser=0' },
        { name: '1 Ultra Restorer de Partes Negras', content: '(120 ml) ¡OBSEQUIO ESPECIAL! Devuelve la vida y el color original a los plásticos y vinilos exteriores quemados por el sol.', image: 'https://lh3.googleusercontent.com/pw/AP1GczN4wvAxjKsz_jeB8jpHUVAbL7aeEqGSpXjqjbWbyapjHRzrU54da2aT8lFBEtDIvAfP4Hj7TL8MMkdNivvoS5L0M6CzftY_g8nwRtX6fPBm6arqinMCSNrYQQcWxiAkCKR5zD60S_HNhq7iCLfBNumL=w1080-h800-s-no-gm?authuser=0' },
        { name: '2 Aplicadores de Espuma', content: 'GRATIS. La herramienta perfecta para aplicar la cera y el restaurador de manera uniforme y sin desperdiciar producto.', image: 'https://lh3.googleusercontent.com/pw/AP1GczMQ4EUxiH3Ndfgs385HG6O8xSn6tRe-hKzmI2RX2bfziUZzV8TqTzEF66DO7c7FINzqGNj2Wx3_0o6NghBXnC8Dad4V81LJDDqU3n5vrv01KuPR8Lyn4jgayBDxS21B9l28P6ozJt6UZ2skGHKMhLkZ=w500-h717-s-no-gm?authuser=0' }
    ];

    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">Todo lo que Recibes para Transformar tu Vehículo</h2>
                <p className="text-center text-xl text-gray-600 mb-12">Un arsenal completo para detallado profesional por un precio increíble: <strong>$125.000 COP</strong></p>
                <div className="grid md:grid-cols-2 gap-8">
                    {kitItems.map(item => (
                        <div key={item.name} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-amber-600">{item.name}</h3>
                                <p className="text-gray-700">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LandingHowToApply: React.FC = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Resultados Profesionales en 3 Simples Pasos</h2>
                 <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
                    {[
                        {num: 1, title: 'RESTAURA Y PROTEGE PLÁSTICOS', product: 'Ultra Restorer', desc: 'Con la superficie limpia y seca, aplica el restaurador con una espuma sobre las partes negras o grises. Verás cómo recuperan su color al instante.', img: 'https://lh3.googleusercontent.com/pw/AP1GczN4wvAxjKsz_jeB8jpHUVAbL7aeEqGSpXjqjbWbyapjHRzrU54da2aT8lFBEtDIvAfP4Hj7TL8MMkdNivvoS5L0M6CzftY_g8nwRtX6fPBm6arqinMCSNrYQQcWxiAkCKR5zD60S_HNhq7iCLfBNumL=w1080-h800-s-no-gm?authuser=0'},
                        {num: 2, title: 'APLICA LA CERA Y SACA BRILLO', product: 'Cera Hyper Diamond', desc: 'Esparce una capa fina de cera sobre la pintura con el aplicador. Déjala secar unos minutos hasta que se vea opaca y luego retírala con una toalla de microfibra limpia para revelar un brillo espectacular.', img: 'https://lh3.googleusercontent.com/pw/AP1GczN-zXHr14d1RfpvNWQ9Zn6Y1vdjBlCgnsiDyT57kpTfA81-h5eZtRvzJmEPvxDcbGw5IBYvDqMEhlwuq7W6VpM7E-z3xtq6QOjAZN0tYTtQtIoGklEpD9Iufe8YT9ajvLN7jX8LUHoewgAhTKf64xRX=w1040-h800-s-no-gm?authuser=0'},
                        {num: 3, title: 'ACABADO PERFECTO EN LLANTAS', product: 'Perfect Llantix', desc: 'Asegúrate de que las llantas estén limpias. Aplica Llantix con una espuma para un acabado negro, brillante y protegido que dura por días.', img: 'https://lh3.googleusercontent.com/pw/AP1GczOjiJJeZc6HIutbfWKJGXISSyYp6uFOXne3E4Bxw8mZijJQzpOBRpjiyvtjQi4tw0SZ2Bg6aT5bjQ559BIZ4UO1DXvcZMjqXGHDQaAsGvyDdphGMwjNdb8QM0AKlue18DUnkhu6IjMw6Z9q3H5BVFW0=w1080-h800-s-no-gm?authuser=0'},
                    ].map(step => (
                         <div key={step.num} className="text-center p-4 border rounded-lg shadow-sm">
                             <div className="relative mb-4 h-56 flex items-center justify-center">
                                <img src={step.img} alt={step.title} className="max-h-full max-w-full object-contain"/>
                                <div className="absolute top-0 left-0 bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">{step.num}</div>
                             </div>
                             <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                             <p className="text-gray-500 font-semibold mb-2">{step.product}</p>
                             <p className="text-gray-600">{step.desc}</p>
                         </div>
                    ))}
                 </div>
                 <div className="text-center mt-12">
                     <a href="#oferta-embellecimiento" className="inline-block bg-green-600 text-white font-bold text-xl py-4 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105">
                        ¡Sí, Quiero Mi Kit Ahora!
                    </a>
                 </div>
            </div>
        </section>
    );
};

const faqBeautyKitData = [
    { question: "¿La Cera Hyper Diamond es difícil de aplicar?", answer: "¡Para nada! Es una cera de tipo 'paste wax' muy amigable. Se aplica fácilmente con la espuma incluida y se retira sin esfuerzo con una microfibra, dejando un acabado liso y sin residuos." },
    { question: "¿Cuánto tiempo dura el brillo de Perfect Llantix?", answer: "El brillo intenso puede durar varios días, dependiendo de las condiciones climáticas. Lo más importante es que deja una capa protectora que hidrata el caucho, previniendo que se reseque, incluso después de que el brillo disminuya." },
    { question: "¿El Ultra Restorer deja una sensación grasosa o pegajosa?", answer: "No. Nuestra fórmula está diseñada para ser absorbida por el plástico, restaurando el color desde adentro. Deja un acabado seco al tacto, satinado y no atrae el polvo." },
    { question: "¿Puedo usar el Ultra Restorer en plásticos interiores?", answer: "Aunque está formulado principalmente para plásticos exteriores por su alta protección UV, puedes usarlo en partes interiores como el tablero o paneles de las puertas. Recomendamos aplicar una capa muy fina y retirar cualquier exceso." },
    { question: "¿Este kit es suficiente para un detallado completo?", answer: "Este kit cubre tres de las áreas más importantes del embellecimiento: pintura, plásticos y llantas. Es el 'toque final' perfecto. Para la limpieza previa, te recomendamos nuestro Shampoo PH Neutro." },
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
                     {name: "Carolina V.", city: "Bogotá", quote: "Me encantó el obsequio del Ultra Restorer. Lo usé en los bumpers y espejos y el cambio fue brutal. El kit completo vale cada peso."},
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
    return (
        <div className="bg-white">
            <LandingHero onBuyNow={onBuyNow} />
            <LandingWhatYouGet />
            <LandingHowToApply />
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

export default LandingPageBeautyKit;
