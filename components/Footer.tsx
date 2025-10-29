import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Nissi Car Home</h3>
            <p className="mt-4 text-base text-gray-400">
              Pasión por el detalle, garantía de calidad. Innovación en el cuidado estético de vehículos y el hogar.
            </p>
             <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} Nissi Car Home. Todos los derechos reservados.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Contáctanos</h3>
            <div className="mt-4 space-y-2 text-gray-400">
              <p><strong>Dirección:</strong> Calle 33 #5-70, Pereira, Colombia</p>
              <p><strong>Teléfono:</strong> <a href="tel:+573203393805" className="hover:text-amber-400">+57 320 339 3805</a></p>
              <p><strong>Email:</strong> <a href="mailto:nissicarhome.ia@gmail.com" className="hover:text-amber-400">nissicarhome.ia@gmail.com</a></p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Síguenos</h3>
            <div className="mt-4 flex justify-center md:justify-start space-x-6">
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
