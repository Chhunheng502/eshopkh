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

    public function scopeFilter($query, $filters)
    {
        return $filters->apply($query);
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
                        Carbon::now()->startOfMonth()->addWeeks($value - 1),
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

    public function getCreatedAtAttribute($created_at)
    {
        return Carbon::createFromTimeStamp(strtotime($created_at) )->diffForHumans();
    }
}
