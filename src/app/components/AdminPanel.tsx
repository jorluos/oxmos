import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Eye, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product, OrderStatus } from '../types';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminOrders } from './admin/AdminOrders';

type AdminTab = 'dashboard' | 'products' | 'orders';

export function AdminPanel() {
  const {
    navigate, adminLogout, products, orders,
    addProduct, updateProduct, deleteProduct, deleteOrder,
  } = useApp();

  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [productModal, setProductModal] = useState<{ open: boolean; product: Product | null }>({
    open: false, product: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'Todos'>('Todos');

  const pendingOrders = orders.filter(o => o.status === 'Pendiente').length;

  const handleModalSave = (data: Omit<Product, 'id'> | Partial<Product>) => {
    if (productModal.product) {
      updateProduct(productModal.product.id, data as Partial<Product>);
    } else {
      addProduct(data as Omit<Product, 'id'>);
    }
  };

  const handleDeleteConfirm = (id: string) => {
    if (id.startsWith('order-')) {
      deleteOrder(id.replace('order-', ''));
    } else {
      deleteProduct(id);
    }
    setDeleteConfirm(null);
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
              {item.id === 'orders' && pendingOrders > 0 && (
                <span className="ml-auto w-5 h-5 bg-yellow-400 text-black text-[10px] rounded-full flex items-center justify-center">
                  {pendingOrders}
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
              <Package size={16} /> Nuevo producto
            </button>
          )}
        </header>

        <div className="p-8">
          {tab === 'dashboard' && (
            <AdminDashboard
              products={products}
              orders={orders}
              onViewAllOrders={() => setTab('orders')}
            />
          )}
          {tab === 'products' && (
            <AdminProducts
              products={products}
              onEdit={product => setProductModal({ open: true, product })}
              onDelete={id => setDeleteConfirm(id)}
              onNew={() => setProductModal({ open: true, product: null })}
              productModal={productModal}
              onModalSave={handleModalSave}
              onModalClose={() => setProductModal({ open: false, product: null })}
            />
          )}
          {tab === 'orders' && (
            <AdminOrders
              orders={orders}
              orderFilter={orderFilter}
              onFilterChange={setOrderFilter}
              onDelete={id => setDeleteConfirm(`order-${id}`)}
            />
          )}
        </div>
      </main>

      {/* Delete confirm dialog */}
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
                onClick={() => handleDeleteConfirm(deleteConfirm)}
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
