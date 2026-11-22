<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\ApplicationPageController;
use App\Http\Controllers\Web\ProductPageController;

Route::inertia('/', 'Products/Index')->name('home');
Route::get('/products/{slug}', [ProductPageController::class, 'show'])->name('products.show');
Route::get('/apply/{slug}', [ApplicationPageController::class, 'create'])->name('applications.create');
