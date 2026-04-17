import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle, Truck, ShieldCheck, Star } from 'lucide-react';
import { CartItem, Review } from '../types';
import ReviewSection from '../components/shared/ReviewSection';

// --- STYLES & CONSTANTS ---
const NISSI_BLUE = "#003366";
const NISSI_ORANGE = "#FF6600";

// --- COMPONENTS ---

// 1. HERO IMPACTO
const Hero = ({ onScrollToOffer }: { onScrollToOffer: () => void }) => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-nissi-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-nissi-orange/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl w-full text-center"
            >
                <div className="inline-block mb-6 px-4 py-1.5 bg-nissi-blue/10 rounded-full">
                    <span className="text-nissi-blue text-xs font-black uppercase tracking-[0.2em]">Kit Vidrex de Nissi Car Home</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-nissi-blue mb-6 tracking-tighter leading-[1.1] uppercase">
                    ¿Vidrios manchados que parecen viejos? <br />
                    <span className="text-nissi-orange italic">Devuélveles la vida en segundos.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
                    Con el Kit Potente Vidrex, elimina el sarro, la lluvia ácida y la grasa más difícil. 
                    Logra un <strong className="text-nissi-blue uppercase tracking-tight">"Efecto Cristal Nuevo"</strong> en tu auto, hogar y acabados de lujo.
                </p>

                <div className="mb-12 relative group max-w-2xl mx-auto">
                    <div className="absolute inset-0 bg-nissi-blue/10 blur-2xl rounded-3xl transform group-hover:scale-110 transition-transform duration-700" />
                    <img 
                        src="https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0" 
                        alt="Kit Vidrex Potente"
                        className="relative z-10 w-full h-auto rounded-3xl object-contain drop-shadow-2xl"
                        fetchPriority="high"
                    />
                </div>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onScrollToOffer}
                    className="bg-nissi-orange text-white font-black text-xl py-6 px-12 rounded-2xl shadow-[0_20px_40px_rgba(255,102,0,0.3)] hover:shadow-[0_25px_50px_rgba(255,102,0,0.45)] transition-all cursor-pointer uppercase tracking-tight"
                >
                    ¡QUIERO MI KIT VIDREX AHORA!
                </motion.button>
                
                <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm font-bold uppercase tracking-widest opacity-60">
                    <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Resultados Reales</span>
                    <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envío Nacional</span>
                </div>
            </motion.div>
        </section>
    );
};

