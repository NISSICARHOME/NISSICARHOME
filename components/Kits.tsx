
import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Kit } from '../types';
import { motion } from 'motion/react';

interface ExtendedKit extends Kit {
    link?: string;
    specialPrice?: string;
    oldPrice?: string;
}

const kitsData: ExtendedKit[] = [
    {
        id: "kit-vidrex-clarity",
        name: "KIT ESTRELLA: Vidrex + Clarity Wash",
        image: "https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0",
        description: "La solución definitiva para desmanchar vidrios, eliminar sarro, lluvia ácida y devolver la vida a tu auto y hogar. ¡Resultados garantizados!",
        isSpecial: true,
        oldPrice: "$90.000 COP",
        specialPrice: "$65.500 COP",
        includes: [
            "1 Crema Clarity Wash (300 gr)",
            "1 Vidrex Bloqueador (120 ml)",
            "¡GRATIS! Segundo Potencializador",
            "¡GRATIS! Aplicador Profesional",
            "Asesoría Técnica Especializada",
        ],
        link: "#/kit-vidrex-clarity-wash"
    },
    {
        id: "kit-2",
        name: "Kit de Embellecimiento para tu Vehículo",
        oldPrice: "$190.000 COP",
        price: "$135.000 COP",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMiEaGvxMmboKjwIcIwPiUomCW-T-pkMiyKY5H3gq9M0yc02NoYMO1ADS47hcfT-UyVikXUwPEJkwLUxABSFt4AOVXD2wa9Vhu3hmCXmTvejzj1QyTy9Tr6nVkCl1MFOz58gxgYsDqxLD0uQMXTxPn8=w777-h713-s-no-gm?authuser=0",
        description: "Dale a tu vehículo el tratamiento 6 en 1 que se merece. Este kit ha sido cuidadosamente formulado para ofrecer un embellecimiento integral, restaurando, protegiendo y brillando cada superficie.",
        includes: [
            "1 Cera Hyper Diamond (Protección y Brillo)",
            "1 Ultra Restorer (Restaura Plásticos)",
            "1 Perfect Llantix (Brillo e Hidratación para Llantas)",
            "1 Shampoo pH Neutro (Limpieza Profunda)",
            "¡GRATIS! 2 Aplicadores de Espuma",
            "¡GRATIS! 1 Toalla de Microfibra Profesional",
        ],
        link: "#/kit-embellecimiento",
    },
    {
        id: "kit-1",
        name: "Kit Básico de Cuidado",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOzc5XobmAERtALiliyk1JbpWK9TtlNYR-Gq8ho_9NrxGyhRPsDqNM-pw--dmicYoJ0_81bX_O_lzOKpZgscWtppJojH71Pg6PkQH4o-KcNy9eQKQ5Tb0jyUd6yAN_E_fQAB2JsWaoh-N5LdH_xss1_=w801-h584-s-no-gm?authuser=0",
        description: "El punto de partida perfecto para mantener tu vehículo limpio y protegido. Incluye nuestros productos esenciales para un acabado profesional.",
        oldPrice: "$150.000 COP",
        price: "$95.000 COP",
        includes: [
            "1 Cera Hyper Diamond (Brillo)",
            "1 Ultra Restorer (Plásticos)",
            "1 Perfect Llantix (Llantas)",
            "¡GRATIS! 2 Aplicadores de Espuma",
            "¡GRATIS! 1 Toalla de Microfibra",
        ],
        link: "#/kit-basico-cuidado"
    },
];

const complementsData: Kit[] = [
     { id: "comp-1", name: "Aplicador Media Luna", image: "https://lh3.googleusercontent.com/pw/AP1GczMQ4EUxiH3Ndfgs385HG6O8xSn6tRe-hKzmI2RX2bfziUZzV8TqTzEF66DO7c7FINzqGNj2Wx3_0o6NghBXnC8Dad4V81LJDDqU3n5vrv01KuPR8Lyn4jgayBDxS21B9l28P6ozJt6UZ2skGHKMhLkZ=w500-h717-s-no-gm?authuser=0", description: "Espuma de densidad blanda y estructura absorbente, ideal para ceras y selladores." },
     { id: "comp-2", name: "Aplicador Circular", image: "https://lh3.googleusercontent.com/pw/AP1GczMl24J1GR_orR_Xw7thAwrMe8WBWVwB34ijfSM85dxWbmthn2KnKu7VXF7P4EablqqNSGyfBjaMzlpMYP4kHZFPD_6vesv2Tp_IMajMs2tLGXJtKNZiQ53rWRS2f4G86KxNP6kYH6BBaCqXutbfYcST=w466-h366-s-no-gm?authuser=0", description: "Perfecto para aplicar restauradores y protectores en plásticos y llantas." },
     { id: "comp-3", name: "Toalla de Microfibra", image: "https://lh3.googleusercontent.com/pw/AP1GczPn8Nx3WgdMKOguR8-_ISl7lyhdrJoWEWxaFuy3-po0uM7NAQAT4vSdBSj2LZkpNQ52hEvJ-Kgd3TG1WPCaaGklZSukEoquViMAuPeEImOPVd39drDoagydRag8yKyCAPh63Er63riRmEKFJLwZ_nv2=w354-h372-s-no-gm?authuser=0", description: "Ultra suave y absorbente, esencial para retirar ceras y secar sin dejar rayones." },
];

