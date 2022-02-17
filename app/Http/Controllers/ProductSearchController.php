<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductSearchController extends Controller
{
    protected $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function index()
    {
        return Inertia::render('Product/Index', [
            'products' => $this->product->getAll(),
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }
}
