import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product, CartItem, User, Order, Page, Address, ProductVariant } from '../types';
import axios from '../../axios';

// ============================================================
// TIPOS
// ============================================================
interface AppState {
  currentPage: Page;
  currentProductId: string | null;
  cart: CartItem[];                           // Ahora usa el nuevo CartItem (alineado con DB)
  wishlist: number[];                         // IDs de productos
  currentUser: User | null;
  isCartOpen: boolean;
  products: Product[];                        // Se llenan desde API
  orders: Order[];                            // Se llenan desde API
  adminLoggedIn: boolean;
  darkMode: boolean;
}

interface AppContextType extends AppState {
  navigate: (page: Page, productId?: string) => void;
  addToCart: (productId: number, variantId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateCartQty: (itemId: number, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
  setCartOpen: (open: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: RegisterPayload) => Promise<boolean>;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  addOrder: (payload: PlaceOrderPayload) => Promise<string>;
  updateOrderStatus: (id: number, status: string) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  toggleDarkMode: () => void;
  cartTotal: number;
  cartCount: number;
}

// Payloads auxiliares (pueden moverse a types/index.ts luego)
interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  document_number?: string;
  birth_date?: string;
}

interface PlaceOrderPayload {
  address_id: number;
  notes?: string;
  payment_method: string;
}

// ============================================================
// HELPERS
// ============================================================

/** Convierte la respuesta del backend a User */
const toUser = (data: any): User => ({
  id: data.id,
  first_name: data.first_name,
  last_name: data.last_name,
  email: data.email,
  phone: data.phone ?? '',
  document_number: data.document_number ?? '',
  birth_date: data.birth_date ?? '',
  is_active: data.is_active ?? true,
  role_id: data.role_id ?? undefined,
  role: data.role ?? undefined,
  addresses: data.addresses ?? [],
});

// ============================================================
// CONTEXTO
// ============================================================
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Estado inicial vacío (sin datos mock)
  const [state, setState] = useState<AppState>({
    currentPage: 'landing',
    currentProductId: null,
    catalogGender: null,
    cart: [],
    wishlist: [],
    currentUser: null,
    isCartOpen: false,
    products: [],
    orders: [],
    adminLoggedIn: false,
    darkMode: false,
  });

