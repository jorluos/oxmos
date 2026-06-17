export type ProductCategory = 'NUEVO' | 'TENDENCIA' | 'OFERTA';
export type Gender = 'Mujer' | 'Hombre' | 'Unisex';
export type OrderStatus = 'Pendiente' | 'En preparación' | 'Enviado' | 'Entregado' | 'Cancelado';
export type Page =
  | 'landing'
  | 'catalog-gender'
  | 'catalog'
  | 'product'
  | 'checkout'
  | 'wishlist'
  | 'policies'
  | 'login'
  | 'register'
  | 'admin'
  | 'admin-login';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  frontImage: string;
  backImage: string;
  colors: string[];
  colorNames: string[];
  gender: Gender;
  type: string;
  length: string;
  sizes: string[];
  stock: Record<string, number>;
  category: ProductCategory;
  description: string;
  rating: number;
  reviews: number;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  correo: string;
  cumpleanos: string;
  direccion: string;
  password: string;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  notes?: string;
}
