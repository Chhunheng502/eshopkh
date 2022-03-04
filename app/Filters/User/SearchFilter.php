<?php

namespace App\Filters\User;


class SearchFilter
{
    function __invoke($query, $search)
    {
        return $query->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%');
    }
}