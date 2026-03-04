import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const { hero } = siteContent;

  // The parallax effect will be more pronounced, moving the image at 50% of the scroll speed.
  const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Vehículo detallado"
          // Make image taller and position it absolutely to allow for parallax movement without showing edges.
          className="absolute top-0 left-0 w-full min-h-[120vh] object-cover"
          style={{ transform: `translateY(${offsetY}px)` }}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 p-8 max-w-4xl mx-auto bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-amber-300">
          {hero.title}
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light text-gray-100">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <HashLink
            smooth
            to="/#productos"
            className="bg-amber-500/80 text-white hover:bg-amber-500/100 border border-amber-400/50 backdrop-blur-sm font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 duration-300 shadow-lg"
          >
            {hero.ctaText}
          </HashLink>
          <HashLink
            smooth
            to="/#servicios"
            className="bg-white/10 border-2 border-white/50 text-white hover:bg-white/20 hover:border-white/80 backdrop-blur-sm font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
          >
            Nuestros Servicios
          </HashLink>
        </div>
      </div>
    </section>
  );
};


export default Hero;