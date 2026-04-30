import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Shared data from SERVICES for the select
const SERVICE_TITLES = [
  'Restauración de Farolas y Personalización',
  'Detailing Exterior (Cerámico)',
  'Detailing Interno Profundo',
  'Tratamiento de Vidrios (Lluvia Ácida)',
  'Servicio Gold Full Vehículo'
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialService }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    modelo: '',
    ubicacion: '',
    servicio: initialService || '',
    dia: '',
    hora: '',
  });

  const getHoursForDay = (day: string) => {
    if (!day) return [];
    if (day === 'Sábado') {
      return ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'];
    }
    return ['8:00 AM', '10:00 AM', '1:00 PM'];
  };

  useEffect(() => {
    if (initialService) {
        setFormData(prev => ({ ...prev, servicio: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    // Reset hour if it's no longer valid for the selected day
    if (formData.dia && formData.hora) {
      const validHours = getHoursForDay(formData.dia);
      if (!validHours.includes(formData.hora)) {
        setFormData(prev => ({ ...prev, hora: '' }));
      }
    }
  }, [formData.dia]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola Nissi, mi nombre es ${formData.nombre}. Estoy interesado en ${formData.servicio} para mi ${formData.modelo ? formData.modelo : 'vehículo'}. Ubicación: ${formData.ubicacion || 'No especificada'}. Me gustaría agendar para el día ${formData.dia} a las ${formData.hora}. Reclamo mi regalo.`;
    window.open(`https://wa.me/573103754727?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative w-full max-w-xl bg-[#151517] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-nissi-orange p-8 text-white text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-black/10 mix-blend-overlay opacity-20" />
               <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative z-10"
               >
                 <h3 className="text-3xl font-black uppercase italic tracking-tighter">Formulario de Contacto</h3>
                 <p className="text-white/80 font-bold">Solicita tu valoración y cotización profesional</p>
               </motion.div>
               <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors"
               >
                  <X size={24} />
               </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Nombre Completo</label>
                  <input 
                    required
                    type="text" 
                    value={formData.nombre}
                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium"
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Número de Teléfono</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.celular}
                    onChange={e => setFormData({...formData, celular: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium"
                    placeholder="300 000 0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Modelo del Vehículo (Opcional)</label>
                  <input 
                    type="text" 
                    value={formData.modelo}
                    onChange={e => setFormData({...formData, modelo: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium"
                    placeholder="Ej: Toyota Prado / BMW X5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Mensaje / Ubicación (Opcional)</label>
                  <input 
                    type="text" 
                    value={formData.ubicacion}
                    onChange={e => setFormData({...formData, ubicacion: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium"
                    placeholder="Ej: Pereira Centro"
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                 <h4 className="text-nissi-orange font-black uppercase text-xs mb-3 italic tracking-widest flex items-center gap-2">
                   <CheckCircle size={14} />
                   Horarios de Agenda
                 </h4>
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-start text-white/70">
                       <span className="font-bold">Lun a Vie:</span>
                       <span className="text-white font-medium text-right">8:00 AM, 10:00 AM y 1:00 PM</span>
                    </div>
                    <div className="flex justify-between items-start text-white/70 pt-2 border-t border-white/5">
                       <span className="font-bold">Sábados:</span>
                       <span className="text-white font-medium text-right">8:00 AM, 10:00 AM,<br/>1:00 PM y 3:00 PM</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="md:col-span-1">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Día Sugerido</label>
                    <select 
                      required
                      value={formData.dia}
                      onChange={e => setFormData({...formData, dia: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium appearance-none"
                    >
                      <option value="" className="bg-[#151517]">Seleccionar</option>
                      <option value="Lunes" className="bg-[#151517]">Lunes</option>
                      <option value="Martes" className="bg-[#151517]">Martes</option>
                      <option value="Miércoles" className="bg-[#151517]">Miércoles</option>
                      <option value="Jueves" className="bg-[#151517]">Jueves</option>
                      <option value="Viernes" className="bg-[#151517]">Viernes</option>
                      <option value="Sábado" className="bg-[#151517]">Sábado</option>
                    </select>
                 </div>
                 <div className="md:col-span-1">
                    <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Hora Sugerida</label>
                    <select 
                      required
                      disabled={!formData.dia}
                      value={formData.hora}
                      onChange={e => setFormData({...formData, hora: e.target.value})}
                      className={`w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium appearance-none ${!formData.dia ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="" className="bg-[#151517]">Seleccionar</option>
                      {getHoursForDay(formData.dia).map(h => (
                        <option key={h} value={h} className="bg-[#151517]">{h}</option>
                      ))}
                    </select>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-white/50 mb-2">Servicio Interesado</label>
                <select 
                  required
                  value={formData.servicio}
                  onChange={e => setFormData({...formData, servicio: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:border-nissi-orange outline-none transition-all text-white font-medium appearance-none"
                >
                  <option value="" className="bg-[#151517]">Seleccionar servicio</option>
                  {SERVICE_TITLES.map(title => (
                    <option key={title} value={title} className="bg-[#151517]">{title}</option>
                  ))}
                </select>
              </div>

              {/* Gift Banner */}
              <div className="bg-nissi-orange/10 border-2 border-dashed border-nissi-orange/30 p-6 rounded-3xl relative overflow-hidden group">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2 p-4 opacity-10"
                >
                  <Sparkles className="text-nissi-orange" size={60} fill="currentColor" />
                </motion.div>
                <div className="flex gap-4 items-start relative z-10">
                  <div className="text-3xl">🎁</div>
                  <div>
                    <h4 className="text-nissi-orange font-black uppercase text-sm mb-1 italic tracking-tighter">¡OFERTA DE REGALO ACTIVADA!</h4>
                    <p className="text-white/90 text-xs leading-relaxed font-medium">
                      "Al agendar tu cita hoy a través de este formulario, te obsequiamos una <span className="font-bold text-nissi-orange text-sm uppercase">Cera Porcelanizadora</span> para proteger el brillo de tu auto o moto."
                    </p>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-nissi-orange text-white rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 outline-none"
              >
                AGENDAR Y CONFIRMAR
                <ArrowRight size={20} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
