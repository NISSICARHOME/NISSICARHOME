import React, { useState, useEffect } from 'react';

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


  return (
    <header className={`bg-white/20 backdrop-blur-md sticky top-0 z-40 border-b border-white/30 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2 md:p-4">
        <a href="#/" onClick={handleLinkClick} className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-3">
            <button 
                onClick={onVoiceSearchStart} 
                className="p-2 text-gray-600 rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Buscar por voz"
            >
                <MicIcon className="w-6 h-6" />
            </button>
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
                <button 
                    onClick={() => {
                        onVoiceSearchStart();
                        handleLinkClick(); // Close menu after activating
                    }} 
                    className="w-full flex items-center justify-center gap-3 p-3 mb-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors shadow-sm active:scale-95"
                    aria-label="Iniciar búsqueda por voz"
                >
                    <MicIcon className="w-6 h-6 text-gray-700" />
                    <span className="font-semibold text-gray-800">Búsqueda por Voz</span>
                </button>

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