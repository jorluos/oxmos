<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest; 
use Illuminate\Support\Facades\Auth;


class ProductStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role_id === 1;
    }

    public function rules(): array
    {
        return [
            // Datos del producto
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'short_description' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'gender' => 'required|in:Mujer,Hombre,Unisex',
            'type' => 'nullable|string|max:255',
            'material' => 'nullable|string',
            'care_instructions' => 'nullable|string',
            'base_price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0|gte:base_price',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',

            // Variantes (opcional pero recomendado)
            'variants' => 'nullable|array|min:1',
            'variants.*.sku' => 'nullable|string|max:50',
            'variants.*.size' => 'required_with:variants|string|max:50',
            'variants.*.color_name' => 'required_with:variants|string|max:100',
            'variants.*.color_hex' => 'nullable|string|max:7|starts_with:#',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'nullable|integer|min:0',

            // Imágenes (opcional pero recomendado)
            'images' => 'nullable|array|min:1',
            'images.*' => 'required_with:images|url|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del producto es obligatorio',
            'base_price.required' => 'El precio base es obligatorio',
            'gender.in' => 'El género debe ser Mujer, Hombre o Unisex',
            'variants.min' => 'Debe agregar al menos una variante',
            'images.min' => 'Debe agregar al menos una imagen',
            'original_price.gte' => 'El precio original debe ser mayor o igual al precio base',
        ];
    }

    /**
     * Preparar los datos para validación
     */
    protected function prepareForValidation(): void
    {
        // Convertir booleanos
        $this->merge([
            'is_featured' => filter_var($this->is_featured, FILTER_VALIDATE_BOOLEAN),
            'is_active' => filter_var($this->is_active, FILTER_VALIDATE_BOOLEAN),
        ]);

        // Si no hay variants o images, establecer como arrays vacíos para validación
        if (!$this->has('variants')) {
            $this->merge(['variants' => []]);
        }
        if (!$this->has('images')) {
            $this->merge(['images' => []]);
        }
    }
}