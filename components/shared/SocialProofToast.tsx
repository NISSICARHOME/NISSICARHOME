
import React, { useState, useEffect, useMemo } from 'react';

// --- 1. DEFINICIÓN DE TIEMPOS ---
const DISPLAY_DURATION = 3000; // 3 segundos visible
const WAIT_DURATION = 6000;    // 6 segundos oculto
const CYCLE_TOTAL = DISPLAY_DURATION + WAIT_DURATION; // 9000ms total del ciclo
const NOTIFICATION_COUNT = 500;

// --- 2. GENERACIÓN DE DATA ---

const firstNames = [
  "Juan", "Carlos", "Luis", "José", "Andrés", "David", "Miguel", "Santiago", "Sebastián", "Alejandro",
  "María", "Ana", "Laura", "Andrea", "Paula", "Daniela", "Sofía", "Valentina", "Camila", "Natalia",
  "Diego", "Jorge", "Fernando", "Ricardo", "Gabriel", "Mateo", "Nicolás", "Samuel", "Felipe", "Pablo",
  "Javier", "Manuel", "Cristian", "Camilo", "Esteban", "Julián", "Héctor", "Francisco", "Alberto", "Roberto"
];

const lastInitials = [
  "G.", "M.", "R.", "L.", "P.", "S.", "C.", "V.", "H.", "D.", "T.", "Z.", "B.", "F.", "A.", "J.", "Q.", "E.", "O.", "N.",
  "X.", "Y.", "U.", "I.", "K."
];

const cities = [
  "Pereira", "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Manizales", "Ibagué", "Villavicencio",
  "Santa Marta", "Cúcuta", "Armenia", "Neiva", "Pasto", "Montería", "Valledupar", "Popayán", "Sincelejo", "Tunja"
];

const products = [
  "Cera Hyper Diamond con Blindaje",
  "Kit de Embellecimiento Básico",
  "Kit Completo Full Detailing",
  "Kit Desmanchador de Vidrios",
  "Cera Hyper Diamond",
  "Kit de Limpieza Interna",
  "Shampoo pH Neutro",
  "Restaurador de Partes Negras",
  "Eliminador de Rayones",
  "Perfect Llantix",
  "Vidrex Bloqueador de Manchas"
];

interface Notification {
  name: string;
  location: string;
  product: string;
  time: string;
}

const getRandomTime = () => `hace ${Math.floor(Math.random() * 12) + 1} min`;

const generateNotifications = (count: number): Notification[] => {
  const notifications: Notification[] = [];
  
  for (let i = 0; i < count; i++) {
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastInitials[Math.floor(Math.random() * lastInitials.length)]}`;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    notifications.push({
      name,
      location: city,
      product,
      time: getRandomTime()
    });
  }
  return notifications;
};

// Algoritmo de Fisher-Yates para mezclar
const shuffleArray = (array: Notification[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const SocialProofToast: React.FC = () => {
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    // Generar y mezclar las notificaciones una sola vez al montar el componente
    const notifications = useMemo(() => shuffleArray(generateNotifications(NOTIFICATION_COUNT)), []);

    useEffect(() => {
        let index = 0;
        let showTimeout: ReturnType<typeof setTimeout>;
        let interval: ReturnType<typeof setInterval>;

        const cycleNotification = () => {
            // 1. Mostrar la notificación actual
            setCurrentNotification(notifications[index]);
            setIsVisible(true);

            // 2. Programar ocultamiento
            showTimeout = setTimeout(() => {
                setIsVisible(false);
            }, DISPLAY_DURATION);

            // 3. Pasar al siguiente índice
            index = (index + 1) % notifications.length;
        };

        // Iniciar el ciclo inmediatamente
        cycleNotification();

        // Configurar el intervalo para las siguientes iteraciones
        interval = setInterval(cycleNotification, CYCLE_TOTAL);

        return () => {
            clearInterval(interval);
            clearTimeout(showTimeout);
        };
    }, [notifications]);

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
