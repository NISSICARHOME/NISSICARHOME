import React, { useEffect } from 'react';
import Accordion from '../components/shared/Accordion';

// --- HELPER COMPONENTS (scoped to this file) ---

const CTAButton: React.FC<{ href?: string; children: React.ReactNode; className?: string }> = ({ href = "#oferta", children, className = '' }) => (
  <a href={href} className={`block w-full max-w-md mx-auto text-center bg-green-600 text-white font-bold text-xl md:text-2xl py-4 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 animate-pulse ${className}`}>
    {children}
  </a>
);

const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg">
    <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{children}</span>
  </li>
);

const FloatingWhatsApp: React.FC = () => (
    <a href="https://wa.me/573203393805?text=Hola,%20quiero%20más%20información%20sobre%20el%20Kit%20Vidrex%20%2B%20Clarity%20Wash" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.1-.5 0-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.2.4-.4.1-.1.2-.2.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.5 2.3 3.7 3.2.5.2.9.4 1.2.5.5.2 1 .2 1.3.1.4-.1 1.5-1 1.7-1.9.2-.9.2-1.7.1-1.9-.1-.2-.3-.3-.5-.4zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" /></svg>
    </a>
);


// --- PAGE SECTIONS ---

const LandingHero: React.FC = () => (
  <section className="bg-white py-12 px-4 text-center">
    <img src="https://i.imgur.com/K7ZgX3I.jpeg" alt="Kit Vidrex y Clarity Wash Banner" className="mx-auto rounded-lg shadow-2xl mb-8 w-full max-w-4xl" />
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
            <img src="https://placehold.co/600x400/cccccc/ffffff?text=Antes" alt="Vidrio manchado antes del tratamiento" className="rounded-t-lg w-full"/>
            <img src="https://placehold.co/600x400/22c55e/ffffff?text=Después" alt="Vidrio limpio después del tratamiento" className="rounded-b-lg w-full"/>
        </div>
    </div>
    
    <p className="font-bold text-lg bg-yellow-300 text-yellow-800 py-2 px-4 rounded-md inline-block mb-8">OBSEQUIO: 2 APLICADORES DE ESPUMA</p>
    
    <CTAButton>¡COMPRA AHORA!</CTAButton>

    <div id="oferta" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 text-center">
        {[{q:1, p:"$XX.XXX", b:"$XX.XXX"},{q:2, p:"$XX.XXX", b:"$XX.XXX"},{q:3, p:"$XX.XXX", b:"$XX.XXX"}].map(offer => (
            <div key={offer.q} className="border-2 border-green-500 rounded-lg p-6 bg-green-50 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800">{offer.q} KIT{offer.q > 1 && 'S'}</h3>
                <p className="text-2xl font-bold text-green-600 my-2">Por solo: {offer.p}</p>
                <p className="text-gray-500 line-through">Antes: {offer.b}</p>
            </div>
        ))}
    </div>
    <div className="flex justify-center items-center gap-8 mt-8 text-gray-600 font-semibold">
        <p>🚚 Envío a todo Colombia</p>
        <p>💵 Paga al recibir en casa</p>
    </div>
  </section>
);

const LandingBenefits: React.FC = () => (
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
                    <img src="https://placehold.co/400x300/22c55e/ffffff?text=Vidrio+de+Auto" className="rounded-lg shadow-md" alt="Vidrio de auto brillante"/>
                    <img src="https://placehold.co/400x300/22c55e/ffffff?text=División+de+Baño" className="rounded-lg shadow-md" alt="División de baño transparente"/>
                    <img src="https://placehold.co/400x300/22c55e/ffffff?text=Farola+Restaurada" className="rounded-lg shadow-md" alt="Farola de auto restaurada"/>
                    <img src="https://placehold.co/400x300/22c55e/ffffff?text=Rin+de+Aluminio" className="rounded-lg shadow-md" alt="Rin de aluminio limpio"/>
                </div>
            </div>
             <div className="mt-12 text-center">
                 <CTAButton>¡PIDE TU KIT HOY MISMO!</CTAButton>
             </div>
        </div>
    </section>
);

