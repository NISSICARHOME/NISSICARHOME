import React, { useState, useRef, useCallback, useEffect } from 'react';
import Accordion from '../components/shared/Accordion';
import { CartItem } from '../types';

// --- HELPER COMPONENTS (scoped to this file) ---

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

const SliderHandleIcon: React.FC = () => (
    <svg className="w-8 h-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4" />
    </svg>
);

const ImageSlider: React.FC<{ beforeImage: string; afterImage: string }> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
        ref={containerRef} 
        className="relative w-full max-w-xl mx-auto aspect-video sm:aspect-[4/3] overflow-hidden rounded-lg select-none cursor-ew-resize shadow-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
    >
      <img 
        src={afterImage} 
        alt="Resultado Después" 
        className="absolute w-full h-full object-cover pointer-events-none" 
      />
      <div 
        className="absolute w-full h-full object-cover overflow-hidden pointer-events-none" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Resultado Antes" className="w-full h-full object-cover pointer-events-none" />
      </div>
      <div 
        className="absolute top-0 bottom-0 w-1.5 bg-white pointer-events-none" 
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-2xl">
          <SliderHandleIcon />
        </div>
      </div>
    </div>
  );
};

// --- PAGE SECTIONS ---

const LandingHero: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
  const defaultKit: CartItem = {id: 'kit-vidrex-clarity', name: "KIT ESTRELLA: Vidrex + Claridad", price: 50000, quantity: 1};
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
      })
      .catch(err => console.error('Failed to copy link: ', err));
  };

  return (
    <section id="oferta" className="bg-white py-12 px-4 text-center">
      <div className="w-full max-w-3xl mx-auto mb-8">
          <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0" 
              alt="Componentes del Kit Estrella: Vidrex y Clarity Wash" 
              className="w-full h-auto" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">¡NO CAMBIES TUS VIDRIOS, DESMANCHALOS!</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">Recupera la transparencia y el brillo de tus vidrios fácil y sin esfuerzo. Descubre la solución definitiva para eliminar manchas de sarro, lluvia ácida y depósitos minerales en tu auto y hogar.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10 text-left items-center">
          <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">LOS BENEFICIOS SON:</h2>
              <ul className="space-y-3">
                  <CheckListItem><strong>Limpieza Garantizada:</strong> Con nuestra política única de 365 días.</CheckListItem>
                  <CheckListItem><strong>Fácil aplicación:</strong> Hazlo tú mismo en minutos.</CheckListItem>
                  <CheckListItem><strong>Resultados Inmediatos:</strong> Ve la diferencia desde la primera pasada.</CheckListItem>
                  <CheckListItem><strong>Protección Anti Manchas:</strong> El Vidrex crea un escudo protector.</CheckListItem>
                  <CheckListItem><strong>Cobertura Nacional:</strong> Cobertura en todo el territorio y rastreo de tu pedido.</CheckListItem>
              </ul>
          </div>
          <div className="flex flex-col items-center">
               <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">ANTES / DESPUÉS</h2>
               <ImageSlider 
                beforeImage="https://aluviarte.com/images/instalacion-vidrios/divisiones-de-bano-bogota-colombia.jpg"
                afterImage="https://lh3.googleusercontent.com/pw/AP1GczMtiRvcWH7hX10fMo5IPK4tcUy6Fb9wStoN0ftTN-922XVKHbmAZIrmlMVjA8zY7vtwAM8QCwwmKBTAgaVxmDhnTsYiULO0HrjcWRemE2MStowsWe7AESE_JOeCsNQ_lfSGtEsHYkmsQR-trE53KaFV=w661-h991-s-no-gm?authuser=0"
               />
          </div>
      </div>
      
      <div className="text-center my-12 max-w-2xl mx-auto">
        <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden">
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/IYcb3wNVNvM?si=SZFcurYg4zBLaZ5R"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </div>
      </div>
      
      <div className="max-w-md mx-auto flex items-center justify-center gap-4">
        <button
          onClick={() => onBuyNow(defaultKit)}
          className="flex-grow bg-green-600 text-white font-bold text-xl md:text-2xl py-4 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 animate-pulse"
        >
          ¡PIDE AHORA Y PAGA EN CASA!
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
      <p className="mt-4 text-sm text-gray-500">Haz clic para pedir tu kit. ¡Es fácil y seguro!</p>

       <div className="flex justify-center items-center gap-8 mt-8 text-gray-600 font-semibold">
          <p>🚚 Envío a todo Colombia</p>
          <p>💵 Paga al recibir en casa</p>
      </div>
    </section>
  );
};

