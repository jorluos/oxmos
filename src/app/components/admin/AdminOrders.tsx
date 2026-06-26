import { Trash2 } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';
import { useApp } from '../../context/AppContext';

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

const ALL_STATUSES: OrderStatus[] = ['pendiente', 'en_preparacion', 'enviado', 'entregado', 'cancelado'];

interface AdminOrdersProps {
  orders: Order[];
  orderFilter: OrderStatus | 'Todos';
  onFilterChange: (filter: OrderStatus | 'Todos') => void;
  onDelete: (orderId: string) => void;
}

export function AdminOrders({ orders, orderFilter, onFilterChange, onDelete }: AdminOrdersProps) {
  const { updateOrderStatus } = useApp();

  const filteredOrders = orderFilter === 'Todos' ? orders : orders.filter(o => o.status === orderFilter);

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('es-CO') : '-';

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
            {s === 'Todos' ? 'Todos' : STATUS_LABELS[s] ?? s}
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
                {['N° Pedido', 'Cliente', 'Productos', 'Total', 'Estado', 'Fecha', 'Acciones'].map(h => (
                  <th key={h} className="text-left text-[10px] tracking-widest uppercase text-black/40 px-5 py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-black/2 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono">{order.order_number}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm">{order.customer_name ?? order.user?.first_name + ' ' + order.user?.last_name}</p>
                    <p className="text-xs text-black/40">{order.customer_phone ?? order.user?.phone}</p>
                    <p className="text-xs text-black/40 truncate max-w-[200px]">{order.shipping_address_text}</p>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex -space-x-2">
                      {order.items?.slice(0, 4).map((item, i) => (
                        item.product?.images?.[0]?.image_url ? (
                          <img key={i} src={item.product.images[0].image_url} alt=""
                            className="w-8 h-10 object-cover border border-white" />
                        ) : (
                          <div key={i} className="w-8 h-10 bg-gray-100 border border-white" />
                        )
                      ))}
                    </div>
                    <p className="text-xs text-black/40 mt-1">
                      {order.items?.reduce((s, i) => s + i.quantity, 0) ?? 0} artículos
                    </p>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium">{formatPrice(order.total)}</td>
                  <td className="px-5 py-3">
                    <select
                      value={order.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs px-2 py-1 border-none outline-none cursor-pointer rounded ${STATUS_COLORS[order.status] ?? 'bg-gray-100'}`}
                    >
                      {ALL_STATUSES.map(s => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-xs text-black/40">{formatDate(order.placed_at ?? order.created_at)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => onDelete(String(order.id))}
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