<?php
// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Services\ProductService;
use App\Http\Requests\Products\ProductStoreRequest;
use App\Http\Requests\Products\ProductUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
        
        // Asegurar que solo admins puedan acceder (excepto endpoints públicos)
        $this->middleware('auth:sanctum')->except(['listForCatalog']);
    }

    /**
     * Listar todos los productos (admin)
     */
    public function index(): JsonResponse
    {
        try {
            $products = Product::with([
                'category:id,name',
                'collections:id,name,slug',
                'variants' => fn($q) => $q->where('is_active', true)
                    ->select('id', 'product_id', 'sku', 'size', 'color_name', 'color_hex', 'price', 'stock'),
                'images' => fn($q) => $q->orderBy('position')
                    ->select('id', 'product_id', 'image_url', 'is_primary', 'alt_text'),
            ])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $products
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar productos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Listar productos activos (público - catálogo/landing)
     */
    public function listForCatalog(): JsonResponse
    {
        try {
            $products = Product::with([
                'category:id,name',
                'collections:id,name,slug',
                'variants' => fn($q) => $q->where('is_active', true)
                    ->select('id', 'product_id', 'sku', 'size', 'color_name', 'color_hex', 'price', 'stock'),
                'images' => fn($q) => $q->orderBy('position')
                    ->select('id', 'product_id', 'image_url', 'is_primary', 'alt_text'),
            ])
            ->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            })
            ->orderBy('created_at', 'desc')
            ->paginate(50);

            return response()->json([
                'success' => true,
                'data' => $products
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar productos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear un nuevo producto
     */
    public function store(ProductStoreRequest $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            
            // Asignar categoría por defecto si no se especifica
            if (!isset($validated['category_id'])) {
                $defaultCategory = Category::firstOrCreate(
                    ['slug' => 'sin-categoria'],
                    ['name' => 'Sin categoría', 'is_active' => true, 'sort_order' => 0]
                );
                $validated['category_id'] = $defaultCategory->id;
            }

            // Generar slug único
            $validated['slug'] = $this->generateUniqueSlug($validated['name']);

            // Procesar variantes e imágenes
            $variants = $request->input('variants', []);
            $images = $request->input('images', []);

            // Crear producto
            $product = $this->productService->createProduct(
                $validated,
                $variants,
                $images
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Producto creado exitosamente',
                'data' => $product->load(['variants', 'images', 'category'])
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mostrar un producto específico
     */
    public function show(Product $product): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $product->load([
                    'variants', 
                    'images', 
                    'category',
                    'collections',
                    'reviews' => fn($q) => $q->where('is_approved', true)->latest()
                ])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar un producto existente
     */
    public function update(ProductUpdateRequest $request, Product $product): JsonResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            
            // Actualizar slug si cambia el nombre
            if (isset($validated['name'])) {
                $validated['slug'] = $this->generateUniqueSlug($validated['name'], $product->id);
            }

            // Datos para actualizar
            $variants = $request->input('variants');
            $images = $request->input('images');

            // Actualizar producto
            $updatedProduct = $this->productService->updateProduct(
                $product,
                $validated,
                $variants,
                $images
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Producto actualizado exitosamente',
                'data' => $updatedProduct->load(['variants', 'images', 'category'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un producto
     */
    public function destroy(Product $product): JsonResponse
    {
        DB::beginTransaction();
        try {
            $this->productService->deleteProduct($product);
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Producto eliminado exitosamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generar slug único para producto
     */
    protected function generateUniqueSlug(string $name, ?int $excludeId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (Product::where('slug', $slug)
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}