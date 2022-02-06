<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\OrderController;

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

// --------------NEW ROUTES----------------
Route::delete('user/logout', [AuthController::class, 'userLogout']);
Route::post('admin/login', [AuthController::class, 'adminLogin']);
Route::delete('admin/logout', [AuthController::class, 'adminLogout']);

// Route::group(['middleware' => 'auth:api'], function() {
    Route::get('orders', [OrderController::class, 'index']);
    Route::put('orders/{id}', [OrderController::class, 'acceptOrder']);

    Route::post('products', [InventoryController::class, 'store']);
    Route::put('products/{id}', [InventoryController::class, 'update']);
    Route::delete('products/{id}', [InventoryController::class, 'destroy']);
    Route::post('products/many', [InventoryController::class, 'destroyMany']);

    Route::get('collections', [CollectionController::class, 'index']);
    Route::post('collections', [CollectionController::class, 'store']);
    Route::put('collections/{id}', [CollectionController::class, 'update']);
    Route::delete('collections/{id}', [CollectionController::class, 'destroy']);

    //should isolate these routes into new controller
    Route::post('collections/detail/{id}', [CollectionController::class, 'storeProduct']);
    Route::delete('collections/detail/{id}', [CollectionController::class, 'destroyProduct']);
// });

