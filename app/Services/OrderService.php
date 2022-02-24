<?php

namespace App\Services;

class OrderService
{
    public function sort($orders)
    {
        $tempArray = array_unique(array_column($orders, 'id'));
        $uniqueArray = array_values(array_intersect_key($orders, $tempArray));

        return $uniqueArray;
    }

    public function getTotalCost($orders, $reduction) {
        return array_reduce($orders, fn($total, $num) => $total + $num['price'], 0) - $reduction - 5; // 5 is delivery cost
    }

    public function getQuantity($orders, $product_id)
    {
        return count(array_filter($orders, fn($item) => $item['id'] === $product_id));
    }
}