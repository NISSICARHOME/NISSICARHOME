import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, ShoppingCart, Star, CheckCircle } from 'lucide-react';
import Accordion from '../components/shared/Accordion';
import { CartItem, Review } from '../types';
import ReviewSection from '../components/shared/ReviewSection';

// --- STYLES & CONSTANTS ---
const NISSI_BLUE = "#003366";
const NISSI_ORANGE = "#FF6600";

// --- HELPER COMPONENTS ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-lg">
    <svg className="h-7 w-7 text-green-500 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{children}</span>
  </li>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);


// --- PAGE SECTIONS ---

const LandingHero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-black text-nissi-blue mb-6 leading-[1.1] uppercase tracking-tighter">
            Kit de Embellecimiento Vehicular
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-10 leading-relaxed font-medium">
            El Spa profesional para tu vehículo en un solo lugar. Restaura plásticos, brilla carrocería y protege cada detalle.
          </p>
          <a 
            href="#precios"
            className="inline-block bg-nissi-orange text-white font-black text-xl py-5 px-10 rounded-2xl shadow-[0_20px_40px_rgba(255,102,0,0.3)] hover:shadow-[0_25px_50px_rgba(255,102,0,0.45)] transition-all uppercase tracking-tight"
          >
            VER OFERTAS DE HOY
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative group"
        >
          <div className="absolute inset-0 bg-nissi-blue/5 blur-3xl rounded-full scale-110" />
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczNSs4K4z7Muf8CJ8r97YPPxwdEt8v18SCeNjavCHFsFjRv4GxDJPB88me-dpcdn41MVMQm6AfXaKDAwyuJc5CMvz9IRl4FPDycp4k-zhkGv3CRm_W3SneIByCt3P07khKMOipuWliIdl-GXeovuPKxm=w991-h991-s-no-gm?authuser=0" 
            alt="Kit Embellecimiento Nissi" 
            className="relative z-10 w-full h-auto drop-shadow-2xl rounded-3xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

