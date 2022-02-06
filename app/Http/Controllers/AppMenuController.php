<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\CollectionDetail;
use App\Models\Product;
use Inertia\Inertia;

class AppMenuController extends Controller
{
    public function index()
    {
        // need improvement on products prop (need to be dynamic)

        return Inertia::render('Home/Index', [
            'collections' => Collection::get(),
            'collection' => Collection::with(['detail' => function($query) {
                                $query->with(['product' => function($query) {
                                    $query->with('detail');
                                }]);
                            }])->first()->detail
        ]);
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegisterForm()
    {
        return Inertia::render('Auth/Register');
    }

    public function showProduct($type)
    {
        return Inertia::render('Product/Index', [
            'products' => Product::with(['detail' => function($query) {
                                $query->select('id','product_id','primary_image' );
                            }])
                            ->filter(request(['search', 'sort']))
                            ->where('type', $type)
                            ->paginate(15)
                            ->withQueryString(),
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }

    // might want to improve your writting here
    public function showProductDetail($type, $id)
    {
        return Inertia::render('Product/Detail', [
            'product' => Product::with('detail')
                            ->where('id', $id)
                            ->get()[0]
        ]);
    }

    public function showContact()
    {
        return Inertia::render('Contact');
    }

    public function showAbout()
    {
        return Inertia::render('About');
    }

    public function showCollection($id)
    {
        return Inertia::render('Product/Index', [
            'products' => Product::with('detail:id,product_id,primary_image') //Alternative to select query
                                ->whereIn('id', collect(
                                        CollectionDetail::where('collection_id', $id)
                                        ->get('product_id')->toArray()
                                    )->flatten()
                                )
                                ->filter(request(['search', 'sort']))
                                ->paginate(15)
                                ->withQueryString(),
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }

    public function showCheckout()
    {
        return Inertia::render('Checkout/Index');
    }
}
