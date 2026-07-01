import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import type { Product, Gender } from '../../types';
import { GENDERS } from '../../data';

/* ---------- Product Form Modal ---------- */

interface ProductFormProps {
  initial?: Product | null;
  onSave: (data: Omit<Product, 'id'> | Partial<Product>) => void;
  onClose: () => void;
}

function ProductForm({ initial, onSave, onClose }: ProductFormProps) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    slug: initial?.slug ?? '',
    base_price: String(initial?.base_price ?? ''),
    original_price: String(initial?.original_price ?? ''),
    short_description: initial?.short_description ?? '',
    brand: initial?.brand ?? '',
    gender: (initial?.gender ?? 'Mujer') as Gender,
    type: initial?.type ?? '',
    material: initial?.material ?? '',
    care_instructions: initial?.care_instructions ?? '',
    is_featured: initial?.is_featured ?? false,
    is_active: initial?.is_active ?? true,
    // Variants (simplificado: un array de {size, color_name, color_hex, stock, price})
    variants: initial?.variants?.map(v => ({
      size: v.size,
      color_name: v.color_name,
      color_hex: v.color_hex ?? '#000000',
      stock: v.stock,
      price: v.price,
    })) ?? [{ size: 'M', color_name: 'Negro', color_hex: '#000000', stock: 10, price: 0 }],
    // Images
    images: initial?.images?.map(img => img.image_url) ?? [''],
  });

  const addVariant = () => {
    setForm(f => ({
      ...f,
      variants: [...f.variants, { size: 'M', color_name: 'Negro', color_hex: '#000000', stock: 10, price: 0 }],
    }));
  };

  const updateVariant = (idx: number, field: string, value: any) => {
    setForm(f => ({
      ...f,
      variants: f.variants.map((v, i) => (i === idx ? { ...v, [field]: value } : v)),
    }));
  };

  const removeVariant = (idx: number) => {
    setForm(f => ({ ...f, variants: f.variants.filter((_, i) => i !== idx) }));
  };

  const addImage = () => setForm(f => ({ ...f, images: [...f.images, ''] }));
  const updateImage = (idx: number, url: string) =>
    setForm(f => ({ ...f, images: f.images.map((img, i) => (i === idx ? url : img)) }));
  const removeImage = (idx: number) =>
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleSave = () => {
    if (!form.name || !form.base_price) {
      alert('Completa nombre y precio base');
      return;
    }
    onSave({
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      base_price: Number(form.base_price),
      original_price: form.original_price ? Number(form.original_price) : undefined,
      short_description: form.short_description,
      brand: form.brand,
      gender: form.gender,
      type: form.type,
      material: form.material,
      care_instructions: form.care_instructions,
      is_featured: form.is_featured,
      is_active: form.is_active,
      // Variants e Images se envían aparte para que AdminPanel los serialice
      _variants: form.variants,
      _images: form.images.filter(url => url.trim() !== ''),
    } as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium">{initial ? 'Editar producto' : 'Nuevo producto'}</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="p-6 space-y-6">

          {/* Información básica */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Nombre *</label>
              <input value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-black/20 focus:border-black px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Precio base (COP) *</label>
              <input type="number" value={form.base_price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, base_price: e.target.value }))}
                className="w-full border border-black/20 focus:border-black px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Precio original (si aplica)</label>
              <input type="number" value={form.original_price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, original_price: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Marca</label>
              <input value={form.brand} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, brand: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" placeholder="Ej: OXMOS" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Género</label>
              <select value={form.gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, gender: e.target.value as Gender }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none bg-white">
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Tipo de prenda</label>
              <input value={form.type} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" placeholder="Ej: Vestido, Pantalón" />
            </div>
            <div>
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Material</label>
              <input value={form.material} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, material: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none" placeholder="Ej: Algodón, Poliéster" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Descripción corta</label>
              <textarea value={form.short_description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, short_description: e.target.value }))}
                rows={2} className="w-full border border-black/20 px-3 py-2 text-sm outline-none resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Instrucciones de cuidado</label>
              <textarea value={form.care_instructions}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, care_instructions: e.target.value }))}
                rows={2} className="w-full border border-black/20 px-3 py-2 text-sm outline-none resize-none" />
            </div>
          </div>

          {/* Variantes (talla + color + stock + precio) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs tracking-wide uppercase text-black/50">Variantes (talla, color, stock)</label>
              <button type="button" onClick={addVariant}
                className="flex items-center gap-1 text-xs border border-black/20 px-3 py-1 hover:border-black transition-colors">
                <Plus size={12} /> Agregar variante
              </button>
            </div>
            <div className="space-y-2">
              {form.variants.map((v, idx) => (
                <div key={idx} className="flex items-center gap-2 border border-black/10 p-3">
                  <input placeholder="Talla" value={v.size}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVariant(idx, 'size', e.target.value)}
                    className="w-16 border border-black/20 px-2 py-1.5 text-xs outline-none" />
                  <input placeholder="Color" value={v.color_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVariant(idx, 'color_name', e.target.value)}
                    className="flex-1 border border-black/20 px-2 py-1.5 text-xs outline-none" />
                  <input type="color" value={v.color_hex}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVariant(idx, 'color_hex', e.target.value)}
                    className="w-8 h-8 p-0 border cursor-pointer" />
                  <input type="number" placeholder="Stock" value={v.stock}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVariant(idx, 'stock', Number(e.target.value))}
                    className="w-20 border border-black/20 px-2 py-1.5 text-xs outline-none" />
                  <input type="number" placeholder="Precio" value={v.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateVariant(idx, 'price', Number(e.target.value))}
                    className="w-24 border border-black/20 px-2 py-1.5 text-xs outline-none" />
                  <button onClick={() => removeVariant(idx)}
                    className="text-red-400 hover:text-red-600 p-1"><X size={14} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Imágenes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs tracking-wide uppercase text-black/50">Imágenes (URLs)</label>
              <button type="button" onClick={addImage}
                className="flex items-center gap-1 text-xs border border-black/20 px-3 py-1 hover:border-black transition-colors">
                <Plus size={12} /> Agregar imagen
              </button>
            </div>
            <div className="space-y-2">
              {form.images.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input value={url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateImage(idx, e.target.value)}
                    placeholder="https://..."
                    className="flex-1 border border-black/20 px-3 py-2 text-sm outline-none" />
                  {idx > 0 && (
                    <button onClick={() => removeImage(idx)}
                      className="text-red-400 hover:text-red-600 p-1"><X size={14} /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, is_featured: e.target.checked }))}
                className="w-4 h-4 accent-black" />
              <span className="text-sm">Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                className="w-4 h-4 accent-black" />
              <span className="text-sm">Activo</span>
            </label>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-black/10 flex justify-end gap-3">
          <button onClick={onClose}
            className="px-5 py-2 border border-black/20 text-sm hover:border-black transition-colors">
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
    (p.type ?? '').toLowerCase().includes(productSearch.toLowerCase())
  );

  const totalStock = (p: Product) =>
    p.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;

  const primaryImage = (p: Product) =>
    p.images?.find(img => img.is_primary)?.image_url
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