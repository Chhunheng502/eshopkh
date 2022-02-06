<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\CollectionDetail;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class AdminMenuController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Login');
    }

    public function showOverview()
    {
        return Inertia::render('Admin/Overview/Index');
    }

    public function showOrder()
    {
        return Inertia::render('Admin/Customer/Order', [
            'orders' => Order::with(['detail', 'user'])
                        ->where('is_accepted', false)
                        ->paginate(15)
        ]);
    }

    public function showContact()
    {
        return Inertia::render('Admin/Customer/Contact', [
            'users' => User::filter(request(['search', 'sort']))
                                ->paginate(15)
                                ->withQueryString()
        ]);
    }

    public function showInventory()
    {
        return Inertia::render('Admin/Product/Inventory/Index', [
            'products' => Product::with('detail')
                            ->filter(
                                request([
                                    'gender',
                                    'type',
                                    'search',
                                    'sort',
                                ])
                            )
                            ->paginate(15)
                            ->withQueryString(),
            'filters'  => [
                'gender' => request('gender'),
                'type' => request('type'),
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }

    public function showInventoryCreate()
    {
        return Inertia::render('Admin/Product/Inventory/Create');
    }

    public function showInventoryEdit($id)
    {
        return Inertia::render('Admin/Product/Inventory/Edit', [
            'product' => Product::with('detail')->find($id)
        ]);
    }

    public function showCollection()
    {
        return Inertia::render('Admin/Product/Collection/Index', [
            'collections' => Collection::with(['detail' => function($query) {
                                $query->with(['product' => function($query) {
                                    $query->with('detail');
                                }]);
                            }])->paginate(15)
        ]);
    }

    public function showCollectionDetail($id)
    {
        return Inertia::render('Admin/Product/Collection/Detail', [
            'collection' => CollectionDetail::with(['product' => function($query) {
                                $query->with('detail');
                            }])->where('collection_id', $id)->paginate(15)
        ]);
    }
}