// 2. PUNTOS DE DOLOR
const PainPoints = () => {
    const points = [
        {
            title: "Auto",
            image: "https://picsum.photos/seed/nissi-car/800/600",
            desc: "Recupera la visibilidad y seguridad al conducir de noche.",
            label: "Elimina Lluvia Ácida"
        },
        {
            title: "Hogar",
            image: "https://picsum.photos/seed/nissi-home/800/600",
            desc: "Elimina las manchas blancas de las cabinas de baño y espejos.",
            label: "Adiós al Sarro"
        },
        {
            title: "Metales",
            image: "https://picsum.photos/seed/nissi-metal/800/600",
            desc: "Restaura el brillo original en pasamanos y divisiones de piscina.",
            label: "Cromo y Aluminio"
        }
    ];

    return (
        <section className="py-24 bg-gray-50 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-nissi-blue mb-4 uppercase tracking-tighter italic">
                        No es suciedad, es daño acumulado <br className="hidden md:block" />
                        <span className="text-nissi-orange underline decoration-[6px] underline-offset-8">que el jabón no quita.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {points.map((point, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-nissi-blue/5 border border-nissi-blue/5 flex flex-col"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img 
                                    src={point.image} 
                                    alt={point.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4 bg-nissi-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                    {point.label}
                                </div>
                            </div>
                            <div className="p-8 text-center bg-white flex-grow flex flex-col justify-center">
                                <h3 className="text-2xl font-black text-nissi-blue uppercase tracking-tighter mb-4">{point.title}</h3>
                                <p className="text-gray-600 leading-relaxed italic">{point.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 3. PRUEBA SOCIAL / CAROUSEL
const SocialProof = () => {
    const examples = [
        {
            before: "https://lh3.googleusercontent.com/pw/AP1GczOSq4WI-RFLsquk8Bk37ATK54Rw4YYI45FXsLhKIm7C_IONy6uVpPP3A1SPQP2z11opqdovdExlL2SL_BeXPVJ7QlLMfRZNJllIEXX7PLebtVUlHXC1egPDre-yMCrD4LFYCndb--nxf75ofC5v68BP=w1248-h832-s-no-gm?authuser=0",
            after: "https://lh3.googleusercontent.com/pw/AP1GczNpzmN3XzZKKO2MO5zDOhkKVOKSEbAeNAZVMSeJA9GtPkx1MZIEXHCBvOcZfZ9Y62v0uwsiltgbGY8-Ydw9uuJDavJh8RRGhNZ-vij-dbOC9vASLj0ovAC3yW6WDrjtuSGM66xyKmamkyr5NGQiuMUq=w1248-h832-s-no-gm?authuser=0",
            label: "Parabrisas - Lluvia Ácida"
        },
        {
            before: "https://picsum.photos/seed/shower-b/800/600",
            after: "https://picsum.photos/seed/shower-a/800/600",
            label: "Ducha - Sarro Extremo"
        },
        {
            before: "https://picsum.photos/seed/aluminum-b/800/600",
            after: "https://picsum.photos/seed/aluminum-a/800/600",
            label: "Pasamanos - Aluminio Opaco"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-white px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-nissi-blue mb-4 uppercase tracking-tighter">
                        Más de 5,000 Clientes con <br />
                        <span className="text-nissi-orange italic">"Efecto Cristal Nuevo"</span>
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                        {examples.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-12 bg-nissi-orange' : 'w-4 bg-gray-200'}`}
                            />
                        ))}
                    </div>

                    <div className="relative aspect-[3/2] md:aspect-[2/1] bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 grid grid-cols-2"
                            >
                                <div className="relative h-full border-r-2 border-white">
                                    <img src={examples[activeIndex].before} alt="Antes" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Antes</div>
                                </div>
                                <div className="relative h-full">
                                    <img src={examples[activeIndex].after} alt="Después" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-nissi-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Después</div>
                                </div>
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg">
                                    <span className="text-nissi-blue font-black text-xs uppercase tracking-widest">{examples[activeIndex].label}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-16 bg-nissi-blue p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="flex-shrink-0 bg-white/10 w-24 h-24 rounded-full flex items-center justify-center border border-white/20">
                            <ShieldCheck className="w-12 h-12 text-white" />
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Garantía de Satisfacción</h3>
                            <p className="text-white/80 text-lg md:text-xl font-medium italic">
                                "Si no quita la mancha, te devolvemos tu dinero."
                            </p>
                        </div>
                        <div className="flex-shrink-0 ml-auto flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/20">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-white font-black text-xs uppercase tracking-tighter">Nissi Car Home 5.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 4. OFERTA FINAL
const OfferSection = ({ id, onBuy }: { id: string, onBuy: (item: CartItem) => void }) => {
    return (
        <section id={id} className="py-24 bg-nissi-blue px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-ink)_0%,_transparent_100%)] opacity-30" />
            
            <div className="max-w-5xl mx-auto relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-16 uppercase tracking-tighter italic">
                    ¡Promoción de Lanzamiento! <br />
                    <span className="text-nissi-orange">Nissi Car Home</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Option A */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-between"
                    >
                        <div className="mb-8">
                            <span className="text-white/50 text-xs font-black uppercase tracking-widest mb-4 block">Plan Personal</span>
                            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">1 Kit Vidrex</h3>
                            <div className="text-white/40 line-through text-xl">$75.000</div>
                            <div className="text-white text-5xl font-black mt-2">$55.000 COP</div>
                        </div>
                        
                        <div className="w-full space-y-4 mb-10 text-left">
                            <div className="flex items-center gap-3 text-white/80">
                                <CheckCircle className="w-5 h-5 text-nissi-orange" />
                                <span className="text-sm font-medium italic">Ideal para tu vehículo</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <CheckCircle className="w-5 h-5 text-nissi-orange" />
                                <span className="text-sm font-medium italic">Manual de uso premium</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => onBuy({id: 'vidrex-1', name: '1 Kit Vidrex', price: 55000, quantity: 1})}
                            className="w-full py-5 bg-white text-nissi-blue font-black rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-tight text-lg shadow-xl"
                        >
                            Comprar Ahora
                        </button>
                    </motion.div>

                    {/* Option B - Recommended */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white p-10 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between border-4 border-nissi-orange relative"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-nissi-orange text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                            ¡RECOMENDADO! (EL MÁS VENDIDO)
                        </div>

                        <div className="mb-8">
                            <span className="text-nissi-blue/50 text-xs font-black uppercase tracking-widest mb-4 block">Plan Total</span>
                            <h3 className="text-3xl font-black text-nissi-blue mb-6 uppercase tracking-tight">2 Kits Vidrex</h3>
                            <div className="text-gray-400 line-through text-xl">$150.000</div>
                            <div className="text-nissi-orange text-6xl font-black mt-2 italic shadow-nissi-orange/20 drop-shadow-lg">$99.000 COP</div>
                            <div className="mt-4 inline-block bg-nissi-orange/10 text-nissi-orange text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                ¡Ahorras 30% de Descuento!
                            </div>
                        </div>
                        
                        <div className="w-full space-y-4 mb-10 text-left">
                            <div className="flex items-center gap-3 text-nissi-blue">
                                <CheckCircle className="w-5 h-5 text-nissi-orange" />
                                <span className="text-sm font-bold italic">Un kit para el Auto y otro para el Hogar</span>
                            </div>
                            <div className="flex items-center gap-3 text-nissi-blue">
                                <CheckCircle className="w-5 h-5 text-nissi-orange" />
                                <span className="text-sm font-bold italic">Envío Prioritario Express</span>
                            </div>
                            <div className="flex items-center gap-3 text-nissi-blue">
                                <CheckCircle className="w-5 h-5 text-nissi-orange" />
                                <span className="text-sm font-bold italic">Asesoría 1-a-1 vía WhatsApp</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => onBuy({id: 'vidrex-2', name: '2 Kits Vidrex - Promo', price: 99000, quantity: 1})}
                            className="w-full py-6 bg-nissi-orange text-white font-black rounded-2xl transition-all uppercase tracking-tight text-xl shadow-[0_15px_30px_rgba(255,102,0,0.3)] hover:scale-[1.02] active:scale-95"
                        >
                            ¡QUIERO LA PROMOCIÓN!
                        </button>
                    </motion.div>
                </div>

                <div className="mt-20 flex flex-wrap justify-center gap-10">
                    <div className="flex items-center gap-4 text-white">
                        <Truck className="w-8 h-8 text-nissi-orange" />
                        <div className="text-left leading-tight">
                            <div className="text-sm font-black uppercase italic tracking-widest">Contra Entrega</div>
                            <div className="text-xs text-white/60 font-medium">Toda Colombia</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                        <ShoppingCart className="w-8 h-8 text-nissi-orange" />
                        <div className="text-left leading-tight">
                            <div className="text-sm font-black uppercase italic tracking-widest">Pago Seguro</div>
                            <div className="text-xs text-white/60 font-medium">Al Recibir en Casa</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// 5. STICKY WHATSAPP
const StickyWhatsApp = () => {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
            <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/573103754727?text=Hola%20Nissi%20Car%20Home,%20tengo%20una%20mancha%20difícil%20y%20quiero%20el%20Kit%20Vidrex" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                        width="60" 
                        height="60" 
                        alt="Asesoría Nissi"
                        className="relative z-10 drop-shadow-xl"
                    />
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl shadow-2xl border border-gray-100 flex items-center gap-2 transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[10px] font-black text-nissi-blue uppercase tracking-widest whitespace-nowrap">¿Dudas con una mancha?</span>
                </div>
            </motion.a>
        </div>
    );
};

// --- MAIN COMPONENT ---

interface LandingPageProps {
  onBuyNow: (item: CartItem) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview: (id: string) => void;
  isAdmin: boolean;
}

const LandingPageVidrexClarityWash: React.FC<LandingPageProps> = ({ onBuyNow, reviews, onAddReview, onDeleteReview, isAdmin }) => {
    const offerRef = useRef<HTMLDivElement>(null);

    const scrollToOffer = () => {
        offerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        document.title = "Kit Vidrex Potente | Desmancha Vidrios Nissi Car Home";
    }, []);

    return (
        <div className="bg-white font-sans selection:bg-nissi-orange selection:text-white">
            <Hero onScrollToOffer={scrollToOffer} />
            <PainPoints />
            <SocialProof />
            <div ref={offerRef}>
                <OfferSection id="precio" onBuy={onBuyNow} />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white border-t border-gray-100">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-nissi-blue uppercase tracking-tighter italic">Opiniones Reales de Usuarios</h2>
                </div>
                <ReviewSection 
                    targetId="kit-vidrex-clarity" 
                    reviews={reviews} 
                    onAddReview={onAddReview} 
                    onDeleteReview={onDeleteReview} 
                    isAdmin={isAdmin} 
                />
            </div>

            <footer className="bg-nissi-blue py-12 px-6 border-t border-white/5">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-white text-2xl font-black italic tracking-tighter uppercase mb-4">Nissi Car Home</div>
                    <p className="text-white/40 text-sm font-medium tracking-tight">© {new Date().getFullYear()} - Estética Automotriz de Élite. Pereira, Colombia.</p>
                </div>
            </footer>

            <StickyWhatsApp />
        </div>
    );
};

export default LandingPageVidrexClarityWash;
