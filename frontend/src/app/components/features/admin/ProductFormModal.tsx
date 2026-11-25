import React, { useState, useRef } from 'react';
import { Package, RefreshCw, X, Plus, Upload, Loader2, Image as ImageIcon, Link } from 'lucide-react';
import type { Product, ProductImage, ProductVariant } from '../../../types';
import { GENDERS } from '../../../data';
import axios from '../../../../axios';

export interface ProductFormModalProps {
  initial: Product | null;
  onSave: (data: Omit<Product, 'id'> | Partial<Product>) => void;
  onClose: () => void;
}

export function ProductFormModal({ initial, onSave, onClose }: ProductFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
    _images: (initial?.images?.map((i: ProductImage) => i.image_url) ?? []).filter(Boolean),
    _variants: initial?.variants ?? [
      { sku: '', size: 'M', color_name: 'Negro', color_hex: '#000000', price: 0, stock: 10, is_active: true },
    ],
  });

  const uploadFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post('/api/admin/upload-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.data?.success && res.data?.url) {
          uploadedUrls.push(res.data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setForm(f => ({
          ...f,
          _images: [...f._images.filter(Boolean), ...uploadedUrls],
        }));
      }
    } catch (err: any) {
      console.error('Error subiendo imagen:', err);
      const msg = err.response?.data?.message || err.message || 'Error al subir la imagen';
      setUploadError(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setForm(f => ({
      ...f,
      _images: f._images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSave = () => {
    if (!form.name) {
      alert('Ingresa el nombre del producto');
      return;
    }
    const cleanImages = form._images.filter(Boolean);
    onSave({
      ...form,
      _images: cleanImages,
    } as any);
  };

  const validImages = form._images.filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-2xl w-full my-8 max-h-[90vh] flex flex-col shadow-2xl">
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

          {/* Fotos del producto */}
          <div className="border-t border-black/10 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-medium tracking-wider text-black/70">
                Fotos del producto ({validImages.length})
              </label>
              <button
                type="button"
                onClick={() => setShowManualUrl(!showManualUrl)}
                className="text-[11px] text-black/50 hover:text-black flex items-center gap-1 transition-colors"
              >
                <Link size={12} />
                {showManualUrl ? 'Ocultar enlaces manuales' : 'Ingresar URL manual'}
              </button>
            </div>

            {/* Input file invisible */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
            />

            {/* Zona de subida (Drag & Drop + Click) */}
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-black bg-black/5'
                  : 'border-black/20 hover:border-black bg-black/[0.01] hover:bg-black/[0.03]'
              } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 size={24} className="animate-spin text-black" />
                    <p className="text-xs font-medium text-black">Subiendo imagen(es)...</p>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/70">
                      <Upload size={18} />
                    </div>
                    <p className="text-xs text-black/80 font-medium">
                      Haz clic para seleccionar fotos de tu dispositivo
                    </p>
                    <p className="text-[11px] text-black/40">
                      o arrastra y suelta las fotos aquí (JPG, PNG, WEBP hasta 10MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {uploadError && (
              <p className="mt-2 text-xs text-red-600 bg-red-50 p-2 border border-red-200">
                {uploadError}
              </p>
            )}

            {/* Vista previa de imágenes cargadas */}
            {validImages.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-3">
                {validImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square border border-black/10 rounded overflow-hidden bg-gray-50 shadow-sm"
                  >
                    <img
                      src={url}
                      alt={`Foto ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-black text-white text-[9px] uppercase tracking-wider px-1.5 py-0.5 font-medium shadow">
                        Principal
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-white/95 hover:bg-red-500 hover:text-white text-black flex items-center justify-center rounded-full shadow transition-colors"
                      title="Eliminar foto"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input manual opcional para URLs externas */}
            {showManualUrl && (
              <div className="mt-4 pt-3 border-t border-black/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-black/40">Agregar enlace web</span>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, _images: [...f._images, ''] }))}
                    className="text-xs text-black/60 hover:text-black flex items-center gap-1"
                  >
                    <Plus size={12} /> Agregar campo de enlace
                  </button>
                </div>
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
                      placeholder={`https://...`}
                      className="flex-1 border border-black/20 px-3 py-1.5 text-xs outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="px-2 border border-black/20 hover:border-black text-black/40 hover:text-black text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            disabled={uploading}
            className="px-5 py-2 bg-black text-white text-sm hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {initial ? 'Guardar cambios' : 'Agregar producto'}
          </button>
        </div>
      </div>
    </div>
  );
}
