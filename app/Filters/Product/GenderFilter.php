<?php

namespace App\Filters\Product;

class GenderFilter
{
    function __invoke($query, $gender)
    {
        if($gender == 'all') {
            return $query;
        }

        return $query->where('type', 'like', '%' . $gender . '%');
    }
}