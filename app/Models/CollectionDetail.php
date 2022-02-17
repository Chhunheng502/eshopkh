<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionDetail extends Model
{
    protected $fillable = ['product_id'];

    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

    public function scopeWithDetail($query)
    {
        return  $query->with(['product' => function($query) {
                    $query->with('detail');
                }]);
    }
}
