import React, { useState, useMemo } from 'react';
import { ActiveFilters } from '../types';
import { getAllProducts } from './Products';

interface FiltersProps {
  activeFilters: ActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
}

const FilterIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    </svg>
);

const Filters: React.FC<FiltersProps> = ({ activeFilters, setActiveFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { categories, minPrice, maxPrice } = useMemo(() => {
    const products = getAllProducts();
    const allCategories = [...new Set(products.map(p => p.category))];
    const prices = products.map(p => p.price);
    return {
      categories: allCategories,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setActiveFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: newCategories };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActiveFilters(prev => ({
        ...prev,
        priceRange: {
            ...prev.priceRange,
            [name]: value ? parseInt(value, 10) : (name === 'min' ? 0 : Infinity)
        }
    }));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveFilters(prev => ({...prev, sortOrder: e.target.value}));
  };

  const resetFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: { min: 0, max: Infinity },
      sortOrder: 'default'
    });
  };
  
  const activeFilterCount = activeFilters.categories.length + 
                            (activeFilters.priceRange.min > 0 ? 1 : 0) + 
                            (activeFilters.priceRange.max < Infinity ? 1 : 0) +
                            (activeFilters.sortOrder !== 'default' ? 1 : 0);


  return (
    <section className="py-6 bg-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-4 rounded-2xl shadow-neumorphic-outset">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-lg font-semibold text-gray-700"
          >
            <div className="flex items-center gap-2">
                <FilterIcon className="w-6 h-6" />
                <span>Filtros y Orden</span>
                {activeFilterCount > 0 && (
                    <span className="bg-amber-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                    </span>
                )}
            </div>
            <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/50">
                    
                    {/* Categories */}
                    <div>
                        <h4 className="font-bold mb-3">Categorías</h4>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <label key={category} className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={activeFilters.categories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                    />
                                    <span className="ml-3 text-gray-700">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price and Sort */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold mb-3">Rango de Precio</h4>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    name="min"
                                    placeholder={`Min ($${minPrice.toLocaleString('es-CO')})`}
                                    value={activeFilters.priceRange.min > 0 ? activeFilters.priceRange.min : ''}
                                    onChange={handlePriceChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                                <span>-</span>
                                <input 
                                    type="number"
                                    name="max"
                                    placeholder={`Max ($${maxPrice.toLocaleString('es-CO')})`}
                                    value={activeFilters.priceRange.max < Infinity ? activeFilters.priceRange.max : ''}
                                    onChange={handlePriceChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">Ordenar Por</h4>
                             <select value={activeFilters.sortOrder} onChange={handleSortChange} className="w-full p-2 border rounded-lg bg-white">
                                <option value="default">Relevancia</option>
                                <option value="price-asc">Precio: Menor a Mayor</option>
                                <option value="price-desc">Precio: Mayor a Menor</option>
                                <option value="name-asc">Nombre: A-Z</option>
                                <option value="name-desc">Nombre: Z-A</option>
                            </select>
                        </div>
                    </div>

                </div>
                {activeFilterCount > 0 && (
                     <div className="mt-6 pt-4 border-t border-white/50 text-right">
                        <button onClick={resetFilters} className="bg-white/40 text-gray-800 hover:bg-white/60 backdrop-blur-sm border border-white/50 font-bold py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg">
                            Limpiar Filtros
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
