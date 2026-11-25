<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;

// Rutas públicas (sin autenticación)
Route::get('/products', [ProductController::class, 'listForCatalog']);

Route::get('/health-check', function () {
    $results = [];

    // 1. Check DB connection & tables
    try {
        $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
        $tableList = array_map(fn($t) => array_values((array)$t)[0], $tables);
        $results['database'] = 'connected';
        $results['has_sessions_table'] = in_array('sessions', $tableList);
        $results['tables'] = $tableList;
    } catch (\Throwable $e) {
        $results['database_error'] = $e->getMessage();
    }

    // 2. Check App Key & Encryption
    try {
        $key = config('app.key');
        $results['app_key'] = !empty($key) ? 'set' : 'missing';
        $enc = app('encrypter');
        $enc->encrypt('test');
        $results['encryption'] = 'working';
    } catch (\Throwable $e) {
        $results['encryption_error'] = $e->getMessage();
    }

    // 3. Check Session Driver
    $results['session_driver'] = config('session.driver');
    try {
        $session = app('session.store');
        $session->start();
        $results['session_start'] = 'working';
    } catch (\Throwable $e) {
        $results['session_start_error'] = $e->getMessage();
    }

    // 4. Check Storage permissions
    $results['storage_sessions_dir_exists'] = is_dir(storage_path('framework/sessions'));
    $results['storage_sessions_dir_writable'] = is_writable(storage_path('framework/sessions'));

    return response()->json($results);
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->load('role');
});

Route::middleware(['auth:sanctum'])->group(function () {

    // PERFIL DEL USUARIO
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);

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

    // ADMIN productos y órdenes
    Route::middleware(['admin'])->group(function () {
        Route::get('/admin/products', [ProductController::class, 'index']);
        Route::get('/admin/products/{product}', [ProductController::class, 'show']);
        Route::post('/admin/products', [ProductController::class, 'store']);
        Route::put('/admin/products/{product}', [ProductController::class, 'update']);
        Route::delete('/admin/products/{product}', [ProductController::class, 'destroy']);
        Route::post('/admin/upload-image', [ProductController::class, 'uploadImage']);

        Route::put('/admin/orders/{order}/status', [OrderController::class, 'updateStatus']);
        Route::delete('/admin/orders/{order}', [OrderController::class, 'destroy']);
    });
});
