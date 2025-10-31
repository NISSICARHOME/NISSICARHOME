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

const App: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  // Effect to handle browser back/forward buttons
  useEffect(() => {
    const onLocationChange = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // Unified click handler for all types of navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Case 1: Internal page link (SPA navigation)
      if (href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        if (href !== window.location.pathname) {
          window.history.pushState({}, '', href);
          setPathname(href);
          window.scrollTo(0, 0);
        }
        return;
      }

      // Case 2: Hash link (smooth scroll)
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
        }
        return;
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []); // This effect runs only once to set up the global click listener.

  if (pathname === '/kit-vidrex-clarity-wash') {
    // Render the landing page view
    return (
      <div className="bg-gray-50 font-['Poppins',_sans-serif]">
        <Header />
        <LandingPageVidrexClarityWash />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  // Render the main page view
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