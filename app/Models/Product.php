<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = ['name','price','feature','quantity','type'];

    public function detail()
    {
        return $this->hasOne(ProductDetail::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn($query, $search) =>
            $query->where(fn($query) =>
                $query->where('name', 'like', '%' . $search . '%')
            )
        );

        $query->when($filters['gs'] ?? false, fn($query, $sortVal) =>
            $sortVal=='all' ? '' : $query->where(fn($query) =>
                $query->where('type', 'like', '%' . $sortVal . '%')
            )
        );

        $query->when($filters['ts'] ?? false, fn($query, $sortVal) =>
            $sortVal=='all' ? '' : $query->where(fn($query) =>
                $query->where('type', 'like', '%' . $sortVal . '%')
            )
        );
    }
}
