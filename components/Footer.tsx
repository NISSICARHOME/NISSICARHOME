import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-white/20 backdrop-blur-md border-t border-white/30">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wider">Nissi Car Home</h3>
            <p className="mt-4 text-sm text-gray-700">
              Pasión por el detalle, garantía de calidad. Innovación en el cuidado estético de vehículos y el hogar.
            </p>
             <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} Nissi Car Home. Todos los derechos reservados.</p>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wider">Contáctanos</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p><strong>Dirección:</strong> Calle 33 #5-70, Pereira, Colombia</p>
              <p><strong>Teléfono:</strong> <a href="tel:+573203393805" className="hover:text-amber-500 transition-colors">+57 320 339 3805</a></p>
              <p><strong>Email:</strong> <a href="mailto:nissicarhome.ia@gmail.com" className="hover:text-amber-500 transition-colors">nissicarhome.ia@gmail.com</a></p>
              <p><strong>Valóranos:</strong> <a href="https://g.page/r/Cf9bBmx6F9d8EBI/review" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors font-semibold">Déjanos tu reseña ⭐</a></p>
            </div>
          </div>
          
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 uppercase tracking-wider">Síguenos</h3>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              {SOCIAL_LINKS.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 group">
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