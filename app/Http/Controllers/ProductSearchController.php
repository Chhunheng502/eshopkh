<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use Inertia\Inertia;

class ProductSearchController extends Controller
{
    protected $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index()
    {
        return Inertia::render('Product/Index', [
            'products' => $this->productRepository->getAllWithDetail(),
            'filters' => [
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }
}
