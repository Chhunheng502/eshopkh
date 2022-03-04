<?php

namespace App\Services\Sales;

use App\Filters\TimeFilters;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TotalSales implements SalesInterface
{
    public function getMostPurchased()
    {
        return OrderDetail::filter(new TimeFilters)
                            ->groupBy('product_id')
                            ->orderBy(DB::raw('sum(quantity)'), 'DESC')
                            ->select('id', 'product_id', 'product_name', DB::raw('sum(quantity) as total_quantity'))
                            ->limit(5)
                            ->get();
    }

    public function getNewRevenue()
    {
        return doubleval(Order::filter(new TimeFilters)->sum('total_cost'));
    }

    public function getNewUsers()
    {
        return intval(User::filter(new TimeFilters)->count());
    }

    public function getNewOrders()
    {
        return intval(Order::filter(new TimeFilters)->count());
    }
}