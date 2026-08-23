import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import type { Product, ProductImage, ProductVariant } from '../../../types';
import { ProductFormModal } from './ProductFormModal';

export interface AdminProductsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onNew: () => void;
  productModal: { open: boolean; product: Product | null };
  onModalSave: (data: Omit<Product, 'id'> | Partial<Product>) => void;
  onModalClose: () => void;
}

export function AdminProducts({
  products,
  onEdit,
  onDelete,
  onNew,
  productModal,
  onModalSave,
  onModalClose,
}: AdminProductsProps) {
  const [productSearch, setProductSearch] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.type ?? '').toLowerCase().includes(productSearch.toLowerCase())
  );

  const totalStock = (p: Product) =>
    p.variants?.reduce((sum: number, v: ProductVariant) => sum + v.stock, 0) ?? 0;

  const primaryImage = (p: Product) =>
    p.images?.find((img: ProductImage) => img.is_primary)?.image_url
    ?? p.images?.[0]?.image_url
    ?? '';

  const formatPrice = (n: number) =>
    '$' + n.toLocaleString('es-CO');

  return (
    <>
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
                  {['Producto', 'Género', 'Precio base', 'Stock total', 'Acciones'].map(h => (
                    <th key={h} className="text-left text-[10px] tracking-widest uppercase text-black/40 px-5 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredProducts.map(product => {
                  const stock = totalStock(product);
                  return (
                    <tr key={product.id} className="hover:bg-black/2 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {primaryImage(product) ? (
                            <img src={primaryImage(product)} alt="" className="w-10 h-12 object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-12 bg-gray-100 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-black/40">{product.type}{product.brand ? ` · ${product.brand}` : ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-black/60">{product.gender}</td>
                      <td className="px-5 py-3 text-sm">{formatPrice(product.base_price)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-sm font-medium ${stock <= 5 ? 'text-red-500' : ''}`}>
                          {stock}
                        </span>
                        {stock <= 5 && <span className="text-xs text-red-400 ml-1">bajo</span>}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => onEdit(product)}
                            className="w-8 h-8 border border-black/20 hover:border-black flex items-center justify-center transition-colors"
                            title="Editar">
                            <Edit2 size={13} />
                          </button>
                          <button onClick={() => onDelete(String(product.id))}
                            className="w-8 h-8 border border-red-200 hover:border-red-500 hover:text-red-500 flex items-center justify-center transition-colors"
                            title="Eliminar">
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

      {productModal.open && (
        <ProductFormModal
          initial={productModal.product}
          onSave={onModalSave}
          onClose={onModalClose}
        />
      )}
    </>
  );
}

export { ProductFormModal as ProductForm };
