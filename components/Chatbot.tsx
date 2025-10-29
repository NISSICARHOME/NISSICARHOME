import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { systemInstruction } from '../data/chatbotContext';

const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
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


interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chat) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatInstance = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            setChat(chatInstance);
            setMessages([{ sender: 'bot', text: '¡Hola! Soy NissiBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy?' }]);
        } catch (error) {
            console.error("Error initializing Gemini:", error);
            setMessages([{ sender: 'bot', text: 'Lo siento, no puedo conectarme en este momento. Por favor, inténtalo más tarde.' }]);
        }
    }
  }, [isOpen, chat]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
    const userInput = input.value.trim();

    if (!userInput || isLoading || !chat) return;

    input.value = '';
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    setIsLoading(true);

    try {
        const response = await chat.sendMessage({ message: userInput });
        setMessages(prev => [...prev, { sender: 'bot', text: response.text }]);
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: 'Tuve un problema al procesar tu solicitud. Intenta de nuevo.' }]);
    } finally {
        setIsLoading(false);
    }
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

      <div className={`fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[60vh] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <header className="bg-white/10 p-4 rounded-t-2xl flex justify-between items-center border-b border-white/20">
            <h3 className="text-lg font-bold text-gray-800">Asistente Virtual</h3>
        </header>
        
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-amber-500/80 text-white' : 'bg-white/40 text-gray-800'}`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-white/40 text-gray-800">
                        <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-600 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/20">
            <div className="flex items-center bg-white/30 rounded-full">
                <input
                    type="text"
                    name="message"
                    placeholder="Escribe tu pregunta..."
                    autoComplete="off"
                    disabled={isLoading}
                    className="w-full bg-transparent px-4 py-2 text-gray-800 placeholder-gray-600 focus:outline-none disabled:opacity-50"
                />
                <button type="submit" disabled={isLoading} className="p-2 text-amber-600 hover:text-amber-500 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">
                   <SendIcon className="w-6 h-6" />
                </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;