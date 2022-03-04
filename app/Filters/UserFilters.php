<?php

namespace App\Filters;

use App\Filters\Time\MonthFilter;
use App\Filters\User\GenderFilter;
use App\Filters\User\SearchFilter;

class UserFilters
{
    protected $filters = [
        'gender' => GenderFilter::class,
        'search' => SearchFilter::class,
        'period' => MonthFilter::class
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