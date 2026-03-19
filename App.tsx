
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';

// --- Type Imports ---
import { Product, CartItem, ActiveFilters } from './types';

// --- Component Imports ---
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products, { getAllProducts } from './components/Products';
import Kits from './components/Kits';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Policies from './components/Policies';
import PaymentMethods from './components/PaymentMethods';
import Footer from './components/Footer';
import ProductModal from './components/shared/ProductModal';
import QuickBuyModal from './components/shared/QuickBuyModal';
import CheckoutForm from './components/checkout/CheckoutForm';
import Chatbot from './components/Chatbot';
import Filters from './components/Filters';
import SocialProofToast from './components/shared/SocialProofToast';
import SEOManager from './components/shared/SEOManager';
import WhatsAppButton from './components/shared/WhatsAppButton';
import ReviewSection from './components/shared/ReviewSection';
import { TrackingService } from './services/TrackingService';

// --- Data Imports ---
import { initialReviews } from './data/reviews';
import { Review } from './types';

// --- Lazy Loaded Pages ---
const LandingPageVidrexClarityWash = lazy(() => import('./pages/LandingPageVidrexClarityWash'));
const LandingPageBeautyKit = lazy(() => import('./pages/LandingPageBeautyKit'));
const LandingPageBasicKit = lazy(() => import('./pages/LandingPageBasicKit'));
const LandingPageServices = lazy(() => import('./pages/LandingPageServices'));
const LandingPageAdditionalServices = lazy(() => import('./pages/LandingPageAdditionalServices'));
const LandingPageHyperDiamond = lazy(() => import('./pages/LandingPageHyperDiamond'));
const ProductLandingPage = lazy(() => import('./pages/ProductLandingPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

import { siteContent } from './data/siteContent';
import { idToSlug } from './constants';

// --- Loading Component ---
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview: (id: string) => void;
  isAdmin: boolean;
}> = ({ onProductSelect, onAddToCart, searchTerm, activeFilters, setActiveFilters, reviews, onAddReview, onDeleteReview, isAdmin }) => (
  <>
    <Hero />
    <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
    <Products onProductSelect={onProductSelect} onAddToCart={onAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} />
    <Kits />
    <About />
    <Services />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ReviewSection 
            targetId="general" 
            reviews={reviews} 
            onAddReview={onAddReview} 
            onDeleteReview={onDeleteReview} 
            isAdmin={isAdmin} 
        />
    </div>
    <FAQ />
    <Policies />
    <PaymentMethods />
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

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAddReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const pass = prompt('Ingrese la clave de administrador:');
      if (pass === 'nissi2024') {
        setIsAdmin(true);
        alert('Modo administrador activado');
      } else {
        alert('Clave incorrecta');
      }
    }
  };

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
            element={<HomePage onProductSelect={handleProductSelect} onAddToCart={handleAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} setActiveFilters={setActiveFilters} reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />} 
          />
          <Route path="/kit-vidrex-clarity-wash" element={
            <Suspense fallback={<PageLoader />}>
              <LandingPageVidrexClarityWash onBuyNow={handleBuyNow} reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
          <Route path="/kit-embellecimiento" element={
            <Suspense fallback={<PageLoader />}>
              <LandingPageBeautyKit onBuyNow={handleBuyNow} reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
          <Route path="/kit-basico-cuidado" element={
            <Suspense fallback={<PageLoader />}>
              <LandingPageBasicKit onBuyNow={handleBuyNow} reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
          <Route path="/spa-automotriz" element={
            <Suspense fallback={<PageLoader />}>
              <LandingPageServices reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
          <Route path="/servicios-adicionales-y-soporte" element={
            <Suspense fallback={<PageLoader />}>
              <LandingPageAdditionalServices reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
          <Route path="/Cera-Hyper-Diamond" element={
            <Suspense fallback={<PageLoader />}>
              <LandingPageHyperDiamond onBuyNow={handleBuyNow} reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
          <Route path="/privacidad" element={<div className="max-w-4xl mx-auto py-20 px-6"><h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Política de Privacidad</h1><p className="text-gray-600 leading-relaxed">En Nissi Car Home, nos tomamos muy en serio tu privacidad. Tus datos personales solo se utilizan para procesar tus pedidos y brindarte el mejor servicio posible. No compartimos tu información con terceros sin tu consentimiento expreso.</p></div>} />
          <Route path="/configuracion" element={<div className="max-w-4xl mx-auto py-20 px-6"><h1 className="text-4xl font-black mb-8 italic uppercase tracking-tighter">Configuración</h1><button onClick={toggleAdmin} className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm">{isAdmin ? 'Cerrar Sesión Admin' : 'Acceso Propietario'}</button></div>} />
          <Route path="/admin" element={
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="/:slug" element={
            <Suspense fallback={<PageLoader />}>
              <ProductLandingPage onBuyNow={handleBuyNow} reviews={reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} isAdmin={isAdmin} />
            </Suspense>
          } />
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
