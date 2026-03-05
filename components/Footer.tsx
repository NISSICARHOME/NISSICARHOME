import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '../data/siteContent';
import { SOCIAL_LINKS } from '../constants';
import { TrackingService } from '../services/TrackingService';

const Footer: React.FC = () => {
  const { footer } = siteContent;
  
  const handleContactClick = (method: string) => {
    TrackingService.trackLead(method);
  };

  return (
    <footer id="contacto" className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-5">
            <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter mb-6">
              {footer.companyName.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-amber-500" : ""}>{word} </span>
              ))}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
              {footer.description}
            </p>
            <div className="flex space-x-5">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-sm"
                  onClick={() => link.name === 'WhatsApp' && handleContactClick('WhatsApp')}
                >
                  <span className="sr-only">{link.name}</span>
                  <div className="w-5 h-5">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Contacto Directo</h4>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mr-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-tight">Ubicación</p>
                  <p className="text-gray-500 text-sm">{footer.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mr-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-tight">Teléfono</p>
                  <a href={`tel:${footer.phone}`} onClick={() => handleContactClick('Phone')} className="text-gray-500 text-sm hover:text-amber-600 transition-colors">{footer.phone}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Experiencia</h4>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-4 italic">"La mejor atención y productos de calidad para mi vehículo. Recomendados 100%."</p>
              <div className="flex items-center">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-900">Google Reviews</span>
              </div>
              <a href="https://g.page/r/Cf9bBmx6F9d8EBI/review" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-black text-amber-600 uppercase tracking-widest hover:underline">Dejar Reseña</a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">© {new Date().getFullYear()} {footer.companyName}. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <HashLink to="/admin" className="text-[10px] text-gray-300 hover:text-amber-500 uppercase tracking-widest transition-colors font-bold">Configuración</HashLink>
            <HashLink to="/politicas" className="text-[10px] text-gray-300 hover:text-amber-500 uppercase tracking-widest transition-colors font-bold">Privacidad</HashLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export default Footer;