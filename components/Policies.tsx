import React from 'react';
import { Policy } from '../types';
import Accordion from './shared/Accordion';

const policiesData: Policy[] = [
  {
    title: 'Política de Garantía de Satisfacción 365 Días',
    content: (
      <div className="space-y-4 text-gray-300 text-sm">
        <p>En Nissi Car Home, confiamos plenamente en la calidad y eficacia de nuestras formulaciones. Por ello, ofrecemos una garantía única de 365 días sobre el resultado final de nuestros productos.</p>
        
        <div>
          <h4 className="font-semibold text-amber-400">¿Qué Cubre la Garantía?</h4>
          <p>Cubre el rendimiento y la eficacia del producto según las especificaciones. Se aplicará si el producto, usado correctamente, no genera los resultados prometidos.</p>
        </div>

        <div>
            <h4 className="font-semibold text-amber-400">¿Qué NO Cubre la Garantía?</h4>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Daños por aplicación incorrecta o no seguimiento de instrucciones.</li>
                <li>Uso del producto para fines no recomendados.</li>
                <li>Resultados no deseados por aplicar sobre superficies previamente dañadas.</li>
                <li>Derrames, mal almacenamiento o manejo inadecuado del envase.</li>
            </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-amber-400">Proceso Obligatorio de Reclamación y Verificación Técnica</h4>
          <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
            <li><strong>Contacto Inicial:</strong> Contactar a nuestro soporte técnico vía WhatsApp o email.</li>
            <li><strong>Prueba de Compra:</strong> Presentar el comprobante de compra de los últimos 365 días.</li>
            <li><strong>Agendamiento de Videollamada:</strong> Se agendará una videollamada con un técnico en 3-5 días hábiles.</li>
            <li><strong>Verificación en Vivo:</strong> Durante la llamada, el cliente deberá mostrar el producto y realizar una aplicación de prueba en tiempo real siguiendo las indicaciones del técnico.</li>
            <li><strong>Diagnóstico Técnico:</strong> El técnico determinará la validez de la reclamación.</li>
          </ol>
        </div>

        <div>
          <h4 className="font-semibold text-amber-400">Resolución de Garantía Aprobada</h4>
          <p>Si la garantía es aprobada, se ofrecerá un reemplazo del producto o un crédito en tienda, a elección del cliente.</p>
        </div>
      </div>
    )
  },
  {
    title: 'Políticas de la Empresa',
    content: (
       <div className="space-y-4 text-gray-300 text-sm">
            <p>Estas normativas definen nuestros principios de acción y el compromiso con nuestros clientes, colaboradores y la comunidad.</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Principio de Calidad Superior:</strong> Nos comprometemos a utilizar únicamente materias primas de alta calidad y a mantener un proceso de investigación y desarrollo constante.</li>
                <li><strong>Compromiso con el Cliente:</strong> El cliente es el centro de nuestra operación. Brindamos asesoría personalizada, honesta y transparente.</li>
                <li><strong>Transparencia e Integridad:</strong> Toda nuestra comunicación, precios y políticas son claras y directas.</li>
                <li><strong>Responsabilidad:</strong> Asumimos la total responsabilidad por la eficacia de nuestros productos bajo las condiciones de uso recomendadas.</li>
                <li><strong>Innovación Continua:</strong> Vivimos en la vanguardia de la nanotecnología y las formulaciones químicas para el cuidado estético.</li>
            </ul>
       </div>
    )
  },
  {
    title: 'Política de Tratamiento y Protección de Datos Personales',
    content: (
       <div className="space-y-4 text-gray-300 text-sm">
            <p>Nissi Car Home, en cumplimiento de la Ley 1581 de 2012, se compromete a proteger su privacidad y a manejar sus datos personales de forma segura y confidencial.</p>
             <div>
                <h4 className="font-semibold text-amber-400">Finalidad del Tratamiento de Datos</h4>
                <p>Su información es utilizada exclusivamente para procesar pedidos, brindar soporte, gestionar garantías y comunicar novedades (con su consentimiento).</p>
            </div>
             <div>
                <h4 className="font-semibold text-amber-400">Seguridad y Confidencialidad</h4>
                <p>Implementamos medidas de seguridad para proteger sus datos contra acceso no autorizado. No vendemos, alquilamos ni cedemos sus datos personales a terceros con fines de marketing.</p>
            </div>
             <div>
                <h4 className="font-semibold text-amber-400">Sus Derechos</h4>
                <p>Usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos. Para ejercerlos, puede contactarnos a nuestro correo electrónico oficial.</p>
            </div>
       </div>
    )
  }
];

const Policies: React.FC = () => {
  return (
    <section id="policies" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Políticas y Condiciones
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Nuestros compromisos de calidad, servicio y protección de tu información.
          </p>
        </div>
        <div className="space-y-4">
          {policiesData.map((policy, index) => (
            <Accordion key={index} title={policy.title}>
              {policy.content}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policies;
