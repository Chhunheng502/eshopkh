<?php

namespace App\Services\Sales;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class MonthlySales implements SalesInterface
{
    public function getMostPurchased()
    {
        return OrderDetail::currentMonth()
                            ->groupBy('product_id')
                            ->orderBy(DB::raw('sum(quantity)'), 'DESC')
                            ->select('id', 'product_id', 'product_name', DB::raw('sum(quantity) as total_quantity'))
                            ->limit(5)
                            ->get();
    }

    public function getNewRevenue()
    {
        return doubleval(Order::currentMonth()->sum('total_cost'));
    }

    public function getNewUsers()
    {
        return intval(User::currentMonth()->count());
    }

    public function getNewOrders()
    {
        return intval(Order::currentMonth()->count());
    }
}