const benefitsData = [
    { title: "Recupera el brillo original", description: "Devuelve la transparencia a vidrios y acrílicos.", image: "https://lh3.googleusercontent.com/pw/AP1GczMtiRvcWH7hX10fMo5IPK4tcUy6Fb9wStoN0ftTN-922XVKHbmAZIrmlMVjA8zY7vtwAM8QCwwmKBTAgaVxmDhnTsYiULO0HrjcWRemE2MStowsWe7AESE_JOeCsNQ_lfSGtEsHYkmsQR-trE53KaFV=w661-h991-s-no-gm?authuser=0" },
    { title: "Desengrasa y desmancha", description: "Clarity Wash elimina sarro, moho y hongos incrustados.", image: "https://lh3.googleusercontent.com/pw/AP1GczMtiRvcWH7hX10fMo5IPK4tcUy6Fb9wStoN0ftTN-922XVKHbmAZIrmlMVjA8zY7vtwAM8QCwwmKBTAgaVxmDhnTsYiULO0HrjcWRemE2MStowsWe7AESE_JOeCsNQ_lfSGtEsHYkmsQR-trE53KaFV=w661-h991-s-no-gm?authuser=0" },
    { title: "Elimina depósitos minerales", description: "Acaba con las manchas de lluvia ácida y agua dura.", image: "https://lh3.googleusercontent.com/pw/AP1GczMtiRvcWH7hX10fMo5IPK4tcUy6Fb9wStoN0ftTN-922XVKHbmAZIrmlMVjA8zY7vtwAM8QCwwmKBTAgaVxmDhnTsYiULO0HrjcWRemE2MStowsWe7AESE_JOeCsNQ_lfSGtEsHYkmsQR-trE53KaFV=w661-h991-s-no-gm?authuser=0" },
    { title: "Pule superficies", description: "Clarity Wash también elimina tallones en pintura y desmancha farolas (externamente).", image: "https://lh3.googleusercontent.com/pw/AP1GczN7SItDwQo-iusQyZ3VRyk07V5fgirL3EjHV2kCnlv0_Ds3BxBF6Es6UySi5dkslDK7iDMb7ziWDdhNcISf7dZfEtJqUHaA0dfLwPQpIm0FtLFwx8p4bnbYzP3l8KU68p0EgLNwbJRtSaXzZO4pYlAV=w1040-h800-s-no-gm?authuser=0" },
    { title: "Seguro para múltiples superficies", description: "Úsalo en Vidrios, Acrílico, Aluminio y Cromo.", image: "https://lh3.googleusercontent.com/pw/AP1GczN7SItDwQo-iusQyZ3VRyk07V5fgirL3EjHV2kCnlv0_Ds3BxBF6Es6UySi5dkslDK7iDMb7ziWDdhNcISf7dZfEtJqUHaA0dfLwPQpIm0FtLFwx8p4bnbYzP3l8KU68p0EgLNwbJRtSaXzZO4pYlAV=w1040-h800-s-no-gm?authuser=0" },
];

const LandingBenefits: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Resultados que puedes ver desde la primera aplicación</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                     <ul className="space-y-4">
                        {benefitsData.map(benefit => (
                           <CheckListItem key={benefit.title}>
                                <strong>{benefit.title}:</strong> {benefit.description}
                           </CheckListItem>
                        ))}
                    </ul>
                    <div className="grid grid-cols-6 gap-4">
                        <img src={benefitsData[0].image} alt={benefitsData[0].title} className="col-span-3 rounded-lg shadow-md h-40 w-full object-cover" />
                        <img src={benefitsData[1].image} alt={benefitsData[1].title} className="col-span-3 rounded-lg shadow-md h-40 w-full object-cover" />
                        <img src={benefitsData[2].image} alt={benefitsData[2].title} className="col-span-2 rounded-lg shadow-md h-40 w-full object-cover" />
                        <img src={benefitsData[3].image} alt={benefitsData[3].title} className="col-span-2 rounded-lg shadow-md h-40 w-full object-cover" />
                        <img src={benefitsData[4].image} alt={benefitsData[4].title} className="col-span-2 rounded-lg shadow-md h-40 w-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

