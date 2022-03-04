<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SalesService;
use App\Services\Sales\TotalSales;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    protected $salesService;

    public function __construct(SalesService $salesService)
    {
        $this->salesService = $salesService;
    }

    public function index()
    {
        return Inertia::render('Admin/Report', [
            'salesMonthly' => $this->salesService->getMonthly(),
            'mostPurchased' => $this->salesService->getMostPurchased(new TotalSales),
            'totalRevenue' => $this->salesService->getNewRevenue(new TotalSales),
            'totalUsers' => $this->salesService->getNewUsers(new TotalSales),
            'totalOrders' => $this->salesService->getNewOrders(new TotalSales),
            'filters' => [
                'month' => request('month')
            ]
        ]);
    }
}
