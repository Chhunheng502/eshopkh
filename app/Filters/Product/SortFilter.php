<?php

namespace App\Filters\Product;

class SortFilter
{
    function __invoke($query, $sort)
    {
        if($sort == '') {
            return $query;
        }

        return $query->orderBy(
            str_replace(['_asc', '_desc'], '', $sort),
            str_replace(['name_', 'price_', 'quantity_'], '', $sort)
        );
    }
}