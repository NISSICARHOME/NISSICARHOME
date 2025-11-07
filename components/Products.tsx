import React, { useMemo } from 'react';
import { Product, ActiveFilters } from '../types';
import ProductCarousel from './ProductCarousel';

const productsData: Product[] = [
  {
    id: 'prod-vidrex',
    name: 'VIDREX Bloqueador de Manchas',
    price: 25000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMtiRvcWH7hX10fMo5IPK4tcUy6Fb9wStoN0ftTN-922XVKHbmAZIrmlMVjA8zY7vtwAM8QCwwmKBTAgaVxmDhnTsYiULO0HrjcWRemE2MStowsWe7AESE_JOeCsNQ_lfSGtEsHYkmsQR-trE53KaFV=w661-h991-s-no-gm?authuser=0',
    shortDesc: 'Gel de rápido efecto para eliminar manchas en vidrios, acrílico, aluminio y cromo.',
    category: 'Limpieza Profunda',
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
    id: 'prod-clarity',
    name: 'Clarity Wash',
    price: 35000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczN7SItDwQo-iusQyZ3VRyk07V5fgirL3EjHV2kCnlv0_Ds3BxBF6Es6UySi5dkslDK7iDMb7ziWDdhNcISf7dZfEtJqUHaA0dfLwPQpIm0FtLFwx8p4bnbYzP3l8KU68p0EgLNwbJRtSaXzZO4pYlAV=w1040-h800-s-no-gm?authuser=0',
    shortDesc: 'Desmancha vidrios, elimina tallones en pintura y desmancha farolas externamente.',
    category: 'Pulido',
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
    id: 'prod-hyper-diamond',
    name: 'Cera Hyper Diamond',
    price: 45000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczN-zXHr14d1RfpvNWQ9Zn6Y1vdjBlCgnsiDyT57kpTfA81-h5eZtRvzJmEPvxDcbGw5IBYvDqMEhlwuq7W6VpM7E-z3xtq6QOjAZN0tYTtQtIoGklEpD9Iufe8YT9ajvLN7jX8LUHoewgAhTKf64xRX=w1040-h800-s-no-gm?authuser=0',
    shortDesc: 'Cera con nanotecnología para ultra protección e hiper brillo en la pintura de tu vehículo.',
    category: 'Protección',
    details: {
      title: 'CERA HYPER DIAMOND CON CARNAUBA',
      brand: 'ECOCLEAR nanotechnology',
      content: '220 G',
      features: ['Resultados Inmediatos', 'Máxima Protección', 'Hiper Brillo'],
      description: 'Esta composición contiene polímeros con nanotecnología especializados en ultra protección e hiper brillo para la pintura de tu vehículo.',
      howToUse: 'Aplique la cera hyperdiamond sobre la pintura que desea blindar, con un aplicador de espuma esparza el producto por secciones. Luego retire con máquina pulidora o con toalla de microfibra para dar el acabado.',
      precautions: 'Mantener fuera del alcance de los niños, si entra en contacto con los ojos, lave con abundante agua, en caso de ingerir acuda a su médico.',
      composition: 'Monóxido de dihidrógeno, polímeros naturais, emulsión hidrofóbica, pigmento sintético, esencia ambientada.'
    }
  },
  {
    id: 'prod-llantix',
    name: 'Perfect Llantix',
    price: 20000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOjiJJeZc6HIutbfWKJGXISSyYp6uFOXne3E4Bxw8mZijJQzpOBRpjiyvtjQi4tw0SZ2Bg6aT5bjQ559BIZ4UO1DXvcZMjqXGHDQaAsGvyDdphGMwjNdb8QM0AKlue18DUnkhu6IjMw6Z9q3H5BVFW0=w1080-h800-s-no-gm?authuser=0',
    shortDesc: 'Fórmula para un excelente brillo y un acabado definido que protege la superficie de las llantas.',
    category: 'Acabado',
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
    id: 'prod-perfume-iq',
    name: 'Perfume para Auto IQ 250',
    price: 15000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0',
    shortDesc: 'Aroma con mayor duración para restablecer la armonía de tu cuerpo y mente mientras conduces.',
    category: 'Accesorios',
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
    id: 'prod-restorer',
    name: 'Ultra Restorer',
    price: 28000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczN4wvAxjKsz_jeB8jpHUVAbL7aeEqGSpXjqjbWbyapjHRzrU54da2aT8lFBEtDIvAfP4Hj7TL8MMkdNivvoS5L0M6CzftY_g8nwRtX6fPBm6arqinMCSNrYQQcWxiAkCKR5zD60S_HNhq7iCLfBNumL=w1080-h800-s-no-gm?authuser=0',
    shortDesc: 'Restaura piezas plásticas grises y negras, devolviendo un acabado perfecto con ultra protección.',
    category: 'Restauración',
    details: {
      features: ['Fácil Aplicación', 'Super Recubrimiento', 'Ultra Protección'],
      description: 'Restaura piezas plásticas grises y negras. Como llantas, plástico y material sintético dando un acabado perfecto con ultra protección a la superficie.',
      howToUse: 'Agítese antes de usar, limpiar previamente la superficie con agua y jabón para eliminar residuos; Aplique el producto con una espuma las veces que sea necesario hasta lograr el resultado deseado.',
      precautions: 'Mantener fuera del alcance de los niños, si entra en contacto con los ojos enjuague con abundante agua, en caso de ingestión acuda a su médico.',
      composition: 'Monóxido de dihidrógeno, aceites hidrantes, cera vegetal, preservante, color y fragancia.'
    }
  },
  {
    id: 'prod-rayones-cero',
    name: 'RAYONES-CERO Eliminador de rayones',
    price: 30000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOk00JOL8Il_ZxU7w1AhMjKM8S0GxAQJqVhGp2osNYpOVQSu4b4sYdi9d6RHiLDfbo4bDU04WreZ-a5hBq8X8ZnZy8dmXPmn8rI0DkHMZf0y6wNn8usimpnql8u93xjg__FAYTBSzEwvv8oNGg_oJW9=w1184-h864-s-no-gm?authuser=0',
    shortDesc: 'Fórmula avanzada para corregir pequeños arañazos en la pintura de tu vehículo.',
    category: 'Pulido',
    details: {
      description: 'Fórmula avanzada diseñada para corregir y disimular eficazmente pequeños arañazos y marcas superficiales en la pintura de tu vehículo, devolviéndole su acabado original.',
      howToUse: 'Limpie y seque la superficie. Aplique una pequeña cantidad sobre un aplicador de microfibra y frote con movimientos circulares sobre el rayón. Retire el exceso con una toalla de microfibra limpia.',
      precautions: 'Probar en un área poco visible antes de la aplicación completa. Mantener fuera del alcance de los niños.',
      composition: 'Compuestos pulidores de micro-abrasión, polímeros y solventes especializados.'
    }
  },
  {
    id: 'prod-shampoo',
    name: 'Shampoo PH Neutro',
    price: 22000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0',
    shortDesc: 'Limpieza suave y segura para todas las superficies de tu vehículo, sin dañar ceras o selladores.',
    category: 'Limpieza General',
    details: {
      description: 'Un shampoo de pH neutro que produce una espuma densa para encapsular y levantar la suciedad de manera segura, evitando rayones y protegiendo los tratamientos existentes en la pintura.',
      howToUse: 'Diluir la cantidad recomendada en un balde con agua. Aplicar con una esponja o guante de microfibra sobre la superficie del vehículo. Enjuagar con abundante agua y secar.',
      precautions: 'No dejar que el producto se seque sobre la superficie. Usar sobre superficies frías y a la sombra.',
      composition: 'Agentes tensoactivos, polímeros lubricantes, suavizantes de agua, conservantes y fragancia.'
    }
  },
  {
    id: 'prod-aplicador',
    name: 'Aplicador Media Luna',
    price: 8000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0',
    shortDesc: 'Espuma de densidad blanda y estructura absorbente, ideal para ceras y selladores.',
    category: 'Accesorios',
    details: {
      description: 'Espuma de densidad blanda y estructura absorbente, ideal para ceras y selladores. Su diseño ergonómico facilita la aplicación uniforme de productos en diversas superficies.',
      howToUse: 'Aplique el producto deseado (cera, sellador, etc.) sobre el aplicador. Distribuya uniformemente sobre la superficie con movimientos circulares o rectos según la recomendación del producto. Lavar después de cada uso.',
      precautions: 'Mantener limpio y seco cuando no esté en uso para prolongar su vida útil.',
      composition: 'Espuma de poliuretano de alta densidad.'
    }
  },
  {
    id: 'prod-toalla',
    name: 'Toalla de Microfibra',
    price: 12000,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0',
    shortDesc: 'Ultra suave y absorbente, esencial para retirar ceras y secar sin dejar rayones.',
    category: 'Accesorios',
    details: {
      description: 'Toalla de microfibra de alta calidad, ultra suave y absorbente. Esencial para retirar ceras, selladores y para el secado del vehículo sin dejar marcas o rayones.',
      howToUse: 'Utilizar seca para retirar residuos de cera o pulimento. Utilizar húmeda para limpieza general o seca para el secado final del vehículo. Lavar con detergentes neutros y no usar suavizantes.',
      precautions: 'Lavar por separado para evitar que atrape pelusa de otras prendas. No usar cloro ni suavizantes.',
      composition: '80% Poliéster, 20% Poliamida.'
    }
  }
];

