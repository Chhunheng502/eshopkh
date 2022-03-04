<?php

namespace App\Filters\Product;

class TypeFilter
{
    function __invoke($query, $type)
    {
        if($type == 'all') {
            return $query;
        }

        return $query->where('type', 'like', '%' . $type . '%');
    }
}