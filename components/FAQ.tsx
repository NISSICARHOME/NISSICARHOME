import React from 'react';
import { FAQItem } from '../types';
import Accordion from './shared/Accordion';

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
    question: "¿Qué diferencia a Nissi Car Home de otras marcas más económicas del mercado?",
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
  return (
    <section id="faq" className="py-10 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl font-extrabold text-gray-800 sm:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
              Aquí respondemos a tus preguntas más comunes para que tengas toda la información que necesitas.
            </p>
          </div>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <Accordion key={index} title={item.question}>
                <p className="text-gray-700 text-sm sm:text-base">{item.answer}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;