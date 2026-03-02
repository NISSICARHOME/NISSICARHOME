import React, { useState, useMemo } from 'react';
import { CartItem, OrderDetails } from '../../types';
import { getAllProducts } from '../Products';

declare const fbq: (type: string, event: string, data?: object) => void;

// Mapping for kit images that might not be in the main products list
const kitImages: Record<string, string> = {
  'kit-vidrex-clarity': 'https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0',
  'kit-1': 'https://lh3.googleusercontent.com/pw/AP1GczOzc5XobmAERtALiliyk1JbpWK9TtlNYR-Gq8ho_9NrxGyhRPsDqNM-pw--dmicYoJ0_81bX_O_lzOKpZgscWtppJojH71Pg6PkQH4o-KcNy9eQKQ5Tb0jyUd6yAN_E_fQAB2JsWaoh-N5LdH_xss1_=w801-h584-s-no-gm?authuser=0',
  'kit-2': 'https://lh3.googleusercontent.com/pw/AP1GczPOSFnFflE6hcsTtHPybBLPUfECVYU5rzmbCHYRlWK8KomBZvI4N_SVy_knMkpVVRf7lUQ7jdtf3I1thYkuVCyIlqyy1n1Ws34eahtILybAJVbqxTBWECpEFzjcbt8co6QbWA-7F9lKGZmXw26CK57k=w777-h798-s-no-gm?authuser=0',
  'kit-vidrex-clarity-wash': 'https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0'
};

interface CheckoutFormProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  viewedProductIds?: string[];
  lastAddedProductId?: string | null;
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, setCart, viewedProductIds = [], lastAddedProductId, onClose }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    name: '', phone: '', address: '', city: '', state: '', housingType: '', notes: ''
  });
  
  const [showDiscountAlert, setShowDiscountAlert] = useState(false);
  
  const allProducts = useMemo(() => getAllProducts(), []);

  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  // Identify the primary item for dynamic UI (last added or first kit or first item)
  const primaryItem = useMemo(() => {
    if (cart.length === 0) return null;
    
    // If we have a specific last added product, prioritize it
    if (lastAddedProductId) {
        const item = cart.find(i => i.id === lastAddedProductId);
        if (item) return item;
    }
    
    // Fallback: prioritize kits, then first item
    const kit = cart.find(item => item.id.includes('kit'));
    return kit || cart[0];
  }, [cart, lastAddedProductId]);

  const primaryImage = useMemo(() => {
    if (!primaryItem) return '';
    const product = allProducts.find(p => p.id === primaryItem.id);
    return product?.image || kitImages[primaryItem.id] || '';
  }, [primaryItem, allProducts]);

  // Dynamic suggestions based on viewed products and cart content
  const suggestions = useMemo(() => {
    const cartIds = new Set(cart.map(item => item.id));
    
    // Priority 1: Viewed products not in cart
    const viewedSuggestions = viewedProductIds
      .filter(id => !cartIds.has(id))
      .map(id => allProducts.find(p => p.id === id))
      .filter((p): p is NonNullable<typeof p> => !!p);

    // Priority 2: Complementary products (if they have a kit, suggest accessories)
    const hasKit = cart.some(item => item.id.includes('kit'));
    const complementaryIds = hasKit ? ['prod-toalla', 'prod-aplicador', 'prod-shampoo'] : ['prod-toalla', 'prod-hyper-diamond'];
    
    const complementarySuggestions = complementaryIds
      .filter(id => !cartIds.has(id) && !viewedProductIds.includes(id))
      .map(id => allProducts.find(p => p.id === id))
      .filter((p): p is NonNullable<typeof p> => !!p);

    // Combine and limit to 3-4 suggestions
    return [...viewedSuggestions, ...complementarySuggestions].slice(0, 4);
  }, [cart, viewedProductIds, allProducts]);

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

    if (typeof fbq === 'function') {
        const content_ids = cart.map(item => item.id);
        const num_items = cart.reduce((sum, item) => sum + item.quantity, 0);
        fbq('track', 'Purchase', {
            content_ids: content_ids,
            currency: 'COP',
            value: totalPrice,
            num_items: num_items
        });
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
    if (cart.length > 0 && !showDiscountAlert) {
      setShowDiscountAlert(true);
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
                    
                    {/* Featured Product/Kit Image */}
                    {primaryImage && (
                        <div className="mb-6 rounded-xl overflow-hidden bg-white/40 p-2 border border-white/50 shadow-inner">
                            <img 
                                src={primaryImage} 
                                alt={primaryItem?.name} 
                                className="w-full h-32 object-contain drop-shadow-md"
                            />
                        </div>
                    )}

                    {cart.length > 0 ? (
                        <div className="space-y-4">
                            {cart.map(item => {
                                const product = allProducts.find(p => p.id === item.id);
                                const displayImage = product?.image || kitImages[item.id] || '';
                                
                                return (
                                    <div key={item.id} className="flex items-center gap-4 bg-white/40 p-3 rounded-xl border border-white/60 shadow-sm transition-all hover:shadow-md">
                                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg p-1 shadow-inner flex items-center justify-center overflow-hidden">
                                            <img src={displayImage} alt={item.name} className="w-full h-full object-contain drop-shadow-sm" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-black text-sm md:text-base text-gray-900 leading-tight uppercase tracking-tight">{item.name}</p>
                                            <p className="text-sm text-green-700 font-bold mt-1">${item.price.toLocaleString('es-CO')} c/u</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button type="button" onClick={() => handleQuantityChange(item.id, -1)} className="w-7 h-7 bg-white/40 hover:bg-white/60 rounded-full transition-colors text-lg flex items-center justify-center shadow-sm">-</button>
                                            <span className="w-6 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                                            <button type="button" onClick={() => handleQuantityChange(item.id, 1)} className="w-7 h-7 bg-white/40 hover:bg-white/60 rounded-full transition-colors text-lg flex items-center justify-center shadow-sm">+</button>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Upsell Section: Dynamic Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="mt-8 p-4 bg-amber-50/50 rounded-2xl border-2 border-dashed border-amber-200">
                                    <h4 className="text-sm font-black text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        Complementa tu Pedido
                                    </h4>
                                    <div className="space-y-3">
                                        {suggestions.map(product => (
                                            <div key={product.id} className="flex items-center gap-4 bg-white/60 p-3 rounded-xl border border-white shadow-sm transition-all hover:bg-white/80">
                                                <div className="w-14 h-14 flex-shrink-0 bg-white rounded-lg p-1 shadow-inner flex items-center justify-center overflow-hidden">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold text-[10px] md:text-xs text-gray-900 leading-tight">{product.name}</p>
                                                    <p className="text-[10px] text-amber-700 font-black mt-0.5">${product.price.toLocaleString('es-CO')}</p>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => {
                                                        setCart(prev => [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
                                                    }}
                                                    className="bg-amber-500 text-white text-[9px] font-black px-3 py-1.5 rounded-lg shadow-md hover:bg-amber-600 transition-all active:scale-95 uppercase tracking-tighter"
                                                >
                                                    Agregar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] text-amber-600 font-bold mt-3 text-center italic tracking-tight">"Aprovecha y lleva todo en un solo envío"</p>
                                </div>
                            )}

                             <div className="text-right font-black text-xl border-t-2 border-gray-200 pt-4 mt-6 text-gray-900">
                                Total a Pagar: ${totalPrice.toLocaleString('es-CO')}
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

        {/* Discount Alert Modal */}
        {showDiscountAlert && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[60] p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transform scale-95 animate-scale-in">
              <div className="mb-6">
                <img 
                  src={primaryImage} 
                  alt={primaryItem?.name} 
                  className="w-48 h-48 mx-auto object-contain drop-shadow-xl"
                />
              </div>
              <h2 className="text-3xl font-black text-red-600 mb-2 tracking-tight uppercase">¡ESPERA!</h2>
              <p className="text-xl font-bold text-gray-800 mb-4">No te vayas sin tu beneficio especial en tu {primaryItem?.name}</p>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-4 mb-6">
                <p className="text-2xl font-black text-gray-900">10% DE DESCUENTO</p>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Si completas tu pedido ahora mismo</p>
              </div>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setShowDiscountAlert(false)}
                  className="w-full bg-green-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 text-lg uppercase tracking-tight"
                >
                  ¡SÍ, QUIERO MI DESCUENTO!
                </button>
                <button 
                  onClick={onClose}
                  className="w-full bg-gray-200 text-gray-600 font-black py-4 rounded-2xl hover:bg-gray-300 transition-all mb-20 uppercase text-sm tracking-widest border-2 border-gray-300 shadow-sm"
                >
                  No Gracias
                </button>
              </div>
            </div>
          </div>
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