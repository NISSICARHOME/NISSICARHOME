import React from 'react';

const PaymentCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-amber-400 mb-3">{title}</h3>
        <div className="text-gray-300 text-sm space-y-2">{children}</div>
    </div>
);


const PaymentMethods: React.FC = () => {
    return (
        <section id="payment" className="py-20 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Métodos de Pago
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Aceptamos diversas formas de pago para tu comodidad. Sigue las instrucciones para un proceso rápido y seguro.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <PaymentCard title="Transferencias">
                        <p><strong>Plataformas:</strong> Nequi, Bancolombia, Daviplata.</p>
                        <p><strong>Instrucciones:</strong></p>
                        <ol className="list-decimal list-inside ml-4">
                            <li>Solicita los datos de pago a tu asesor.</li>
                            <li>Realiza la transferencia por el valor exacto.</li>
                            <li><strong>Obligatorio:</strong> Envía el comprobante para verificar y despachar tu pedido.</li>
                        </ol>
                    </PaymentCard>
                    
                    <PaymentCard title="Tarjeta de Crédito y Débito">
                        <p>Aceptamos todas las tarjetas principales.</p>
                        <p><strong>Instrucciones:</strong></p>
                        <ol className="list-decimal list-inside ml-4">
                            <li>Tu asesor te enviará un enlace de pago seguro.</li>
                            <li>Completa el formulario con los datos de tu tarjeta.</li>
                            <li>La aprobación es instantánea y tu pedido quedará confirmado.</li>
                        </ol>
                    </PaymentCard>
                    
                     <PaymentCard title="Mercado Pago">
                        <p>Paga de forma segura con tu cuenta de Mercado Pago.</p>
                        <p><strong>Instrucciones:</strong></p>
                        <ol className="list-decimal list-inside ml-4">
                            <li>Te proporcionaremos un enlace a la plataforma.</li>
                            <li>Inicia sesión y completa la transacción.</li>
                            <li>Recibiremos una notificación inmediata para confirmar tu pedido.</li>
                        </ol>
                    </PaymentCard>

                    <PaymentCard title="Efectivo">
                        <p>Disponible para compras en sede o pago contra entrega.</p>
                         <p><strong>Instrucciones (Contra Entrega):</strong></p>
                        <ol className="list-decimal list-inside ml-4">
                            <li>Confirma la cobertura del servicio con tu asesor.</li>
                            <li>Informa si necesitas cambio (vueltas) para agilizar la entrega.</li>
                        </ol>
                    </PaymentCard>
                </div>
            </div>
        </section>
    );
};

export default PaymentMethods;
