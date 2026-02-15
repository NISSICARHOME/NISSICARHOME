
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';

// --- Type Imports ---
import { Product, CartItem, ActiveFilters } from './types';

// --- Static Component Imports (Critical Path) ---
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Filters from './components/Filters';
import SocialProofToast from './components/shared/SocialProofToast';
import { getAllProducts } from './components/Products';

// --- Lazy Loaded Components (Optimized Path) ---
const About = lazy(() => import('./components/About'));
const Products = lazy(() => import('./components/Products'));
const Kits = lazy(() => import('./components/Kits'));
const Services = lazy(() => import('./components/Services'));
const FAQ = lazy(() => import('./components/FAQ'));
const Policies = lazy(() => import('./components/Policies'));
const PaymentMethods = lazy(() => import('./components/PaymentMethods'));
const ProductModal = lazy(() => import('./components/shared/ProductModal'));
const QuickBuyModal = lazy(() => import('./components/shared/QuickBuyModal'));
const CheckoutForm = lazy(() => import('./components/checkout/CheckoutForm'));
const Chatbot = lazy(() => import('./components/Chatbot'));

// --- Lazy Loaded Pages ---
const LandingPageVidrexClarityWash = lazy(() => import('./pages/LandingPageVidrexClarityWash'));
const LandingPageBeautyKit = lazy(() => import('./pages/LandingPageBeautyKit'));
const LandingPageBasicKit = lazy(() => import('./pages/LandingPageBasicKit'));
const LandingPageServices = lazy(() => import('./pages/LandingPageServices'));
const LandingPageAdditionalServices = lazy(() => import('./pages/LandingPageAdditionalServices'));
const LandingPageHyperDiamond = lazy(() => import('./pages/LandingPageHyperDiamond'));

// --- Simple Loading Component ---
const SectionLoader = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// --- Helper component to scroll to top on route change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main Layout Wrapper ---
const MainLayout: React.FC<{
  cartItemCount: number;
  onCartClick: () => void;
  onVoiceSearchStart: () => void;
}> = ({ cartItemCount, onCartClick, onVoiceSearchStart }) => (
  <>
    <Header cartItemCount={cartItemCount} onCartClick={onCartClick} onVoiceSearchStart={onVoiceSearchStart} />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

// --- Home Page Content ---
const HomePage: React.FC<{
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  searchTerm: string;
  activeFilters: ActiveFilters;
  setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters>>;
}> = ({ onProductSelect, onAddToCart, searchTerm, activeFilters, setActiveFilters }) => (
  <Suspense fallback={<SectionLoader />}>
    <Hero />
    <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
    <Products onProductSelect={onProductSelect} onAddToCart={onAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} />
    <Kits />
    <About />
    <Services />
    <FAQ />
    <Policies />
    <PaymentMethods />
  </Suspense>
);

// --- Main App Component ---
const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [startVoiceSearch, setStartVoiceSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRange: { min: 0, max: Infinity },
    sortOrder: 'default'
  });

  const allProducts = getAllProducts();

  const handleAddToCart = (productToAdd: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { id: productToAdd.id, name: productToAdd.name, price: productToAdd.price, quantity }];
    });
  };

  const handleBuyNow = (item: CartItem) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(i => i.id === item.id);
        if (existingItem) {
            return prevCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
        }
        return [...prevCart, item];
    });
    setIsCheckoutOpen(true);
  };
  
  const handleProductSelect = (product: Product) => {
      if (product.id === 'prod-hyper-diamond') {
          window.location.hash = "/Cera-Hyper-Diamond";
      } else {
          setQuickBuyProduct(product);
      }
  };

  const handleQuickBuyAction = (product: Product) => {
      handleAddToCart(product);
      setQuickBuyProduct(null);
      setIsCheckoutOpen(true);
  };

  const handleSwitchToDetails = () => {
      if (quickBuyProduct) {
          setSelectedProduct(quickBuyProduct);
          setQuickBuyProduct(null);
      }
  };

  const handleCloseModal = () => setSelectedProduct(null);
  const handleCloseQuickBuy = () => setQuickBuyProduct(null);
  const handleCartClick = () => setIsCheckoutOpen(true);

  const handleVoiceSearchStart = () => {
    setIsChatbotOpen(true);
    setStartVoiceSearch(true);
  };

  const handleListeningEnd = () => setStartVoiceSearch(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <HashRouter>
      <ScrollToTop />
      <SocialProofToast />
      <Suspense fallback={<SectionLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout cartItemCount={cartItemCount} onCartClick={handleCartClick} onVoiceSearchStart={handleVoiceSearchStart} />}>
            <Route index element={<HomePage onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />} />
            <Route path="/kit-vidrex-clarity-wash" element={<LandingPageVidrexClarityWash onBuyNow={handleBuyNow} />} />
            <Route path="/kit-embellecimiento" element={<LandingPageBeautyKit onBuyNow={handleBuyNow} />} />
            <Route path="/kit-basico-cuidado" element={<LandingPageBasicKit onBuyNow={handleBuyNow} />} />
            <Route path="/spa-automotriz" element={<LandingPageServices />} />
            <Route path="/servicios-adicionales-y-soporte" element={<LandingPageAdditionalServices />} />
            <Route path="/Cera-Hyper-Diamond" element={<LandingPageHyperDiamond onBuyNow={handleBuyNow} />} />
          </Route>
        </Routes>
      </Suspense>
      
      <Suspense fallback={null}>
        {quickBuyProduct && (
          <QuickBuyModal 
              product={quickBuyProduct} 
              onClose={handleCloseQuickBuy} 
              onAddToCartAndCheckout={handleQuickBuyAction}
              onViewDetails={handleSwitchToDetails}
          />
        )}
        {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
        {isCheckoutOpen && <CheckoutForm cart={cart} setCart={setCart} onClose={() => setIsCheckoutOpen(false)} />}
        <Chatbot allProducts={allProducts} onProductSelect={handleProductSelect} isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} startListening={startVoiceSearch} onListeningEnd={handleListeningEnd} />
      </Suspense>
    </HashRouter>
  );
};

export default App;
