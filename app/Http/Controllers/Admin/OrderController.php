<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        return Inertia::render('Admin/Customer/Order', [
            'orders' => $this->orderRepository->getNew()
        ]);
    }

    public function store(Request $request)
    {
        $this->orderRepository->create($request);

        return redirect('/');
    }

    public function accept($id)
    {
        $this->orderRepository->accept($id);

        return redirect()->back();
    }
}
