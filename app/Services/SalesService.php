<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use App\Services\Sales\SalesInterface;
use Illuminate\Support\Facades\DB;

class SalesService
{
    public function getWeekly()
    {
        for($i = 1; $i <= 4; $i++)
        {
            $total_costs[] = doubleval(Order::getWeek($i)->sum('total_cost'));
        }

        return $total_costs;
    }

    public function getMonthly()
    {
        for($i = 1; $i <= 12; $i++)
        {
            $total_costs[] = doubleval(Order::getMonth($i)->sum('total_cost'));
        }

        return $total_costs;
    }

    public function getMostPurchased(SalesInterface $sales)
    {
        DB::statement("SET SQL_MODE=''");

        return $sales->getMostPurchased();
    }

    public function getOldRevenue()
    {
        return doubleval(order::lastMonth()->sum('total_cost'));
    }

    public function getNewRevenue(SalesInterface $sales)
    {
        return $sales->getNewRevenue();
    }

    public function getOldUsers()
    {
        return intval(User::lastMonth()->count());
    }

    public function getNewUsers(SalesInterface $sales)
    {
        return $sales->getNewUsers();
    }

    public function getOldOrders()
    {
        return intval(Order::lastMonth()->count());
    }

    public function getNewOrders(SalesInterface $sales)
    {
        return $sales->getNewOrders();
    }
}