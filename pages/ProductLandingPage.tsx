
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../components/Products';
import { CartItem, Product, Review } from '../types';
import Accordion from '../components/shared/Accordion';
import BuyNowButton from '../components/shared/BuyNowButton';
import ReviewSection from '../components/shared/ReviewSection';

// Mapping of slugs to product IDs
const slugToId: Record<string, string> = {
    'Vidrex-Bloqueador-Manchas': 'prod-vidrex',
    'Clarity-Wash': 'prod-clarity',
    'Cera-Hyper-Diamond': 'prod-hyper-diamond',
    'Perfect-Llantix': 'prod-llantix',
    'Perfum-NISSI-CAR': 'prod-perfume-iq',
    'Ultra-Restorer': 'prod-restorer',
    'Rayones-Cero': 'prod-rayones-cero',
    'Shampoo-PH-Neutro': 'prod-shampoo',
    'Aplicador-Media-Luna': 'prod-aplicador',
    'Toalla-Microfibra': 'prod-toalla',
    'Aplicador-Redondo-Profesional': 'prod-aplicador-redondo'
};

// Inverse mapping for navigation
export const idToSlug: Record<string, string> = Object.entries(slugToId).reduce((acc, [slug, id]) => {
    acc[id] = slug;
    return acc;
}, {} as Record<string, string>);

declare const fbq: (type: string, event: string, data?: object) => void;

interface ProductLandingPageProps {
    onBuyNow: (item: CartItem) => void;
    reviews: Review[];
    onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
    onDeleteReview: (id: string) => void;
    isAdmin: boolean;
}

