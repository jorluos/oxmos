<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Summary of authorize
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role_id === 1;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'short_description' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'gender' => 'sometimes|in:Mujer,Hombre,Unisex',
            'type' => 'nullable|string|max:255',
            'material' => 'nullable|string',
            'care_instructions' => 'nullable|string',
            'base_price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0|gte:base_price',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            
            // Para actualizar, las variantes e imágenes son opcionales
            'variants' => 'nullable|array',
            'variants.*.sku' => 'nullable|string|max:50',
            'variants.*.size' => 'required_with:variants|string|max:50',
            'variants.*.color_name' => 'required_with:variants|string|max:100',
            'variants.*.color_hex' => 'nullable|string|max:7|starts_with:#',
            'variants.*.price' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'nullable|integer|min:0',
            
            'images' => 'nullable|array',
            'images.*' => 'required_with:images|url|max:2048',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Convertir booleanos si están presentes
        if ($this->has('is_featured')) {
            $this->merge(['is_featured' => filter_var($this->is_featured, FILTER_VALIDATE_BOOLEAN)]);
        }
        if ($this->has('is_active')) {
            $this->merge(['is_active' => filter_var($this->is_active, FILTER_VALIDATE_BOOLEAN)]);
        }
    }
}