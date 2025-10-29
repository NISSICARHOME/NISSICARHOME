import React, { useEffect } from 'react';
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

const App: React.FC = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
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
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);
  
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