const ProductLandingPage: React.FC<ProductLandingPageProps> = ({ onBuyNow, reviews, onAddReview, onDeleteReview, isAdmin }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const allProducts = useMemo(() => getAllProducts(), []);
    const [isFAQExpanded, setIsFAQExpanded] = React.useState(false);
    
    const product = useMemo(() => {
        const id = slug ? slugToId[slug] : null;
        return allProducts.find(p => p.id === id);
    }, [slug, allProducts]);

    useEffect(() => {
        if (!product && slug) {
            navigate('/');
            return;
        }

        if (product) {
            const originalTitle = document.title;
            document.title = `${product.name} - Nissi Car Home`;
            window.scrollTo(0, 0);

            if (typeof fbq === 'function') {
                fbq('track', 'ViewContent', {
                    content_name: product.name,
                    content_category: product.category,
                    content_ids: [product.id],
                    content_type: 'product',
                    value: product.price,
                    currency: 'COP'
                });
            }

            return () => { document.title = originalTitle; };
        }
    }, [product, slug, navigate]);

    if (!product) return null;

    const handleBuyNow = () => {
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        };
        
        if (typeof fbq === 'function') {
            fbq('track', 'AddToCart', {
                content_name: product.name,
                content_ids: [product.id],
                content_type: 'product',
                value: product.price,
                currency: 'COP'
            });
        }
        
        onBuyNow(cartItem);
    };

    return (
        <div className="bg-[#e0e5ec] font-sans min-h-screen pb-20 md:pb-0">
            {/* Elegant Hero Section */}
            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
                {/* Decorative Elements for Elegance */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-white/40 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 text-center md:text-left z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/50 backdrop-blur-md border border-white/50 text-amber-600 text-[10px] font-black tracking-[0.2em] uppercase shadow-sm mx-auto md:mx-0">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                {product.category}
                            </div>
                            
                            {/* Subtle Share Button */}
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('¡Enlace copiado al portapapeles!');
                                }}
                                className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-widest mx-auto md:mx-0 group"
                            >
                                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Compartir
                            </button>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tighter italic text-center md:text-center">
                            {product.name}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium text-justify hyphens-auto break-words mx-auto md:mx-0">
                            {product.shortDesc} {product.details?.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                            <BuyNowButton 
                                onClick={handleBuyNow} 
                                text="¡ADQUIRIR AHORA!"
                                className="md:mx-0"
                                showShare={false}
                            />
                            <div className="flex flex-col">
                                <span className="text-gray-400 text-xs line-through font-bold uppercase tracking-widest">Antes ${(product.price * 1.3).toLocaleString('es-CO')}</span>
                                <span className="text-3xl font-black text-gray-900">${product.price.toLocaleString('es-CO')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center z-10">
                        <div className="relative group p-4 sm:p-8 aspect-[1/1] w-full max-w-md">
                            <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[3rem] border border-white/50 shadow-neumorphic-outset transform rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 p-8"
                                loading="eager"
                                decoding="async"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Neumorphic Style */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter italic">Excelencia en cada detalle</h2>
                        <div className="h-1.5 w-20 bg-amber-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {product.details?.features?.map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-3xl shadow-neumorphic-outset bg-[#e0e5ec] border border-white/20 hover:scale-[1.02] transition-transform duration-300">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-6 shadow-inner">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-gray-800 mb-3 uppercase tracking-tight text-center">{feature}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-medium text-justify hyphens-auto break-words">Comprometidos con la perfección, brindamos resultados que superan las expectativas en cada uso.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Use Section - Harmonious Design */}
            <section className="py-20 px-4 bg-white/30 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-[3rem] shadow-neumorphic-outset bg-[#e0e5ec] overflow-hidden flex flex-col md:flex-row border border-white/30">
                        <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic">Guía de Aplicación</h2>
                            <div className="space-y-6">
                                <div className="relative p-8 rounded-3xl bg-white/50 border border-white/80 shadow-inner">
                                    <p className="text-gray-700 leading-relaxed italic text-lg font-medium text-justify hyphens-auto break-words">
                                        "{product.details?.howToUse}"
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-2 py-1 px-3 rounded-full bg-green-100 text-green-700">● Seguro</span>
                                    <span className="flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700">● Profesional</span>
                                    <span className="flex items-center gap-2 py-1 px-3 rounded-full bg-amber-100 text-amber-700">● Efectivo</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-900 p-10 lg:p-16 text-white flex flex-col justify-center">
                            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-amber-500 italic text-center">Precauciones</h2>
                            <p className="text-gray-300 mb-10 leading-relaxed font-medium text-justify hyphens-auto break-words">
                                {product.details?.precautions}
                            </p>
                            <div className="border-t border-white/10 pt-8">
                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-500/60 mb-3">Fórmula Exclusiva</p>
                                <p className="text-sm font-bold text-gray-100">{product.details?.composition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Elegant Dark Touch */}
            <section className="py-24 px-4 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">Experiencias Nissi</h2>
                        <p className="text-amber-500 uppercase tracking-[0.3em] text-[10px] font-black">Lo que dicen nuestros clientes</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Ricardo G.", text: `El ${product.name} superó mis expectativas. La calidad es profesional y el resultado se nota de inmediato.`, stars: 5 },
                            { name: "Marta S.", text: `Increíble cómo rinde el producto. Lo usé en mi camioneta y quedó como nueva. ¡Recomendado!`, stars: 5 },
                            { name: "Luis P.", text: `Excelente atención y el ${product.name} llegó muy rápido. Nissi Car Home nunca falla.`, stars: 5 }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-amber-500/30 transition-all duration-500 group">
                                <div className="text-amber-500 mb-6 text-xl flex gap-1 justify-center">
                                    {"★".repeat(t.stars)}
                                </div>
                                <p className="text-gray-300 italic mb-8 leading-relaxed text-lg font-medium text-justify hyphens-auto break-words">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-black text-gray-900 text-sm">
                                        {t.name[0]}
                                    </div>
                                    <p className="font-black uppercase tracking-widest text-[10px] text-white">{t.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - Clean Neumorphic */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-[#e0e5ec] border border-white/30">
                        <div 
                            className="text-center cursor-pointer group"
                            onClick={() => setIsFAQExpanded(!isFAQExpanded)}
                        >
                            <div className="flex flex-col items-center">
                                <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter italic flex items-center gap-3">
                                    Preguntas Frecuentes
                                    <svg 
                                        className={`w-6 h-6 sm:w-8 sm:h-8 text-amber-500 transition-transform duration-500 ${isFAQExpanded ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </h2>
                                <p className="text-gray-600 font-medium">
                                    {isFAQExpanded 
                                        ? "Resolvemos tus dudas sobre este producto y nuestros servicios."
                                        : "Haz clic para ver las dudas comunes sobre este producto."
                                    }
                                </p>
                            </div>
                        </div>

                        <div className={`grid transition-all duration-500 ease-in-out ${isFAQExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="space-y-6">
                                    <Accordion title={`¿Para qué superficies sirve el ${product.name}?`}>
                                        <p className="text-gray-600 leading-relaxed font-medium">
                                            Está diseñado específicamente para {product.details?.surfaces?.join(', ') || 'las superficies indicadas en la descripción'}. 
                                            Siempre recomendamos probar en un área pequeña antes de la aplicación completa para asegurar la compatibilidad.
                                        </p>
                                    </Accordion>
                                    <Accordion title="¿Tiempos de entrega?">
                                        <p className="text-gray-600 leading-relaxed font-medium">Realizamos envíos a todo el país con cobertura total. El tiempo estimado de entrega es de 2 a 5 días hábiles, con rastreo en tiempo real de tu pedido.</p>
                                    </Accordion>
                                    <Accordion title="¿Garantía de satisfacción?">
                                        <p className="text-gray-600 leading-relaxed font-medium">¡Absolutamente! En Nissi Car Home nos enorgullecemos de la calidad. Si el producto no cumple con lo prometido, nuestro equipo de soporte te ayudará de inmediato.</p>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ReviewSection 
                    targetId={product.id} 
                    reviews={reviews} 
                    onAddReview={onAddReview} 
                    onDeleteReview={onDeleteReview} 
                    isAdmin={isAdmin} 
                />
            </div>

            {/* Sticky Mobile CTA - Refined */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-white/50 p-4 md:hidden z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                <div className="pl-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Inversión</p>
                    <p className="text-xl font-black text-gray-900">${product.price.toLocaleString('es-CO')}</p>
                </div>
                <button
                    onClick={handleBuyNow}
                    className="bg-amber-500 text-white font-bold py-3 px-8 rounded-2xl shadow-lg active:scale-95 uppercase text-xs tracking-widest"
                >
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default ProductLandingPage;
