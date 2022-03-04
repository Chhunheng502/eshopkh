<?php

namespace App\Http\Controllers;

use App\Repositories\CollectionRepository;
use App\Repositories\ProductRepository;
use Inertia\Inertia;

class AppMenuController extends Controller
{
    protected $collectionRepository;
    protected $productRepository;

    public function __construct(
        CollectionRepository $collectionRepository,
        ProductRepository $productRepository
    )
    {
        $this->collectionRepository = $collectionRepository;
        $this->productRepository = $productRepository;
    }

    public function index()
    {
        // need improvement on products prop (need to be dynamic)

        return Inertia::render('Home/Index', [
            'collections' => $this->collectionRepository->getAll(),
            'collection' => $this->collectionRepository->getFirstWithDetail()?->detail
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
            'products' => $this->productRepository->getByType($type),
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
            'product' => $this->productRepository->getWithDetailById($id)
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
            'products' => $this->productRepository->getByCollection($id),
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
