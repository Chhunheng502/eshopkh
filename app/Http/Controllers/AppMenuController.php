<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Product;
use Inertia\Inertia;

class AppMenuController extends Controller
{
    protected $collection;
    protected $product;

    public function __construct(Collection $collection, Product $product)
    {
        $this->collection = $collection;
        $this->product = $product;
    }

    public function index()
    {
        // need improvement on products prop (need to be dynamic)

        return Inertia::render('Home/Index', [
            'collections' => Collection::get(),
            'collection' => $this->collection->getFirst()
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
            'products' => $this->product->getByType($type),
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
            'product' => Product::with('detail')->find($id)
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
            'products' => $this->product->getByCollection($id),
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
