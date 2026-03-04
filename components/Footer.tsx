import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';
import { SOCIAL_LINKS } from '../constants';

declare const fbq: (type: string, event: string, data?: object) => void;

const Footer: React.FC = () => {
  const { footer } = siteContent;
  const handleContactClick = (method: string) => {
    if (typeof fbq === 'function') {
      fbq('track', 'Contact', {
        content_name: method
      });
    }
  };

  return (
    <footer id="contacto" className="bg-white/20 backdrop-blur-md border-t border-white/30">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wider">{footer.companyName}</h3>
            <p className="mt-4 text-sm text-gray-700">
              {footer.description}
            </p>
             <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} {footer.companyName}. Todos los derechos reservados.</p>
             <div className="mt-6">
                <HashLink to="/admin" className="text-[10px] text-gray-300 hover:text-amber-500 uppercase tracking-widest transition-colors">
                  Panel de Configuración
                </HashLink>
             </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wider">Contáctanos</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p><strong>Dirección:</strong> {footer.address}</p>
              <p><strong>Teléfono:</strong> <a href={`tel:${footer.phone}`} onClick={() => handleContactClick('Phone')} className="hover:text-amber-500 transition-colors">{footer.phone}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${footer.email}`} onClick={() => handleContactClick('Email')} className="hover:text-amber-500 transition-colors">{footer.email}</a></p>
              <p><strong>Valóranos:</strong> <a href="https://g.page/r/Cf9bBmx6F9d8EBI/review" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors font-semibold">Déjanos tu reseña ⭐</a></p>
            </div>
          </div>

          
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wider">Síguenos</h3>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              {SOCIAL_LINKS.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 group" onClick={() => link.name === 'WhatsApp' && handleContactClick('WhatsApp')}>
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;