import { ShoppingCart, TrendingUp, AlertCircle, Package } from 'lucide-react';
import type { Product, Order } from '../../types';

const formatPrice = (n: number) => '$' + n.toLocaleString('es-CO');

const STATUS_LABELS: Record<string, string> = {
  pendiente: 'Pendiente',
  en_preparacion: 'En preparación',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

const STATUS_COLORS: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  en_preparacion: 'bg-blue-100 text-blue-800',
  enviado: 'bg-purple-100 text-purple-800',
  entregado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
};

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onViewAllOrders: () => void;
}

export function AdminDashboard({ products, orders, onViewAllOrders }: AdminDashboardProps) {
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pendiente').length,
    totalRevenue: orders.filter(o => o.status === 'entregado').reduce((s, o) => s + o.total, 0),
    totalProducts: products.length,
  };

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('es-CO') : '-';

  const primaryImage = (p: Product) =>
    p.images?.find(img => img.is_primary)?.image_url ?? p.images?.[0]?.image_url ?? '';

  return (
    <div className="space-y-8">
      {/* Stat cards */}
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
          <button onClick={onViewAllOrders} className="text-xs text-black/40 hover:text-black underline">
            Ver todos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                {['N° Pedido', 'Cliente', 'Total', 'Estado', 'Fecha'].map(h => (
                  <th key={h} className="text-left text-[10px] tracking-widest uppercase text-black/40 px-6 py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b border-black/5 hover:bg-black/2 transition-colors">
                  <td className="px-6 py-3 text-sm font-mono">{order.order_number}</td>
                  <td className="px-6 py-3 text-sm">{order.customer_name ?? order.user?.first_name + ' ' + order.user?.last_name}</td>
                  <td className="px-6 py-3 text-sm">{formatPrice(order.total)}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-1 ${STATUS_COLORS[order.status] ?? 'bg-gray-100'}`}>
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-black/40">{formatDate(order.placed_at ?? order.created_at)}</td>
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
          {[...products].sort((a, b) => b.reviews_count - a.reviews_count).slice(0, 5).map(product => (
            <div key={product.id} className="flex items-center gap-4 px-6 py-3">
              {primaryImage(product) ? (
                <img src={primaryImage(product)} alt={product.name} className="w-10 h-12 object-cover" />
              ) : (
                <div className="w-10 h-12 bg-gray-100" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{product.name}</p>
                <p className="text-xs text-black/40">{product.gender}{product.brand ? ` · ${product.brand}` : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatPrice(product.base_price)}</p>
                <p className="text-xs text-black/40">{product.reviews_count} reseñas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}