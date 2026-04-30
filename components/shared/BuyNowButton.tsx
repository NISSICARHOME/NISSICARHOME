import React, { useState } from 'react';
import { motion } from 'motion/react';

interface BuyNowButtonProps {
    onClick: () => void;
    text?: string;
    className?: string;
    showShare?: boolean;
    shareUrl?: string;
}

const ShareIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
);

const BuyNowButton: React.FC<BuyNowButtonProps> = ({ 
    onClick, 
    text = "¡PIDE AHORA Y PAGA EN CASA!", 
    className = "",
    showShare = true,
    shareUrl = window.location.href
}) => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`max-w-md mx-auto flex items-center justify-center gap-4 ${className}`}>
            <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.05, brightness: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="flex-grow bg-[#D90429] text-white font-bold text-lg md:text-2xl py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-lg transition-all"
            >
                {text}
            </motion.button>
            
            {showShare && (
                <div className="relative">
                    <button
                        onClick={handleShare}
                        title="Compartir enlace"
                        className="p-4 bg-gray-200/50 rounded-full hover:bg-gray-200/80 transition-colors"
                    >
                        <ShareIcon />
                    </button>
                    {copied && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            ¡Enlace copiado!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BuyNowButton;
