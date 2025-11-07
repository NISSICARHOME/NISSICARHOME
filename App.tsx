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

// This function reads the route from the URL's hash.
const getRoute = () => {
  const hash = window.location.hash.substring(1); // Remove '#'
  return hash.startsWith('/') ? hash : '/'; // Ensure it's a valid route path like '/' or '/page'
};

const App: React.FC = () => {
  const [route, setRoute] = useState(getRoute());
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

  // This effect handles route changes from browser actions like back/forward buttons
  // or manual URL hash editing.
  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getRoute());
    };
    // 'popstate' is for back/forward buttons
    window.addEventListener('popstate', handleLocationChange);
    // 'hashchange' is a fallback for other cases
    window.addEventListener('hashchange', handleLocationChange);
    
    // On initial load, check for and scroll to an anchor if present
    const hash = window.location.hash;
    if (hash && !hash.startsWith('#/')) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => { // Timeout ensures layout is stable
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }, 100);
        }
    }
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // This effect intercepts all clicks on `<a>` tags to provide smooth SPA navigation.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      // Ignore clicks that aren't on local `<a>` tags
      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return;
      
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      if (href.startsWith('#/')) {
        // It's an SPA route link.
        e.preventDefault();
        // Use history.pushState to update the URL without a full page reload.
        // This is more robust for preview environments than changing location.hash directly.
        window.history.pushState({}, '', href);
        // Manually update our component's state to reflect the new route.
        setRoute(getRoute());
        window.scrollTo(0, 0); // Go to top of new page
      } else if (href.startsWith('#') && href.length > 1) {
        // It's a same-page anchor link for smooth scrolling.
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          // Update the URL hash without adding a new history entry.
          window.history.replaceState(null, '', href);
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  
  useEffect(() => {
    const body = document.body;
    if (isCheckoutVisible || selectedProduct) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isCheckoutVisible, selectedProduct]);

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
    if (route === '/kit-vidrex-clarity-wash') {
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

  const isLandingPage = route === '/kit-vidrex-clarity-wash';

  return (
    <div className="bg-[#e0e5ec] min-h-screen text-gray-800">
      <div className={isCheckoutVisible || selectedProduct ? 'blur-sm pointer-events-none' : ''}>
        {!isLandingPage && (
          <Header 
            cartItemCount={totalItems} 
            onCartClick={() => setCheckoutVisible(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            allProducts={allProducts}
            onProductSelect={setSelectedProduct}
          />
        )}
        {renderPage()}
        {!isLandingPage && (
          <>
            <Footer />
            <Chatbot />
          </>
        )}
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