import React, { useState } from 'react';

const Logo = () => (
    <img 
        src="https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=w1344-h768-s-no-gm?authuser=0" 
        alt="Nissi Car Home Logo" 
        className="h-16 md:h-20 object-contain"
    />
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick: () => void; }> = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="block py-2 px-3 text-gray-700 rounded-lg hover:bg-white/20 md:hover:bg-transparent md:border-0 md:hover:text-amber-500 md:p-0 transition-colors duration-300 font-semibold">
    {children}
  </a>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#productos', label: 'Productos' },
    { href: '#kits', label: 'Kits' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contacto', label: 'Contacto' },
  ];
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white/20 backdrop-blur-md sticky top-0 z-50 border-b border-white/30">
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#inicio" onClick={handleLinkClick} className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white/20 rounded-lg bg-white/20 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            {navItems.map(item => (
              <li key={item.href}>
                <NavLink href={item.href} onClick={handleLinkClick}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;