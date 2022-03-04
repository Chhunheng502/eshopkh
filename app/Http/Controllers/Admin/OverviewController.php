<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\OrderRepository;
use App\Services\SalesService;
use App\Services\Sales\MonthlySales;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{
    protected $orderRepository;
    protected $salesService;

    public function __construct(OrderRepository $orderRepository, SalesService $salesService)
    {
        $this->orderRepository = $orderRepository;
        $this->salesService = $salesService;
    }

    public function index()
    {
        return Inertia::render('Admin/Overview/Index', [
            'salesWeekly' => $this->salesService->getWeekly(),
            'mostPurchased' => $this->salesService->getMostPurchased(new MonthlySales),
            'totalRevenue' => [
                'old' => $this->salesService->getOldRevenue(),
                'new' => $this->salesService->getNewRevenue(new MonthlySales)
            ],
            'totalUsers' => [
                'old' => $this->salesService->getOldUsers(),
                'new' => $this->salesService->getNewUsers(new MonthlySales)
            ],
            'totalOrders' => [
                'old' => $this->salesService->getOldOrders(),
                'new' => $this->salesService->getNewOrders(new MonthlySales)
            ],
            'recentOrders' => $this->orderRepository->getRecent()
        ]);
    }
}
