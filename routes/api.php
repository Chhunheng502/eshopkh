<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\HomeContentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('users', 'App\Http\Controllers\Api\UserController');
Route::post('users/promo/{id}', [UserController::class, 'createUserPromoCode']);
Route::get('users/promo/{id}', [UserController::class, 'getUserPromoCode']);
Route::post('users/promo/redeem/{id}', [UserController::class, 'redeemUserPromoCode']);
Route::post('users/promo/delete/{id}', [UserController::class, 'destroyUserPromoCode']);
Route::post('users/wishlist/{user_id}/{product_id}', [UserController::class, 'createUserWishlist']);
Route::get('users/wishlist/{id}', [UserController::class, 'getUserWishlist']);
Route::post('users/wishlist/delete/{user_id}/{product_id}', [UserController::class, 'destroyUserWishlist']);

Route::resource('admin', 'App\Http\Controllers\Api\AdminController');

Route::post('products', [ProductController::class, 'store']);
Route::put('products/{id}', [ProductController::class, 'updateProduct']);
Route::put('products/quantity/{id}', [ProductController::class, 'updateQuantity']);
Route::delete('products/{id}', [ProductController::class, 'destroy']);

Route::post('faq/post',[FaqController::class,'store']);
Route::get('faq/get',[FaqController::class,'index']);
Route::put('faq/{id}', [FaqController::class, 'edit']);
Route::delete('faq/{id}', [FaqController::class, 'destroy']);

Route::get('collections/get', [CollectionController::class, 'index']);
Route::post('collections/store', [CollectionController::class, 'store']);
Route::post('collections/add-products/{id}', [CollectionController::class, 'addProducts']);
Route::put('collections/edit/{id}', [CollectionController::class, 'edit']);
Route::delete('collections/delete/{id}', [CollectionController::class, 'destroy']);
Route::post('collections/delete-product', [CollectionController::class, 'destroyProduct']);

Route::get('orders/get', [OrderController::class, 'index']);
Route::post('orders/store', [OrderController::class, 'store']);
Route::get('orders/show/{id}', [OrderController::class, 'show']);
Route::put('orders/update/{id}', [OrderController::class, 'update']);
Route::delete('orders/delete/{id}', [OrderController::class, 'destroy']);

Route::get('home/content/get', [HomeContentController::class, 'getContent']);
Route::post('home/content', [HomeContentController::class, 'editContent']);


