<?php

use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home/Index');
});

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{type}', [ProductController::class, 'showType']);
Route::get('products/{type}/{id}', [ProductController::class, 'showProduct']);

Route::post('collections/{id}', [CollectionController::class, 'show']);

Route::get('contact', function() {
    return Inertia::render('Contact');
});

Route::get('about', function() {
    return Inertia::render('About');
});

Route::get('checkout', function() {
    return Inertia::render('Checkout/Index');
});