const KitCard: React.FC<{ kit: ExtendedKit; index: number }> = ({ kit, index }) => {
    const isSpecial = kit.id === 'kit-vidrex-clarity';
    const isBeautyKit = kit.id === 'kit-2';
    const isBasicKit = kit.id === 'kit-1';
    
    const hasLandingPage = kit.link && kit.link.startsWith('#/');
    const to = hasLandingPage ? kit.link.substring(1) : '/#contacto';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <HashLink 
                to={to}
                className={`
                    bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl 
                    transition-all duration-500 flex flex-col lg:flex-row items-center group overflow-hidden
                    ${isSpecial ? 'ring-2 ring-red-500 ring-offset-4' : isBeautyKit ? 'ring-2 ring-amber-500 ring-offset-4' : isBasicKit ? 'ring-2 ring-blue-500 ring-offset-4' : ''}
                `}
            >
                <div className="w-full lg:w-2/5 p-8 flex-shrink-0 bg-gray-50 flex items-center justify-center">
                    <img 
                        src={kit.image} 
                        alt={kit.name} 
                        loading="lazy"
                        className="w-full h-auto max-h-[300px] object-contain transition-transform duration-700 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                    />
                </div>

                <div className="p-8 lg:p-12 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                        {isSpecial && <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Oferta Estrella</span>}
                        {isBeautyKit && <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Recomendado</span>}
                        {isBasicKit && <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Esencial</span>}
                    </div>
                    
                    <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase italic tracking-tighter leading-none">
                        {kit.name}
                    </h3>
                    
                    <div className="flex items-baseline gap-4 mb-6">
                        {kit.oldPrice && <span className="text-lg text-gray-400 line-through font-medium">{kit.oldPrice}</span>}
                        <span className={`text-4xl font-black tracking-tighter ${isSpecial ? 'text-red-500' : isBeautyKit ? 'text-amber-500' : 'text-blue-500'}`}>
                            {kit.specialPrice || kit.price}
                        </span>
                    </div>

                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                        {kit.description}
                    </p>
                    
                    {kit.includes && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {kit.includes.map((item, i) => (
                                <div key={i} className="flex items-center text-sm font-bold text-gray-700">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${isSpecial ? 'bg-red-50 text-red-500' : isBeautyKit ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={`inline-flex items-center justify-center px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-lg ${isSpecial ? 'bg-red-500 text-white group-hover:shadow-red-500/20' : isBeautyKit ? 'bg-amber-500 text-white group-hover:shadow-amber-500/20' : 'bg-blue-500 text-white group-hover:shadow-blue-500/20'}`}>
                        {isSpecial ? 'Obtener Oferta' : 'Ver Detalles'}
                        <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            </HashLink>
        </motion.div>
    );
};

const Kits: React.FC = () => {
    return (
        <section id="kits" className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-block mb-6 px-4 py-1.5 bg-amber-50 rounded-full">
                        <span className="text-amber-600 text-xs font-black uppercase tracking-widest">Ahorro Inteligente</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter leading-none">
                        KITS <span className="text-amber-500">EXCLUSIVOS</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Soluciones completas diseñadas para maximizar resultados con el mejor precio del mercado.
                    </p>
                </div>

                <div className="space-y-12 mb-24">
                    {kitsData.map((kit, index) => <KitCard key={kit.id} kit={kit} index={index} />)}
                </div>

                <div className="bg-white rounded-[3rem] p-12 lg:p-20 border border-gray-100 shadow-sm text-center">
                    <h3 className="text-3xl font-black text-gray-900 mb-12 uppercase italic tracking-tighter">Complementos Esenciales</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {complementsData.map((comp, index) => (
                            <motion.div 
                                key={comp.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="aspect-square bg-gray-50 rounded-[2rem] p-8 mb-6 flex items-center justify-center transition-all duration-500 group-hover:bg-amber-50 group-hover:shadow-xl group-hover:shadow-amber-500/10">
                                    <img 
                                        src={comp.image} 
                                        alt={comp.name} 
                                        loading="lazy"
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-tight">{comp.name}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Kits;
