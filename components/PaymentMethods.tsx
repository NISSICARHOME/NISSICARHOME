import React, { useState } from 'react';
import { siteContent } from '../data/siteContent';

const PaymentCard: React.FC<{ title: string; children: React.ReactNode; onClick: () => void }> = ({ title, children, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white/20 backdrop-blur-md border border-white/30 p-4 sm:p-5 rounded-2xl shadow-lg h-full cursor-pointer hover:bg-white/30 hover:scale-[1.02] transition-all duration-300 group"
    >
        <div className="flex justify-between items-start mb-3">
            <h3 className={`text-base sm:text-lg font-bold text-amber-600 ${title !== 'Mercado Pago' ? 'drop-shadow-golden-glow' : ''}`}>{title}</h3>
            <div className="bg-green-500/20 p-1.5 rounded-full text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </div>
        </div>
        <div className="text-gray-700 text-sm space-y-2">{children}</div>
        <div className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <span>Hablar con un asesor</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
    </div>
);


const PaymentMethods: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { footer } = siteContent;
    const whatsappNumber = footer.phone.replace(/\D/g, '');

    const handlePaymentClick = (method: string) => {
        const message = encodeURIComponent(`Hola, me gustaría recibir asesoría sobre el pago por ${method}.`);
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    return (
        <section id="payment" className="py-10 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden">
                    <div 
                        className="text-center cursor-pointer group"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-extrabold text-gray-800 sm:text-4xl flex items-center gap-3">
                                Métodos de Pago
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
                                    ? "Haz clic en cualquier método para recibir asesoría personalizada por WhatsApp."
                                    : "Aceptamos diversas formas de pago para tu comodidad. Haz clic para ver las opciones."
                                }
                            </p>
                        </div>
                    </div>

                    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                                <PaymentCard title="Transferencias" onClick={() => handlePaymentClick('Transferencias')}>
                                    <p><strong>Plataformas:</strong> Nequi, Bancolombia, Daviplata.</p>
                                    <p><strong>Instrucciones:</strong></p>
                                    <ol className="list-decimal list-inside ml-4">
                                        <li>Solicita los datos de pago a tu asesor.</li>
                                        <li>Realiza la transferencia por el valor exacto.</li>
                                        <li><strong>Obligatorio:</strong> Envía el comprobante.</li>
                                    </ol>
                                </PaymentCard>
                                
                                <PaymentCard title="Tarjeta de Crédito y Débito" onClick={() => handlePaymentClick('Tarjeta de Crédito y Débito')}>
                                    <p>Aceptamos todas las tarjetas principales.</p>
                                    <p><strong>Instrucciones:</strong></p>
                                    <ol className="list-decimal list-inside ml-4">
                                        <li>Tu asesor te enviará un enlace seguro.</li>
                                        <li>Completa el formulario de pago.</li>
                                        <li>Aprobación instantánea.</li>
                                    </ol>
                                </PaymentCard>
                                
                                <PaymentCard title="Mercado Pago" onClick={() => handlePaymentClick('Mercado Pago')}>
                                    <p>Paga de forma segura con tu cuenta.</p>
                                    <p><strong>Instrucciones:</strong></p>
                                    <ol className="list-decimal list-inside ml-4">
                                        <li>Te proporcionaremos un enlace.</li>
                                        <li>Inicia sesión y completa la transacción.</li>
                                        <li>Notificación inmediata.</li>
                                    </ol>
                                </PaymentCard>
        
                                <PaymentCard title="Efectivo" onClick={() => handlePaymentClick('Efectivo')}>
                                    <p>Disponible para compras en sede o contra entrega.</p>
                                    <p><strong>Instrucciones:</strong></p>
                                    <ol className="list-decimal list-inside ml-4">
                                        <li>Confirma la cobertura con tu asesor.</li>
                                        <li>Informa si necesitas cambio.</li>
                                        <li>Pago al recibir el producto.</li>
                                    </ol>
                                </PaymentCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentMethods;