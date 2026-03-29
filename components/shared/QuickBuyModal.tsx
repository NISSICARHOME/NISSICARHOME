
import React, { useState } from 'react';
import { Product } from '../../types';

interface QuickBuyModalProps {
  product: Product;
  onClose: () => void;
  onAddToCartAndCheckout: (product: Product) => void;
  onViewDetails: () => void;
}

const QuickBuyModal: React.FC<QuickBuyModalProps> = ({ product, onClose, onAddToCartAndCheckout, onViewDetails }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handlePrimaryAction = () => {
    setIsAdding(true);
    // Simulate processing delay for visual feedback
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      
      // Wait a moment to show the "Check" mark before redirecting
      setTimeout(() => {
        onAddToCartAndCheckout(product);
      }, 600);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-end sm:items-center pointer-events-none"
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out pointer-events-auto"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full sm:w-[28rem] bg-white/95 backdrop-blur-xl shadow-2xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 transform transition-all duration-300 ease-out animate-slide-up sm:animate-scale-in pointer-events-auto border border-white/50">
        
        {/* Handle bar for mobile affordance */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden"></div>

        <div className="flex gap-5 mb-8">
            <div className="w-24 h-24 flex-shrink-0 bg-white rounded-xl p-2 shadow-md border border-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain" 
                />
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-lg font-extrabold text-gray-800 leading-tight mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-2xl font-bold text-amber-600">
                    ${product.price.toLocaleString('es-CO')}
                </p>
            </div>
        </div>

        <div className="space-y-3">
            {/* Primary Action: Add & Checkout */}
            <button
                onClick={handlePrimaryAction}
                disabled={isAdding || isAdded}
                className={`w-full py-4 rounded-xl font-extrabold text-lg shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2
                    ${isAdded 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#F77F00] text-white hover:bg-amber-600 hover:shadow-amber-500/30'
                    }
                `}
            >
                {isAdding ? (
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : isAdded ? (
                    <>
                        Agregado <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        AGREGAR AL CARRITO
                    </>
                )}
            </button>

            {/* Secondary Action: Keep Shopping */}
            <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
                🛍️ SEGUIR COMPRANDO
            </button>
        </div>

        <div className="mt-6 text-center border-t border-gray-200 pt-4">
            <button 
                onClick={onViewDetails}
                className="text-sm text-amber-600 underline hover:text-amber-700 font-medium"
            >
                Ver detalles completos del producto
            </button>
        </div>

      </div>
    </div>
  );
};

export default QuickBuyModal;
