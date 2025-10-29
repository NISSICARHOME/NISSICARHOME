import React from 'react';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="mt-4">
        <h4 className="text-lg font-semibold text-amber-600 border-b border-gray-400/50 pb-1 mb-2">{title}</h4>
        <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
);

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative transition-transform duration-300 transform scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scale-in 0.3s ease-out forwards' }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 bg-white/30 rounded-full p-1 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.details.title || product.name}</h2>
            {product.details.brand && <p className="text-sm text-gray-500 mb-4">de {product.details.brand}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-md" />
                <div>
                     {product.details.content && <p className="text-lg font-bold text-amber-600">{product.details.content}</p>}
                    {(product.details.features && product.details.features.length > 0) && (
                        <div className="mt-4">
                            <ul className="space-y-2">
                                {product.details.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-sm text-gray-700">
                                        <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                     {(product.details.surfaces && product.details.surfaces.length > 0) && (
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-amber-600 mb-2">Superficies de aplicación:</h4>
                             <div className="flex flex-wrap gap-2">
                                {product.details.surfaces.map((surface, index) => (
                                    <span key={index} className="bg-white/40 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{surface}</span>
                                ))}
                            </div>
                        </div>
                    )}
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
       `}</style>
    </div>
  );
};

export default ProductModal;