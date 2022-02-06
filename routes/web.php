<?php

use App\Http\Controllers\AdminMenuController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AppMenuController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductSearchController;
use Illuminate\Support\Facades\Route;

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

// _don't forget to add middleware (route protection)
// _need improvement for naming controller and route
// _sort routes by order

Route::get('/', [AppMenuController::class, 'index']);
Route::get('/user/register', [AppMenuController::class, 'showRegisterForm']);
Route::get('/user/login', [AppMenuController::class, 'showLoginForm']);
Route::get('products/{type}', [AppMenuController::class, 'showProduct']);
Route::get('products/{type}/{id}', [AppMenuController::class, 'showProductDetail']);
Route::get('contact', [AppMenuController::class, 'showContact']);
Route::get('about', [AppMenuController::class, 'showAbout']);
Route::get('collections/{id}', [AppMenuController::class, 'showCollection']);
Route::get('checkout', [AppMenuController::class, 'showCheckout']);

Route::get('products', [ProductSearchController::class, 'index']);

// -------------------- Admin Routes -------------------

Route::get('admin', [AdminMenuController::class, 'index']);
Route::get('admin/overview', [AdminMenuController::class, 'showOverview']);
Route::get('admin/order', [AdminMenuController::class, 'showOrder']);
Route::get('admin/contact', [AdminMenuController::class, 'showContact']);
Route::get('admin/inventory', [AdminMenuController::class, 'showInventory']);
Route::get('admin/inventory/create', [AdminMenuController::class, 'showInventoryCreate']);
Route::get('admin/inventory/edit/{id}', [AdminMenuController::class, 'showInventoryEdit']);
Route::get('admin/collection', [AdminMenuController::class, 'showCollection']);
Route::get('admin/collection/{id}', [AdminMenuController::class, 'showCollectionDetail']);

//need improvement
Route::post('api/user/login', [AuthController::class, 'userLogin']);
Route::post('api/user/register', [UserController::class, 'store']);
Route::post('api/orders', [OrderController::class, 'store']);

