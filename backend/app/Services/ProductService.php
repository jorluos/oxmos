<?php
// app/Services/ProductService.php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductService
{
    /**
     * Crear producto con todas sus relaciones
     */
    public function createProduct(array $productData, array $variants = [], array $images = []): Product
    {
        $product = Product::create($productData);

        if (!empty($variants)) {
            $this->createVariants($product, $variants);
        }

        if (!empty($images)) {
            $this->createImages($product, $images);
        }

        return $product;
    }

    /**
     * Actualizar producto y sus relaciones
     */
    public function updateProduct(Product $product, array $productData, ?array $variants = null, ?array $images = null): Product
    {
        $product->update($productData);

        if ($variants !== null) {
            $this->syncVariants($product, $variants);
        }

        if ($images !== null) {
            $this->syncImages($product, $images);
        }

        return $product->fresh();
    }

    /**
     * Eliminar producto y sus relaciones
     */
    public function deleteProduct(Product $product): bool
    {
        $product->images()->delete();
        $product->variants()->delete();
        return $product->delete();
    }

    /**
     * Crear variantes para un producto
     */
    protected function createVariants(Product $product, array $variants): void
    {
        foreach ($variants as $variant) {
            $product->variants()->create([
                'sku' => $this->generateSku($product->id, $variant),
                'size' => $variant['size'] ?? 'M',
                'color_name' => $variant['color_name'] ?? 'Negro',
                'color_hex' => $variant['color_hex'] ?? '#000000',
                'price' => $variant['price'] ?? $product->base_price,
                'stock' => $variant['stock'] ?? 0,
                'reserved_stock' => 0,
                'is_active' => true,
            ]);
        }
    }

    /**
     * Sincronizar variantes (reemplaza las existentes)
     */
    protected function syncVariants(Product $product, array $variants): void
    {
        // Eliminar variantes existentes
        $product->variants()->delete();

        // Crear nuevas variantes
        $this->createVariants($product, $variants);
    }

    /**
     * Crear imágenes para un producto
     */
    protected function createImages(Product $product, array $images): void
    {
        foreach ($images as $index => $imageUrl) {
            // Si $imageUrl es un string, es la URL directamente
            // Si es un array, podría tener más datos (ej: alt_text)
            $imageData = is_array($imageUrl) ? $imageUrl : ['image_url' => $imageUrl];
            
            $product->images()->create([
                'image_url' => $imageData['image_url'] ?? $imageUrl,
                'alt_text' => $imageData['alt_text'] ?? $product->name,
                'position' => $index,
                'is_primary' => $index === 0,
            ]);
        }
    }

    /**
     * Sincronizar imágenes (reemplaza las existentes)
     */
    protected function syncImages(Product $product, array $images): void
    {
        $product->images()->delete();
        $this->createImages($product, $images);
    }

    /**
     * Generar SKU único para variante
     */
    protected function generateSku(int $productId, array $variant): string
    {
        $base = 'SKU-' . $productId . '-' . strtoupper(Str::random(6));
        
        // Agregar atributos si existen
        if (!empty($variant['size'])) {
            $base .= '-' . strtoupper($variant['size']);
        }
        
        if (!empty($variant['color_name'])) {
            $base .= '-' . strtoupper(substr($variant['color_name'], 0, 3));
        }

        return $base;
    }
}