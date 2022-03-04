<?php

namespace App\Filters;

use App\Filters\Product\GenderFilter;
use App\Filters\Product\SearchFilter;
use App\Filters\Product\SortFilter;
use App\Filters\Product\TypeFilter;

class ProductFilters
{
    protected $filters = [
        'gender' => GenderFilter::class,
        'type' => TypeFilter::class,
        'search' => SearchFilter::class,
        'sort' => SortFilter::class
    ];

    public function apply($query)
    {
        foreach ($this->receivedFilters() as $name => $value) {
            $filterInstance = new $this->filters[$name];
            $query = $filterInstance($query, $value);
        }

        return $query;
    }


    public function receivedFilters()
    {
        return request()->only(array_keys($this->filters));
    }
}