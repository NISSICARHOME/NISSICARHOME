
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';

// --- Type Imports ---
import { Product, CartItem, ActiveFilters } from './types';

// --- Component Imports ---
import Header from './components/Header';
import Hero from './components/Hero';
import WhatsAppButton from './components/shared/WhatsAppButton';
import { TrackingService } from './services/TrackingService';
import SEOManager from './components/shared/SEOManager';
import { siteContent } from './data/siteContent';
import { getAllProducts } from './components/Products';

// --- Lazy Loaded Components ---
const About = lazy(() => import('./components/About'));
const Products = lazy(() => import('./components/Products'));
const Kits = lazy(() => import('./components/Kits'));
const Services = lazy(() => import('./components/Services'));
const FAQ = lazy(() => import('./components/FAQ'));
const Policies = lazy(() => import('./components/Policies'));
const PaymentMethods = lazy(() => import('./components/PaymentMethods'));
const Footer = lazy(() => import('./components/Footer'));
const ProductModal = lazy(() => import('./components/shared/ProductModal'));
const QuickBuyModal = lazy(() => import('./components/shared/QuickBuyModal'));
const CheckoutForm = lazy(() => import('./components/checkout/CheckoutForm'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const Filters = lazy(() => import('./components/Filters'));
const SocialProofToast = lazy(() => import('./components/shared/SocialProofToast'));

// --- Lazy Loaded Pages ---
const LandingPageVidrexClarityWash = lazy(() => import('./pages/LandingPageVidrexClarityWash'));
const LandingPageBeautyKit = lazy(() => import('./pages/LandingPageBeautyKit'));
const LandingPageBasicKit = lazy(() => import('./pages/LandingPageBasicKit'));
const LandingPageServices = lazy(() => import('./pages/LandingPageServices'));
const LandingPageAdditionalServices = lazy(() => import('./pages/LandingPageAdditionalServices'));
const LandingPageHyperDiamond = lazy(() => import('./pages/LandingPageHyperDiamond'));
const ProductLandingPage = lazy(() => import('./pages/ProductLandingPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

import { idToSlug } from './pages/ProductLandingPage';

// --- Loading Component ---
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
  </div>
);

// --- Helper component to scroll to top on route change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    TrackingService.trackPageView(pathname);
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
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
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
  <>
    <Hero />
    <Suspense fallback={<PageLoader />}>
      <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      <Products onProductSelect={onProductSelect} onAddToCart={onAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} />
      <Kits />
      <About />
      <Services />
      <FAQ />
      <Policies />
      <PaymentMethods />
    </Suspense>
  </>
);

// --- Main App Component ---
const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // For Full Details Modal
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null); // For Quick Buy Modal
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [viewedProductIds, setViewedProductIds] = useState<string[]>([]);
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [startVoiceSearch, setStartVoiceSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    priceRange: { min: 0, max: Infinity },
    sortOrder: 'default'
  });

  const allProducts = getAllProducts();
  const { optimization } = siteContent;

  const handleAddToCart = (productToAdd: Product, quantity: number = 1) => {
    setViewedProductIds(prev => Array.from(new Set([...prev, productToAdd.id])));
    setLastAddedProductId(productToAdd.id);
    
    // Tracking
    TrackingService.trackAddToCart({
      id: productToAdd.id,
      name: productToAdd.name,
      price: productToAdd.price,
      quantity: quantity
    });

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          quantity: quantity
        }];
      }
    });
  };

  const handleBuyNow = (item: CartItem) => {
    // Adds a specific item (usually a kit from a landing page) and opens checkout
    setViewedProductIds(prev => Array.from(new Set([...prev, item.id])));
    setLastAddedProductId(item.id);

    // Tracking
    TrackingService.trackInitiateCheckout({
      id: item.id,
      name: item.name,
      price: item.price
    });

    setCart(prevCart => {
        const existingItem = prevCart.find(i => i.id === item.id);
        if (existingItem) {
            return prevCart.map(i => 
                i.id === item.id 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i
            );
        }
        return [...prevCart, item];
    });
    setIsCheckoutOpen(true);
  };
  
  // Triggered by clicking on a Product Card - Navigates to Landing Page
  const handleProductSelect = (product: Product) => {
      setViewedProductIds(prev => Array.from(new Set([...prev, product.id])));
      const slug = idToSlug[product.id];
      if (slug) {
          window.location.hash = `/${slug}`;
      } else {
          setQuickBuyProduct(product);
      }
  };

  // Triggered from Quick Buy Modal "Add to Cart & Checkout"
  const handleQuickBuyAction = (product: Product) => {
      handleAddToCart(product);
      setQuickBuyProduct(null); // Close quick modal
      setIsCheckoutOpen(true); // Open checkout directly
  };

  // Triggered from Quick Buy Modal "View Details"
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
      <SEOManager />
      <WhatsAppButton />
      {optimization.socialProof && <SocialProofToast />}
      <Routes>
        <Route path="/" element={<MainLayout cartItemCount={cartItemCount} onCartClick={handleCartClick} onVoiceSearchStart={handleVoiceSearchStart} />}>
          <Route 
            index 
            element={<HomePage onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />} 
          />
          <Route path="/kit-vidrex-clarity-wash" element={<LandingPageVidrexClarityWash onBuyNow={handleBuyNow} />} />
          <Route path="/kit-embellecimiento" element={<LandingPageBeautyKit onBuyNow={handleBuyNow} />} />
          <Route path="/kit-basico-cuidado" element={<LandingPageBasicKit onBuyNow={handleBuyNow} />} />
          <Route path="/spa-automotriz" element={<LandingPageServices />} />
          <Route path="/servicios-adicionales-y-soporte" element={<LandingPageAdditionalServices />} />
          <Route path="/Cera-Hyper-Diamond" element={<LandingPageHyperDiamond onBuyNow={handleBuyNow} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/:slug" element={<ProductLandingPage onBuyNow={handleBuyNow} />} />
        </Route>
      </Routes>
      
      {/* Render Quick Buy Modal if a product is selected for quick view */}
      {quickBuyProduct && (
        <QuickBuyModal 
            product={quickBuyProduct} 
            onClose={handleCloseQuickBuy} 
            onAddToCartAndCheckout={handleQuickBuyAction}
            onViewDetails={handleSwitchToDetails}
        />
      )}

      {/* Render Full Detail Modal if explicitly requested */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
      
      {isCheckoutOpen && <CheckoutForm cart={cart} setCart={setCart} viewedProductIds={viewedProductIds} lastAddedProductId={lastAddedProductId} onClose={() => setIsCheckoutOpen(false)} />}
      {optimization.chatbotEnabled && (
        <Chatbot allProducts={allProducts} onProductSelect={handleProductSelect} isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} startListening={startVoiceSearch} onListeningEnd={handleListeningEnd} />
      )}
    </HashRouter>
  );
};


export default App;
