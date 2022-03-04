<?php

namespace App\Services;

use App\Filters\TimeFilters;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SalesService
{
    public function getWeekly()
    {
        return [
            doubleval(Order::getWeek(1)->sum('total_cost')),
            doubleval(Order::getWeek(2)->sum('total_cost')),
            doubleval(Order::getWeek(3)->sum('total_cost')),
            doubleval(Order::getWeek(4)->sum('total_cost'))
        ];
    }

    public function getMonthly()
    {
        return [
            doubleval(Order::getMonth(1)->sum('total_cost')),
            doubleval(Order::getMonth(2)->sum('total_cost')),
            doubleval(Order::getMonth(3)->sum('total_cost')),
            doubleval(Order::getMonth(4)->sum('total_cost')),
            doubleval(Order::getMonth(5)->sum('total_cost')),
            doubleval(Order::getMonth(6)->sum('total_cost')),
            doubleval(Order::getMonth(7)->sum('total_cost')),
            doubleval(Order::getMonth(8)->sum('total_cost')),
            doubleval(Order::getMonth(9)->sum('total_cost')),
            doubleval(Order::getMonth(10)->sum('total_cost')),
            doubleval(Order::getMonth(11)->sum('total_cost')),
            doubleval(Order::getMonth(12)->sum('total_cost'))
        ];
    }

    public function getMostPurchased($value = 'month')
    {
        // ->withCount()
        // ->skip(2)
        // ->take(5)
        // ->offset(2)

        DB::statement("SET SQL_MODE=''");

        if($value == 'all') {
            return OrderDetail::filter(new TimeFilters)
                                ->groupBy('product_id')
                                ->orderBy(DB::raw('sum(quantity)'), 'DESC')
                                ->select('id', 'product_id', 'product_name', DB::raw('sum(quantity) as total_quantity'))
                                ->limit(5)
                                ->get();
        } else {
            return OrderDetail::currentMonth()
                                ->groupBy('product_id')
                                ->orderBy(DB::raw('sum(quantity)'), 'DESC')
                                ->select('id', 'product_id', 'product_name', DB::raw('sum(quantity) as total_quantity'))
                                ->limit(5)
                                ->get();
        }
    }

    public function getOldRevenue()
    {
        return doubleval(order::lastMonth()->sum('total_cost'));
    }

    public function getNewRevenue($value = 'month')
    {
        if($value == 'all') {
            return doubleval(order::filter(new TimeFilters)->sum('total_cost'));
        } else {
            return doubleval(order::currentMonth()->sum('total_cost'));
        }
    }

    public function getOldUsers()
    {
        return intval(User::lastMonth()->count());
    }

    public function getNewUsers($value = 'month')
    {
        if($value == 'all') {
            return intval(User::filter(new TimeFilters)->count());
        } else {
            return intval(User::currentMonth()->count());
        }
    }

    public function getOldOrders()
    {
        return intval(Order::lastMonth()->count());
    }

    public function getNewOrders($value = 'month')
    {
        if($value == 'all') {
            return intval(Order::filter(new TimeFilters)->count());
        } else {
            return intval(Order::currentMonth()->count());
        }
    }
}