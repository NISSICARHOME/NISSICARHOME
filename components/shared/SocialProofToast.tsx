
import React, { useState, useEffect } from 'react';

const purchaseNotifications = [
    {
        name: "Andrea Z.",
        location: "Pereira",
        product: "Cera Hyper Diamond con Blindaje",
        time: "hace 3 min"
    },
    {
        name: "Andrés M.",
        location: "Medellín",
        product: "Kit de Embellecimiento Básico",
        time: "hace 5 min"
    },
    {
        name: "Catherine M.",
        location: "Bogotá",
        product: "Kit Completo Full Detailing",
        time: "hace 1 min"
    },
    {
        name: "Juan David G.",
        location: "Cali",
        product: "Kit Desmanchador de Vidrios",
        time: "hace 7 min"
    },
    {
        name: "Sofía L.",
        location: "Manizales",
        product: "Cera Hyper Diamond",
        time: "hace 2 min"
    },
    {
        name: "Nuevo Cliente",
        location: "Bucaramanga",
        product: "Kit de Limpieza Interna",
        time: "hace 4 min"
    }
];

const SocialProofToast: React.FC = () => {
    const [currentNotification, setCurrentNotification] = useState<typeof purchaseNotifications[0] | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let index = 0;
        let showTimeout: ReturnType<typeof setTimeout>;

        const cycleNotification = () => {
            setCurrentNotification(purchaseNotifications[index]);
            setIsVisible(true);

            // Hide after 6 seconds
            showTimeout = setTimeout(() => {
                setIsVisible(false);
            }, 6000);

            index = (index + 1) % purchaseNotifications.length;
        };

        // Initial call
        cycleNotification();

        // Cycle every 18 seconds (6s visible + 12s hidden)
        const interval = setInterval(cycleNotification, 18000);

        return () => {
            clearInterval(interval);
            clearTimeout(showTimeout);
        };
    }, []);

    if (!currentNotification) return null;

    return (
        <div 
            className={`fixed bottom-20 left-4 md:bottom-4 z-50 transition-all duration-500 transform 
                        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        >
            <div className="flex items-center p-3 max-w-xs sm:max-w-sm rounded-lg shadow-2xl bg-gray-800/90 backdrop-blur-md text-white border border-gray-700">
                <div className="p-2 mr-3 rounded-full bg-[#F77F00] flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19l-4 8m-2 4h2m-6 0h2m-1-4V5" /></svg>
                </div>
                <div>
                    <p className="text-sm font-semibold leading-tight">
                        {currentNotification.name} <span className="text-gray-400 font-normal text-xs">({currentNotification.location})</span>
                    </p>
                    <p className="text-xs text-gray-300 mt-1 leading-tight">
                        Acaba de comprar: <span className="text-[#F77F00] font-medium">{currentNotification.product}</span>
                    </p>
                    <p className="text-[10px] mt-1 text-gray-500 uppercase tracking-wide">{currentNotification.time}</p>
                </div>
            </div>
        </div>
    );
};

export default SocialProofToast;
