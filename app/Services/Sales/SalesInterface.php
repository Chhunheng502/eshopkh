<?php

namespace App\Services\Sales;

interface SalesInterface
{
    public function getMostPurchased();

    public function getNewRevenue();

    public function getNewUsers();

    public function getNewOrders();
}