const LandingHowToUse: React.FC = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">KIT VIDEX + CLARITY WASH vs. LIMPIADORES COMUNES</h2>
                 <div className="grid md:grid-cols-2 gap-8 text-lg mb-16">
                     <div className="border-2 border-green-500 p-6 rounded-lg">
                         <h3 className="text-2xl font-bold text-green-700 mb-4">KIT NISSI CAR HOME</h3>
                         <ul className="space-y-3">
                             <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✅</span> Elimina sarro, lluvia ácida y moho</li>
                             <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✅</span> Pule y restaura (farolas, acrílicos)</li>
                             <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✅</span> Crea una capa protectora (Protección Anti Manchas)</li>
                             <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✅</span> Resultados garantizados por 365 días</li>
                             <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✅</span> Resultados inmediatos</li>
                         </ul>
                     </div>
                     <div className="border-2 border-red-500 p-6 rounded-lg">
                         <h3 className="text-2xl font-bold text-red-700 mb-4">Limpiavidrios Comunes</h3>
                         <ul className="space-y-3">
                             <li className="flex items-start"><span className="text-red-500 font-bold mr-2">❌</span> Solo limpian polvo superficial</li>
                             <li className="flex items-start"><span className="text-red-500 font-bold mr-2">❌</span> No tienen poder de pulido</li>
                             <li className="flex items-start"><span className="text-red-500 font-bold mr-2">❌</span> Se mancha con la primera lluvia</li>
                             <li className="flex items-start"><span className="text-red-500 font-bold mr-2">❌</span> Sin garantía de resultados</li>
                             <li className="flex items-start"><span className="text-red-500 font-bold mr-2">❌</span> Requieren múltiples pasadas</li>
                         </ul>
                     </div>
                 </div>

                 <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">¿CÓMO SE USA EL KIT? (MODO DE USO)</h2>
                 <p className="text-center text-xl text-red-600 font-bold mb-8">Sigue estos 4 sencillos pasos en seco (No mojar antes):</p>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {num: 1, title: 'APLICA LA CREMA', desc: 'Coloque una pequeña cantidad de Clarity Wash en el aplicador de espuma. Frota sobre la superficie (ej. 15x15cm) con movimientos firmes.', img: 'https://lh3.googleusercontent.com/pw/AP1GczN-yEJ60kKupmGnof1HdhmvaB6_6TOSX0jXKSbXyVZZTnHJdOY2E-2YzrgbxGhXARlPXjf03Ogzh_tkHzThZnn8EZtVleVuc0gHtyEjxnR7zHYG7eTme1sjOLqSXUtkLigDDtcn9MMzMLGVVHmMzEYq=w1152-h896-s-no-gm?authuser=0'},
                        {num: 2, title: 'APLICACIÓN DEL GEL', desc: 'Sin retirar la crema, aplique 30-40 gotas de Vidrex sobre el mismo aplicador. Sigue frotando sobre la misma área por 50 segundos.', img: 'https://lh3.googleusercontent.com/pw/AP1GczOXRSorm7DVC8IsNgR40xqa-UT4Vy0rRFtfOgpB35-NICCFjyWptX9gwT3AHWxxpB4ushpLV64xPAHGXNqbiSkFIMKeBIunwK5mp00GipSbaQewhqWBlBKBgWW_uxMfYWApPaDN-yXDGSctMCcqHUBI=w1152-h896-s-no-gm?authuser=0'},
                        {num: 3, title: 'LIMPIA EL EXCESO', desc: 'Retira el exceso de producto con una toalla de microfibra limpia y seca.', img: 'https://lh3.googleusercontent.com/pw/AP1GczOQXrjr2VsLYqpU93Z8giuavXR9vNdzIxJp8ZOQIQi7iAPcR8ZY77n-OOJJ2uYaeLopnU_yCF7IRU9Q4RqN_pHoKDyvcNnDCVHZtvX4I9jt632ubvKbQiJLogFUt8qxFpwrUpT-OI9pvxIltTwOOesY=w1152-h896-s-no-gm?authuser=0'},
                        {num: 4, title: 'ENJUAGA AL FINAL', desc: 'Una vez hayas desmanchado toda el área (todo el parabrisas, etc), enjuaga con abundante agua.', img: 'https://lh3.googleusercontent.com/pw/AP1GczPDEggKp3jj4TxNCl6PX6PK8TY5DiqvgNt4uRfqDUSqcGvLvXK3Zcm-SvOtAbNcMe8wwkzNsW1wuPAdvarNhJ7HqjQUxxt_SnklqvBQ2JVE3S6rFzjAM1IuKBxdIOLxDHr2DguPlaP9r90BISo0KYjJ=w991-h991-s-no-gm?authuser=0'},
                    ].map(step => (
                         <div key={step.num} className="text-center">
                             <div className="relative mb-4">
                                <img src={step.img} alt={`Paso ${step.num}`} className="rounded-lg shadow-md w-full h-48 object-cover"/>
                                <div className="absolute -top-4 -left-4 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold border-4 border-white">{step.num}</div>
                             </div>
                             <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                             <p className="text-gray-600">{step.desc}</p>
                         </div>
                    ))}
                 </div>
                 <div className="text-center mt-12">
                    <p className="bg-red-100 text-red-700 p-4 rounded-lg max-w-3xl mx-auto"><strong>NOTA:</strong> Usar guantes. NO APLICAR VIDREX EN PINTURA O FAROLAS (Para farolas, usa solo Clarity Wash).</p>
                 </div>
            </div>
        </section>
    );
};