const LandingHowToUse: React.FC = () => (
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
                    {num: 1, title: 'APLICA LA CREMA', desc: 'Coloque una pequeña cantidad de Clarity Wash en el aplicador de espuma. Frota sobre la superficie (ej. 15x15cm) con movimientos firmes.'},
                    {num: 2, title: 'APLICACIÓN DEL GEL', desc: 'Sin retirar la crema, aplique 30-40 gotas de Vidrex sobre el mismo aplicador. Sigue frotando sobre la misma área por 50 segundos.'},
                    {num: 3, title: 'LIMPIA EL EXCESO', desc: 'Retira el exceso de producto con una toalla de microfibra limpia y seca.'},
                    {num: 4, title: 'ENJUAGA AL FINAL', desc: 'Una vez hayas desmanchado toda el área (todo el parabrisas, etc), enjuaga con abundante agua.'},
                ].map(step => (
                     <div key={step.num} className="text-center">
                         <div className="relative mb-4">
                            <img src={`https://placehold.co/400x300?text=Paso+${step.num}`} alt={`Paso ${step.num}`} className="rounded-lg shadow-md w-full"/>
                            <div className="absolute -top-4 -left-4 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">{step.num}</div>
                         </div>
                         <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                         <p className="text-gray-600">{step.desc}</p>
                     </div>
                ))}
             </div>
             <div className="text-center mt-12">
                <p className="bg-red-100 text-red-700 p-4 rounded-lg max-w-3xl mx-auto"><strong>NOTA:</strong> Usar guantes. NO APLICAR VIDREX EN PINTURA O FAROLAS (Para farolas, usa solo Clarity Wash).</p>
                <div className="mt-8">
                    <CTAButton>¡COMPRAR AHORA!</CTAButton>
                </div>
             </div>
        </div>
    </section>
);

const LandingOffer: React.FC = () => (
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
            <div className="mt-8">
                <CTAButton>¡SÍ, QUIERO MI KIT!</CTAButton>
            </div>
        </div>
    </section>
);

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

const LandingFooter: React.FC = () => (
    <footer className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
             <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center items-center text-center mb-8">
                 <div className="bg-green-100 text-green-800 font-bold py-3 px-5 rounded-lg">✅ ENVÍO GRATIS</div>
                 <div className="bg-green-100 text-green-800 font-bold py-3 px-5 rounded-lg">✅ ATENCIÓN PERSONALIZADA</div>
                 <div className="bg-green-100 text-green-800 font-bold py-3 px-5 rounded-lg">✅ 100% GARANTIZADA</div>
                 <div className="bg-green-100 text-green-800 font-bold py-3 px-5 rounded-lg">✅ EXCELENTE CALIDAD</div>
             </div>
             <p className="text-center font-bold text-xl my-8">Nuestros Aliados Logísticos y Métodos de Pago:</p>
             <div className="flex justify-center items-center flex-wrap gap-8">
                <img src="https://servientrega.com.co/co/assets/images/logo.svg" alt="Servientrega" className="h-10"/>
                <img src="https://envia.co/wp-content/uploads/2021/10/logo-envia-2021.svg" alt="Envia" className="h-12"/>
                <img src="https://www.coordinadora.com/wp-content/uploads/2022/11/logo-1.svg" alt="Coordinadora" className="h-12"/>
                <img src="https://logodownload.org/wp-content/uploads/2022/10/nequi-logo-0.png" alt="Nequi" className="h-8"/>
                <img src="https://seeklogo.com/images/B/bancolombia-logo-2438123541-seeklogo.com.png" alt="Bancolombia" className="h-12"/>
             </div>
             <div className="text-center text-gray-500 mt-12">
                 <p>© {new Date().getFullYear()} Nissi Car Home. Todos los derechos reservados.</p>
             </div>
        </div>
    </footer>
);

// --- MAIN LANDING PAGE COMPONENT ---

const LandingPageVidrexClarityWash: React.FC = () => {

    useEffect(() => {
        // Override body styles for this page
        const originalBackground = document.body.style.background;
        const originalAnimation = document.body.style.animation;
        const originalFont = document.body.style.fontFamily;
        
        document.body.style.background = '#f9fafb'; // bg-gray-50
        document.body.style.animation = 'none';
        document.body.style.fontFamily = "'Poppins', sans-serif";

        // Revert styles on component unmount
        return () => {
            document.body.style.background = originalBackground;
            document.body.style.animation = originalAnimation;
            document.body.style.fontFamily = originalFont;
        };
    }, []);

    return (
        <div className="font-['Poppins',_sans-serif] bg-gray-50">
            <main>
                <LandingHero />
                <LandingBenefits />
                <LandingHowToUse />
                <LandingOffer />
                <LandingSocialProofFAQ />
            </main>
            <LandingFooter />
            <FloatingWhatsApp />
        </div>
    );
};

export default LandingPageVidrexClarityWash;