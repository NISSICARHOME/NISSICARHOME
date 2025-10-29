import React, { useState } from 'react';
import { Product } from '../types';
import ProductModal from './shared/ProductModal';

const productsData: Product[] = [
  {
    name: 'VIDREX Bloqueador de Manchas',
    image: 'https://picsum.photos/seed/vidrex/500/500',
    shortDesc: 'Gel de rápido efecto para eliminar manchas en vidrios, acrílico, aluminio y cromo.',
    details: {
      content: '120 ML',
      features: ['Fácil de Aplicar', 'Acción Inmediata'],
      surfaces: ['Vidrios', 'Acrílico', 'Aluminio', 'Cromo'],
      description: 'Gel de rápido efecto para eliminar manchas en las superficies.',
      howToUse: 'Usar guantes, colocar de 30 a 40 gotas en el mismo aplicador que usamos para la crema CLARITY WASH y sobre el mismo cuadrado de 15x15cm seguimos estregando hasta sentir limpia la superficie o por 50 seg. Retiramos el exceso del producto con toalla limpia y seca, toalla de cocina. NOTA: todo se hace en seco hasta desmanchar la superficie, después que toda el área está desmanchada, enjuagar. NO APLICAR EN FAROLAS O PINTURA.',
      precautions: 'Mantener fuera del alcance de los niños. Si entra en contacto con los ojos, enjuague con abundante agua. En caso de ingerir acuda a su médico.',
      composition: 'Monóxido de dihidrogeno, desincrustante, preservante, color y fragancia.'
    }
  },
  {
    name: 'Clarity Wash',
    image: 'https://picsum.photos/seed/clarity/500/500',
    shortDesc: 'Desmancha vidrios, elimina tallones en pintura y desmancha farolas externamente.',
    details: {
      content: '300Gr',
      features: ['Desaparece depósitos de minerales', 'Suprime manchas en acrílico', 'Elimina moho y hongos', 'Mejor precio 100% garantizado'],
      description: 'Desmancha los vidrios devolviendo el brillo, permitiendo una visualización clara; elimina tallones en la pintura y desmancha las farolas externamente.',
      howToUse: 'Aplique el producto a la zona que desee tratar. Frote el GLASS POLISHER uniformemente por secciones. Si el producto se seca hidrátelo con agua las veces que desee hasta lograr el resultado deseado.',
      precautions: 'Mantener fuera del alcance de los niños. Si entra en contacto con los ojos enjuague con abundante agua. En caso de ingerir acuda a su médico.',
      composition: 'Monóxido de dihidrógeno, antiempañante, desengrasante, preservante, color y fragancia.',
      barcode: '7708329910354'
    }
  },
  {
    name: 'Cera Hyper Diamond',
    image: 'https://picsum.photos/seed/diamond/500/500',
    shortDesc: 'Cera con nanotecnología para ultra protección e hiper brillo en la pintura de tu vehículo.',
    details: {
      title: 'CERA HYPER DIAMOND CON CARNAUBA',
      brand: 'ECOCLEAR nanotechnology',
      content: '220 G',
      features: ['Resultados Inmediatos', 'Máxima Protección', 'Hiper Brillo'],
      description: 'Esta composición contiene polímeros con nanotecnología especializados en ultra protección e hiper brillo para la pintura de tu vehículo.',
      howToUse: 'Aplique la cera hyperdiamond sobre la pintura que desea blindar, con un aplicador de espuma esparza el producto por secciones. Luego retire con máquina pulidora o con toalla de microfibra para dar el acabado.',
      precautions: 'Mantener fuera del alcance de los niños, si entra en contacto con los ojos, lave con abundante agua, en caso de ingerir acuda a su médico.',
      composition: 'Monóxido de dihidrógeno, polímeros naturales, emulsión hidrofóbica, pigmento sintético, esencia ambientada.'
    }
  },
  {
    name: 'Perfect Llantix',
    image: 'https://picsum.photos/seed/llantix/500/500',
    shortDesc: 'Fórmula para un excelente brillo y un acabado definido que protege la superficie de las llantas.',
    details: {
      content: '250 ml',
      description: 'Esta fórmula de un excelente brillo, un acabado definido que protege la superficie.',
      howToUse: 'Agite antes de usar, aplique directamente sobre la superficie y frote con una espuma para lograr un buen acabado.',
      precautions: 'Mantener fuera del alcance de los niños. si entra en contacto con los ojos enjuague con abundante agua, en caso de ingestión acuda a su médico.',
      composition: 'Agua, goma hidratante, filtro UV, cera carnauba, polímero, propilenglicol, color y fragancia.',
      barcode: '7708329918897'
    }
  },
  {
    name: 'Perfume para Auto IQ 250',
    image: 'https://picsum.photos/seed/perfume/500/500',
    shortDesc: 'Aroma con mayor duración para restablecer la armonía de tu cuerpo y mente mientras conduces.',
    details: {
      title: 'IQ 250 - 300 LOCIÓN',
      content: '60ML',
      description: 'Disfruta de un aroma con mayor duración para restablecer la armonía de tu cuerpo y mente mientras conduces.',
      howToUse: 'Agite antes de usar, active el spray para disfrutar de una fragancia agradable de larga duración.',
      precautions: 'Mantener fuera del alcance de los niños. Si entra en contacto con los ojos, enjuague con abundante agua. En caso de ingerir acuda a su médico.',
      composition: 'Aceite Esencial'
    }
  },
  {
    name: 'Ultra Restorer',
    image: 'https://picsum.photos/seed/restorer/500/500',
    shortDesc: 'Restaura piezas plásticas grises y negras, devolviendo un acabado perfecto con ultra protección.',
    details: {
      features: ['Fácil Aplicación', 'Super Recubrimiento', 'Ultra Protección'],
      description: 'Restaura piezas plásticas grises y negras. Como llantas, plástico y material sintético dando un acabado perfecto con ultra protección a la superficie.',
      howToUse: 'Agítese antes de usar, limpiar previamente la superficie con agua y jabón para eliminar residuos; Aplique el producto con una espuma las veces que sea necesario hasta lograr el resultado deseado.',
      precautions: 'Mantener fuera del alcance de los niños, si entra en contacto con los ojos enjuague con abundante agua, en caso de ingestión acuda a su médico.',
      composition: 'Monóxido de dihidrógeno, aceites hidrantes, cera vegetal, preservante, color y fragancia.'
    }
  },
  {
    name: 'Cero Eliminador de Rayones',
    image: 'https://picsum.photos/seed/rayones/500/500',
    shortDesc: 'Fórmula avanzada para corregir pequeños arañazos en la pintura de tu vehículo.',
    details: {
      description: 'Fórmula avanzada diseñada para corregir y disimular eficazmente pequeños arañazos y marcas superficiales en la pintura de tu vehículo, devolviéndole su acabado original.',
      howToUse: 'Limpie y seque la superficie. Aplique una pequeña cantidad sobre un aplicador de microfibra y frote con movimientos circulares sobre el rayón. Retire el exceso con una toalla de microfibra limpia.',
      precautions: 'Probar en un área poco visible antes de la aplicación completa. Mantener fuera del alcance de los niños.',
      composition: 'Compuestos pulidores de micro-abrasión, polímeros y solventes especializados.'
    }
  },
  {
    name: 'Shampoo PH Neutro',
    image: 'https://picsum.photos/seed/shampoo/500/500',
    shortDesc: 'Limpieza suave y segura para todas las superficies de tu vehículo, sin dañar ceras o selladores.',
    details: {
      description: 'Un shampoo de pH neutro que produce una espuma densa para encapsular y levantar la suciedad de manera segura, evitando rayones y protegiendo los tratamientos existentes en la pintura.',
      howToUse: 'Diluir la cantidad recomendada en un balde con agua. Aplicar con una esponja o guante de microfibra sobre la superficie del vehículo. Enjuagar con abundante agua y secar.',
      precautions: 'No dejar que el producto se seque sobre la superficie. Usar sobre superficies frías y a la sombra.',
      composition: 'Agentes tensoactivos, polímeros lubricantes, suavizantes de agua, conservantes y fragancia.'
    }
  }
];

const ProductCard: React.FC<{ product: Product; onSelect: () => void }> = ({ product, onSelect }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
    <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
      <p className="text-gray-400 text-sm flex-grow">{product.shortDesc}</p>
      <button 
        onClick={onSelect} 
        className="mt-4 bg-amber-500 text-gray-900 hover:bg-amber-400 font-bold py-2 px-4 rounded-lg transition-colors duration-300 w-full"
      >
        Ver Detalles
      </button>
    </div>
  </div>
);

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="productos" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Nuestros Productos Esenciales
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Una línea completa para el cuidado de tu vehículo y hogar, formulada con materias primas de vanguardia.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsData.map((product) => (
            <ProductCard key={product.name} product={product} onSelect={() => setSelectedProduct(product)} />
          ))}
        </div>
      </div>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
};

export default Products;
