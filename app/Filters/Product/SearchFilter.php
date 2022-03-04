<?php

namespace App\Filters\Product;

class SearchFilter
{
    function __invoke($query, $search)
    {
        return $query->where('name', 'like', '%' . $search . '%');
    }
}