import React, { useState } from 'react';
import { Package, RefreshCw, X, Plus } from 'lucide-react';
import type { Product, ProductImage, ProductVariant } from '../../../types';
import { GENDERS } from '../../../data';

export interface ProductFormModalProps {
  initial: Product | null;
  onSave: (data: Omit<Product, 'id'> | Partial<Product>) => void;
  onClose: () => void;
}

export function ProductFormModal({ initial, onSave, onClose }: ProductFormModalProps) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    type: initial?.type ?? '',
    brand: initial?.brand ?? '',
    gender: initial?.gender ?? 'Mujer',
    base_price: initial?.base_price ?? 0,
    original_price: initial?.original_price ?? '',
    short_description: initial?.short_description ?? '',
    material: initial?.material ?? '',
    care_instructions: initial?.care_instructions ?? '',
    is_featured: initial?.is_featured ?? false,
    is_active: initial?.is_active ?? true,
    _images: initial?.images?.map((i: ProductImage) => i.image_url) ?? [''],
    _variants: initial?.variants ?? [
      { sku: '', size: 'M', color_name: 'Negro', color_hex: '#000000', price: 0, stock: 10, is_active: true },
    ],
  });

  const handleSave = () => {
    if (!form.name) {
      alert('Ingresa el nombre del producto');
      return;
    }
    onSave(form as any);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full my-8 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <h2 className="text-base font-medium">
            {initial ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onClose} className="text-black/40 hover:text-black">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* Main Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs uppercase text-black/50 mb-1">Nombre *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="ej: Vestido Elegance"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-black/50 mb-1">Tipo de prenda</label>
              <input
                type="text"
                value={form.type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="ej: Vestido"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-black/50 mb-1">Marca</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, brand: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="ej: OXMOS"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-black/50 mb-1">Género</label>
              <select
                value={form.gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm(f => ({ ...f, gender: e.target.value as any }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black bg-white"
              >
                {GENDERS.map((g: string) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase text-black/50 mb-1">Precio base (COP) *</label>
              <input
                type="number"
                value={form.base_price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, base_price: Number(e.target.value) }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase text-black/50 mb-1">Descripción corta</label>
            <textarea
              value={form.short_description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(f => ({ ...f, short_description: e.target.value }))}
              rows={2}
              className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black resize-none"
            />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-black/50 mb-1">Material</label>
              <input
                type="text"
                value={form.material}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, material: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="ej: 100% Algodón pima"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-black/50 mb-1">Instrucciones de cuidado</label>
              <input
                type="text"
                value={form.care_instructions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, care_instructions: e.target.value }))}
                className="w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="ej: Lavar en frío"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase text-black/50">URLs de imágenes</label>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, _images: [...f._images, ''] }))}
                className="text-xs text-black/60 hover:text-black flex items-center gap-1"
              >
                <Plus size={12} /> Agregar URL
              </button>
            </div>
            <div className="space-y-2">
              {form._images.map((url: string, i: number) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const imgs = [...form._images];
                      imgs[i] = e.target.value;
                      setForm(f => ({ ...f, _images: imgs }));
                    }}
                    placeholder={`https://... (imagen ${i + 1}${i === 0 ? ' - principal' : ''})`}
                    className="flex-1 border border-black/20 px-3 py-2 text-xs outline-none focus:border-black"
                  />
                  {form._images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, _images: f._images.filter((_: string, idx: number) => idx !== i) }))}
                      className="px-2 border border-black/20 hover:border-black text-black/40 hover:text-black text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, is_featured: e.target.checked }))}
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm">Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                className="w-4 h-4 accent-black"
              />
              <span className="text-sm">Activo</span>
            </label>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-black/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-black/20 text-sm hover:border-black transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-black text-white text-sm hover:bg-black/80 transition-colors"
          >
            {initial ? 'Guardar cambios' : 'Agregar producto'}
          </button>
        </div>
      </div>
    </div>
  );
}
