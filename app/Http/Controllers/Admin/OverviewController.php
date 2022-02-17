<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\SalesService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{
    protected $order;
    protected $salesService;

    public function __construct(Order $order, SalesService $salesService)
    {
        $this->order = $order;
        $this->salesService = $salesService;
    }

    public function index()
    {
        return Inertia::render('Admin/Overview/Index', [
            'salesWeekly' => $this->salesService->getWeekly(),
            'mostPurchased' => $this->salesService->getMostPurchased(),
            'totalRevenue' => [
                'old' => $this->salesService->getOldRevenue(),
                'new' => $this->salesService->getNewRevenue()
            ],
            'totalUsers' => [
                'old' => $this->salesService->getOldUsers(),
                'new' => $this->salesService->getNewUsers()
            ],
            'totalOrders' => [
                'old' => $this->salesService->getOldOrders(),
                'new' => $this->salesService->getNewOrders()
            ],
            'recentOrders' => $this->order->recent()->with('user')->get()
        ]);
    }
}
