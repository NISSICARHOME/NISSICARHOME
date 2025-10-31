import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Kits from './components/Kits';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Policies from './components/Policies';
import PaymentMethods from './components/PaymentMethods';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LandingPageVidrexClarityWash from './pages/LandingPageVidrexClarityWash';
import CheckoutForm from './components/checkout/CheckoutForm';
import { CartItem } from './types';
import { FloatingCartButton } from './pages/LandingPageVidrexClarityWash';

const App: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  useEffect(() => {
    const onLocationChange = () => {
      setPathname(window.location.pathname);
      // If navigating away from landing page, hide checkout
      if (window.location.pathname !== '/kit-vidrex-clarity-wash') {
        setCheckoutVisible(false);
      }
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return;
      
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        if (href !== window.location.pathname) {
          window.history.pushState({}, '', href);
          setPathname(href);
          window.scrollTo(0, 0);
        }
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleBuyNow = (itemToAdd: CartItem) => {
    setCart(currentCart => {
        const existingItem = currentCart.find(item => item.id === itemToAdd.id);
        if (existingItem) {
            return currentCart.map(item => 
                item.id === itemToAdd.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            );
        }
        return [...currentCart, { ...itemToAdd, quantity: 1 }];
    });
    setCheckoutVisible(true);
  };

  const commonLayout = (children: React.ReactNode, showChatbot = true) => (
    <div className="bg-gray-50 font-['Poppins',_sans-serif]">
      <Header />
      {children}
      <Footer />
      {showChatbot && <Chatbot />}
    </div>
  );

  if (isCheckoutVisible) {
    return commonLayout(
      <CheckoutForm 
        cart={cart} 
        setCart={setCart} 
        onClose={() => setCheckoutVisible(false)} 
      />
    );
  }

  if (pathname === '/kit-vidrex-clarity-wash') {
    return commonLayout(
      <>
        <LandingPageVidrexClarityWash onBuyNow={handleBuyNow} />
        <FloatingCartButton cart={cart} onClick={() => setCheckoutVisible(true)} />
      </>
    );
  }

  return (
    <div className="bg-[#e0e5ec] min-h-screen text-gray-800">
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Kits />
        <Services />
        <FAQ />
        <Policies />
        <PaymentMethods />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
