import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, Plus, Edit2, Trash2, X,
  Eye, EyeOff, TrendingUp, AlertCircle,
} from 'lucide-react';
import { useApp } from './AppContext';
import { formatPrice, GARMENT_TYPES, LENGTHS, SIZES, GENDERS, COLOR_OPTIONS } from './data';
import type { Product, Order, OrderStatus, Gender, ProductCategory } from './types';

type AdminTab = 'dashboard' | 'products' | 'orders';

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-800',
  'En preparación': 'bg-blue-100 text-blue-800',
  'Enviado': 'bg-purple-100 text-purple-800',
  'Entregado': 'bg-green-100 text-green-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

const ALL_STATUSES: OrderStatus[] = ['Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'];

/* ---------- Admin Login ---------- */
export function AdminLogin() {
  const { adminLogin, navigate } = useApp();
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      navigate('admin');
    } else {
      setError('Contraseña incorrecta.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl tracking-[0.3em] font-light mb-1">OXMOS</h1>
          <p className="text-xs tracking-widest uppercase text-black/40">Panel de Administrador</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e: any) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                required
                className="w-full border border-black/20 focus:border-black px-4 py-3 text-sm outline-none pr-12"
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit"
            className="w-full bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors">
            Ingresar
          </button>
          <p className="text-[11px] text-center text-black/30">Contraseña de demo: admin123</p>
        </form>
        <button onClick={() => navigate('landing')} className="w-full mt-4 text-xs text-black/30 hover:text-black text-center">
          ← Volver a la tienda
        </button>
      </div>
    </div>
  );
}

/* ---------- Product Form Modal ---------- */
interface ProductFormProps {
  initial?: Product | null;
  onSave: (data: Omit<Product, 'id'> | Partial<Product>) => void;
  onClose: () => void;
}

