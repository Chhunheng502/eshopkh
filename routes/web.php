<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\CollectionDetailController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\OverviewController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\AppMenuController;
use App\Http\Controllers\Auth\AdminSessionController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\UserSessionController;
use App\Http\Controllers\Auth\VerificationController;
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

Route::get('/', [AppMenuController::class, 'index']);
Route::get('user/register', [AppMenuController::class, 'showRegisterForm']);
Route::get('user/login', [AppMenuController::class, 'showLoginForm'])->name('user.login');
Route::get('products/{type}', [AppMenuController::class, 'showProduct']);
Route::get('products/{type}/{id}', [AppMenuController::class, 'showProductDetail']);
Route::get('contact', [AppMenuController::class, 'showContact']);
Route::get('about', [AppMenuController::class, 'showAbout']);
Route::get('collections/{id}', [AppMenuController::class, 'showCollection']);

Route::get('products', [ProductSearchController::class, 'index']);

Route::post('user', [UserController::class, 'store']);

Route::post('user/login', [UserSessionController::class, 'store']);
Route::delete('user/logout', [UserSessionController::class, 'destroy']);

Route::middleware(['auth', 'verified'])->group(function() {

    Route::get('user', [UserController::class, 'index']);
    Route::put('user/{user}', [UserController::class, 'update']);
    
    Route::get('user/coupon', [CouponController::class, 'index']);
    Route::post('coupon/redeem', [CouponController::class, 'redeem']);

    Route::get('checkout', [AppMenuController::class, 'showCheckout']);
    Route::post('orders', [OrderController::class, 'store']);
});

Route::get('email/verify', [VerificationController::class, 'show'])->name('verification.notice');
Route::get('email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
Route::post('email/resent', [VerificationController::class, 'resend'])->name('verification.resend');

Route::get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');

// -----------Admin Routes---------------

Route::get('admin', [AdminController::class, 'showLoginForm']);

Route::post('admin/login', [AdminSessionController::class, 'store']);
Route::delete('admin/logout', [AdminSessionController::class, 'destroy']);

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
