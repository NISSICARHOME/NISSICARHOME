import React, { useState, useMemo } from 'react';
import { CartItem, OrderDetails } from '../../types';

interface CheckoutFormProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, setCart, onClose }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '', phone: '', address: '', city: '', department: '', details: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'mercadoPago' | 'transferencia' | ''>('');
  const [isLocating, setIsLocating] = useState(false);

  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setCart(currentCart => {
      return currentCart
        .map(item => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter(item => item.quantity > 0); // Remove item if quantity is 0
    });
  };
  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
        alert("La geolocalización no es soportada por este navegador.");
        return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            alert(`Ubicación obtenida. Para convertirla en una dirección completa, se necesita una API Key de Google Maps.`);
            setIsLocating(false);
        },
        () => {
            alert("No se pudo obtener la ubicación. Asegúrate de haber dado los permisos necesarios.");
            setIsLocating(false);
        }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    for (const key in orderDetails) {
        if (orderDetails[key as keyof OrderDetails].trim() === '') {
            alert(`Por favor, completa el campo "${key}".`);
            return;
        }
    }
    if (!paymentMethod) {
        alert("Por favor, selecciona un método de pago.");
        return;
    }

    let orderSummary = "¡Hola! Quisiera realizar el siguiente pedido:\n\n";
    cart.forEach(item => {
        orderSummary += `*${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });
    orderSummary += `\n*TOTAL: $${totalPrice.toLocaleString('es-CO')}*\n\n`;
    orderSummary += "*DATOS DE ENVÍO:*\n";
    orderSummary += `Nombre: ${orderDetails.name}\n`;
    orderSummary += `Teléfono: ${orderDetails.phone}\n`;
    orderSummary += `Dirección: ${orderDetails.address}\n`;
    orderSummary += `Ciudad: ${orderDetails.city}\n`;
    orderSummary += `Departamento: ${orderDetails.department}\n`;
    orderSummary += `Detalles Adicionales: ${orderDetails.details}\n\n`;
    orderSummary += `*MÉTODO DE PAGO SELECCIONADO:*\n`;
    orderSummary += paymentMethod === 'mercadoPago' ? 'Mercado Pago' : 'Transferencia Bancaria';
    
    const whatsappUrl = `https://wa.me/573203393805?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="py-12 px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-auto flex flex-col">
        <header className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-800">Finalizar Compra</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Seguir Comprando
          </button>
        </header>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Order Summary */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">1. Resumen de tu Pedido</h3>
            {cart.length > 0 ? (
                <div className="space-y-3">
                    {cart.map(item => (
                        <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-600">${item.price.toLocaleString('es-CO')} c/u</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => handleQuantityChange(item.id, -1)} className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">-</button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button type="button" onClick={() => handleQuantityChange(item.id, 1)} className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">+</button>
                            </div>
                            <p className="font-bold w-28 text-right">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                        </div>
                    ))}
                    <div className="text-right font-bold text-xl border-t pt-3 mt-3">
                        Total: ${totalPrice.toLocaleString('es-CO')}
                    </div>
                </div>
            ) : <p className="text-gray-500">Tu carrito está vacío. <button type="button" onClick={onClose} className="text-blue-600 hover:underline">Vuelve</button> para agregar productos.</p>}
          </section>

          {cart.length > 0 && <>
          {/* Shipping Details */}
          <section>
             <h3 className="text-xl font-semibold border-b pb-2 mb-4">2. Datos de Envío</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Nombre Completo" onChange={handleInputChange} required className="p-2 border rounded"/>
                <input type="tel" name="phone" placeholder="Teléfono de Contacto" onChange={handleInputChange} required className="p-2 border rounded"/>
                <input type="text" name="department" placeholder="Departamento" onChange={handleInputChange} required className="p-2 border rounded"/>
                <input type="text" name="city" placeholder="Ciudad" onChange={handleInputChange} required className="p-2 border rounded"/>
                <div className="md:col-span-2 relative">
                    <input type="text" name="address" placeholder="Dirección de Envío" onChange={handleInputChange} required className="p-2 border rounded w-full"/>
                    <button type="button" onClick={handleGetLocation} disabled={isLocating} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-500 text-white px-2 py-1 rounded disabled:bg-gray-400">
                      {isLocating ? 'Buscando...' : 'Usar mi ubicación'}
                    </button>
                </div>
                <div className="p-2 border rounded bg-gray-100 text-gray-500 text-center h-24 md:col-span-2">
                    El mapa de Google se mostrará aquí para verificar tu dirección.<br/>(Requiere configuración de API Key)
                </div>
                <textarea name="details" placeholder="Detalles (Ej: Torre 1, Apto 203, Casa, Conjunto)" onChange={handleInputChange} required className="p-2 border rounded md:col-span-2 h-20"/>
             </div>
          </section>

          {/* Payment Method */}
          <section>
             <h3 className="text-xl font-semibold border-b pb-2 mb-4">3. Método de Pago</h3>
             <div className="space-y-3">
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${paymentMethod === 'mercadoPago' ? 'border-blue-500 bg-blue-50' : ''}`}>
                    <input type="radio" name="payment" value="mercadoPago" onChange={() => setPaymentMethod('mercadoPago')} className="mr-3"/>
                    <span>Pagar con Mercado Pago</span>
                </label>
                {paymentMethod === 'mercadoPago' && (
                    <div className="pl-8 pb-2 text-sm text-gray-700">
                        <p>Serás dirigido al portal de pago de nuestra tienda.</p>
                        <p>Monto a pagar: <strong>${totalPrice.toLocaleString('es-CO')}</strong></p>
                        <a href="http://link.mercadopago.com.co/tiendanissicarhomes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ir a Mercado Pago</a>
                    </div>
                )}
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${paymentMethod === 'transferencia' ? 'border-blue-500 bg-blue-50' : ''}`}>
                    <input type="radio" name="payment" value="transferencia" onChange={() => setPaymentMethod('transferencia')} className="mr-3"/>
                    <span>Transferencia Bancaria (Bancolombia)</span>
                </label>
                {paymentMethod === 'transferencia' && (
                    <div className="pl-8 pb-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                       <p>Realiza la transferencia y envía el comprobante al WhatsApp.</p>
                       <p><strong>Llave (Bre-B):</strong> @helmer182</p>
                       <p><strong>Cuenta Ahorros Bancolombia:</strong> 85100004715</p>
                       <p><strong>Titular:</strong> Helmer P.</p>
                       <p><strong>Monto a pagar:</strong> ${totalPrice.toLocaleString('es-CO')}</p>
                    </div>
                )}
             </div>
          </section>
          </>}
        </form>

        <footer className="p-4 bg-gray-50 border-t rounded-b-lg">
          <button onClick={handleSubmit} disabled={cart.length === 0} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            Realizar Pedido por WhatsApp
          </button>
        </footer>
      </div>
    </main>
  );
};

export default CheckoutForm;
