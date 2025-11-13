import React from 'react';
import { Kit } from '../types';

interface ExtendedKit extends Kit {
    link?: string;
}

const kitsData: ExtendedKit[] = [
    {
        id: "kit-vidrex-clarity",
        name: "KIT ESTRELLA: Vidrex + Clarity Wash",
        image: "https://lh3.googleusercontent.com/pw/AP1GczN6yIeskFqBi_Gk6syxGzQB2TB-ERL44l2K905Io7mcitBNIWwpwAdxHIXuBCYkxX4T80d7FkisbUQ0hKAk0YQxe_CpeBmAOk6cVnpP2ehDIUZbL15rD548iIRUQtMTcyHs657Iy4XOVITsL6PM6hfx=w1040-h800-s-no-gm?authuser=0",
        description: "La solución definitiva para desmanchar vidrios, eliminar sarro, lluvia ácida y devolver la vida a tu auto y hogar. ¡Resultados garantizados!",
        isSpecial: true,
        price: "¡Oferta Especial!",
        link: "#/kit-vidrex-clarity-wash"
    },
    {
        id: "kit-2",
        name: "Kit de Embellecimiento para tu Vehículo",
        price: "$125.000 COP",
        image: "https://lh3.googleusercontent.com/pw/AP1GczMY47G5C1QfpxseWKtafJTKBxtMW7FzwcLr1hkzefpVRIWH9g45SMv9L9gc1bfIlS0JR4k2Jd7wBEX03hN7BmRHjFjjwreFEr0CHDpxV62-Fbd84Hth8LkrXy_gdHHSx3fo88RnFQDficvQM5jnsNEz=w620-h424-s-no-gm?authuser=0",
        description: "Dale a tu vehículo el tratamiento completo que se merece. Este kit ha sido cuidadosamente seleccionado para ofrecer un embellecimiento integral.",
        includes: [
            "1 Cera Hyper Diamond con Carnauba (220 gr)",
            "1 Brillo Protector Perfect Llantix (250 ml)",
            "¡OBSEQUIO ESPECIAL! 1 Ultra Restorer de Partes Negras (120 ml)",
            "2 Aplicadores de Espuma (Abrasividad Blanda)",
        ],
        link: "#/kit-embellecimiento",
    },
    {
        id: "kit-1",
        name: "Kit Básico de Cuidado",
        image: "https://lh3.googleusercontent.com/pw/AP1GczOzc5XobmAERtALiliyk1JbpWK9TtlNYR-Gq8ho_9NrxGyhRPsDqNM-pw--dmicYoJ0_81bX_O_lzOKpZgscWtppJojH71Pg6PkQH4o-KcNy9eQKQ5Tb0jyUd6yAN_E_fQAB2JsWaoh-N5LdH_xss1_=w801-h584-s-no-gm?authuser=0",
        description: "El punto de partida perfecto para mantener tu vehículo limpio y protegido. Incluye nuestros productos esenciales.",
    },
];

const complementsData: Kit[] = [
     { id: "comp-1", name: "Aplicador Media Luna", image: "https://lh3.googleusercontent.com/pw/AP1GczMQ4EUxiH3Ndfgs385HG6O8xSn6tRe-hKzmI2RX2bfziUZzV8TqTzEF66DO7c7FINzqGNj2Wx3_0o6NghBXnC8Dad4V81LJDDqU3n5vrv01KuPR8Lyn4jgayBDxS21B9l28P6ozJt6UZ2skGHKMhLkZ=w500-h717-s-no-gm?authuser=0", description: "Espuma de densidad blanda y estructura absorbente, ideal para ceras y selladores." },
     { id: "comp-2", name: "Aplicador Circular", image: "https://lh3.googleusercontent.com/pw/AP1GczMl24J1GR_orR_Xw7thAwrMe8WBWVwB34ijfSM85dxWbmthn2KnKu7VXF7P4EablqqNSGyfBjaMzlpMYP4kHZFPD_6vesv2Tp_IMajMs2tLGXJtKNZiQ53rWRS2f4G86KxNP6kYH6BBaCqXutbfYcST=w466-h366-s-no-gm?authuser=0", description: "Perfecto para aplicar restauradores y protectores en plásticos y llantas." },
     { id: "comp-3", name: "Toalla de Microfibra", image: "https://lh3.googleusercontent.com/pw/AP1GczPn8Nx3WgdMKOguR8-_ISl7lyhdrJoWEWxaFuy3-po0uM7NAQAT4vSdBSj2LZkpNQ52hEvJ-Kgd3TG1WPCaaGklZSukEoquViMAuPeEImOPVd39drDoagydRag8yKyCAPh63Er63riRmEKFJLwZ_nv2=w354-h372-s-no-gm?authuser=0", description: "Ultra suave y absorbente, esencial para retirar ceras y secar sin dejar rayones." },
];

