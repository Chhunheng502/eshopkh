<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected $userRepository;
    protected $productRepository;

    public function __construct(
        UserRepository $userRepository,
        ProductRepository $productRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->productRepository = $productRepository;
    }

    public function index()
    {
        return Inertia::render('Admin/Customer/Contact', [
            'users' => $this->userRepository->getWithFilters(),
            'products' => $this->productRepository->getWithNecessaryDetail()
        ]);
    }
}
