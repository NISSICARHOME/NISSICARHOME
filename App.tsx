import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import LandingPageBeautyKit from './pages/LandingPageBeautyKit';
import LandingPageBasicKit from './pages/LandingPageBasicKit';
import CheckoutForm from './components/checkout/CheckoutForm';
import ProductModal from './components/shared/ProductModal';
import { CartItem, Product, ActiveFilters } from './types';

declare const fbq: (type: string, event: string, data?: object) => void;

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRange: { min: 0, max: Infinity },
    sortOrder: 'default'
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToReveal, setProductToReveal] = useState<Product | null>(null);
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [startChatbotListening, setStartChatbotListening] = useState(false);

  const allProducts = useMemo(() => getAllProducts(), []);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // On route change, scroll to top, unless it's a hash link on the same page
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

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

  useEffect(() => {
    if (isCheckoutVisible && cart.length > 0) {
      if (typeof fbq === 'function') {
        const content_ids = cart.map(item => item.id);
        const value = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        fbq('track', 'InitiateCheckout', {
          content_ids: content_ids,
          currency: 'COP',
          value: value,
          num_items: cart.reduce((sum, item) => sum + item.quantity, 0)
        });
      }
    }
  }, [isCheckoutVisible, cart]);
  
  useEffect(() => {
    if (productToReveal && location.pathname === '/') {
      setSelectedProduct(productToReveal);
      
      setTimeout(() => {
        const element = document.getElementById(`product-card-${productToReveal.id}`);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
        setProductToReveal(null);
      }, 100);
    }
  }, [productToReveal, location.pathname]);

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
    if (typeof fbq === 'function') {
      fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        currency: 'COP',
        value: product.price
      });
    }
  };
  
  const handleBuyNow = (itemToAdd: CartItem) => {
    addToCart(itemToAdd);
    if (typeof fbq === 'function') {
      fbq('track', 'AddToCart', {
        content_ids: [itemToAdd.id],
        content_name: itemToAdd.name,
        currency: 'COP',
        value: itemToAdd.price * itemToAdd.quantity
      });
    }
    setCheckoutVisible(true);
  };

  const handleVoiceSearchStart = () => {
    setChatbotOpen(true);
    setStartChatbotListening(true);
  };
  
  const isLandingPage = useMemo(() => {
      const landingRoutes = ['/kit-vidrex-clarity-wash', '/kit-embellecimiento', '/kit-basico-cuidado'];
      return landingRoutes.includes(location.pathname);
  }, [location.pathname]);

  const handleProductSelect = (product: Product) => {
    if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', {
            content_ids: [product.id],
            content_name: product.name,
            content_type: 'product',
            currency: 'COP',
            value: product.price,
        });
    }
    if (isLandingPage) {
      setProductToReveal(product);
      navigate('/');
    } else {
      setSelectedProduct(product);
      const element = document.getElementById(`product-card-${product.id}`);
      if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const MainLayout = () => (
    <>
      <Header 
        cartItemCount={totalItems} 
        onCartClick={() => setCheckoutVisible(true)}
        onVoiceSearchStart={handleVoiceSearchStart}
      />
      <main>
        <Hero />
        <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
        <Products 
          onAddToCart={handleAddToCart} 
          searchTerm={searchTerm} 
          activeFilters={activeFilters}
          onProductSelect={handleProductSelect}
        />
        <Kits />
        <About />
        <Services />
        <FAQ />
        <Policies />
        <PaymentMethods />
      </main>
      <Footer />
    </>
  );

  return (
    <div className="bg-[#e0e5ec] min-h-screen text-gray-800">
      <div className={isCheckoutVisible || selectedProduct ? 'blur-sm pointer-events-none' : ''}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/kit-vidrex-clarity-wash" element={<LandingPageVidrexClarityWash onBuyNow={handleBuyNow} />} />
          <Route path="/kit-embellecimiento" element={<LandingPageBeautyKit onBuyNow={handleBuyNow} />} />
          <Route path="/kit-basico-cuidado" element={<LandingPageBasicKit onBuyNow={handleBuyNow} />} />
        </Routes>
      </div>

      <Chatbot 
        isOpen={isChatbotOpen}
        setIsOpen={setChatbotOpen}
        allProducts={allProducts}
        onProductSelect={handleProductSelect}
        startListening={startChatbotListening}
        onListeningEnd={() => setStartChatbotListening(false)}
      />

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