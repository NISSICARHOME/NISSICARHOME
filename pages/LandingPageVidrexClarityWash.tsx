import React, { useMemo } from 'react';
import Accordion from '../components/shared/Accordion';
import { CartItem } from '../types';

// --- CART & CHECKOUT COMPONENTS ---

const ShoppingCartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export const FloatingCartButton: React.FC<{ cart: CartItem[]; onClick: () => void }> = ({ cart, onClick }) => {
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  if (totalItems === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-green-600/80 backdrop-blur-md border-2 border-white/50 text-white w-auto h-16 px-6 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600/100 transition-all transform hover:scale-110 z-50"
      aria-label="Ver carrito y finalizar compra"
    >
      <ShoppingCartIcon />
      <div className="ml-3 text-left">
        <span className="font-bold block -mb-1">{totalItems} {totalItems > 1 ? 'productos' : 'producto'}</span>
        <span className="text-sm">${totalPrice.toLocaleString('es-CO')}</span>
      </div>
    </button>
  );
};


// --- HELPER COMPONENTS (scoped to this file) ---

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg">
    <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{children}</span>
  </li>
);

// --- PAGE SECTIONS ---

const LandingHero: React.FC<{ onBuyNow: (item: CartItem) => void }> = ({ onBuyNow }) => {
  const defaultKit: CartItem = {id: 'kit-1', name: "KIT ESTRELLA", price: 50000, quantity: 1};

  return (
    <section id="oferta" className="bg-white py-12 px-4 text-center">
      <div className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl mb-8 overflow-hidden bg-gray-100">
          <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0" 
              alt="Componentes del Kit Estrella: Vidrex y Clarity Wash" 
              className="w-full h-auto" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">¡NO CAMBIES TUS VIDRIOS, DESMANCHALOS!</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">Recupera la transparencia y el brillo de tus vidrios fácil y sin esfuerzo. Descubre la solución definitiva para eliminar manchas de sarro, lluvia ácida y depósitos minerales en tu auto y hogar.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10 text-left">
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
              <img src="https://images.pexels.com/photos/10394781/pexels-photo-10394781.jpeg" alt="Vidrio manchado antes del tratamiento" className="rounded-t-lg w-full object-cover h-48"/>
              <img src="https://nissicarhome.com/wp-content/uploads/2023/11/clarity-wash-vidrex-3.webp" alt="Vidrio limpio después del tratamiento" className="rounded-b-lg w-full object-cover h-48"/>
          </div>
      </div>
      
      <div className="text-center my-12">
        <img 
            src="https://i.ibb.co/L5B7wzQ/obsequio-banner.png"
            alt="Obsequio: 2 aplicadores de espuma + toalla microfibra"
            className="mx-auto max-w-lg w-full rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="max-w-md mx-auto">
        <button
          onClick={() => onBuyNow(defaultKit)}
          className="w-full bg-green-600 text-white font-bold text-2xl py-4 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 animate-pulse"
        >
          ¡COMPRA AHORA!
        </button>
        <p className="mt-4 text-sm text-gray-500">Haz clic para pedir tu kit y paga al recibir. ¡Es fácil y seguro!</p>
      </div>

       <div className="flex justify-center items-center gap-8 mt-8 text-gray-600 font-semibold">
          <p>🚚 Envío a todo Colombia</p>
          <p>💵 Paga al recibir en casa</p>
      </div>
    </section>
  );
};

const LandingBenefits: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Resultados que puedes ver desde la primera aplicación</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                     <ul className="space-y-4">
                        <CheckListItem><strong>Recupera el brillo original:</strong> Devuelve la transparencia a vidrios y acrílicos.</CheckListItem>
                        <CheckListItem><strong>Desengrasa y desmancha:</strong> Clarity Wash elimina sarro, moho y hongos incrustados.</CheckListItem>
                        <CheckListItem><strong>Elimina depósitos minerales:</strong> Acaba con las manchas de lluvia ácida y agua dura.</CheckListItem>
                        <CheckListItem><strong>Pule superficies:</strong> Clarity Wash también elimina tallones en pintura y desmancha farolas (externamente).</CheckListItem>
                        <CheckListItem><strong>Seguro para múltiples superficies:</strong> Úsalo en Vidrios, Acrílico, Aluminio y Cromo.</CheckListItem>
                    </ul>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://nissicarhome.com/wp-content/uploads/2023/11/clarity-wash-vidrex-3.webp" className="rounded-lg shadow-md h-48 w-full object-cover" alt="Vidrio de auto brillante"/>
                        <img src="https://nissicarhome.com/wp-content/uploads/2023/11/clarity-wash-vidrex-1.webp" className="rounded-lg shadow-md h-48 w-full object-cover" alt="División de baño transparente"/>
                        <img src="https://nissicarhome.com/wp-content/uploads/2023/11/2-1-1-1-1024x1024.webp" className="rounded-lg shadow-md h-48 w-full object-cover" alt="Farola de auto restaurada"/>
                        <img src="https://images.pexels.com/photos/1637780/pexels-photo-1637780.jpeg" className="rounded-lg shadow-md h-48 w-full object-cover" alt="Rin de aluminio limpio"/>
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
                        {num: 1, title: 'APLICA LA CREMA', desc: 'Coloque una pequeña cantidad de Clarity Wash en el aplicador de espuma. Frota sobre la superficie (ej. 15x15cm) con movimientos firmes.', img: 'https://nissicarhome.com/wp-content/uploads/2023/11/clarity-wash-vidrex-4.webp'},
                        {num: 2, title: 'APLICACIÓN DEL GEL', desc: 'Sin retirar la crema, aplique 30-40 gotas de Vidrex sobre el mismo aplicador. Sigue frotando sobre la misma área por 50 segundos.', img: 'https://images.pexels.com/photos/7794429/pexels-photo-7794429.jpeg'},
                        {num: 3, title: 'LIMPIA EL EXCESO', desc: 'Retira el exceso de producto con una toalla de microfibra limpia y seca.', img: 'https://images.pexels.com/photos/8349233/pexels-photo-8349233.jpeg'},
                        {num: 4, title: 'ENJUAGA AL FINAL', desc: 'Una vez hayas desmanchado toda el área (todo el parabrisas, etc), enjuaga con abundante agua.', img: 'https://images.pexels.com/photos/372959/pexels-photo-372959.jpeg'},
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
    return (
        <main>
            <LandingHero onBuyNow={onBuyNow} />
            <LandingBenefits />
            <LandingHowToUse />
            <LandingOffer />
            <LandingSocialProofFAQ />
        </main>
    );
};

export default LandingPageVidrexClarityWash;