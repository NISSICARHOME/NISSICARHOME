import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Star,
  ChevronRight,
  Droplets,
  Sparkle,
  ArrowRight,
  Lightbulb,
  Zap
} from 'lucide-react';
import ReviewSection from '../components/shared/ReviewSection';
import { Review } from '../types';

// --- DATA ---
const SERVICES = [
  {
    id: 'farolas',
    title: 'Restauración de Farolas y Personalización',
    description: 'Eliminamos el tono amarillento y opaco. Devolvemos la transparencia y el brillo original con sellado UV de larga duración.',
    videoUrl: 'https://drive.google.com/file/d/1iS_eXbtEWWjD-qEQwtHpE3TxkxKywvrH/preview',
    processVideoUrl: 'https://drive.google.com/file/d/1WWLiw99X-IPEFpCm8DkLUzdPzbS3DRAZ/preview',
    mediaUrl: 'https://images.unsplash.com/photo-1611702952136-2292f7685a49?auto=format&fit=crop&q=80&w=2000',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pueGZ6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif',
    isVideo: false,
    icon: Lightbulb,
    badge: 'Seguridad'
  },
  {
    id: 'exterior',
    title: 'Detailing Exterior (Cerámico)',
    description: 'Protección cerámica y sellado de pintura. Brillo profundo tipo espejo con propiedades hidrofóbicas extremas.',
    videoUrl: 'https://drive.google.com/file/d/1pCuU_8J5c_Qm-pmiQTPQGHQmwHipU8Aa/preview',
    processVideoUrl: 'https://drive.google.com/file/d/1p8u_UcsJLIUFsW9cKbppKhA2YHO4CfJ9/preview',
    mediaUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pueGZ6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTfuxG5D0zG7iE/giphy.gif',
    isVideo: false,
    icon: ShieldCheck,
    badge: 'Efecto Cristal'
  },
  {
    id: 'interior',
    title: 'Detailing Interno Profundo',
    description: 'Desinfección y restauración de cojinería, alfombras y techos. Hidratación premium de plásticos y cueros.',
    videoUrl: 'https://drive.google.com/file/d/19G5uaJwmur4-w3ZWEZE0PNu1Y4EuWic_/preview',
    processVideoUrl: 'https://drive.google.com/file/d/1neMsFed31gyLtTNdDDKUe_NY1eSQ878m/preview?mute=1',
    mediaUrl: 'https://images.unsplash.com/photo-1620334161528-94762c1767fb?auto=format&fit=crop&q=80&w=1200',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pueGZ6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif',
    isVideo: false,
    icon: Sparkles,
    badge: 'Renovación'
  },
  {
    id: 'vidrios',
    title: 'Tratamiento de Vidrios (Lluvia Ácida)',
    description: 'Eliminación técnica de lluvia ácida y manchas de sarro. Visibilidad perfecta y seguridad en climas lluviosos.',
    videoUrl: 'https://drive.google.com/file/d/1YE8YKWYhrou5Xk7Ns5g2UYcpy3pGEyGE/preview',
    processVideoUrl: 'https://drive.google.com/file/d/1UbRM9xs55TP2FnIJS6sshUV9tGjHf24H/preview?mute=1',
    mediaUrl: 'https://images.unsplash.com/photo-1549399500-1448083046d5?auto=format&fit=crop&q=80&w=1200',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pueGZ6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif',
    isVideo: false,
    icon: Droplets,
    badge: 'Kit Vidrex'
  },
  {
    id: 'gold',
    title: 'Servicio Gold Full Vehículo',
    description: 'La experiencia completa Nissi. Restauración total exterior e interior para vehículos de alta gama y exhibición.',
    videoUrl: 'https://drive.google.com/file/d/1_XCCakKskoghtybqqb-bcc7B6Q8jW3tN/preview',
    processVideoUrl: 'https://drive.google.com/file/d/1u9GxOm9xIgsrJJCOioFgwN1-ZzUVyW1h/preview?mute=1',
    mediaUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pueGZ6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6ZzR6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif',
    isVideo: false,
    icon: Star,
    badge: 'Máximo Lujo'
  }
];