export const getAllProducts = () => productsData;


interface ProductCardProps {
    product: Product;
    onSelect: () => void;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => (
  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex flex-col group relative hover:z-10">
    <div className="cursor-pointer" onClick={onSelect}>
        <img src={product.image} alt={product.name} className="w-full h-56 object-contain p-4 group-hover:scale-125 transition-transform duration-500" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm flex-grow">{product.shortDesc}</p>
      <p className="text-lg font-bold text-gray-800 mt-2">${product.price.toLocaleString('es-CO')}</p>
      <div className="mt-4 flex gap-2">
        <button 
            onClick={onSelect} 
            className="flex-1 bg-white/40 text-gray-800 hover:bg-white/60 backdrop-blur-sm border border-white/50 font-bold py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
        >
            Detalles
        </button>
        <button 
            onClick={() => onAddToCart(product)} 
            className="flex-1 bg-amber-500/80 text-white hover:bg-amber-500/100 backdrop-blur-sm border border-amber-400/50 font-bold py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg"
        >
            Añadir
        </button>
      </div>
    </div>
  </div>
);

interface ProductsProps {
    onAddToCart: (product: Product) => void;
    searchTerm: string;
    activeFilters: ActiveFilters;
    onProductSelect: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart, searchTerm, activeFilters, onProductSelect }) => {

  const filteredProducts = useMemo(() => {
    return productsData
      .filter(product => {
        // Search term filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Category filter
        const matchesCategory = activeFilters.categories.length === 0 || activeFilters.categories.includes(product.category);

        // Price range filter
        const matchesPrice = product.price >= activeFilters.priceRange.min && product.price <= activeFilters.priceRange.max;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (activeFilters.sortOrder) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [searchTerm, activeFilters]);

  return (
    <>
      <section className="py-10">
        <ProductCarousel products={productsData} onProductSelect={onProductSelect} />
      </section>

      <section id="productos" className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl shadow-neumorphic-outset">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                Nuestros Productos Esenciales
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                Una línea completa para el cuidado de tu vehículo y hogar, formulada con materias primas de vanguardia.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={() => onProductSelect(product)} onAddToCart={onAddToCart} />
              ))}
            </div>
             {filteredProducts.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <h3 className="text-2xl font-semibold text-gray-700">No se encontraron productos</h3>
                    <p className="text-gray-500 mt-2">Intenta ajustar tu búsqueda o filtros.</p>
                </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;