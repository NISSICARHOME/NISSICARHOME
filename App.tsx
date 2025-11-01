import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products, { getAllProducts } from './components/Products';
import Filters from './components/Filters';
import Kits from './components/Kits';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Policies from './components/Policies';
import PaymentMethods from './components/PaymentMethods';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LandingPageVidrexClarityWash from './pages/LandingPageVidrexClarityWash';
import CheckoutForm from './components/checkout/CheckoutForm';
import ProductModal from './components/shared/ProductModal';
import { CartItem, Product, ActiveFilters } from './types';

const App: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRange: { min: 0, max: Infinity },
    sortOrder: 'default'
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allProducts = useMemo(() => getAllProducts(), []);

  useEffect(() => {
    const onLocationChange = () => {
      setPathname(window.location.pathname);
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

  const addToCart = (itemToAdd: CartItem) => {
    setCart(currentCart => {
        const existingItem = currentCart.find(item => item.id === itemToAdd.id);
        if (existingItem) {
            return currentCart.map(item => 
                item.id === itemToAdd.id 
                    ? { ...item, quantity: item.quantity + itemToAdd.quantity } 
                    : item
            );
        }
        return [...currentCart, itemToAdd];
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  };
  
  const handleBuyNow = (itemToAdd: CartItem) => {
    addToCart(itemToAdd);
    setCheckoutVisible(true);
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const renderPage = () => {
    if (pathname === '/kit-vidrex-clarity-wash') {
      return <LandingPageVidrexClarityWash onBuyNow={handleBuyNow} />;
    }

    return (
      <main>
        <Hero />
        <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
        <Products 
          onAddToCart={handleAddToCart} 
          searchTerm={searchTerm} 
          activeFilters={activeFilters}
          onProductSelect={setSelectedProduct}
        />
        <About />
        <Kits />
        <Services />
        <FAQ />
        <Policies />
        <PaymentMethods />
      </main>
    );
  };

  return (
    <div className={`bg-[#e0e5ec] min-h-screen text-gray-800 ${isCheckoutVisible || selectedProduct ? 'overflow-hidden h-screen' : ''}`}>
      <div className={isCheckoutVisible || selectedProduct ? 'blur-sm' : ''}>
        <Header 
          cartItemCount={totalItems} 
          onCartClick={() => setCheckoutVisible(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          allProducts={allProducts}
          onProductSelect={setSelectedProduct}
        />
        {renderPage()}
        <Footer />
        <Chatbot />
      </div>
      {isCheckoutVisible && 
        <CheckoutForm 
          cart={cart} 
          setCart={setCart} 
          onClose={() => setCheckoutVisible(false)} 
        />
      }
      {selectedProduct &&
        <ProductModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
        />
      }
    </div>
  );
};

export default App;