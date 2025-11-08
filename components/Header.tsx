import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product } from '../types';

const Logo = () => (
    <img 
        src="https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=w1344-h768-s-no-gm?authuser=0" 
        alt="Nissi Car Home Logo" 
        className="h-12 md:h-32 object-contain transition-all duration-500 ease-in-out filter drop-shadow-lg hover:scale-110 hover:brightness-125 hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
    />
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick: () => void; className?: string; }> = ({ href, children, onClick, className = '' }) => (
  <a href={href} onClick={onClick} className={`block text-gray-700 rounded-lg transition-colors duration-300 font-semibold ${className}`}>
    {children}
  </a>
);

const ShoppingCartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface SearchResultsProps {
    searchTerm: string;
    products: Product[];
    onSelect: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, products, onSelect }) => {
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return [];
        return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, products]);

    if (filteredProducts.length === 0) {
        return (
            <div className="absolute top-full mt-2 w-full bg-white/80 backdrop-blur-lg border border-white/50 rounded-lg shadow-lg p-4 text-center text-gray-600 z-20">
                No se encontraron productos.
            </div>
        );
    }
    
    return (
        <div className="absolute top-full mt-2 w-full bg-white/80 backdrop-blur-lg border border-white/50 rounded-lg shadow-lg max-h-80 overflow-y-auto z-20">
            <ul className="divide-y divide-white/30">
                {filteredProducts.map(product => (
                    <li key={product.id}>
                        <button 
                            onClick={() => onSelect(product)}
                            className="w-full flex items-center gap-4 p-3 text-left hover:bg-white/50 transition-colors"
                        >
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-contain flex-shrink-0 rounded-md bg-white p-1" />
                            <div className="flex-grow">
                                <p className="font-semibold text-sm text-gray-800">{product.name}</p>
                                <p className="text-xs text-amber-700 font-bold">${product.price.toLocaleString('es-CO')}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    allProducts: Product[];
    onProductSelect: (product: Product) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, searchTerm, onSearchChange, allProducts, onProductSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);


  const navItems = [
    { href: '#/', label: 'Inicio' },
    { href: '#productos', label: 'Productos' },
    { href: '#kits', label: 'Kits' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contacto', label: 'Contacto' },
  ];
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the navbar
        setIsVisible(false);
        setIsOpen(false);
      } else { // if scroll up show the navbar
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const isClickInsideDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(event.target as Node);
        const isClickInsideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(event.target as Node);

        if (!isClickInsideDesktop && !isClickInsideMobile) {
            setSearchFocused(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProductSelectFromSearch = (product: Product) => {
    onProductSelect(product);
    onSearchChange(''); // Clear search term
    setSearchFocused(false); // Hide results
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <header className={`bg-white/20 backdrop-blur-md sticky top-0 z-40 border-b border-white/30 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2 md:p-4">
        <a href="#/" onClick={handleLinkClick} className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-3">
            <div 
              ref={desktopSearchRef}
              className="relative hidden md:block"
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Buscar productos..."
                    className="w-full p-2 pl-4 pr-4 rounded-lg bg-white/30 border border-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300 sm:w-64"
                />
                {(isSearchFocused && searchTerm) && (
                    <SearchResults 
                        searchTerm={searchTerm}
                        products={allProducts}
                        onSelect={handleProductSelectFromSearch}
                    />
                )}
            </div>
            <button 
              onClick={onCartClick} 
              className="relative p-2 text-gray-600 rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Ver carrito"
            >
                <ShoppingCartIcon />
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                        {cartItemCount}
                    </span>
                )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
        </div>
        <div className="hidden w-full md:block md:w-auto md:order-1" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white/20 rounded-lg bg-white/20 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            {navItems.map(item => (
              <li key={item.href}>
                <NavLink href={item.href} onClick={handleLinkClick} className="py-2 px-3 hover:bg-white/20 md:hover:bg-transparent md:border-0 md:hover:text-amber-500 md:p-0">{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

        {/* Mobile Menu Overlay */}
        <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
        ></div>

        {/* Mobile Menu Panel */}
        <div 
            id="mobile-menu"
            className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white/80 backdrop-blur-xl shadow-2xl z-50 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-between items-center p-4 border-b border-white/30">
                <h2 className="font-bold text-lg text-gray-800">Menú</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2" aria-label="Cerrar menú">
                    <CloseIcon className="w-6 h-6 text-gray-700" />
                </button>
            </div>
            
            <div className="p-4">
                <div ref={mobileSearchRef} className="relative mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        placeholder="Buscar productos..."
                        className="w-full p-3 pl-4 pr-4 rounded-lg bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
                    />
                    {(isSearchFocused && searchTerm) && (
                        <SearchResults 
                            searchTerm={searchTerm}
                            products={allProducts}
                            onSelect={handleProductSelectFromSearch}
                        />
                    )}
                </div>

                <ul className="flex flex-col">
                    {navItems.map(item => (
                        <li key={item.href}>
                            <NavLink href={item.href} onClick={handleLinkClick} className="py-3 px-4 text-lg hover:bg-white/50">{item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </header>
  );
};

export default Header;