<?php

use App\Http\Controllers\Admin\AdminMenuController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\CollectionDetailController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\OverviewController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\AppMenuController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\ProductSearchController;
use App\Http\Controllers\UserController;
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
Route::get('user/register', [AppMenuController::class, 'showRegisterForm']);
Route::get('user/login', [AppMenuController::class, 'showLoginForm'])->name('user.login');
Route::get('products/{type}', [AppMenuController::class, 'showProduct']);
Route::get('products/{type}/{id}', [AppMenuController::class, 'showProductDetail']);
Route::get('contact', [AppMenuController::class, 'showContact']);
Route::get('about', [AppMenuController::class, 'showAbout']);
Route::get('collections/{id}', [AppMenuController::class, 'showCollection']);

Route::group(['middleware' => 'auth'], function() {

    Route::get('user', [UserController::class, 'index']);
    Route::put('user/{user}', [UserController::class, 'update']);
    
    Route::get('user/coupon', [CouponController::class, 'index']);
    Route::post('coupon/redeem', [CouponController::class, 'redeem']);

    Route::get('checkout', [AppMenuController::class, 'showCheckout']);
    Route::post('orders', [OrderController::class, 'store']);
});

Route::post('user', [UserController::class, 'store']);

Route::post('user/login', [AuthController::class, 'userLogin']);
Route::delete('user/logout', [AuthController::class, 'userLogout']);
Route::post('admin/login', [AuthController::class, 'adminLogin']);
Route::delete('admin/logout', [AuthController::class, 'adminLogout']);

Route::get('products', [ProductSearchController::class, 'index']);

// improve your writing on this one
Route::get('admin', [AdminMenuController::class, 'index']);

Route::group(['middleware' => 'auth.admin'], function() {

    Route::get('admin/overview', [OverviewController::class, 'index']);

    Route::get('admin/contact', [ContactController::class, 'index']);
    Route::post('coupon', [CouponController::class, 'store']);

    Route::get('admin/order', [OrderController::class, 'index']);
    Route::put('orders/{id}', [OrderController::class, 'accept']);

    Route::get('admin/inventory', [InventoryController::class, 'index']);
    Route::get('admin/inventory/create', [InventoryController::class, 'create']);
    Route::get('admin/inventory/edit/{id}', [InventoryController::class, 'edit']);
    Route::post('products', [InventoryController::class, 'store']);
    Route::put('products/{id}', [InventoryController::class, 'update']);
    Route::delete('products/{id}', [InventoryController::class, 'destroy']);
    Route::post('products/many', [InventoryController::class, 'destroyMany']);

    Route::get('admin/collection', [CollectionController::class, 'index']);
    Route::get('admin/collection/{id}', [CollectionController::class, 'show']);
    Route::post('collections', [CollectionController::class, 'store']);
    Route::put('collections/{id}', [CollectionController::class, 'update']);
    Route::delete('collections/{id}', [CollectionController::class, 'destroy']);

    Route::post('collections/detail/{id}', [CollectionDetailController::class, 'store']);
    Route::delete('collections/detail/{id}', [CollectionDetailController::class, 'destroy']);

    Route::get('admin/report', [ReportController::class, 'index']);
});
