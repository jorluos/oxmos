// ============================================================
// TIPOS ENUM / CONSTANTES (compartidos frontend y backend)
// ============================================================

export type Gender = 'Mujer' | 'Hombre' | 'Unisex';
export type OrderStatus = 'pendiente' | 'en_preparacion' | 'enviado' | 'entregado' | 'cancelado';
export type PaymentStatus = 'pendiente' | 'pagado' | 'reembolsado' | 'fallido';
export type PaymentMethod = 'efectivo' | 'tarjeta' | 'transferencia' | 'otros';
export type Page =
  | 'landing' | 'catalog' | 'product' | 'checkout' | 'wishlist'
  | 'policies' | 'login' | 'register' | 'admin' | 'admin-login';

// ============================================================
// MODELOS PRINCIPALES (coherentes con backend Laravel)
// ============================================================

export interface Role {
  id: number;
  name: string;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  role_id?: number;
  first_name: string;
  last_name: string;
  document_number?: string;
  phone?: string;
  email: string;
  birth_date?: string;         // formato YYYY-MM-DD
  is_active: boolean;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
  // Relaciones (populate opcional)
  role?: Role;
  addresses?: Address[];
}

export interface Address {
  id: number;
  user_id?: number;
  label: string;
  recipient_name: string;
  recipient_phone: string;
  street_line_1: string;
  street_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  reference?: string;
  is_default_shipping: boolean;
  is_default_billing: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  parent_id?: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  parent?: Category;
  children?: Category[];
}

export interface Collection {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  // Pivot
  pivot?: { product_id: number; collection_id: number };
}

export interface ProductImage {
  id: number;
  product_id: number;
  product_variant_id?: number;
  image_url: string;
  alt_text?: string;
  position: number;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  barcode?: string;
  size: string;
  color_name: string;
  color_hex?: string;
  price: number;
  compare_at_price?: number;
  stock: number;
  reserved_stock: number;
  weight?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  images?: ProductImage[];
}

export interface Product {
  id: number;
  category_id?: number;
  name: string;
  slug: string;
  short_description?: string;
  brand?: string;
  gender: Gender;
  type?: string;              // ej: 'Remera', 'Pantalón', 'Zapatillas'
  material?: string;
  care_instructions?: string;
  base_price: number;
  original_price?: number;
  raiting_average: number;
  reviews_count: number;
  is_featured: boolean;
  is_active: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  // Relaciones (incluidas en respuestas API)
  category?: Category;
  collections?: Collection[];
  variants?: ProductVariant[];
  images?: ProductImage[];
  reviews?: Review[];
}

export interface Cart {
  id: number;
  user_id?: number;
  status: string;             // 'active' | 'abandoned' | 'converted'
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  items?: CartItem[];
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_variant_id: number;
  quantity: number;
  unit_price: number;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  product?: Product;
  productVariant?: ProductVariant;
}

export interface Order {
  id: number;
  user_id?: number;
  address_id?: number;
  order_number: string;
  status: OrderStatus;
  currency: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  shipping_address_text: string;
  notes?: string;
  subtotal: number;
  discount_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod;
  placed_at?: string;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  user?: User;
  address?: Address;
  items?: OrderItem[];
  payments?: Payment[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_variant_id: number;
  sku_snapshot: string;
  product_name_snapshot: string;
  variant_description_snapshot?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  product?: Product;
  productVariant?: ProductVariant;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transaction_id?: string;
  paid_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  order_id?: number;
  rating: number;
  title?: string;
  comment?: string;
  is_approved: boolean;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  user?: User;
  product?: Product;
}

export interface Wishlist {
  id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  items?: WishlistItem[];
}

export interface WishlistItem {
  id: number;
  wishlist_id: number;
  product_id: number;
  product_variant_id?: number;
  created_at?: string;
  updated_at?: string;
  // Relaciones
  product?: Product;
  productVariant?: ProductVariant;
}

// ============================================================
// DTOs / PAYLOADS para formularios y envío al backend
// ============================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  document_number?: string;
  phone: string;
  email: string;
  birth_date?: string;
  password: string;
  password_confirmation: string;
}

export interface AddressPayload {
  label: string;
  recipient_name: string;
  recipient_phone: string;
  street_line_1: string;
  street_line_2?: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  reference?: string;
  is_default_shipping?: boolean;
  is_default_billing?: boolean;
}

export interface AddToCartPayload {
  product_id: number;
  product_variant_id: number;
  quantity: number;
}

export interface PlaceOrderPayload {
  address_id: number;
  notes?: string;
  payment_method: PaymentMethod;
}

// ============================================================
// UTILIDADES PARA RESPUESTAS API
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}
