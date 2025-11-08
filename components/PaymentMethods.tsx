import React from 'react';

const PaymentCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 sm:p-5 rounded-2xl shadow-lg h-full">
        <h3 className={`text-base sm:text-lg font-bold text-amber-600 mb-3 ${title !== 'Mercado Pago' ? 'drop-shadow-golden-glow' : ''}`}>{title}</h3>
        <div className="text-gray-700 text-sm space-y-2">{children}</div>
    </div>
);


const PaymentMethods: React.FC = () => {
    return (
        <section id="payment" className="py-10 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-xl font-extrabold text-gray-800 sm:text-4xl">
                            Métodos de Pago
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
                            Aceptamos diversas formas de pago para tu comodidad. Sigue las instrucciones para un proceso rápido y seguro.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
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
            </div>
        </section>
    );
};

export default PaymentMethods;