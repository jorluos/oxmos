import { ShoppingCart, TrendingUp, AlertCircle, Package } from 'lucide-react';
import type { Product, Order, OrderStatus } from '../../types';
import { formatPrice } from '../../data';

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-800',
  'En preparación': 'bg-blue-100 text-blue-800',
  'Enviado': 'bg-purple-100 text-purple-800',
  'Entregado': 'bg-green-100 text-green-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onViewAllOrders: () => void;
}

export function AdminDashboard({ products, orders, onViewAllOrders }: AdminDashboardProps) {
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pendiente').length,
    totalRevenue: orders.filter(o => o.status === 'Entregado').reduce((s, o) => s + o.total, 0),
    totalProducts: products.length,
  };

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
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-1 ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </td>
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
  );
}
