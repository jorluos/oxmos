import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import type { Product, Gender, ProductCategory } from '../../types';
import { formatPrice, GARMENT_TYPES, LENGTHS, SIZES, GENDERS, COLOR_OPTIONS } from '../../data';

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

/* ---------- Products Tab ---------- */

interface AdminProductsProps {
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
    p.type.toLowerCase().includes(productSearch.toLowerCase())
  );

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
                            onClick={() => onEdit(product)}
                            className="w-8 h-8 border border-black/20 hover:border-black flex items-center justify-center transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => onDelete(product.id)}
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

      {productModal.open && (
        <ProductForm
          initial={productModal.product}
          onSave={onModalSave}
          onClose={onModalClose}
        />
      )}
    </>
  );
}

export { ProductForm };
