import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { siteContent } from '../../data/siteContent';

const HighConversionButton: React.FC = () => {
    const { pathname } = useLocation();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [buttonText, setButtonText] = useState('');
    
    // Determine if it's a product or service landing
    const isServicePage = pathname.includes('spa-automotriz') || pathname.includes('servicios-adicionales');
    const isProductPage = pathname.includes('kit-') || pathname.includes('Cera-Hyper-Diamond') || (!isServicePage && pathname !== '/' && pathname !== '/admin' && pathname !== '/configuracion' && pathname !== '/privacidad');

    // Only show on landing pages
    const shouldShow = isServicePage || isProductPage;

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isServicePage) {
            if (scrollProgress < 30) setButtonText('Reservar Ahora');
            else if (scrollProgress < 70) setButtonText('Aprovecha Hoy');
            else setButtonText('Agendar Ya');
        } else {
            if (scrollProgress < 30) setButtonText('Comprar ahora');
            else if (scrollProgress < 70) setButtonText('Aprovecha hoy');
            else setButtonText('Quiero Mi Promoción');
        }
    }, [scrollProgress, isServicePage]);

    if (!shouldShow) return null;

    const whatsappUrl = `https://wa.me/${siteContent.footer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola! Vengo de la página ${pathname} y quiero ${isServicePage ? 'agendar una cita' : 'mi promoción'}.`)}`;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 md:bottom-8 left-0 right-0 z-50 px-[20px] sm:px-[40px] md:px-[60px] pointer-events-none"
            >
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto block w-full max-w-5xl mx-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 10px 25px -5px rgba(247, 127, 0, 0.4)",
                                "0 20px 35px -5px rgba(247, 127, 0, 0.6)",
                                "0 10px 25px -5px rgba(247, 127, 0, 0.4)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="bg-[#F77F00] text-white py-3.5 md:py-5 px-4 md:px-8 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Pulse effect background */}
                        <motion.div 
                            className="absolute inset-0 bg-white/20"
                            animate={{
                                opacity: [0, 0.5, 0],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <span className="relative z-10 text-base sm:text-lg md:text-xl font-black uppercase tracking-tight md:tracking-widest italic flex items-center gap-2 text-center">
                            {buttonText}
                            <svg className="w-5 h-5 md:w-6 md:h-6 animate-bounce-x flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>

                        {/* Urgency Badge */}
                        <div className="absolute top-0 right-2 md:right-4 bg-white text-[#F77F00] text-[8px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded-b-md md:rounded-b-lg uppercase tracking-tighter shadow-sm">
                            ¡Solo hoy!
                        </div>
                    </motion.div>
                </motion.a>
            </motion.div>
        </AnimatePresence>
    );
};

export default HighConversionButton;
