import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { systemInstruction } from '../data/chatbotContext';
import { Product } from '../types';
import { SOCIAL_LINKS } from '../constants';

// --- ICONS ---
const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
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
    <button onClick={onClick} className="w-full flex items-center gap-3 p-2 my-1 bg-white/50 backdrop-blur-lg border border-white/40 rounded-lg text-left hover:bg-white/70 transition-colors shadow-md">
        <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded-md bg-white p-1" />
        <div className="flex-grow">
            <p className="font-bold text-sm text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-700">{product.shortDesc}</p>
            <p className="text-sm font-bold text-amber-700 mt-1">${product.price.toLocaleString('es-CO')}</p>
        </div>
    </button>
);

const SocialLinks: React.FC = () => (
    <div className="flex flex-wrap gap-2 my-1">
        {SOCIAL_LINKS.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-white/40 text-gray-800 font-semibold text-xs py-1 px-3 rounded-full transition-colors">
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
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block my-1 bg-green-500 text-white font-bold text-sm py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
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
  const recognitionRef = useRef<any>(null); // Using 'any' for SpeechRecognition for cross-browser compatibility

  // --- Text-to-Speech (TTS) ---
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    const cleanedText = text.replace(/\[.*?\]/g, ' ').trim();
    if (!cleanedText) return;

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const voices = window.speechSynthesis.getVoices();
    // Prioritize 'Paulina' (es-MX) or 'Monica' (es-ES) for a quality female voice
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
  
  // --- Speech-to-Text (STT) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Fix: Cast window to `any` to access non-standard SpeechRecognition properties.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech recognition not supported in this browser.");
        return;
    }
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.lang = 'es-CO';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        // Automatically submit after successful recognition
        setTimeout(() => formRef.current?.requestSubmit(), 100);
    };
    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
    };
    recognition.onend = () => {
        setIsListening(false);
    };
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
    // This effect handles the external trigger from the header
    if (isOpen && startListening && !isListening) {
      if (recognitionRef.current) {
        toggleListen();
      }
      onListeningEnd(); // Reset the trigger in App.tsx
    }
  }, [isOpen, startListening, isListening, onListeningEnd, toggleListen]);


  // --- Core Chat Logic ---
  useEffect(() => {
    if (isOpen && !chat) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatInstance = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction: systemInstruction },
            });
            setChat(chatInstance);
            if (messages.length === 0) {
                const welcomeMsg = '¡Hola! Soy NissiBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy?';
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


  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading || !chat) return;

    setInputValue('');
    if (autoSendTimer.current) clearTimeout(autoSendTimer.current);

    setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
    setIsLoading(true);

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
  }, [isLoading, chat, speak]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (autoSendTimer.current) clearTimeout(autoSendTimer.current);
    if (value.trim() !== '') {
        autoSendTimer.current = window.setTimeout(() => {
            handleSendMessage(value);
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-500/50 backdrop-blur-md border border-white/30 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-500/80 transition-all transform hover:scale-110 z-50"
        aria-label="Abrir chat de ayuda"
      >
        {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8" />}
      </button>

      <div className={`fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <header className="bg-white/10 p-4 rounded-t-2xl flex justify-between items-center border-b border-white/20 flex-shrink-0">
            <h3 className="text-lg font-bold text-gray-800">Asistente Virtual</h3>
        </header>
        
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-amber-500/80 text-white' : 'bg-white/40 text-gray-800'}`}>
                        <div className="text-sm space-y-2">{parseMessage(msg.text)}</div>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="p-3 rounded-xl bg-white/40 text-gray-800">
                        <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-600 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <form ref={formRef} onSubmit={handleFormSubmit} className="p-3 border-t border-white/20 flex-shrink-0">
            <div className="flex items-center bg-white/30 rounded-full">
                <input
                    type="text"
                    name="message"
                    placeholder={isListening ? "Escuchando..." : "Escribe tu pregunta..."}
                    value={inputValue}
                    onChange={handleInputChange}
                    autoComplete="off"
                    disabled={isLoading || isListening}
                    className="w-full bg-transparent px-4 py-3 text-gray-800 placeholder-gray-600 focus:outline-none disabled:opacity-50"
                />
                <button type="button" onClick={toggleListen} disabled={isLoading} className={`p-2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-600 hover:text-amber-600'}`}>
                   <MicIcon className="w-6 h-6" />
                </button>
                <button type="submit" disabled={isLoading || !inputValue.trim()} className="p-3 text-amber-600 hover:text-amber-500 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">
                   <SendIcon className="w-6 h-6" />
                </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;