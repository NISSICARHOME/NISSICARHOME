import React from 'react';
import { Kit } from '../types';

const kitsData: Kit[] = [
    {
        id: "kit-1",
        name: "Kit Básico de Cuidado",
        image: "https://picsum.photos/seed/kit1/500/500",
        description: "El punto de partida perfecto para mantener tu vehículo limpio y protegido. Incluye nuestros productos esenciales.",
    },
    {
        id: "kit-2",
        name: "Kit de Embellecimiento para tu Vehículo",
        price: "$125.000 COP",
        image: "https://picsum.photos/seed/kit2/500/500",
        description: "Dale a tu vehículo el tratamiento completo que se merece. Este kit ha sido cuidadosamente seleccionado para ofrecer un embellecimiento integral.",
        isSpecial: true,
        includes: [
            "1 Cera Hyper Diamond con Carnauba (220 gr)",
            "1 Brillo Protector Perfect Llantix (250 ml)",
            "¡OBSEQUIO ESPECIAL! 1 Ultra Restorer de Partes Negras (120 ml)",
            "2 Aplicadores de Espuma (Abrasividad Blanda)",
        ],
        components: [
            { title: "Cera Hyper Diamond con Carnauba", desc: "La protección definitiva para la pintura de tu vehículo. Su composición avanzada de polímeros naturales y emulsión hidrofóbica crea un escudo duradero con un acabado espectacular." },
            { title: "Brillo Protector - Perfect Llantix", desc: "La fórmula ideal para que tus llantas luzcan siempre como nuevas. Proporciona un excelente brillo y un acabado definido." },
            { title: "Obsequio - Ultra Restorer de Partes Negras", desc: "El toque final para un vehículo impecable. Restaura piezas plásticas grises o negras que han perdido su color original." },
        ],
        instructions: [
            "Llantas (con Perfect Llantix): Agita, aplica sobre la llanta o aplicador y frota uniformemente.",
            "Partes Plásticas (con Ultra Restorer): Asegúrate de que las superficies estén limpias. Usa un aplicador para esparcir el producto.",
            "Carrocería (con Cera Hyper Diamond): Esparce una capa fina por secciones. Deja secar y retira el residuo con microfibra.",
        ]
    },
    {
        id: "kit-3",
        name: "Kit Profesional de Detallado",
        image: "https://picsum.photos/seed/kit3/500/500",
        description: "Todo lo que necesitas para un detallado de nivel profesional en casa. Para los entusiastas más exigentes.",
    },
];

const complementsData: Kit[] = [
     { id: "comp-1", name: "Aplicador Media Luna", image: "https://picsum.photos/seed/comp1/500/500", description: "Espuma de densidad blanda y estructura absorbente, ideal para ceras y selladores." },
     { id: "comp-2", name: "Aplicador Circular", image: "https://picsum.photos/seed/comp2/500/500", description: "Perfecto para aplicar restauradores y protectores en plásticos y llantas." },
     { id: "comp-3", name: "Toalla de Microfibra", image: "https://picsum.photos/seed/comp3/500/500", description: "Ultra suave y absorbente, esencial para retirar ceras y secar sin dejar rayones." },
];


const KitCard: React.FC<{ kit: Kit }> = ({ kit }) => {
    if(kit.isSpecial) {
        return (
            <div className="col-span-1 lg:col-span-3 bg-gray-800 rounded-lg shadow-xl hover:shadow-amber-500/20 transition-shadow duration-300 overflow-hidden flex flex-col lg:flex-row">
                <img src={kit.image} alt={kit.name} className="w-full lg:w-1/3 h-64 lg:h-auto object-cover" />
                <div className="p-6 lg:p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-amber-400">{kit.name}</h3>
                    {kit.price && <p className="text-xl font-semibold text-white mt-1 mb-3">{kit.price}</p>}
                    <p className="text-gray-300 mb-4">{kit.description}</p>
                    
                    <div className="mb-4">
                        <h4 className="font-semibold text-white mb-2">¿Qué Incluye el Kit?</h4>
                        <ul className="space-y-2">
                           {kit.includes?.map((item, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-300">
                                    <svg className="flex-shrink-0 h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    <span>{item}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                     <div className="flex-grow">
                        <h4 className="font-semibold text-white mb-2">Instructivo de Aplicación (Paso a Paso)</h4>
                        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                          {kit.instructions?.map((step, index) => <li key={index}>{step}</li>)}
                        </ol>
                    </div>
                    <a href="#contacto" className="mt-6 bg-amber-500 text-gray-900 hover:bg-amber-400 font-bold py-3 px-6 rounded-lg transition-colors duration-300 w-full lg:w-auto text-center">
                        ¡Lo Quiero!
                    </a>
                </div>
            </div>
        )
    }

    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
        <img src={kit.image} alt={kit.name} className="w-full h-56 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{kit.name}</h3>
          <p className="text-gray-400 text-sm flex-grow">{kit.description}</p>
          <a href="#contacto" className="mt-4 bg-gray-700 text-white hover:bg-gray-600 font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-center">
            Más Información
          </a>
        </div>
      </div>
    );
};


const Kits: React.FC = () => {
    return (
        <section id="kits" className="py-20 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Kits y Complementos
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Soluciones completas y herramientas esenciales para llevar el cuidado de tu vehículo al siguiente nivel.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {kitsData.map((kit) => <KitCard key={kit.id} kit={kit} />)}
                </div>

                 <div className="text-center mt-20 mb-16">
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                        Complementos Esenciales
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {complementsData.map((complement) => <KitCard key={complement.id} kit={complement} />)}
                </div>
            </div>
        </section>
    );
};

export default Kits;
