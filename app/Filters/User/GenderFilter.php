<?php

namespace App\Filters\User;

class GenderFilter
{
    function __invoke($query, $gender)
    {
        if($gender == 'all') {
            return $query;
        }

        return $query->where('gender', 'like', '%' . $gender . '%');
    }
}