function ProductForm({ initial, onSave, onClose }: ProductFormProps) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    price: String(initial?.price ?? ''),
    originalPrice: String(initial?.originalPrice ?? ''),
    discount: String(initial?.discount ?? ''),
    frontImage: initial?.frontImage ?? '',
    backImage: initial?.backImage ?? '',
    gender: (initial?.gender ?? 'Mujer') as Gender,
    type: initial?.type ?? 'Vestido',
    length: initial?.length ?? 'Midi',
    sizes: initial?.sizes ?? ['S', 'M', 'L'],
    category: (initial?.category ?? 'NUEVO') as ProductCategory,
    description: initial?.description ?? '',
    rating: String(initial?.rating ?? '4.5'),
    reviews: String(initial?.reviews ?? '0'),
    featured: initial?.featured ?? false,
    colors: initial?.colors ?? ['#000000'],
    colorNames: initial?.colorNames ?? ['Negro'],
    stock: initial?.stock ?? { S: 10, M: 10, L: 10 },
  });

  const toggleSize = (size: string) => {
    setForm(f => {
      const sizes = f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size];
      const stock = { ...f.stock };
      if (!f.sizes.includes(size)) stock[size] = 10;
      else delete stock[size];
      return { ...f, sizes, stock };
    });
  };

  const toggleColor = (hex: string, name: string) => {
    setForm(f => {
      const idx = f.colors.indexOf(hex);
      if (idx >= 0) {
        return { ...f, colors: f.colors.filter(c => c !== hex), colorNames: f.colorNames.filter((_, i) => i !== idx) };
      }
      return { ...f, colors: [...f.colors, hex], colorNames: [...f.colorNames, name] };
    });
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.frontImage) {
      alert('Completa nombre, precio e imagen frontal');
      return;
    }
    onSave({
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      discount: form.discount ? Number(form.discount) : undefined,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
    } as Omit<Product, 'id'>);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 sticky top-0 bg-white z-10">
          <h3>{initial ? 'Editar producto' : 'Nuevo producto'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Nombre del producto *</label>
              <input value={form.name} onChange={(e: any) => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-black/20 focus:border-black px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Precio (COP) *</label>
              <input type="number" value={form.price} onChange={(e: any) => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full border border-black/20 focus:border-black px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Precio original (si hay descuento)</label>
              <input type="number" value={form.originalPrice} onChange={(e: any) => setForm(f => ({ ...f, originalPrice: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">% Descuento</label>
              <input type="number" value={form.discount} onChange={(e: any) => setForm(f => ({ ...f, discount: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Categoría</label>
              <select value={form.category} onChange={(e: any) => setForm(f => ({ ...f, category: e.target.value as ProductCategory }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none bg-white">
                {(['NUEVO', 'TENDENCIA', 'OFERTA'] as ProductCategory[]).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Género</label>
              <select value={form.gender} onChange={(e: any) => setForm(f => ({ ...f, gender: e.target.value as Gender }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none bg-white">
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Tipo de prenda</label>
              <select value={form.type} onChange={(e: any) => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none bg-white">
                {GARMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Longitud</label>
              <select value={form.length} onChange={(e: any) => setForm(f => ({ ...f, length: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none bg-white">
                {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">URL imagen frontal *</label>
              <input value={form.frontImage} onChange={(e: any) => setForm(f => ({ ...f, frontImage: e.target.value }))}
                placeholder="https://..."
                className="w-full border border-black/20 focus:border-black px-3 py-2 text-sm outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">URL imagen trasera</label>
              <input value={form.backImage} onChange={(e: any) => setForm(f => ({ ...f, backImage: e.target.value }))}
                placeholder="https://..."
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" />
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-2">Colores disponibles</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map(c => (
                <button key={c.hex} type="button" title={c.name}
                  onClick={() => toggleColor(c.hex, c.name)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    form.colors.includes(c.hex) ? 'border-black scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex, outline: c.hex === '#FFFFFF' ? '1px solid #ccc' : 'none' }}
                />
              ))}
            </div>
          </div>

          {/* Sizes + stock */}
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-2">Tallas y stock</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {SIZES.map(s => (
                <button key={s} type="button"
                  onClick={() => toggleSize(s)}
                  className={`w-10 h-10 text-xs border transition-colors ${
                    form.sizes.includes(s) ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {form.sizes.sort((a, b) => SIZES.indexOf(a) - SIZES.indexOf(b)).map(size => (
                <div key={size}>
                  <label className="text-[10px] text-black/40 uppercase">{size}</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock[size] ?? 0}
                    onChange={(e: any) => setForm(f => ({ ...f, stock: { ...f.stock, [size]: Number(e.target.value) } }))}
                    className="w-full border border-black/20 px-2 py-1 text-xs outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Descripción</label>
            <textarea value={form.description} onChange={(e: any) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3} className="w-full border border-black/20 px-3 py-2 text-sm outline-none resize-none" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={(e: any) => setForm(f => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-black" />
            <label htmlFor="featured" className="text-sm">Producto destacado (aparece en landing)</label>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-black/10 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border border-black/20 text-sm hover:border-black transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave}
            className="px-5 py-2 bg-black text-white text-sm hover:bg-black/80 transition-colors">
            {initial ? 'Guardar cambios' : 'Agregar producto'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Admin Panel ---------- */
export function AdminPanel() {
  const {
    navigate, adminLogout, products, orders, users,
    addProduct, updateProduct, deleteProduct,
    updateOrderStatus, deleteOrder, getProduct,
  } = useApp();

  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [productModal, setProductModal] = useState<{ open: boolean; product: Product | null }>({
    open: false, product: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'Todos'>('Todos');
  const [productSearch, setProductSearch] = useState('');

  const filteredOrders = orderFilter === 'Todos' ? orders : orders.filter(o => o.status === orderFilter);
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.type.toLowerCase().includes(productSearch.toLowerCase())
  );

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pendiente').length,
    totalRevenue: orders.filter(o => o.status === 'Entregado').reduce((s, o) => s + o.total, 0),
    totalProducts: products.length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-black text-white flex-shrink-0 flex flex-col min-h-screen fixed left-0 top-0">
        <div className="px-5 py-6 border-b border-white/10">
          <p className="text-xl tracking-[0.3em] font-light">OXMOS</p>
          <p className="text-[10px] tracking-widest uppercase text-white/40 mt-0.5">Administrador</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Productos', icon: Package },
            { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors ${
                tab === item.id ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === 'orders' && stats.pendingOrders > 0 && (
                <span className="ml-auto w-5 h-5 bg-yellow-400 text-black text-[10px] rounded-full flex items-center justify-center">
                  {stats.pendingOrders}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <button
            onClick={() => navigate('catalog')}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Eye size={16} /> Ver tienda
          </button>
          <button
            onClick={() => { adminLogout(); navigate('landing'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-black/10 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="capitalize">
              {tab === 'dashboard' ? 'Dashboard' : tab === 'products' ? 'Gestión de Productos' : 'Gestión de Pedidos'}
            </h2>
            <p className="text-xs text-black/40 mt-0.5">
              {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {tab === 'products' && (
            <button
              onClick={() => setProductModal({ open: true, product: null })}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm hover:bg-black/80 transition-colors"
            >
              <Plus size={16} /> Nuevo producto
            </button>
          )}
        </header>

        <div className="p-8">
          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: ShoppingCart, label: 'Total pedidos', value: stats.totalOrders, sub: 'pedidos registrados' },
                  { icon: AlertCircle, label: 'Pendientes', value: stats.pendingOrders, sub: 'requieren atención', accent: true },
                  { icon: TrendingUp, label: 'Ingresos entregados', value: formatPrice(stats.totalRevenue), sub: 'pedidos entregados' },
                  { icon: Package, label: 'Productos', value: stats.totalProducts, sub: 'en catálogo' },
                ].map(card => (
                  <div key={card.label} className={`bg-white border p-5 ${card.accent ? 'border-yellow-400' : 'border-black/10'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs tracking-wide uppercase text-black/40">{card.label}</span>
                      <card.icon size={18} className={card.accent ? 'text-yellow-500' : 'text-black/30'} />
                    </div>
                    <p className="text-2xl font-medium">{card.value}</p>
                    <p className="text-xs text-black/30 mt-1">{card.sub}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white border border-black/10">
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
                  <h3 className="text-sm font-medium">Pedidos recientes</h3>
                  <button onClick={() => setTab('orders')} className="text-xs text-black/40 hover:text-black underline">
                    Ver todos
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/5">
                        {['Pedido', 'Cliente', 'Total', 'Estado', 'Fecha'].map(h => (
                          <th key={h} className="text-left text-[10px] tracking-widest uppercase text-black/40 px-6 py-3 font-normal">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b border-black/5 hover:bg-black/2 transition-colors">
                          <td className="px-6 py-3 text-sm font-mono">{order.id}</td>
                          <td className="px-6 py-3 text-sm">{order.customerName}</td>
                          <td className="px-6 py-3 text-sm">{formatPrice(order.total)}</td>
                          <td className="px-6 py-3"><span className={`text-xs px-2 py-1 ${STATUS_COLORS[order.status]}`}>{order.status}</span></td>
                          <td className="px-6 py-3 text-xs text-black/40">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top products */}
              <div className="bg-white border border-black/10">
                <div className="px-6 py-4 border-b border-black/10">
                  <h3 className="text-sm font-medium">Productos más reseñados</h3>
                </div>
                <div className="divide-y divide-black/5">
                  {[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5).map(product => (
                    <div key={product.id} className="flex items-center gap-4 px-6 py-3">
                      <img src={product.frontImage} alt={product.name} className="w-10 h-12 object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{product.name}</p>
                        <p className="text-xs text-black/40">{product.gender} · {product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatPrice(product.price)}</p>
                        <p className="text-xs text-black/40">{product.reviews} reseñas</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={productSearch}
                  onChange={(e: any) => setProductSearch(e.target.value)}
                  className="border border-black/20 px-4 py-2 text-sm outline-none focus:border-black w-64"
                />
                <span className="text-xs text-black/40">{filteredProducts.length} productos</span>
              </div>

              <div className="bg-white border border-black/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/10 bg-black/2">
                        {['Producto', 'Categoría', 'Género', 'Precio', 'Stock total', 'Acciones'].map(h => (
                          <th key={h} className="text-left text-[10px] tracking-widest uppercase text-black/40 px-5 py-3 font-normal">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {filteredProducts.map(product => {
                        const totalStock = Object.values(product.stock).reduce((s, v) => s + v, 0);
                        return (
                          <tr key={product.id} className="hover:bg-black/2 transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                <img src={product.frontImage} alt="" className="w-10 h-12 object-cover flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-black/40">{product.type} · {product.length}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <span className="text-xs bg-black/5 px-2 py-1">{product.category}</span>
                            </td>
                            <td className="px-5 py-3 text-sm text-black/60">{product.gender}</td>
                            <td className="px-5 py-3">
                              <p className="text-sm">{formatPrice(product.price)}</p>
                              {product.originalPrice && (
                                <p className="text-xs text-black/30 line-through">{formatPrice(product.originalPrice)}</p>
                              )}
                            </td>
                            <td className="px-5 py-3">
                              <span className={`text-sm font-medium ${totalStock <= 5 ? 'text-red-500' : ''}`}>
                                {totalStock}
                              </span>
                              {totalStock <= 5 && <span className="text-xs text-red-400 ml-1">bajo</span>}
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setProductModal({ open: true, product })}
                                  className="w-8 h-8 border border-black/20 hover:border-black flex items-center justify-center transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(product.id)}
                                  className="w-8 h-8 border border-red-200 hover:border-red-500 hover:text-red-500 flex items-center justify-center transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {(['Todos', ...ALL_STATUSES] as (OrderStatus | 'Todos')[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setOrderFilter(s)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      orderFilter === s ? 'bg-black text-white border-black' : 'border-black/20 hover:border-black'
                    }`}
                  >
                    {s}
                    {s !== 'Todos' && (
                      <span className="ml-1 text-[10px] opacity-60">
                        ({orders.filter(o => o.status === s).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white border border-black/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/10 bg-black/2">
                        {['Pedido', 'Cliente', 'Productos', 'Total', 'Estado', 'Fecha', 'Acciones'].map(h => (
                          <th key={h} className="text-left text-[10px] tracking-widest uppercase text-black/40 px-5 py-3 font-normal">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-black/2 transition-colors">
                          <td className="px-5 py-3 text-sm font-mono">{order.id}</td>
                          <td className="px-5 py-3">
                            <p className="text-sm">{order.customerName}</p>
                            <p className="text-xs text-black/40">{order.customerPhone}</p>
                            <p className="text-xs text-black/40">{order.customerAddress}</p>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex -space-x-2">
                              {order.items.map((item, i) => {
                                const product = getProduct(item.productId);
                                return product ? (
                                  <img key={i} src={product.frontImage} alt="" className="w-8 h-10 object-cover border border-white" title={product.name} />
                                ) : null;
                              })}
                            </div>
                            <p className="text-xs text-black/40 mt-1">{order.items.reduce((s, i) => s + i.quantity, 0)} artículos</p>
                          </td>
                          <td className="px-5 py-3 text-sm font-medium">{formatPrice(order.total)}</td>
                          <td className="px-5 py-3">
                            <select
                              value={order.status}
                              onChange={(e: any) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className={`text-xs px-2 py-1 border-none outline-none cursor-pointer rounded ${STATUS_COLORS[order.status]}`}
                            >
                              {ALL_STATUSES.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-3 text-xs text-black/40">{order.date}</td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => setDeleteConfirm(`order-${order.id}`)}
                              className="w-8 h-8 border border-red-200 hover:border-red-500 hover:text-red-500 flex items-center justify-center transition-colors"
                              title="Descartar pedido"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredOrders.length === 0 && (
                  <div className="py-12 text-center text-black/40 text-sm">No hay pedidos en este estado.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product modal */}
      {productModal.open && (
        <ProductForm
          initial={productModal.product}
          onSave={data => {
            if (productModal.product) {
              updateProduct(productModal.product.id, data as Partial<Product>);
            } else {
              addProduct(data as Omit<Product, 'id'>);
            }
          }}
          onClose={() => setProductModal({ open: false, product: null })}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white p-6 max-w-sm w-full">
            <h3 className="mb-2">¿Confirmar eliminación?</h3>
            <p className="text-sm text-black/50 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-black/20 py-2 text-sm hover:border-black transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.startsWith('order-')) {
                    deleteOrder(deleteConfirm.replace('order-', ''));
                  } else {
                    deleteProduct(deleteConfirm);
                  }
                  setDeleteConfirm(null);
                }}
                className="flex-1 bg-red-600 text-white py-2 text-sm hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



