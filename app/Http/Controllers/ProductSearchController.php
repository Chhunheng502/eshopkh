<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductSearchController extends Controller
{
    public function index()
    {
        return Inertia::render('Product/Index', [
            'products' => Product::with('detail:id,product_id,primary_image')
                            ->filter(request(['search', 'sort']))
                            ->paginate(15)
                            ->withQueryString(),
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }
}
