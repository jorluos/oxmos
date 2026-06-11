import { Trash2 } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';
import { formatPrice } from '../../data';
import { useApp } from '../../context/AppContext';

const STATUS_COLORS: Record<OrderStatus, string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-800',
  'En preparación': 'bg-blue-100 text-blue-800',
  'Enviado': 'bg-purple-100 text-purple-800',
  'Entregado': 'bg-green-100 text-green-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

const ALL_STATUSES: OrderStatus[] = ['Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'];

interface AdminOrdersProps {
  orders: Order[];
  orderFilter: OrderStatus | 'Todos';
  onFilterChange: (filter: OrderStatus | 'Todos') => void;
  onDelete: (orderId: string) => void;
}

export function AdminOrders({ orders, orderFilter, onFilterChange, onDelete }: AdminOrdersProps) {
  const { updateOrderStatus, getProduct } = useApp();

  const filteredOrders = orderFilter === 'Todos' ? orders : orders.filter(o => o.status === orderFilter);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(['Todos', ...ALL_STATUSES] as (OrderStatus | 'Todos')[]).map(s => (
          <button
            key={s}
            onClick={() => onFilterChange(s)}
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
                      onClick={() => onDelete(order.id)}
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
  );
}
