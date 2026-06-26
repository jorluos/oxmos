<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::prefix('api')->middleware('web')->group(function () {
    require __DIR__.'/auth.php';
});
