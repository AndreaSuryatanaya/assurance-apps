<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\ApplicationPageController;
use App\Http\Controllers\Web\ProductPageController;

Route::inertia('/', 'Products/Index')->name('home');
Route::inertia('/login', 'Auth/Login')->name('login');
Route::inertia('/dashboard', 'Dashboard/User')->name('dashboard');
Route::inertia('/admin/dashboard', 'Dashboard/Admin')->name('admin.dashboard');
Route::inertia('/admin/submissions', 'Admin/Submissions')->name('admin.submissions');
Route::inertia('/admin/users', 'Admin/Users')->name('admin.users');
Route::get('/products/{slug}', [ProductPageController::class, 'show'])->name('products.show');
Route::get('/apply/{slug}', [ApplicationPageController::class, 'create'])->name('applications.create');
