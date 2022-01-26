<?php

use App\Http\Controllers\Api\CollectionController;
use App\Http\Controllers\Api\ProductController;
use App\Models\Collection;
use App\Models\CollectionDetail;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
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

Route::get('collections/{id}', [CollectionController::class, 'show']);

Route::get('contact', function() {
    return Inertia::render('Contact');
});

Route::get('about', function() {
    return Inertia::render('About');
});

Route::get('checkout', function() {
    return Inertia::render('Checkout/Index');
});

Route::get('admin', function() {
    return Inertia::render('Admin/Auth');
});

// -------------------- Admin Routes -------------------

Route::get('admin/dashboard', function() {
    return Inertia::render('Admin/Overview/Index');
});

Route::get('admin/order', function() {
    return Inertia::render('Admin/Customer/Order', [
        'orders' => Order::with(['detail', 'user'])
                    ->where('is_accepted', false)
                    ->paginate(15)
    ]);
});

Route::get('admin/contact', function() {
    return Inertia::render('Admin/Customer/Contact', [
        'users' => User::filter(request(['search', 'sort']))
                            ->paginate(15)
                            ->withQueryString(),
    ]);
});

Route::get('admin/inventory', function() {
    return Inertia::render('Admin/Product/Inventory', [
        'products' => Product::with('detail')
                        ->filter(request(['search', 'gs', 'ts']))
                        ->paginate(15)
                        ->withQueryString(),
        'filters'  => request('search')
    ]);
});

Route::get('admin/collection', function() {
    return Inertia::render('Admin/Product/Collection', [
        'collections' => Collection::with(['detail' => function($query) {
                            $query->with(['product' => function($query) {
                                $query->with('detail');
                            }]);
                        }])->paginate(15)
    ]);
});

Route::get('admin/collection/{id}', function($id) {
    return Inertia::render('Admin/Product/CollectionDetail', [
        'collection' => CollectionDetail::with(['product' => function($query) {
                            $query->with('detail');
                        }])->where('collection_id', $id)->paginate(15)
    ]);
});