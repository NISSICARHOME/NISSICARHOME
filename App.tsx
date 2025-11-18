
import React, { useState, useEffect } from 'react';
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
import QuickBuyModal from './components/shared/QuickBuyModal'; // Import the new Modal
import CheckoutForm from './components/checkout/CheckoutForm';
import Chatbot from './components/Chatbot';
import Filters from './components/Filters';

// --- Page Imports ---
import LandingPageVidrexClarityWash from './pages/LandingPageVidrexClarityWash';
import LandingPageBeautyKit from './pages/LandingPageBeautyKit';
import LandingPageBasicKit from './pages/LandingPageBasicKit';
import LandingPageServices from './pages/LandingPageServices';
import LandingPageAdditionalServices from './pages/LandingPageAdditionalServices';
import LandingPageHyperDiamond from './pages/LandingPageHyperDiamond';

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
  <>
    <Hero />
    <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
    <Products onProductSelect={onProductSelect} onAddToCart={onAddToCart} searchTerm={searchTerm} activeFilters={activeFilters} />
    <Kits />
    <About />
    <Services />
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
  
  // Triggered by clicking on a Product Card - Opens Quick Buy Modal OR Navigates to Landing Page
  const handleProductSelect = (product: Product) => {
      if (product.id === 'prod-hyper-diamond') {
          // Direct navigation for Hyper Diamond Landing Page
          window.location.hash = "/Cera-Hyper-Diamond";
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
      
      {isCheckoutOpen && <CheckoutForm cart={cart} setCart={setCart} onClose={() => setIsCheckoutOpen(false)} />}
      <Chatbot allProducts={allProducts} onProductSelect={handleProductSelect} isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} startListening={startVoiceSearch} onListeningEnd={handleListeningEnd} />
    </HashRouter>
  );
};

export default App;