  // ==========================================================
  // HELPERS: Fetch carrito, wishlist y productos desde API
  // ==========================================================
  const fetchCart = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/cart');
      setState(s => ({ ...s, cart: data.cart?.items ?? data.items ?? [] }));
    } catch {
      // No hay carrito activo o usuario no autenticado
    }
  }, []);

  const fetchWishlist = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/wishlist');
      const ids = (data.wishlist?.items ?? data.items ?? []).map(
        (item: any) => (typeof item === 'number' ? item : item.product_id)
      );
      setState(s => ({ ...s, wishlist: ids }));
    } catch {
      // No hay wishlist
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/products');
      // Backend responde: { success: true, data: { data: [...], meta: {...} } }
      const productsList = data.data?.data ?? data.data ?? [];
      setState(s => ({ ...s, products: productsList }));
    } catch {
      // Productos no disponibles
    }
  }, []);

  // ==========================================================
  // EFECTO INICIAL: Cargar productos públicos + sesión
  // ==========================================================
  useEffect(() => {
    let active = true;

    // Cargar productos públicos (siempre, sin importar auth)
    fetchProducts();

    // Recuperar sesión actual + carrito + wishlist (solo si autenticado)
    const fetchSession = async () => {
      try {
        const { data } = await axios.get('/api/user');
        if (active && data) {
          setState(s => ({ ...s, currentUser: toUser(data) }));
          fetchCart();
          fetchWishlist();
        }
      } catch {
        if (active) setState(s => ({ ...s, currentUser: null }));
      }
    };

    fetchSession();

    return () => { active = false; };
  }, [fetchCart, fetchWishlist, fetchProducts]);

  // ==========================================================
  // NAVEGACIÓN
  // ==========================================================
  const navigate = useCallback((page: Page, productId?: string) => {
    setState(s => ({ ...s, currentPage: page, currentProductId: productId ?? null, isCartOpen: false }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ==========================================================
  // CARRITO (API)
  // ==========================================================
  const addToCart = useCallback(async (productId: number, variantId: number, quantity: number) => {
    try {
      const { data } = await axios.post('/api/cart/items', {
        product_id: productId,
        product_variant_id: variantId,
        quantity,
      });
      // Reemplazar el carrito local con la respuesta del backend
      setState(s => ({
        ...s,
        cart: data.cart?.items ?? [...s.cart, data.item],
        isCartOpen: true,
      }));
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  }, []);

  const removeFromCart = useCallback(async (itemId: number) => {
    try {
      await axios.delete(`/api/cart/items/${itemId}`);
      setState(s => ({
        ...s,
        cart: s.cart.filter(item => item.id !== itemId),
      }));
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  }, []);

  const updateCartQty = useCallback(async (itemId: number, quantity: number) => {
    try {
      await axios.put(`/api/cart/items/${itemId}`, { quantity });
      setState(s => ({
        ...s,
        cart: s.cart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      }));
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      await axios.delete('/api/cart');
      setState(s => ({ ...s, cart: [] }));
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  }, []);

  // ==========================================================
  // WISHLIST (API)
  // ==========================================================
  const toggleWishlist = useCallback(async (productId: number) => {
    try {
      const isWished = state.wishlist.includes(productId);
      if (isWished) {
        await axios.delete(`/api/wishlist/${productId}`);
        setState(s => ({
          ...s,
          wishlist: s.wishlist.filter(id => id !== productId),
        }));
      } else {
        await axios.post('/api/wishlist', { product_id: productId });
        setState(s => ({
          ...s,
          wishlist: [...s.wishlist, productId],
        }));
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  }, [state.wishlist]);

  // ==========================================================
  // UI STATE (local, no API)
  // ==========================================================
  const setCartOpen = useCallback((open: boolean) => {
    setState(s => ({ ...s, isCartOpen: open }));
  }, []);

  // ==========================================================
  // USUARIO / AUTENTICACIÓN (API real con Sanctum)
  // ==========================================================
  const setCurrentUser = useCallback((user: User | null) => {
    setState(s => ({ ...s, currentUser: user }));
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/login', { email, password });
      const { data } = await axios.get('/api/user');
      setState(s => ({ ...s, currentUser: toUser(data) }));
      fetchCart();
      fetchWishlist();
      return true;
    } catch {
      return false;
    }
  }, [fetchCart, fetchWishlist]);

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/logout');
    } finally {
      setState(s => ({ ...s, currentUser: null, cart: [], wishlist: [], adminLoggedIn: false }));
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<boolean> => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/register', payload);
      const { data } = await axios.get('/api/user');
      setState(s => ({ ...s, currentUser: toUser(data) }));
      fetchCart();
      fetchWishlist();
      return true;
    } catch {
      return false;
    }
  }, [fetchCart, fetchWishlist]);

  // ==========================================================
  // ADMIN AUTH (API real)
  // ==========================================================
  const adminLogin = useCallback(async (password: string): Promise<boolean> => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      const { data } = await axios.post('/api/admin/login', { password });
      if (data.success) {
        setState(s => ({
          ...s,
          adminLoggedIn: true,
          currentUser: toUser(data.user),
        }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const adminLogout = useCallback(async () => {
    try {
      await axios.post('/api/admin/logout');
    } finally {
      setState(s => ({ ...s, adminLoggedIn: false, currentUser: null }));
    }
  }, []);

  // ==========================================================
  // PRODUCTOS (Admin API)
  // ==========================================================
  const addProduct = useCallback(async (productData: any) => {
    try {
      // Si es FormData, enviarlo directamente; si es objeto, enviar como JSON
      const { data } = productData instanceof FormData
        ? await axios.post('/api/admin/products', productData)
        : await axios.post('/api/admin/products', productData, {
            headers: { 'Content-Type': 'application/json' }
          });
      // Backend responde: { success: true, data: { id, name, variants, images, category } }
      setState(s => ({ ...s, products: [...s.products, data.data] }));
    } catch (err: any) {
      console.error('Error adding product:', err.response?.data ?? err.message);
    }
  }, []);

  const updateProduct = useCallback(async (id: number, updates: Partial<Product>) => {
    try {
      const { data } = await axios.put(`/api/admin/products/${id}`, updates);
      setState(s => ({
        ...s,
        products: s.products.map(p => (p.id === id ? { ...p, ...data.data } : p)),
      }));
    } catch (err) {
      console.error('Error updating product:', err);
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      setState(s => ({ ...s, products: s.products.filter(p => p.id !== id) }));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  }, []);

  // ==========================================================
  // ÓRDENES
  // ==========================================================
  const addOrder = useCallback(async (payload: PlaceOrderPayload): Promise<string> => {
    try {
      const { data } = await axios.post('/api/orders', payload);
      setState(s => ({ ...s, orders: [data.order, ...s.orders] }));
      return data.order.id;
    } catch (err) {
      console.error('Error placing order:', err);
      return '';
    }
  }, []);

  const updateOrderStatus = useCallback(async (id: number, status: string) => {
    try {
      await axios.put(`/api/admin/orders/${id}/status`, { status });
      setState(s => ({
        ...s,
        orders: s.orders.map(o => (o.id === id ? { ...o, status: status as any } : o)),
      }));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  }, []);

  const deleteOrder = useCallback(async (id: number) => {
    try {
      await axios.delete(`/api/admin/orders/${id}`);
      setState(s => ({ ...s, orders: s.orders.filter(o => o.id !== id) }));
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  }, []);

  // ==========================================================
  // GETTERS
  // ==========================================================
  const getProduct = useCallback(
    (id: string) => state.products.find(p => String(p.id) === id),
    [state.products]
  );

  const cartTotal = state.cart.reduce((total, item) => {
    return total + item.unit_price * item.quantity;
  }, 0);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDarkMode = useCallback(() => {
    setState(s => ({ ...s, darkMode: !s.darkMode }));
  }, []);

  // ==========================================================
  // PROVIDER
  // ==========================================================
  return (
    <AppContext.Provider
      value={{
        ...state,
        navigate,
        selectCatalogGender,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        setCartOpen,
        setCurrentUser,
        login,
        logout,
        register,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getProduct,
        toggleDarkMode,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
