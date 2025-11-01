import React from 'react';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="mt-3">
        <h4 className="text-base font-semibold text-amber-600 border-b border-gray-400/50 pb-1 mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">{title}</h4>
        <div className="text-black text-sm leading-relaxed">{children}</div>
    </div>
);

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="product-modal-content bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-lg shadow-black/5 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative transition-transform duration-300 transform scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scale-in 0.3s ease-out forwards' }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-white/30 rounded-full p-1 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 pr-8">{product.details.title || product.name}</h2>
            {product.details.brand && <p className="text-xs text-gray-500 mb-3">de {product.details.brand}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <img src={product.image} alt={product.name} className="w-full h-auto max-h-64 md:max-h-none object-contain rounded-md" />
                <div>
                     <p className="text-2xl font-bold text-amber-600 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">${product.price.toLocaleString('es-CO')}</p>
                     {product.details.content && <p className="text-sm font-semibold text-gray-600 ">{product.details.content}</p>}
                    {(product.details.features && product.details.features.length > 0) && (
                        <div className="mt-2">
                            <ul className="space-y-1">
                                {product.details.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-xs text-black">
                                        <svg className="flex-shrink-0 h-4 w-4 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                     {(product.details.surfaces && product.details.surfaces.length > 0) && (
                        <div className="mt-3">
                            <h4 className="text-sm font-semibold text-amber-600 mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">Superficies de aplicación:</h4>
                             <div className="flex flex-wrap gap-1">
                                {product.details.surfaces.map((surface, index) => (
                                    <span key={index} className="bg-white/40 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">{surface}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    <button 
                        onClick={() => {
                            onAddToCart(product);
                            onClose();
                        }}
                        className="mt-4 w-full bg-amber-500/80 text-white hover:bg-amber-500/100 backdrop-blur-sm border border-amber-400/50 font-bold py-3 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>

            <DetailSection title="Descripción">{product.details.description}</DetailSection>
            <DetailSection title="Modo de Uso">{product.details.howToUse}</DetailSection>
            <DetailSection title="Precauciones">{product.details.precautions}</DetailSection>
            <DetailSection title="Composición">{product.details.composition}</DetailSection>
            {product.details.barcode && <DetailSection title="Código de Barras">{product.details.barcode}</DetailSection>}
        </div>
      </div>
       <style>{`
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .product-modal-content::-webkit-scrollbar {
            width: 6px;
        }
        .product-modal-content::-webkit-scrollbar-track {
            background: transparent;
        }
        .product-modal-content::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .product-modal-content::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.7);
        }
       `}</style>
    </div>
  );
};

export default ProductModal;