const LandingOffer: React.FC = () => {
    return (
        <section className="bg-gray-800 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¡PROMOCIÓN POR TIEMPO LIMITADO!</h2>
                <p className="text-xl text-yellow-300 mb-2">PIDE EL TUYO HOY Y PAGA AL RECIBIR</p>
                <p className="text-lg text-red-400 font-bold mb-8">STOCK LIMITADO - QUEDAN POCAS UNIDADES</p>
                <div className="bg-white text-gray-800 rounded-lg p-8 text-left max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-6">¿QUÉ INCLUYE TU COMPRA?</h3>
                    <ul className="space-y-4">
                        <CheckListItem><strong>1 Crema Pulidora CLARITY WASH (300gr):</strong> La base para desmanchar y pulir.</CheckListItem>
                        <CheckListItem><strong>1 Gel Sellador VIDREX BLOQUEADOR DE MANCHAS (120ml):</strong> El poder para eliminar lo imposible y proteger.</CheckListItem>
                        <CheckListItem><span className="bg-yellow-300 px-2 py-1 rounded">GRATIS:</span> 2 Aplicadores de espuma (blanda).</CheckListItem>
                        <CheckListItem><span className="bg-yellow-300 px-2 py-1 rounded">GRATIS (OBSEQUIO ADICIONAL):</span> 1 Toalla de Microfibra.</CheckListItem>
                        <CheckListItem><span className="bg-yellow-300 px-2 py-1 rounded">GRATIS:</span> Manual rápido de aplicación.</CheckListItem>
                        <CheckListItem><span className="bg-yellow-300 px-2 py-1 rounded">GRATIS:</span> Envío a toda Colombia.</CheckListItem>
                        <CheckListItem><span className="font-bold">GARANTÍA:</span> Compra 100% segura y garantizada por 365 días.</CheckListItem>
                    </ul>
                </div>
            </div>
        </section>
    );
};