const OffersGrid: React.FC = () => {
    const handleWhatsApp = (promoName: string, price: string) => {
        const message = encodeURIComponent(`Hola Nissi Car Home, deseo adquirir la promoción de ${promoName} por valor de ${price}`);
        window.open(`https://wa.me/573103754727?text=${message}`, '_blank');
    };

    return (
        <section id="precios" className="py-24 bg-gray-50 px-6 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Offer A - 2x1 */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-12 flex flex-col items-center border border-gray-100 relative min-h-[750px] justify-between"
                    >
                        <div className="w-full flex flex-col items-center">
                            {/* Jerarquía: Título Arriba - Simetría Perfecta */}
                            <div className="mb-12 text-center w-full">
                                <h3 className="text-4xl font-black text-nissi-blue mb-2 uppercase tracking-tight italic">
                                    2X1 OBSEQUIO
                                </h3>
                                <div className="h-1.5 w-24 bg-nissi-orange mx-auto rounded-full" />
                            </div>

                            {/* Jerarquía: Productos en el Centro (Formato Vertical 9:16 Ad-Style) */}
                            <div className="w-full max-w-[320px] aspect-[9/16] bg-black/5 rounded-[2.5rem] mb-12 border-4 border-black/5 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                                <iframe 
                                    src="https://drive.google.com/file/d/1K66h7TUKC5Rx5PFgBVukB_UB5Dqf9iqt/preview" 
                                    width="1080" 
                                    height="1920"
                                    className="w-full h-full border-0 absolute inset-0 sm:scale-105" 
                                    allow="autoplay"
                                    loading="lazy"
                                    title="Promo 2x1 Nissi"
                                ></iframe>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/10 opacity-40 group-hover:opacity-60 transition-opacity" />
                            </div>

                            {/* Jerarquía: Precio Abajo - Máxima Legibilidad */}
                            <div className="mb-12 text-center w-full bg-gray-50 py-6 rounded-3xl border border-gray-100">
                                <span className="text-nissi-blue/40 text-xs font-black uppercase tracking-[0.2em] block mb-2">Oferta Especial Lanzamiento</span>
                                <p className="text-5xl font-black text-nissi-orange italic tracking-tighter flex items-center justify-center gap-2">
                                    $75.000 <span className="text-xl not-italic opacity-50 font-bold">COP</span>
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleWhatsApp('PROMO 2X1 OBSEQUIO', '$75.000')}
                            className="w-full py-6 bg-nissi-blue text-white font-black rounded-2xl hover:bg-nissi-blue/90 transition-all uppercase tracking-tight text-2xl shadow-xl shadow-nissi-blue/20 border-b-8 border-black/20"
                        >
                            LO QUIERO AHORA
                        </button>
                    </motion.div>

                    {/* Offer B - 3x2 */}
                    <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-8 md:p-12 flex flex-col items-center border-8 border-nissi-orange relative min-h-[780px] justify-between overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 p-4 opacity-10 pointer-events-none">
                            <Truck className="w-16 h-16 text-nissi-blue -rotate-12" />
                        </div>
                        <div className="absolute bottom-1/2 right-0 p-4 opacity-10 pointer-events-none translate-x-4">
                            <Star className="w-20 h-20 text-nissi-orange rotate-12" />
                        </div>

                        <div className="w-full flex flex-col items-center flex-grow">
                            {/* Jerarquía: Título Arriba */}
                            <div className="mb-8 text-center w-full pt-4">
                                <h3 className="text-4xl md:text-5xl font-black text-nissi-blue mb-2 uppercase tracking-tight italic leading-tight">PAGA 2 LLEVA 3 KITS</h3>
                                <div className="h-2 w-32 bg-nissi-orange mx-auto rounded-full" />
                            </div>

                            {/* Jerarquía: Productos en el Centro (9:16) */}
                            <div className="w-full max-w-[340px] aspect-[9/16] bg-black/5 rounded-[2.5rem] mb-8 border-4 border-nissi-blue/5 flex items-center justify-center relative overflow-hidden group shadow-2xl">
                                <iframe 
                                    src="https://drive.google.com/file/d/14LiL01LkOEIDzd2V-FVgD_WztIJxbxQ3/preview" 
                                    width="1080" 
                                    height="1920"
                                    className="w-full h-full border-0 absolute inset-0 sm:scale-105" 
                                    allow="autoplay"
                                    loading="lazy"
                                    title="Promo Paga 2 Lleva 3 Nissi"
                                ></iframe>
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/10 opacity-40 group-hover:opacity-60 transition-opacity" />
                            </div>

                            {/* Jerarquía: Precio Abajo */}
                            <div className="mb-8 text-center w-full bg-gray-50 py-4 px-6 rounded-3xl border border-gray-100 flex flex-col items-center">
                                <div className="flex items-center gap-6 mb-2">
                                    <div className="flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4 text-nissi-blue" />
                                        <span className="text-[10px] font-black text-nissi-blue/60 uppercase tracking-widest">Premium</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4 text-nissi-blue" />
                                        <span className="text-[10px] font-black text-nissi-blue/60 uppercase tracking-widest">Garantía</span>
                                    </div>
                                </div>
                                <div className="text-nissi-orange text-6xl font-black italic drop-shadow-[0_10px_15px_rgba(255,102,0,0.2)] tracking-tighter flex items-center justify-center gap-2">
                                    $120.000 <span className="text-2xl not-italic opacity-50 font-bold">COP</span>
                                </div>
                                <span className="text-nissi-blue/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Ahorro Máximo Directo</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleWhatsApp('PAGA 2 LLEVA 3 KITS', '$120.000')}
                            className="w-full py-6 bg-nissi-orange text-white font-black rounded-2xl transition-all uppercase tracking-tight text-3xl shadow-[0_25px_50px_rgba(255,102,0,0.2)] hover:scale-[1.03] hover:brightness-110 active:scale-95 border-b-8 border-black/20"
                        >
                            APROVECHA HOY
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const showcaseImages = [
    'https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=0',
    'https://lh3.googleusercontent.com/pw/AP1GczMRCg5IJKtk0Nsk4b0AmCpXgVJpOVau_j0unuT34A-ERi-VlNEM3dlql6qUOX1pO5XmmetvFX4K-iDa856iwZ758OQknG71I8TYGVqtMFeksWj6FGuoQNLwejhN_-aa3K9oC74pvfb3pbibxZfKvAz1=w991-h991-s-no-gm?authuser=0'
];

const LandingShowcase: React.FC = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setOffsetY(window.scrollY * 0.2);
      }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % showcaseImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(timer);
    }, []);


    return (
        <section className="relative h-[60vh] md:h-[80vh] flex flex-col items-center justify-center text-white text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                 {showcaseImages.map((src, index) => (
                    <img
                        key={src}
                        src={src}
                        alt="Vehículo detallado profesionalmente"
                        className={`absolute top-0 left-0 w-full min-h-[120vh] object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transform: `translateY(${offsetY}px)` }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                    />
                ))}
                <div className="absolute inset-0 bg-black opacity-60 water-overlay"></div>
            </div>
            <div className="relative z-10 p-8 max-w-4xl mx-auto bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Un Acabado Que Habla Por Sí Mismo</h2>
                <p className="text-lg md:text-xl">Observa la transformación y el nivel de detalle que puedes lograr.</p>
            </div>
        </section>
    );
}


const LandingWhatYouGet: React.FC = () => {
    const kitItems = [
        { name: '1. Hyper Diamond', content: "Cera con Carnauba y polímeros para brillar, proteger y 'diamantizar' la pintura. Crea una capa hidrofóbica que dura de 3 a 6 meses.", image: 'https://lh3.googleusercontent.com/pw/AP1GczP57aUodBhc7K7ZflHRVRKqTB9ExPi8JVngHqqJThksSH8zT7LTQD8k80pq435B6J5MRwOVBbN-ASnyjIuIrPzH8aDo2E2I4IRVI-EETt1Annaav3xd5c2Meneiq7_NR7oJSfqjTqTXWOuMzcfEQ0Xz=w193-h702-s-no-gm?authuser=0' },
        { name: '2. Ultra Restorer', content: "Restaura plásticos, caucho y cuero de cualquier color. Hidrata, devuelve el color y protege contra el sol y la lluvia con un potente efecto hidrofóbico.", image: 'https://lh3.googleusercontent.com/pw/AP1GczNzWe3SNPTGDhI1ITWJrY9XcI0YEzB5ibmX0yBwQZ5VGA_IE70mUL8Up595CNMsW5W4sB88HP8NdhYSB6yiFEJBJHD_EnmFC9xa6SNvRaS8LOD7loiX8V4W4uRZ8PfVY-opmLWTv6Gbn8nNjreGDGOK=w167-h659-s-no-gm?authuser=0' },
        { name: '3. Perfect Llantix', content: "Hidrata profundamente las llantas, dándoles una apariencia nueva y brillante. Evita el desgaste y cuarteamiento. Duración de 15 a 20 días. (250ml)", image: 'https://lh3.googleusercontent.com/pw/AP1GczOjiJJeZc6HIutbfWKJGXISSyYp6uFOXne3E4Bxw8mZijJQzpOBRpjiyvtjQi4tw0SZ2Bg6aT5bjQ559BIZ4UO1DXvcZMjqXGHDQaAsGvyDdphGMwjNdb8QM0AKlue18DUnkhu6IjMw6Z9q3H5BVFW0=w1080-h800-s-no-gm?authuser=0' },
        { name: '4. Shampoo pH Neutro', content: "Lava la carrocería sin dañar la pintura. Su fórmula multiusos también quita manchas de la cojinería y el techo, y deja una capa que repele el polvo.", image: 'https://lh3.googleusercontent.com/pw/AP1GczOoQ2FzQzw_XT_wjt3OwSHwF7eKa7UU9JvuVHye01TYVTOIoC5souIqz7GOZ685LZ5qEnFVdveH7TvsX6erA6EkdHQex7x08fe1RCkUnVsRtQiMpv09PT3_TBP1aPYyV9K1FHhg54gjSjUFQUbdkB0i=w207-h560-s-no-gm?authuser=0' },
        { name: '5. Aplicadores de Espuma (x2)', content: "GRATIS. Espuma blanda diseñada para esparcir los productos de manera uniforme y segura, sin rayar ninguna superficie.", image: 'https://lh3.googleusercontent.com/pw/AP1GczPnlvdqEOaMSPmluNpiZJ6bire1z001a4V6bNTg-wbKKZXj2BcDJrB5f5lkJ9P_ra2V8xL8NMzxMkV6ag09MMTv29CtAQoLoG3DtutAXc1u8HtnRzXrtEOAZH963OstZ-5lrSuTj2GkCVmFwyaX61sw=w466-h366-s-no-gm?authuser=0' },
        { name: '6. Toalla de Microfibra Profesional', content: "GRATIS. Toalla (80% algodón, 20% poliéster) ultra suave para dar el acabado final y lograr un brillo deslumbrante.", image: 'https://lh3.googleusercontent.com/pw/AP1GczPFl5r7A_X0sLUaQeHpmlYuOMSd699hRkGR1yjovzriJaTjm0ioFvft9aa_vEFi4lDLbddyEXrtF9Fab_X1c_pu0tvLBgD-oSHnmQXGYv3fLSNPBpxgDZ1mNPliGakCFXNFbuC0D1gtqrLnYxsShp2T=w748-h404-s-no-gm?authuser=0' }
    ];

    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">Un Arsenal Completo Para un Detallado de Lujo</h2>
                <p className="text-center text-xl text-gray-600 mb-12">Cada fórmula ha sido diseñada para un propósito específico, garantizando resultados superiores.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {kitItems.map(item => (
                        <div key={item.name} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <div className="h-40 w-full mb-4 relative overflow-hidden">
                                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-contain" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                            </div>
                            <h3 className="text-xl font-bold text-amber-600 flex-grow text-center">{item.name}</h3>
                            <p className="text-gray-700 text-justify hyphens-auto break-words">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LandingVideo: React.FC = () => {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">Míralo en Acción</h2>
                 <div className="aspect-video w-full rounded-lg shadow-lg overflow-hidden border-4 border-gray-200">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/vk3W73Pnan0?si=A6kWy7eGKIG4yxHa"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </section>
    );
};


const faqBeautyKitData = [
    { question: "¿Qué productos incluye el nuevo Kit de Embellecimiento Profesional?", answer: "El kit incluye 6 componentes: Cera Hyper Diamond, Ultra Restorer de plásticos, Perfect Llantix, Shampoo pH Neutro, y como obsequio, dos aplicadores de espuma y una toalla de microfibra profesional." },
    { question: "¿Cuánto dura la protección de la cera Hyper Diamond?", answer: "Gracias a su fórmula con Carnauba y polímeros, la protección hidrofóbica (que repele el agua) y el brillo pueden durar entre 3 y 6 meses, dependiendo de las condiciones de uso y clima." },
    { question: "El Ultra Restorer, ¿sirve para plásticos de colores o solo negros?", answer: "Sirve para cualquier color de plástico, caucho, cuero o cuero sintético. Su función es hidratar y devolver el color original, por lo que es efectivo en una amplia gama de superficies." },
    { question: "¿El Shampoo es solo para la carrocería?", answer: "No, es un producto multiusos. Su principal función es lavar la carrocería de forma segura gracias a su pH neutro, pero también es muy eficaz para quitar manchas en la cojinería y el techo del vehículo." },
    { question: "Los aplicadores y la toalla, ¿son de buena calidad?", answer: "Absolutamente. Son herramientas de grado profesional. Las espumas están diseñadas para no rayar y aplicar el producto de forma uniforme, y la toalla de microfibra tiene la suavidad y composición ideal (80% algodón, 20% poliéster) para un acabado perfecto." },
];

const LandingSocialProofFAQ: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 px-4 bg-gray-50">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">Clientes Felices, Autos Impecables</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                     {[
                         {name: "Juan David G.", city: "Pereira", quote: "¡Mi carro parece otro! La cera le dio un brillo increíble y el restaurador de plásticos es simplemente mágico. Volvió negras unas partes que llevaban años grises."},
                         {name: "Sofia L.", city: "Cali", quote: "Excelente relación calidad-precio. Con este kit tengo todo lo que necesito para dejar mi camioneta como nueva el fin de semana. ¡Y el envío fue rapidísimo!"},
                         {name: "Miguel Ángel R.", city: "Medellín", quote: "Compré el kit sin muchas expectativas y me sorprendió. Los productos son muy fáciles de usar y los resultados son de nivel profesional. Lo recomiendo totalmente."},
                         {name: "Carolina V.", city: "Bogotá", quote: "Me encantó el detalle de los aplicadores y la toalla. Se nota que piensan en todo. El shampoo quita las manchas de la cojinería súper fácil."},
                     ].map(testimonial => (
                        <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex text-yellow-400 mb-2 justify-center">{"★★★★★".split("").map((s,i) => <span key={i}>{s}</span>)}</div>
                            <p className="text-gray-600 italic mb-4 text-justify hyphens-auto break-words">"{testimonial.quote}"</p>
                            <p className="font-bold text-gray-800 text-right">- {testimonial.name} ({testimonial.city})</p>
                        </div>
                     ))}
                </div>
                
                <div className="p-4 sm:p-8 rounded-3xl shadow-neumorphic-outset overflow-hidden bg-white">
                    <div 
                        className="text-center cursor-pointer group"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-extrabold text-gray-800 sm:text-3xl flex items-center gap-3">
                                Resolvemos tus Dudas
                                <svg 
                                    className={`w-6 h-6 sm:w-8 sm:h-8 text-amber-500 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                </svg>
                            </h2>
                            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
                                {isExpanded 
                                    ? "Resolvemos tus dudas sobre el Kit de Embellecimiento y sus componentes."
                                    : "Haz clic aquí para ver las preguntas frecuentes sobre el Kit de Embellecimiento Profesional."
                                }
                            </p>
                        </div>
                    </div>

                    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-8 sm:mt-12' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="space-y-4">
                                {faqBeautyKitData.map((item, index) => (
                                    <Accordion key={index} title={item.question}>
                                        <p className="text-gray-700 text-justify hyphens-auto break-words">{item.answer}</p>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};


// --- MAIN LANDING PAGE COMPONENT ---
interface LandingPageProps {
  onBuyNow: (item: CartItem) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview: (id: string) => void;
  isAdmin: boolean;
}

const LandingPageBeautyKit: React.FC<LandingPageProps> = ({ onBuyNow, reviews, onAddReview, onDeleteReview, isAdmin }) => {
    
    useEffect(() => {
        const originalTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

        const newTitle = "Kit de Embellecimiento Profesional 6 en 1 - Nissi Car Home";
        const newDescription = "Todo lo que necesitas para restaurar, proteger y brillar tu vehículo como un profesional. ¡Resultados garantizados que deslumbran y duran!";
        const imageUrl = "https://lh3.googleusercontent.com/pw/AP1GczNSs4K4z7Muf8CJ8r97YPPxwdEt8v18SCeNjavCHFsFjRv4GxDJPB88me-dpcdn41MVMQm6AfXaKDAwyuJc5CMvz9IRl4FPDycp4k-zhkGv3CRm_W3SneIByCt3P07khKMOipuWliIdl-GXeovuPKxm=w991-h991-s-no-gm?authuser=0";

        document.title = newTitle;
        if (metaDescription) {
            metaDescription.setAttribute('content', newDescription);
        }

        const tagsToSet = {
            'og:title': newTitle,
            'og:description': newDescription,
            'og:image': imageUrl,
            'og:url': window.location.href,
            'twitter:card': 'summary_large_image',
        };

        const addedTags: HTMLElement[] = [];

        Object.entries(tagsToSet).forEach(([property, content]) => {
            const tag = document.createElement('meta');
            tag.setAttribute('property', property);
            tag.setAttribute('content', content);
            document.head.appendChild(tag);
            addedTags.push(tag);
        });

        return () => {
            document.title = originalTitle;
            if (metaDescription && originalDescription) {
                metaDescription.setAttribute('content', originalDescription);
            }
            addedTags.forEach(tag => document.head.removeChild(tag));
        };
    }, []);

    return (
        <div className="bg-white font-sans">
            <LandingHero />
            <OffersGrid />
            <LandingVideo />
            <LandingWhatYouGet />
            <LandingShowcase />
            <LandingSocialProofFAQ />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100 mt-12">
                <ReviewSection 
                    targetId="kit-2" 
                    reviews={reviews} 
                    onAddReview={onAddReview} 
                    onDeleteReview={onDeleteReview} 
                    isAdmin={isAdmin} 
                />
            </div>
            
            {/* WhatsApp Float */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
                <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://wa.me/573103754727?text=Hola,%20necesito%20asesoría%20con%20un%20producto" 
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
                            alt="Soporte Nissi"
                            className="relative z-10 drop-shadow-xl"
                        />
                    </div>
                </motion.a>
            </div>
        </div>
    );
};

export default LandingPageBeautyKit;