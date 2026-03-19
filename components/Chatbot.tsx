import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { systemInstruction } from '../data/chatbotContext';
import { Product } from '../types';
import { SOCIAL_LINKS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

// --- ICONS ---
const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
  </svg>
);
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);
const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z" />
    </svg>
);

// --- TYPES ---
interface Message {
  sender: 'user' | 'bot';
  text: string;
}
interface ChatbotProps {
    allProducts: Product[];
    onProductSelect: (product: Product) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    startListening: boolean;
    onListeningEnd: () => void;
}

// --- INTERACTIVE MESSAGE COMPONENTS ---

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 my-2 bg-white border border-gray-100 rounded-2xl text-left hover:shadow-xl transition-all duration-300 group">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl p-2">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="flex-grow">
            <p className="font-black text-sm text-gray-900 uppercase tracking-tight mb-1">{product.name}</p>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{product.shortDesc}</p>
            <p className="text-sm font-black text-amber-500">${product.price.toLocaleString('es-CO')}</p>
        </div>
    </button>
);

const SocialLinks: React.FC = () => (
    <div className="flex flex-wrap gap-2 my-2">
        {SOCIAL_LINKS.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-50 hover:bg-amber-500 hover:text-white text-gray-700 font-bold text-[10px] uppercase tracking-widest py-2 px-4 rounded-xl transition-all duration-300 border border-gray-100 shadow-sm">
                <div className="w-4 h-4">{link.icon}</div>
                {link.name}
            </a>
        ))}
    </div>
);

