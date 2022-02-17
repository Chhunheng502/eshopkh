<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = ['product_id', 'product_name','product_price','quantity'];

    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
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
                $query->whereBetween('created_at', [
                    Carbon::createFromFormat('m', $months[$period])->startOfMonth(),
                    Carbon::createFromFormat('m', $months[$period])->endOfMonth()
                ])
            )
        );
    }

    public function scopeCurrentMonth()
    {
        return $this->whereBetween('created_at', [
                        Carbon::now()->startOfMonth(),
                        Carbon::now()->endOfMonth()
                    ]);
    }
}
