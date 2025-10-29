import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Kits />
        <Services />
        <FAQ />
        <Policies />
        <PaymentMethods />
      </main>
      <Footer />
    </div>
  );
};

export default App;
