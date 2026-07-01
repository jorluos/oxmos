<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

// Rutas públicas (sin autenticación)
Route::get('/products', [ProductController::class, 'listForCatalog']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {

    // CARRITO
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/items', [CartController::class, 'addItem']);
    Route::delete('/cart/items/{item}', [CartController::class, 'removeItem']);
    Route::put('/cart/items/{item}', [CartController::class, 'updateQuantity']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // WISHLIST
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy']);

    // ÓRDENES (usuario)
    Route::post('/orders', [OrderController::class, 'store']);

    // ADMIN productos
    Route::get('/admin/products', [ProductController::class, 'index']);
    Route::get('/admin/products/{product}', [ProductController::class, 'show']);
    Route::post('/admin/products', [ProductController::class, 'store']);
    Route::put('/admin/products/{product}', [ProductController::class, 'update']);
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy']);

    // ADMIN órdenes
    Route::put('/admin/orders/{order}/status', [OrderController::class, 'updateStatus']);
    Route::delete('/admin/orders/{order}', [OrderController::class, 'destroy']);
});
