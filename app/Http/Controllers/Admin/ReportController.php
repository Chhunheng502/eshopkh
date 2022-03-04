<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SalesService;
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
            'mostPurchased' => $this->salesService->getMostPurchased('all'),
            'totalRevenue' => $this->salesService->getNewRevenue('all'),
            'totalUsers' => $this->salesService->getNewUsers('all'),
            'totalOrders' => $this->salesService->getNewOrders('all'),
            'filters' => [
                'month' => request('month')
            ]
        ]);
    }
}