const KitCard: React.FC<{ kit: ExtendedKit }> = ({ kit }) => {
    const isSpecial = kit.id === 'kit-vidrex-clarity';
    const hasLandingPage = kit.link && kit.link.startsWith('#/');
    const href = kit.link || '#contacto';

    return (
        <a 
            href={href} 
            className={`
                bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:scale-[1.02] 
                flex flex-col sm:flex-row items-center group relative hover:z-10 
                ${isSpecial ? 'border-2 border-green-500' : ''}
            `}
        >
            {/* Image Section */}
            <div className="w-full sm:w-1/3 p-4 flex-shrink-0">
                <img src={kit.image} alt={kit.name} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110" />
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className={`text-lg sm:text-xl font-bold ${isSpecial ? 'text-green-700' : 'text-amber-600'}`}>{kit.name}</h3>
                {kit.price && <p className="text-base sm:text-lg font-semibold text-gray-800 mt-1 mb-3">{kit.price}</p>}
                <p className="text-sm text-gray-700 mb-4 flex-grow">{kit.description}</p>
                
                {kit.includes && (
                     <div className="flex-grow mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">¿Qué Incluye el Kit?</h4>
                        <ul className="space-y-2">
                           {kit.includes.map((item, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-700">
                                    <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    <span>{item}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                )}

                {/* Action Button */}
                <div className="mt-auto pt-4">
                     <div className={`w-full sm:w-auto sm:max-w-xs text-center font-bold py-3 px-6 text-base rounded-lg transition-all duration-300 active:scale-95 shadow-md ${hasLandingPage ? 'bg-green-600 text-white group-hover:bg-green-700' : 'bg-amber-500/80 text-white group-hover:bg-amber-500/100'}`}>
                        {isSpecial ? 'Ver Oferta Ahora' : hasLandingPage ? 'Ver Detalles del Kit' : 'Más Información'}
                    </div>
                </div>
            </div>
        </a>
    );
};

const ComplementCard: React.FC<{ complement: Kit }> = ({ complement }) => (
    <a href="#contacto" className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col text-center p-2 group items-center h-full">
        <div className="h-20 w-full flex items-center justify-center">
            <img src={complement.image} alt={complement.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex flex-col flex-grow mt-2 w-full">
            <h4 className="font-bold text-xs text-gray-800 leading-tight">{complement.name}</h4>
        </div>
    </a>
);


const Kits: React.FC = () => {
    return (
        <section id="kits" className="py-10 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-3 sm:p-8 rounded-3xl shadow-neumorphic-outset">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">
                            Kits y Complementos
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-lg text-gray-600">
                            Soluciones completas y herramientas esenciales para llevar el cuidado de tu vehículo al siguiente nivel.
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        {kitsData.map((kit) => <KitCard key={kit.id} kit={kit} />)}
                    </div>

                     <div className="text-center mt-12 sm:mt-20 mb-8 sm:mb-16">
                        <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800">
                            Complementos Esenciales
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {complementsData.map((complement) => <ComplementCard key={complement.id} complement={complement} />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Kits;