const ContactLink: React.FC<{ type: 'WhatsApp' | 'Location' }> = ({ type }) => {
    const isWhatsApp = type === 'WhatsApp';
    const link = isWhatsApp 
        ? 'https://wa.me/573203393805' 
        : 'https://www.google.com/maps/place/Nissi+Car+Home/@4.8080611,-75.6963583,15z/data=!4m6!3m5!1s0x8e38871145657f2d:0x39773253b760a424!8m2!3d4.8080611!4d-75.6963583!16s%2Fg%2F11b6dx_75l?entry=ttu';
    const text = isWhatsApp ? 'Abrir WhatsApp' : 'Ver Ubicación';
    
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center my-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all duration-300 shadow-lg ${isWhatsApp ? 'bg-green-500 hover:shadow-green-500/20' : 'bg-amber-500 hover:shadow-amber-500/20'}`}>
            {text}
        </a>
    );
};

// --- MAIN CHATBOT COMPONENT ---

const Chatbot: React.FC<ChatbotProps> = ({ allProducts, onProductSelect, isOpen, setIsOpen, startListening, onListeningEnd }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const autoSendTimer = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    const cleanedText = text.replace(/\[.*?\]/g, ' ').trim();
    if (!cleanedText) return;

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name === 'Paulina' && v.lang.startsWith('es')) || 
                        voices.find(v => v.name === 'Monica' && v.lang.startsWith('es')) ||
                        voices.find(v => v.lang.startsWith('es-') && v.name.includes('Female')) ||
                        voices.find(v => v.lang.startsWith('es-'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    utterance.lang = 'es-CO';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.lang = 'es-CO';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setTimeout(() => formRef.current?.requestSubmit(), 100);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  }, []);

  const toggleListen = useCallback(() => {
    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    } else {
        if (recognitionRef.current) {
            setInputValue('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    }
  }, [isListening]);

  useEffect(() => {
    if (isOpen && startListening && !isListening) {
      if (recognitionRef.current) {
        toggleListen();
      }
      onListeningEnd();
    }
  }, [isOpen, startListening, isListening, onListeningEnd, toggleListen]);

  const recoveryTimerRef = useRef<number | null>(null);

  const sendRecoveryMessage = useCallback(() => {
    const recoveryMsg = "Hola, seguimos disponibles para ayudarte con el servicio para tu vehículo. Si deseas más información o agendar, con gusto te ayudamos.";
    setMessages(prev => {
      // Only send if the last message wasn't already a recovery message or from user recently
      const lastMsg = prev[prev.length - 1];
      if (lastMsg && lastMsg.sender === 'bot' && lastMsg.text !== recoveryMsg) {
        speak(recoveryMsg);
        return [...prev, { sender: 'bot', text: recoveryMsg }];
      }
      return prev;
    });
  }, [speak]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      // Start a timer for recovery message (e.g., 2 minutes of inactivity)
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      recoveryTimerRef.current = window.setTimeout(sendRecoveryMessage, 120000); // 2 minutes
    } else {
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
    }
    return () => {
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
    };
  }, [messages, sendRecoveryMessage]);

  useEffect(() => {
    if (isOpen && !chat) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatInstance = ai.chats.create({
                model: 'gemini-2.0-flash',
                config: { 
                    systemInstruction: systemInstruction,
                    tools: [{ googleSearch: {} }]
                },
            });
            setChat(chatInstance);
            if (messages.length === 0) {
                const welcomeMsg = `Hola 👋
Soy NISSIBOT, asistente virtual de Nissi Car-Home.

Te puedo ayudar con información sobre nuestros servicios de estética automotriz y cuidado de vehículos.

Cuéntame:

1️⃣ ¿Qué servicio necesitas?
2️⃣ ¿Es para carro o moto?`;
                setMessages([{ sender: 'bot', text: welcomeMsg }]);
                speak(welcomeMsg);
            }
        } catch (error) {
            console.error("Error initializing Gemini:", error);
            setMessages([{ sender: 'bot', text: 'Lo siento, no puedo conectarme en este momento. Por favor, inténtalo más tarde.' }]);
        }
    }
  }, [isOpen, chat, speak, messages.length]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = useCallback(async (messageText: string) => {
    setIsLoading(true);
    // Mock "Learning" system: register the question
    console.log(`[NISSIBOT LEARNING] Registering question: "${messageText}"`);
    
    try {
        const response = await chat.sendMessage({ message: messageText });
        const botResponse = response.text;
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        speak(botResponse);
    } catch (error) {
        console.error("Error sending message:", error);
        const errorMsg = 'Tuve un problema al procesar tu solicitud. Intenta de nuevo.';
        setMessages(prev => [...prev, { sender: 'bot', text: errorMsg }]);
        speak(errorMsg);
    } finally {
        setIsLoading(false);
    }
  }, [chat, speak]);

  const handleSendMessage = (messageText: string) => {
      if (!messageText.trim() || isLoading || !chat) return;
      
      if (autoSendTimer.current) {
          clearTimeout(autoSendTimer.current);
          autoSendTimer.current = null;
      }
      
      setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
      getBotResponse(messageText);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentMessage = inputValue.trim();
    if (currentMessage) {
      handleSendMessage(currentMessage);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (autoSendTimer.current) {
        clearTimeout(autoSendTimer.current);
        autoSendTimer.current = null;
    }
    
    if (value.trim() !== '') {
        autoSendTimer.current = window.setTimeout(() => {
            handleSendMessage(value);
            setInputValue('');
        }, 4000);
    }
  };
  
  const parseMessage = (text: string) => {
    const parts = text.split(/(\[.*?\])/g).filter(part => part);
    return parts.map((part, index) => {
        if (part.startsWith('[PRODUCT_CARD:')) {
            const id = part.substring(15, part.length - 1);
            const product = allProducts.find(p => p.id === id);
            return product ? <ProductCard key={index} product={product} onClick={() => { onProductSelect(product); setIsOpen(false); }} /> : null;
        }
        if (part === '[SOCIAL_LINKS]') {
            return <SocialLinks key={index} />;
        }
        if (part.startsWith('[CONTACT_LINK:')) {
            const type = part.substring(15, part.length - 1) as ('WhatsApp' | 'Location');
            return <ContactLink key={index} type={type} />;
        }
        return part;
    });
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:bottom-24 bg-amber-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 overflow-hidden group"
        aria-label="Abrir chat de ayuda"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <CloseIcon className="w-8 h-8 relative z-10"/>
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <ChatIcon className="w-8 h-8 relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-44 right-6 md:bottom-44 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col z-50 overflow-hidden border border-gray-100"
          >
            <header className="bg-white p-6 flex justify-between items-center border-b border-gray-50 flex-shrink-0">
                <div>
                  <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter">NissiBot</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">En línea</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
                  <CloseIcon className="w-6 h-6" />
                </button>
            </header>
            
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/50">
                {messages.map((msg, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-amber-500 text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}`}>
                            <div className="text-sm leading-relaxed font-medium">{parseMessage(msg.text)}</div>
                        </div>
                    </motion.div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-none">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-amber-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form ref={formRef} onSubmit={handleFormSubmit} className="p-6 bg-white border-t border-gray-50 flex-shrink-0">
                <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                    <input
                        type="text"
                        name="message"
                        placeholder={isListening ? "Escuchando..." : "Escribe tu pregunta..."}
                        value={inputValue}
                        onChange={handleInputChange}
                        autoComplete="off"
                        disabled={isLoading || isListening}
                        className="w-full bg-transparent px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50 font-bold text-sm"
                    />
                    <div className="flex gap-1">
                      <button type="button" onClick={toggleListen} disabled={isLoading} className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-gray-400 hover:text-amber-500 shadow-sm'}`}>
                         <MicIcon className="w-5 h-5" />
                      </button>
                      <button type="submit" disabled={isLoading || !inputValue.trim()} className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 disabled:bg-gray-200 disabled:shadow-none transition-all active:scale-95">
                         <SendIcon className="w-5 h-5" />
                      </button>
                    </div>
                </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;