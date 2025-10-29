import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNIHbCiguqpiOuBUgDaCQ-J9cc5bGgxOZRQ44AnIGcJ7fJeZa35oyUR7OPjtMWN9bGjx6WJP923lmTmfbxXaULHqx5u9TknTxnV7PsTWfj-FmvfZ9V4Of5YF-7KJubKHECYkm4LdpBiPNLBFd403KU=w1487-h991-s-no-gm?authuser=0"
          alt="Vehículo detallado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-amber-300 drop-shadow-lg">
          Nissi Car Home
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light text-gray-200">
          Pasión por el Detalle, Garantía de Calidad. Transformamos el cuidado de tu vehículo y tu hogar en una experiencia de excelencia.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#productos"
            className="bg-amber-500 text-gray-900 hover:bg-amber-400 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            Ver Productos
          </a>
          <a
            href="#servicios"
            className="bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
          >
            Nuestros Servicios
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;