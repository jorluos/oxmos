import type { Gender } from '../types';

export const GARMENT_TYPES = ['Vestido', 'Blusa', 'Camiseta', 'Pantalón', 'Falda', 'Abrigo', 'Chaqueta', 'Jeans', 'Shorts', 'Conjunto', 'Traje'];
export const LENGTHS = ['Corto', 'Midi', 'Largo'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const GENDERS: Gender[] = ['Mujer', 'Hombre', 'Unisex'];

export const COLOR_OPTIONS = [
  { hex: '#000000', name: 'Negro' },
  { hex: '#FFFFFF', name: 'Blanco' },
  { hex: '#808080', name: 'Gris' },
  { hex: '#F5F5DC', name: 'Beige' },
  { hex: '#8B7355', name: 'Camel' },
  { hex: '#36454F', name: 'Azul Noche' },
  { hex: '#C0C0C0', name: 'Plata' },
  { hex: '#E8D5B7', name: 'Arena' },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
