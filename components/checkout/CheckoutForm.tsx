import React, { useState, useMemo } from 'react';
import { CartItem, OrderDetails } from '../../types';
import { getAllProducts } from '../Products';

interface CheckoutFormProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, setCart, onClose }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '', phone: '', address: '', city: '', state: '', housingType: '', notes: ''
  });
  
  const allProducts = useMemo(() => getAllProducts(), []);

  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setCart(currentCart => {
      const updatedCart = currentCart
        .map(item => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter(item => item.quantity > 0);

      if (updatedCart.length === 0) {
        onClose();
      }
      return updatedCart;
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    const requiredFields: (keyof OrderDetails)[] = ['name', 'phone', 'address', 'city', 'state'];
    const missingField = requiredFields.find(field => !orderDetails[field].trim());

    if (missingField) {
        alert(`Por favor, completa todos los campos requeridos para el envío.`);
        return;
    }

    let orderSummary = "¡Hola Nissi Car Home! Quisiera realizar el siguiente pedido:\n\n";
    orderSummary += "--- PRODUCTOS ---\n";
    cart.forEach(item => {
        orderSummary += `- *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });
    orderSummary += `\n--- TOTAL ---\n*TOTAL: $${totalPrice.toLocaleString('es-CO')}*\n\n`;
    orderSummary += "--- DATOS DE ENVÍO ---\n";
    orderSummary += `*Nombre:* ${orderDetails.name}\n`;
    orderSummary += `*Teléfono:* ${orderDetails.phone}\n`;
    orderSummary += `*Dirección:* ${orderDetails.address}\n`;
    orderSummary += `*Ciudad:* ${orderDetails.city}\n`;
    orderSummary += `*Departamento:* ${orderDetails.state}\n`;
    if(orderDetails.housingType) orderSummary += `*Tipo de Vivienda:* ${orderDetails.housingType}\n`;
    if(orderDetails.notes) orderSummary += `*Notas Adicionales:* ${orderDetails.notes}\n`;
    
    const whatsappUrl = `https://wa.me/573203393805?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCloseAttempt = () => {
    if (cart.length > 0) {
      if (window.confirm("¿Estás seguro de que quieres cerrar? Se perderá el progreso de tu pedido.")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const formIsSubmittable = useMemo(() => {
    return orderDetails.name.trim() && orderDetails.phone.trim() && orderDetails.address.trim() && orderDetails.city.trim() && orderDetails.state.trim();
  }, [orderDetails]);

  const inputClasses = "w-full p-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all";

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={handleCloseAttempt}
    >
      <div 
        className="checkout-modal-content bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg shadow-black/5 w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden transform scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scale-in 0.3s ease-out forwards' }}
      >
        <header className="p-4 border-b border-white/30 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">Tu Pedido</h2>
          <button onClick={handleCloseAttempt} className="text-gray-600 hover:text-gray-900 bg-white/30 rounded-full p-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Order Summary */}
                <div className="p-6 border-b md:border-b-0 md:border-r border-white/30">
                    <h3 className="text-xl font-semibold border-b border-gray-400/50 pb-2 mb-4">1. Resumen de tu Pedido</h3>
                    {cart.length > 0 ? (
                        <div className="space-y-4">
                            {cart.map(item => {
                                const product = allProducts.find(p => p.id === item.id);
                                return (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img src={product?.image} alt={item.name} className="w-16 h-16 object-contain rounded-md bg-white/40 p-1" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-600">${item.price.toLocaleString('es-CO')} c/u</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button type="button" onClick={() => handleQuantityChange(item.id, -1)} className="w-7 h-7 bg-white/40 hover:bg-white/60 rounded-full transition-colors text-lg flex items-center justify-center shadow-sm">-</button>
                                            <span className="w-6 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                                            <button type="button" onClick={() => handleQuantityChange(item.id, 1)} className="w-7 h-7 bg-white/40 hover:bg-white/60 rounded-full transition-colors text-lg flex items-center justify-center shadow-sm">+</button>
                                        </div>
                                    </div>
                                );
                            })}
                             <div className="text-right font-bold text-lg border-t border-gray-400/50 pt-3 mt-4">
                                Total: ${totalPrice.toLocaleString('es-CO')}
                            </div>
                        </div>
                    ) : <p className="text-gray-500 text-center py-4">Tu carrito está vacío.</p>}
                </div>
                
                {/* User Details */}
                <div className="p-6">
                    <h3 className="text-xl font-semibold border-b border-gray-400/50 pb-2 mb-4">2. Tus Datos para el Envío</h3>
                    <div className="space-y-4">
                        <input type="text" name="name" placeholder="Nombre Completo*" value={orderDetails.name} onChange={handleInputChange} required className={inputClasses}/>
                        <input type="tel" name="phone" placeholder="Teléfono de Contacto*" value={orderDetails.phone} onChange={handleInputChange} required className={inputClasses}/>
                        <input type="text" name="address" placeholder="Dirección*" value={orderDetails.address} onChange={handleInputChange} required className={inputClasses}/>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="city" placeholder="Ciudad*" value={orderDetails.city} onChange={handleInputChange} required className={inputClasses}/>
                            <input type="text" name="state" placeholder="Departamento*" value={orderDetails.state} onChange={handleInputChange} required className={inputClasses}/>
                        </div>
                        <select name="housingType" value={orderDetails.housingType} onChange={handleInputChange} className={`${inputClasses} ${!orderDetails.housingType ? 'text-gray-600' : 'text-gray-800'}`}>
                            <option value="">Tipo de Vivienda (Opcional)</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Conjunto Residencial">Conjunto Residencial</option>
                            <option value="Oficina">Oficina</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <textarea name="notes" placeholder="Notas adicionales (Ej: Torre 1, Apto 502)" value={orderDetails.notes} onChange={handleInputChange} className={`${inputClasses} h-20`}/>
                    </div>
                </div>
            </div>
        </form>

        {cart.length > 0 && (
            <footer className="p-4 border-t border-white/30 flex-shrink-0">
              <button type="submit" onClick={handleSubmit} disabled={!formIsSubmittable} className="w-full bg-green-600/80 text-white backdrop-blur-sm border border-green-500/50 font-bold py-3 px-4 rounded-lg hover:bg-green-600/100 transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg disabled:bg-gray-400/50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 disabled:border-gray-400">
                Confirmar Pedido por WhatsApp
              </button>
               <p className="text-xs text-center text-gray-600 mt-2">Serás redirigido a WhatsApp para enviar tu pedido a un asesor.</p>
            </footer>
        )}
      </div>
      <style>{`
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .checkout-modal-content::-webkit-scrollbar {
            width: 6px;
        }
        .checkout-modal-content::-webkit-scrollbar-track {
            background: transparent;
        }
        .checkout-modal-content::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
        }
        .checkout-modal-content::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.4);
        }
       `}</style>
    </div>
  );
};

export default CheckoutForm;