const PILLARS = [
  {
    icon: Award,
    title: 'Técnicos Certificados',
    desc: 'Experiencia real comprobada en cada proceso detallado.',
  },
  {
    icon: Sparkle,
    title: 'Productos Premium',
    desc: 'Fórmulas propias de Nissi Car Home con altos estándares.',
  },
  {
    icon: CheckCircle,
    title: 'Garantía Total',
    desc: 'Si no ves el cambio radical solicitado, no pagas el servicio.',
  }
];

// --- COMPONENTS ---

import BookingModal from '../components/shared/BookingModal';

const LandingPageServices: React.FC<{
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview: (id: string) => void;
  isAdmin: boolean;
}> = ({ reviews, onAddReview, onDeleteReview, isAdmin }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleWhatsApp = (context = 'agendar una valoración gratis') => {
    const msg = `Hola Nissi Car Home, vi los resultados de sus servicios y quiero ${context} para mi vehículo.`;
    window.open(`https://wa.me/573103754727?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openBooking = (service?: string) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    document.title = "Expertos en Estética Automotriz - Nissi Car Home";
  }, []);

  return (
    <div className="bg-[#0a0a0b] text-white font-sans selection:bg-nissi-orange selection:text-white pb-32 antialiased overflow-x-hidden">
      
      {/* SECTION 1: HERO DE AUTORIDAD */}
      <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#0a0a0b] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover brightness-[0.7] animate-pulse-slow"
            alt="Background detailing"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-nissi-orange/20 text-nissi-orange px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 inline-block border border-nissi-orange/30">
              Estética de Exhibición
            </span>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[1.05] md:leading-tight mb-4 drop-shadow-2xl">
              Tu Vehículo merece un <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nissi-orange to-amber-400">
                acabado de exhibición.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed px-4 md:px-0 text-center md:text-justify md:hyphens-auto">
              Servicios profesionales de detallado, restauración y protección con el sello exclusivo de <span className="text-white font-bold">Nissi Car Home.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-8"
          >
            <button 
              onClick={() => openBooking()}
              className="bg-nissi-orange text-white px-6 py-4 md:py-6 md:px-16 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-sm md:text-2xl shadow-[0_30px_60px_rgba(255,102,0,0.4),0_0_0_8px_rgba(255,102,0,0.1)] hover:scale-[1.05] hover:brightness-110 active:scale-95 transition-all duration-500 group flex items-center gap-3 md:gap-6 mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 drop-shadow-md flex items-center gap-4">
                AGENDAR Y CONFIRMAR
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={24} className="md:w-8 md:h-8 stroke-[3px]" />
                </motion.div>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-40"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-nissi-orange to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* SECTION 2: CATÁLOGO CON VIDEO-TESTIMONIO */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-nissi-orange/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic"
          >
             Resultados que Hablan Solos
          </motion.h2>
          <div className="h-1.5 w-32 bg-nissi-orange mx-auto rounded-full" />
          <p className="text-white/50 text-lg">Experimenta la excelencia técnica de Nissi en cada detalle.</p>
        </div>

        <div className="space-y-24">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="group relative bg-[#121214] border border-white/5 rounded-[2.5rem] md:rounded-[5rem] overflow-hidden hover:border-nissi-orange/30 transition-all duration-700 flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
            >
               {/* Card Background Branding */}
               <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none">
                  <Star size={400} fill="currentColor" />
               </div>

               <div className="p-6 md:p-24 relative z-10 space-y-6 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-1 md:p-1.5 pl-4 md:pl-5 rounded-full">
                     <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{s.badge}</span>
                     <div className="bg-nissi-orange p-2 md:p-2.5 rounded-full shadow-lg shadow-nissi-orange/20">
                        <s.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                     </div>
                  </div>

                                      <div className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative aspect-video w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:border-nissi-orange/50 transition-all duration-700 shadow-2xl bg-black">
                           {/* Fallback Background Image for iOS / Loading state */}
                           <img 
                             src={s.mediaUrl}
                             className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
                             alt="Loading..."
                           />
                           
                           {s.id === 'farolas' || s.id === 'exterior' || s.id === 'interior' || s.id === 'vidrios' || s.id === 'gold' ? (
                              <iframe 
                               src={`${s.videoUrl}${s.videoUrl.includes('?') ? '&' : '?'}mute=1&autoplay=1`}
                               className="relative z-10 w-full h-full object-cover scale-[1.2] brightness-110 pointer-events-none touch-action-none"
                               allow="autoplay; encrypted-media"
                              />
                           ) : s.isVideo ? (
                              <iframe 
                               src={`${s.mediaUrl}&controls=0&autoplay=1&mute=1&loop=1&rel=0`}
                               className="relative z-10 w-full h-full object-cover scale-[1.5] brightness-110 pointer-events-none touch-action-none"
                               allow="autoplay; encrypted-media"
                              />
                           ) : (
                              <img 
                               src={s.mediaUrl} 
                               alt={s.title} 
                               className="relative z-10 w-full h-full object-cover transition-all duration-1000 md:group-hover:scale-110"
                               referrerPolicy="no-referrer"
                              />
                           )}
                           <div className="absolute inset-0 pointer-events-none z-20" />
                           <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2 md:gap-3">
                              <div className="bg-nissi-orange px-2 py-0.5 md:px-3 md:py-1 rounded-md flex items-center gap-1.5 md:gap-2 shadow-lg shadow-nissi-orange/20">
                                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
                                 <span className="text-[8px] md:text-[10px] font-black text-white tracking-widest uppercase">HD PREMIUM</span>
                              </div>
                           </div>
                        </div>

                        {/* GIF/Video Proceso Container */}
                        <div className="relative aspect-video w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-nissi-orange/50 transition-all duration-700 shadow-2xl bg-[#1a1a1c] group/gif">
                           {/* Fallback visual for process */}
                           <img 
                             src={(s as any).gifUrl} 
                             className="absolute inset-0 w-full h-full object-cover brightness-50 z-0"
                             alt="Proceso"
                           />

                           {(s as any).processVideoUrl ? (
                              <iframe 
                                 src={`${(s as any).processVideoUrl}${(s as any).processVideoUrl.includes('?') ? '&' : '?'}mute=1&autoplay=1`}
                                 className="relative z-10 w-full h-full object-cover brightness-75 md:group-hover/gif:brightness-100 transition-all duration-700 pointer-events-none touch-action-none"
                                 allow="autoplay; encrypted-media"
                              />
                           ) : (
                              <img 
                                 src={(s as any).gifUrl} 
                                 alt={`Proceso ${s.title}`} 
                                 className="relative z-10 w-full h-full object-cover brightness-75 md:group-hover/gif:brightness-100 transition-all duration-700"
                                 referrerPolicy="no-referrer"
                              />
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
                           <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 flex items-center gap-2 md:gap-3">
                              <div className="bg-white/10 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-md flex items-center gap-1.5 md:gap-2 border border-white/20">
                                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-nissi-orange animate-bounce" />
                                 <span className="text-[8px] md:text-[10px] font-black text-white tracking-widest uppercase">PROCESO EN VIVO</span>
                              </div>
                           </div>
                        </div>
                     </div>
                   </div>

                <h3 className="text-2xl sm:text-3xl md:text-7xl font-black uppercase italic tracking-tighter leading-[1.05] md:leading-[1] md:group-hover:text-nissi-orange transition-colors">
                     {idx + 1}. {s.title}
                  </h3>
                  <p className="text-base md:text-2xl text-white/60 leading-relaxed font-medium max-w-4xl text-left md:text-justify md:hyphens-auto">
                     {s.description}
                  </p>
                </div>
 
                  <button 
                    onClick={() => openBooking(s.title)}
                    className="w-full py-5 md:py-7 bg-nissi-orange text-white rounded-2xl md:rounded-3xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-sm md:text-2xl transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_40px_rgba(255,102,0,0.3)] relative overflow-hidden group/btn"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                     <span className="relative z-10 italic flex items-center gap-3">
                        AGENDAR Y CONFIRMAR 🎁
                        <ArrowRight className="w-5 h-5 md:w-8 md:h-8 animate-bounce-x" />
                     </span>
                  </button>
                </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: EL PASO FINAL */}
      <section className="py-24 md:py-32 px-4 md:px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="max-w-4xl mx-auto p-10 md:p-20 rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-br from-nissi-orange/20 via-transparent to-white/5 border border-white/10 relative group overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
          
          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-[1.05] md:leading-tight px-4">
            ¿Listo para <br className="hidden sm:block" />
            <span className="text-nissi-orange">Transformar tu Auto?</span>
          </h2>
          <p className="text-base md:text-xl text-white/50 mb-8 md:mb-12 max-w-2xl mx-auto font-medium text-center md:text-justify md:hyphens-auto px-4 md:px-6">
            No pierdas más tiempo pensando. Reserva tu cupo para valorarlo hoy mismo y experimenta el acabado que tu vehículo merece.
          </p>
          
          <button 
            onClick={() => openBooking('cita hoy mismo')}
            className="w-full md:w-auto px-8 py-5 md:px-16 md:py-7 bg-nissi-orange text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-sm md:text-2xl shadow-[0_20px_40px_rgba(255,102,0,0.3)] hover:scale-105 transition-all duration-500 hover:brightness-110 active:scale-95 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative z-10 drop-shadow-lg flex items-center justify-center gap-4 md:gap-6">
               RESERVAR CUPO HOY
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight size={24} className="md:w-10 md:h-10 stroke-[3px]" />
              </motion.div>
            </span>
          </button>
        </motion.div>
      </section>

      {/* SECTION 3: POR QUÉ ELEGIRNOS */}
      <section className="py-20 md:py-32 bg-[#0e0e10] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
            <div className="flex-1 space-y-8">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase italic leading-[1.1] md:leading-none tracking-tighter px-4 md:px-0"
              >
                Seguridad y Calidad <br className="hidden sm:block" /> 
                <span className="text-nissi-orange">Innegociables.</span>
              </motion.h2>
              <div className="space-y-8 md:space-y-12 pt-4 md:pt-8">
                {PILLARS.map((p, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-4 md:gap-6 items-start group/pillar"
                  >
                    <div className="mt-1 p-3 md:p-4 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl group-hover/pillar:border-nissi-orange/50 transition-colors shrink-0">
                      <p.icon className="w-6 h-6 md:w-8 md:h-8 text-nissi-orange" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black uppercase mb-1 md:mb-2 group-hover:text-nissi-orange transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-white/50 text-md md:text-lg leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full relative contenedor-oferta-nissi max-w-xl">
                <div className="absolute inset-0 bg-nissi-orange/20 blur-[100px] rounded-full scale-75 animate-pulse-slow" />
                <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10">
                  <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczMefKEzyVKnPdqKls5TiwS_x739Ddh9iUXt-IMB7AVXBGTR49HhMklZzcguLSPSPE6dAtYKa-Jy0Bi6wxH_DKMNFBwEq2bp7PnmcdDkpHsLxFTlYWdkbcXnBz8d0-RUTDDr5YGhvhQjnhixxOxNpyEb=w1120-h928-s-no-gm?authuser=0"
                    alt="Servicio Detailing Nissi" 
                    className="w-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 shadow-2xl pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-4 md:-right-10 bg-nissi-blue p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20 border-4 border-[#1a1a1c] hidden md:block">
                   <div className="flex items-center gap-1 mb-2">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />)}
                   </div>
                   <p className="font-black text-4xl italic uppercase leading-none">5.0 <br /> <span className="text-[10px] font-black opacity-50 not-italic tracking-[0.3em] uppercase">Satisfacción Real</span></p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOATING BUTTON */}
      <motion.button
         initial={{ scale: 1, opacity: 1 }}
         animate={{ scale: 1, opacity: 1 }}
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
         onClick={() => openBooking()}
         className="fixed bottom-10 right-10 z-[80] bg-[#25D366] p-5 rounded-full shadow-[0_20px_40px_rgba(37,211,102,0.4)] group"
      >
        <MessageCircle size={32} className="text-white relative z-10" />
        <motion.span 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: [0, 1, 1, 0, 0] }}
          transition={{ times: [0, 0.1, 0.8, 0.9, 1], duration: 5, delay: 1 }}
          className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-[#25D366] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap group-hover:opacity-100 transition-all pointer-events-none shadow-2xl"
        >
           Agendar Valoración Gratis
        </motion.span>
      </motion.button>

      {/* REVIEWS */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <ReviewSection 
          targetId="experts-services" 
          reviews={reviews} 
          onAddReview={onAddReview} 
          onDeleteReview={onDeleteReview} 
          isAdmin={isAdmin} 
        />
      </div>

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />

    </div>
  );
};

export default LandingPageServices;
