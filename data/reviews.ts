import { Review } from '../types';

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    targetId: 'kit-vidrex-clarity',
    userName: 'Juan Pérez',
    rating: 5,
    comment: 'Increíble producto, mis vidrios quedaron como nuevos. ¡Recomendado!',
    date: '2024-03-01'
  },
  {
    id: 'rev-2',
    targetId: 'kit-2',
    userName: 'María García',
    rating: 5,
    comment: 'El kit de embellecimiento es lo mejor que le ha pasado a mi auto.',
    date: '2024-03-05'
  },
  {
    id: 'rev-3',
    targetId: 'kit-1',
    userName: 'Carlos Ruiz',
    rating: 4,
    comment: 'Muy buen kit básico, cumple con todo lo prometido.',
    date: '2024-03-10'
  },
  {
    id: 'rev-4',
    targetId: 'prod-hyper-diamond',
    userName: 'Elena M.',
    rating: 5,
    comment: 'La cera Hyper Diamond deja un brillo espectacular.',
    date: '2024-03-12'
  },
  {
    id: 'rev-5',
    targetId: 'general',
    userName: 'Andrés S.',
    rating: 5,
    comment: 'Excelente servicio al cliente y productos de alta calidad.',
    date: '2024-03-15'
  }
];
