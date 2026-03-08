import React from 'react';
import { FAQItem } from '../types';
import Accordion from './shared/Accordion';
import { motion } from 'motion/react';

export const faqData: FAQItem[] = [
  {
    question: "¿En qué consiste exactamente la garantía de 365 días y cómo puedo reclamarla?",
    answer: "Nuestra garantía única cubre el rendimiento y la eficacia del producto durante 365 días. Si, siguiendo las instrucciones, no obtienes el resultado prometido, la hacemos válida. Para reclamarla, debes presentar tu comprobante de compra y agendar una videollamada con un técnico, quien te guiará en una aplicación en vivo para verificar el caso y darte una solución."
  },
  {
    question: "¿Hacen envíos a todo el país? ¿Cuánto tardan en llegar?",
    answer: "Sí, realizamos envíos a todo el territorio nacional desde nuestra casa matriz en Pereira. El tiempo de entrega varía según la ciudad de destino, pero te proporcionaremos un número de guía para que puedas rastrear tu pedido una vez sea despachado."
  },
  {
    question: "Soy nuevo en el cuidado de autos, ¿qué pasa si no sé cómo aplicar un producto?",
    answer: "¡No te preocupes! Uno de nuestros mayores valores es el soporte. Si tienes cualquier duda, contáctanos por WhatsApp y un asesor te guiará paso a paso, con videos e instrucciones personalizadas, para que apliques el producto como un profesional y obtengas los mejores resultados."
  },
  {
    question: "¿Puedo usar el desmanchador de vidrios VIDREX en los faros o la pintura de mi carro?",
    answer: "No. Es muy importante que el producto VIDREX Bloqueador de Manchas se use exclusivamente en las superficies indicadas (vidrios, acrílico, aluminio, cromo). Es una fórmula potente que puede dañar la pintura o los recubrimientos de las farolas. Para pulir farolas externamente, te recomendamos usar la crema Clarity Wash."
  },
  {
    question: "Los plásticos negros de mi carro se ven grises y quemados por el sol. ¿Qué producto me recomiendan?",
    answer: "El producto ideal para ese problema es nuestro Ultra Restorer. Está específicamente diseñado para restaurar el color y el acabado original de las piezas plásticas y de vinilo negras o grises, dejándolas hidratadas y con una capa de ultra protección contra los rayos UV."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos una amplia variedad de métodos: transferencias a Nequi, Bancolombia y Daviplata; pagos con Tarjeta de Crédito y Débito a través de enlaces de pago seguros; la plataforma de Mercado Pago; y Efectivo para compras en nuestras sedes o en el servicio de pago contra entrega (sujeto a cobertura)."
  },
  {
    question: "¿Qué diferencia a NISSI CAR-HOME de otras marcas más económicas del mercado?",
    answer: "Nuestra diferencia radica en la calidad y la confianza. Invertimos en investigación y materias primas de vanguardia para crear fórmulas que realmente funcionan y perduran. Mientras otros venden un producto, nosotros ofrecemos una solución completa que incluye asesoría personalizada y el respaldo de una garantía de 365 días."
  },
  {
    question: "¿Sus productos son solo para vehículos o también los puedo usar en mi hogar?",
    answer: "Aunque nuestra especialidad es el sector automotriz, muchos de nuestros productos son excelentes para el hogar. Por ejemplo, el Kit Desmanchador de Vidrios es altamente eficaz para eliminar manchas de agua dura y sarro en las divisiones de baño, ventanas y superficies de acero inoxidable."
  },
  {
    question: "No estoy seguro de qué comprar, ¿por dónde empiezo?",
    answer: "Una excelente opción para empezar es nuestro Kit #2: Kit de Embellecimiento para tu Vehículo. Es uno de los más completos, ya que te permite proteger la pintura con la Cera Hyper Diamond, dar un acabado profesional a las llantas con Perfect Llantix y restaurar las partes negras con el Ultra Restorer de obsequio."
  }
];

const FAQ: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-4 py-1.5 bg-amber-50 rounded-full">
            <span className="text-amber-600 text-xs font-black uppercase tracking-widest">Soporte al Cliente</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter leading-none">
            PREGUNTAS <span className="text-amber-500">FRECUENTES</span>
          </h2>
          <p className="text-xl text-gray-500 mb-10">
            Todo lo que necesitas saber sobre nuestros productos y servicios.
          </p>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center justify-center px-12 py-5 bg-amber-500 text-white rounded-2xl font-black uppercase italic tracking-widest transition-all duration-500 hover:bg-amber-600 hover:shadow-[0_20px_50px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isExpanded ? 'Ocultar Preguntas' : 'Ver Preguntas Frecuentes'}
              <svg 
                className={`w-6 h-6 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>

        <div className={`grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="space-y-4 pb-8">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Accordion title={item.question}>
                    <p className="text-gray-500 text-lg leading-relaxed">{item.answer}</p>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 p-12 bg-gray-50 rounded-[3rem] text-center border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase italic tracking-tight">¿Aún tienes dudas?</h3>
          <p className="text-gray-500 mb-8">Nuestro equipo de expertos está listo para asesorarte de forma personalizada.</p>
          <a 
            href="https://wa.me/573113141516" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-lg hover:shadow-green-500/20 active:scale-95"
          >
            Hablar con un Experto
            <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412 0 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.465l.353.21c1.445.859 3.11 1.313 4.813 1.314 5.235 0 9.497-4.262 9.497-9.497 0-2.537-1.002-4.931-2.822-6.751-1.821-1.82-4.215-2.822-6.751-2.822-5.235 0-9.497 4.262-9.497 9.497 0 2.093.544 4.135 1.575 5.915l.23.395-1.008 3.682 3.77-.988z" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