const faqData = [
    { question: "¿Qué tipo de manchas eliminar?", answer: "El Kit Vidrex + Clarity Wash elimina grasa, sarro, residuos de lluvia ácida, depósitos minerales, manchas de agua dura, moho, hongos y óxido superficial." },
    { question: "¿Sirve solo para vidrios de carro?", answer: "No. Está diseñado para múltiples superficies. Es ideal para vidrios de auto, divisiones de baño, ventanas, acrílico, aluminio y cromo. (Solo Clarity Wash se puede usar en farolas)." },
    { question: "¿Cómo se usa correctamente?", answer: "Es un proceso en seco. Aplicas Clarity Wash, luego Vidrex sobre el mismo aplicador, frotas, retiras con toalla seca y solo al final de todo el proceso enjuagas con agua." },
    { question: "¿El producto es muy fuerte o tiene mal olor?", answer: "Su fórmula es avanzada y segura si se siguen las instrucciones. Se recomienda usar guantes. No genera olores molestos." },
    { question: "¿Cuánto tiempo dura el efecto?", answer: "La limpieza es inmediata. El Vidrex Bloqueador de Manchas deja una capa de protección que ayuda a repeler el agua y previene que nuevas manchas se adhieran fácilmente, durando semanas." },
    { question: "¿En qué consiste la Garantía de 365 días?", answer: "Confiamos en nuestro producto. Si sigues las instrucciones y no obtienes resultados, te guiamos en una videollamada con un técnico para verificar la aplicación y responder por tu inversión." },
];

const LandingSocialProofFAQ: React.FC = () => (
    <section className="py-16 px-4 bg-gray-50">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">NO LO DECIMOS NOSOTROS, LO DICEN NUESTROS CLIENTES</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                 {[
                     {name: "María F.", city: "Pereira", quote: "¡Recuperé las divisiones del baño! Tenía manchas de sarro que no salían con nada. Probé el kit y fue inmediato. Se nota el cambio, parecen nuevos."},
                     {name: "Carlos Mejía", city: "Ibagué", quote: "Muy útil para manejar seguro en lluvia. El parabrisas quedó excelente. El agua resbala y ya no se me mancha como antes. 100% recomendado."},
                     {name: "David R.", city: "Bogotá", quote: "Quedé impresionado con el brillo. Lo usé en los vidrios del carro y en los rines de aluminio. Eliminó todo tipo de suciedad y les dio un brillo increíble."},
                     {name: "Laura G.", city: "Medellín", quote: "El soporte técnico es de lo mejor. Tenía dudas con la aplicación, me contacté por WhatsApp y me guiaron paso a paso. ¡Qué gran servicio!"},
                 ].map(testimonial => (
                    <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex text-yellow-400 mb-2">{"★★★★★".split("").map((s,i) => <span key={i}>{s}</span>)}</div>
                        <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                        <p className="font-bold text-gray-800 text-right">- {testimonial.name} ({testimonial.city})</p>
                    </div>
                 ))}
            </div>
            
            <div className="text-center my-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Tu Opinión Nos Impulsa a Mejorar!</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">Si nuestros productos han superado tus expectativas, te invitamos a compartir tu experiencia. ¡Tu calificación nos ayuda a crecer y a que otros conozcan la calidad de Nissi Car Home!</p>
                <a 
                    href="https://g.page/r/Cf9bBmx6F9d8EBI/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-yellow-400 text-gray-800 font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
                >
                    Calificar con 5 Estrellas ⭐
                </a>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">PREGUNTAS FRECUENTES</h2>
             <div className="space-y-4">
                {faqData.map((item, index) => (
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

const LandingPageVidrexClarityWash: React.FC<LandingPageProps> = ({ onBuyNow }) => {
    
    useEffect(() => {
        const originalTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

        const newTitle = "Kit Estrella: Vidrex + Claridad - Nissi Car Home";
        const newDescription = "La solución definitiva para desmanchar vidrios, eliminar sarro, lluvia ácida y devolver la vida a tu auto y hogar. ¡Resultados garantizados!";
        const imageUrl = "https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0";

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
            <LandingBenefits />
            <LandingHowToUse />
            <LandingOffer />
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

export default LandingPageVidrexClarityWash;