import React, { useState } from 'react';
import { Review } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewSectionProps {
  targetId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onDeleteReview: (id: string) => void;
  isAdmin: boolean;
}

const StarRating: React.FC<{ rating: number; onRatingChange?: (rating: number) => void; interactive?: boolean }> = ({ rating, onRatingChange, interactive }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRatingChange?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <svg
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ targetId, reviews = [], onAddReview, onDeleteReview, isAdmin }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });

  const filteredReviews = reviews.filter(r => r.targetId === targetId || r.targetId === 'general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;
    onAddReview({ ...newReview, targetId });
    setNewReview({ userName: '', rating: 5, comment: '' });
    setIsFormOpen(false);
  };

  return (
    <div className="mt-16 bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-2">Reseñas de Clientes</h3>
          <p className="text-gray-500 font-medium">Lo que dicen quienes ya confían en Nissi Car Home</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95"
        >
          {isFormOpen ? 'Cancelar' : 'Dejar una Reseña'}
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-12"
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    value={newReview.userName}
                    onChange={e => setNewReview({ ...newReview, userName: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Calificación</label>
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <StarRating rating={newReview.rating} onRatingChange={r => setNewReview({ ...newReview, rating: r })} interactive />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Tu Comentario</label>
                <textarea
                  required
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all min-h-[120px]"
                  placeholder="Cuéntanos tu experiencia..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all"
              >
                Publicar Reseña
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-black text-gray-900 uppercase tracking-tight">{review.userName}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{review.comment}"</p>
              
              {isAdmin && (
                <button
                  onClick={() => onDeleteReview(review.id)}
                  className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg"
                  title="Eliminar reseña"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 font-medium">Aún no hay reseñas para este producto. ¡Sé el primero en dejar una!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
