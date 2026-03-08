import React from 'react';
import { Policy } from '../types';
import Accordion from './shared/Accordion';
import { motion } from 'motion/react';

export const policiesData: Policy[] = [
  {
    title: 'Política de Garantía de Satisfacción 365 Días',
    content: `En NISSI CAR-HOME, confiamos plenamente en la calidad y eficacia de nuestras formulaciones. Por ello, ofrecemos una garantía única de 365 días sobre el resultado final de nuestros productos.

¿Qué Cubre la Garantía?
Cubre el rendimiento y la eficacia del producto según las especificaciones. Se aplicará si el producto, usado correctamente, no genera los resultados prometidos.

¿Qué NO Cubre la Garantía?
- Daños por aplicación incorrecta o no seguimiento de instrucciones.
- Uso del producto para fines no recomendados.
- Resultados no deseados por aplicar sobre superficies previamente dañadas.
- Derrames, mal almacenamiento o manejo inadecuado del envase.

Proceso Obligatorio de Reclamación y Verificación Técnica:
1. Contacto Inicial: Contactar a nuestro soporte técnico vía WhatsApp o email.
2. Prueba de Compra: Presentar el comprobante de compra de los últimos 365 días.
3. Agendamiento de Videollamada: Se agendará una videollamada con un técnico en 3-5 días hábiles.
4. Verificación en Vivo: Durante la llamada, el cliente deberá mostrar el producto y realizar una aplicación de prueba en tiempo real siguiendo las indicaciones del técnico.
5. Diagnóstico Técnico: El técnico determinará la validez de la reclamación.

Resolución de Garantía Aprobada:
Si la garantía es aprobada, se ofrecerá un reemplazo del producto o un crédito en tienda, a elección del cliente.`
  },
  {
    title: 'Políticas de la Empresa',
    content: `Estas normativas definen nuestros principios de acción y el compromiso con nuestros clientes, colaboradores y la comunidad.
- Principio de Calidad Superior: Nos comprometemos a utilizar únicamente materias primas de alta calidad y a mantener un proceso de investigación y desarrollo constante.
- Compromiso con el Cliente: El cliente es el centro de nuestra operación. Brindamos asesoría personalizada, honesta y transparente.
- Transparencia e Integridad: Toda nuestra comunicación, precios y políticas son claras y directas.
- Responsabilidad: Asumimos la total responsabilidad por la eficacia de nuestros productos bajo las condiciones de uso recomendadas.
- Innovación Continua: Vivimos en la vanguardia de la nanotecnología y las formulaciones químicas para el cuidado estético.`
  },
  {
    title: 'Política de Tratamiento y Protección de Datos Personales',
    content: `NISSI CAR-HOME, en cumplimiento de la Ley 1581 de 2012, se compromete a proteger su privacidad y a manejar sus datos personales de forma segura y confidencial.

Finalidad del Tratamiento de Datos:
Su información es utilizada exclusivamente para procesar pedidos, brindar soporte, gestionar garantías y comunicar novedades (con su consentimiento).

Seguridad y Confidencialidad:
Implementamos medidas de seguridad para proteger sus datos contra acceso no autorizado. No vendemos, alquilamos ni cedemos sus datos personales a terceros con fines de marketing.

Sus Derechos:
Usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos. Para ejercerlos, puede contactarnos a nuestro correo electrónico oficial.`
  }
];

const Policies: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <section id="policies" className="py-24 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-white">
          <div 
            className="text-center cursor-pointer group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex flex-col items-center">
              <div className="inline-block mb-6 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
                <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Legal & Transparencia</span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-800 sm:text-4xl flex items-center gap-3 uppercase italic tracking-tighter">
                Políticas y <span className="text-amber-500">Condiciones</span>
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
                  ? "Haz clic para ocultar nuestras normativas legales."
                  : "Nuestros compromisos de calidad, servicio y protección de tu información. Haz clic para ver los detalles."
                }
              </p>
            </div>
          </div>

          <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="space-y-4 pb-8">
                {policiesData.map((policy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Accordion title={policy.title}>
                      <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-wrap">{policy.content}</p>
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policies;
