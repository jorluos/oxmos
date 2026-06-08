import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, CartItem, User, Order, Page } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USERS } from './data';

interface AppState {
  currentPage: Page;
  currentProductId: string | null;
  cart: CartItem[];
  wishlist: string[];
  currentUser: User | null;
  isCartOpen: boolean;
  products: Product[];
  orders: Order[];
  adminLoggedIn: boolean;
  users: User[];
  darkMode: boolean;
}

interface AppContextType extends AppState {
  navigate: (page: Page, productId?: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQty: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setCartOpen: (open: boolean) => void;
  login: (correo: string, password: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => string;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  toggleDarkMode: () => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentPage: 'landing',
    currentProductId: null,
    cart: [],
    wishlist: [],
    currentUser: null,
    isCartOpen: false,
    products: INITIAL_PRODUCTS,
    orders: INITIAL_ORDERS,
    adminLoggedIn: false,
    users: INITIAL_USERS,
    darkMode: false,
  });

  const navigate = useCallback((page: Page, productId?: string) => {
    setState(s => ({ ...s, currentPage: page, currentProductId: productId ?? null, isCartOpen: false }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setState(s => {
      const existing = s.cart.find(
        c => c.productId === item.productId && c.size === item.size && c.color === item.color
      );
      if (existing) {
        return {
          ...s,
          cart: s.cart.map(c =>
            c.productId === item.productId && c.size === item.size && c.color === item.color
              ? { ...c, quantity: c.quantity + item.quantity }
              : c
          ),
          isCartOpen: true,
        };
      }
      return { ...s, cart: [...s.cart, item], isCartOpen: true };
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string, color: string) => {
    setState(s => ({
      ...s,
      cart: s.cart.filter(c => !(c.productId === productId && c.size === size && c.color === color)),
    }));
  }, []);

  const updateCartQty = useCallback((productId: string, size: string, color: string, qty: number) => {
    setState(s => ({
      ...s,
      cart: s.cart.map(c =>
        c.productId === productId && c.size === size && c.color === color ? { ...c, quantity: qty } : c
      ),
    }));
  }, []);

  const clearCart = useCallback(() => setState(s => ({ ...s, cart: [] })), []);

  const toggleWishlist = useCallback((productId: string) => {
    setState(s => ({
      ...s,
      wishlist: s.wishlist.includes(productId)
        ? s.wishlist.filter(id => id !== productId)
        : [...s.wishlist, productId],
    }));
  }, []);

  const setCartOpen = useCallback((open: boolean) => setState(s => ({ ...s, isCartOpen: open })), []);

  const login = useCallback((correo: string, password: string): boolean => {
    const user = state.users.find(u => u.correo === correo && u.password === password);
    if (user) {
      setState(s => ({ ...s, currentUser: user }));
      return true;
    }
    return false;
  }, [state.users]);

  const logout = useCallback(() => setState(s => ({ ...s, currentUser: null })), []);

  const register = useCallback((userData: Omit<User, 'id'>): boolean => {
    if (state.users.find(u => u.correo === userData.correo)) return false;
    const newUser: User = { ...userData, id: `u${Date.now()}` };
    setState(s => ({ ...s, users: [...s.users, newUser], currentUser: newUser }));
    return true;
  }, [state.users]);

  const adminLogin = useCallback((password: string): boolean => {
    if (password === 'admin123') {
      setState(s => ({ ...s, adminLoggedIn: true }));
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => setState(s => ({ ...s, adminLoggedIn: false })), []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    setState(s => ({
      ...s,
      products: [...s.products, { ...product, id: `p${Date.now()}` }],
    }));
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setState(s => ({
      ...s,
      products: s.products.map(p => (p.id === id ? { ...p, ...updates } : p)),
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setState(s => ({ ...s, products: s.products.filter(p => p.id !== id) }));
  }, []);

  const addOrder = useCallback((order: Omit<Order, 'id' | 'date'>): string => {
    const id = `ORD-${String(Date.now()).slice(-6)}`;
    const newOrder: Order = { ...order, id, date: new Date().toISOString().split('T')[0] };
    setState(s => ({ ...s, orders: [newOrder, ...s.orders] }));
    return id;
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setState(s => ({
      ...s,
      orders: s.orders.map(o => (o.id === id ? { ...o, status } : o)),
    }));
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setState(s => ({ ...s, orders: s.orders.filter(o => o.id !== id) }));
  }, []);

  const getProduct = useCallback((id: string) => state.products.find(p => p.id === id), [state.products]);

  const cartTotal = state.cart.reduce((total, item) => {
    const product = state.products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDarkMode = useCallback(() => {
    setState(s => ({ ...s, darkMode: !s.darkMode }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        navigate,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        setCartOpen,
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
