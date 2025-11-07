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
        image: "https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0",
        description: "Dale a tu vehículo el tratamiento completo que se merece. Este kit ha sido cuidadosamente seleccionado para ofrecer un embellecimiento integral.",
        includes: [
            "1 Cera Hyper Diamond con Carnauba (220 gr)",
            "1 Brillo Protector Perfect Llantix (250 ml)",
            "¡OBSEQUIO ESPECIAL! 1 Ultra Restorer de Partes Negras (120 ml)",
            "2 Aplicadores de Espuma (Abrasividad Blanda)",
        ],
    },
    {
        id: "kit-1",
        name: "Kit Básico de Cuidado",
        image: "https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0",
        description: "El punto de partida perfecto para mantener tu vehículo limpio y protegido. Incluye nuestros productos esenciales.",
    },
];

const complementsData: Kit[] = [
     { id: "comp-1", name: "Aplicador Media Luna", image: "https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0", description: "Espuma de densidad blanda y estructura absorbente, ideal para ceras y selladores." },
     { id: "comp-2", name: "Aplicador Circular", image: "https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0", description: "Perfecto para aplicar restauradores y protectores en plásticos y llantas." },
     { id: "comp-3", name: "Toalla de Microfibra", image: "https://lh3.googleusercontent.com/pw/AP1GczPGwrhJ8TEzkWPQmfysYWXzR5O6cQV42cDKDzJrE2eOjqiDvy-pOt4NnwuUIR8m8GJ_RlR94IazvXYNbTA2i2IZn-sD3VUHIYdz0EIKiTPzWncw30Fu0OIhqCnJClbZhq4d0WKf62FVyIlgeSLrLtpl=s128-no?authuser=0", description: "Ultra suave y absorbente, esencial para retirar ceras y secar sin dejar rayones." },
];

const KitCard: React.FC<{ kit: ExtendedKit }> = ({ kit }) => {
    const isSpecial = kit.id === 'kit-vidrex-clarity';
    const hasDetails = kit.includes && kit.includes.length > 0;
    const href = kit.link || '#contacto';

    const Button = () => (
        <div className={`mt-4 w-full text-center font-bold py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 shadow-md ${isSpecial ? 'bg-green-600 text-white group-hover:bg-green-700' : 'bg-amber-500/80 text-white group-hover:bg-amber-500/100'}`}>
            {isSpecial ? 'Ver Oferta Ahora' : 'Más Información'}
        </div>
    );

    const cardContent = hasDetails ? (
        <>
            <img src={kit.image} alt={kit.name} className="w-full lg:w-1/3 h-64 lg:h-auto object-contain p-4" />
            <div className="p-6 lg:p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-amber-600">{kit.name}</h3>
                {kit.price && <p className="text-xl font-semibold text-gray-800 mt-1 mb-3">{kit.price}</p>}
                <p className="text-gray-700 mb-4">{kit.description}</p>
                <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-2">¿Qué Incluye el Kit?</h4>
                    <ul className="space-y-2">
                       {kit.includes?.map((item, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                                <svg className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                <span>{item}</span>
                            </li>
                       ))}
                    </ul>
                </div>
                <Button />
            </div>
        </>
    ) : (
        <>
            <div>
                <img src={kit.image} alt={kit.name} className="w-full h-56 object-contain p-4 group-hover:scale-125 transition-transform duration-500 ease-in-out" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className={`text-xl font-bold mb-2 ${isSpecial ? 'text-green-700' : 'text-gray-800'}`}>{kit.name}</h3>
              <p className="text-gray-600 text-sm flex-grow">{kit.description}</p>
              <Button />
            </div>
        </>
    );

    const cardClasses = hasDetails 
        ? "col-span-1 lg:col-span-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col lg:flex-row group relative hover:z-10"
        : `bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 flex flex-col group relative hover:z-10 ${isSpecial ? 'lg:col-span-1 border-2 border-green-500' : 'lg:col-span-1'}`;

    return (
        <a href={href} className={cardClasses}>
            {cardContent}
        </a>
    );
};


const Kits: React.FC = () => {
    return (
        <section id="kits" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 rounded-3xl shadow-neumorphic-outset">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                            Kits y Complementos
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Soluciones completas y herramientas esenciales para llevar el cuidado de tu vehículo al siguiente nivel.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                        {kitsData.map((kit) => <KitCard key={kit.id} kit={kit} />)}
                    </div>

                     <div className="text-center mt-20 mb-16">
                        <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                            Complementos Esenciales
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {complementsData.map((complement) => <KitCard key={complement.id} kit={complement} />)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Kits;