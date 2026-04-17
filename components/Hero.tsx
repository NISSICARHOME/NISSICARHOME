import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const { hero } = siteContent;

  const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5);
  };

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" className="relative h-screen h-[100dvh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden bg-gray-900">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80 md:opacity-70 transition-opacity duration-700"
        style={{ 
          backgroundImage: `url(${hero.backgroundImage})`,
          transform: !isTouch && offsetY ? `translateY(${offsetY}px)` : 'none',
          willChange: !isTouch && offsetY ? 'transform' : 'auto'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80"></div>
      </div>
      
      <div className="relative z-10 p-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full">
            <span className="text-amber-400 text-xs font-black uppercase tracking-[0.2em]">Estética Automotriz de Élite</span>
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-[0.9]">
            {hero.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-amber-500 block md:inline" : "text-white"}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-2xl mb-10 font-medium text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <HashLink
              smooth
              to="/#productos"
              className="group relative bg-amber-500 text-white font-black py-5 px-10 rounded-2xl text-xl transition-all transform hover:scale-105 duration-300 shadow-[0_20px_50px_rgba(245,158,11,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {hero.ctaText}
                <svg className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </HashLink>
            <HashLink
              smooth
              to="/#servicios"
              className="bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-md font-black py-5 px-10 rounded-2xl text-xl transition-all duration-300"
            >
              NUESTROS SERVICIOS
            </HashLink>
          </div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};


export default Hero;