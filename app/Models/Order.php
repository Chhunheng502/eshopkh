<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id','total_cost','payment','is_accepted'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function detail()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function scopeFilter($query, array $filters)
    {
        // improve your code here
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

        $query->when($filters['period'] ?? false, fn($query, $period) =>
            $period=='all' ? '' : $query->where(fn($query) =>
                $query->accepted()
                        ->whereBetween('created_at', [
                        Carbon::createFromFormat('m', $months[$period])->startOfMonth(),
                        Carbon::createFromFormat('m', $months[$period])->endOfMonth()
                ])
            )
        );
    }

    public function scopeAccepted($query)
    {
        return $query->where('is_accepted', true);
    }

    public function scopeRecent($query)
    {
        return $query->whereBetween('created_at', [
                        Carbon::now()->startOfHour(),
                        Carbon::now()->endOfHour()
                    ]);
    }

    public function scopeLastMonth()
    {
        return $this->accepted()
                    ->whereBetween('created_at', [
                        Carbon::now()->startOfMonth()->subMonthsNoOverflow(),
                        Carbon::now()->subMonthsNoOverflow()->endOfMonth()
                    ]);
    }

    public function scopeCurrentMonth()
    {
        return $this->accepted()
                    ->whereBetween('created_at', [
                        Carbon::now()->startOfMonth(),
                        Carbon::now()->endOfMonth()
                    ]);
    }

    public function scopeGetWeek($query, $value = 0)
    {
        return $query->whereBetween('created_at',
                    [
                        Carbon::now()->startOfMonth(),
                        Carbon::now()->startOfMonth()->addWeeks($value)
                    ]
                );
    }

    public function scopeGetMonth($query, $value = 0)
    {
        return $query->whereBetween('created_at',
                    [
                        Carbon::now()->startOfYear()->addMonths($value - 1),
                        Carbon::now()->startOfYear()->addMonths($value)
                    ]
                );
    }

    // public function scopeGetMost($query, $value = 0)
    // {
    //     return $query->
    // }

    public function getNew()
    {
        return $this->with(['detail', 'user'])
                    ->where('is_accepted', false)
                    ->paginate(15);
    }

    // public function scopeCurrentWeek()
    // {
    //     return $this->accepted()
    //                 ->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
    // }

    public function getCreatedAtAttribute($created_at)
    {
        return Carbon::createFromTimeStamp(strtotime($created_at) )->diffForHumans();
    }
}
