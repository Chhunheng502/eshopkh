<?php

namespace App\Filters\Time;

use Carbon\Carbon;

class MonthFilter
{
    function __invoke($query, $period)
    {
        if($period == 'all') {
            return $query;
        }

        $months = [
            'Jan' => 1,
            'Feb' => 2,
            'Mar' => 3,
            'Apr' => 4,
            'May' => 5,
            'Jun' => 6,
            'Jul' => 7,
            'Aug' => 8,
            'Sep' => 9,
            'Oct' => 10,
            'Nov' => 11,
            'Dec' => 12
        ];

        return $query->whereBetween('created_at', [
                    Carbon::createFromFormat('m', $months[$period])->startOfMonth(),
                    Carbon::createFromFormat('m', $months[$period])->endOfMonth()
                ]);
    }
}