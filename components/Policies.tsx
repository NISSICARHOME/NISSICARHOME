import React from 'react';
import { Policy } from '../types';
import Accordion from './shared/Accordion';

export const policiesData: Policy[] = [
  {
    title: 'Política de Garantía de Satisfacción 365 Días',
    content: `En Nissi Car Home, confiamos plenamente en la calidad y eficacia de nuestras formulaciones. Por ello, ofrecemos una garantía única de 365 días sobre el resultado final de nuestros productos.

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
    content: `Nissi Car Home, en cumplimiento de la Ley 1581 de 2012, se compromete a proteger su privacidad y a manejar sus datos personales de forma segura y confidencial.

Finalidad del Tratamiento de Datos:
Su información es utilizada exclusivamente para procesar pedidos, brindar soporte, gestionar garantías y comunicar novedades (con su consentimiento).

Seguridad y Confidencialidad:
Implementamos medidas de seguridad para proteger sus datos contra acceso no autorizado. No vendemos, alquilamos ni cedemos sus datos personales a terceros con fines de marketing.

Sus Derechos:
Usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos. Para ejercerlos, puede contactarnos a nuestro correo electrónico oficial.`
  }
];

const Policies: React.FC = () => {
  return (
    <section id="policies" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl shadow-neumorphic-outset">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
              Políticas y Condiciones
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Nuestros compromisos de calidad, servicio y protección de tu información.
            </p>
          </div>
          <div className="space-y-4">
            {policiesData.map((policy, index) => (
              <Accordion key={index} title={policy.title}>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{policy.content}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Policies;