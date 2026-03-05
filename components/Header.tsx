import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

const Logo = () => (
    <img 
        src="https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=w1344-h768-s-no-gm?authuser=0" 
        alt="Nissi Car Home Logo" 
        className="h-10 md:h-16 object-contain transition-all duration-500 ease-in-out filter drop-shadow-md hover:scale-105"
        fetchPriority="high"
    />
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick: () => void; className?: string; }> = ({ href, children, onClick, className = '' }) => (
  <HashLink smooth to={href} onClick={onClick} className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:text-amber-500 ${className}`}>
    {children}
  </HashLink>
);

const ShoppingCartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    onVoiceSearchStart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onVoiceSearchStart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/#productos', label: 'Productos' },
    { href: '/#kits', label: 'Kits' },
    { href: '/spa-automotriz', label: 'Spa Automotriz' },
    { href: '/#nosotros', label: 'Nosotros' },
    { href: '/#contacto', label: 'Contacto' },
    { href: '/#faq', label: 'FAQ' },
  ];
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  const [isScrolled, setIsScrolled] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 50);
      
      if (isOpen) return;
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
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
  }, [lastScrollY, isOpen]);


  return (
    <>
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl py-2' : 'bg-transparent py-4'}`}>
          <nav className="max-w-7xl flex items-center justify-between mx-auto px-6">
            <HashLink to="/" onClick={handleLinkClick} className="flex items-center space-x-3 rtl:space-x-reverse">
              <Logo />
            </HashLink>
            <div className="flex items-center md:order-2 space-x-1 md:space-x-3">
                <button 
                    onClick={onVoiceSearchStart} 
                    className={`p-2 rounded-xl transition-colors ${isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    aria-label="Buscar por voz"
                >
                    <MicIcon className="w-6 h-6" />
                </button>
                <button 
                  onClick={onCartClick} 
                  className={`relative p-2 rounded-xl transition-colors ${isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                  aria-label="Ver carrito"
                >
                    <ShoppingCartIcon />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white shadow-lg">
                            {cartItemCount}
                        </span>
                    )}
                </button>
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className={`inline-flex items-center p-2 w-10 h-10 justify-center rounded-xl md:hidden transition-colors ${isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  aria-label="Abrir menú"
                >
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <ul className="flex space-x-10">
                {navItems.map(item => (
                  <li key={item.href}>
                    <NavLink href={item.href} onClick={handleLinkClick} className={isScrolled ? 'text-gray-900' : 'text-white'}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </header>

        {/* Mobile Menu Overlay - Outside Header to avoid Transform/Fixed conflict */}
        <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
        ></div>

        {/* Mobile Menu Panel - Left Side Drawer */}
        <div 
            id="mobile-menu"
            className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl border-r border-white/50 z-50 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="flex justify-between items-center p-5 border-b border-gray-200/50">
                <h2 className="font-bold text-xl text-gray-800 tracking-tight">Menú</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Cerrar menú">
                    <CloseIcon className="w-6 h-6 text-gray-600" />
                </button>
            </div>
            
            <div className="p-5 flex flex-col h-full overflow-y-auto">
                <button 
                    onClick={() => {
                        onVoiceSearchStart();
                        handleLinkClick(); // Close menu after activating
                    }} 
                    className="w-full flex items-center justify-center gap-3 p-3 mb-6 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm active:scale-95 border border-gray-200"
                    aria-label="Iniciar búsqueda por voz"
                >
                    <MicIcon className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-gray-800">Búsqueda por Voz</span>
                </button>

                <ul className="flex flex-col space-y-2 pb-20">
                    {navItems.map(item => (
                        <li key={item.href}>
                            <NavLink 
                                href={item.href} 
                                onClick={handleLinkClick} 
                                className="py-3 px-4 text-lg font-medium text-gray-800 hover:bg-gray-100/80 hover:text-amber-600 rounded-xl transition-all"
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
  );
};

export default Header;