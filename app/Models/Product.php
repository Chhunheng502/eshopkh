<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name','price','feature','quantity','type'];

    protected $hidden = ['created_at', 'updated_at'];

    public function detail()
    {
        return $this->hasOne(ProductDetail::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['gender'] ?? false, fn($query, $gender) =>
            $gender=='all' ? '' : $query->where(fn($query) =>
                $query->where('type', 'like', '%' . $gender . '%')
            )
        );

        $query->when($filters['type'] ?? false, fn($query, $type) =>
            $type=='all' ? '' : $query->where(fn($query) =>
                $query->where('type', 'like', '%' . $type . '%')
            )
        );

        $query->when($filters['search'] ?? false, fn($query, $search) =>
            $query->where(fn($query) =>
                $query->where('name', 'like', '%' . $search . '%')
            )
        );

        $query->when($filters['sort'] ?? false, fn($query, $sort) =>
            $query->orderBy(
                str_replace(['_asc', '_desc'], '', $sort),
                str_replace(['name_', 'price_', 'quantity_'], '', $sort)
            )
        );
    }
}
