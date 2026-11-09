import React, { useState } from 'react';
import { Package, ShoppingCart, TrendingUp, AlertCircle, Plus, Trash2, Edit2, LogOut, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdminDashboard } from '../components/features/admin/AdminDashboard';
import { AdminProducts } from '../components/features/admin/AdminProducts';
import { AdminOrders } from '../components/features/admin/AdminOrders';
import type { OrderStatus, Product } from '../types';

export function AdminPage() {
  const { products, orders, adminLogout, navigate, addProduct, updateProduct, deleteProduct, deleteOrder } = useApp();
  const [tab, setTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'Todos'>('Todos');
  const [productModal, setProductModal] = useState<{ open: boolean; product: Product | null }>({
    open: false,
    product: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'product' | 'order'; id: number } | null>(null);

  const handleLogout = async () => {
    await adminLogout();
    navigate('landing');
  };

  const handleModalSave = async (data: any) => {
    if (productModal.product) {
      // Edit
      await updateProduct(productModal.product.id, {
        ...data,
        variants: data._variants,
        images: data._images,
      });
    } else {
      // Create
      await addProduct({
        ...data,
        variants: data._variants,
        images: data._images,
      });
    }
    setProductModal({ open: false, product: null });
  };

  const handleDeleteConfirm = async (target: { type: 'product' | 'order'; id: number }) => {
    if (target.type === 'product') {
      await deleteProduct(target.id);
    } else {
      await deleteOrder(target.id);
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-lg tracking-[0.3em] font-light">OXMOS</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 uppercase tracking-widest">Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'products', label: 'Productos', icon: Package },
            { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase transition-colors ${
                tab === item.id ? 'bg-white text-black font-medium' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <button
            onClick={() => navigate('landing')}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={16} />
            Ver tienda
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-black/10 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light capitalize">
              {tab === 'dashboard' ? 'Panel de Control' : tab === 'products' ? 'Gestión de Productos' : 'Gestión de Pedidos'}
            </h1>
            <p className="text-xs text-black/40 mt-0.5">
              {tab === 'dashboard'
                ? 'Resumen general de tu tienda'
                : tab === 'products'
                ? `${products.length} productos en catálogo`
                : `${orders.length} pedidos registrados`}
            </p>
          </div>

          {tab === 'products' && (
            <button
              onClick={() => setProductModal({ open: true, product: null })}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              <Plus size={16} /> Nuevo producto
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
              onDelete={(id: string) => setDeleteConfirm({ type: 'product', id: Number(id) })}
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
              onDelete={(id: string) => setDeleteConfirm({ type: 'order', id: Number(id) })}
            />
          )}
        </div>
      </main>

      {/* Delete confirm dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white p-6 max-w-sm w-full">
            <h3 className="mb-2 text-base font-medium">¿Confirmar eliminación?</h3>
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

export { AdminPage as AdminPanel };
